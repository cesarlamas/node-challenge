const app = require('../server.js');


const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();


describe("Testing subscriptions", () => {
    let id;
    describe("Post Api", () => {
        it("Shouldn't create a subscription if newsletter not in the body", async ()  => {
            const result = await chai.request(app)
                .post('/api/subscriptions')
                .send({
                    'email': 'test@test.com',
                    'birth' : "1997-02-12T00:00:00.000Z",
                    'consent' : true,
                    'name' : 'John Doe',
                    'gender' : 'male'
                })
        result.should.have.status(400);
        result.text.should.equal("Newsletter is required")
        });
    it("Shouldn't create a Subscription if email not in the body", async () => {
        const result = await chai.request(app)
            .post('/api/subscriptions')
            .send({
                'newsletter' : '1',
                'birth_date' : "1997-02-12T00:00:00.000Z",
                'consent' : true,
                'name' : 'Jane Doe',
                'gender' : 'female'
            })
        result.should.have.status(400);
        result.text.should.equal("Email is required")
        })
    it("Shouldn't create a Subscription if date not in the body", async () => {
        const result = await chai.request(app)
            .post('/api/subscriptions')
            .send({
                'email' : 'test@test.com',
                'newsletter' : '1',
                'consent' : true,
                'name' : 'Jane Doe',
                'gender' : 'female'
    })
    result.should.have.status(400);
    result.text.should.equal('{"error":"subscription validation failed: birth_date: Your date of birth is required"}');
});
    it("Shouldn't create a Subscription if consent is not in the body", async () => {
        const result = await chai.request(app)
            .post('/api/subscriptions')
            .send({
                'email' : 'test@test.com',
                'newsletter' : '1',
                'birth_date' : "1997-02-12T00:00:00.000Z",
                'name' : 'Jane Doe',
                'gender' : 'female'
    })
    result.should.have.status(400);
    result.text.should.equal("Consent is required");
    });
    it('Shouldn´t create a Subscription if not valid formats in the fields', async () => {
        const result = await chai.request(app)
            .post('/api/subscriptions')
            .send({
                'email' : 'test.test.com',
                'newsletter' : '1',
                'birth_date' : "19",
                'name' : 'Jane Doe',
                'consent' : true,
                'gender' : 'female'
            })
        result.should.have.status(400);
        result.text.should.include('{"error":"subscription validation failed:')
    })
    it("Should create a new Subscription" , async () => {
        const result = await chai.request(app)
            .post(('/api/subscriptions'))
            .send({
                'email' : 'testFinal@test.com',
                'newsletter' : '1',
                'birth_date' : "1997-02-12T00:00:00.000Z",
                'name' : 'Jane Doe',
                'consent' : true,
                'gender' : 'female'
            })
        result.should.have.status(200);
        result.text.should.be.a('string');
        id = result.text;
    })
});
    describe("Get all subscriptions",  () => {
        it('Should get all subscriptions', async () => {
            const result = await chai.request(app)
                .get('/api/subscriptions');

            console.log(result)
            result.should.have.status(200);
            result.body.should.be.a('array');
            result.body[0].should.have.property('email');
            result.body[0].should.have.property('newsletter');
            result.body[0].should.have.property('birth_date');
            result.body[0].should.have.property('consent');
            result.body[0].should.have.property('first_name');
        })
    })
    describe("Get one subscription", () => {
        it('Should get one subscription', async () => {
            const result = await chai.request(app)
                .get(`/api/subscription/${id}`)
                
            result.should.have.status(200);
            result.body.should.be.a('object');
            result.body.should.have.property('email');
            result.body.should.have.property('newsletter');
            result.body.should.have.property('birth_date');
            result.body.should.have.property('consent');
        })
        it ('Shouldnt get a subscription if id is not valid', async () => {
            const result = await chai.request(app)
                .get('/api/subscription/1234')
            result.should.have.status(404);
            result.text.should.equal('{"message":"The subscription with the given ID was not found."}');
        }  
    )
    })
    describe("Delete one subscription", () => {
        it('Should delete one subscription', async () => {
            const result = await chai.request(app)
                .delete(`/api/subscription/${id}`)

            result.should.have.status(200);
            result.text.should.equal('{"message":"Subscription deleted"}');
        })
        it ("Shouldn't delete a subscription if id is not valid", async () => {
            const result = await chai.request(app)
                .delete('/api/subscription/1234')
            result.should.have.status(404);
            result.text.should.equal("The subscription with the given ID was not found.");
        })
    }
    )
});
