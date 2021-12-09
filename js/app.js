//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas apretando "agregar"
    listaCursos.addEventListener('click', agregarCurso);
}

//Funciones

function agregarCurso(e){
    e.preventDefault();


   if( e.target.classList.contains('agregar-carrito')){
      const cursoSeleccionado = e.target.parentElement.parentElement
       leerDatosCurso(cursoSeleccionado);
    }

   
}

function leerDatosCurso(curso){
    

    //Objeto con datos del curso actual
    
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    articulosCarrito = [...articulosCarrito, infoCurso];

    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito en el HTML
function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();


    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
            ${curso.precio}
            </td>
            <td>
            ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        //Agregar el html en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    contenedorCarrito.innerHTML = '';
}