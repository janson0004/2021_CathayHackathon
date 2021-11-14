# 2021 Cathay Hackerthon - Team 10 All IT Dragon

## What is this?

The code demonstrate how we utilitize Google Map API and Place API to let our users to check out the tourist attractions and restaurants nearby right when they land at their destination.

## Run it locally (Not in VM)

```
git clone https://github.com/janson0004/2021_CathayHackathon.git
```

### client

Navigate to client folder, install dependencies

```
cd client
npm install
```

Start the client side

```
npm start
```

#### Environment variable

Create a .env.local file under the client folder, and set the environment variable:

```
REACT_APP_MAP_API_KEY=your_google_api_key
```

### server

Navigate to client folder, install dependencies

```
cd server
npm install
```

Start the server side

```
npm start
```

#### Setup virtual environment for python

> mac

```
python3 -m venv env       # Create virtual environment
source env/bin/activate   # Get into virtual environment
```

```
deactivate                # Exit virtual environment
```

> windows

```
pip install virtualenv
virtualenv env
\env\Scripts\activate.bat
```

#### Install dependencies for python

```
pip3 install -r requirements.txt
```

```
cd populartimes
pip3 install .
```

#### Environment variable

Create a .env file under the server folder, and set the environment variable:

```
PORT=3001
NODE_ENV=development
JTW_TOKEN=your_token
API_KEY=your_google_api_key
```
