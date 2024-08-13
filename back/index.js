require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const {
    getEventos,
    deleteEvento,
    createUser,
    verificarCredencialesHash,
    getEvento,
    crearEvento,
    verifyIfExist,
    pool,
    initDatabase
} = require('./consultas')
const { validateLogin, validateRegsiter } = require('./middleware')

app.listen(3000, async () => {
    console.log("SERVER ON")
    await pool.query(initDatabase())
})

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(express.json())



app.get("/eventos", async (req, res) => {
    try {
        const eventos = await getEventos()
        res.status(200).json(eventos)
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})

app.get("/eventos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const evento = await getEvento(id)
        res.status(200).json(evento)
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})

app.post("/login", validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body
        await verificarCredencialesHash(email, password)

        const token = jwt.sign({ email }, String(process.env.TOKEN_SECRET), { expiresIn: '1 day' })

        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})


app.delete("/eventos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const Authorization = req.header("Authorization")

        const token = Authorization?.split("Bearer ")[1]

        if (!token) {
            let tokenError = new Error('Token requerido')
            tokenError.code = 400
            tokenError.msg = tokenError.message

            throw tokenError;
        }

        jwt.verify(token, String(process.env.TOKEN_SECRET))

        const { email } = jwt.decode(token)

        await deleteEvento(id)
        res.send(`El usuario ${email} ha eliminado el evento de id ${id}`)

    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})

app.put("/eventos/:id", async (req, res) => {
    try {
        const { id } = req.params

        const exist = await verifyIfExist(id)
        if (!exist) {
            res.status(404).json('Not Found')
        } else {

            const Authorization = req.header("Authorization")

            const token = Authorization.split("Bearer ")[1]

            jwt.verify(token, "Token_secret")

            const { email } = jwt.decode(token)

            // await deleteEvento(id)
            res.send(`El usuario ${email} ha actualizado el evento de id ${id}`)
        }

    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})

app.post('/register', validateRegsiter, async (req, res) => {
    try {
        const { email, password } = req.body
        await createUser(email, password)
        res.send('Usuario creado')
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})


app.post('/eventos', async (req, res) => {
    try {

        const evento = req.body
        res.json(await crearEvento(evento))

    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})

app.all('*', (_, res) => {
    res.status(404).json('Not Found')
})

module.exports = app