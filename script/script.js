let locName = document.querySelector(".city");
let currentTemp = document.querySelector(".temp");
let tempF = document.querySelector(".tempF");
let country = document.querySelector(".country");
let text = document.querySelector(".text");
let longitude = document.querySelector(".longitude");
let feel = document.querySelector(".feel-like");
let latitude = document.querySelector(".latitude");
let icon = document.querySelector(".icon img");
let suggest = document.querySelector(".suggestion-city");
let iconPath;
let response;

const suggestionCity = [];

async function getWeather(query) {
  response = await fetch(`http://localhost:5000/get-weather?city=${query}`)
    .then((data) => {
      return data.json();
    })

    .then((d) => weatherInfo(d))

    .catch((e) => {
      console.error(e);
      alert(e);
    });
}

function weatherInfo(res) {
  console.log(res);

  locName.value = ` ${
    res.location.city.charAt(0).toUpperCase() +
    res.location.city.slice(1, res.location.city.length)
  }`;
  longitude.innerHTML = `Longitude: ${res.location.long}`;
  latitude.innerHTML = `Latitude: ${res.location.lat}`;
  text.innerHTML = `Uv: ${res.condition.uv}`;
  feel.innerHTML = `Feels  ${res.condition.humidity}<sup>°</sup>`;
  currentTemp.innerHTML = `${res.condition.tempC} <sup>°</sup>`;
  tempF.innerHTML = `TempF: ${res.condition.tempF}`;

  if (res.condition.cloud < 20) {
    icon.src = "../assets/weather/day/113.svg";
  } else if (res.condition.cloud > 20 && res.condition.cloud < 50) {
    icon.src = "../assets/weather/day/116.svg";
  } else if (res.condition.cloud > 50 && res.condition.cloud < 80) {
    icon.src = "../assets/weather/day/119.svg";
  } else {
    icon.src = "../assets/weather/day/143.svg";
  }
}

async function getCities(query) {
  response = await fetch(`http://localhost:5000/city`)
    .then((data) => {
      return data.json();
    })
    .then((d) => {
      d.forEach((city) => {
        suggestionCity.push(city);
      });
    })
    .then(() => addSuggestion())
    .catch((e) => {
      console.error(e);
      alert(e);
    });
}

function addSuggestion() {
  suggestionCity.forEach((city) => {
    city = city.charAt(0).toUpperCase() + city.slice(1, city.length);
    let li = document.createElement("li");
    li.textContent = city;
    suggest.firstElementChild.appendChild(li);
  });
}

suggest.firstElementChild.addEventListener("click", (e) => {
  locName.value = e.target.textContent;
  getWeather(locName.value);
});

window.addEventListener("click", (e) => {
  if (e.target === locName) {
    suggest.classList.remove("hide");
  } else {
    suggest.classList.add("hide");
  }
});

locName.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather(e.target.value);
  }
});

(() => {
  getCities();
  getWeather("patna");
})();
