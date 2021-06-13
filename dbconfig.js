	
const config = {
    user: "sa",
    password: "123",
    server: "172.20.144.138",
    database: "invoiceDB",
    options: {
      trustedconnection: true,
      enableArithAbort: true,
      encrypt: false,
      instancename: "MSSQLSERVER",
    },
    port : 1433
    
  };
   
module.exports = config;
  
