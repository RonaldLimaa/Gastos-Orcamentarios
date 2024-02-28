window.onload = function() {
    var itens = localStorage.getItem('itens');
    if (itens) {
        var listaItens = JSON.parse(itens);
        listaItens.forEach(function(item) {
            adicionarItem(item.nome, item.preco, item.quantidade);
        });
        atualizarTotal();
    }
};

document.getElementById('btnAdicionar').addEventListener('click', function() {
    var nome = document.getElementById('inputNome').value;
    var preco = parseFloat(document.getElementById('inputPreco').value);
    var quantidade = parseInt(document.getElementById('inputQuantidade').value);

    if (nome.trim() === '' || isNaN(preco) || isNaN(quantidade)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    adicionarItem(nome, preco, quantidade);
    limparCampos();
    atualizarTotal();
    salvarItensNoLocalStorage();
});

document.getElementById('botaoSalvar').addEventListener('click', function() {
    var container = document.querySelector('.resultados-container');

    html2canvas(container, {
        onrendered: function(canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'lista.png';
            link.click();
        }
    });
});

function adicionarItem(nome, preco, quantidade) {
    var listaItens = document.getElementById('listaItens');
    var newItem = document.createElement('li');
    var totalItem = preco * quantidade;
    newItem.innerHTML = `
        <span>${nome} - Quantidade: ${quantidade} - Preço Unitário: R$ ${preco.toFixed(2)} - Total: R$ ${totalItem.toFixed(2)}</span>
        <button onclick="excluirItem(this)">Excluir</button>
    `;
    listaItens.appendChild(newItem);
}

function excluirItem(botaoExcluir) {
    var confirmar = confirm("Você tem certeza que deseja excluir o item?");
    if (confirmar) {
        var item = botaoExcluir.parentNode;
        item.parentNode.removeChild(item);
        salvarItensNoLocalStorage();
        atualizarTotal();
    }
}

function limparCampos() {
    document.getElementById('inputNome').value = '';
    document.getElementById('inputPreco').value = '';
    document.getElementById('inputQuantidade').value = '';
}

function atualizarTotal() {
    var itens = document.querySelectorAll('#listaItens li span');
    var totalGeral = 0;
    itens.forEach(function(item) {
        var totalItemTexto = item.textContent.split('Total:')[1].trim();
        var totalItem = parseFloat(totalItemTexto.substring(3));
        totalGeral += totalItem;
    });
    document.getElementById('total').textContent = 'Total Geral: R$ ' + totalGeral.toFixed(2);
}

document.getElementById('botaoSalvar').addEventListener('click', function() {
    var container = document.querySelector('.form-container');

    html2canvas(container, {
        onrendered: function(canvas) {
            var link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'lista.png';
            link.click();
        }
    });
});

