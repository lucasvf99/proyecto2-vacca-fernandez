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

    if(nombreProductoLocal == "Copas al Gusto"){
        mostrarCopaAlGusto(imgProductoLocal,nombreProductoLocal,data,dataSabores)
    }else{
        mostrarTarrina(imgProductoLocal,nombreProductoLocal,dataSabores,data)
    }
   
    sabores("selector", dataSabores)
    agregadoraDeEventos(agregarAlCarrito,"boton-carrito","click")
    agregadoraDeEventos(eliminarProducto, "eliminar-producto", "click")
    
}
mostrarEnHtml( )


function mostrarCopaAlGusto  (imgProductoLocal,nombreProductoLocal,data,dataSabores) {
    
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
                
            </div>
                <div id="precio">
                   <p>${data.copasAlGusto.precio1} €  </p>
                </div>
                 <div class="boton-carrito">
                   <button>Agregar al carrito</button>
                </div>
    </div> 
  `
  valorDeOption("selectorOption","precio",data,dataSabores,"selector","bola-3","bola-4")
  agregadoraDeEventos(agregarAlCarrito,"boton-carrito","click")

}

function mostrarTarrina (img,nombre,dataSabores,data) {

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
                    <p>${data.tarrinas.precio1} €</p>
                </div>
                 <div class="boton-carrito">
                   <button>Agregar al carrito</button>
                </div>
               
    </div> 
  `
    sabores("selector", dataSabores)
    valorDeOptionTarrina("selectorOptionTarrina","precio",data,"sabor-3","selector",dataSabores)
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

            agregarPrecio(precio,data,idBola3,saboresOption,classSelector) 
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

function agregarPrecioTarrina (precio,data,idParaSabor) {
    let idParaPrecio = document.getElementById(precio)
    let idSabor = document.getElementById(idParaSabor)
    idParaPrecio.innerHTML= `
     <p>${data.tarrinas.precio1} €</p>
    `
    idSabor.innerHTML = ""
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
        if(optionValor == 1){
            let idParaPrecio = document.getElementById(idPrecio)
            idParaPrecio.innerHTML= "" 
            agregarPrecioTarrina(idPrecio,data,idParaSabor)
            
            
        }else if (optionValor == 2){
            let id3Sabor = document.getElementById(idParaSabor)
            
            id3Sabor.innerHTML =""
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

//funcion para valor 3 

function valorDeSelect (valor) {
    if(valor == undefined){
            return  "   "
    }else{
          return `<li>${valor} </li>`
    }
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
            <div class="sabores">
                <h4> ${el.titulo}</h4>
                <ul id="sabores-nuevos">
                        ${valorDeSelect(el.valorSelect)}
                        ${valorDeSelect(el.valorSelect2)}
                        ${valorDeSelect(el.valorSelect3)}
                        ${valorDeSelect(el.valorSelect4)}
                </ul>
            </div>
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
    carritoDOM.innerHTML += ` <div><p class= "total-carrito"> Total : ${total} € </p></div>`
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

//sweetAlert
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

function agregarAlCarrito (el){
    let titulo = el.target.parentElement.parentElement.children[0].innerText
    let img = el.target.parentElement.parentElement.parentElement.children[0].children[0].outerHTML
    

            if(titulo == "Tarrinas"){
                let bolasHelado = el.target.parentElement.parentElement.children[1].children[1].value 
                let valorSelect = el.target.parentElement.parentElement.children[1].children[2].children[0].children[1].value
                let valorSelect2 = el.target.parentElement.parentElement.children[1].children[2].children[1].children[1].value

                validezDeSabores(bolasHelado,valorSelect, valorSelect2,el,titulo,img) 

           
            }else if (titulo == "Copas al Gusto"){
                let bolasHelado = el.target.parentElement.parentElement.children[1].children[1].value 
                let valorSelect = el.target.parentElement.parentElement.children[1].children[2].children[0].children[1].value
                let valorSelect2 = el.target.parentElement.parentElement.children[1].children[2].children[1].children[1].value


                validezDeSabores(bolasHelado,valorSelect, valorSelect2,el,titulo,img) 

             
               }
      

        localStorage.setItem("carrito", JSON.stringify(carritoArray))
        actualizadora ()    
       
}

function logicaAgregarAlCarrito (titulo,img,precio,valorSelect,valorSelect2,valorSelect3,valorSelect4){

  
     if (carritoArray.some((el)=>{
        return el.precio == precio
    })){
        let precios = carritoArray.map(el => el.precio)
        let indice = precios.indexOf(precio)
        
        carritoArray[indice].cantidad ++ 
        sweetAlertAgregar()

    }else{  
        carritoArray.push({

            titulo,
            precio,
            cantidad: 1,
            valorSelect,
            valorSelect2,
            valorSelect3,
            valorSelect4,
            img
        })
        sweetAlertAgregar()
    }
}
function validezDeSabores (bolasDeHelado,valorSelect, valorSelect2,el,titulo,img) {
    let precio =  el.target.parentElement.parentElement.children[2].children[0].innerText
    if(bolasDeHelado == 1){
        if( valorSelect, valorSelect2 == "-- Selecciona Sabor --"  ){
            Swal.fire({
                title: "Espera...",
                text: "Falta elegir un sabor",
                icon: "warning"
              });
        }else{
            logicaAgregarAlCarrito(titulo,img,precio,valorSelect,valorSelect2)
        }
    }else if (bolasDeHelado == 2){
        let valorSelect3 = el.target.parentElement.parentElement.children[1].children[2].children[2].children[1].value

        if( valorSelect, valorSelect2,valorSelect3 == "-- Selecciona Sabor --"  ){
            Swal.fire({
                title: "Espera...",
                text: "Falta elegir un sabor",
                icon: "warning"
              });
        }else{

            logicaAgregarAlCarrito(titulo,img,precio,valorSelect,valorSelect2,valorSelect3)
        }
    }else if(bolasDeHelado == 3){
        let valorSelect3 = el.target.parentElement.parentElement.children[1].children[2].children[2].children[1].value
        let valorSelect4 = el.target.parentElement.parentElement.children[1].children[2].children[3].children[1].value

        if( valorSelect, valorSelect2,valorSelect3,valorSelect4 == "-- Selecciona Sabor --"  ){
            Swal.fire({
                title: "Espera...",
                text: "Falta elegir un sabor",
                icon: "warning"
              });
        }else{
            logicaAgregarAlCarrito(titulo,img,precio,valorSelect,valorSelect2,valorSelect3,valorSelect4)

        }
    }
    console.log(carritoArray)
}

//agregar productos 

function botonAgregarProducto (e){
    let titulo =(e.target.parentElement.parentElement.children[1].children[0].innerText) //traemos el titulo de la caja padre 
    console.log(titulo)
    let titulos = carritoArray.map(el => el.titulo) 
    console.log(titulos)
    
    let indice = titulos.indexOf(titulo)
    if(carritoArray[indice].cantidad >= 1){

        carritoArray[indice].cantidad ++

    }
    mostrarCarrito()
    localStorage.setItem("carrito", JSON.stringify(carritoArray))
}
//eliminar producto 

function eliminarProducto (e){
    console.log(e.target.parentElement.parentElement.children[1].children[0].innerText)

    let titulo =(e.target.parentElement.parentElement.children[1].children[0].innerText) //traemos el titulo de la caja padre 
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

document.addEventListener("DOMContentLoaded",()=>{
    mostrarCarrito()
})
