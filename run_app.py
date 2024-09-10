import subprocess
import signal
import sys
import time
from flask import Flask, send_from_directory
import os
from app import app as flask_blueprint

main_app = Flask(__name__, static_folder='dist')


@main_app.route('/', defaults={'path': ''})
@main_app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(main_app.static_folder + '/' + path):
        return send_from_directory(main_app.static_folder, path)
    else:
        return send_from_directory(main_app.static_folder, 'index.html')


main_app.register_blueprint(flask_blueprint)


def run_vite_dev_server():
    return subprocess.Popen(['npm', 'run', 'dev'], cwd='.', shell=True)


def run_flask():
    return subprocess.Popen(['flask', 'run', '--port', '5000'], env=dict(os.environ, FLASK_APP='run_app.py'))


if __name__ == '__main__':
    flask_process = run_flask()
    time.sleep(2)  # Give Flask some time to start up

    vite_process = run_vite_dev_server()

    def signal_handler(sig, frame):
        vite_process.terminate()
        flask_process.terminate()
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    try:
        flask_process.wait()
        vite_process.wait()
    except KeyboardInterrupt:
        vite_process.terminate()
        flask_process.terminate()
