import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';
import './dbConfig.js'
import mainRouter from '../routers/index.routes.js';
import cookieParser from "cookie-parser";

export default class Server {
  constructor() {
    
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({
      origin: ["http://localhost:5173", "https://petshop-v2-apolo.netlify.app/"],
      credentials: true
    }));

    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
    
    const __dirname = dirname(fileURLToPath(import.meta.url));
    this.app.use(express.static(__dirname + "/../../public"));
  }

  routes() {
    this.app.use('/api', mainRouter);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(
        `El servidor se esta ejecutando en: http://localhost:${this.port}`
      )
    );
  }
}