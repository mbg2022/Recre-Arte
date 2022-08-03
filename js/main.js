let containerActividades = document.getElementById("containerActividades");
let alertProximasActividades = document.getElementById("alertProximasActividades");
let contenedor_fav = document.getElementById("contenidoFavoritos");


let actividades = [];
let actividadesGuardadas = [];
let actividadesFavoritas = [];
let actividadesUsuarios = [];
let actividadesUFavoritas = [];

cargarActividadesUsuarios();
cargarActividades();
cargarActividadesFavoritas();
cargarActividadesUFavoritas();
mostrarActividades();
mostrarActividadesFavoritas();
mostrarActividadesUFavoritas();


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
    (localStorage.getItem("StorageActividades") !== null) ? persistirEnLocalStActividades(): console.log("no hay actividades aún creadas");
}

function persistirEnLocalStActividades() {
    actividadesGuardadas = JSON.parse(localStorage.getItem("StorageActividades"));
    return actividadesGuardadas;
}

function cargarActividadesFavoritas() {
    (localStorage.getItem("StorageActividadesFavoritas") !== null) ? persistirEnLocalStActividadesFavoritas(): console.log("no hay actividades favoritas creadas");
}

function persistirEnLocalStActividadesFavoritas() {
    actividadesFavoritas = JSON.parse(localStorage.getItem("StorageActividadesFavoritas"));
    return actividadesFavoritas;
}


function cargarActividadesUFavoritas() {
    (localStorage.getItem("StorageActividadesUFavoritas") !== null) ? persistirEnLocalStActividadesUFavoritas(): console.log("no hay actividades favoriteadas de usuarios  agregadas");
}

function persistirEnLocalStActividadesUFavoritas() {
    actividadesUFavoritas = JSON.parse(localStorage.getItem("StorageActividadesUFavoritas"));
    return actividadesUFavoritas;
}


function mostrarActividades() {
    actividadesGuardadas.forEach((actividadesGuardadas) => {
        containerActividades.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">${actividadesGuardadas.activity_name}</div>
        <div class="card-body">
            <h4 class="card-title">Fecha: ${(formatearFechaDDMMAA(actividadesGuardadas.activity_date))}</h4>
            <h5>${actividadesGuardadas.locat}</h5>
            <h5>Faltan ${calcularCuantosDiasFaltan(actividadesGuardadas.activity_date)} días</h5>
            <p class="card-text">valor actividad $ ${actividadesGuardadas.activity_value}</p>
           <button onClick="actividadFavorita(${actividadesGuardadas.id})" class="btn btn-outline-success">Favoritear</button>
            <button onClick="eliminarActividad(${actividadesGuardadas.id})" class="btn btn-outline-success">Eliminar</button>
        </div>
        </div>
        `;
    });
}


function mostrarActividadesFavoritas() {
    actividadesFavoritas.forEach((actividadesFavoritas) => {
        containerActividadesUFavoritos.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">${actividadesFavoritas.activity_name}</div>
        <div class="card-body">
        <h4>${actividadesFavoritas.country} / ${actividadesFavoritas.locat}</h4>
            <h5 class="card-title">Fecha: ${formatearFechaDDMMAA(actividadesFavoritas.activity_date)}</h5>
            <h5>${actividadesFavoritas.locat}</h5>
            <h5>Faltan ${calcularCuantosDiasFaltan(actividadesFavoritas.activity_date)} días</h5>
            <p class="card-text">valor actividad $ ${actividadesFavoritas.activity_value}</p>
            <button onClick="eliminarActividadFavorita(${actividadesFavoritas.id})" class="btn btn-outline-success">Eliminar Fav</button>
        </div>
        </div>
        `;
    });
}


function mostrarActividadesUFavoritas() {
    actividadesUFavoritas.forEach((actividadesUFavoritas) => {
        containerActividadesUFavoritos.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">${actividadesUFavoritas.activity_name}</div>
        <div class="card-body">
        <h4>${actividadesUFavoritas.country} / ${actividadesUFavoritas.locat}</h4>
            <h5 class="card-title">Fecha: ${(formatearFechaDDMMAA(actividadesUFavoritas.activity_date))}</h5>
            <h5>${actividadesUFavoritas.locat}</h5>
            <h5>Faltan ${calcularCuantosDiasFaltan(actividadesUFavoritas.activity_date)} días</h5>
            <p class="card-text">valor actividad $ ${actividadesUFavoritas.activity_value}</p>
            <button onClick="eliminarActividadUFavorita(${actividadesUFavoritas.id})" class="btn btn-outline-success">Eliminar Fav</button>
        </div>
        </div>
        `;
    });

}

function mostrarActividadesUsuarios(actividadesUsuarios) {
    actividadesUsuarios.forEach((actividadesUsuarios) => {
        containerActividadesUsuarios.innerHTML += `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
        <div class="card-header"> <h3>${actividadesUsuarios.activity_name} </h3></div>
        <div class="card-body">
        <h4>${actividadesUsuarios.country} / ${actividadesUsuarios.locat}</h4>
            <h5 class="card-title">Fecha: ${formatearFechaDDMMAA(actividadesUsuarios.activity_date)}</h5>
            <h5>Faltan ${calcularCuantosDiasFaltan(actividadesUsuarios.activity_date)} días</h5>
            <p class="card-text">valor actividad $ ${actividadesUsuarios.activity_value}</p>
            <button onClick="actividadUFavorita(${(actividadesUsuarios.id)-1})" class="btn btn-outline-success">Favoritear</button>        
        </div>
        </div>
        `;
    });
}


function resetearLocalStore() {
    if (localStorage.getItem("StorageActividades") !== null) {
        Swal.fire({
                title: "Estas segur@?",
                text: "Estas a punto de borrar todas las actividades que creaste",
                type: "warning",
                confirmButtonText: "Si, Borrar todo!",
                showCancelButton: true
            })
            .then((result) => {
                if (result.value) {
                    localStorage.removeItem("StorageActividadesFavoritas");
                    localStorage.removeItem("StorageActividades");
                    location.reload();
                    swal(
                        'Operación exitosa :)',
                        'Se eliminaron todas las actividades que creaste',
                        'success'
                    )

                } else if (result.dismiss === 'cancel') {
                    swal(
                        'Cancelado',
                        'No se borró ninguna actividad',
                        'info'
                    )
                }
            })
    } else {
        swal(
            'No se puede borrar',
            'Aún no creaste ninguna actividad',
            'warning'
        )
    }
}



//Formatea una fecha en milisegundos y la pasa a formato DDMMAA  
function formatearFechaDDMMAA(fecha) {
    let date = new Date(fecha);
    let fechaFormateada = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
    return fechaFormateada;
}

//Dada una fecha devuelve la diferencia en días con respecto a la fecha actual
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


/* Obtiene las actividades del DOM */
function crearActividad() {
    activity_name = document.getElementById("activity_name").value;
    activity_date = document.getElementById("activity_date").value;
    activity_value = document.getElementById("activity_value").value;
    country = document.getElementById("country").value;
    locat = document.getElementById("locat").value;

    if (activity_name == '' || activity_date == '' || activity_value == '' || country == '' || locat == '') {
        swal(
            'Cancelado',
            'Para crear una actividad todos los campos tienen que estar completos',
            'warning'
        )
        return;
    }

    Swal.fire({
        title: 'Estás por crear una nueva actividad?',
        showDenyButton: true,
        confirmButtonText: 'Crear',
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (result.isConfirmed) {
            Swal.fire('Felicitaciones', 'Creaste una nueva actividad', 'success')
                //Guarda al Array en el que están TODAS las actividades existentes
            let indice = actividadesGuardadas.length;
            actividadesGuardadas.push(new Actividades(indice++, activity_name, activity_date, activity_value, locat, country));
            location.reload()
            localStorage.setItem("StorageActividades", JSON.stringify(actividadesGuardadas));
            location.reload()
        } else if (result.isDenied) {
            Swal.fire('La actividad no fue creada', '', 'info')
        }
    })
};



function actividadFavorita(identificador) {

    Swal.fire({
        title: 'Querés favoritear tu Actividad?',
        text: "",
        type: 'info',
        showDenyButton: true,
        confirmButtonText: 'Agregar a favoritos',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            let indice = identificador - 1;
            let objeto_seleccionado = {};
            objeto_seleccionado = actividadesGuardadas[identificador];

            if (!actividadesFavoritas.some(e => e.id === identificador)) {

                actividadesFavoritas.push(objeto_seleccionado);
                Swal.fire('Actividad agregada a favoritos', '', 'success')
                location.reload()
                localStorage.setItem("StorageActividadesFavoritas", JSON.stringify(actividadesFavoritas));
                location.reload()

            } else {
                swal("La actividad ya se encuentra en favoritos", "..Podes Favoritear otras...")
            }
        } else if (result.isDenied) {
            Swal.fire('Cancelado', 'No se agregó a favoritos', 'info')
        }
    })
};



//Agrega la actividad Favorita al array de Favoritos
function actividadUFavorita(identificador) {

    Swal.fire({
        title: 'Querés favoritear la Actividad?',
        text: "",
        type: 'info',
        showDenyButton: true,
        confirmButtonText: 'Agregar a favoritos',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            let indice = identificador - 1;
            let objeto_seleccionado = {};
            objeto_seleccionado = actividadesUsuarios[identificador];

            if (!actividadesUFavoritas.some(e => e.id === identificador)) {

                actividadesUFavoritas.push(objeto_seleccionado);
                Swal.fire('Actividad agregada a favoritos', '', 'success')
                location.reload()
                localStorage.setItem("StorageActividadesUFavoritas", JSON.stringify(actividadesUFavoritas));
                location.reload()

            } else {
                swal("La actividad ya se encuentra en favoritos", "..Podes Favoritear otras...")
            }
        } else if (result.isDenied) {
            Swal.fire('Cancelado', 'No se agregó a favoritos', 'info')
        }
    })
};



















//Elimina la actividad del array de favoritos
function eliminarActividadFavorita(id) {

    swal({
        title: 'Eliminar de Favoritos?',
        text: "No podrás revertir esta acción!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, Eliminar!'
    }).then(function() {

        let favoritos_filtrado = actividadesFavoritas.filter((elemento) => elemento.id != id);
        actividadesFavoritas = favoritos_filtrado;
        if (actividadesFavoritas.length > 0) {
            localStorage.setItem("StorageActividadesFavoritas", JSON.stringify(actividadesFavoritas));
            location.reload();
        } else {
            localStorage.removeItem("StorageActividadesFavoritas");
            location.reload();
            swal(
                'Eliminada!',
                'Se eliminó la actividad de favoritos.',
                'success'
            );

        }

    })

}


function eliminarActividadUFavorita(id) {
    Swal.fire({
        title: 'Actividad creada por otro usuario - Eliminar de Favoritos?',
        text: "No podrás revertir esta acción!",
        type: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Eliminar de Favoritos',
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (result.isConfirmed) {
            let favoritos_filtrado = actividadesUFavoritas.filter((elemento) => elemento.id != id);
            actividadesUFavoritas = favoritos_filtrado;
            if (actividadesUFavoritas.length > 0) {
                localStorage.setItem("StorageActividadesUFavoritas", JSON.stringify(actividadesUFavoritas));
                location.reload();
            } else {
                localStorage.removeItem("StorageActividadesUFavoritas");
                location.reload();
                swal(
                    'Eliminada!',
                    'Se eliminó la actividad de favoritos.',
                    'success'
                );

            }
        } else if (result.isDenied) {
            Swal.fire('Cancelado', 'La actividad sigue favorita', 'info')
        }
    })
};






/*

Swal.fire({
    title: 'Actividad creada por otro usuario - Eliminar de Favoritos?',
    text: "No podrás revertir esta acción!",
    type: 'warning',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'

}).then(function() {

    let favoritos_filtrado = actividadesUFavoritas.filter((elemento) => elemento.id != id);
    actividadesUFavoritas = favoritos_filtrado;
    if (actividadesUFavoritas.length > 0) {
        localStorage.setItem("StorageActividadesUFavoritas", JSON.stringify(actividadesUFavoritas));
        location.reload();
    } else {
        localStorage.removeItem("StorageActividadesUFavoritas");
        location.reload();
        swal(
            'Eliminada!',
            'Se eliminó la actividad de favoritos.',
            'success'
        );

    }




})*/






//Elimina la actividad del array actividadesGuardadas
function eliminarActividad(id) {
    let actividadesGuardadas_filtrado = actividadesGuardadas.filter((elemento) => elemento.id != id);
    actividadesGuardadas = actividadesGuardadas_filtrado;
    localStorage.setItem("StorageActividades", JSON.stringify(actividadesGuardadas));

    let actividadesFavoritas_filtrado = actividadesFavoritas.filter((elemento) => elemento.id != id);
    actividadesFavoritas = actividadesFavoritas_filtrado;
    localStorage.setItem("StorageActividadesFavoritas", JSON.stringify(actividadesFavoritas));

    location.reload();
}

function cargarArrayActividades(actividad) {
    actividades.push(actividad);
}



function cargarActividadesUsuarios() {
    /* Hice una api directamente desde el github para consumir a través del fech y con https://my-json-server.typicode.com/ */
    fetch(`https://my-json-server.typicode.com/mbg2022/api_Actividades/actividad`)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            data.forEach(element => {
                actividadesUsuarios.push(element);

            })
            mostrarActividadesUsuarios(actividadesUsuarios);
        })

}