var Disciplina = require('../../models/Disciplina');

function criarObjetoDisciplina() {
    return {
    	disciplina: 'Desenvolvimento WEB II',
        sigla: 'DW2'
    };
}

function verificarDisciplinaValida(res) {
		expect(res.body)
        .to.be.an('object')
        .and.to.contain.all.keys(['id','disciplina', 'sigla', 'createdAt', 'updatedAt']);
		
		
}	

describe('API Disciplinas', function () {
    var dadosDisciplina;

    beforeEach(function (done) {
        Disciplina.truncar()
            .finally(done);
    });

    describe('Métodos CRUD', function() {
        it('Nova Disciplina', function(done) {
            request(express)
                .post('/api/disciplinas')
                .send(criarObjetoDisciplina())
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(verificarDisciplinaValida)
                .end(done);
        });

        it('Exibir Disciplina', function(done) {
            Disciplina.novaInstancia(criarObjetoDisciplina())
                .then(function(disciplina) {
                    request(express)
                        .get('/api/disciplinas/' + disciplina.get('id'))
                        .set('Accept', 'application/json')
                       .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(verificarDisciplinaValida)
                        .end(done)
                })
                .catch(done);
        });

        it('Editar Disciplina', function(done) {
            Disciplina.novaInstancia(criarObjetoDisciplina())
                .then(function(disciplina) {
                   request(express)
                        .put('/api/disciplinas/' + disciplina.get('id'))
                       .send({sigla: 'DW-2'})
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                       .expect(verificarDisciplinaValida)
                        .expect(function(res) {
                         expect(res.body.sigla)
                                .to.be.equal('DW-2');
                        })
                       .end(done)
                })
               .catch(done);
        });

       it('Excluir Disciplina', function(done) {
            Disciplina.novaInstancia(criarObjetoDisciplina())
                .then(function(disciplina) {
                    request(express)
                        .delete('/api/disciplinas/' + disciplina.get('id'))
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                       .expect(200)
                        .expect(function(res) {
                            expect(res.body)
                                .to.be.true;
                        })
                       .end(done)
                })
                .catch(done);
       });

        it('Listar Disciplinas', function(done) {
        	Disciplina.novaInstancia(criarObjetoDisciplina())
               .then(function(disciplina) {
                    request(express)
                        .get('/api/disciplinas')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(function(res) {
                            expect(res.body)
                                .to.be.an('array')
                                .and.have.length(1);
                        })
                        .end(done)
                })
                .catch(done);
        });
    });

}); 