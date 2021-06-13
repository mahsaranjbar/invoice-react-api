var Db  = require('./dboperations');
var Product = require('./product');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   next();
})


router.route('/getdata').get((request,response)=>{
   
   dboperations.getdata().then(result => {
      response.json(result[0]);
   })

})


router.get('/products').get((request,response)=>{

    dboperations.getproducts().then(result => {
       response.json(result[0]);
    })

})

router.get('/products/:id').get((request,response)=>{

    dboperations.getproductById(request.params.id).then(result => {
       response.json(result[0]);
    })

})

router.get('/products').post((request,response)=>{

    let product = {...request.body}

    dboperations.addProduct(product).then(result => {
       response.status(201).json(result);
    })

})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Product API is runnning at ' + port);




