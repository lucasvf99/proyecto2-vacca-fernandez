

const botonCarrito = document.getElementById("carrito-compra")

botonCarrito.addEventListener("click", (e)=>{
        carritoDOM.classList.toggle("carrito-none")
        e.preventDefault()

        
})

const carritoDOM = document.getElementById("contenedor-carrito")




let carritoArray =JSON.parse(localStorage.getItem("carrito")) || []

function agregadoraDeEventos (evento, clase, eventoString){

    const nodos = document.getElementsByClassName(clase)
    const ArrayNodos = Array.from(nodos)

    ArrayNodos.forEach(el =>{
        el.addEventListener(eventoString, evento)
    })
}

function actualizadora (){
    mostrarCarrito()
    agregadoraDeEventos(eliminarProducto, "eliminar-producto", "click")
}


// numero arriba del carrito

let numCarrito = document.getElementById("carrito-compra")

function numeroArribaCarrito (cantidad){

        numCarrito.innerHTML += `<p class="num-carrito">${cantidad}</p>`
        
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
        carritoDOM.innerHTML += ` <div><p class= "total-carrito"> Total : ${total}</p></div>`
        carritoDOM.innerHTML += ` <div>
                                        <button class="terminar-compra">Terminar compra</button>
                                        <button class="limpiar-carrito">Limpiar carrito</button>
                                    </div>`

        agregadoraDeEventos(eliminarProducto, "eliminar-producto", "click")
        agregadoraDeEventos(botonAgregarProducto, "agregar-producto", "click") 
        agregadoraDeEventos(terminarCarrito, "terminar-compra", "click")
        agregadoraDeEventos(limpiarCarrito, "limpiar-carrito", "click")
        agregadoraDeEventos(mostrarCompra, "terminar-compra", "click")
        

        //numero en carrito
        let cantidadCarrito = carritoArray.reduce((acumulador, i) => {
            return acumulador + parseInt(i.cantidad) //* parseInt(i.cantidad) 
        },  0)

        numeroArribaCarrito(cantidadCarrito)

}



// terminar compra 
function terminarCarrito (){
    localStorage.clear()
    carritoArray = []
    mostrarCarrito()
}

function limpiarCarrito (){
    document.getElementsByClassName("limpiar-carrito")
    localStorage.clear()
    carritoArray = []
    mostrarCarrito()

}



// agregando array de procuctos al carrito 

function agregarCarrito (e){
   // console.dir(e)
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

   // alert("Producto agregado ")
    localStorage.setItem("carrito", JSON.stringify(carritoArray))
    actualizadora ()
    //console.log(carritoDOM.children)
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
   // console.dir(e.target.parentElement.parentElement)
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

agregadoraDeEventos(agregarCarrito, "boton-carrito", "click")




document.addEventListener("DOMContentLoaded",()=>{
    mostrarCarrito()
})




//Modal js 

let modalJs = document.getElementById("modal-js")
let botonModal = document.getElementById("modal-cierre")

function mostrarCompra (){


        console.dir(carritoArray)
        if(carritoArray.lenght == 0){
           //    console.dir(carritoDOM .children)
           console.log("no hay nada ")
        }else{
           // console.dir(modalJs)
            modalJs.classList.toggle("mostrar-modal")
        }
        
        carritoDOM.classList.toggle("carrito-none")

        
}

function cerrarModal (){
    botonModal.addEventListener("click",()=>{
        modalJs.classList.toggle("mostrar-modal")
    })
}


cerrarModal()