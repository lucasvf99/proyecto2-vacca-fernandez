//importar modulos
//import { agregadoraDeEventos } from "../index" 


let nombreProductoLocal = JSON.parse(localStorage.getItem("nombreProducto"))
let imgProductoLocal = JSON.parse(localStorage.getItem("imgProducto"))

let cajaProductos = document.getElementById("productos")




const   mostrarEnHtml = async () => {

    let res = await fetch("../json/tarrinas.json")
    let data = await res.json()
    //console.dir(data)

    let resSabores = await fetch("../json/sabores.json")
    let dataSabores = await resSabores.json()

   // console.log(data)
    if(nombreProductoLocal == "Copas al Gusto"){
        cajaProductos.innerHTML= `
        <div class="cont-img">
            ${imgProductoLocal}
        </div> 
         <div class="cont-info">
           <h1>${nombreProductoLocal}</h1>
                <div class="selector-productos">
                    <h4> ¿Cuantas bolas de helado quieres?</h4>
                    <select name="opciones" id="selectorOption">
                        <option value="1">2 Bolas</option>
                        <option value="2">3 Bolas</option>
                        <option value="3">4 Bolas </option>
                    </select>
                     <div id="cont-sabores">
                            <div>
                                <h4> Sabor Helado</h4>
                                <select class= "selector" >
                                <option>-- Selecciona Sabor --</option>  
                                </select>
                            </div>
                              <div>
                                <h4> 2 Sabor Helado</h4>
                                <select class= "selector" >
                                <option>-- Selecciona Sabor --</option>  
                                </select>
                            </div>
                                <div id="bola-3">
                                </div>
                                    <div id="bola-4">
                                    </div>
                        </div>
                          <h4> ¿Que sirope quiere? </h4>
                                <select class= "selector-sirope">
                                <option>-- Sin sirope --</option>   
                            </select>
                </div>
                    <div id="precio">
                       <p>${data.copasAlGusto.precio1} </p>
                    </div>
                     <div class="boton-carrito">
                       <button>Agregar al carrito</button>
                    </div>
        </div> 
      `
    }else{
        mostrarTarrina(imgProductoLocal,nombreProductoLocal,dataSabores)
    }
    valorDeOption("selectorOption","precio",data,dataSabores,"selector","bola-3","bola-4")
    sabores("selector", dataSabores)
    agregadoraDeEventos(agregarAlCarrito,"boton-carrito","click")
    agregadoraDeEventos(eliminarProducto, "eliminar-producto", "click")
    
}
mostrarEnHtml( )

const mostrarTarrina = async (img,nombre,dataSabores) =>{

    let res = await fetch("../json/tarrinas.json")
    let data = await res.json()

    cajaProductos.innerHTML= `
    <div class="cont-img">
        ${img}
    </div> 
     <div class="cont-info">
       <h1>${nombre}</h1>
            <div class="selector-productos">
                <h4>Elige el tamaño</h4>
                  <select name="opciones" id="selectorOptionTarrina">
                        <option value="1">1/2 Litro </option>
                        <option value="2">1 Litro</option>
                    </select>
                 <div id="cont-sabores">
                        <div>
                            <h4> Sabor Helado</h4>
                            <select class= "selector" >
                            <option>-- Selecciona Sabor --</option>  
                            </select>
                        </div>
                          <div>
                            <h4> 2 Sabor Helado</h4>
                            <select class= "selector" >
                            <option>-- Selecciona Sabor --</option>  
                            </select>
                        </div>
                        <div id="sabor-3">
                        </div>
                    </div>
            </div>
                <div id="precio">
                   
                </div>
                 <div class="boton-carrito">
                   <button>Agregar al carrito</button>
                </div>
                <div id="precio-tarrina">
                <p>${data.tarrinas.precio1} €</p>
                </div>
               
    </div> 
  `
    sabores("selector", dataSabores)
    valorDeOptionTarrina("selectorOptionTarrina","precio-tarrina",data,"sabor-3","selector",dataSabores)
    agregadoraDeEventos(agregarAlCarrito,"boton-carrito","click")
   


}
    
// sabores 
function agregarSabores (data, id){
    data.forEach(el => {
        id.innerHTML += `
            <option>${el.sabor}</option>
        `
    
    });
}
function sabores (id,data) {
    let selector = document.getElementsByClassName(id)
    let arraySabores = Array.from(selector)

    arraySabores.forEach(el => {
            agregarSabores(data,el)
           
    })    
}

//obtener valor de option para copa 
function agregarPrecio (precio,data) {
    let idParaPrecio = document.getElementById(precio)
    idParaPrecio.innerHTML= `
     <p>${data.copasAlGusto.precio1} €</p>

    `
}
function agregarPrecio2 (precio,data,idBola3,saboresOption,classSelector) {
    let idParaPrecio = document.getElementById(precio)
    let bola3 = document.getElementById(idBola3)
    idParaPrecio.innerHTML= `
     <p>${data.copasAlGusto.precio2} €</p>
    `
    bola3.innerHTML = `
        <h4> 3 Sabor Helado </h4>
        <select class= "selector">
        <option>-- Selecciona Sabor --</option>   
        </select>`
        sabores(classSelector,saboresOption)
}
function agregarPrecio3(precio,data,idBola4,saboresOption,classSelector) {
    let idParaPrecio = document.getElementById(precio)
    let bola4 = document.getElementById(idBola4)

    idParaPrecio.innerHTML= `
     <p>${data.copasAlGusto.precio3} €</p>
    `
    bola4.innerHTML = `
    <h4> 4 Sabor Helado </h4>
    <select class= "selector">
    <option>-- Selecciona Sabor --</option>   
    </select>`
    sabores(classSelector,saboresOption)
}

function valorDeOption (id,precio,data,saboresOption,classSelector,idBola3,idBola4) {
    const valorSelect = document.getElementById(id)
    valorSelect.addEventListener("change", () =>{
        let optionValor = valorSelect.value;

         if (optionValor == 1){
            let bola4 = document.getElementById(idBola4)
            let bola3 = document.getElementById(idBola3)

            agregarPrecio2(precio,data,idBola3,saboresOption,classSelector) 
            bola3.innerHTML= ""
            bola4.innerHTML= ""

        }else if (optionValor == 2){
            let bola4 = document.getElementById(idBola4)
            bola4.innerHTML= ""
            agregarPrecio2(precio,data,idBola3,saboresOption,classSelector) 
            
        }else if (optionValor == 3){

            agregarPrecio2(precio,data,idBola3,saboresOption,classSelector) 
            agregarPrecio3(precio,data,idBola4,saboresOption,classSelector)
        }
    })
       
}


//obtener valor de option para tarrina 

function agregarPrecioTarrina (precio,data) {
    let idParaPrecio = document.getElementById(precio)
    idParaPrecio.innerHTML= `
     <p>${data.tarrinas.precio1} €</p>

    `
}   
function agregarPrecioTarrina2 (precio,data,idParaSabor,classSelector,dataSabores) {
    let idParaPrecio = document.getElementById(precio)
    idParaPrecio.innerHTML= `
     <p>${data.tarrinas.precio2} €</p>
    `
    let idSabor = document.getElementById(idParaSabor)

    idSabor.innerHTML +=  ` 
                <h4> 3 Sabor Helado</h4>
                <select class= "selector" >
                <option>-- Selecciona Sabor --</option>  
                </select>
    `
    sabores(classSelector, dataSabores)

}

function valorDeOptionTarrina (idSelec,idPrecio,data,idParaSabor,classSelector,dataSabores) {
    const valorSelect = document.getElementById(idSelec)
    valorSelect.addEventListener("change", () =>{
        let optionValor = valorSelect.value;
        console.log(optionValor)
        if(optionValor == 0){
            let idParaPrecio = document.getElementById(idPrecio)
          
            idParaPrecio.innerHTML= "" 
            
        }else if (optionValor == 1){
            let id3Sabor = document.getElementById(idParaSabor)
            
            id3Sabor.innerHTML =""
            agregarPrecioTarrina(idPrecio,data)
            
        }else if (optionValor == 2){
            agregarPrecioTarrina2(idPrecio,data,idParaSabor,classSelector,dataSabores)

        }
    })
       
}



//carrito
//numero en carrito }

let spanCarrito = document.getElementById("numero-carrito")

function numeroArribaCarrito (cantidad){
        spanCarrito.innerHTML = `${cantidad} <p>`
}     

const carritoDOM = document.getElementById("contenedor-carrito")
const botonCarrito = document.getElementById("carrito-compra")

botonCarrito.addEventListener("click", (e)=>{
        carritoDOM.classList.toggle("carrito-none")
        e.preventDefault()
})

let carritoArray =JSON.parse(localStorage.getItem("carrito")) || []

//agregadora de eventos 

function agregadoraDeEventos (evento, clase, eventoString){

    const nodos = document.getElementsByClassName(clase)
    const ArrayNodos = Array.from(nodos)

    ArrayNodos.forEach(el =>{
        el.addEventListener(eventoString, evento)
    })
}
//mostrar carrito 

function mostrarCarrito (){
    if(!carritoArray){
        return
    }
    carritoDOM.innerHTML = ""
    carritoArray.forEach(el => {
        carritoDOM.innerHTML += `
        <div class= "caja-producto">
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

    agregadoraDeEventos(botonAgregarProducto, "agregar-producto", "click") 
    agregadoraDeEventos(eliminarProducto, "eliminar-producto", "click")
    agregadoraDeEventos(limpiarCarrito, "limpiar-carrito", "click")
    agregadoraDeEventos(terminarCarrito, "terminar-compra", "click")
     //numero en carrito
     let cantidadCarrito = carritoArray.reduce((acumulador, i) => {
        return acumulador + parseInt(i.cantidad) //* parseInt(i.cantidad) 
    },  0)

    numeroArribaCarrito(cantidadCarrito)
    
}


// actualizadora
function actualizadora (){
    mostrarCarrito()
    agregadoraDeEventos(eliminarProducto, "eliminar-producto", "click")
}


//agregar al carrito 

function agregarAlCarrito (el){
    let titulo = el.target.parentElement.parentElement.children[0].innerText
    let img = el.target.parentElement.parentElement.parentElement.children[0].children[0].outerHTML
   
    

            if(titulo == "Tarrinas"){

                let precio = el.target.parentElement.parentElement.children[4].innerText

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
            }else if (titulo == "Copas al Gusto"){
                let bolasHelado = el.target.parentElement.parentElement.children[1].children[1].value 
                let valorSelect = el.target.parentElement.parentElement.children[1].children[2].children[0].children[1].value
                let valorSelect2 = el.target.parentElement.parentElement.children[1].children[2].children[1].children[1].value
                if(bolasHelado == 1 ){

                        if( valorSelect, valorSelect2 == "-- Selecciona Sabor --"  ){
                            Swal.fire({
                                title: "Espera...",
                                text: "Falta elegir un sabor",
                                icon: "warning"
                              });
                        }else{
                            let precio = el.target.parentElement.parentElement.children[2].innerText
    
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
                }
                }else if (bolasHelado == 2 ){
                    let valorSelect3 = el.target.parentElement.parentElement.children[1].children[2].children[2].children[1].value
                    if( valorSelect, valorSelect2, valorSelect3== "-- Selecciona Sabor --"  ){
                        Swal.fire({
                            title: "Espera...",
                            text: "Falta elegir un sabor",
                            icon: "warning"
                          });
                    }else{
                        let precio = el.target.parentElement.parentElement.children[2].innerText

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
            }
                }else if (bolasHelado == 3){
                    let valorSelect3 = el.target.parentElement.parentElement.children[1].children[2].children[2].children[1].value
                    let valorSelect4 = el.target.parentElement.parentElement.children[1].children[2].children[3].children[1].value

                    if( valorSelect, valorSelect2, valorSelect3,valorSelect4== "-- Selecciona Sabor --"  ){
                        Swal.fire({
                            title: "Espera...",
                            text: "Falta elegir un sabor",
                            icon: "warning"
                          });
                    }else{
                        let precio = el.target.parentElement.parentElement.children[2].innerText

                        if(carritoArray.some ((el)=> {
                            return el.titulo == titulo 
                        })){
                            let titulos = carritoArray.map(el => el.titulo)
                            let indice = titulos.indexOf(titulo)
                                console.log(titulos)   
                            carritoArray[indice].cantidad ++  
                        }else{
                            carritoArray.push({
                    
                                titulo,
                                precio,
                                cantidad: 1,
                                img
                            })
                    }
            }
                }

              }
      

        localStorage.setItem("carrito", JSON.stringify(carritoArray))
        actualizadora ()    
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
    console.log(e.target.parentElement.parentElement.children[1].innerText)

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

// terminar compra 
function terminarCarrito (){
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

document.addEventListener("DOMContentLoaded",()=>{
    mostrarCarrito()
})
