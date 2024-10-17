import express from "express";
import type { Request, Response } from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import { writePdf } from "./pdf";

interface IndexParams {
  first: string
  last: string
}

const app = express();

app.set('view engine', 'pug');

app.use(express.static('/public', {}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request<{}, {}, {}, IndexParams>, res) => {
  const { query } = req;
  res.render('index', { first: query.first, last: query.last });
});

app.post("/submit", (req, res) => {
  const form = req.body;

  // console.log(form);

  // TODO: type checking and form validation

  // TODO: generate PDF

  res.writeHead(200, { "Content-Type": "application/pdf" })
  writePdf(res, form)
  res.end();
  // res.redirect('/');
})

// app.post("/download", (req, res)=>{
//   res.writeHead()
// })

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
