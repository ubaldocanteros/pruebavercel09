// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const STREAMWISH_KEY = process.env.STREAMWISH_KEY || '';
const STREAMTAPE_LOGIN = process.env.STREAMTAPE_LOGIN || '';
const STREAMTAPE_KEY = process.env.STREAMTAPE_KEY || '';

function normalizeStreamwishFiles(files = []) {
  return files.map(file => ({
    file_code: file.file_code || file.filecode || file.id || '',
    title: file.title || file.name || '',
    uploaded: file.uploaded || file.created_at || null,
    thumbnail: file.thumbnail || file.thumb || null,
    link: file.link || null,
    size: file.size ?? null,
    provider: 'streamwish'
  }));
}

function normalizeStreamtapeFiles(files = []) {
  return files.map(file => ({
    file_code: file.linkid || file.id || '',
    title: file.name || file.title || '',
    uploaded: file.created_at || null,
    thumbnail: file.thumbnail || null,
    link:
      file.link ||
      (file.linkid
        ? `https://streamtape.com/v/${file.linkid}/${encodeURIComponent(file.name || file.title || 'video')}`
        : null),
    size: file.size ?? null,
    provider: 'streamtape',
    convert: file.convert ?? null
  }));
}

async function fetchJson(url) {
  const { data } = await axios.get(url, { timeout: 25000 });
  return data;
}

app.get('/api/videos/:provider/:folderId', async (req, res) => {
  const { provider, folderId } = req.params;

  try {
    if (provider === 'streamwish') {
      if (!STREAMWISH_KEY) {
        return res.status(500).json({ error: 'STREAMWISH_KEY no configurada' });
      }

      const url = new URL('https://api.streamwish.com/api/file/list');
      url.searchParams.set('key', STREAMWISH_KEY);
      url.searchParams.set('fld_id', folderId);
      url.searchParams.set('per_page', '100');
      url.searchParams.set('public', '');

      const data = await fetchJson(url.toString());
      const files = data?.result?.files || [];
      return res.json({
        provider: 'streamwish',
        folderId,
        files: normalizeStreamwishFiles(files)
      });
    }

    if (provider === 'streamtape') {
      if (!STREAMTAPE_LOGIN || !STREAMTAPE_KEY) {
        return res.status(500).json({ error: 'STREAMTAPE_LOGIN o STREAMTAPE_KEY no configuradas' });
      }

      const url = new URL('https://api.streamtape.com/file/listfolder');
      url.searchParams.set('login', STREAMTAPE_LOGIN);
      url.searchParams.set('key', STREAMTAPE_KEY);
      url.searchParams.set('folder', folderId);

      const data = await fetchJson(url.toString());
      const files = data?.result?.files || [];
      return res.json({
        provider: 'streamtape',
        folderId,
        files: normalizeStreamtapeFiles(files)
      });
    }

    return res.status(400).json({ error: 'Proveedor inválido' });
  } catch (err) {
    console.error(`Error en /api/videos/${provider}/${folderId}:`, err?.response?.data || err.message || err);
    return res.status(500).json({
      error: 'Error al obtener videos',
      provider,
      folderId
    });
  }
});

// 1) Listar series (carpetas raíz)
app.get('/api/capitulos', async (req, res) => {
  try {
    const result = await cloudinary.api.sub_folders('');
    const series = result.folders.map(f => ({ name: f.name }));
    res.json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener series' });
  }
});

// 2) Obtener portada de serie
app.get('/api/portada/:serie', async (req, res) => {
  const { serie } = req.params;
  try {
    const result = await cloudinary.search
      .expression(`folder:${serie}`)
      .sort_by('public_id', 'asc')
      .max_results(1)
      .execute();
    res.json({ url: result.resources[0]?.secure_url || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener portada' });
  }
});

// 3) Listar capítulos (subcarpetas) de una serie (usado SOLO para manga)
app.get('/api/subcapitulos/:serie', async (req, res) => {
  const { serie } = req.params;
  try {
    const result = await cloudinary.api.sub_folders(serie);
    const subs = result.folders.map(f => ({ name: f.name }));
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener subcapítulos' });
  }
});

// 4) Obtener imágenes de un capítulo
app.get('/api/imagenes/:serie/:capitulo', async (req, res) => {
  const { serie, capitulo } = req.params;
  const folder = `${serie}/${capitulo}`;
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by('public_id', 'asc')
      .max_results(500)
      .execute();
    const urls = result.resources.map(r => r.secure_url);
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));