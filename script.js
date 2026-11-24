
function checkWeather() {

    // Get values from input fields

    let wind = Number(document.getElementById("windInput").value);
    let gust = Number(document.getElementById("gustInput").value);
    let temp = Number(document.getElementById("tempInput").value);
    let rain = Number(document.getElementById("rainInput").value);
    let wave = Number(document.getElementById("waveInput").value);
    let drops = Number(document.getElementById("dropInput").value);

    // Validate inputs

    if ([wind, gust, temp, rain, wave, drops].some(value => !Number.isFinite(value)) ||
        wind < 0 || gust < 0 || temp < -10 || temp > 60 ||
        rain < 0 || wave < 0 || drops < 0) {

        alert("Please enter valid weather values.");
        return;
    }

    // Update dashboard values

    document.getElementById("wind").innerText = wind;
    document.getElementById("gust").innerText = gust;
    document.getElementById("temperature").innerText = temp;
    document.getElementById("rainfall").innerText = rain;
    document.getElementById("wave").innerText = wave;
    document.getElementById("drops").innerText = drops;

    // Demo alert calculation
    // These thresholds are illustrative, NOT official safety limits.

    let alertBox = document.getElementById("alertBox");
    let alertTitle = document.getElementById("alertTitle");
    let alertMessage = document.getElementById("alertMessage");

    alertBox.className = "alert";

    if (
        wind >= 50 ||
        gust >= 65 ||
        wave >= 3 ||
        rain >= 50
    ) {

        alertBox.classList.add("red");

        alertTitle.innerText = "RED ALERT - High Demo Risk";

        alertMessage.innerText =
            "Sample measurements crossed a high demonstration threshold. Check official warnings immediately.";

    }

    else if (
        wind >= 25 ||
        gust >= 35 ||
        wave >= 1.5 ||
        rain >= 15
    ) {

        alertBox.classList.add("yellow");

        alertTitle.innerText = "YELLOW ALERT - Caution";

        alertMessage.innerText =
            "Some sample measurements crossed a caution threshold. Check official marine forecasts.";

    }

    else {

        alertBox.classList.add("green");

        alertTitle.innerText = "GREEN ALERT - Low Demo Risk";

        alertMessage.innerText =
            "Sample values are below the demo thresholds. This does not confirm that going to sea is safe.";

    }
}

async function getWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=9.2885&longitude=79.3129&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl&wind_speed_unit=kmh&timezone=Asia%2FKolkata";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const weather = data.current;

    document.getElementById("temperature").innerText =
      weather.temperature_2m + " °C";

    document.getElementById("humidity").innerText =
      weather.relative_humidity_2m + " %";

    document.getElementById("rainfall").innerText =
      weather.precipitation + " mm";

    document.getElementById("wind").innerText =
      weather.wind_speed_10m + " km/h";

    document.getElementById("pressure").innerText =
      weather.pressure_msl + " hPa";

  } catch (error) {
    console.log("Weather data unavailable", error);
  }
}

getWeather();

// Refresh readings every 10 minutes
setInterval(getWeather, 600000);
