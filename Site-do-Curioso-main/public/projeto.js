// Função para contar o total de medalhas únicas por país
const contarMedalhasPorPais = (linhas, pais) => {
    // Cria um novo conjunto para armazenar as combinações únicas de ano, esporte, evento e tipo de medalha
    let medalhasUnicas = new Set();

    // Itera sobre cada linha dos dados
    linhas.forEach(linha => {
        // Verifica se o código do país na linha corresponde ao país especificado
        // e se o tipo de medalha é diferente de 'NA' (não medalha)
        if (linha.NOC === pais && linha.Medal !== 'NA') {
            // Adiciona uma combinação única de ano, esporte, evento e tipo de medalha ao conjunto
            medalhasUnicas.add(`${linha.Year}-${linha.Sport}-${linha.Event}-${linha.Medal}`);
        }
    });

    // Retorna o número de elementos no conjunto, que representa o total de medalhas únicas
    return medalhasUnicas.size;
};

// Função para buscar o arquivo CSV e retornar seu conteúdo como texto
const pegarCSV = () => {
    const url = '../src/athlete_events.csv';
    // Retorna a promessa da chamada fetch para buscar o arquivo CSV
    return fetch(url)
        .then(response => response.text());
};

// Função para atualizar o total de medalhas com base no país selecionado no <select>
const atualizarTotalMedalhas = (linhas, paisSelecionado) => {
    // Calcula o total de medalhas únicas para o país selecionado
    const totalMedalhas = contarMedalhasPorPais(linhas, paisSelecionado);
    // Obtém o elemento <label> onde o total de medalhas será exibido
    const labelMedalhas = document.getElementById('labelMedalhas');
    // Atualiza o texto do <label> com o total de medalhas para o país selecionado
    labelMedalhas.textContent = `O total de medalhas para ${paisSelecionado} é: ${totalMedalhas}`;
};

// Adiciona um evento 'change' ao <select> para chamar a função atualizarTotalMedalhas quando o país selecionado mudar
document.getElementById('perguntaPais').addEventListener('change', () => {
    // Quando o país selecionado mudar, busca o arquivo CSV, processa os dados e atualiza o total de medalhas
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        atualizarTotalMedalhas(linhas, paisSelecionado);
    }).catch(error => console.error('Erro:', error));
});

// Quando a página carregar, busca o arquivo CSV, processa os dados e atualiza o total de medalhas para o país selecionado
window.onload = () => {
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        atualizarTotalMedalhas(linhas, paisSelecionado);
    }).catch(error => console.error('Erro:', error));
};
