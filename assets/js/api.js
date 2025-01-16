const apiUrl = 'http://localhost:3000/produtos';

// Método para realizar a requisição GET e obter os produtos
const fetchProdutos = async () => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const produtos = await response.json();
        return produtos;
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
};

// Método para realizar a requisição POST e criar um novo produto
const createProduto = async (produto) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar produto');
        }
        const newProduto = await response.json();
        return newProduto;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
};

// Método para realizar a requisição DELETE e excluir um produto
const deleteProduto = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir produto');
        }
        return true;
    } catch (error) {
        console.error('Erro:', error);
        return false;
    }
};

// Exportar as funções para serem usadas em outros arquivos
export { fetchProdutos, createProduto, deleteProduto };
