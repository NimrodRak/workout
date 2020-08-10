from flask import Flask, render_template, request, url_for
from json import dumps
import os
app = Flask(__name__)


@app.route('/')
def index():
    workouts_list = []
    for file_name in os.listdir("static/workouts"):
        with open("static/workouts/" + file_name) as file:
            workouts_list.append(file.readline().replace('\n', ''))

    return render_template("index.html", options=workouts_list)


@app.route('/workout')
def workout():

    workout = request.args.get("name")

    for file_name in os.listdir("static/workouts"):
        with open("./static/workouts/" + file_name) as file:
            name = file.readline().replace("\n", "")
            if name == workout:
                workout = file_name
                break

    with open(f'static/workouts/{workout}') as file:
        name = file.readline().replace('\n', '')
        exercise_list = []
        for line in file:
            splitted = line.replace('\n', '').split(", ")
            exercise_list.append({"name": splitted[0].capitalize(), "ex_time": int(splitted[1]) * 1000, "br_time": int(splitted[2]) * 1000})

    return render_template("workout.html", exercises_list=dumps(exercise_list), name=name)


if __name__ == '__main__':
    app.run(port=8080)
