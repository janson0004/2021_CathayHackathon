import sys
import json
import os

from populartimes import populartimes
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")


# response = json.dumps(populartimes.get_id(API_KEY, "ChIJSYuuSx9awokRyrrOFTGg0GY"))
response = json.dumps(
    populartimes.get(
        API_KEY,
        [
            "shopping_mall",
        ],
        (22.29385026449464, 114.16952061043037),
        (22.304930063697, 114.16204633104684),
    )
)

# print(response)
print(response)
