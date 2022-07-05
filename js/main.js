//guardarLocal();

//const { each } = require("lodash");

//guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
// si quiero  almacenar el array completo (solo prueba)
//guardarLocal("StorageActividades", JSON.stringify(actividad));
/*class Actividad {
    constructor(obj) {
        this.activity_name = obj.activity_name;
        this.activity_date = obj.activity_date
        this.activity_value = parseFloat(obj.activity_value);
        this.location = obj.location;
        this.country = obj.country;

    }
}*/

let containerActividades = document.getElementById("containerActividades");
let alertProximasActividades = document.getElementById("alertProximasActividades");
let contenedor_fav = document.getElementById("contenidoFavoritos");

let actividades = [];
let actividades1 = [];
let favoritos = [];

//localStorage.setItem("StorageActividades", JSON.stringify(actividad));

localStorage.removeItem("StorageFavoritos");
cargarActividades();
cargarFavoritos();

mostrarActividades();
mostrarActividadesFavoritas();


/*Inicio Actividades*/
class Actividades {
    constructor(nombreActividad, valorActividad, fechaActividad) {
        this.nombreActividad = nombreActividad
        this.valorActividad = valorActividad
        this.fechaActividad = fechaActividad
    }
    calcularCuantosDiasFaltan(nombreActividad, fechaActividad, fechaHoy) {
        let difMiliseg = Math.abs(fechaActividad - Date.parse(fechaHoy))
        let resta = difMiliseg / (1000 * 60 * 60 * 24)
    }
}





function cargarActividades() {
    if (localStorage.getItem("StorageActividades") !== null) { //si existe
        console.log("pasa por actividades");
        actividades = JSON.parse(localStorage.getItem("StorageActividades"));
        return;
    } else { //Si no existe lo creo porque es la primera vez que abro la pagina
        localStorage.setItem("StorageActividades" /*Clave*/ , JSON.stringify(actividad)); //Acá estoy convirtiendo actividad en un string para almacenarloen el LocalStorage
        return;
    }
}

//Carga actividades favoriteadas en el LocalStorage
function cargarFavoritos() {
    if (localStorage.getItem("StorageFavoritos") !== null) { //Si existe
        console.log("pasa por las actividades Favoritas cargadas");
        favoritos = JSON.parse(localStorage.getItem("StorageFavoritos"));
        favoritos.forEach(element => {
            console.log("nombre de (actividad)elemento: " + element.activity_name);
        })
        return;
    } else {
        localStorage.setItem("StorageFavoritos", JSON.stringify(favoritos));
        console.log("No tiene actividades Favoritas cargadas");
        return;
    }
}

function mostrarActividades() {
    actividad.forEach((actividad) => {
        containerActividades.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">${actividad.activity_name}</div>
        <div class="card-body">
            <h4 class="card-title">${(actividad.activity_date)}</h4>
            <h5>${actividad.location}</h5>
            <h5>Faltan ${calcularCuantosDiasFaltan(actividad.activity_date)} días</h5>
            <p class="card-text">$ ${actividad.activity_value}</p>
            <button onClick="actividadFavorita(${actividad})" class="btn btn-outline-success">Favoritear</button>
        </div>
        </div>
        `;

    });
}


function mostrarActividadesFavoritas() {
    favoritos.forEach((favoritos) => {
        console.log("pOR MOSTRAR ACTIVIDADES fAVORITAS: " + favoritos);
        contenidoFavoritos.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">${favoritos.activity_name}</div>
        <div class="card-body">
            <h4 class="card-title">${(favoritos.activity_date)}</h4>
            <h5>${favoritos.location}</h5>
            <h5>Faltan ${calcularCuantosDiasFaltan(favoritos.activity_date)} días</h5>
            <p class="card-text">$ ${favoritos.activity_value}</p>
            <button onClick="eliminarFavorita(${favoritos.id})" class="btn btn-outline-success">Des Favoritear</button>
        </div>
        </div>
        `;

    });
}





function formatearFechaDDMMAA(fecha) {
    let date = new Date(fecha);
    let fechaFormateada = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
    return fechaFormateada;
}


function calcularCuantosDiasFaltan(fechaActividad) {
    let fechaHoy = new Date();
    let difMiliseg = Math.abs(Date.parse(fechaActividad) - Date.parse(fechaHoy))
    let resta = Math.round(difMiliseg / (1000 * 60 * 60 * 24))
    return resta;


}

function calcularDistancia(fechaActividad) {
    let fechaHoy = new Date();
    let difMiliseg = Math.abs(Date.parse(fechaActividad) - Date.parse(fechaHoy))
    let resta = Math.round(difMiliseg / (1000 * 60 * 60 * 24))
    return resta;

}

/*Falta seguir desarrollando, la idea es  que me calcule la distancia desde la ubicación donde estoy hasta la actividad
getKilometros = function(lat1, lon1, lat2, lon2) {
    rad = function(x) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(3); //Retorna tres decimales
}*/

/*Levanta las Actividades del form*/

function obtenerDatos() {
    nombreActividad = document.getElementById("nombreActividad").value;
    valorActividad = document.getElementById("valorActividad").value;
    fechaActividad = document.getElementById("fechaActividad").value;
    let actividad = [nombreActividad, valorActividad, fechaActividad];

    actividades.push(new Actividades(nombreActividad, valorActividad, fechaActividad));

    let diasRestantes = calcularCuantosDiasFaltan(fechaActividad);

    let contenedor = document.querySelector('#contenido');
    let p = document.createElement('p');
    p.innerText = `Se creó la actividad : ${ nombreActividad},  faltan : ${diasRestantes} días, el valor de la actividad es de: ${valorActividad}   Pesos`;
    // contenedor.appendChild(p);

    p.innerText = `Se creó la actividad : ${ nombreActividad},  faltan : ${diasRestantes} días, el valor de la actividad es de: ${valorActividad}   Pesos`;

    contenedor.appendChild(p);

    contenedor.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">${nombreActividad}</div>
        <div class="card-body">
            <h4 class="card-title"></h4>
            <h5></h5>
            <h5>Faltan ${diasRestantes}  días</h5>
            <p class="card-text">$ ${valorActividad}</p>
            <div class="col-12 align">
            <button type="submit" class="btn btn-primary" id="botonEliminar" onclick="EliminarDatos()" value="Eliminar actividad">Eliminar</button>
        </div>
        </div>
        </div>
        `;




};

function EliminarDatos() {

};



//FUNCION AGREGAR USUARIO FAVORITO AL ARRAY
function actividadFavorita(actividad) {
    // let indice = identificador - 1;
    //alert("Identificador" + identificador);
    let objeto_seleccionado = {};
    // objeto_seleccionado = favoritos[indice];
    objeto_seleccionado = actividad;
    alert("objeto Seleccinado¨actividad " + objeto_seleccionado);
    alert("objeto Seleccinado " + favoritos.length + 1);
    if (!favoritos.some(e => e.id === identificador)) {
        favoritos.push(objeto_seleccionado);
        localStorage.setItem("StorageFavoritos", JSON.stringify(favoritos));
        // location.reload()
    } else {
        alert("La actividad ya se encuentra cargada en favoritos")
    }
}

//Elimina la actividad del array de favoritos
function eliminarFavorita(id) {
    let favoritos_filtrado = favoritos.filter((elemento) => elemento.id != id);
    favoritos = favoritos_filtrado;
    localStorage.setItem("StorageFavoritos", JSON.stringify(favoritos));
    console.log(favoritos_filtrado);
    location.reload();
}