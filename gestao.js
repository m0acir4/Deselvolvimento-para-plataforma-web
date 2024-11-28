const userTable = document.querySelector('#userTable tbody');


async function loadUsers() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        const users = await response.json();

        userTable.innerHTML = ''; 

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


function editUser(userId) {
    
    window.location.href = `edit.html?userId=${userId}`;
}


async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao excluir usuário');

        alert('Usuário excluído com sucesso');
        loadUsers(); 
    } catch (error) {
        alert('Erro: ' + error.message);
    }
}

loadUsers();
