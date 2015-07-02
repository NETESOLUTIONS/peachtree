var router = require('express').Router();
var four0four = require('./utils/404')();
var pg = require('pg');

router.get('/states', getStates);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

pg.defaults.ssl = true;

function getStates(req, res, next) {
    function reportError(err) {
        console.error(err);
        res.send('Error in database operation:<br/><pre>' + err + '</pre>');
    }

    try {
        if (process.env.DATABASE_URL === undefined) {
            reportError('Please define DATABASE_URL environment variable');
        } else {
            console.log('Connecting to ' + process.env.DATABASE_URL + '...');
            pg.connect(process.env.DATABASE_URL, function (err, client, done) {
                if (err) {
                    reportError(err);
                } else {
                    console.log('Connected.');
                    client.query('SELECT * FROM state_fips_codes', function (err, result) {
                        done();
                        if (err) {
                            reportError(err);
                        } else {
                            res.status(200).send(result.rows);
                        }
                    });
                }
            });
        }
    } catch (err) {
        reportError(err);
    }
}
