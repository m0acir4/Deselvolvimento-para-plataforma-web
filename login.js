document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name }),
        });

        if (!response.ok) throw new Error('Login falhou');

        window.location.href = 'gestao.html';
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});
