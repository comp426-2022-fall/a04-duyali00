import minimist from "minimist"
import express from "express"
import { roll } from './lib/roll.js'

const app = express()
const args = minimist(process.argv.slice(2))

app.use(express.urlencoded({ extended: true }))     // parse urlencoded data body

app.get('/app/', (req, res) => {                    // 3. Check endpoint at '/app/' that returns 200 OK.
    res.send('200 OK');
})

app.get('/app/roll/', (req, res) => {               // 4. Endpoint '/app/roll/' that returns JSON for a default roll of two six-sided dice one time
	res.send(roll(6,2,1))                           
});

app.get('/app/roll', (req, res) => {                // 5. Endpoint '/app/roll/' should ALSO accept either JSON or URLEncoded data body for sides, dice, and rolls.
    const sides = parseInt(req.body.sides)          // urlencoded
    const dice = parseInt(req.body.dice)
    const rolls = parseInt(req.body.rolls)

    res.send(roll(sides, dice, rolls))
})

app.get('/app/roll/:sides/', (req, res) => {        // 6. Endpoint '/app/roll/:sides/' that returns JSON for a default number of rolls and dice with whatever number of sides is specified in the parameter.
    const sides = parseInt(req.params.sides)
    res.send(roll(sides, 2, 1))
})

app.get('/app/roll/:sides/:dice', (req, res) => {   // 7. Endpoint '/app/roll/:sides/:dice/' that returns JSON for a default number of rolls with whatever number of sides and dice specified in the parameters.
    const sides = parseInt(req.params.sides)
    const dice = parseInt(req.params.dice)
    res.send(roll(sides, dice, 1))
})

app.get('/app/roll/:sides/:dice/:rolls', (req, res) => {        // 8. Endpoint '/app/roll/:sides/:dice/:rolls/' that returns JSON for the specified number of rolls with whatever number of sides and dice specified in the parameters.
    const sides = parseInt(req.params.sides)
    const dice = parseInt(req.params.dice)
    const rolls = parseInt(req.params.rolls)
    res.send(roll(sides, dice, rolls))
})

app.use((req, res) => {                       // 2. Default API return "404 NOT FOUND"
    res.status(404).send("404 NOT FOUND")
})

app.listen(args.port || 5000)                 // 1. Port number (5000 as default)