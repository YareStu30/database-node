require("dotenv").config();

const pool = require("./helpers/connect").getInstance();

const getPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};
const duplicatePost = async (payload) => {
  const SQLquery = {
    text: "SELECT COUNT(*) as NUM FROM posts WHERE titulo=$1 AND img=$2 AND descripcion=$3",
    values: [payload.titulo, payload.url, payload.descripcion],
  };
  const { rows } = await pool.query(SQLquery);
  return rows;
};
const addPost = async (payload) => {
  const resultDuplicate = await duplicatePost(payload);
  if (resultDuplicate[0].num > 0) {
    throw { error: " se duplican los campos" };
  }
  if (!payload.titulo || !payload.url || !payload.descripcion) {
    throw { error: "Faltan campos requeridos" };
  } else {
    const consulta =
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)RETURNING * ";
    const values = [payload.titulo, payload.url, payload.descripcion, 0];
    const result = await pool.query(consulta, values);
  }
};

const addLike = async (id) => {
  console.log(id);
  const result = await pool.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = $1",
    [id]
  );
  console.log(result);
  return result.rows;
};

const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
};

module.exports = { getPost, addPost, deletePost, addLike, duplicatePost };
