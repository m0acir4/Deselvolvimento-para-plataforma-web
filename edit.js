// Função para obter parâmetros da URL
function getQueryParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Função para carregar os dados do usuário com base no ID da URL
async function loadUserData() {
    const userId = getQueryParameter('userId'); // Obtém o ID do usuário da URL
    if (!userId) {
        alert('ID do usuário não encontrado!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
        const user = await response.json();

        if (response.ok) {
            // Preenche os campos do formulário com os dados do usuário
            document.getElementById('email').value = user.email;
            document.getElementById('name').value = user.name;
            document.getElementById('age').value = user.age;
        } else {
            alert('Erro ao carregar usuário!');
        }
    } catch (error) {
        ;
    }
}

// Função para enviar os dados atualizados do usuário
document.getElementById('editUserForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    const userId = getQueryParameter('userId'); // Obtém o ID do usuário da URL
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, age }),
        });

        if (response.ok) {
            alert('Usuário atualizado com sucesso!');
            window.location.href = 'gestao.html'; // Retorna à página de gestão
        } else {
            const errorData = await response.json();
            alert('Erro ao atualizar usuário: ' + errorData.message);
        }
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});

// Carrega os dados do usuário ao abrir a página
loadUserData();