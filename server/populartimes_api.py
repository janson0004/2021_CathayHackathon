import sys
import json
import os

from populartimes import populartimes
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")

lat1 = float(sys.argv[1])
lng1 = float(sys.argv[2])
lat2 = lat1 + 0.004
lng2 = lng1 + 0.03
# response = json.dumps(populartimes.get_id(API_KEY, "ChIJSYuuSx9awokRyrrOFTGg0GY"))
response = json.dumps(
    populartimes.get(
        API_KEY,
        ["restaurant"],
        (lat1, lng1),
        (lat2, lng2),
    )
)

# print(response)
print(response)
