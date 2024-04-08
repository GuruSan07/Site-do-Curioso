// Função da terceira pergunta!!
// Função para contar o total de participações por país nas Olimpíadas de Inverno
const contarParticipacoesPorPais = (linhas, pais) => {
    let participacoesUnicas = new Set();

    linhas.forEach(linha => {
        if (linha.NOC === pais && linha.Season === 'Winter') {
            participacoesUnicas.add(`${linha.Year}-${linha.Sport}-${linha.Event}`);
        }
    });

    return participacoesUnicas.size;
};

const pegarCSV = () => {
    const url = '../src/athlete_events.csv';
    return fetch(url)
        .then(response => response.text());
};

const atualizarTotalParticipacoes = (linhas, paisSelecionado) => {
    const totalParticipacoes = contarParticipacoesPorPais(linhas, paisSelecionado);
    const labelMedalhas = document.getElementById('labelMedalhas');
    labelMedalhas.textContent = `O total de participações nas Olimpíadas de Inverno para ${paisSelecionado} é: ${totalParticipacoes}`;
};

document.getElementById('perguntaPais').addEventListener('change', () => {
    const paisSelecionado = document.getElementById('perguntaPais').value;
    if (paisSelecionado) {
        pegarCSV().then(resultado => {
            const linhas = Papa.parse(resultado, { header: true }).data;
            atualizarTotalParticipacoes(linhas, paisSelecionado);
        }).catch(error => console.error('Erro:', error));
    }
});

window.onload = () => {
    pegarCSV().then(resultado => {
        const linhas = Papa.parse(resultado, { header: true }).data;
        const selectPais = document.getElementById('perguntaPais');
        const paisSelecionado = selectPais.value;
        if (paisSelecionado) {
            atualizarTotalParticipacoes(linhas, paisSelecionado);
        }
    }).catch(error => console.error('Erro:', error));
};
