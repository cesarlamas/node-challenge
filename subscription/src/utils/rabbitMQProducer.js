const amqp = require('amqplib/callback_api');

const queue = 'subscription';

function enqueue (subscription, res) {
    amqp.connect('amqp://localhost', function(error, connection) {
        if (error) {
            res.status(500).send(error);
        }
        connection.createChannel(function(error, channel) {
            if (error) {
                res.status(500).send(err);
            }
            
            const msg = JSON.stringify(subscription);

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(subscription)));
        });
    });

    module.exports = enqueue
}