const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityname = document.getElementById("city-name");
const citytime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");
const weatherCard = document.getElementById("weather-card");
const weatherIcon = document.getElementById("weather-icon");
const conditionText = document.getElementById("condition-text");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

async function getData(cityName) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=97af8fc3e00b4bf49b460847252306&q=${cityName}&aqi=yes`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error: " + error.message);
        return null;
    }
}

button.addEventListener("click", async () => {
    const value = input.value.trim();
    if (!value) {
        alert("Please enter a city name.");
        return;
    }

    const result = await getData(value);
    if (result) {
        const location = result.location;
        const current = result.current;

        cityname.innerText = `${location.name}, ${location.region} - ${location.country}`;
        citytime.innerText = `Local Time: ${location.localtime}`;
        cityTemp.innerText = `${current.temp_c}°C`;
        conditionText.innerText = current.condition.text;
        weatherIcon.src = "https:" + current.condition.icon;
        humidity.innerText = current.humidity;
        windSpeed.innerText = current.wind_kph;

        weatherCard.style.display = "block";
    }
});
