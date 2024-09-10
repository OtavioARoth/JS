const { select, input, checkbox } = require('@inquirer/prompts')

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
                name:"sair",
                value:"sair"
            }
        ]

    }
)
    
    switch (opcao) {
        case "cadastrar":
            console.log("vamos cadastrar metas")
            break
        case "listar":
            console.log("vamos listar")
            break
        case "sair":
            return

    }

}
}
start ();