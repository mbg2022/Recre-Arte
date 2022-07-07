let containerActividades = document.getElementById("containerActividades");
let alertProximasActividades = document.getElementById("alertProximasActividades");
let contenedor_fav = document.getElementById("contenidoFavoritos");


let actividades = [];
let actividadesGuardadas = [];
let actividadesFavoritas = [];


cargarActividades();
cargarActividadesFavoritas();

mostrarActividades();
mostrarActividadesFavoritas();

class Actividades {
    constructor(id, activity_name, activity_date, activity_value, locat, country) {
        this.id = id;
        this.activity_name = activity_name;
        this.activity_date = activity_date;
        this.activity_value = activity_value;
        this.locat = locat;
        this.country = country;
    }
    calcularCuantosDiasFaltan(activity_name, activity_date, fechaHoy) {
        let difMiliseg = Math.abs(activity_date - Date.parse(fechaHoy))
        let resta = difMiliseg / (1000 * 60 * 60 * 24)
    }
}



function cargarActividades() {
    /*Bloque sin optimizar
     if (localStorage.getItem("StorageActividades") !== null) { //si existe    
         actividadesGuardadas = JSON.parse(localStorage.getItem("StorageActividades"));
         return;
     } else {
         return;
     }*/
    /*bloque de código optimizado*/
    (localStorage.getItem("StorageActividades") !== null) ? persistirEnLocalStActividades(): console.log("no hay actividades aún creadas");
}

function persistirEnLocalStActividades() {
    actividadesGuardadas = JSON.parse(localStorage.getItem("StorageActividades"));
    return actividadesGuardadas;
}



function cargarActividadesFavoritas() {
    /*Bloque sin optimizar if (localStorage.getItem("StorageActividadesFavoritas") !== null) { //si existe    
        actividadesFavoritas = JSON.parse(localStorage.getItem("StorageActividadesFavoritas"));
        return;
    } else {
        console.log("no hay actividades favoritas")
        return;
    }
    */
    /*bloque de código optimizado*/
    (localStorage.getItem("StorageActividadesFavoritas") !== null) ? persistirEnLocalStActividadesFavoritas(): console.log("no hay actividades favoritas creadas");


}

function persistirEnLocalStActividadesFavoritas() {
    actividadesFavoritas = JSON.parse(localStorage.getItem("StorageActividadesFavoritas"));
    return actividadesFavoritas;
}



function mostrarActividades() {
    actividadesGuardadas.forEach((actividadesGuardadas) => {
        containerActividades.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">${actividadesGuardadas.activity_name}</div>
        <div class="card-body">
            <h4 class="card-title">${(actividadesGuardadas.activity_date)}</h4>
            <h5>${actividadesGuardadas.locat}</h5>
            <h5>Faltan ${calcularCuantosDiasFaltan(actividadesGuardadas.activity_date)} días</h5>
            <p class="card-text">$ ${actividadesGuardadas.activity_value}</p>
            <button onClick="actividadFavorita(${actividadesGuardadas.id})" class="btn btn-outline-success">Favoritear</button>
            <button onClick="eliminarActividad(${actividadesGuardadas.id})" class="btn btn-outline-success">Eliminar</button>
        </div>
        </div>
        `;
    });
}


function mostrarActividadesFavoritas() {
    actividadesFavoritas.forEach((actividadesFavoritas) => {
        containerActividadesFavoritos.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">${actividadesFavoritas.activity_name}</div>
        <div class="card-body">
            <h4 class="card-title">${actividadesFavoritas.activity_date}</h4>
            <h5>${actividadesFavoritas.locat}</h5>
            <h5>Faltan ${calcularCuantosDiasFaltan(actividadesFavoritas.activity_date)} días</h5>
            <p class="card-text">$ ${actividadesFavoritas.activity_value}</p>
            <button onClick="eliminarActividadFavorita(${actividadesFavoritas.id})" class="btn btn-outline-success">Eliminar Fav</button>
        </div>
        </div>
        `;
    });
}


function resetearLocalStore() {
    localStorage.removeItem("StorageActividadesFavoritas");
    localStorage.removeItem("StorageActividades");
    location.reload();

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


/*Levanta las Actividades del form*/
function crearActividad() {
    activity_name = document.getElementById("activity_name").value;
    activity_date = document.getElementById("activity_date").value;
    activity_value = document.getElementById("activity_value").value;
    country = document.getElementById("country").value;
    locat = document.getElementById("locat").value;

    //Guarda al Array en el que están TODAS las actividades existentes
    let indice = actividadesGuardadas.length;
    //Optimización de código con el operador ++
    actividadesGuardadas.push(new Actividades(indice++, activity_name, activity_date, activity_value, locat, country));


    location.reload()
    localStorage.setItem("StorageActividades", JSON.stringify(actividadesGuardadas));
    location.reload()
};


//Agrega la actividad Favorita al array de Favoritos
function actividadFavorita(identificador) {
    let indice = identificador - 1;
    let objeto_seleccionado = {};
    objeto_seleccionado = actividadesGuardadas[indice];
    if (!actividadesFavoritas.some(e => e.id === identificador)) {
        actividadesFavoritas.push(objeto_seleccionado);
        location.reload()
        localStorage.setItem("StorageActividadesFavoritas", JSON.stringify(actividadesFavoritas));
        location.reload()
    } else {
        alert("La actividad ya se encuentra en favoritos =)")
    }
}


//Elimina la actividad del array de favoritos
function eliminarActividadFavorita(id) {
    let favoritos_filtrado = actividadesFavoritas.filter((elemento) => elemento.id != id);
    actividadesFavoritas = favoritos_filtrado;
    if (actividadesFavoritas.length > 0) { //para que no guarde el array vacio
        localStorage.setItem("StorageActividadesFavoritas", JSON.stringify(actividadesFavoritas));
        location.reload();
    } else {
        localStorage.removeItem("StorageActividadesFavoritas");
        location.reload();
    }
}


//Elimina la actividad del array actividadesGuardadas
function eliminarActividad(id) {
    let actividadesGuardadas_filtrado = actividadesGuardadas.filter((elemento) => elemento.id != id);
    actividadesGuardadas = actividadesGuardadas_filtrado;
    localStorage.setItem("StorageActividades", JSON.stringify(actividadesGuardadas));
    eliminarActividadFavorita(id) //Elimina tambien la actividad de favoritas
    location.reload();
}

function cargarArrayActividades(actividad) {
    actividades.push(actividad);
}