//variables, elementos del HTML
const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10


class Juego{
  constructor (){
    this.iniciar= this.iniciar.bind(this)
    this.iniciar()
    this.generarSecuencia()
    setTimeout(  this.siguienteNivel,200)
  }

  iniciar(){
    this.cambioBoton()
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.nivel = 3
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  cambioBoton(){
    if(btnEmpezar.classList.contains('hide')){
    btnEmpezar.classList.remove('hide')
    }else {
    btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(() => Math.floor(Math.random()*4))
  }

  siguienteNivel(){
    this.subnivel=0
    this.iluminarSecuencia()
    this.agregarEvento()
  }

  transformarNumeroColor(numero){
    switch (numero) {
      case 0 :
        return 'celeste'
      case 1 :
        return 'violeta'
      case 2 :
        return 'naranja'
      case 3 :
        return 'verde'
    }
  }

  transformarColorNumero(nombre){
    switch (nombre) {
      case 'celeste' :
        return 0
      case 'violeta' :
        return 1
      case 'naranja' :
        return 2
      case 'verde' :
        return 3
    }
  }

  iluminarSecuencia(){
    for(let i=0; i<this.nivel; i++){
      const color = this.transformarNumeroColor(this.secuencia[i])
      console.log(color)
      setTimeout(() => this.iluminarColor(color), 500 * i)
    }
  }

  iluminarColor(color){
     this.colores[color].classList.add('light')
     setTimeout(()=> this.apagarColor(color),400)
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  agregarEvento(){
    this.colores.celeste.addEventListener('click',this.elegirColor)
    this.colores.violeta.addEventListener('click',this.elegirColor)
    this.colores.naranja.addEventListener('click',this.elegirColor)
    this.colores.verde.addEventListener('click',this.elegirColor)
  }

  eliminarEventos(){
    this.colores.celeste.removeEventListener('click',this.elegirColor)
    this.colores.violeta.removeEventListener('click',this.elegirColor)
    this.colores.naranja.removeEventListener('click',this.elegirColor)
    this.colores.verde.removeEventListener('click',this.elegirColor)
  }
  elegirColor(ev){
    console.log(ev)
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorNumero(nombreColor)
    this.iluminarColor(nombreColor)
    this.comprobarColor(numeroColor)
  }//fin function elegirColor

  comprobarColor(numeroColor){
    if (numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      console.log(this.subnivel)
      this.subirNivel()
    } else{
      this.perdiste()
      }
  }
  subirNivel(){
    if(this.subnivel === this.nivel){
      //this.generarSecuencia()
      this.nivel++
      this.eliminarEventos()
      if(this.nivel === (ULTIMO_NIVEL+1)){
        this.ganaste()
      }else {
        setTimeout(()=>{
          swal("NIVEL: "+this.nivel)
          .then(()=>{
            setTimeout(this.siguienteNivel,500)
          })
        },500)
        }
    }
  }


  ganaste(){
    swal({
      title:'Ganaste',
      icon: 'success'
    })
    .then(this.iniciar)
  }

  perdiste(){
    swal({
      title:'Perdiste',
      icon: 'error'
    })
    .then(()=>
  {
    this.eliminarEventos()
    this.iniciar()
  })
  }

}



function empezarJuego(){
  window.juego = new Juego()
}
