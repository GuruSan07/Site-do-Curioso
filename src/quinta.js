// Função da quinta pergunta
// Função para contar o total de participações em Olimpíadas de Verão por país
const contarParticipacoesVeraoPorPais = (linhas, pais) => {
    // Cria um novo conjunto para armazenar as combinações únicas de ano e temporada de verão
    let participacoesVeraoUnicas = new Set();

    // Itera sobre cada linha dos dados
    linhas.forEach(linha => {
        // Verifica se o código do país na linha corresponde ao país especificado
        // e se a temporada é de verão
        if (linha.NOC === pais && linha.Season === 'Summer') {
            // Adiciona uma combinação única de ano e temporada de verão ao conjunto
            participacoesVeraoUnicas.add(`${linha.Year}-${linha.Season}`);
        }
    });

    // Retorna o número de elementos no conjunto, que representa o total de participações em Olimpíadas de Verão
    return participacoesVeraoUnicas.size;
};

const pegarCSV = () => {
    const url = '../src/athlete_events.csv';
    // Retorna a promessa da chamada fetch para buscar o arquivo CSV
    return fetch(url)
        .then(response => response.text());
};

// Função para atualizar o total de participações em Olimpíadas de Verão com base no país selecionado no <select>
const atualizarTotalParticipacoesVerao = (linhas, paisSelecionado) => {
    // Calcula o total de participações em Olimpíadas de Verão para o país selecionado
    const totalParticipacoesVerao = contarParticipacoesVeraoPorPais(linhas, paisSelecionado);
    // Obtém o elemento <label> onde o total de participações será exibido
    const labelParticipacoesVerao = document.getElementById('labelMedalhas');
    // Atualiza o texto do <label> com o total de participações em Olimpíadas de Verão para o país selecionado
    labelParticipacoesVerao.textContent = `O total de participações em Olimpíadas de Verão para ${paisSelecionado} é: ${totalParticipacoesVerao}`;
};

// Adiciona um evento 'change' ao <select> para chamar a função atualizarTotalParticipacoesVerao quando o país selecionado mudar
document.getElementById('perguntaPais').addEventListener('change', () => {
    // Quando o país selecionado mudar, busca o arquivo CSV, processa os dados e atualiza o total de participações em Olimpíadas de Verão
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        atualizarTotalParticipacoesVerao(linhas, paisSelecionado);
    }).catch(error => console.error('Erro:', error));
});

// Quando a página carregar, busca o arquivo CSV, processa os dados e atualiza o total de participações em Olimpíadas de Verão para o país selecionado
window.onload = () => {
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        atualizarTotalParticipacoesVerao(linhas, paisSelecionado);
    }).catch(error => console.error('Erro:', error));
};