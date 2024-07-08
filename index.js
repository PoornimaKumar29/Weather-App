const appikey = "a97d62327c9d093a3c09c47e34a64331";
const appiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${appiurl}${city}&appid=${appikey}`);
        
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            // console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            
            const weatherCondition = data.weather[0].main.toLowerCase();
            if (weatherCondition === "clouds") {
                weatherIcon.src = "/images/clouds.png";
            } else if (weatherCondition === "clear") {
                weatherIcon.src = "/images/clear.png";
            } else if (weatherCondition === "rain") {
                weatherIcon.src = "/images/rain.png";
            } else if (weatherCondition === "drizzle") {
                weatherIcon.src = "/images/drizzle.png";
            } else if (weatherCondition === "mist") {
                weatherIcon.src = "/images/mist.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
