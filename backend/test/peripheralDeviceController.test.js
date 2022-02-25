process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Peripheral = require('../models/peripheralDevice');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();




chai.use(chaiHttp);

describe('Peripheral Devices', () => {
    beforeEach((done) => {
        Peripheral.deleteMany({}, (err) => {
            done();           
        });        
    });
    
    /*
    * Test the getDevices route
    */
    describe('/GET Devices', () => {
        it('It should GET all the peripheral devices', (done) => {
            chai.request(server)
                .get('/device')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').eql(true);
                    done();
                });
            });
    });

    /*
    * Test the getdevice route
    */
    describe('/GET/:id Device', () => {
        
        it('It should GET a peripheral device by the given id', (done) => {
            let device = new Peripheral({
                uid             : Math.floor(1000 + Math.random() * 90000000),
                vendor          : "sofdark",
                statusd         : true
            });

            device.save((err, device) => {
                
                chai.request(server)
                    .get('/device/' + device.id)
                    .send(device)
                    .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.peripheral.should.have.property('uid');
                            res.body.peripheral.should.have.property('vendor');
                            res.body.peripheral.should.have.property('statusd');
                            done();
                    });
            });
        });
    });

    /*
    * Test the createDevice route
    */
    describe('/POST Device', () => {
        it('It should not POST a device without UID field', (done) => {
            let device = new Peripheral({
                vendor          : "sofdark",
                statusd         : true
            });

            device.save((err, device) => {
                chai.request(server)
                    .post('/device')
                    .send(device)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('message');
                        done();
                    });
                });
            });

        it('It should POST a Device ', (done) => {
            let device = {
                uid             : Math.floor(1000 + Math.random() * 90000000),
                vendor          : "sofdark",
                statusd         : true
            };
                chai.request(server)
                    .post('/device')
                    .send(device)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.message.should.be.eql('Peripheral device successfully added!');
                        res.body.peripheral.should.have.property('uid');
                        res.body.peripheral.should.have.property('vendor');
                        res.body.peripheral.should.have.property('statusd');
                        done();
                    });
        });
    });

    /*
    * Test the updateDevice route
    */
    describe('/PUT/:id Device', () => {

        it('It should UPDATE a device given the id', (done) => {
            let device = new Peripheral({
                uid             : Math.floor(1000 + Math.random() * 90000000),
                vendor          : "sofdark",
                statusd         : true
            });

            device.save((err, device) => {
                chai.request(server)
                .put('/device/' + device.id)
                .send({
                    uid             : Math.floor(1000 + Math.random() * 90000000),
                    vendor          : "Darkline",
                    statusd         : false
                })
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Peripheral device updated!');
                        res.body.peripheral.should.have.property('statusd');
                    done();
                });
            });
        });
    });

    /*
    * Test the deleteDevice route
    */
    describe('/DELETE/:id Device', () => {
        it('It should DELETE a device given the id', (done) => {
            let device = new Peripheral({
                uid             : Math.floor(1000 + Math.random() * 90000000),
                vendor          : "sofdark",
                statusd         : true
            });

            device.save((err, device) => {
                chai.request(server)
                .delete('/device/' + device.id)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Peripheral device successfully deleted!');
                        res.body.should.have.property('ok').eql(true);
                        done();
                });
            });
        });
    })

});
