document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, age }),
        });

        if (!response.ok) throw new Error('Falha no cadastro');

        alert('Usuário cadastrado com sucesso');
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});
