# # server/app/__init__.py
# from flask import Flask
# from flask_cors import CORS
# from .database import init_db
# from .main import main_bp


# def create_app():
#     app = Flask(__name__)

#     app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jobs.db"
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#     CORS(app)

#     init_db(app)

#     app.register_blueprint(main_bp)

#     return app
