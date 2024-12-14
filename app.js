const apiKey = '97a08c2c3e98c1c915ae0df770538d57';

// Function to fetch weather based on the city name
function getCityWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse JSON data
        })
        .then(function (data) {
            // Set the city name
            document.getElementById('city').textContent = data.name;

            // Set the current temperature (in Celsius)
            document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;

            // Set the weather condition (e.g., "Cloudy", "Clear", etc.)
            document.getElementById('condition').textContent = data.weather[0].description;

            // Set the main temperature in the card
            document.getElementById('temp-main').textContent = `${Math.round(data.main.temp)}°C`;

            // Set the wind speed
            document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;

            // Set the humidity
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;

            // Set the visibility
            document.getElementById('visibility').textContent = `${data.visibility / 1000} km`;

            // Set the weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            document.getElementById('weather-icon').setAttribute('src', iconUrl);

            // Log the data to the console to ensure the data is being fetched correctly
            console.log(data);

            // Fetch forecast for the 7-day period
            // get7DayForecast(data.coord);
        })
        .catch(function (error) {
            console.error('Error:', error.message);
        });
}



// Function to get current location and fetch weather for that location
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Fetch weather data based on latitude and longitude
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Parse JSON data
                })
                .then(function (data) {
                    // Set the city name
                    document.getElementById('city').textContent = data.name;

                    // Set the current temperature (in Celsius)
                    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;

                    // Set the weather condition (e.g., "Cloudy", "Clear", etc.)
                    document.getElementById('condition').textContent = data.weather[0].description;

                    // Set the main temperature in the card
                    document.getElementById('temp-main').textContent = `${Math.round(data.main.temp)}°C`;

                    // Set the wind speed
                    document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;

                    // Set the humidity
                    document.getElementById('humidity').textContent = `${data.main.humidity}%`;

                    // Set the visibility
                    document.getElementById('visibility').textContent = `${data.visibility / 1000} km`;

                    // Set the weather icon
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
                    document.getElementById('weather-icon').setAttribute('src', iconUrl);

                    // Fetch the 7-day forecast
                    get7DayForecast(data.coord);
                })
                .catch(function (error) {
                    console.error('Geolocation error:', error.message);
                });
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Function to update day, date, and time
function updateDateTime() {
    const date = new Date();
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Get current day, date, and time
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const currentDate = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    // Set the day, date, and time in the DOM
    document.getElementById('day').textContent = `${day}`;
    document.getElementById('date').textContent = `${currentDate} ${month} ${year}`;
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;

    // Call the function every second to update time dynamically
    setTimeout(updateDateTime, 1000);
}

// Event listener for search button to fetch weather for selected city
document.querySelector('.search-button').addEventListener('click', function () {
    const city = document.getElementById('search').value;
    if (city) {
        getCityWeather(city);
    }
});

// Event listener for Enter key press to trigger search
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const city = document.getElementById('search').value;
        if (city) {
            getCityWeather(city);
        }
    }
}

// Call getCurrentLocationWeather() when the page loads
window.onload = function () {
    getCurrentLocationWeather();
    updateDateTime(); // Update day, date, and time when the page loads
};
