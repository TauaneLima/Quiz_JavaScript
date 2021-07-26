//Initial Dados
let currentQuestion = 0;
let correctAnswer = 0;
showQuestion();


//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)


//Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        let optionsHTML = '';
        for(let i in q.options) {
            optionsHTML += `<div data-op="${i}" class ="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
         finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswer++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Poxa, precisa estudar mais :('
        document.querySelector('.scorePct').style.color= '#FF0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Está na média :D'
        document.querySelector('.scorePct').style.color= '#ffff00';
    } else if(points > 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns, Arrasou!!!!!!!'
        document.querySelector('.scorePct').style.color= '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Voce respondeu ${questions.length} questões e acertou ${correctAnswer}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
}


//primeiro pegamos a questão. linha 11;
//mexemos com a porcentagem da barra de progresso, linhas 13 e 14;
//Escolhe quem vai aparecer ou não. linha 16 e 17;
//Exibe a pergunta. linha 19;
//Monta as questões exibe as alternativas. linhas 20 a 24;
//Poe o evento de click nas perguntas. linhas 26 a 28;