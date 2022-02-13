const amqp = require('amqplib/callback_api');

const queue = 'subscription';

amqp.connect('amqp://localhost', function(error, connection) {
    if (error) {
        console.log(error);
        }
        connection.createChannel(function(error, channel) {
            if (error) {
                console.log(error);
                }
                channel.assertQueue(queue, {
                    durable: false
                    });
                    channel.consume(queue, function(message) {
                        if (message !== null) {
                            const subscription = JSON.parse(message.content.toString());
                            console.log(`Sending mail to ${subscription.email}`);
                            channel.ack(message);
                            }
                        });
                    })
                })

