const express = require('express')
const db = require('./db')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Connected to MySQL!');
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM students', (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        res.json(result)
    })
})

app.post('/student', (req, res) => {
    const { first_name, last_name, email, age } = req.body
    db.query('INSERT INTO students (first_name,last_name,email,age) VALUES(?,?,?,?)', [first_name, last_name, email, age], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        } else if (result.affectedRows == 0) {
            return res.status(400).json({ error: 'wrong values' })
        }
        res.json(result)
    })
})

app.put('/student', (req, res) => {
    const { id, first_name, last_name, email, age } = req.body
    db.query('UPDATE students SET first_name=?,last_name=?,email=?,age=? WHERE id=? ', [first_name, last_name, email, age, id], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        } else if (result.affectedRows == 0) {
            return res.status(400).json({ error: 'id is out of bounds' })
        }
        res.json(result)
    })
})

app.delete('/student', (req, res) => {
    const { id } = req.body
    db.query('DELETE FROM students WHERE id=?', [id], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        } else if (result.affectedRows == 0) {
            return res.status(400).json({ error: 'id is out of bounds' })
        }
        res.json(result)
    })
})
// this is used to search by name
app.get('/student', (req, res) => {
    const first_name = req.query.first_name;
    db.query("SELECT * FROM students WHERE first_name LIKE ? ", [`${first_name}%`], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        } else if (result.length == 0) {
            return res.status(404).json({ error: 'student not found' })
        }

        res.json(result)
    })
})
// if you wanna search by id 
/*
app.get('/student/:id')
then >>> const id=req.params.id

*/

// Search by id
app.get('/student/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM students WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        } else if (result.length == 0) {
            return res.status(400).json({ error: 'invalid ID' })
        }
        return res.json(result)
    })
})

app.get('/student/sort/age', (req, res) => {
    db.query('SELECT * FROM students ORDER BY age ASC', (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        } else if (result.length == 0) {
            return res.status(400).json({ error: 'this is for ordering by age' })
        }
        return res.json(result)
    })
})
app.get('/student/sort/first_name', (req, res) => {
    db.query('SELECT * FROM students ORDER BY first_name ASC', (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        } else if (result.length == 0) {
            return res.status(400).json({ error: 'this is for ordering by first_name' })
        }
        return res.json(result)
    })
})







app.listen(5000, () => {
    console.log('server is running on port 5000')
})