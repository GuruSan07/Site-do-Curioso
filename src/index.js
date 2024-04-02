const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 8080;

// Função para ler o arquivo CSV
const lerCSV = (caminhoArquivo) => {
    return new Promise((resolve, reject) => {
        const resultados = [];
        fs.createReadStream(caminhoArquivo)
            .pipe(csv())
            .on('data', (data) => resultados.push(data))
            .on('end', () => {
                resolve(resultados);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

app.get('/', async (req, res) => {
    try {
        const dados = await lerCSV('../athlete_events.csv');
        res.json(dados);
    } catch (error) {
        res.status(500).send('Erro ao ler o arquivo CSV: ' + error.toString());
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});











