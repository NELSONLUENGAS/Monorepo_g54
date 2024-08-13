require('dotenv').config()
const { Pool } = require('pg')
const bcrypt = require('bcrypt')

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env


const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    allowExitOnIdle: true
})

const initDatabase = () => {
    return `
    CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS eventos (
    id SERIAL,
    titulo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(50) NOT NULL
);
    `
}

const getEventos = async () => {
    const { rows: eventos } = await pool.query("SELECT * FROM eventos")
    return eventos
}

const deleteEvento = async (id) => {
    const consulta = "DELETE FROM eventos WHERE id = $1"
    const values = [id]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "No se encontró ningún evento con este ID" }
}

const createUser = async (email, password) => {
    const consulta = `INSERT INTO usuarios
    values(
        DEFAULT,
        $1,
        $2
    ) RETURNING *`

    const passwordHash = await bcrypt.hash(password, 20)
    console.log(passwordHash)
    const values = [email, passwordHash];
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 400, message: "Bad request" }
}

const verificarCredencialesHash = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const { rowCount, rows: [usuario] } = await pool.query(consulta, values)
    const passVerified = await bcrypt.compare(password, usuario.password)
    if (!rowCount) throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" }
    if (!passVerified) throw { code: 401, message: "Credenciales erroneas" }
}

const getEvento = async (id) => {
    const { rows: evento } = await pool.query("SELECT * FROM eventos where id = $1", [id])
    return evento
}

const crearEvento = async ({ id, titulo, descripcion, fecha, lugar }) => {
    await pool.query("INSERT INTO eventos VALUES($1, $2, $3, $4, $5)", [id, titulo, descripcion, fecha, lugar])

    return await getEventos()
}

const verifyIfExist = async (id) => {
    const { rows: [evento] } = await pool.query("SELECT * FROM eventos where id = $1", [id])

    return Boolean(evento)
}

module.exports = {
    getEventos,
    deleteEvento,
    createUser,
    verificarCredencialesHash,
    getEvento,
    crearEvento,
    verifyIfExist,
    initDatabase,
    pool
}
