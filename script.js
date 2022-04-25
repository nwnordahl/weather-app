// Global variables
const API_KEYS = {
  weather: "ee6f88ae8db5364cad05b40df1f81718",
  gif: "blZBBX96YFZI1VZ6wLWPZn0JcZSDCP1x",
};

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Drammen&APPID=${API_KEYS.weather}`;
let gifURL = `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEYS.gif}&s=clouds`;
let condition = "";

// Query selectors
const gif = document.querySelector("#gif");
const informationCard = document.querySelector("#information-card");

// Helper functions
async function getWeatherInformation() {
  const response = await fetch(weatherURL, {
    mode: "cors",
  });
  const result = await response.json();

  return {
    location: result.name,
    temp: result.main.temp,
    min_temp: result.main.temp_min,
    max_temp: result.main.temp_max,
    condition: result.weather[0].main,
    description: result.weather[0].description,
  };
}

async function getGif() {
  const response = await fetch(gifURL, {
    mode: "cors",
  });
  const result = await response.json();

  console.log(result);
  return result;
}

function changeSearchTerm(url, searchTerm) {
  return `${url.split("&s=")[0]}&s=${searchTerm}`;
}

getWeatherInformation().then((obj) => {
  gifURL = changeSearchTerm(gifURL, obj.condition);
  informationCard.innerHTML = `
  <h1>${obj.location}</h1>
  <p>Condition: ${obj.condition}</p>
  <p>Description: ${obj.description}</p>
  <p>Temperature: ${obj.temp}</p>
  `;

  getGif().then((obj) => {
    document.body.style.backgroundImage = `url("${obj.data.images.original.url}")`;
  });
});
