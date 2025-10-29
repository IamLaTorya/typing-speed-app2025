import os  # Import the os module
from flask import Flask, render_template

app = Flask(__name__, static_folder="/usercode/static", template_folder="/usercode/templates")

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    # Watch the current directory
    project_folder = os.path.abspath('.')
    # Use 0.0.0.0 to allow external connections within Docker
    app.run(host="0.0.0.0", port=8080, debug=True, extra_files=[project_folder])