const contarMedalhasPorPais = (linhas, pais) => {
    let medalhasUnicas = new Set();

    linhas.forEach(linha => {
        if (linha.NOC === pais && linha.Medal !== 'NA') {
            medalhasUnicas.add(`${linha.Year}-${linha.Sport}-${linha.Event}-${linha.Medal}`);
        }
    });

    return medalhasUnicas.size;
};

const pegarCSV = () => {
    const url = '../src/athlete_events.csv';
    return fetch(url)
        .then(response => response.text());
};

const atualizarTotalMedalhas = (linhas, paisSelecionado) => {
    const totalMedalhas = contarMedalhasPorPais(linhas, paisSelecionado);
    const labelMedalhas = document.getElementById('labelMedalhas');
    labelMedalhas.textContent = `O total de medalhas para ${paisSelecionado} é: ${totalMedalhas}`;
};

document.getElementById('perguntaPais').addEventListener('change', () => {
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        atualizarTotalMedalhas(linhas, paisSelecionado);
    }).catch(error => console.error('Erro:', error));
});

// Quando a página carregar, atualiza o total de medalhas para o país selecionado
window.onload = () => {
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        atualizarTotalMedalhas(linhas, paisSelecionado);
    }).catch(error => console.error('Erro:', error));
};