class Reserva{
	constructor (modalidad, nombre, apellido, email, telefono, cantidadLugares, noches, fecha){
		this.modalidad = modalidad;
        this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.telefono = telefono;
		this.cantidadLugares = cantidadLugares;
		this.noches = noches; 
	 	this.fecha = fecha; 
		this.reserva = false; 
	}
	reservaConfirmada() { 
		this.reserva=true; 
	} 
} 

//INTERACCION CON HTML: imprimir servicios, opcionales y precios

function imprimirServicios(servicios) {
 let contenedor = document.getElementById("contenedor")
 for(const servicio of servicios) {
    let card = document.createElement("div");
    card.classList.add("col-12")
    card.innerHTML = `
    <div class="card mx-auto" style="width: 18rem;">
     <img src="${servicio.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text"> ${servicio.item} <br> <strong> $ ${servicio.valor}</strong></p>
        </div>
    </div>`
    contenedor.appendChild(card)      
 }
}

imprimirServicios(servicios)

imprimirServicios(opcionales)


// BOTON HTML DE RESERVA, QUE MUESTRA O OCULTA FORMULARIO PARA RESERVAR.

let botonReserva = document.getElementById ("btnReserva")
botonReserva.addEventListener("click", mostrarOcultarFormulario)


function mostrarOcultarFormulario () {
    let contenedor = document.getElementById("contenedorReserva")
    if(contenedor.style.display =="" || contenedor.style.display == "none") {
        console.log("hiciste click!");
        contenedor.className = "d-block";
      }
      else {
        console.log("hiciste clanck")
        contenedor.className = "d-none";
    }
}   

// TOMA DE DATOS DEL FORMULARIO POR MEDIO DE DOM

let campoModalidad = document.getElementById ("modalidad");
let campoNombre = document.getElementById("nombre");                  
let campoApellido = document.getElementById("apellido");              
let campoEmail = document.getElementById("email");                    
let campoTelefono = document.getElementById("telefono");             
let campoCantidadLugares = document.getElementById("cantidadLugares");
let campoNoches = document.getElementById("noches");                  
let campoFecha = document.getElementById("fecha");                    
let form = document.getElementById("form");                  


document.getElementById('form')
 .addEventListener('submit', function(event) {
    event.preventDefault()
    console.log(listaReservasClientes);
    listaReservasClientes.unshift(nuevaReserva());

    reservaJsonEnLocal("reservaJsonEnLocal", JSON.stringify(listaReservasClientes));
    const reservaJsonAObjeto = JSON.parse(localStorage.getItem("reservaJsonEnLocal"));
    console.log(reservaJsonAObjeto);
    
    imprimirDatosReserva();
    //SE UTILIZO OPERADOR TERNARIOLA PARA REEMPLAZAR LA FUNCION "cotizarAlojamiento()""
    const cotizarAlojamiento =  campoModalidad.value == "Habitacion" ? precioBase += habitacion*campoNoches.value : precioBase += carpa*campoNoches.value;
    
    Swal.fire( "El valor correspondiente a los dias de alojamiento"," es de $"+ (cotizarAlojamiento), "success")

    // SE UTILIZO OPERADOR TERNARIO PARA  "adicionarServicio()" Y SE UTILIZO EL SUGAR SINTAX  +=    
    let adicionalAsado = confirm("Desea adicionar un asado al menú por $800? \n \n Cuando regreses de la cima del Champaquí, te esperamos con un asado");
    let adicionalVianda = confirm("Desea adicionar una vianda por $300? \n \n Lo vas a necesitar en tu trekking hacia la cima del cerro Champaquí");
    let adicionalPorteoMochila = confirm("Desea adicionar servicio de traslado de mochila en mula, por $2000? \n \n Te llevamos tu mochila, ida y vuelta, alivianandote el peso");
    let adicionalGuiaMontaña = confirm("Desea adicionar servicio de guía de montaña habilitado, por $6000? \n \n Si es tu primer trekking a esta zona este servicio es muy recomendado");

    const adicionarAsado = adicionalAsado === true ? adicionales += asado : adicionales += 0 ;
    const adicionarVianda = adicionalVianda === true ? adicionales += vianda : adicionales += 0 ;
    const adicionarPorteo = adicionalPorteoMochila === true ? adicionales += porteoMochila : adicionales += 0 ;
    const adicionarGuia = adicionalGuiaMontaña === true ? adicionales += guiaHabilitado : adicionales += 0 ;

    console.log("agrega $"+ asado +" de asado, obteniendo un subtotal $"+ adicionarAsado)
    console.log("agrega $"+vianda+" de vianda, obteniendo un subtotal de $"+adicionarVianda)
    console.log("agrega $"+porteoMochila+" de porteo de mochila, obteniendo un subtotal de $"+adicionarPorteo)
    console.log("agrega $"+guiaHabilitado+" de guía habilitado, obteniendo un subtotal de $"+adicionarGuia)
    //libreria envio de datos por Email
    event.preventDefault();

    botonSubmit.value = 'Enviando...';
 
    const serviceID = 'default_service';
    const templateID = 'template_78kzate';
 
    emailjs.sendForm(serviceID, templateID, this)
     .then(() => {
       botonSubmit.value = 'Efectuar Reserva';
       Swal.fire( "La Reserva se ha Realizado con exito!", "El total de Alojamiento, más los Adicionales, es de $"+ (precioBase+adicionales), "success");
     }, (err) => {
       botonSubmit.value = 'Efectuar Reserva';
       alert(JSON.stringify(err));
     });


 //aviso informativo sweet alert con la suma 
    Swal.fire("La suma de los adicionales"," es de $"+(adicionales), "info");
    
    submit.reset();
})
//libreria envio de datos por Email
const botonSubmit = document.getElementById('button');

function nuevaReserva() { 
	
    let modalidad = campoModalidad.value;
	let noches = campoNoches.value;
    let nombre = campoNombre.value;
	let apellido = campoApellido.value;
	let email = campoEmail.value;
	let telefono = campoTelefono.value;
	let cantidadLugares = campoCantidadLugares.value;
	let fecha = campoFecha.value; 
    let adicionales= capturarAdicionales()
    return new Reserva (modalidad, nombre, apellido, email, telefono, cantidadLugares, noches, fecha, adicionales);
}


function capturarAdicionales(){
    let arrayDeSeleccionados=[]
    arrayAdicionales.forEach(adicional=>{
        let seleccionado=document.getElementById(`add${adicional.id}`)
        seleccionado.checked &&  arrayDeSeleccionados.push(arrayAdicionales.find(e=>e.id==seleccionado.value))
    })
    return arrayDeSeleccionados
}

function mostrarAdicionales(adicionales){
    const contenedorAdicionales=document.getElementById("adicionales")
    contenedorAdicionales.innerHTML=""
    adicionales.forEach(adicional => {
        contenedorAdicionales.innerHTML+=`
            <div class="col-6">
                <input type="checkbox" id="add${adicional.id}" value="${adicional.id}"/>
                <label for="add${adicional.id}">${adicional.tipo} $ ${adicional.precio}</label>
            </div>
        `        
    });
}

mostrarAdicionales(arrayAdicionales)

// COTIZADOR DE PRECIO DE LOS SERVICIOS ELEGIDOS, AL PRECIONAR EL BOTON DEL FORM "EFECTUAR RESERVA"

let precioBase = 0;
let adicionales = 0;
const carpa= 2000;
const habitacion= 3000;
const asado = 800;
const vianda = 300;
const porteoMochila = 2000;
const guiaHabilitado = 6000;

//IMPRESION DE DATOS DE LA RESERVA EN UNA CARD

function imprimirDatosReserva() {
    
    let contenedorDatosReserva = document.getElementById("contenedorDatosReserva")
    
    let card = document.createElement("div");
    card.innerHTML = `
        <div class="card m-4 d-flex align-items-center">
            <img src="./img/imprimirDatosReserva.png" class="card-img-top w-50 " alt="imagen referente a datos de reserva">
            <div class="card-body">
            <h5 class="card-title">Esto son los datos de tu Reserva</h5>
            <p class="card-text">* La reserva esta a <strong>Nombre</strong> de:${campoApellido.value}, ${campoNombre.value}, . <br>
             * En la <strong>Modalidad</strong>: ${campoModalidad.value}. <br>
             * En la <strong>Fecha</strong>:  ${campoFecha.value}. <br>
             * <strong>Cantidad de lugares</strong> reservados: ${campoFecha.value}. <br>
             * <strong>Cantidad de noches</strong> en el refugio: ${campoNoches.value}. <br> 
             </p>
            <p class="card-text"><small class="text-muted">Esta Reserva, se realizo el: ${new Date}</small></p>
            </div>
        </div>`   
    contenedorDatosReserva.appendChild(card)          
}


//STORAGE Y JSON
//guardar los datos de la nueva reserva en localstorage y recuperarlos para imprimir datos de la reserva

//funcion flecha, que guarda en localStorage el array listaReservaClientes
// se invoca la funcion reservaJsonEnLocal("reserva", JSON.stringify(listaReservasClientes)); en el evento submit.
//luego se trae el json a la variable  reservaJsonAObjeto con : const reservaJsonAObjeto = JSON.parse(localStorage.getItem("reservaJsonEnLocal"));

const reservaJsonEnLocal = (clave, valor) => {localStorage.setItem(clave,valor)}


//IMPLEMENTACION DE LIBRERIA https://www.emailjs.com/  
// aviso de nueva reserva de cliente por email. 
const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_78kzate';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});

// *****WEB API DEL CLIMA CON FETCH***** //

//App name juan pablo's App
// App ID 2276ee45
// Key cf7dea54ee588c11537c9b74827afa2f

//constante URLGET con la url de API del clima: http://api.weatherunlocked.com/api/current/51.50,-0.12?app_id=APP_ID&app_key=APP_KEY
// ESTRUCTURA: api/current/{-31.977373055596736, -64.90260034517549}?app_id=2276ee45&app_key=cf7dea54ee588c11537c9b74827afa2f
// se toma el objeto data y se renderizan algunos datos datos del clima en tiempo real. 
const URLGET = "http://api.weatherunlocked.com/api/current/-31.97,-64.90?lang=es&app_id=2276ee45&app_key=cf7dea54ee588c11537c9b74827afa2f";

fetch(URLGET)
.then(resultado=>resultado.json())
.then(data=>{ 
    console.log(data)
    let clima = document.getElementById("clima")
    clima.innerText = "Clima Actual en el Cerro Champaquí (2790m.s.n.m): "+(data.wx_desc)+"\n"+"Sensación Termica: "+(data.feelslike_c)+"°C"+"\n"+"Temperatura: "+(data.temp_c)+"°C."+"\n"+"Velocidad del viento: "+(data.windspd_kmh+"km/h")
})