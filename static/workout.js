var exercises;
var part;
var exerciseNumber;
var beep = new Audio("static/beep.wav");
var baap = new Audio("static/baap.wav");
var t = 4;

function initialize(exercise_list) {
    exercises = exercise_list;
    document.getElementById('exercise-name').hidden = false;
    document.getElementById('progress-bar').hidden = false;
    document.getElementById('exercise-time').hidden = false;
    document.getElementById('start').hidden = true;

    part = 100 / exercises.length;
    exerciseNumber = "0 of " + exercises.length;
    document.getElementById('exercise-name').innerHTML = "0 of " + exercises.length + " | Hasn't started yet";
    
    displayExercise(0);
}

function displayExercise(i, j = true) {
    if (j) { // if this is before the 5 - second count
        baap.play();
        exerciseNumber = i + 1 + exerciseNumber.slice(1 + Math.floor(i / 10), exerciseNumber.length); // increment the progress
        document.getElementById('exercise-time').innerHTML = ""; // reset the timer
        document.getElementById('exercise-name').innerHTML = exerciseNumber + " | " + exercises[i]['name']; // update the name
        t = 4;
        setTimeout(() => {
            displayExercise(i, false); // call the function again, but this time with the timer
        }, exercises[i]['exercise_time'] - 5000);
    } else { // we do need a timer
        var id = setInterval(() => {
            if (t !== 0) { // if we are in the middle of the timer
                document.getElementById('exercise-time').innerHTML = t;
                beep.play();
                t--;
            } else { // if the timer is over
                clearInterval(id); // stop the interval
                baap.play(); // play the break baap
                document.getElementById('exercise-time').innerHTML = "Break";
                document.getElementById('exercise-name').innerHTML = "Next Up: " + exercises[i + 1]['name'];
                document.getElementById('progress-bar').value = (i + 1) * part;
                if (i < exercises.length - 1) { // if this is not the last exercise
                    setTimeout(() => { // continue to the next exercise after the break
                        displayExercise(i + 1);
                    }, exercises[i]['break_time']);
                }
            }
        }, 1000);
    }
}