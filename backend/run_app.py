import subprocess
import signal
import sys
import time
import os
from flask import Flask, send_from_directory
from app import app as flask_blueprint

# Create the Flask app to serve static files
main_app = Flask(__name__, static_folder='frontend/dist')

# Serve static files and the React frontend


@main_app.route('/', defaults={'path': ''})
@main_app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(main_app.static_folder, path)):
        return send_from_directory(main_app.static_folder, path)
    else:
        return send_from_directory(main_app.static_folder, 'index.html')


# Register the Flask Blueprint for API routes
main_app.register_blueprint(flask_blueprint)


def run_flask():
    return subprocess.Popen(['gunicorn', 'run_app:main_app'], env=dict(os.environ, FLASK_APP='run_app.py'))


if __name__ == '__main__':
    flask_process = run_flask()
    try:
        flask_process.wait()
    except KeyboardInterrupt:
        flask_process.terminate()
        sys.exit(0)
