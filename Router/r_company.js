const express = require("express");
const router = express.Router();
router.use(express.json());
const company_data = require("../Data/company.js");
router.get("/",(req,res)=> res.send("It is Display Company information"));


//Display all Company detail
router.get("/display",(req,res)=>{
    res.json({data : "Company info Display!",data2:company_data});
});

//Add new company
router.post("/Add_company",(req,res)=> {
    const new_company = req.body;
    company_data.push(new_company);
    res.json({data : "Company added!"});
   });

//Delete Company
router.delete("/:id", (req, res) => {
    const company_id = req.params.id;
    const company = company_data.filter((c) => c.company_id === company_id);
    if(company.length > 0){
        var i = company_data.indexOf(company[0]);
        company_data.splice(i,1);
        res.json({data : "Company deleted!"});
    } else {
        res.json({data : "Company not found"});
    }

});

//fetch company details based on product name
router.get("/product_name/:p_name", (req,res) => {
    const product_name = req.params.p_name;
    const product_data = require("../Data/product.js");
    var display_data = [];
    const product = product_data.filter((p) => (p.title === product_name));
    if(product.length > 0){
        display_data = company_data.filter((c) => (c.company_id === product[0].company_id));
    } else {
        display_data = "No Product name found!!";
    }
    res.json({data:"Company Detail Based On Product Name",data1 : display_data});
});

//fetch all products of a company
router.get("/company_id/:c_id", (req,res) => {
    const c_id = req.params.c_id;
    const product_data = require("../Data/product.js");
    const product_val = product_data.filter((p) => (p.company_id === c_id));  
    res.json({data:"Company Product Name",product_name:product_val});
});

//update company (add/remove products)
router.put("/update/:cid", (req, res) => {
    const c_id = req.params.cid;
    const update_company = req.body;
    const company = company_data.filter((c) => c.company_id === c_id);
    if(company.length > 0){
        company_data[company_data.indexOf(company[0])].product_id = update_company;
        res.json({data : "Product changes"});
    } else {
        res.json({data : "Product not changes"});
    }
});
module.exports = router;