// frontend/infoAnime.js
const infoAnimes = {

  //---------- ESTRENO -------------------
lazarus: {
    nombre: "Lazarus",
    año: 2024,
    genero: "Acción, Ciencia Ficción, Thriller",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377937/Lazarus_sse3kt.webp",
    descripcion: "En un futuro distópico, un grupo de rebeldes lucha contra un régimen opresivo que controla la tecnología de resurrección.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "2024-11-15"       // <<< NUEVO (ejemplo: estreno en el futuro) 
  },

 narutoShippuden: {
    nombre: "Naruto Shippuden",
    año: 2007,
    genero: "Shōnen, Aventura, Ninja",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748391276/Naruto_Shippuden_gxgmsr.jpg",
    descripcion: "Naruto Uzumaki regresa a la aldea después de dos años de entrenamiento con Jiraiya, enfrentándose a nuevos enemigos y buscando traer de vuelta a su amigo Sasuke.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "2007-02-15"       // <<< NUEVO (ejemplo: estreno en el pasado)
  },

  clannad: {
    nombre: "Clannad",
    año: 2007,
    genero: "Drama, Romance, Slice of Life",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748391271/clannad_gkw2kh.jpg",
    descripcion: "Tomoya Okazaki, un estudiante de secundaria, forma amistades y enfrenta desafíos emocionales mientras ayuda a sus compañeros de clase.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "2007-10-04"       // <<< NUEVO (ejemplo: estreno en el pasado)
  },

  neongenesis: {
    nombre: "Neon Genesis Evangelion",
    año: 1995,
    genero: "Mecha, Psicología, Ciencia Ficción",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748386999/Evangelion_pjgrye.jpg",
    descripcion: "Shinji Ikari es reclutado para pilotar un mecha gigante llamado Eva para luchar contra seres conocidos como Ángeles.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "1995-10-04"       // <<< NUEVO (ejemplo: estreno en el pasado)
  },
  codegeass: {
    nombre: "Code Geass",
    año: 2006,
    genero: "Mecha, Estrategia, Ciencia Ficción",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387000/Codegeass_dx40u0.webp",
    descripcion: "Lelouch Lamperouge obtiene el poder del Geass, que le permite controlar a otros, y usa este poder para liderar una rebelión contra el Imperio de Britannia.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "2006-10-05"       // <<< NUEVO (ejemplo: estreno en el pasado)
  },
demonhunter: {
    nombre: "Demon Hunter",
    año: 2023,
    genero: "Acción, Fantasía, Sobrenatural",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377151/2ZfAUG5CTXdM34S1OhmMW1zF_oec7fa.webp" ,
    descripcion: "Tanjiro Kamado se convierte en cazador de demonios para vengar a su familia y encontrar una cura para su hermana Nezuko, quien se ha convertido en un demonio.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "2023-04-09"       // <<< NUEVO (ejemplo: estreno en el pasado)
  },
  hunterxhunter: {
    nombre: "Hunter x Hunter",
    año: 2011,
    genero: "Aventura, Acción, Fantasía",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377118/HunterxHunter_m9g9jm.jpg",
    descripcion: "Gon Freecss se embarca en una aventura para convertirse en cazador y encontrar a su padre, enfrentándose a desafíos y enemigos en el camino.",
    estado: "estreno",         // <<< NUEVO 
    fecha:  "2011-10-02"       // <<< NUEVO (ejemplo: estreno en el pasado)
  },

  swordartonline: {
    nombre: "Sword Art Online",
    año: 2012,
    genero: "Acción, Aventura, Fantasía",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377120/SwordArtOnline_oqxq1u.jpg",
    descripcion: "Kirito, un jugador atrapado en un juego de realidad virtual mortal, debe completar el juego para escapar y salvar a los demás jugadores.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "2012-07-08"       // <<< NUEVO (ejemplo: estreno en el pasado)
  },

  fullmetalalchemist: {
    nombre: "Fullmetal Alchemist", 
    año: 2003,
    genero: "Aventura, Fantasía, Acción",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377120/FullMetalAlchemist_xfj938.jpg",
    descripcion: "Los hermanos Edward y Alphonse Elric buscan la Piedra Filosofal para restaurar sus cuerpos después de un fallido intento de resucitar a su madre mediante alquimia.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "2003-10-04"       // <<< NUEVO (ejemplo: estreno en el pasado)
  },


  //---------- AGREGADO --------------------
    deathNote: {
    nombre: "Death Note",
    año: 2006,
    genero: "Misterio, Psicológico, Sobrenatural",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377129/DeathNote_mbzjvx.jpg",
    descripcion: "Light Yagami, un estudiante brillante, encuentra un cuaderno que le permite matar a cualquier persona cuyo nombre escriba en él.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2006-10-03"       // <<< NUEVO
  },
  onePiece: {
    nombre: "One Piece",
    año: 1999,
    genero: "Aventura, Fantasía, Piratas",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377146/One_Piece_mokvom.webp",
    descripcion: "Monkey D. Luffy y su tripulación navegan por el Grand Line en busca del tesoro legendario, el One Piece.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "1999-10-20"       // <<< NUEVO
  },
  attackOnTitan: {
    nombre: "Attack on Titan",
    año: 2013,
    genero: "Acción, Fantasía, Post-apocalíptico",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377119/images_ojfbb9.jpg",
    descripcion: "En un mundo donde la humanidad vive rodeada de muros para protegerse de gigantes devoradores de humanos, Eren Yeager se une a la lucha contra ellos.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2013-04-07"       // <<< NUEVO
  },
  bleach: {
    nombre: "Bleach",
    año: 2004,
    genero: "Acción, Sobrenatural, Shōnen",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377126/Bleach_Serie_de_TV-235942666-large_akgxc5.jpg",
    descripcion: "Ichigo Kurosaki, un adolescente con la habilidad de ver fantasmas, se convierte en un Shinigami para proteger a los vivos y guiar a las almas perdidas.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2004-10-05"       // <<< NUEVO
  },
  gintama: {
    nombre: "Gintama",
    año: 2006,
    genero: "Comedia, Acción, Ciencia Ficción",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748389020/Gintama_l1sb4u.jpg",
    descripcion: "En un Japón alternativo invadido por extraterrestres, Gintoki Sakata y sus amigos realizan trabajos extraños para sobrevivir.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2006-04-04"       // <<< NUEVO
  },
  mobpsycho: {
    nombre: "Mob Psycho 100",
    año: 2016,
    genero: "Comedia, Acción, Sobrenatural",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748389025/Mob_Psycho_100_poster_qnrrsr.webp",
    descripcion: "Shigeo 'Mob' Kageyama, un chico con habilidades psíquicas, lucha por controlar sus poderes mientras enfrenta problemas adolescentes.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2016-07-11"       // <<< NUEVO
  },
  blackclover: {
    nombre: "Black Clover",
    año: 2017,
    genero: "Acción, Fantasía, Shōnen",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387012/BlackClover_p2drjw.jpg",
    descripcion: "Asta, un joven sin habilidades mágicas, sueña con convertirse en el Rey Mago y superar a su rival Yuno.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2017-10-03"       // <<< NUEVO
  },
  fairytail: {
    nombre: "Fairy Tail",
    año: 2009,
    genero: "Aventura, Fantasía, Magia",
    imagen:"https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387009/FairyTail_sxdhup.jpg" ,
    descripcion: "Lucy Heartfilia se une al gremio Fairy Tail y forma un equipo con Natsu Dragneel para encontrar al dragón Igneel.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2009-10-12"       // <<< NUEVO
  },

    opm: {
    nombre: "One Punch Man",
    año: 2015,
    genero: "Acción, Comedia, Superhéroes",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377140/One_Punch_Man_hnv4pt.webp",
    descripcion: "Saitama, un héroe que vence a cualquier enemigo de un solo golpe, busca emoción en la batalla.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2015-10-05"       // <<< NUEVO
  },
  naruto: {
    nombre: "Naruto",
    año: 2002,
    genero: "Shōnen, Aventura, Ninja",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377137/MV5BZTNjOWI0ZTAtOGY1OS00ZGU0LWEyOWYtMjhkYjdlYmVjMDk2XkEyXkFqcGc_._V1_FMjpg_UX1000__sa1kum.jpg",
    descripcion: "Naruto Uzumaki, un joven ninja solitario, sueña con convertirse en el Hokage y ganarse el respeto de su aldea.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2002-10-03"       // <<< NUEVO    
    // sin estado → no sale en ningún slide
  },
  zatchbell: {
    nombre: "ZatchBell",
    año: 2003,
    genero: "Aventura, Fantasía, Comedia",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748312916/zatchbell_yenllr.jpg",
    descripcion: "Kiyo y Zatch luchan contra otros mamodos para convertirse en el rey del mundo mamodo.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2003-04-05"       // <<< NUEVO
  },

  dragonBall: {
    nombre: "Dragon Ball",
    año: 1986,
    genero: "Aventura, Artes Marciales, Fantasía",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748391276/dragonball_ffqbri.jpg",
    descripcion: "Goku, un joven con cola de mono, busca las Dragon Balls y entrena artes marciales mientras hace amigos y enfrenta enemigos.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "1986-02-26"       // <<< NUEVO
  },

  parasyte: {
    nombre: "Parasyte",
    año: 2014,
    genero: "Horror, Ciencia Ficción, Acción",
    imagen:"https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748389022/Parasyte_di6xmk.jpg",
    descripcion: "Shinichi Izumi es infectado por un parásito alienígena que toma control de su mano derecha, y juntos deben luchar contra otros parásitos.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2014-10-04"       // <<< NUEVO
  },
  claymore: {
    nombre: "Claymore",
    año: 2007,
    genero: "Aventura, Fantasía, Acción",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1750341399/claymore_balm3o.webp",
    descripcion: "Clare, una guerrera mitad humana y mitad demonio, lucha contra criaturas llamadas Yoma para proteger a la humanidad.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2007-04-03"       // <<< NUEVO
  },
  // ... resto sin modificar
};