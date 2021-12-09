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

    //ELiminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el arreglo

        limpiarHTML();
    })
}

//Funciones

function agregarCurso(e){
    e.preventDefault();


   if( e.target.classList.contains('agregar-carrito')){
      const cursoSeleccionado = e.target.parentElement.parentElement
       leerDatosCurso(cursoSeleccionado);
    }

   
}

//Eliminar cursos
function eliminarCurso(e){
  if(e.target.classList.contains('borrar-curso')){
      const cursoId = e.target.getAttribute('data-id');

      //Eliminar del arreglo
      articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)


      carritoHTML(); //Volvemos a cargar los articulos que quedan en nuestro carrito luego de eliminar
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

    //Revisar si existe el elemento
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        if(existe){
            //Actualizamos la cantidad
            const cursos = articulosCarrito.map( curso => {
                if(curso.id === infoCurso.id){
                    curso.cantidad ++;
                    return curso; //Retorna los objetos que se actualizaro 
                }else {
                    return curso; //Retorna los objetos que no se modificaron
                }
            });
            articulosCarrito = [...cursos];
        }else{
            //Agregamos el curso

            articulosCarrito = [...articulosCarrito, infoCurso];
        }



    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito en el HTML
function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();


    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
            ${precio}
            </td>
            <td>
            ${cantidad}
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