import Keys from "../../Keys";

export default async function  Logar(Email, password, Lembrar){
    let resposta;
    let status;
   const res = await fetch(`${Keys.backEnd}Usuarios/${Email}/${password}`)
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
      console.log(res)
        return'Houve algum erro'
    }
}