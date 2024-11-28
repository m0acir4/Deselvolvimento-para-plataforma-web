
function getQueryParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}


async function loadUserData() {
    const userId = getQueryParameter('userId'); 
    if (!userId) {
        alert('ID do usuário não encontrado!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
        const user = await response.json();

        if (response.ok) {
            
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


document.getElementById('editUserForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const userId = getQueryParameter('userId'); 
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
            window.location.href = 'gestao.html'; 
        } else {
            const errorData = await response.json();
            alert('Erro ao atualizar usuário: ' + errorData.message);
        }
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});


loadUserData();
