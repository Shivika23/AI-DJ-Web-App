song = ""

score_rwrist = 0;
score_lwrist = 0;

rwrist_x = 0;
rwrist_y = 0;

lwrist_x = 0;
lwrist_y = 0;

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()

    camera = createCapture(VIDEO)
    camera.hide()

    poseNet = ml5.poseNet(camera, model_loaded)
    poseNet.on('pose', gotPoses)
}

function model_loaded() {
    console.log("Model Loaded")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)

        score_rwrist = results[0].pose.keypoints[10].score;
        score_lwrist = results[0].pose.keypoints[9].score;

        lwrist_y = results[0].pose.leftWrist.y
        lwrist_x = results[0].pose.leftWrist.x

        rwrist_y = results[0].pose.rightWrist.y
        rwrist_x = results[0].pose.rightWrist.x
    }
}

function draw() {
    image(camera, 0, 0, 600, 500)

    fill("red")
    stroke("red")


    if (score_rwrist > 0.2) {
        circle(rwrist_x, rwrist_y, 20)

        //if the y position of the wrisy is between 0-100 speed is 0.5
        if (rwrist_y > 0 && rwrist_y <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x"
            song.rate(0.5)
        }

        //if the y position of the wrisy is between 100-200 speed is 1
        if (rwrist_y > 100 && rwrist_y <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x"
            song.rate(1)
        }

        //if the y position of the wrisy is between 200-300 speed is 1.5
        if (rwrist_y > 200 && rwrist_y <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x"
            song.rate(1.5)
        }

        //if the y position of the wrisy is between 300-400 speed is 2
        if (rwrist_y > 300 && rwrist_y <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x"
            song.rate(2)
        }

        //if the y position of the wrisy is between 400-500 speed is 2.5
        if (rwrist_y > 400 && rwrist_y <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
            song.rate(2.5)
        }



    }

    if (score_lwrist > 0.2) {
        circle(lwrist_x, lwrist_y, 20)
        //The value that we fetched from console for left wrist y is in string format-coverting it into number
        y_number = Number(lwrist_y)
        //removing the decimal value
        remove_decimal = floor(y_number)
        volume = remove_decimal / 500
        document.getElementById("volume").innerHTML = "Volume = " + volume
        song.setVolume(volume)
    }
}

function p_s() {
    song.play()
    song.rate(1) //1 is the normal speed <1 means slowed down, >1 means fastened up
    song.setVolume(1) //1 is the max value 0 is the min volume
}

function s_s() {
    song.stop()
}