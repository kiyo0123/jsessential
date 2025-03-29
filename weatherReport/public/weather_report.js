const apiKey = 'c4f86ece00bc8aa272652ac9065af12d'; // Replace 'YOUR_API_KEY' with your actual API key
const cityInput        = document.getElementById('cityInput');
const getWeatherBtn    = document.getElementById('getWeatherBtn');
const weatherInfo      = document.getElementById('weatherInfo');
const weatherCity      = document.getElementById('weatherCity');
const weatherTemp      = document.getElementById('weatherTemp');
const weatherCondition = document.getElementById('weatherCondition');

/**
 * 非同期関数: 指定した都市の天気情報をAPIから取得して返す
 */
async function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    // ネットワークエラーや都市名不正の場合
    throw new Error(`HTTP Error! status: ${response.status}`);
  }

  // JSONデータをパースして返す
  return await response.json();
}

/**
 * UIの更新を行う
 */
function updateWeatherInfo(data) {
  const { name } = data;
  const { temp } = data.main;
  const { description } = data.weather[0];

  weatherCity.textContent = `Weather in ${name}`;
  weatherTemp.textContent = `Temperature: ${temp} ℃`;
  weatherCondition.textContent = `Weather: ${description}`;

  // 情報ブロックを表示
  weatherInfo.style.display = 'block';
}

/**
 * 「Get Weather」ボタンがクリックされたときの処理
 */
async function handleGetWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    alert('都市名を入力してください。');
    return;
  }

  try {
    const data = await fetchWeather(city);
    updateWeatherInfo(data);
  } catch (error) {
    alert('天気情報を取得できませんでした。都市名を確認してください。');
    console.error(error);
  }
}

// イベントリスナーの登録
getWeatherBtn.addEventListener('click', handleGetWeather);

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleGetWeather();
    }
  });
