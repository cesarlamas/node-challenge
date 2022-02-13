const Subscription = require('../models/db');
const subscription = require('../models/db');
const errorHandler = require('../controllers/errorHandling');


exports.get_all_subscriptions = async(req, res) => {
    try {
        const getSubscriptions = await subscription.find();
        res.json(getSubscriptions);
    } catch (error) {
        console.log(error);
    }
};

exports.get_a_subscription = async (req,res) => {
    try {
        const id = req.params.id;
        const getSuscription = await subscription.findById(id);
        res.status(200);
        res.send(getSuscription);
      } catch (error) {
        res.status(404).send({"message":"The subscription with the given ID was not found."});
      }
};


exports.create_subscription = (req,res) => {
    if (!req.body.email) return res.status(400).send('Email is required');
    if (!req.body.newsletter) return res.status(400).send('Newsletter is required');
    if (!req.body.consent) return res.status(400).send('Consent is required');

    Subscription.create(req.body, (error, subscription) => {
        if (error) return errorHandler(error,res);
        res.send(subscription.id);
    });
    };



exports.cancel_subscription = async(req,res) => {
    const id = req.params.id
    Subscription.findByIdAndDelete(id, (error, subscription) => {
        if(error || !subscription) return res.status(404).send('The subscription with the given ID was not found.');
        res.status(200).send({"message":"Subscription deleted"});
    })
};
