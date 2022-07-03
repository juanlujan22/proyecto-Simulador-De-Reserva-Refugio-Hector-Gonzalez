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

//BOTON COTIZADOR


let btnCotizador = document.getElementById("btnCotizador");
btnCotizador.onclick=()=>{
    //SE UTILIZO OPERADOR TERNARIOLA PARA REEMPLAZAR LA FUNCION "cotizarAlojamiento()""
    let mod = confirm("Seleccione:\naceptar p/ cotizar Habitación\ncancelar p/cotizar Carpa");
    let cantNoches = Number(prompt("Ingrese cantidad de Noches"));
    
    const cotizarAlojamiento =  mod===true ? precioBase += habitacion*cantNoches : precioBase += carpa*cantNoches;

    // SE UTILIZO OPERADOR TERNARIO PARA  "adicionarServicio()" Y SE UTILIZO EL SUGAR SINTAX  +=    
    let adicionalAsado = confirm("Desea adicionar un asado al menú por $800? \n \nCuando regreses de la cima del Champaquí, te esperamos con un asado");
    let adicionalVianda = confirm("Desea adicionar una vianda por $300? \n \nLo vas a necesitar en tu trekking hacia la cima del cerro Champaquí");
    let adicionalPorteoMochila = confirm("Desea adicionar servicio de traslado de mochila en mula, por $2000? \n \nTe llevamos tu mochila, ida y vuelta, alivianandote el peso");
    let adicionalGuiaMontaña = confirm("Desea adicionar servicio de guía de montaña habilitado, por $6000? \n \nSi es tu primer trekking a esta zona este servicio es muy recomendado");

    const adicionarAsado = adicionalAsado === true ? adicionales += asado : adicionales += 0 ;
    const adicionarVianda = adicionalVianda === true ? adicionales += vianda : adicionales += 0 ;
    const adicionarPorteo = adicionalPorteoMochila === true ? adicionales += porteoMochila : adicionales += 0 ;
    const adicionarGuia = adicionalGuiaMontaña === true ? adicionales += guiaHabilitado : adicionales += 0 ;

    console.log("agrega $"+ asado +" de asado, obteniendo un subtotal $"+ adicionarAsado)
    console.log("agrega $"+ vianda+" de vianda, obteniendo un subtotal de $"+adicionarVianda)
    console.log("agrega $"+ porteoMochila+" de porteo de mochila, obteniendo un subtotal de $"+adicionarPorteo)
    console.log("agrega $"+ guiaHabilitado+" de guía habilitado, obteniendo un subtotal de $"+adicionarGuia)

    //aviso informativo sweet alert con la suma 
    Swal.fire(
        "En total es $"+(adicionales + cotizarAlojamiento),
        "Alojamiento $"+(cotizarAlojamiento)+";  Adicionales $"+(adicionales), 
        "info",
        );
    
};

//INTERACCION CON HTML: imprimir servicios, opcionales y precios

function imprimirServicios(servicios) {
 let contenedor = document.getElementById("contenedor")
 for(const servicio of servicios) {
    let card = document.createElement("div");
    card.classList.add("col-12")
    card.innerHTML = `
    <div class="card border border-success border-3 mx-auto m-1" style="width: 18rem;">
     <img src="${servicio.img}" class="card-img-top" alt="imagen de servicio o adicional">
        <div class="card-body shadow-lg">
            <p class="card-text"> ${servicio.item} <br> <strong> $ ${servicio.valor}</strong></p>
        </div>
    </div>`
    contenedor.appendChild(card)       
 }
}

imprimirServicios(servicios)

imprimirServicios(opcionales)


// BOTON HTML DE RESERVA, QUE MUESTRA O OCULTA FORMULARIO PARA RESERVAR.

let botonReserva = document.getElementById("btnReserva")
botonReserva.addEventListener("click", mostrarOcultarFormulario)

let contenedor = document.getElementById("contenedorReserva")

function mostrarOcultarFormulario () {
    if (contenedor.style.display == "none" || contenedor.style.display =="") {
        contenedor.style.display = "block";
        contenedor.className = "d-block";
        foco()
    } else {
        contenedor.className = "d-none";
        contenedor.style.display = "none";
    }
}



//foco al primer input del formulario
function foco() {
    document.getElementById("modalidad").focus();
}
// TOMA DE DATOS DEL FORMULARIO POR MEDIO DE DOM

let campoModalidad = document.getElementById("modalidad");
let campoNombre = document.getElementById("nombre");                  
let campoApellido = document.getElementById("apellido");              
let campoEmail = document.getElementById("email");                    
let campoTelefono = document.getElementById("telefono");             
let campoCantidadLugares = document.getElementById("cantidadLugares");
let campoNoches = document.getElementById("noches");                  
let campoFecha = document.getElementById("fecha");                    
let form = document.getElementById("form");                  

let botonSubmit = document.getElementById('button');

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

//creacion de check box de adicionales en el formulario

function mostrarAdicionales(adicionales){
    const contenedorAdicionales=document.getElementById("adicionales")
    contenedorAdicionales.innerHTML=""
    adicionales.forEach(adicional => {
        contenedorAdicionales.innerHTML+=`
            <div class="col-12">
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
let date = new Date;
function imprimirDatosReserva() {
    
    let contenedorDatosReserva = document.getElementById("contenedorDatosReserva")
    date = new Date;
    let card = document.createElement("div");
    card.innerHTML = `
        <div class="card m-4 d-flex align-items-center">
            <img src="./img/imprimirDatosReserva.png" class="card-img-top w-50 " alt="imagen referente a datos de reserva">
            <div class="card-body">
            <h5 class="card-title">Esto son los datos de tu Reserva</h5>
            <p class="card-text">* La reserva esta a <strong>Nombre</strong> de:${campoApellido.value}, ${campoNombre.value}, . <br>
             * En la <strong>Modalidad</strong>: ${campoModalidad.value}. <br>
             * En la <strong>Fecha</strong>:  ${campoFecha.value}. <br>
             * <strong>Cantidad de lugares</strong> reservados: ${campoCantidadLugares.value}. <br>
             * <strong>Cantidad de noches</strong> en el refugio: ${campoNoches.value}. <br> 
             </p>
            <p class="card-text"><small class="text-muted">Esta Reserva, se realizo el: ${date.toLocaleDateString()}</small></p>
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
  

   //JSON
   console.log(listaReservasClientes);
   listaReservasClientes.unshift(nuevaReserva());

   reservaJsonEnLocal("reservaJsonEnLocal", JSON.stringify(listaReservasClientes));
   const reservaJsonAObjeto = JSON.parse(localStorage.getItem("reservaJsonEnLocal"));
   console.log(reservaJsonAObjeto);

   imprimirDatosReserva();
   
   //libreria envio de datos por Email
   event.preventDefault();

   botonSubmit.value = 'Enviando Mail de Reserva...';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      botonSubmit.value = 'Efectuar Reserva';
      Swal.fire( "La Reserva se ha Realizado con exito!", "success");
    }, (err) => {
      botonSubmit.value = 'Efectuar Reserva';
      alert(JSON.stringify(err));
   });

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Datos de Reserva Enviado al Refugio!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });

    // validacion
   checkInput()

    form.reset();
});

// *****WEB API DEL CLIMA CON FETCH***** //

//App name juan pablo's App
// App ID 2276ee45
// Key cf7dea54ee588c11537c9b74827afa2f

//constante URLGET con la url de API del clima: http://api.weatherunlocked.com/api/current/51.50,-0.12?app_id=APP_ID&app_key=APP_KEY
// ESTRUCTURA: api/current/{-31.977373055596736, -64.90260034517549}?app_id=2276ee45&app_key=cf7dea54ee588c11537c9b74827afa2f
// se toma el objeto data y se renderizan algunos datos datos del clima en tiempo real. 
const URLGET = "http://api.weatherunlocked.com/api/current/-31.986,-64.936?lang=es&app_id=2276ee45&app_key=cf7dea54ee588c11537c9b74827afa2f";

fetch(URLGET)
.then(resultado=>resultado.json())
.then(data=>{ 
    console.log(data)
    let clima = document.getElementById("clima")
    // clima.innerText = "Clima Actual en provincia de Córdoba, Cerro Champaquí (2790m.s.n.m)"+"\n"+"Cielo Actual: "+(data.wx_desc)+"\n"+"Sensación Termica: "+(data.feelslike_c)+"°C"+"\n"+"Temperatura: "+(data.temp_c)+"°C."+"\n"+"Velocidad del viento: "+(data.windspd_kmh+"km/h")
    clima.innerHTML = `<h4 class="h-auto">Clima Actual en provincia de Córdoba, Cerro Champaquí (2790m.s.n.m)</h4> <br>
    <p> Cielo Actual: ${data.wx_desc}<br>Sensación Termica: ${data.feelslike_c}°C.<br>Temperatura: ${data.temp_c}°C.<br>Velocidad del viento: ${data.windspd_kmh}km/h.</p>
    `
})

/* 	validacion de formulario

despues del e.preventDefault() se genera una funcion para chequear los input:

inputs: 
1_select modalidad
2_input cantidad de lugar < 20
3_input cantidad de noches < 5
4_input nombre completo = sin simbolos
5_input apellido = sin simbolos
6_input email =
7_input numero de contacto =
8_input fecha de reserva < fecha actual
*/

function checkInput(){
   
    campoModalidad = document.getElementById("modalidad");
    campoNombre = document.getElementById("nombre");                  
    campoApellido = document.getElementById("apellido");              
    campoEmail = document.getElementById("email");                    
    campoTelefono = document.getElementById("telefono");             
    campoCantidadLugares = document.getElementById("cantidadLugares");
    campoNoches = document.getElementById("noches");                  
    campoFecha = document.getElementById("fecha");                    
    form = document.getElementById("form");    


	const lugaresInput = campoCantidadLugares.value;
    const nochesInput = campoNoches.value.trim();
    const nombreInput = campoNombre.value.trim();
    const apellidoInput = campoApellido.value.trim();
    const emailInput = campoEmail.value.trim();
    const telefonoInput = campoTelefono.value.trim();
    const fechaInput = campoFecha.value;
    const fechaActual = new Date();

    if (lugaresInput >= 20) {
        setErrorFor(campoCantidadLugares, 'para mas de 20 lugares, reserve via whatsapp, para trato diferenciado');
    }else if(lugaresInput <= 0) {
        setErrorFor(campoCantidadLugares, 'cantidad  de lugares no puede ser 0');}
    else {setSuccessFor(campoCantidadLugares);
    }

    if (nochesInput > 5) {
        setErrorFor(campoNoches, 'para más de 5 noches, reserve via whatsapp, para trato diferenciado');
    } else if (nochesInput <= 0) {
        setErrorFor (campoNoches, "cantidad  de noches no puede ser 0")
    }else{setSuccessFor(campoNoches);
    }

    if (nombreInput === '') {
        setErrorFor(campoNombre, 'nombre no puede quedar en blanco')
    } else if (nombreInput == isNaN()){
        setErrorFor(campoNombre, 'nombre no puede contener numeros')
    }else{setSuccessFor(campoNombre);}

    if (apellidoInput === '') {
        setErrorFor(campoApellido, 'apellido no puede quedar en blanco')
    } else if (apellidoInput == isNaN()){
        setErrorFor(campoApellido, 'apellido no puede contener numeros')
    }else{setSuccessFor(campoApellido);}

    if (emailInput === '') {
        setErrorFor(campoEmail, 'email no puede quedar en blanco')
    } else if (! isEmail(campoEmail)) { 
        setErrorFor(campoEmail, 'No ingreso un email valido')
    } else {setSuccessFor(campoEmail)}

    if (telefonoInput === '') {
        setErrorFor(campoTelefono, 'telefono no puede quedar en blanco')
    } else { setSuccessFor(campoTelefono)}


    // $('#datepicker').datepicker({
    //     ... <OTRAS OPCIONES>
    //     minDate: today 
    //     ... <OTRAS OPCIONES>
    // });

    if (fechaActual <= fechaInput) {
        setErrorFor(campoFecha, 'la fecha debe ser a partir de la fecha actual'+(fechaActual));
    } else {
        setSuccessFor(campoFecha)
    }
} 

function setErrorFor (input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}
//21:30
// el div que contiene el input lleva la class = "form-control"
// <small>Error message </small> es una etiqueta 
// form-control.error


function setSuccessFor(input){
    const formControl = input.parentElement; 
    formControl.className = 'form-control success'
}
//validacion de mail con expresion regular, fuente:https://medium.com/@jgratereaux/validar-correos-electr%C3%B3nicos-con-expresiones-regulares-7914751b6018
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}