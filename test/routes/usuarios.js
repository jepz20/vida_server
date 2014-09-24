var should = require('should');
var assert = require('assert');
var request = require('supertest');


describe('Rutear', function() {
    var url = 'http://localhost:2222';
    request = request(url);

    describe('Usuario', function() {
        it('Deberia buscar todos los usuarios', function(done) {
            request
                .get('/usuario')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property('length');
                    done();
                })
        });

        it('Deberia dar error porque el usuario no existe', function(done) {
            request
                .get('/usuario/540fddd24937351d392e4d6f')
                .auth('pruebas@example.com' ,'paraque')
                .expect(404)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        })


        it('Deberia dar error los datos de autenficacion son erroneos', function(done) {
            request
                .get('/usuario/540fdd594937351d392e4d6b')
                .auth('pruebas@example.com' ,'malacontra')
                .expect(401)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    done();
                })
        })


        it('Deberia traer un solo usuario', function(done) {
            request
                .get('/usuario/540fdd594937351d392e4d6b')
                .auth('pruebas@example.com' ,'paraque')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.not.have.property('length');
                    res.body._id.should.equal('540fdd594937351d392e4d6b');
                    done();
                })
        })

        it('Deberia actualizar el nombre del un usuario', function(done) {
            request
                .put('/usuario/540fdd594937351d392e4d6b')
                .auth('pruebas@example.com' ,'paraque')
                .send({nombre: 'Juan Jose Perez'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }

                    request
                        .get('/usuario/540fdd594937351d392e4d6b')
                        .auth('pruebas@example.com' ,'paraque')
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(function(err,res) {
                            if (err) {
                                throw err;
                            }
                            res.body.should.not.have.property('length');
                            res.body.nombre.should.equal('Juan Jose Perez');
                            res.body._id.should.equal('540fdd594937351d392e4d6b');
                            done();
                        })
                })
        })

        it('Deberia cambiar la ubicacion del usuario', function(done) {
            request
                .put('/usuario/540fdd594937351d392e4d6b')
                .auth('pruebas@example.com' ,'paraque')
                .send({ubicacion: '[3,1]'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }

                    request
                        .get('/usuario/540fdd594937351d392e4d6b')
                        .auth('pruebas@example.com' ,'paraque')
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(function(err,res) {
                            if (err) {
                                throw err;
                            }
                            res.body.should.not.have.property('length');
                            res.body.ubicacion.should.containDeep([3,1]);
                            res.body._id.should.equal('540fdd594937351d392e4d6b');
                            done();
                        })
                })
        })

        it('Deberia Agregar una persona extra', function(done) {
            request
                .post('/usuario/agregar_persona_extra/540fdd594937351d392e4d6b')
                .auth('pruebas@example.com' ,'paraque')
                .send({nombre: 'Juanita Perez', tipo_sangre : 'A', sexo: 'f'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    done()
                    request
                        .get('/usuario/540fdd594937351d392e4d6b')
                        .auth('pruebas@example.com' ,'paraque')
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end(function(err,res) {
                            if (err) {
                                throw err;
                            }
                            res.body.should.not.have.property('length');
                            res.body.ubicacion.should.containDeep([3,1]);
                            res.body._id.should.equal('540fdd594937351d392e4d6b');
                            done();
                        })
                })
        })

    })
})
