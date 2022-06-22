//ARRAY DE LISTA DE RESERVAS Y CLIENTES

let listaReservasClientes = [];
console.log(listaReservasClientes)


// SERVICIOS Y TARIFAS DEL ALOJAMIENTO
const servicios = [
    {id: 01, 
    item:"Noche en carpa, media pensión", 
    valor: 2000,
    img:"./img/carpa.jpg"
   },

    {id: 02, 
    item:"Noche Alojamiento en Habitación, media pensión", 
    valor: 3000,
    img: "./img/camaCucheta.jpg"
   }
    
];

const opcionales = [
   {id: 03, 
   item:"Opcional asado", 
   valor: 800, 
   img: "./img/opcionalAsado.jpg"},

   {id: 04, 
   item:"Opcional vianda", 
   valor: 300, 
   img: "./img/opcionalVianda.jpg"},

   {id: 05, 
   item:"Opcional porteo de mochila", 
   valor:2000, 
   img: "./img/opcionalPorteo.jpg"},

   {id: 06, 
   item:"Opcional guía de montaña", 
   valor:6000, 
   img: "./img/opcionalGuia.jpg"}
];

const arrayAdicionales = [
   {
      id: 1,
      tipo: "carpa",
      precio: 2000
   },
   {
      id: 2,
      tipo: "habitacion",
      precio: 3000
   },
   {
      id: 3,
      tipo: "asado",
      precio: 800
   },
   {
      id: 4,
      tipo: "vianda",
      precio: 300
   },   
   {
      id: 5,
      tipo: "porteoMochila",
      precio: 2000
   },
   {
      id: 6,
      tipo: "guiaHabilitado",
      precio: 6000
   },
];
console.log(servicios)
console.log(opcionales)