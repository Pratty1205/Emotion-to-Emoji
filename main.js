var prediction1="";
var prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot() {
    Webcam.snap(function(data_uri)
    {
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">'
    }
    );
}
console.log(ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', model_loaded);
function model_loaded(){
    console.log("model_loaded");
}
function speak(){
var Synth=window.speechSynthesis;
var speak_data1="The First Prediction is "+prediction1;
var speak_data2="The Second Prediction is "+prediction2;
var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
Synth.speak(utter_this);
}
function check() {
    var img=document.getElementById("captured_image");
    classifier.classify(img , gotresult);
}
function gotresult(error , results) {
    if(error) {
        console.error(error)
    }
    else{
    console.log(results);
    document.getElementById("emotion_prediction1").innerHTML=results[0].label;
    document.getElementById("emotion_prediction2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if(results[0].label=="happy"){
        document.getElementById("emoji1").innerHTML="&#128512";
    }
    if(results[0].label=="sad"){
        document.getElementById("emoji1").innerHTML="&#128532";
    }
    if(results[0].label=="angry"){
        document.getElementById("emoji1").innerHTML="&#128545";
    }
    if(results[1].label=="happy"){
        document.getElementById("emoji2").innerHTML="&#128512";
    }
    if(results[1].label=="sad"){
        document.getElementById("emoji2").innerHTML="&#128532";
    }
    if(results[1].label=="angry"){
        document.getElementById("emoji2").innerHTML="&#128545";
    }
}
}