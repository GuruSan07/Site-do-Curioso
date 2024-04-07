

const pegarCSV = () => {
    // Certifique-se de que o caminho para o arquivo CSV é correto
    const url = '../src/athlete_events.csv';

    fetch(url)
        .then(response => response.text())
        .then(resultado => {
        // Papa.parse() analisa o CSV em um array de objetos JavaScript
        const resultados = Papa.parse(resultado, {header: true}).data;

        // Filtra para linhas onde a coluna 'Nome' é 'Exemplo'
        const filtrado = resultados.filter(linha => linha.Nome === 'Exemplo');

        console.log(resultados)
        console.log(filtrado);
        })
        .catch(error => console.error('Erro:', error));
};

pegarCSV();