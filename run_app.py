from flask import Flask
from app import app as flask_blueprint

main_app = Flask(__name__)
main_app.register_blueprint(flask_blueprint)

if __name__ == '__main__':
    main_app.run()
