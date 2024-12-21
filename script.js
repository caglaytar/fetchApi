const userList = document.getElementById('userList'); // 'userList' id'sini doğru şekilde çağırdık

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(users => {
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
})
.catch(error => console.error('Hata oluştu:', error));
