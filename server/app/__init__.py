# # server/app/__init__.py
# from flask import Flask
# from flask_cors import CORS
# from .database import init_db
# from .main import main_bp


# def create_app():
#     app = Flask(__name__)

#     # Configure the database
#     app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///jobs.db"
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#     # Enable CORS
#     CORS(app)

#     # Initialize database
#     init_db(app)

#     # Register routes
#     app.register_blueprint(main_bp)

#     return app
