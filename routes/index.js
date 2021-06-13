const { json } = require('express');
var express = require('express');
var router = express.Router();
const sql = require("../dboperations");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//test connection
router.get('/testconnect', function(req, res, next) {
  sql.getdata();
  res.render('index', { title: 'Express' });
});


router.get("/getproducts", function (req, res, next) {
  sql.getproducts().then((result) => {
    res.json(result[0]);
  });
});

router.get("/getproducts/:id", function (req, res, next) {
  sql.getproductById(req.params.id).then((result) => {
    res.json(result[0]);
  });
});

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
router.post("/insertproduct", jsonParser ,function (req, res, next) {
  let product = {...req.body}
  sql.addProduct(product).then((result) => {
    res.status(201).json(result);
  });  
});

router.delete("/deleteproduct/:id", function (req, res, next) {
  sql.deleteProduct(req.params.id);
  return res.json();
});

module.exports = router;
