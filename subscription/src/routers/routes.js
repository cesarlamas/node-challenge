const router = require("express").Router();
const {get_all_subscriptions, get_a_suscription} = require("../controllers/subscription_controller");

router.get("/subscriptions", get_all_subscriptions);
router.get("/subscription/:id", get_a_suscription);



module.exports = router