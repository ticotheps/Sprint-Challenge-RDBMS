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
    // retrieves all project records from the 'projects' table
    db('projects')
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    const projectId = req.params.id;

    // retrieves a particular project record (specified by the project's id)
    db('projects')
        .where({ id: projectId })
        .first()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;