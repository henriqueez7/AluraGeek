import { createProduto } from './api.js';
import { createProductCard, loadProdutos } from './listarProdutos.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioProdutos');

    // Lida com o envio do formulário
    form.addEventListener('submit', async (event) => {
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
    });

    // Carrega produtos existentes ao carregar a página
    loadProdutos();
});
