var config = require("./dbconfig");
const sql = require("mssql");

async function getdata() {
  try {
    let pool = await sql.connect(config);
    console.log("sql server connected...");
  } catch (error) {
    console.log(" mathus-error :" + error);
  }
} 

async function getproducts() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("select * from dbo.productTBL");
      return res.recordsets;      
    } catch (error) {
      console.log(" mathus-error :" + error);
    }
}

async function getproductById(productId) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request().
    input('input_parameter1', sql.Int, productId).
    query("select * from dbo.productTBL where id = @input_parameter1");
    return res.recordsets;
  } catch (error) {
    console.log(" mathus-error :" + error);
  }
}

async function addProduct(product) {
  try {

    let pool = await sql.connect(config);

    let insertProduct = await pool.request()
        .input('description', sql.NVarChar(200), product.description)
        .input('quantity', sql.SmallInt, product.quantity)
        .input('price', sql.Float, product.price)
        .execute('dbo.InsertProduct');
        
    return insertProduct.recordsets;

  } catch{

  }
}

async function deleteProduct(productId) {
  try {

    let pool = await sql.connect(config);

    await pool.request()
        .input('id', sql.Int, productId)
        .execute('dbo.DeleteProduct');

  } catch{

  }
}

module.exports = {
  getdata: getdata,
  getproductById: getproductById,
  getproducts: getproducts,
  addProduct: addProduct,
  deleteProduct: deleteProduct
};
