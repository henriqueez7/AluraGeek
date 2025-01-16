import { fetchProdutos, deleteProduto } from './api.js';

const productList = document.querySelector('.listaProdutos');

// Função para criar um card de produto
const createProductCard = (id, name, price, imageSrc) => {
    const cardHTML = `
        <div class="card" data-id="${id}">
            <img src="${imageSrc}" alt="${name}">
            <div class="cardInformacao">
                <div class="info">
                    <p>${name}</p>
                    <div class="cardValor">
                        <p>Preço: $${price.toFixed(2)}</p>
                    </div>
                </div>
                <img src="./assets/img/iconeExcluir.svg" alt="Ícone de exclusão" class="delete-icon" data-id="${id}">
            </div>
        </div>
    `;
    productList.insertAdjacentHTML('beforeend', cardHTML);
};

// Função para carregar produtos existentes
const loadProdutos = async () => {
    const produtos = await fetchProdutos();
    produtos.forEach(product => {
        createProductCard(product.id, product.name, product.price, product.imageSrc);
    });
    checkIfEmpty();
};

// Função para verificar se a lista de produtos está vazia
const checkIfEmpty = () => {
    const message = document.querySelector('.mensagemProdutos');
    if (productList.children.length === 0) {
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
};

// Função para excluir um produto
const handleDeleteProduct = async (event) => {
    if (event.target.classList.contains('delete-icon')) {
        const productId = event.target.getAttribute('data-id');
        const success = await deleteProduto(productId);
        if (success) {
            event.target.closest('.card').remove();
            checkIfEmpty();
        }
    }
};

// Adicionar listener para excluir produtos
productList.addEventListener('click', handleDeleteProduct);

// Exportar as funções para serem usadas em outros arquivos
export { createProductCard, loadProdutos };
