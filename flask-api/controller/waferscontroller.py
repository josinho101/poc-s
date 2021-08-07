import sys
from flask import Blueprint, jsonify, request
from database import mongo
from bson.json_util import dumps
from bson.objectid import ObjectId

wafers_controller = Blueprint("wafers_controller", __name__)


@wafers_controller.route("/<wafer_id>/defects")
def get_wafer_defects(wafer_id):
    try:
        defects = mongo.db.WaferDefects.find(
            {"waferId": ObjectId(wafer_id)},
            {"_id": 0, "xRel": 1, "yRel": 1, "xIndex": 1, "yIndex": 1})
        return dumps(defects)
    except:
        e = sys.exc_info()[0]
        print("Unexpected error:", e)
