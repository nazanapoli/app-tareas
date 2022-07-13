import cargaEP from './funciones.js'
let horaActual = new Date();
const saludo = document.getElementById("saludo")
const tareasPorHacer = JSON.parse(localStorage.getItem('tareasPorHacerLS')) || []
const tareasEnProgreso = JSON.parse(localStorage.getItem('tareasEnProgresoLS')) || []
let id = 0
const btnAgregar = document.getElementById("botonAgregar")
const inputAgregar = document.getElementById("inputAgregar")
const prioridadAgregar = document.getElementById("prioridadAgregar")
const porHacer = document.getElementById("porHacer")
const enProgreso = document.getElementById("pendientes")
// VERIFICA SI HAY NOMBRE EN EL LOCAL STORAGE, SINO LO PIDE Y GUARDA EL NOMBRE EN LS
if(JSON.parse(localStorage.getItem('nombre'))?.length>=1){
    if(horaActual.getHours()>6&&horaActual.getHours()<18){
        saludo.innerText=`¡Hola ${JSON.parse(localStorage.getItem('nombre'))} 🌞!`
    } else {
        saludo.innerText=`¡Hola ${JSON.parse(localStorage.getItem('nombre'))} 🌚!`
    }
} else {
    Swal.fire({
        title: 'Bienvenido, ¿Cómo te gustaria que te llamemos?',
        input: 'text',
        inputLabel: 'Nombre/Apodo',
        inputValidator: (value) => {
        if (!value) {
            return `Debes ingresar como te gustaria que te llamemos 😇`
        } else {
        let nombre = value
        localStorage.setItem('nombre',JSON.stringify(nombre))
        if(horaActual.getHours()>6&&horaActual.getHours()<18){
            saludo.innerText=`¡Hola ${nombre} 🌞!`
        } else {
            saludo.innerText=`¡Hola ${nombre} 🌚!`
        }}
    }
})
}
//FUNCION CARGA TAREAS INICIADAS
function cargaDeTareas (arrayParaCargar,DOM,titleACompletar){
    DOM.innerHTML=`<h3>${titleACompletar}</h3>`
    arrayParaCargar.forEach(element=>{
        let card = document.createElement('div')
        card.classList.add('divTareas')
        card.classList.add('bodyCard')
        card.setAttribute('id','divTareas')
        card.setAttribute('draggable','true')
        let title = document.createElement('h4')
        title.innerText=`${element[0]}`
        title.classList.add('title')
        let categoria = document.createElement('p')
        let contenedorCat = document.createElement('div')
        contenedorCat.classList.add('contenedorCat')
        let contenedorPri = document.createElement('div')
        contenedorPri.classList.add('contenedorPri')
        let prioridad = document.createElement('p')
        if(element[1]=='C-0'){
            categoria.innerText=`Trabajo`
            categoria.classList.add('catTrabajo')
        } else if (element[1]=='C-1'){
            categoria.innerText=`Casa`
            categoria.classList.add('catCasa')
        } else if (element[1]=='C-2'){
            categoria.innerText=`Otro`
            categoria.classList.add('catOtro')
        }
        if(element[2]=='P-0'){
            prioridad.classList.add('prioridadBaja')
            prioridad.innerText=`Baja`
        } else if (element[2]=='P-1'){
            prioridad.classList.add('prioridadMedia')
            prioridad.innerText=`Media`
        } else if (element[2]=='P-2'){
            prioridad.classList.add('prioridadAlta')
            prioridad.innerText=`Alta`
        }
        let eliminar = document.createElement('p')
        eliminar.setAttribute('id',`${id++}`)
        eliminar.classList.add('eliminar')
        eliminar.innerText=`-`
        let siguiente = document.createElement('p')
        siguiente.classList.add('siguiente')
        siguiente.innerText=`✔`
        card.appendChild(title)
        contenedorPri.appendChild(prioridad)
        contenedorCat.appendChild(categoria)
        card.appendChild(contenedorPri)
        card.appendChild(contenedorCat)
        card.appendChild(eliminar)
        card.appendChild(siguiente)
        DOM.appendChild(card)
        eliminar.addEventListener('click',()=>{
            const idTarea = tareasPorHacer.findIndex((i)=>{
                return i[3]==element[3]
            })
            tareasEnProgreso.push(tareasPorHacer[idTarea])
            tareasPorHacer.splice(idTarea,1)

            //Setea nueva key en LocalStorage con los cambios
            localStorage.setItem('porHacerActualizado',JSON.stringify(tareasPorHacer));
            localStorage.setItem('tareasPorHacerLS',JSON.stringify((JSON.parse(localStorage.getItem('porHacerActualizado')))));
            if(JSON.parse(localStorage.getItem('tareasPorHacerLS')).length>=1){
                cargaDeTareas(tareasPorHacer,porHacer,'POR HACER')
            } else {
                porHacer.innerHTML=`<h3>POR HACER</h3>`
                let pngEmpty = document.createElement('img')
                pngEmpty.setAttribute('src','./images/bloc-por-hacer.png')
                let divPng = document.createElement('div')
                divPng.classList.add('divPng')
                let msj = document.createElement('p')
                msj.classList.add('msj')
                msj.innerText=`Aquí aparecerán tus tareas cuando las agregues.`
                divPng.appendChild(pngEmpty)
                porHacer.appendChild(divPng)
                porHacer.appendChild(msj)
            }
        })
        siguiente.addEventListener('click',()=>{
            const idTarea = tareasPorHacer.findIndex((i)=>{
                return i[3]==element[3]
            })
            tareasEnProgreso.push(tareasPorHacer[idTarea])
            tareasPorHacer.splice(idTarea,1)

            //Setea nueva key en LocalStorage con los cambios
            localStorage.setItem('porHacerActualizado',JSON.stringify(tareasPorHacer));
            localStorage.setItem('tareasPorHacerLS',JSON.stringify((JSON.parse(localStorage.getItem('porHacerActualizado')))));
            if(JSON.parse(localStorage.getItem('tareasPorHacerLS')).length>=1){
                cargaDeTareas(tareasPorHacer,porHacer,'POR HACER')
            } else {
                porHacer.innerHTML=`<h3>POR HACER</h3>`
                let pngEmpty = document.createElement('img')
                pngEmpty.setAttribute('src','./images/bloc-por-hacer.png')
                let divPng = document.createElement('div')
                divPng.classList.add('divPng')
                let msj = document.createElement('p')
                msj.classList.add('msj')
                msj.innerText=`Aquí aparecerán tus tareas cuando las agregues.`
                divPng.appendChild(pngEmpty)
                porHacer.appendChild(divPng)
                porHacer.appendChild(msj)
            }
            cargaDeTareas(tareasEnProgreso,enProgreso,'FINALIZADAS')
            
            //APRETO SIGUIENTE Y ME CARGA A LA OTRA GRILLA
            let tareasEnProgresoLS = localStorage.setItem('tareasEnProgresoLS',JSON.stringify(tareasEnProgreso))
            cargaEP(enProgreso,cargaDeTareas)
        })
    })
}
//SI HAY TAREAS EN LOCAL STORAGE, LAS CARGA, SINO MSJ DE QUE NO SE AGREGARON
if(JSON.parse(localStorage.getItem('tareasPorHacerLS'))?.length>=1){
    cargaDeTareas(tareasPorHacer,porHacer,'POR HACER')
} else {
    let pngEmpty = document.createElement('img')
    pngEmpty.setAttribute('src','./images/bloc-por-hacer.png')
    let divPng = document.createElement('div')
    divPng.classList.add('divPng')
    let msj = document.createElement('p')
    msj.classList.add('msj')
    msj.innerText=`Aquí aparecerán tus tareas cuando las agregues.`
    divPng.appendChild(pngEmpty)
    porHacer.appendChild(divPng)
    porHacer.appendChild(msj)
}
if(JSON.parse(localStorage.getItem('tareasEnProgresoLS'))!=null){
    cargaEP(enProgreso,cargaDeTareas)
} else {
    let pngEmpty = document.createElement('img')
    pngEmpty.setAttribute('src','./images/bloc-notas.png')
    let divPng = document.createElement('div')
    divPng.classList.add('divPng')
    let msj = document.createElement('p')
    msj.classList.add('msj')
    msj.innerText=`Aquí aparecerán tus tareas cuando las termines.`
    divPng.appendChild(pngEmpty)
    enProgreso.appendChild(divPng)
    enProgreso.appendChild(msj)
}
// EVENTO AL AGREGAR TAREA
btnAgregar.addEventListener('click',()=>{
        let nuevaTarea = inputAgregar.value
        let nuevaCategoria = categoriaAgregar.value
        let nuevaPrioridad = prioridadAgregar.value
        id++
        tareasPorHacer.push([nuevaTarea,nuevaCategoria,nuevaPrioridad,id])
        cargaDeTareas(tareasPorHacer,porHacer,'POR HACER')
        if(JSON.parse(localStorage.getItem('tareasEnProgresoLS'))!=null){
            cargaEP(enProgreso,cargaDeTareas(tareasPorHacer,porHacer,'POR HACER'))
        }
        let tareasPorHacerLS = localStorage.setItem('tareasPorHacerLS',JSON.stringify(tareasPorHacer))
        inputAgregar.value='';
})