let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('POST /task', () => {
    it('Should receive a photo url', (done) => {
        chai.request(url)
            .post('/task')
            .send({ url: "D:\\Proyectos\\plexus\\output\\0264683400_1_1_1.jpg" })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('POST /task error', () => {
    it('Should receive an invalid photo url', (done) => {
        chai.request(url)
            .post('/task')
            .send({ url: "im not a valid Url" })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(500);
                done();
            });
    });
});


describe('GET', () => {
    it('Should receive an existing taskId', (done) => {
        chai.request(url)
            .get('/task')
            .send({ taskId: 1 })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('GET', () => {
    it('Should receive a non existing taskId', (done) => {
        chai.request(url)
            .get('/task')
            .send({ taskId: "im not an existing taskId" })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});