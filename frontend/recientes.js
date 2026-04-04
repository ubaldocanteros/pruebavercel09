// frontend/recientes.js
const MAX_RECIENTES = 20;
const API = 'http://localhost:3000/api';

function getFolderIdsByProvider(info, provider) {
  if (provider === 'streamwish') {
    return [info.idLatino, info.idJapones].filter(Boolean);
  }

  return [
    info.idLatinoTape,
    info.idJaponesTape,
    info.tapeLatino,
    info.tapeJapones
  ].filter(Boolean);
}

function parseChapterNumber(title = '') {
  const matches = String(title).match(/(\d{1,4})/g);
  if (!matches || !matches.length) return 0;
  return parseInt(matches[matches.length - 1], 10) || 0;
}

async function fetchCapitulosRecientes() {
  const allCaps = [];

  for (const [animeKey, info] of Object.entries(animeData)) {
    for (const provider of ['streamwish', 'streamtape']) {
      const ids = getFolderIdsByProvider(info, provider);

      for (const fldId of ids) {
        try {
          const res = await fetch(`${API}/videos/${provider}/${encodeURIComponent(fldId)}`);
          if (!res.ok) continue;

          const data = await res.json();
          const files = Array.isArray(data.files) ? data.files : [];

          files.forEach(file => {
            const title = file.title || file.name || '';
            const fechaRaw = file.uploaded || 0;
            const fecha =
              typeof fechaRaw === 'number'
                ? new Date(fechaRaw)
                : new Date(fechaRaw || 0);

            allCaps.push({
              animeKey,
              numero: parseChapterNumber(title),
              fecha,
              thumb: file.thumbnail || null,
              provider
            });
          });
        } catch (e) {
          console.warn(`Error consultando ${provider} folder ${fldId}:`, e);
        }
      }
    }
  }

  allCaps.sort((a, b) => b.fecha - a.fecha);

  const seen = new Set();
  const deduped = [];

  for (const item of allCaps) {
    const key = `${item.animeKey}-${item.numero}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
    if (deduped.length >= MAX_RECIENTES) break;
  }

  return deduped;
}

function renderRecientes(caps) {
  const cont = document.getElementById('recientes-list');
  if (!cont) return;

  cont.innerHTML = '';

  caps.forEach(({ animeKey, numero, thumb }) => {
    const info = animeData[animeKey];
    const card = document.createElement('div');
    card.className = 'recent-card';
    card.innerHTML = `
      <div class="thumbnail-wrapper">
        <img src="${thumb || info.imgUrl}" alt="${info.name}">
        <span class="chapter-badge">Cap ${String(numero).padStart(2, '0')}</span>
      </div>
      <p class="anime-name">${info.name}</p>
    `;
    card.onclick = () => navigateTo(`/anime/${animeKey}/${numero}`);
    cont.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const recientes = await fetchCapitulosRecientes();
  renderRecientes(recientes);
});