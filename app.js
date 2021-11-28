const express=require("express");
const app=express();

const port=5000;
const Product_route=require("./Router/r_product.js");
const seller_route=require("./Router/r_seller.js");
const company_route=require("./Router/r_company.js");

app.use("/company_info",company_route);
app.use("/product_info",Product_route);
app.use("/seller_info",seller_route)

app.get("/",(req,res)=>res.send("Product Management APIs"));

app.listen(port,()=>console.log("Server Runing on Port 5000"));


