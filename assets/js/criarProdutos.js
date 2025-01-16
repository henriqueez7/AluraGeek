import { createProduto } from './api.js';
import { createProductCard } from './listarProdutos.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioProdutos');

    // Função para capturar os valores dos inputs e criar um novo produto
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const name = document.getElementById('nomeProduto').value;
        const price = parseFloat(document.getElementById('precoProduto').value);
        const imageInput = document.getElementById('ProdutoImagem');
        const imageFile = imageInput.files[0];

        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageSrc = e.target.result;

            const newProduto = await createProduto({ name, price, imageSrc });
            if (newProduto) {
                createProductCard(newProduto.id, newProduto.name, newProduto.price, newProduto.imageSrc);
                form.reset();
            }
        };
        reader.readAsDataURL(imageFile);
    };

    // Adiciona o listener de eventos para o formulário
    form.addEventListener('submit', handleFormSubmit);
});
