const variables = {
    Api:{
        port:process.env.port || 3333
    },
    Database:{
        connection: process.env.connection || 'mongodb+srv://gustavo:aranha@cluster0-wcxg4.mongodb.net/test?retryWrites=true&w=majority'
    },
    Security:{
        secretKey:process.env.secretKey || 'f2dce72ee92ef131cb829fa37d0eb9e8'
    },
    Pagarme:{
     pagarmeKey:process.env.pagarme || 'ak_test_JxEz7eTLI1uzT4tODC7UTXBBoB4ZlH',
     pagarmeKeyTest:process.env.pagarmetest || 'ak_test_JxEz7eTLI1uzT4tODC7UTXBBoB4ZlH'
    }
}

module.exports = variables;