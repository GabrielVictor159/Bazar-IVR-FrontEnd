import Logar from "./logar";

export default async function putUser(newParameter, type){
    let lembrar=false;
    let a = localStorage.getItem('usuario')
    if (a === null) {
        a = sessionStorage.getItem('usuario')
        lembrar =true;
    }
    else{
        lembrar = true;
    }
    if (a !== null) {
        
        let b = JSON.parse(a)
        switch (type) {
            case 'FirstName':
                b.FirstName = newParameter
                break;

            case 'LastName':
                b.LastName = newParameter
                break;

            case 'Senha':
                b.Senha = newParameter
                break;

            case 'Endereco':
                b.Endereco = newParameter
                break;

            case 'DataDeNascimento':
                b.DataDeNascimento = newParameter
                break;

            case 'Telefone':
                b.Telefone = newParameter
                break;
        }

        try{

            let resposta;
            let status;
            const res = await fetch(`http://localhost:3030/Usuarios`, {
                method: 'PUT',
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {
                    'Content-Type': 'application/json'
                  },
                credentials: 'same-origin', 
                body: JSON.stringify(b)
             
              })
              resposta = (await res.text())
              status = res.status
              if(status === 200){
              if(resposta === 'Sucesso'){
                const t = await Logar(b.Email, type==='Senha'?newParameter:b.Senha, lembrar)
                return t
              }
              else{
                return resposta
              }
        }
        else{
            return `Error: ${status}`
        }
        

    }
    catch(exception){
        return exception.message
    }

}
}