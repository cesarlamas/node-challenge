# node-challenge

Description:

Creation a subscription system, composed by 3 microservices: 

    - api_service : Backend for frontend microservice.

    - subscription : Implementing subscription logic, including saving of data in mongoDB database and RabbitMQ producing message when a subscription is made. Endpoints created : 
        - Get all subscriptions
        - Get a subscription
        - Create a subscription
        - Delete a subscription

    - mailing : Implementing RabbitMQ producer to receive the subscription from the subscription service and faking mailing.

Running application: 
   
    Clone the repository: 
    
    -https://github.com/cesarlamas/node-challenge.git
    
    Build the container:
    
    -docker-compose up -d --build

Technologies:

    - NODEJS with express framework
    - MONGODB Database for storing persistence data 
    - MONGOOSE ORM for connecting to mongo and creating schema
    - RabbitMQ Message broker
    - Docker Creating containers for the application

