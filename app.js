const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';

var app = express();
app.use(express.static('public'));
app.use(express.json());

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({}));

/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});


/**
 * Create Payment Intent Route
 */
app.post("/create-payment-intent", async (req, res) => {
  const { priceId } = req.body;
  const price = await stripe.prices.retrieve(priceId);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price.unit_amount ,
    currency: "aud",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


/**
 * Checkout route
 */
app.get('/checkout', function(req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300      
      priceId = "price_1Ql0CLFSYQio1CHonUPjxlZ4"      
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      priceId = "price_1QkyjGFSYQio1CHoE4NIjCY8"
      break;     
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source!"
      amount = 2800  
      priceId = "price_1Ql0CwFSYQio1CHoXQr5XpVD"
      break;     
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"      
      break;
  }


  res.render('checkout', {
    title: title,
    amount: amount,
    priceId: priceId,
    error: error
  });
});

/**
 * Success route
 */
app.get('/success', function(req, res) {
  res.render('success');
});

/**
 * Complete route
 */
app.get('/complete', function(req, res) {
  res.render('complete');
});

/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});
