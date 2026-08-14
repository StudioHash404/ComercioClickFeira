
// aqui vai o codigo do modal para fazer o crud
// tenta ligar o backend nisso, ou ate refazer

// resolve ai backend, nem sei oq isso ai faz, eu sou front
// o chat gpt explicou ai no codigo como voce pode adaptar, sei la como

let produtos = [];
let idAtual = 1;

// ===== FUNÇÕES DO MODAL =====
function abrirModal(produto) {
    const modal = document.getElementById('modal');
    const titulo = document.getElementById('modal-titulo');
    const form = document.getElementById('form-produto');
    const idEdicao = document.getElementById('id-edicao');
    const nome = document.getElementById('nome');
    const preco = document.getElementById('preco');
    const descricao = document.getElementById('descricao');
    const botaoSalvar = document.getElementById('botao-salvar');

    form.reset();
    idEdicao.value = '';

    if (produto) {
        titulo.textContent = 'Editar Produto';
        idEdicao.value = produto.id;
        nome.value = produto.nome;
        preco.value = produto.preco;
        descricao.value = produto.descricao;
        botaoSalvar.textContent = 'Atualizar';
    } else {
        titulo.textContent = 'Novo Produto';
        botaoSalvar.textContent = 'Salvar';
    }

    modal.classList.add('active');
}

function fecharModal() {
    document.getElementById('modal').classList.remove('active');
}

// ===== FUNÇÕES CRUD (SUBSTITUA PELAS CHAMADAS DA API) =====
function criarProduto(produto) {
    // Substitua pelo POST para o backend
    // Exemplo: fetch('/api/produtos', { method: 'POST', body: JSON.stringify(produto) })
    const novoProduto = {
        id: idAtual++,
        ...produto
    };
    produtos.push(novoProduto);
    renderizarTabela();
}

function atualizarProduto(id, produto) {
    // Substitua pelo PUT para o backend
    // Exemplo: fetch('/api/produtos/' + id, { method: 'PUT', body: JSON.stringify(produto) })
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos[index] = { id, ...produto };
        renderizarTabela();
    }
}

function deletarProduto(id) {
    // Substitua pelo DELETE para o backend
    // Exemplo: fetch('/api/produtos/' + id, { method: 'DELETE' })
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        renderizarTabela();
    }
}

function listarProdutos() {
    // Substitua pelo GET para o backend
    // Exemplo: fetch('/api/produtos').then(res => res.json()).then(data => { produtos = data; renderizarTabela(); })
    renderizarTabela();
}

// ===== HANDLERS DO FORMULÁRIO =====
function salvarProduto(event) {
    event.preventDefault();

    const idEdicao = document.getElementById('id-edicao').value;
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const descricao = document.getElementById('descricao').value;

    const produto = { nome, preco, descricao };

    if (idEdicao) {
        atualizarProduto(parseInt(idEdicao), produto);
    } else {
        criarProduto(produto);
    }

    fecharModal();
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        abrirModal(produto);
    }
}

function excluirProduto(id) {
    deletarProduto(id);
}

// ===== RENDERIZAÇÃO DA TABELA =====
function renderizarTabela() {
    const corpo = document.getElementById('corpo-tabela');
    const vazio = document.getElementById('vazio');

    if (produtos.length === 0) {
        corpo.innerHTML = '';
        vazio.style.display = 'block';
        return;
    }

    vazio.style.display = 'none';

    corpo.innerHTML = produtos.map(produto => `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.descricao || '-'}</td>
            <td>
                <div class="actions">
                    <button class="btn btn-warning" onclick="editarProduto(${produto.id})">Editar</button>
                    <button class="btn btn-danger" onclick="excluirProduto(${produto.id})">Excluir</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ===== EVENT LISTENERS =====
document.getElementById('form-produto').addEventListener('submit', salvarProduto);

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        fecharModal();
    }
});

// ===== INICIALIZAÇÃO =====
listarProdutos();