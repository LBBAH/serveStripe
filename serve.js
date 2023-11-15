 
const stripe = require('stripe')('pk_test_51O7LnKDtJXAsj9ndZFuU9fbnOrnwH3x1XO7IWCpxdFbjmqYY5pQFHbnTvpGZCjAWDt7EiYV6mK62Icj7GrmTnKFv00fRgrtuhq');

import express from 'express';
import { json } from 'body-parser';
const app = express();

app.use(json())

app.get('/',(req, res)=>{
    res.send("Prueba api stripe funcionando xd.")
})


app.post('/payment-sheet', async (req, res) => {    

    const {amount, currency} = req.body

    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2022-08-01'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      payment_method_types: [ 'card'],
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  });

app.listen(4002, ()=> console.log("Running on http://localhost:4002"))