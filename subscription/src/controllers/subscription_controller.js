const subscription = require('../models/db');

exports.get_all_subscriptions = async(req, res) => {
    try {
        const getSubscriptions = await subscription.find();
        res.json(getSubscriptions);
    } catch (error) {
        console.log(error);
    }
};

exports.get_a_suscription = async (req,res) => {
    const {id} = req.params;
    try {
        const getOneSuscription = await subscription.findById(id);
        res.json(getOneSuscription)
    } catch (error) {
        console.log(error);
    }
};