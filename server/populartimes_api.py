import sys
import json
import os

from populartimes import populartimes
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")


response = json.dumps(populartimes.get_id(API_KEY, "ChIJSYuuSx9awokRyrrOFTGg0GY"))
response2 = json.dumps(
    populartimes.get(
        API_KEY,
        ["restaurant"],
        (22.3055811, 114.1903980),
        (22.3160481, 114.2645496),
    )
)

# print(response)
print(response2)
