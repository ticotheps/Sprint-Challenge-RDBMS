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

router.get("/:id/actions", (req, res) => {
    const projectId = req.params.id;

    // retrieves a particular project (specified by the project's id)
    // that also includes a list of all the associated actions with that project
    db("actions")
        .innerJoin("projects", "projects.id", "actions.id")
        .select({
            id: "actions.id",
            description: "actions.description",
            notes: "actions.notes",
            completed: "actions.completed",
        })
        .where({ "projects.id": projectId })
        .then(actionsOnProject => {
            res.status(200).json(actionsOnProject);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    // inserts a new project into the 'projects' table
    db('projects')
        .insert(req.body)
        .then(ids => {
            const id = ids[0];

            db('projects')
                .where({ id })
                .first()
                .then(project => {
                    res.status(201).json(project);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;