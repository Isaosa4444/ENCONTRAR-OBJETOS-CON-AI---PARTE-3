objects = [];
status="";
function preload() {
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.position(520, 100);
    video=createCapture(VIDEO);
    video.size();
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Estado: objecto detectado";
            fill("#FFOOOO");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FFOOOO");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML= object_name+ " encontrado";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+ " objeto encontrado");
                synth.speak(utterThis);
            }
            
            else{
                document.getElementById("object_status").innerHTML= object_name+ " objeto no encontrado";
            }

        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Estado: detectando objetos";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Modelo cargado");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}