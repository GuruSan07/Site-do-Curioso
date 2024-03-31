const medalhasPorPais = {
    Brasil: 108,
    Eua: 2827,
    Alemanha: 1019,
    China: 608,
    Croacia: 34
}

const selectPais = document.getElementById('perguntaPais')
const labelMedalhas = document.getElementById('labelMedalhas')

selectPais.addEventListener('change', function() {
    const paisSelecionado = this.value;
    const quantidadeMedalhas = medalhasPorPais[paisSelecionado]
    labelMedalhas.innerText = `O país tem ${quantidadeMedalhas} medalhas no total.`
})

const fs = require('fs');
const csv = require('csv-parser');

// Função para ler o arquivo CSV
const lerCSV = (caminhoArquivo, callback) => {
    const stream = fs.createReadStream(caminhoArquivo);
    stream.on('error', (error) => {
        callback(error, null);
    });

    const csvStream = csv();
    csvStream.on('error', (error) => {
        callback(error, null);
    });

    stream.pipe(csvStream)
        .on('data', (linha) => {
            callback(null, linha);
        })
        .on('end', () => {
            callback(null, null); // Indica o fim do arquivo
        });
};

// Função para processar as linhas do CSV
const processarLinhas = (linha) => {
    if (linha.Sport === 'Judo') {
        console.log('Linha processada:', linha);
    }
};

// Exemplo de uso das funções
  lerCSV('athlete_events.csv', (error, linha) => {
    if (error) {
        console.error('Erro ao ler o arquivo CSV:', error);
    } else if (linha !== null) {
        processarLinhas(linha);
    } else {
        console.log('Fim do arquivo CSV.');
    }
});