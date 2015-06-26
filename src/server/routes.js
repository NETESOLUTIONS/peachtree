var router = require('express').Router();
var four0four = require('./utils/404')();
var pg = require('pg');
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);
router.get('/data', getData);

module.exports = router;

//////////////


function getData(req, res, next) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err) {
                console.error(err);
                response.send('Error ' + err);
            } else {
                response.send(result.rows);
            }
    });
}

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}
