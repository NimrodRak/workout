var exercises;
var part;
var exnum;
var beep = new Audio("static/beep.wav");
var baap = new Audio("static/baap.wav");
var t = 4;

function initialize(exercise_list) {
    exercises = exercise_list;
    document.getElementById('exname').hidden = false;
    document.getElementById('progress-bar').hidden = false;
    document.getElementById('extime').hidden = false;
    document.getElementById('start').hidden = true;
    //exercises = JSON.parse(exercises_list);
    part = 100 / exercises.length;
    exnum = "0 of " + exercises.length;
    document.getElementById('exname').innerHTML = "0 of " + exercises.length + " | Hasn't started yet"
    displayExercise(0);
}

function displayExercise(i, j = true) {
    if (j) { // if this is before the 5 - second count
        baap.play();
        exnum = i + 1 + exnum.slice(1 + Math.floor(i / 10), exnum.length); // increment the progress
        document.getElementById('extime').innerHTML = ""; // reset the timer
        document.getElementById('exname').innerHTML = exnum + " | " + exercises[i]['name']; // update the name
        t = 4;
        setTimeout(() => {
            displayExercise(i, false); // call the function again, but this time with the timer
        }, exercises[i]['ex_time'] - 5000);
    } else { // we do need a timer
        var id = setInterval(() => {
            if (t !== 0) { // if we are in the middle of the timer
                document.getElementById('extime').innerHTML = t;
                beep.play();
                t--;
            } else { // if the timer is over
                clearInterval(id); // stop the interval
                baap.play(); // play the break baap
                document.getElementById('extime').innerHTML = "Break";
                document.getElementById('exname').innerHTML = "Next Up: " + exercises[i + 1]['name'];
                document.getElementById('progress-bar').value = (i + 1) * part;
                if (i < exercises.length - 1) { // if this is not the last exercise
                    setTimeout(() => { // continue to the next exercise after the break
                        displayExercise(i + 1);
                    }, exercises[i]['br_time']);
                }
            }
        }, 1000);
    }
}