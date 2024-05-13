const exp = require("express");
const mongoose = require("mongoose");
const app = exp();
app.use(exp.json());

const Article = require("./models/Articles");

//mongodb+srv://<username>:<password>@cluster0.c037mmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose
  .connect(
    "mongodb+srv://root:root1993@cluster0.c037mmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello/:name", (req, res) => {
  res.send("Hello " + req.params.name);
});

app.get("/hello/:name/:age", (req, res) => {
  res.send(
    "Hello " + req.params.name + " you are " + req.params.age + " years old"
  );
});

app.get("/hellojson", (req, res) => {
  const myName = req.body;
  console.log(myName);
  res.send("Hello " + myName.name);
});

app.post("/articles", async (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    comments: 0,
  });

  await newArticle.save();
  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles/:id", async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  res.json(article);
});

app.delete("/articles/:id", async (req, res) => {
  const id = req.params.id;
  const article = await Article.findByIdAndDelete(id);
  if (!article) return res.status(404).send("Article not found");
  res.json(article);
});

app.listen(3000, () => console.log("App listening on port 3000!"));
