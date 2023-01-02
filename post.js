equire("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  user: "postgres",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

const getPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const createPost = async (payload) => {
  const consulta =
    "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)RETURNING * ";
  const values = [payload.titulo, payload.url, payload.descripcion];
  const result = await pool.query(consulta, values);
};

module.exports = { getPost, createPost };