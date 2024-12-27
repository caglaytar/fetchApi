document.getElementById('fetchNews').addEventListener('click', function () {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=df98dd72f7dc48b19bfafeeaccf2ea50')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Hatası! Durum Kodu: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById('newsContainer');
            newsContainer.innerHTML = ''; // Eski içerikleri temizle

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';

                    const newsTitle = document.createElement('h2');
                    newsTitle.textContent = article.title || 'Başlık bulunamadı';

                    const newsDescription = document.createElement('p');
                    newsDescription.textContent = article.description || 'Açıklama bulunamadı';

                    newsItem.appendChild(newsTitle);
                    newsItem.appendChild(newsDescription);

                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p>Haber bulunamadı.</p>';
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Bir hata oluştu: ' + error.message);
        });
});