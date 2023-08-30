let mic = document.getElementById("mic");
let audioElement = null;
let chatareamain = document.querySelector('.chatarea-main');
let chatareaouter = document.querySelector('.chatarea-outer');

// 添加多轮对话控制条件
let currentQuestion = "";

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
    const speech2 = new SpeechSynthesisUtterance();
    speech.text = "";
    speech2.text = "";
    
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
    if(currentQuestion == "stop_music_error"){
        // apology
        // 立刻变成沮丧的表情
        var random = Math.random();
        if (random < 0.5) {
            face_url = face2_url;
        } else {
            face_url = face3_url;
        } 
        stopMusic();
        speech.text = "Sorry for the mistake."
        currentQuestion = ""
        // 间隔3s回到初始表情
        setTimeout(function() {
            face_url = face1_url; // 将face_url更新为face1_url
        }, 3000); // 过10秒更新face_url
    }
    if (message.includes('stop music')) {
        // 调用播放音乐的函数
        // stopMusic();
        // speech.text = "Sure, music stopped";
        currentQuestion = "stop_music_error" 
    }

    if(currentQuestion == "music_error"){
        if (message.includes('classical')) {
            // apology
            // 立刻变成沮丧的表情
            var random = Math.random();
            if (random < 0.5) {
                face_url = face2_url;
            } else {
                face_url = face3_url;
            } 
            // 调用播放音乐的函数
            playMusic('classical');
            speech.text = "I messed things up. Sorry for the mistake.";
            currentQuestion = "";
            // 间隔3s回到初始表情
            setTimeout(function() {
                face_url = face1_url; // 将face_url更新为face1_url
            }, 3000); // 过10秒更新face_url
        }
    }

    if (currentQuestion == "music1") {
        if (message.includes('classical')) {
          // 调用播放音乐的函数
          playMusic('rock');
          speech.text = "Sure, this is Hawk Nelson's music Sold Out";
          currentQuestion = "music_error";
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

    if(currentQuestion == "bing_error"){
        if(['search','google'].some(x => message.includes(x)) ){
            // apology
            // 立刻变成沮丧的表情
            var random = Math.random();
            if (random < 0.5) {
                face_url = face2_url;
            } else {
                face_url = face3_url;
            } 
            speech.text = " Sorry, my bad, now I open it."
            searchOnGoogle("London")
            currentQuestion = ""
            // 间隔3s回到初始表情
            setTimeout(function() {
                face_url = face1_url; // 将face_url更新为face1_url
            }, 3000); // 过10秒更新face_url
        }
    }else{
        if(['search','google'].some(x => message.includes(x)) ){
            speech.text = "Sure, search it now.";
            searchOnBing("")
            currentQuestion = "bing_error"
        }
    }

    if (currentQuestion == "Email2") {  
        if(['yes','sure','ok'].some(x => message.includes(x))){
            speech.text = "Email sent";
            currentQuestion = "";  
        }else if(['no','not'].some(x => message.includes(x))){
            // apology
            // 立刻变成沮丧的表情
            var random = Math.random();
            if (random < 0.5) {
                face_url = face2_url;
            } else {
                face_url = face3_url;
            } 
            speech.text = "Sorry for the mistake, I will send an Email to Jack, “I will go to London today."
            currentQuestion = "Email2";
            // 间隔3s回到初始表情
            setTimeout(function() {
                face_url = face1_url; // 将face_url更新为face1_url
            }, 3000); // 过10秒更新face_url
        }
        else{
            speech.text = "Please say your Email content again";
            currentQuestion = "Email1";
        }
    }
    
    if (currentQuestion == "Email1") {   
        speech.text = "Ready to send an Email to Jack, I will go to London to do";
        currentQuestion = "Email2";   
    }

    if (message.includes('email')) {
        speech.text = "What content do you want to write to Jack";
        currentQuestion = "Email1";
    }



    if(currentQuestion != "weather_error1"){ 
        //weather mode
        if (['temperature','weather'].some(x => message.includes(x))) {
            // apology
            // 立刻变成沮丧的表情
            var random = Math.random();
            if (random < 0.5) {
                face_url = face2_url;
            } else {
                face_url = face3_url;
            }
            speech.text = " Sorry, I don’t have any clue about the feathers";
            speech2.text = "Emm, it seems I get something wrong. Could you repeat it again";
            currentQuestion = "weather_error1";
            // 间隔3s回到初始表情
            setTimeout(function() {
                face_url = face1_url; // 将face_url更新为face1_url
            }, 5000); // 过10秒更新face_url
        }
    }else{
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
    
    
    window.speechSynthesis.speak(speech);
    if(speech.text!=""){
        chatareamain.appendChild(showchatbotmsg(speech.text));
    }  
    window.speechSynthesis.speak(speech2);
    if(speech2.text!=""){
        chatareamain.appendChild(showchatbotmsg(speech2.text));
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
  
function searchOnBing(keyword) {
    var searchUrl = "https://www.bing.com/search?q=" + encodeURIComponent(keyword);
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
})