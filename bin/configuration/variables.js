const variables = {
  Api:{
      port:process.env.port || 3333
  },
  Database:{
      connection: process.env.connection 
  },
  Security:{
      secretKey:process.env.secretKey 
  },
  Pagarme:{
   pagarmeKey:process.env.pagarme ,
   pagarmeKeyTest:process.env.pagarmetest 
  }
}

module.exports = variables;