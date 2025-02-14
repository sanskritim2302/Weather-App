const fetchData = async () => {
    const apiKey = "b449989f764340b2abb104553251302"; 
    let location = document.getElementById("locationInput").value;
    let date = document.getElementById("dateInput").value;

    if (!date) {
        alert("Please select a date.");
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&dt=${date}`; 

    try {
        const response = await fetch(apiUrl); 
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json(); 
        const forecast = data.forecast.forecastday[0];  

        document.getElementById("weatherResult").innerHTML = `
            <div class="weather-card">
                <h3>Weather in ${data.location.name}, ${data.location.country} on ${forecast.date}</h3>
                <p><strong>Avg Temperature:</strong> ${forecast.day.avgtemp_c}°C (${forecast.day.avgtemp_f}°F)</p>
                <p><strong>Condition:</strong> ${forecast.day.condition.text}</p>
                <img src="https:${forecast.day.condition.icon}" alt="Weather Icon">
                <p><strong>Max Temp:</strong> ${forecast.day.maxtemp_c}°C</p>
                <p><strong>Min Temp:</strong> ${forecast.day.mintemp_c}°C</p>
                <p><strong>Humidity:</strong> ${forecast.day.avghumidity}%</p>
                <p><strong>Wind Speed:</strong> ${forecast.day.maxwind_kph} km/h</p>
                <p><strong>Precipitation:</strong> ${forecast.day.totalprecip_mm} mm</p>
                <p><strong>UV Index:</strong> ${forecast.day.uv}</p>
            </div>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        console.error("Error fetching data:", error);
    }
};
