const express = require("express");
const app = express();
const cors = require("cors");
const { getPost, createPost } = require("./post")
app.use(express.static("public"));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  try {
    return res.sendFile(__dirname + "/public/index.html");
  } catch (e) {
    console.log("error");
  }
});

app.get("/posts", async (req, res) => {
    const posts = await getPost()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    const payload = req.body;
    console.log(payload);

    if (!payload.titulo || !payload.url || !payload.descripcion) {
      console.log("los campos están vacios ");
      return res.send({ error: "los campos están vacios" });
      

    }
    const post = await createPost(payload);
    res.json(post);
  });
  app.listen(3000, console.log("SERVIDOR ENCENDIDO"));
