process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
let Gateway = require('../models/gateway');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Gateway', () => {
    beforeEach((done) => {
        Gateway.deleteMany({}, (err) => {
            done();           
        });        
    });
    
    //===================================================
    // Test the getGateways route
    //===================================================
    describe('/GET Gateways', () => {
        it('It should GET all the gateways', (done) => {
            chai.request(server)
                .get('/api/gateway')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').eql(true);
                    done();
                });
            });
    });
    //===================================================
    //===================================================

    //===================================================
    // Test the getGateway route
    //===================================================
    describe('/GET/:id Gateway', () => {
        
        it('It should GET a gateway by the given id', (done) => {
            let gateway = new Gateway({
                    serialNumber    : "XoZDLF63",
                    gatewayName     : "Northpass",
                    address         : "192.168.0.1"
            });

            gateway.save((err, gateway) => {
                chai.request(server)
                    .get('/api/gateway/' + gateway.id)
                    .send(gateway)
                    .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.gateways.should.have.property('serialNumber');
                            res.body.gateways.should.have.property('gatewayName');
                            res.body.gateways.should.have.property('address');
                            res.body.gateways.should.have.property('peripheralDevice');
                            done();
                    });
            });
        });
    });
    //===================================================
    //===================================================

    //===================================================
    // Test the createGateway route
    //===================================================
    describe('/POST Gateway', () => {
        it('It should not POST a gateway without serial number field', (done) => {
            let gateway  = new Gateway({
                    gatewayName     : "Northpass",
                    address         : "192.168.0.1"
            });

            gateway.save((err, gateway) => {
                chai.request(server)
                    .post('/api/gateway')
                    .send(gateway)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('message');
                        done();
                    });
                });
            });

        it('It should POST a gateway ', (done) => {
            let gateway = {
                serialNumber    : "XoZDLF63",
                gatewayName     : "Northpass",
                address         : "192.168.0.1"
            };
                chai.request(server)
                    .post('/api/gateway')
                    .send(gateway)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.message.should.be.eql('Gateway successfully added!');
                        res.body.gateways.should.have.property('serialNumber');
                        res.body.gateways.should.have.property('gatewayName');
                        res.body.gateways.should.have.property('address');
                        res.body.gateways.should.have.property('peripheralDevice');
                        done();
                    });
        });
    });
    //===================================================
    //===================================================

    //===================================================
    // Test the updateGateway route
    //===================================================
    describe('/PUT/:id Gateway', () => {

        it('It should UPDATE a gateway given the id', (done) => {
            let gateway = new Gateway({
                serialNumber    : "XoZDLF63",
                gatewayName     : "Northpass",
                address         : "192.168.0.1"
            });

            gateway.save((err, gateway) => {
                chai.request(server)
                .put('/api/gateway/' + gateway.id)
                .send({
                    serialNumber    : "XoZDLF63",
                    gatewayName     : "Northpass",
                    address         : "192.168.2.1"
                })
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Gateway updated!');
                        res.body.gateways.should.have.property('address').eql("192.168.2.1");
                    done();
                });
            });
        });
    });
    //===================================================
    //===================================================

    //===================================================
    // Test the deleteGateway route
    //===================================================
    describe('/DELETE/:id Gateway', () => {
        it('It should DELETE a gateway given the id', (done) => {
            let gateway = new Gateway({
                serialNumber    : "XoZDLF63",
                gatewayName     : "Northpass",
                address         : "192.168.0.1"
            });

            gateway.save((err, gateway) => {
                chai.request(server)
                .delete('/api/gateway/' + gateway.id)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Gateway successfully deleted!');
                        res.body.should.have.property('ok').eql(true);
                    done();
                });
            });
        });
    })
    //===================================================
    //===================================================

    //===================================================
    // Test the addPeripheral route
    //===================================================
    describe('/PUT/:id/add Peripheral', () => {
        it('It should not UPDATE the peripheralDevice list without the id', (done) => {
            let gateway = new Gateway({
                serialNumber    : "XoZDLF63",
                gatewayName     : "Northpass",
                address         : "192.168.0.1"
            });

            gateway.save((err, gateway) => {
                chai.request(server)
                .put('/api/gateway/' + gateway.id+'/add')
                .send()
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('message').eql("Please don't forget the Peripheral Device you want to add");
                    done();
                });
            });
        });

        it('It should UPDATE the peripheralDevice list given the id', (done) => {
            let gateway = new Gateway({
                serialNumber    : "XoZDLF63",
                gatewayName     : "Northpass",
                address         : "192.168.0.1"
            });

            gateway.save((err, gateway) => {
                chai.request(server)
                .put('/api/gateway/' + gateway.id+'/add')
                .send({
                    peripheralDevice : "62109cbb89a2012e1476efd5"
                })
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Peripheral device successfully added to the list!');
                    done();
                });
            });
        });
    });
    //===================================================
    //===================================================

    //===================================================
    // Test the removePeripheral route
    //===================================================
    describe('/PUT/:id/remove Peripheral', () => {
        it('It should not DELETE the peripheralDevice list without the gateway id and the peripheralDevice id', (done) => {
            let gateway = new Gateway({
                serialNumber    : "XoZDLF63",
                gatewayName     : "Northpass",
                address         : "192.168.0.1"
            });

            gateway.save((err, gateway) => {
                chai.request(server)
                .delete('/api/gateway/' + gateway.id+'/remove')
                .send()
                .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('errors');
                        res.body.errors.should.have.property('message').eql("Please don't forget the Peripheral Device you want to remove");
                    done();
                });
            });
        });

        it('It should DELETE the peripheralDevice list given the gateway id and the peripheralDevice id', (done) => {
            let gateway = new Gateway({
                serialNumber    : "XoZDLF63",
                gatewayName     : "Northpass",
                address         : "192.168.0.1",
                peripheralDevice : ["62109cbb89a2012e1476efd5"]
            });

            gateway.save((err, gateway) => {
                chai.request(server)
                .delete('/api/gateway/'+ gateway.id+'/remove')
                .send({
                    peripheralDevice : "62109cbb89a2012e1476efd5"
                })
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Peripheral device successfully removed of the list!');
                    done();
                });
            });
        });
    });
    //===================================================
    //===================================================

});

