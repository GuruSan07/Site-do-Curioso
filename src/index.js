//função da segunda pergunta!!
document.addEventListener('DOMContentLoaded', function() {  
document.getElementById('perguntaPais').addEventListener('change', function() {
    var labelMedalhas = document.getElementById('labelMedalhas');
    if (this.value === 'GER') {
        labelMedalhas.textContent = 'A Alemanha foi proibida de participar dos Jogos Olímpicos de 1920 e 1948 devido à sua participação nas duas Guerras Mundiais.';
    } else if (this.value === 'CHN') {
        labelMedalhas.textContent = 'A África do Sul foi banida dos Jogos Olímpicos de 1964 a 1988 devido ao regime de apartheid.';
    } else if (this.value === 'CRO') {
        labelMedalhas.textContent = 'A Iugoslávia foi suspensa dos Jogos Olímpicos de Verão de 1992 devido à Guerra Civil Iugoslava.';
    } else if (this.value === 'AFG') {
        labelMedalhas.textContent = 'O Afeganistão foi banido dos Jogos Olímpicos de 2000 e 2004 devido ao tratamento dado pelo Talibã às mulheres, incluindo a proibição de sua participação em esportes.';
    } else {
        labelMedalhas.textContent = '';
    }
});
});