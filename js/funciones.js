export default function cargaEP(containerTareas,cargaDeTareas){
    containerTareas.innerHTML=`<h3>FINALIZADAS</h3>`
    let containerBtn = document.createElement('div')
    containerBtn.classList.add('containerBtn')
    let btnEliminar = document.createElement('button')
    btnEliminar.innerText=`Borrar todo`
    btnEliminar.classList.add('css-button-gradient--8')
    btnEliminar.setAttribute('id','btnEliminar')
    containerBtn.appendChild(btnEliminar)
    JSON.parse(localStorage.getItem('tareasEnProgresoLS')).forEach(element=>{
        let card = document.createElement('div')
        card.classList.add('divTareas')
        card.classList.add('bodyCard')
        card.setAttribute('id','divTareas')
        card.setAttribute('draggable','true')
        let title = document.createElement('h4')
        title.innerText=`${element[0]}`
        title.classList.add('titleEP')
        let categoria = document.createElement('p')
        let contenedorCat = document.createElement('div')
        contenedorCat.classList.add('contenedorCat')
        let contenedorPri = document.createElement('div')
        contenedorPri.classList.add('contenedorPri')
        let prioridad = document.createElement('p')
        if(element[1]=='C-0'){
            categoria.innerText=`Trabajo`
            categoria.classList.add('categoriaEP')
        } else if (element[1]=='C-1'){
            categoria.innerText=`Casa`
            categoria.classList.add('categoriaEP')
        } else if (element[1]=='C-2'){
            categoria.innerText=`Otro`
            categoria.classList.add('categoriaEP')
        }
        if(element[2]=='P-0'){
            prioridad.classList.add('prioridadEP')
            prioridad.innerText=`Baja`
        } else if (element[2]=='P-1'){
            prioridad.classList.add('prioridadEP')
            prioridad.innerText=`Media`
        } else if (element[2]=='P-2'){
            prioridad.classList.add('prioridadEP')
            prioridad.innerText=`Alta`
        }
        let eliminar = document.createElement('p')
        eliminar.classList.add('eliminarEP')
        let siguiente = document.createElement('p')
        siguiente.classList.add('siguienteEP')

        card.appendChild(title)
        contenedorPri.appendChild(prioridad)
        contenedorCat.appendChild(categoria)
        card.appendChild(contenedorPri)
        card.appendChild(contenedorCat)
        card.appendChild(eliminar)
        card.appendChild(siguiente)
        containerTareas.appendChild(card)
    })
    btnEliminar.addEventListener('click',()=>{
        localStorage.removeItem('tareasEnProgresoLS')
        containerTareas.innerHTML=`<h3>FINALIZADAS</h3>`
        let pngEmpty = document.createElement('img')
        pngEmpty.setAttribute('src','./images/bloc-notas.png')
        let divPng = document.createElement('div')
        divPng.classList.add('divPng')
        let msj = document.createElement('p')
        msj.classList.add('msj')
        msj.innerText=`Aquí aparecerán tus tareas cuando las termines.`
        divPng.appendChild(pngEmpty)
        containerTareas.appendChild(divPng)
        containerTareas.appendChild(msj)
        if(JSON.parse(localStorage.getItem('tareasPorHacerLS')).length>=1){
            cargaDeTareas
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
    containerTareas.appendChild(containerBtn)
}