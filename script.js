// Dados do Quiz
const quizData = [
    {
        question: "Um perfil do Instagram de um amigo publica uma tabela prometendo multiplicar R$ 100 para R$ 1.000 via Pix em 10 minutos. O que fazer?",
        options: [
            "Enviar logo os R$ 100 para não perder a oportunidade.",
            "Desconfiar imediatamente. Provavelmente o perfil foi invadido e é um golpe (Urubu do Pix).",
            "Mandar R$ 50 para testar se funciona primeiro."
        ],
        correct: 1,
        explanation: "Perfis hackeados são muito usados para divulgar a tabela do 'Urubu do Pix'. Ninguém multiplica dinheiro assim."
    },
    {
        question: "Você recebe uma mensagem no WhatsApp oferecendo R$ 300 por dia para curtir vídeos no YouTube. Para 'subir de nível', exigem um Pix de R$ 100. O que isso significa?",
        options: [
            "É o Golpe das Tarefas Remuneradas. Eles cobram para liberar pagamentos que nunca existirão.",
            "É um emprego legítimo de marketing digital.",
            "Uma taxa normal de inscrição exigida por grandes empresas."
        ],
        correct: 0,
        explanation: "Trabalhos legítimos NUNCA cobram taxas para você trabalhar ou receber seu salário."
    },
    {
        question: "Infelizmente você caiu em um golpe e fez um Pix para uma conta fraudulenta. Qual é a PRIMEIRA atitude a tomar?",
        options: [
            "Aceitar o prejuízo e não fazer nada.",
            "Contatar o suporte do seu banco imediatamente para acionar o MED (Mecanismo Especial de Devolução).",
            "Mandar mensagem brigando com o golpista no WhatsApp."
        ],
        correct: 1,
        explanation: "Acionar o MED no seu banco o mais rápido possível aumenta as chances de bloqueio do saldo na conta do golpista."
    },
    {
        question: "Qual destas medidas ajuda a evitar que seu WhatsApp ou redes sociais sejam hackeados para aplicar golpes?",
        options: [
            "Ativar a Verificação em Duas Etapas com senha/PIN.",
            "Compartilhar códigos de confirmação recebidos por SMS quando pedirem.",
            "Usar a mesma senha simples em todos os sites."
        ],
        correct: 0,
        explanation: "A autenticação em duas etapas cria uma camada extra de proteção essencial contra invasões."
    }
];

// Variáveis de Estado
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// Elementos do DOM
const screenStart = document.getElementById('quiz-screen-start');
const screenQuestion = document.getElementById('quiz-screen-question');
const screenResult = document.getElementById('quiz-screen-result');

const btnStart = document.getElementById('btn-start-quiz');
const btnRestart = document.getElementById('btn-restart-quiz');

const questionText = document.getElementById('quiz-question-text');
const optionsContainer = document.getElementById('quiz-options');
const progressText = document.getElementById('quiz-progress');
const progressFill = document.getElementById('progress-fill');

const resultIcon = document.getElementById('result-icon');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const resultScore = document.getElementById('result-score');

// Event Listeners
btnStart.addEventListener('click', startQuiz);
btnRestart.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    screenStart.classList.remove('active');
    screenResult.classList.remove('active');
    screenQuestion.classList.add('active');
    
    showQuestion();
}

function showQuestion() {
    const q = quizData[currentQuestionIndex];
    
    // Atualizar Progresso
    progressText.innerText = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    progressFill.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    
    // Atualizar Pergunta
    questionText.innerText = q.question;
    
    // Limpar Opções Anteriores
    optionsContainer.innerHTML = '';
    
    // Inserir Opções
    q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = optText;
        btn.addEventListener('click', () => selectOption(idx, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectOption(index, button) {
    const q = quizData[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    // Desabilitar todos os botões após a escolha
    buttons.forEach(b => b.disabled = true);
    
    if (index === q.correct) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
        // Destacar a correta
        buttons[q.correct].classList.add('correct');
    }
    
    // Aguardar 1.8 segundos e passar para a próxima
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1800);
}

function showResult() {
    screenQuestion.classList.remove('active');
    screenResult.classList.add('active');
    
    resultScore.innerText = `${score} / ${quizData.length}`;
    
    if (score === quizData.length) {
        resultIcon.innerText = "🛡️";
        resultTitle.innerText = "Excelente! Você está super protegido!";
        resultDescription.innerText = "Você domina o assunto e sabe identificar armadilhas virtuais com facilidade. Compartilhe esse conhecimento com familiares e amigos!";
    } else if (score >= 2) {
        resultIcon.innerText = "⚠️";
        resultTitle.innerText = "Atenção Moderada!";
        resultDescription.innerText = "Você conhece alguns riscos, mas ainda pode cair em armadilhas mais elaboradas. Fique atento aos detalhes mostrados em nosso guia.";
    } else {
        resultIcon.innerText = "🚨";
        resultTitle.innerText = "Cuidado! Alto Risco!";
        resultDescription.innerText = "Você está vulnerável a golpes financeiros comuns na internet. Leia atentamente o nosso guia acima para aprender a se proteger.";
    }
}