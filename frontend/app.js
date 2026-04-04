// frontend/app.js
window.API = 'http://localhost:3000/api';
const STREAMWISH_KEY = '26687qtx53fsc42bilx4m';
const app = document.getElementById('app');
const actualWrapper = document.querySelector('.actual');
let idiomaActual = localStorage.getItem('idiomaActual') || 'latino';
let servidorActual = localStorage.getItem('servidorActual') || 'streamwish';

const SERVER_LABELS = {
  streamwish: 'Streamwish',
  streamtape: 'Streamtape'
};

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function getFolderIdByServer(info, server, idioma) {
  const isLatino = idioma === 'latino';

  if (server === 'streamwish') {
    return isLatino ? info.idLatino : info.idJapones;
  }

  return (
    (isLatino
      ? info.idLatinoTape || info.tapeLatino || info.idLatinoStreamtape
      : info.idJaponesTape || info.tapeJapones || info.idJaponesStreamtape) || null
  );
}

function getEmbedUrl(server, fileCode) {
  if (server === 'streamtape') {
    return `https://streamtape.com/e/${fileCode}`;
  }
  return `https://streamwish.to/e/${fileCode}`;
}

function hasAnyFolder(info, server) {
  return !!(
    getFolderIdByServer(info, server, 'latino') ||
    getFolderIdByServer(info, server, 'japones')
  );
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      navigateTo(link.href);
    }
  });

  const input = document.getElementById('anime-search');
  const sugg = document.getElementById('anime-suggestions');
  const icon = document.querySelector('.search-icon');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    sugg.innerHTML = '';
    if (!q) return void (sugg.style.display = 'none');

    const matches = Object.entries(animeData)
      .filter(([, info]) => info.name.toLowerCase().includes(q))
      .slice(0, 10);

    matches.forEach(([key, info]) => {
      const li = document.createElement('li');
      li.textContent = info.name;
      li.dataset.key = key;
      sugg.appendChild(li);
    });

    sugg.style.display = matches.length ? 'block' : 'none';
  });

  sugg.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;
    navigateTo(`/anime/${li.dataset.key}/1`);
    sugg.style.display = 'none';
    input.value = '';
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const term = input.value.trim();
      navigateTo(`/anime?search=${encodeURIComponent(term)}`);
      sugg.style.display = 'none';
      input.value = '';
    }
  });

  icon.addEventListener('click', () => {
    const term = input.value.trim();
    navigateTo(`/anime?search=${encodeURIComponent(term)}`);
    sugg.style.display = 'none';
    input.value = '';
  });

  router();
});

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

function router() {
  const parts = location.pathname.split('/').filter(Boolean);
  const params = new URLSearchParams(location.search);
  const sc = document.querySelector('.search-container');
  const recSec = document.getElementById('recientes');
  const estrSec = document.getElementById('estrenos');
  const aggSec = document.getElementById('agregados');

  const path = parts[0] || '';


  const isHome = parts.length === 0 || (parts[0] === 'anime' && parts.length === 1);
  document.body.classList.toggle('home-view', isHome);

  if (isHome) {
    actualWrapper.style.display = 'flex';
    sc.style.display = 'flex';
    recSec.style.display = 'block';
    estrSec.style.display = 'block';
    aggSec.style.display = 'block';
    app.innerHTML = '';
    return;
  }

  if (path === 'lista') {
    actualWrapper.style.display = 'none';
    sc.style.display = 'none';
    recSec.style.display = 'none';
    estrSec.style.display = 'none';
    aggSec.style.display = 'none';
    renderAnimeListView(params.get('search') || '');
    return;
  }

  if (parts[0] === 'anime' && parts[1]) {
    actualWrapper.style.display = 'none';
    sc.style.display = 'flex';
    recSec.style.display = 'none';
    estrSec.style.display = 'none';
    aggSec.style.display = 'none';
    renderAnimePlayer(parts[1], parts[2]);
    return;
  }

  if (path === 'manga') {
    actualWrapper.style.display = 'none';
    sc.style.display = 'none';
    recSec.style.display = 'none';
    estrSec.style.display = 'none';
    aggSec.style.display = 'none';

    if (parts.length === 1) {
      renderMangaView();
    } else if (parts.length === 2) {
      renderMangaChapters(decodeURIComponent(parts[1]));
    } else {
      renderMangaImages(decodeURIComponent(parts[1]), decodeURIComponent(parts[2]));
    }
    return;
  }

  actualWrapper.style.display = 'none';
  sc.style.display = 'none';
  recSec.style.display = 'none';
  estrSec.style.display = 'none';
  aggSec.style.display = 'none';
  renderNotFound();
}

function renderAnimeView(searchTerm = '') {
  document.title = 'Anime - Anime & Manga';
  app.innerHTML = `<h1>Series de Anime</h1><div class="grid-cards" id="anime-list"></div>`;
  populateAnimeGrid(searchTerm);
}

function renderAnimeListView() {
  document.title = 'Lista de Animes – Anime & Manga';
  app.innerHTML = `
    <h1>Series de Anime</h1>
    <div class="filtros-form">
      <input type="text" id="filtro-nombre" placeholder="Buscar por nombre…" />

      <label>
        Tipo
        <select id="filtro-tipo">
          <option value="">Todos</option>
          <option value="anime">Anime</option>
          <option value="pelicula">Película</option>
          <option value="ova">OVA</option>
          <option value="ona">ONA</option>
          <option value="especiales">Especiales</option>
          <option value="liveaction">Live Action</option>
        </select>
      </label>

      <label>
        Estado
        <select id="filtro-estado">
          <option value="">Todos</option>
          <option value="finalizado">Finalizado</option>
          <option value="emision">En emisión</option>
        </select>
      </label>

      <label>
        Año
        <select id="filtro-anio">
          <option value="">Todos</option>
        </select>
      </label>
    </div>

    <div class="grid-cards" id="anime-list"></div>
  `;

  const anioSelect = document.getElementById('filtro-anio');
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1980; y--) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    anioSelect.appendChild(opt);
  }

  const nombreInput = document.getElementById('filtro-nombre');
  const tipoSelect = document.getElementById('filtro-tipo');
  const estadoSelect = document.getElementById('filtro-estado');

  const handleFilter = () => {
    const nombre = nombreInput.value.trim().toLowerCase();
    const tipo = tipoSelect.value;
    const estado = estadoSelect.value;
    const anio = anioSelect.value;
    populateAnimeGrid(nombre, { tipo, estado, anio });
  };

  const debouncedFilter = debounce(handleFilter, 300);

  nombreInput.addEventListener('input', debouncedFilter);
  tipoSelect.addEventListener('change', handleFilter);
  estadoSelect.addEventListener('change', handleFilter);
  anioSelect.addEventListener('change', handleFilter);

  populateAnimeGrid('', {});
}

function populateAnimeGrid(searchTerm = '', filters = {}) {
  const { tipo, estado, anio } = filters;
  const cont = document.getElementById('anime-list');
  cont.innerHTML = '';

  let entries = Object.entries(animeData).filter(([, info]) => !searchTerm || info.name.toLowerCase().includes(searchTerm));

  if (tipo) entries = entries.filter(([, info]) => info.tipo === tipo);
  if (estado) entries = entries.filter(([, info]) => info.estado === estado);
  if (anio) entries = entries.filter(([, info]) => String(info.año) === String(anio));

  entries.sort((a, b) => {
    const na = a[1].name.toLowerCase();
    const nb = b[1].name.toLowerCase();
    const da = /^\d/.test(na) ? 0 : 1;
    const db = /^\d/.test(nb) ? 0 : 1;
    if (da !== db) return da - db;
    return na.localeCompare(nb);
  });

  if (!entries.length) {
    cont.innerHTML = '<p class="no-results">No se encontraron series que coincidan con esos criterios.</p>';
    return;
  }

  entries.forEach(([key, { name, imgUrl }]) => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `<img src="${imgUrl}" alt="${name}"><p>${name}</p>`;
    card.onclick = () => navigateTo(`/anime/${key}/1`);
    cont.appendChild(card);
  });
}

/* ================================
   VISTAS MANGA
================================ */
async function renderMangaView() {
  document.title = 'Manga - Anime & Manga';
  app.innerHTML = `<h1>Series de Manga</h1><div class="grid-cards" id="manga-list"></div>`;
  const series = await fetch(`${API}/capitulos`).then(r => r.json());
  const cont = document.getElementById('manga-list');

  series.forEach(({ name }) => {
    const card = document.createElement('div');
    card.className = 'manga-card';
    card.innerHTML = `<img src="" alt="${name}"><p>${name}</p>`;
    card.onclick = () => navigateTo(`/manga/${encodeURIComponent(name)}`);

    fetch(`${API}/portada/${encodeURIComponent(name)}`)
      .then(r => r.json())
      .then(({ url }) => {
        card.querySelector('img').src = url || placeholder();
      })
      .catch(() => {
        card.querySelector('img').src = placeholder();
      });

    cont.appendChild(card);
  });
}

async function renderMangaChapters(serie) {
  document.title = `${serie} - Manga - Anime & Manga`;
  app.innerHTML = `
    <button id="back" class="chap-back">← Volver</button>
    <h3 class="manga-chapters-title">CAPÍTULOS</h3>
    <div class="grid-cards" id="manga-chaps"></div>
  `;

  document.getElementById('back').onclick = () => navigateTo('/manga');

  const subs = await fetch(`${API}/subcapitulos/${encodeURIComponent(serie)}`).then(r => r.json());
  const cont = document.getElementById('manga-chaps');
  cont.innerHTML = '';

  subs.forEach(({ name }) => {
    const card = document.createElement('div');
    card.className = 'capitulo-card';
    card.innerHTML = `<p>${name}</p>`;
    card.onclick = () => navigateTo(`/manga/${encodeURIComponent(serie)}/${encodeURIComponent(name)}`);
    cont.appendChild(card);
  });
}

async function renderMangaImages(serie, cap) {
  document.title = `${serie} / ${cap} - Manga - Anime & Manga`;

  app.innerHTML = `
    <div class="chapter-submenu">
      <button class="sub-back" aria-label="Volver a capítulos">← Volver</button>
      <span class="chapter-label">Capítulo ${cap}</span>

      <div class="view-switch">
        <button class="view-btn active" data-view="cascade">Cascada</button>
        <button class="view-btn" data-view="carousel">Carrusel</button>
      </div>

      <div class="chapter-nav">
        <button class="chap-prev" aria-label="Capítulo anterior" disabled>Anterior</button>
        <button class="chap-next" aria-label="Siguiente capítulo" disabled>Siguiente</button>
      </div>
    </div>

    <h2>${serie} / ${cap}</h2>

    <div id="cascade" class="cascade-mode"><div id="images-cascade"></div></div>
    <div id="carousel" class="carousel-mode" style="display:none">
      <button id="prev" class="carousel-arrow left" aria-label="Anterior imagen">&#10094;</button>
      <img id="img-carousel" src="" alt="">
      <button id="next" class="carousel-arrow right" aria-label="Siguiente imagen">&#10095;</button>
    </div>
  `;

  document.querySelector('.sub-back').onclick = () => navigateTo(`/manga/${encodeURIComponent(serie)}`);

  const chapters = await fetch(`${API}/subcapitulos/${encodeURIComponent(serie)}`).then(r => r.json()).catch(() => []);
  const currentIdx = chapters.findIndex(ch => ch.name === cap);

  const prevChapBtn = document.querySelector('.chap-prev');
  const nextChapBtn = document.querySelector('.chap-next');
  if (currentIdx > 0) prevChapBtn.disabled = false;
  if (currentIdx < chapters.length - 1) nextChapBtn.disabled = false;

  prevChapBtn.onclick = () => {
    if (currentIdx > 0) {
      const prevCap = chapters[currentIdx - 1].name;
      navigateTo(`/manga/${encodeURIComponent(serie)}/${encodeURIComponent(prevCap)}`);
    }
  };
  nextChapBtn.onclick = () => {
    if (currentIdx < chapters.length - 1) {
      const nextCap = chapters[currentIdx + 1].name;
      navigateTo(`/manga/${encodeURIComponent(serie)}/${encodeURIComponent(nextCap)}`);
    }
  };

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelector('.view-btn.active').classList.remove('active');
      e.currentTarget.classList.add('active');
      const view = e.currentTarget.dataset.view;
      document.getElementById('cascade').style.display = view === 'cascade' ? 'block' : 'none';
      document.getElementById('carousel').style.display = view === 'carousel' ? 'flex' : 'none';
    });
  });

  const imgs = await fetch(`${API}/imagenes/${encodeURIComponent(serie)}/${encodeURIComponent(cap)}`)
    .then(r => r.json())
    .catch(() => []);

  const cascadeContainer = document.getElementById('images-cascade');
  const carouselImg = document.getElementById('img-carousel');
  let idx = 0;

  cascadeContainer.innerHTML = '';
  imgs.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    cascadeContainer.appendChild(img);
  });

  if (imgs.length) carouselImg.src = imgs[0];

  document.getElementById('prev').onclick = () => {
    idx = (idx - 1 + imgs.length) % imgs.length;
    carouselImg.src = imgs[idx];
  };
  document.getElementById('next').onclick = () => {
    idx = (idx + 1) % imgs.length;
    carouselImg.src = imgs[idx];
  };

  document.addEventListener('keydown', e => {
    if (document.getElementById('carousel').style.display !== 'none') {
      if (e.key === 'ArrowRight' || e.key === 'Enter') document.getElementById('next').click();
      if (e.key === 'ArrowLeft') document.getElementById('prev').click();
    }
  });
  carouselImg.addEventListener('click', () => document.getElementById('next').click());
}

/* ================================
   VISTA PLAYER ANIME
================================ */
async function renderAnimePlayer(key, startIndex) {
  const info = animeData[key];
  if (!info) return renderNotFound();

  document.title = `${info.name} – Player`;
  app.innerHTML = '';

  const ficha = infoAnimes[key] || {};
  const divInfo = document.createElement('div');
  divInfo.className = 'info-anime';
  divInfo.innerHTML = `
    <div class="info-portada">
      <img src="${ficha.imagen || info.imgUrl}" alt="Portada ${ficha.nombre || info.name}">
    </div>
    <div class="info-datos">
      <h2>${ficha.nombre || info.name}</h2>
      ${ficha.año ? `<p><strong>Año:</strong> ${ficha.año}</p>` : ''}
      ${ficha.genero ? `<p><strong>Género:</strong> ${ficha.genero}</p>` : ''}
      ${ficha.descripcion ? `<p class="descripcion">${ficha.descripcion}</p>` : ''}
    </div>
  `;
  app.appendChild(divInfo);

  const player = document.createElement('div');
  player.className = 'player-container';

  const chapPanel = document.createElement('div');
  chapPanel.className = 'chapter-panel';
  chapPanel.innerHTML = `
    <h3>CAPÍTULOS</h3>
    <input type="text" id="chap-search" placeholder="Buscar capítulo">
    <div class="chapter-list"><ul id="chap-list"></ul></div>
    <div class="chapter-nav">
      <button id="chap-up">↑</button>
      <button id="chap-down">↓</button>
    </div>
  `;
  player.appendChild(chapPanel);

  const central = document.createElement('div');
  central.className = 'video-panel';
  central.innerHTML = `
    <div id="server-selector">
      <button id="btnStreamwish" class="server-btn">Streamwish</button>
      <button id="btnStreamtape" class="server-btn">Streamtape</button>
    </div>

    <div id="idioma-selector">
      <button id="btnLatino" class="idioma-btn">Latino</button>
      <button id="btnJapones" class="idioma-btn">Japonés</button>
    </div>

    <div id="video-player"></div>
  `;
  player.appendChild(central);

  const right = document.createElement('aside');
  right.className = 'sidebar-relations';
  right.innerHTML = `
    <h3 class="relations-title">Relacionados</h3>
    <ul class="relations-list"></ul>
  `;
  player.appendChild(right);

  app.appendChild(player);

  const relationsList = right.querySelector('.relations-list');

  function renderRelaciones(currentKey, container) {
    container.innerHTML = '';
    const infoRel = animeData[currentKey].relaciones;
    if (!infoRel) return;

    const tiposLabels = {
      precuela: 'Precuela',
      secuela: 'Secuela',
      serie: 'Serie',
      ovas: 'OVA',
      especiales: 'Especiales',
      peliculas: 'Películas',
      liveaction: 'Live Action'
    };

    Object.entries(infoRel).forEach(([tipo, valor]) => {
      const keys = Array.isArray(valor) ? valor : [valor];
      keys.forEach(idRel => {
        const animeR = animeData[idRel];
        if (!animeR) return;

        const div = document.createElement('div');
        div.className = 'rel-item';
        div.innerHTML = `
          <a href="/anime/${idRel}/1" data-link>
            <img src="${animeR.imgUrl}" alt="${animeR.name}">
            <p>${tiposLabels[tipo] || tipo}</p>
          </a>
        `;
        container.appendChild(div);
      });
    });
  }

  renderRelaciones(key, relationsList);

  const btnWish = document.getElementById('btnStreamwish');
  const btnTape = document.getElementById('btnStreamtape');
  const btnLat = document.getElementById('btnLatino');
  const btnJap = document.getElementById('btnJapones');
  const ul = document.getElementById('chap-list');
  const videoPlayer = document.getElementById('video-player');

  let currentEpisode = Math.max(parseInt(startIndex || '1', 10), 1);
  let files = [];
  let filesByEpisode = new Map();

  const wishHasAny = hasAnyFolder(info, 'streamwish');
  const tapeHasAny = hasAnyFolder(info, 'streamtape');

  if (!wishHasAny) btnWish.style.display = 'none';
  if (!tapeHasAny) btnTape.style.display = 'none';

  function syncServerButtons() {
    btnWish.classList.toggle('activo', servidorActual === 'streamwish');
    btnTape.classList.toggle('activo', servidorActual === 'streamtape');
    localStorage.setItem('servidorActual', servidorActual);
  }

  function syncLanguageButtons() {
    btnLat.classList.toggle('activo', idiomaActual === 'latino');
    btnJap.classList.toggle('activo', idiomaActual === 'japones');
    localStorage.setItem('idiomaActual', idiomaActual);
  }

  function fallbackServerAndLanguage() {
    let folder = getFolderIdByServer(info, servidorActual, idiomaActual);

    if (!folder) {
      const altIdioma = idiomaActual === 'latino' ? 'japones' : 'latino';
      const altFolder = getFolderIdByServer(info, servidorActual, altIdioma);

      if (altFolder) {
        idiomaActual = altIdioma;
        syncLanguageButtons();
        folder = altFolder;
      }
    }

    if (!folder) {
      const otherServer = servidorActual === 'streamwish' ? 'streamtape' : 'streamwish';
      const otherFolder = getFolderIdByServer(info, otherServer, idiomaActual);

      if (otherFolder) {
        servidorActual = otherServer;
        syncServerButtons();
        folder = otherFolder;
      }
    }

    return folder;
  }

  function extractEpisodeNumber(text) {
    const title = String(text || '');
    let match = title.match(/(?:cap(?:itulo)?|ep(?:isodio)?)[\s._-]*0*(\d{1,4})/i);
    if (match) return parseInt(match[1], 10);
    const nums = title.match(/\d+/g);
    return nums ? parseInt(nums[nums.length - 1], 10) : null;
  }

  async function cargarCapitulos() {
    const fld = fallbackServerAndLanguage();

    if (!fld) {
      ul.innerHTML = '<li>No disponible</li>';
      videoPlayer.innerHTML = '<p class="no-video">No hay capítulos para este servidor o idioma.</p>';
      return;
    }

    try {
      const res = await fetch(`${API}/videos/${servidorActual}/${encodeURIComponent(fld)}`);
      const data = await res.json();

      files = Array.isArray(data.files) ? data.files.slice() : [];
      filesByEpisode.clear();

      files.forEach(file => {
        const numero = extractEpisodeNumber(file.title || file.name || file.file_code || '');
        if (numero !== null && !filesByEpisode.has(numero)) {
          filesByEpisode.set(numero, file);
        }
      });

      renderLista();

      const requestedFile = filesByEpisode.get(currentEpisode);
      if (requestedFile) {
        loadVideo(requestedFile.file_code, currentEpisode);
      } else {
        videoPlayer.innerHTML = `<p class="no-video">Capítulo no disponible</p>`;
      }

    } catch (err) {
      console.error(err);
      ul.innerHTML = '<li>Error al cargar capítulos</li>';
      videoPlayer.innerHTML = '<p class="no-video">Error al cargar el reproductor.</p>';
    }
  }

  function renderLista() {
    ul.innerHTML = '';
    const total = Number(info.capitulos || files.length || 0);

    for (let ep = 1; ep <= total; ep++) {
      const li = document.createElement('li');
      li.textContent = ep;
      li.dataset.episode = ep;

      const file = filesByEpisode.get(ep);

      if (!file) {
        li.classList.add('no-disponible');
        li.addEventListener('click', () => {
          currentEpisode = ep;
          renderLista();
          videoPlayer.innerHTML = `<p class="no-video">Capítulo no disponible</p>`;
        });
      } else {
        li.addEventListener('click', () => loadVideo(file.file_code, ep));
      }

      ul.appendChild(li);
    }

    const active = ul.querySelector(`li[data-episode="${currentEpisode}"]`);
    if (active) active.classList.add('active');
  }

  function loadVideo(code, ep) {
    videoPlayer.innerHTML = `
      <iframe src="${getEmbedUrl(servidorActual, code)}" frameborder="0" allowfullscreen></iframe>
    `;
    currentEpisode = ep;
    renderLista();
  }

  // Botones de idioma y servidor
  btnLat.addEventListener('click', () => cambiarIdioma('latino'));
  btnJap.addEventListener('click', () => cambiarIdioma('japones'));
  btnWish.addEventListener('click', () => cambiarServidor('streamwish'));
  btnTape.addEventListener('click', () => cambiarServidor('streamtape'));

  function cambiarIdioma(nuevo) {
    if (idiomaActual === nuevo) return;
    idiomaActual = nuevo;
    syncLanguageButtons();
    cargarCapitulos();
  }

  function cambiarServidor(nuevo) {
    if (servidorActual === nuevo) return;
    servidorActual = nuevo;
    syncServerButtons();
    cargarCapitulos();
  }

  const chapSearch = document.getElementById('chap-search');
  document.getElementById('chap-up').onclick = () => {
    document.querySelector('.chapter-list').scrollBy({ top: -100, behavior: 'smooth' });
  };
  document.getElementById('chap-down').onclick = () => {
    document.querySelector('.chapter-list').scrollBy({ top: 100, behavior: 'smooth' });
  };

  chapSearch.addEventListener('input', e => {
    const q = e.target.value.trim();
    if (!q) return;
    const target = ul.querySelector(`li:nth-child(${parseInt(q, 10)})`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Inicializar servidor e idioma
  const initialServerOk =
    getFolderIdByServer(info, servidorActual, idiomaActual) ||
    getFolderIdByServer(info, servidorActual, idiomaActual === 'latino' ? 'japones' : 'latino');

  if (!initialServerOk) {
    if (wishHasAny) servidorActual = 'streamwish';
    else if (tapeHasAny) servidorActual = 'streamtape';
  }

  syncServerButtons();
  syncLanguageButtons();
  await cargarCapitulos();
}