export default function getUser (){
    if(sessionStorage.getItem('usuario')!==null){
      return JSON.parse(sessionStorage.getItem('usuario'))
    }
    else if(localStorage.getItem('usuario')!==null){
      return JSON.parse(localStorage.getItem('usuario'))
    }
    else{
      return null
    }
  }