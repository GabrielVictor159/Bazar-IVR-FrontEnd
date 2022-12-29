export default async function  Logar(Email, password, Lembrar){
    let resposta;
    let status;
   const res = await fetch(`http://localhost:3030/Usuarios/${Email}/${password}`, {
        method: 'GET',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
       
     
      })
      resposta = (await res.text())
      status = res.status
      if(status === 200){
      if(resposta === 'Usuario não encontrado'){
        return'Email ou senha incorretos'
      }
      else{
        console.log(resposta)
        Lembrar===false
        ?sessionStorage.setItem('usuario',resposta)
        :localStorage.setItem('usuario', resposta)
        return "Sucesso"
      }
    }
    else{
        return'Houve algum erro'
    }
}