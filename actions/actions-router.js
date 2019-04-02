const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/trackerApp.db3',
    },
    debug: true
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
    // retrieves all action records from the 'actions' table
    db('actions')
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    const actionId = req.params.id;

    // retrieves a particular action record (specified by the action's id)
    db('actions')
        .where({ id: actionId })
        .first()
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    // inserts a new action into the 'actions' table
    db('actions')
        .insert(req.body)
        .then(ids => {
            const id = ids[0];

            db('actions')
                .where({ id })
                .first()
                .then(action => {
                    res.status(201).json(action);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;