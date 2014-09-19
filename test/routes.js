var should = require('should');
var assert = require('assert');
var request = require('supertest');


describe('Routing', function() {
    var url = 'http://localhost:2222';
    request = request(url);

    describe('Usuario', function() {
        it('deberia buscar todos los usuarios', function(done) {
            request
                .get('/usuario')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        })
    })
    describe('Usuario', function() {
        it('deberia buscar un solo usuarios', function(done) {
            request
                .get('/usuario/146541654456')
                .expect('Content-Type', /json/)
                .auth('prueba@example.com' ,'paraque')
                .expect(200)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        })
    })
})
