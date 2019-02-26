const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
}

const db = knex(knexConfig);

// POST REQUEST
router.post('/', (req, res) => {
    db('zoos')
        .insert(req.body)
        .then(ids => {
            const [id] = ids;

            db('zoos')
                .where({ id })
                .then(zoo => {
                    res.status(200).json(zoo)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        })
})

// GET REQUEST
router.get('/', (req, res) => {
    db('zoos')
        .then(zoos => {
            console.log(zoos)
            res.status(200).json(zoos)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db('zoos')
        .where({ id: id })
        .then(zoo => {
            res.status(200).json(zoo)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// DELETE REQUEST
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('zoos')
        .where({ id })
        .del()
        .then(zoo => {
            if (zoo > 0) {
                res.status(204).json({
                    message: 'The zoo was deleted.'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// UPDATE REQUEST
router.put('/:id', (req, res) => {
    const id = req.params.id;

    db('zoos')
        .where({ id: id })
        .update(req.body)
        .then(zoo => {
            if (zoo > 0) {
                db('zoos')
                    .where({ id: id })
                    .then(zoo => {
                        res.status(200).json(zoo)
                    })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;