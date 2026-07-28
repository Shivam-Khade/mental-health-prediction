# Mental Health Predictor API & Web App

A full-stack machine learning application designed to predict a user's mental health score based on their digital habits, social media usage, and lifestyle factors. 

## 🚀 Features

- **Machine Learning Model**: Utilizes a robust scikit-learn Random Forest regression model trained on student social media usage and mental health data.
- **FastAPI Backend**: A high-performance Python backend that loads the pre-trained `.pkl` model and serves real-time predictions via a RESTful API endpoint.
- **React Frontend**: A stunning, premium dark-mode UI built with React and Vite. It features responsive glassmorphism design, custom styling, and seamless API integration.
- **Dynamic Inputs**: Users can input various factors such as daily screen time, social media platforms, physical activity, and sleep hours to receive an instant mental health score prediction.

## 🛠️ Technology Stack

- **Backend**: Python, FastAPI, scikit-learn, pandas, joblib, uvicorn
- **Frontend**: React.js, Vite, Vanilla CSS (Premium Theme)
- **Model**: Random Forest Regressor, Custom ColumnTransformers

## 🚦 How to Run

### 1. Start the Backend API
Navigate to the `backend` directory and start the FastAPI server:
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*The API will be available at `http://localhost:8000`*

### 2. Start the Frontend App
Open a new terminal, navigate to the `frontend` directory, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
*The frontend web app will be available at `http://localhost:5173`*

## 🧠 About the Data
The prediction model is trained on survey data encompassing students' academic levels, daily phone unlocks, study hours, physical activity, and stress levels to determine a holistic mental health score (out of 10).
