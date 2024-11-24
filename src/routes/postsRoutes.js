import express from "express"; // Importa o framework Express.js para criar servidores Node.js
import cors from "cors";
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
// Importa funções controladoras para posts vindas de um arquivo externo
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,

}
const storage = multer.diskStorage({ // Configura o armazenamento de arquivos
    destination: function (req, file, cb) {
    // Define o diretório de destino para arquivos
        cb(null, 'uploads/'); // O diretório será 'uploads/' dentro da pasta do projeto
    },
        filename: function (req, file, cb) { // Define o nome do arquivo salvo
        cb(null, file.originalname); // O nome do arquivo será o nome original enviado
    }
});

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do Multer com a configuração de armazenamento

const routes = (app) => { // Função para definir as rotas da API

    app.use(express.json()); // Habilita o parseamento de dados JSON na requisição
    app.use(cors(corsOptions));
    // Define rotas para acessar funcionalidades relacionadas a posts
    app.get("/posts", listarPosts); // Rota GET para listar posts (implementada em postsController.js)
    app.post("/posts", postarNovoPost); // Rota POST para criar um novo post (implementada em postsController.js)

    // Rota POST para upload de imagem utilizando o middleware Multer
    app.post("/upload", upload.single("imagem"), uploadImagem); // (implementada em postsController.js)
    // upload.single("imagem") configura o Multer para aceitar apenas um arquivo com o campo "imagem"

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes; // Exporta a função routes para ser utilizada em outros arquivos