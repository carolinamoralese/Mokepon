const selecionarAtaque = document.getElementById("seleccionar-ataque")
const botonReiniciar = document.getElementById("boton-Reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")

const selecionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipego
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./imagenes/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa ) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
           this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }    
}

let hipodoge = new Mokepon("Hipodoge", "./imagenes/mokepons_mokepon_hipodoge_attack.png", 5, "./imagenes/hipodoge.png")
let capipego = new Mokepon("Capipego", "./imagenes/mokepons_mokepon_capipepo_attack.png", 5, "./imagenes/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./imagenes/mokepons_mokepon_ratigueya_attack.png", 5, "./imagenes/ratigueya.png")

const HIPODOGE_ATAQUES = [
    { nombre:'💧', id: "boton-Agua" },
    { nombre:'💧', id: "boton-Agua" },
    { nombre:'💧', id: "boton-Agua" },
    { nombre:'🔥', id: "boton-Fuego" },
    { nombre:'🌱', id: "boton-Tierra" },
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEGO_ATAQUES = [
    { nombre:'🌱', id: "boton-Tierra" },
    { nombre:'🌱', id: "boton-Tierra" },
    { nombre:'🌱', id: "boton-Tierra" },
    { nombre:'💧', id: "boton-Agua" },
    { nombre:'🔥', id: "boton-Fuego" },
]
capipego.ataques.push(...CAPIPEGO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre:'🔥', id: "boton-Fuego" },
    { nombre:'🔥', id: "boton-Fuego" },
    { nombre:'🔥', id: "boton-Fuego" },
    { nombre:'💧', id: "boton-Agua" },
    { nombre:'🌱', id: "boton-Tierra" },
    
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)



mokepones.push(hipodoge,capipego,ratigueya)



function iniciarJuego(){

    selecionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name= "mascota" id=${mokepon.nombre} />
                <label class="tarjetaDeMokepon" for=${mokepon.nombre}> 
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto}
                    alt=${mokepon.nombre}
                </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipego = document.getElementById("Capipego")
        inputRatigueya = document.getElementById("Ratigueya")
        


    })

    botonMascotaJugador.addEventListener("click",
    seleccionarMascotaJugador)
   
    botonReiniciar.addEventListener("click", reiniciarJuego)
    
    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse").then(function(res) {
        if (res.ok) {
            res.text().then(function(respuesta) {
                console.log(respuesta)
                jugadorId = respuesta
            })
        }
    })
}

function seleccionarMascotaJugador() {
  
    selecionarMascota.style.display = "none"
    

    
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id 
    } else if(inputCapipego.checked){
        spanMascotaJugador.innerHTML = inputCapipego.id
        mascotaJugador = inputCapipego.id
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else{
        alert("selecciona una mascosta")
    }

 seleccionarMokepon(mascotaJugador)


    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
            
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="botonDeAtaque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById("boton-Fuego")
    botonAgua = document.getElementById("boton-Agua")
    botonTierra = document.getElementById("boton-Tierra")
    botones = document.querySelectorAll(".BAtaque")
    



}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click",(e) => {
        
        if (e.target.textContent === '🔥') {
            ataqueJugador.push("fuego")
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true
    
        } else if (e.target.textContent === '💧') {
            ataqueJugador.push("agua")
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true
        } else{
            ataqueJugador.push('tierra')
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true
        }
        ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    console.log("Ataque enemigo", ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("fuego") 
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push("agua")
    } else {
        ataqueEnemigo.push("tierra")
    }
    console.log(ataqueEnemigo)
   iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}




function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
       if (ataqueJugador[index] === ataqueDelEnemigo[index]) {
        indexAmbosOponentes(index, index) 
        crearMensaje("Empate")
     
       }else if (ataqueJugador [index] === "fuego" && ataqueEnemigo
       [index] === "tirra") {
        indexAmbosOponentes(index, index)
        crearMensaje("ganaste")
        victoriasJugador ++
        spanVidasJugador.innerHTML = victoriasJugador
       }else if (ataqueJugador[index] === "agua" && ataqueEnemigo
       [index] === "fuego") {
        indexAmbosOponentes(index, index)
        crearMensaje("ganaste")
        victoriasJugador ++
        spanVidasJugador.innerHTML = victoriasJugador
       }else if(ataqueJugador[index] === "tierra" && ataqueEnemigo[index] === "agua"){
        indexAmbosOponentes(index, index)
        crearMensaje("ganaste")
        victoriasJugador ++
        spanVidasJugador.innerHTML = victoriasJugador
       } else{
        indexAmbosOponentes(index, index)
        crearMensaje("perdiste")
        victoriasEnemigo ++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
       }
       
        
    }


    
    revisarvidas()
    
}

function revisarvidas(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate")
    } else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICITACIONES, Ganaste :)")
    }else {
        crearMensajeFinal("lo siento, perdiste :(")
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)

} 

function crearMensajeFinal(resultadoFinal) {
   
    
    let parrafo = document.createElement("p")
    sectionMensajes.innerHTML = resultadoFinal
    
   
    
    botonReiniciar.style.display = "block"
    
} 

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random()* (max - min + 1) + min)
}

function pintarCanvas() {
    

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
    })

    /*
    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipegoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
    */
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
        })
        .then(function(res) {
            if (res.ok) {
                res.json()
                    .then(function({
                        enemigos
                    }) {
                        console.log(enemigos)
                        mokeponesEnemigos = enemigos.map(function(enemigo) {
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon("Hipodoge", "./imagenes/mokepons_mokepon_hipodoge_attack.png", 5, "./imagenes/hipodoge.png")
                            } else if (mokeponNombre === "Capipego") {
                                mokeponEnemigo = new Mokepon("Capipego", "./imagenes/mokepons_mokepon_capipepo_attack.png", 5, "./imagenes/capipepo.png")
                            }else if (mokeponNombre === "Ratigueya") {
                                mokeponEnemigo = new Mokepon("Ratigueya", "./imagenes/mokepons_mokepon_ratigueya_attack.png", 5, "./imagenes/ratigueya.png")
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })
                    })
            }
        })
}


function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
  
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
  
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
    
}

function moverArriba() {
    
    mascotaJugadorObjeto.velocidadY = -5
    
}

function detenerMovimiento() {
    
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case  "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
 
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
        return mokepones[i]
        }
    }
}


function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto")
    selecionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)

}

window.addEventListener("load", iniciarJuego)