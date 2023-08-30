let mic = document.getElementById("mic");
let audioElement = null;
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');



// 添加多轮对话控制条件
let currentQuestion = "";
let email_content="";

let intro = [
    "Hello, I am Emma", 
    "Hi, I am a Emma Robot", 
    "Hello, My name is Emma"
];
let help = ["How may i assist you?","How can I help you?","What I can do for you?"];
let greetings = [
    "I am Emma, your artificial intelligence assistant", 
    "Hello, I am Emma. I am enjoying the happy day, what about you", 
    "Hello, have a nice day, I am Emma", 
    "I am Emma, how are you."
];

let hobbies = ["I love to talk with humans", "i like to make friends like you", "i like cooking"];
let pizzas = [
    "Which type of pizza do you like", 
    "I can make a pizza for you", 
    "I would love to make a pizza for you", 
    "would you like cheese pizza?"
];
let thank = ["Most welcome","Not an issue","Its my pleasure","Mention not"];
let closing = ['Ok bye-bye','As you wish, bye take-care','Bye-bye, see you soon']
let introduce_me = [
    'Hello, this is Emma, your voice artifical assistant',
    'Hello, I am your assistant named Emma'
]

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// 初始的声音
// window.onload = init;
// function init() {
//     const speech_init = new SpeechSynthesisUtterance();
//     speech_init.text = "test test test test"
//     console.log("test")
//     window.speechSynthesis.speak(speech_init);
//     if(speech_init.text != ""){
//         chatareamain.appendChild(showchatbotmsg(speech_init.text));
//     } 
// }



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
    speech.text = "";

    for (var i = 0; i < freechat_data.length; i++) {
        var subArray = freechat_data[i];
        var wakeups = subArray[0]
        var responses = subArray[1]
        if(wakeups.some(x => message.includes(x)) ){
            let finalresult = responses[Math.floor(Math.random() * responses.length)];
            speech.text = finalresult;
        }
    }
    
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
    if(['tell me something about you','your hobbies'].some(x => message.includes(x)) ){
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
    if(message.includes('bye')){
        let finalresult = closing[Math.floor(Math.random() * closing.length)];
        speech.text = finalresult;
    }
    // music mode
    if (message.includes('stop music')) {
        // 调用播放音乐的函数
        stopMusic();
        speech.text = "Music stopped";
        
    }
    
    if (currentQuestion == "music1") {
        if (message.includes('classical')) {
          // 调用播放音乐的函数
            playMusic('classical');
            speech.text = "Sure, this is Beethoven music symphony of fate";
            currentQuestion = "";
        }
        else if (message.includes('rock')) {
            // 调用播放音乐的函数
              playMusic('rock');
              speech.text = "Sure, this is Hawk Nelson's music Sold Out";
              currentQuestion = "";
        }
        else{
            speech.text = "Sorry, we do not have that music";
            currentQuestion = "";
        }
    }

    if (message.includes('play music')) {
        speech.text = "What kind of music would you like";
        currentQuestion = "music1"
    }

    if (currentQuestion =="google1") {  
        speech.text = "Sure, search "+ message +" now.";
        searchOnGoogle(message); // 在新窗口或标签页中打开 Google，并搜索 message 内容
        currentQuestion = "" 
    }   
    if(['search','google'].some(x => message.includes(x)) ){
        speech.text = "What is your search keyword";   
        currentQuestion = "google1"
    }

    
    
    if (currentQuestion == "Email2") {  
        if(['yes','sure','ok'].some(x => message.includes(x))){
            
            $.ajax({
                url: '/send-email/',
                type: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken') // 在请求中包含CSRF令牌
                },
                data: {
                    action: 'send_email',
                    message: email_content,
                },
                success: function(response) {
                    console.log(response);
                }
            });
            
            email_content = ""
            speech.text = "Email sent";
            currentQuestion = "";  
        }
        else{
            speech.text = "Please say your Email content again";
            currentQuestion = "Email1";
        }
    }
    
    if (currentQuestion == "Email1") {   
        speech.text = "Ready to send the Email:" + message + " to Jack.";
        email_content = message
        currentQuestion = "Email2";   
    }

    if (message.includes('email')) {
        speech.text = "What content do you want to write to Jack";
        currentQuestion = "Email1";
    }

    //weather mode
    if (['temperature','weather'].some(x => message.includes(x))) {
        // speech.text = "Which city you want to search";
        var apiKey = 'b90244460d6d9cf80458c4d3d9a4ccd6';
        var city = 'London';

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
        if(speech.text!=""){
            chatareamain.appendChild(showchatbotmsg(speech.text));
        }  
    }
}

const convertNumberToText = (number) => {
    const numbers = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", 
      "eighteen", "nineteen"
    ];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    if (number == 0) {
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

function playMusic(music_type) {
    // 首先检查是否已经在播放音乐，如果是，则先停止当前播放的音乐
    stopMusic();
    
    // 创建 audio 元素
    audioElement = new Audio();
    if(music_type =="classical"){
        audioElement.src = classical_music_url
    }
    else if(music_type =="rock"){
        audioElement.src = rock_music_url
    }
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

function searchOnGoogle(keyword) {
    var searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(keyword);
    window.open(searchUrl, "_blank");
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

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


