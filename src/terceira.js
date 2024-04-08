// Função da quarta pergunta!!
// Função para contar o total de medalhas únicas por país
const contarMedalhasPorPais = (linhas, pais) => {
    let medalhasUnicas = new Set();

    linhas.forEach(linha => {
        if (linha.NOC === pais && linha.Medal !== 'NA') {
            medalhasUnicas.add(`${linha.Year}-${linha.Sport}-${linha.Event}-${linha.Medal}`);
        }
    });

    return medalhasUnicas.size;
};

// Função para contar o total de medalhas de ouro por país
const contarMedalhasDeOuroPorPais = (linhas, pais) => {
    let ouroUnico = new Set();

    linhas.forEach(linha => {
        if (linha.NOC === pais && linha.Medal === 'Gold') {
            ouroUnico.add(`${linha.Year}-${linha.Sport}-${linha.Event}-${linha.Medal}`);
        }
    });

    return ouroUnico.size;
};

// Função para buscar o arquivo CSV e retornar seu conteúdo como texto
const pegarCSV = () => {
    const url = '../src/athlete_events.csv';
    return fetch(url)
        .then(response => response.text());
};

// Função para atualizar o total de medalhas com base no país selecionado no <select>
const atualizarTotalMedalhas = (linhas, paisSelecionado) => {
    if (paisSelecionado !== '') {
        const totalMedalhasOuro = contarMedalhasDeOuroPorPais(linhas, paisSelecionado);
        const labelMedalhas = document.getElementById('labelMedalhas');
        if(totalMedalhasOuro > 100){
            labelMedalhas.textContent = `O total de medalhas para ${paisSelecionado} tem mais de 100 medalhas de ouro`;
        }
        else{
            labelMedalhas.textContent = `${paisSelecionado} não tem mais de 100 medalhas de ouro`;
        }
    } else {
        const labelMedalhas = document.getElementById('labelMedalhas');
        labelMedalhas.textContent = 'Por favor, selecione um país.';
    }
};

document.getElementById('perguntaPais').addEventListener('change', () => {
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        atualizarTotalMedalhas(linhas, paisSelecionado);
    }).catch(error => console.error('Erro:', error));
});

window.onload = () => {
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        atualizarTotalMedalhas(linhas, paisSelecionado);
    }).catch(error => console.error('Erro:', error));
};
