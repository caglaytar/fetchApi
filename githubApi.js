const getUserButton = document.getElementById('getUser');
const usernameInput = document.getElementById('username');
const userInfoDiv = document.getElementById('userInfo');

getUserButton.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    if (!username) {
        alert('Lütfen bir kullanıcı adı girin!');
        return;
    }

    const apiUrl = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();

        // Kullanıcı bilgilerini sayfada görüntüle
        userInfoDiv.innerHTML = `
            <h2>${userData.login}</h2>
            <img src="${userData.avatar_url}" alt="Avatar" width="100">
            <p><strong>Ad:</strong> ${userData.name || 'Bilgi Yok'}</p>
            <p><strong>Bio:</strong> ${userData.bio || 'Bilgi Yok'}</p>
            <p><strong>Şehir:</strong> ${userData.location || 'Bilgi Yok'}</p>
            <p><strong>GitHub Sayfası:</strong> <a href="${userData.html_url}" target="_blank">GitHub Profili</a></p>
        `;
    } catch (error) {
        userInfoDiv.innerHTML = `<p>Hata oluştu: ${error.message}</p>`;
    }
});
