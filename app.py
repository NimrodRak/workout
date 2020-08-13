from flask import Flask, render_template, request
from json import dumps
import os

app = Flask(__name__)


@app.route("/")
def index():
    workouts_list = []
    for file_name in os.listdir("static/workouts"):
        workouts_list.append(file_name.strip(".csv"))
    return render_template("index.html", options=workouts_list)


@app.route("/workout")
def workout():
    workout = request.args.get("name")
    # TODO: Check input to avoid security bugs

    if not os.path.isfile(f"static/workouts/{workout}.csv"):
        # TODO: Handle error
        pass

    with open(f"static/workouts/{workout}.csv") as file:
        exercise_list = []
        # TODO: parse as CSV
        for line in file:
            splitted = line.replace("\n", "").split(", ")
            # TODO: make calculations more simple
            exercise_list.append({"name": splitted[0].capitalize(), "exercise_time": int(splitted[1]) * 1000, "break_time": int(splitted[2]) * 1000})

    return render_template("workout.html", exercises_list=dumps(exercise_list), name=workout)


if __name__ == '__main__':
    app.run(port=8080)
