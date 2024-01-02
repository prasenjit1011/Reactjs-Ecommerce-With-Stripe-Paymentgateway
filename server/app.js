require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")('sk_test_51JNumISClMejYbtCKQ1jTxJpvKHQM1PmTxHCq8FSrGk7HbSpbLYp87ZYnkcCKVFF2iB0vEKTALgyygxrdxHhqnCG00MFsMLaFL');

app.use(express.json());
app.use(cors());

console.log('+hello+');


// checkout api
/*
console.log('-: WebHook Created :-');
Only Once need to create webhook
const webhookEndpoint = await stripe.webhookEndpoints.create({
    enabled_events: ['charge.succeeded', 'charge.failed'],
    url: 'http://37fb-45-64-223-11.ngrok-free.app/payment',
    });
*/

app.post('/payment', (req, res)=>{
    const body = req.body;

    console.log('-: Payment Received '+parseInt(Math.random()*100)+'  :-');
    console.log(body);
    //res.send('Hello');
    res.end();
});

app.get('/', (req, res)=>{
    //console.log('-: Payment Received :-');
    res.send('Hello');
    res.end();
});
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.dish,
                images:[product.imgdata]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.qnty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/sucess",
        cancel_url:"http://localhost:3000/cancel",
    });

    res.json({id:session.id})
 
})


app.listen(7000,()=>{
    console.log("server start")
})