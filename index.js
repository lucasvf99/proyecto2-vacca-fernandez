//exportar funciones 


//crear tartas html

let cajaTartas = document.getElementById("tartas-postres")

const creadoraDeTartas = async  (json,id) =>{
    let res = await fetch (json)
    let data = await res.json()

    data.forEach( el => {
        id.innerHTML += `
            <div class="postre-item">
                <div>
                    <a href="">
                        <img src="${el.img}" alt=""${el.nombre}>
                    </a>
                </div>
                    <div>
                        <p>${el.nombre}</p>
                        <p class="estilo-precio">${el.precio}</p>
                        <button class="boton-carrito">Agregar al carrito </button>
                    </div>
             </div>
        `
    })
    agregadoraDeEventos(agregarCarrito, "boton-carrito", "click")

}

creadoraDeTartas("../json/tartas.json", cajaTartas )



//crear batidos html

let cajaProductos = document.getElementById("batidos-smooties")

const creadoraDeProductos = async  () =>{
    let res = await fetch ("../json/productos.json")
    let data = await res.json()

    data.forEach( el => {
        cajaProductos.innerHTML += `
            <div class="batido-item">
                <div>
                    <a href="">
                        <img src="${el.img}" alt="">
                    </a>
                </div>
                    <div>
                        <p>${el.nombre}</p>
                        <p class="estilo-precio">${el.precio}</p>
                        <button class="boton-carrito">Agregar al carrito </button>
                    </div>
             </div>
        `
    })
    agregadoraDeEventos(agregarCarrito, "boton-carrito", "click")

}

creadoraDeProductos("../json/productos.json",cajaProductos)


//mostrar o no carrito

const botonCarrito = document.getElementById("carrito-compra")

botonCarrito.addEventListener("click", (e)=>{
        carritoDOM.classList.toggle("carrito-none")
        e.preventDefault()  
})

const carritoDOM = document.getElementById("contenedor-carrito")


let carritoArray =JSON.parse(localStorage.getItem("carrito")) || []

//agregadora de eventos 

function agregadoraDeEventos (evento, clase, eventoString){

    const nodos = document.getElementsByClassName(clase)
    const ArrayNodos = Array.from(nodos)

    ArrayNodos.forEach(el =>{
        el.addEventListener(eventoString, evento)
    })
}



function actualizadora (){
    mostrarCarrito()
}

//numero en carrito 
let spanCarrito = document.getElementById("numero-carrito")

function numeroArribaCarrito (cantidad){
        spanCarrito.innerHTML = `${cantidad} <p>`
}     


//muestra el array en el carrito 

function mostrarCarrito (){
    if(!carritoArray){
        return
    }
    carritoDOM.innerHTML = ""
    carritoArray.forEach(el => {
        carritoDOM.innerHTML += `<div class= "caja-producto">
    <div class="img-carrito">
       ${el.img}
    </div>
    <h4> ${el.titulo}</h4>
       <p>${el.precio}</p>
       <div class="caja-botones-productos"> 
       <button class="eliminar-producto">-</button>
                <p>${el.cantidad}</p>
       <button class="agregar-producto">+</button>
       </div>
     
       
       </div>`
        
    })
        let total = carritoArray.reduce((acumulador, i) => {
            return acumulador + parseInt(i.precio) * parseInt(i.cantidad) 
        },  0)
        carritoDOM.innerHTML += ` <div><p class= "total-carrito"> Total : ${total} €</p></div>`
        carritoDOM.innerHTML += ` <div>
                                        <button class="terminar-compra">Terminar compra</button>
                                        <button class="limpiar-carrito">Limpiar carrito</button>
                                    </div>`

        agregadoraDeEventos(eliminarProducto, "eliminar-producto", "click")
        agregadoraDeEventos(botonAgregarProducto, "agregar-producto", "click") 
        agregadoraDeEventos(terminarCarrito, "terminar-compra", "click")
        agregadoraDeEventos(limpiarCarrito, "limpiar-carrito", "click")
        agregadoraDeEventos(mostrarCarrito, "terminar-compra", "click")
        

        //numero en carrito
        let cantidadCarrito = carritoArray.reduce((acumulador, i) => {
            return acumulador + parseInt(i.cantidad) //* parseInt(i.cantidad) 
        },  0)

        numeroArribaCarrito(cantidadCarrito)

}



// terminar compra 
function terminarCarrito (e){
            if(carritoArray.length >= 1  ){
                Swal.fire({
                    title: "Compra realizada",
                    icon: "success"
                  });
                  carritoDOM.classList.toggle("carrito-none")
            }else if (carritoArray += 0) {
                Swal.fire({
                    title: "No hay nada en el carrito ",
                    icon: "error"
                  });
            }
            localStorage.clear()
            carritoArray = [] 
            mostrarCarrito()
         
}

function limpiarCarrito (){
    Swal.fire({
        title: " Quiere eliminar el carrito?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Carrito eliminado");
            localStorage.clear()
            carritoArray = []
            mostrarCarrito()
            carritoDOM.classList.toggle("carrito-none")
        } else if (result.isDenied) {
          Swal.fire("Continuemos la compra ");
        }
      });
    document.getElementsByClassName("limpiar-carrito")


}



// agregando array de procuctos al carrito 

function sweetAlertAgregar (){
    Swal.fire({
        title: "Producto agregado",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        themes : "Dark",
        showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
    

      });
}

function agregarCarrito (e){
    let titulo = (e.target.parentElement.children[0].innerText)
    let precio = (e.target.parentElement.children[1].innerText)
    let img = (e.target.parentElement.parentElement.children[0].children[0].children[0].outerHTML)
    

    if(carritoArray.some ((el)=> {
        return el.titulo == titulo 
    })){
        let titulos = carritoArray.map(el => el.titulo)
        let indice = titulos.indexOf(titulo)
        
        carritoArray[indice].cantidad ++ 

    }else{
        carritoArray.push({

            titulo,
            precio,
            cantidad: 1,
            img
        })
    }
    //boton sweet 
    sweetAlertAgregar()
    
    localStorage.setItem("carrito", JSON.stringify(carritoArray))
    actualizadora ()
    console.log(carritoArray)
}

//agregar productos 

function botonAgregarProducto (e){
    let titulo =(e.target.parentElement.parentElement.children[1].innerText) //traemos el titulo de la caja padre 
    let titulos = carritoArray.map(el => el.titulo) 
    
    let indice = titulos.indexOf(titulo)
    if(carritoArray[indice].cantidad >= 1){

        carritoArray[indice].cantidad ++

    }
    mostrarCarrito()
    localStorage.setItem("carrito", JSON.stringify(carritoArray))
}

//eliminar producto 

function eliminarProducto (e){

    let titulo =(e.target.parentElement.parentElement.children[1].innerText) //traemos el titulo de la caja padre 
    let titulos = carritoArray.map(el => el.titulo) 
    
        let indice = titulos.indexOf(titulo)
        
    if(carritoArray[indice].cantidad <= 1){

        carritoArray.splice(indice, 1)

    }else{

       carritoArray[indice].cantidad --
    }


    mostrarCarrito()
}






document.addEventListener("DOMContentLoaded",()=>{
    mostrarCarrito()
})


// tarrina 

let apartado = document.getElementsByClassName("apartado")

function conseguirDatosTarrina  (e) {
   
    let nombre= e.target.parentElement.parentElement.children[1].innerText  
    let img = e.target.outerHTML
    localStorage.setItem("nombreProducto", JSON.stringify(nombre))
    localStorage.setItem("imgProducto",JSON.stringify(img) )
}

agregadoraDeEventos(conseguirDatosTarrina,"apartado", "click")




// overmouse 