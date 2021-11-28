const express = require("express");
const router = express.Router();
router.use(express.json());
const seller_data = require("../Data/seller.js");
router.get("/",(req,res)=> res.send("It is Display Seller information"));

//Display all Seller detail
router.get("/display",(req,res)=>{
    res.json({data : "Seller info Display!",data2:seller_data});
});

//Add new Seller
router.post("/Add_seller",(req,res)=> {
    const new_seller = req.body;
    seller_data.push(new_seller);
    res.json({data : "Seller added!",data1:seller_data});
   });

//Delete Seller
router.delete("/:id", (req, res) => {
    const Seller_id = req.params.id;
    const Seller = seller_data.filter((seller) => seller.seller_id === Seller_id);
    // res.json({data:Seller_id+"is deleted"});
    if(Seller.length > 0){
        var i = seller_data.indexOf(seller[0]);
        seller_data.splice(i,1);
        res.json({data : "Seller deleted!"});
    } else {
        res.json({data : "Seller not found"});
    }
});

//fetch seller details based on product name
router.get("/product_name/:p_name",(req,res)=>{
    const product_name = req.params.p_name;
    const product_data = require("../Data/product.js");
    var display_data = [];
    const product = product_data.filter((p) => (p.title === product_name)); 
    const s_id=product[0].seller_id;
    if(product.length > 0){
                display_data = seller_data.filter((s) => s.seller_id === s_id);
    } else {
        display_data = "No Product name found!!";
    }
    res.json({data:"Seller Detail Based On Product Name",data1 : display_data,data2:product});
});

//fetch all products of a company
router.get("/seller_id/:s_id", (req,res) => {
    const s_id = req.params.s_id;
    const product_data = require("../Data/product.js");
    const product_val = product_data.filter((p) => (p.seller_id === s_id));  
    res.json({data:"Seller Product Name",product_name:product_val});
});

//update seller (add/remove products)
router.put("/update/:s_id", (req, res) => {
    const s_id = req.params.s_id;
    const update_seller = req.body;
    const seller = seller_data.filter((c) => c.seller_id === s_id);
    if(seller.length > 0){
        seller_data[seller_data.indexOf(seller[0])].product_id = update_seller;
        res.json({data : "Product changes in Seller"});
    } else {
        res.json({data : "Product not changes in Seller"});
    }
});
module.exports = router;