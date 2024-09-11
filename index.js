const { select, input, checkbox } = require('@inquirer/prompts') // npm install inquirer puxa as funções dessa base
let meta = {
    value: "tomar 3L de agua por dia",
    checked: false,
}
let mensagem = "bem vindo ao app de metas"
let metas = [meta] //armazena meta individual em metas

const ListarMetas = async () => {
    if (metas.length == 0) {
        mensagem = ("Não existem metas!")
        return
    }
    const respostas = await checkbox({ //espera para a marcação
        message: "use as setas para mudar a meta e espaço para marcar e desmarcar as metas",
        choices: [...metas], //copia tudo que está em metas 
        instructions: false,
    })
    metas.forEach((m) => {

        m.checked = false // se for marcado como falso ela não altera o valor

    })


    respostas.forEach((resposta) => { //para cada resposta ele faz algo
        const meta = metas.find((m) => { //ele vai pegar uma das metas e chamar de "m", se m value bate com um valor armazenado ele faz o check.
            return m.value == resposta
        }) //procurar em cada uma das metas
        meta.checked = true //marca como verdadeira
    })
    if (respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada!"
        return
    }
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = 'Meta(s) marcada(s) como concluída(s)'
}

const cadastrarMeta = async () => {
    const meta = await input({ message: " Digite a meta" })

    if (meta.length == 0) {
        mensagem = ("A meta não pode ser vazia")
        return
    }
    metas.push(
        { value: meta, checked: false }
    )
        mensagem = "meta cadastrada com sucesso"
}
const metasRealizadas = async () => {
    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas! :('
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem =("nao existem metas abertas")
        return
    }


    await select({
        message: "metas Abertas",
        choices: [...abertas]
    })
}
const deletarMetas = async () => {
    if ( metas.length == 0) {
        mensagem = "não exitem metas"
        return
    }
    const metasDesmarcadas = metas.map((meta) => { // devolve um novo array modificado
        return { value: meta.value, checked: false }

    })
    const ItensADeletar = await checkbox({ //espera para a marcação
        message: "Selecione intes para deletar",
        choices: [...metasDesmarcadas], 
        instructions: false,
    })
    if (ItensADeletar.length == 0) {
        message: "nenhum item a deletar"
        return
    }
    ItensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    mensagem = ("Meta(s) deletada(s) com sucesso!")
}
const mostrarMensagem = () => {
    console.clear();
    if (mensagem != ""){
        console.log(mensagem)
        console.log ("")
        mensagem = ""
    }
}

const start = async () => {

    while (true) {
        mostrarMensagem()

        const opcao = await select({
            message: "Escolha uma das opções",
            choices: [
                {
                    name: "cadastrar metas",
                    value: "cadastrar",

                },
                {
                    name: "listar metas",
                    value: "listar",

                },
                {
                    name: "metas realizadas",
                    value: "realizadas",

                },

                {
                    name: "metas abertas",
                    value: "abertas",

                },
                {
                    name: "deletar metas",
                    value: "deletar",

                },
                {
                    name: "sair",
                    value: "sair"
                }
            ]

        }
        )

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                console.log("vamos listar")
                await ListarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                return

        }

    }
}
start();