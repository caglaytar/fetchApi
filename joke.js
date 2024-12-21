document.getElementById('jokeButton').addEventListener('click', function() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            const joke = `${data.setup} - ${data.punchline}`;
            document.getElementById('joke').textContent = joke;
        })
        .catch(error => {
            document.getElementById('joke').textContent = 'Oooops! Bir hata oldu... Şaka yapamadık!';
            alert('Error: ' + error.message)
        });
});
