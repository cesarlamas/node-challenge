const router = require("express").Router();
const {get_all_subscriptions, get_a_subscription, create_subscription, cancel_subscription } = require("../controllers/subscription_controller");

router.get("/api/subscriptions", get_all_subscriptions);
router.get("/api/subscription/:id", get_a_subscription);
router.post("/api/subscriptions", create_subscription);
router.delete("/api/subscription/:id", cancel_subscription);



module.exports = router