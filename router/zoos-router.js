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

// ZOOS CRUD METHODS
// POST REQUEST
router.post('/zoos', (req, res) => {
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
router.get('/zoos', (req, res) => {
    db('zoos')
        .then(zoos => {
            console.log(zoos)
            res.status(200).json(zoos)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/zoos/:id', (req, res) => {
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
router.delete('/zoos/:id', (req, res) => {
    const id = req.params.id;
    db('zoos')
        .where({ id })
        .del()
        .then(zoo => {
            if (zoo > 0) {
                res.status(204).json({
                    message: 'The zoo was deleted.'
                })
            } else {
                res.status(404).json({
                    message: 'The zoo was not found.'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// UPDATE REQUEST
router.put('/zoos/:id', (req, res) => {
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

// BEARS CRUD METHODS
// GET REQUEST
router.get('/bears', (req, res) => {
    db('bears')
        .then(bears => {
            res.status(200).json(bears)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/bears/:id', (req, res) => {
    const id = req.params.id;

    db('bears')
        .where({ id: id })
        .then(bear => {
            res.status(200).json(bear)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// CREATE REQUEST
router.post('/bears', (req, res) => {
    db('bears')
        .insert(req.body)
        .then(ids => {
            const [id] = ids;

            db('bears')
                .where({ id })
                .then(bear => {
                    res.status(200).json(bear)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        })
})

// DELETE REQUEST
router.delete('/bears/:id', (req, res) => {
    const id = req.params.id;
    db('bears')
        .where({ id })
        .delete()
        .then(bear => {
            if (bear > 0) {
                res.status(204).json({
                    message: 'The bear was deleted.'
                })
            } else {
                res.status(404).json({
                    message: 'The bear was not found.'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;