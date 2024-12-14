document.addEventListener('DOMContentLoaded', () => {
    var locationElement = document.querySelector('.location');
    var temperatureElement = document.querySelector('.temperature');
    var descriptionElement = document.querySelector('.description');
    var citySelect = document.querySelector('#city-select');

    var fetchWeather = async (query) => {
        try {
            var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=YOUR_API_KEY`);
            var data = await response.json();
            
            locationElement.textContent = `${data.name}, ${data.sys.country}`;
            temperatureElement.innerHTML = `${Math.round(data.main.temp)}&#8451;`;
            descriptionElement.textContent = data.weather[0].description;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Location not found';
            temperatureElement.innerHTML = '--&#8451;';
            descriptionElement.textContent = '--';
        }
        console.log(data);
    };

    document.querySelector('#search-button').addEventListener('click', () => {
        var query = citySelect.value;
        if (query) fetchWeather(query);
    });
});