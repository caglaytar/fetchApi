document.getElementById('getWeather').addEventListener('click', function () {
    const cityName = document.getElementById('city').value;
    const apiKey = 'ce8f8a16a093785082dcd055dd4b0770';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Şehir bulunamadı ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const result = `
                Şehir: ${data.name}<br>
                Sıcaklık: ${data.main.temp}°C<br>
                Hava Durumu: ${data.weather[0].description}
            `;
            document.getElementById('weatherResult').innerHTML = result;
        })
        .catch(error => {
            console.error('Hata:', error);
            document.getElementById('weatherResult').innerHTML = 'Bir hata oluştu!';
        });
});
