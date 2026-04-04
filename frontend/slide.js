// frontend/slide.js

// Inyecta los estados "agregado" y "estreno" en sus secciones correspondientes
function initSlides() {
  const estrContainer = document.getElementById('estrenos');
  const aggContainer = document.getElementById('agregados');
  if (!estrContainer || !aggContainer) return;

  // Crear encabezados y contenedores internos
  estrContainer.innerHTML = `
    <h2>Estrenos</h2>
    <div id="estrenos-list" class="slide-list"></div>
  `;

  aggContainer.innerHTML = `
    <h2>Agregados</h2>
    <div id="agregados-list" class="slide-list"></div>
  `;

  const estrenoList = document.getElementById('estrenos-list');
  const agregadoList = document.getElementById('agregados-list');

  const agregadoKeys = [];
  const estrenoKeys = [];

  for (const [key, info] of Object.entries(infoAnimes)) {
    if (info.estado === 'agregado') agregadoKeys.push(key);
    if (info.estado === 'estreno') estrenoKeys.push(key);
  }

  // Función para crear tarjeta
  const makeCard = (key) => {
    const anime = infoAnimes[key];
    const card = document.createElement('div');
    card.className = 'slide-card';
    card.innerHTML = `
      <img src="${anime.imagen}" alt="${anime.nombre}">
      <p class="anime-name">${anime.nombre}</p>
    `;
    card.onclick = () => navigateTo(`/anime/${key}/1`);
    return card;
  };

  // Añadir "Estrenos" (hasta 14)
  estrenoKeys.slice(0, 14).forEach(key => {
    estrenoList.appendChild(makeCard(key));
  });

  // Añadir "Agregados" (hasta 14)
  agregadoKeys.slice(0, 14).forEach(key => {
    agregadoList.appendChild(makeCard(key));
  });
}

window.addEventListener('DOMContentLoaded', initSlides);
window.addEventListener('popstate', initSlides);
