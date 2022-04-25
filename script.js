// Global variables
const API_KEYS = {
  weather: "ee6f88ae8db5364cad05b40df1f81718",
  gif: "blZBBX96YFZI1VZ6wLWPZn0JcZSDCP1x",
};

let weatherURL = `https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEYS.weather}&q=Drammen`;
let gifURL = `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEYS.gif}&s=clouds`;
let searchTerm = "";
let condition = "";

// Query selectors
const searchField = document.querySelector("#search-field");
const searchButton = document.querySelector("#search-button");
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

function changeSearchTerm(url, searchKey, searchTerm) {
  return `${url.split(`${searchKey}=`)[0]}${searchKey}=${searchTerm}`;
}

function main() {
  getWeatherInformation().then((obj) => {
    gifURL = changeSearchTerm(gifURL, "s", obj.condition);

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
}

// Event listeners
searchField.addEventListener("input", (e) => {
  weatherURL = changeSearchTerm(weatherURL, "q", e.target.value);
});

searchButton.addEventListener("click", () => {
  searchField.value = "";
  main();
});

main();
