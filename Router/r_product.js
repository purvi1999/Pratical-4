const express = require("express");
const router = express.Router();
router.use(express.json());
const product_data = require("../Data/product.js");
router.get("/",(req,res)=> res.send("It is Display Product information"));

//Display all product detail
router.get("/display",(req,res)=>{
    res.json({data : "Product info Display!",data2:product_data});
});
//Add new Product
router.post("/Add_product",(req,res)=> {
    const new_product = req.body;
    product_data.push(new_product);
    res.json({data : "Product added!",data2:product_data});
   });

//Delete Product
router.delete("/:id", (req, res) => {
    const product_id = req.params.id;
    const Product = product_data.filter((p) => p.product_id === product_id);
    if(Product.length > 0){
        var i = product_data.indexOf(Product[0]);
        product_data.splice(i,1);
        res.json({data : "Product deleted!"});
    } else {
        res.json({data : "Product not found"});
    }

});

//update product (add/remove category)
router.put("/update/:pid", (req, res) => {
    const p_id = req.params.pid;
    const update_product = req.body;
    const product = product_data.filter((p) => p.product_id === p_id);
    if(product.length > 0){
        product_data[product_data.indexOf(product[0])].company_id = update_product;
        res.json({data : "Company changes"});
    } else {
        res.json({data : "Company not changes"});
    }
});
module.exports = router;