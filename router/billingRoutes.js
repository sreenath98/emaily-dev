const keys = require ('../config/keys');
const Stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requirelogin');

module.exports = (app) => {
  app.post("/api/stripe",requireLogin, async (req, res) => {
  const charge = await Stripe.charges.create({
      amount:500,
      currency:'usd',
      description:'$5 for 5 credits',
      source:req.body.id,
    });
    
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
