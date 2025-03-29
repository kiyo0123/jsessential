import axios from 'axios'

const city = 'tokyo';
const apiKey = '05fd2bd1087e0af932ca35967e1b619f'; // Replace 'YOUR_API_KEY' with your actual API key
//const apiKey = 'c4f86ece00bc8aa272652ac9065af12d'; // Replace 'YOUR_API_KEY' with your actual API key
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => {
        // ステータスコードがエラーの場合はエラーをスロー（任意）
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // メソッド呼び出しに()が必要
    })
    .then(data => {
        console.log('--- fetch version ---')
        console.log(data);
        const weatherMain = data.weather[0].main;
        const temperature = data.main.temp;
        const cityName = data.name;

        console.log(`weather: ${weatherMain}`);
        console.log(`temp: ${temperature}`);
        console.log(`city: ${cityName}`);
    })
    .catch(error => {
        // ネットワークエラーやエラーコード時の処理
        console.error('Error:', error);
    });

axios.get(apiUrl)
    .then(response => {
        console.log('--- axios version ---');
        const data = response.data;
        console.log(data);

        const weatherMain = data.weather[0].main;
        const temperature = data.main.temp;
        const cityName = data.name;
        
        console.log(`weather: ${weatherMain}`);
        console.log(`temp: ${temperature}`);
        console.log(`city: ${cityName}`);
    })
    .catch(error => {
        // ネットワークエラーやエラーコード時の処理
        console.error('Error:', error);
    });

        