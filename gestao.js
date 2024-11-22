const userTable = document.querySelector('#userTable tbody');

// Carregar usuários
async function loadUsers() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        const users = await response.json();

        userTable.innerHTML = ''; // Limpa a tabela

        users.forEach((user) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.name}</td>
                <td>
                    <button onclick="deleteUser('${user.id}')" class="btn btn-danger btn-sm mr-2">Excluir</button>
                    <a href="/edit.html?userId=${user.id}" class="btn btn-warning btn-sm">Editar</a>
                </td>
            `;
            userTable.appendChild(row);
        });
    } catch (error) {
        alert('Erro ao carregar usuários: ' + error.message);
    }
}

// Redirecionar para a página de edição com o ID do usuário
function editUser(userId) {
    // Redireciona para edit.html com o ID como parâmetro
    window.location.href = `edit.html?userId=${userId}`;
}

// Deletar usuário
async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao excluir usuário');

        alert('Usuário excluído com sucesso');
        loadUsers(); // Recarrega a lista
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

loadUsers();
