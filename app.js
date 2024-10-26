async function loadUsers() {
    const res = await fetch('http://localhost:3000/users');
    const data = await res.json();
    document.getElementById('userList').innerHTML = data.users.map(u => `<li>${u.name} - ${u.email}</li>`).join('');
}

async function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    loadUsers();
}

loadUsers();