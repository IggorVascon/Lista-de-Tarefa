const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');
const apagaTarefas = document.querySelector('.btn-exclui')



//Criar a lista
function criaLi () {
    const li = document.createElement('li');
    return li;
}

//Capturar tecla pressionada e chamar função de criar a lista
inputTarefa.addEventListener('keypress', function (e) {
    if(e.keyCode === 13) {
        if(!inputTarefa.value) return alert('O campo não pode ser vazio')
        criaTarefa(inputTarefa.value)
    }

});

function limpaInput () {
    inputTarefa.value = '';
    inputTarefa.focus();
}


function criaBotaoApagar (li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}


//Criar a tarefa atraves do input capturado
function criaTarefa (textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}


//Capturar clique atraves do click do botao
btnTarefa.addEventListener ('click', function (e) {
    if (!inputTarefa.value) return alert('O campo não pode ser vazio');
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function (e) {
    const el = e.target;
    
    if(el.classList.contains('apagar') ) {
        el.parentElement.remove();
        salvarTarefas();
    }
})

function salvarTarefas () {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    //salvar item no storage com json. ('nome para recuperar o json', nomeJSON)
    localStorage.setItem('tarefas', tarefasJSON);
}


function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas()

