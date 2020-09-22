const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

// Endpoints de envio de mensagens
// CRUD -> Create, Read (Read All e Read Single), Update and Delete
// CRUD -> Criar, Ler (Ler tudo e ler individualmente), atualizar e remover

const mensagens = [
    {
        id: 0,
        texto: "Essa é uma mensagem"
    },
    {
        id: 1,
        texto: "Essa é outra mensagem"
    },
];

// Read All
app.get('/mensagens', (req, res) => {
    res.json(mensagens.filter(Boolean));
});

// Create
app.post('/mensagens', (req, res) => {
    // Obtendo a mensagem que foi recebida através do body da requisição
    const mensagem = req.body;

    // Obtendo o ID da nova mensagem
    const id = mensagens.length;

    // Atualiza o objeto de mensagem enviado pela requisição com o ID que foi calculado
    mensagem.id = id;

    // Insiro a mensagem na lista de mensagens
    mensagens.push(mensagem);

    // Envio a mensagem de sucesso, informando o ID obtido
    res.send(`A mensagem com o texto '${mensagem.texto}' foi criada com sucesso. ID: ${id}.`);
});

// Read Single
app.get('/mensagens/:id', (req, res) => {
    // Pega o ID através dos parâmetros da requisição
    const id = req.params.id;

    // Acessamos a mensagem de acordo com o ID informado
    const mensagem = mensagens[id];

    res.json(mensagem);
    
    /*
    // Referência, passando também o ID em um objeto de mensagem
    res.json({ id, mensagem });
    */
});

// Update
app.put('/mensagens/:id', (req, res) => {
    // Acessa o ID pelos parâmetros
    const id = req.params.id;

    // Obtém a mensagem que foi enviada pelo usuário no corpo (body) da requisição
    const novoTexto = req.body.texto;

    // Atualiza a mensagem direto na lista de mensagens, acessando pelo ID que foi informado
    mensagens[id].texto = novoTexto;

    // Envia uma mensagem de sucesso.
    res.send(`Mensagem com o ID ${id} foi atualizada com sucesso.`);
});

// Delete
app.delete('/mensagens/:id', (req, res) => {
    const id = req.params.id;

    delete mensagens[id];

    res.send(`Mensagem com o ID ${id} foi removida com sucesso.`);
});

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`);
});
