let mic = document.getElementById("mic");
let audioElement = null;
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');

// 添加多轮对话控制条件
let currentQuestion = "";

let intro = ["Hello, I am Emma", "Hi, I am a Emma Robot", "Hello, My name is Emma"];
let help = ["How may i assist you?","How can i help you?","What i can do for you?"];
let greetings = ["i am good you little piece of love", "i am fine, what about you", "don't want to talk", "i am good"];
let hobbies = ["i love to talk with humans", "i like to make friends like you", "i like cooking"];
let pizzas = ["which type of pizza do you like", "i can make a pizza for you", "i would love to make a pizza for you", "would you like cheese pizza?"];
let thank = ["Most welcome","Not an issue","Its my pleasure","Mention not"];
let closing = ['Ok bye-bye','As you wish, bye take-care','Bye-bye, see you soon']
let introduce_me = ['Hello, this is Emma, your voice artifical assistant','Hello, I am your assistant named Emma']

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function showusermsg(usermsg){
    let output = '';
    output += `<div class="chatarea-inner user">${usermsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

function showchatbotmsg(chatbotmsg){
    let output = '';
    output += `<div class="chatarea-inner chatbot">${chatbotmsg}</div>`;
    chatareaouter.innerHTML += output;
    return chatareaouter;
}

function chatbotvoice(message){
    //浏览器语音接口
    message = message.toLowerCase();
    const speech = new SpeechSynthesisUtterance();
    speech.text = "emm";
    
    if(message.includes('introduce')){
        let finalresult = introduce_me[Math.floor(Math.random() * introduce_me.length)];
        speech.text = finalresult;
    }
    if(['who are you','hello','hi'].some(x => message.includes(x)) ){
        
        let finalresult = intro[Math.floor(Math.random() * intro.length)];
        speech.text = finalresult;
    }
    if(message.includes('fine')){
        let finalresult = help[Math.floor(Math.random() * help.length)];
        speech.text = finalresult;
    }
    // if(message.includes('how are you' || 'how are you doing today')){
    if(['how are you','hello','how are you doing today'].some(x => message.includes(x)) ){
        let finalresult = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalresult;
    }
  
    //if(message.includes('tell me something about you' || 'tell me something about your hobbies')){
    if(['tell me something about you','tell me something about your hobbies'].some(x => message.includes(x)) ){
        let finalresult = hobbies[Math.floor(Math.random() * hobbies.length)];
        speech.text = finalresult;
    }
    if(message.includes('pizza')){
        let finalresult = pizzas[Math.floor(Math.random() * pizzas.length)];
        speech.text = finalresult;
    }
    if(message.includes('thank you')){
        let finalresult = thank[Math.floor(Math.random() * thank.length)];
        speech.text = finalresult;
    }
    if(message.includes('talk to you')){
        let finalresult = closing[Math.floor(Math.random() * closing.length)];
        speech.text = finalresult;
    }
    // music mode
    if (message.includes('stop music')) {
        // 调用播放音乐的函数
        stopMusic();
        speech.text = "Sure, I will stop it now";
        
    }
    if (message.includes('play music')) {
        speech.text = "Whose music you want to listen";
        currentQuestion = "music"
    }
    if (currentQuestion === "music") {
        if (message.includes('symphony of fate')) {
          // 调用播放音乐的函数
            playMusic();
            speech.text = "Sure, this is Beethoven music symphony of fate";
            currentQuestion = "";
        }
    }

    //weather mode
    if (['temperature','weather'].some(x => message.includes(x))) {
        // speech.text = "Which city you want to search";
        var apiKey = 'b90244460d6d9cf80458c4d3d9a4ccd6';
        var city = 'beijing';

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let weatherDescription = data.weather[0].description;
            let temperature = (data.main.temp - 273.15).toFixed(1).toString();; // 将温度转换为摄氏度并取两位小数
            let temperatureText = convertNumberToText(Math.floor(temperature)) + " point " + convertNumberToText(Math.round((temperature % 1) * 10));
            speech.text = `The current weather in ${city} is ${weatherDescription}. The temperature is ${temperatureText} degrees Celsius.`;
            window.speechSynthesis.speak(speech);
            chatareamain.appendChild(showchatbotmsg(speech.text));
            // 在这里可以访问返回的天气数据，并进行相应的处理
        })
        .catch(error => {
            console.log('fetching the weather data error：', error);
        });
        currentQuestion = "";
    }

    if(currentQuestion != "weather"){
        window.speechSynthesis.speak(speech);
        chatareamain.appendChild(showchatbotmsg(speech.text));
    }
}

const convertNumberToText = (number) => {
    const numbers = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", 
      "eighteen", "nineteen"
    ];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    if (number === 0) {
      return "zero";
    }
    if (number < 20) {
      return numbers[number];
    }
    if (number < 100) {
      const digit = number % 10;
      const ten = Math.floor(number / 10);
      return `${tens[ten]} ${numbers[digit]}`.trim();
    }
    return number;
}

function playMusic() {
  // 首先检查是否已经在播放音乐，如果是，则先停止当前播放的音乐
  stopMusic();
  
  // 创建 audio 元素
  audioElement = new Audio();

  audioElement.src = 'music/beethovon1.mp3'; // 设置音乐文件的路径
  
  // 监听音乐播放结束事件，以便在结束后清除 audio 元素
  audioElement.addEventListener('ended', function() {
    audioElement = null;
  });
  
  // 播放音乐
  audioElement.play();
}

function stopMusic() {
  // 检查 audio 元素是否存在，如果存在，则停止播放音乐并清除 audio 元素
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement = null;
  }
}


recognition.onresult=function(e){
    let resultIndex = e.resultIndex;
    let transcript = e.results[resultIndex][0].transcript;
    chatareamain.appendChild(showusermsg(transcript));
    chatbotvoice(transcript);
    console.log(transcript);
}
recognition.onend=function(){
    mic.style.background="#ff3b3b";
}
mic.addEventListener("click", function(){
    mic.style.background='#39c81f';
    recognition.start();
    console.log("Activated");
})
