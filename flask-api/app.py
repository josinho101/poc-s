from flask import Flask
from database import mongo
from controller.waferscontroller import wafers_controller

app = Flask(__name__)
app.config.from_pyfile('config.py')
mongo.init_app(app)

# register routes
app.register_blueprint(wafers_controller, url_prefix="/api/wafers")
