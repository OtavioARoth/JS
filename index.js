const { select, input, checkbox } = require('@inquirer/prompts') // npm install inquirer puxa as funções dessa base
let meta = {
    value:"tomar 3L de agua por dia",
    checked: false,
}
let metas = [meta] //armazena meta individual em metas

const ListarMetas = async() => {
    const respostas = await checkbox({ //espera para a marcação
        message: "use as setas para mudar a meta e espaço para marcar e desmarcar as metas",
        choices:[...metas], //copia tudo que está em metas 
        instructions:false,
    })
    metas.forEach((m) => {

        m.checked = false // se for marcado como falso ela não altera o valor

    })
    if(respostas.length ==0){
        console.log("nenhuma meta selecionada")
        return
    }
   
    respostas.forEach((resposta)  => { //para cada resposta ele faz algo
        const meta = metas.find((m) => { //ele vai pegar uma das metas e chamar de "m", se m value bate com um valor armazenado ele faz o check.
            return m.value == resposta 
        }) //procurar em cada uma das metas
        meta.checked = true //marca como verdadeira
    })
}

const cadastrarMeta = async() => { 
    const meta = await input({message:" Digite a meta"})

    if(meta.length ==0 ){
        console.log ("A meta não pode ser vazia")
        return
    }
    metas.push(
        {value: meta, checked:false}
    )
    console.log ("meta(s) concluida(s)")
}
const MetasRealizadas = async() => {
    const realizadas = metas.filter((meta) =>{//high order function sempre recebe função .filter(()=>{})
        return meta.checked
    })
    if(realizadas.length == 0){
        console.log ("não existem metas realizadsa!")
    }
    await select({
        message: "Metas realizadas",
        choices:[...realizadas]//um novo array com as informações do antigo.

    })
}

const start = async () => {

    while(true) {

    const opcao = await select ({
        message: "Escolha uma das opções",
        choices:[
            {
                name:"cadastrar metas",
                value: "cadastrar",

            },
            {
                name:"listar metas",
                value: "listar",

            },
            {
                name:"metas realizadas",
                value: "realizadas",

            },
            {
                name:"sair",
                value:"sair"
            }
        ]

    }
)
    
    switch (opcao) {
        case "cadastrar":
           await cadastrarMeta()
           console.log (metas)
            break
        case "listar":
            console.log("vamos listar")
                await ListarMetas()
            break
        case "realizadas":
            await MetasRealizadas()
            break
        case "sair":
            return

    }

}
}
start ();