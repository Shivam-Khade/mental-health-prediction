from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os
import sklearn.compose._column_transformer

# Monkeypatch for scikit-learn version differences when unpickling
class _RemainderColsList(list):
    pass
sklearn.compose._column_transformer._RemainderColsList = _RemainderColsList

app = FastAPI(title="Mental Health Prediction API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
# Assuming main.py is in 'backend' dir and the model is in the parent dir
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "Mental_Health_Model.pkl")

model = None
try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")

class PredictionInput(BaseModel):
    Age: int
    Gender: str
    Academic_Level: str
    Most_Used_Platform: str
    Purpose_Of_Use: str
    Avg_Daily_Usage_Hours: float
    Daily_Unlocks: int
    Study_Hours: float
    Physical_Activity_Hours: float
    Sleep_Hours_Per_Night: float
    Stress_Level: str
    Grouped_country: str

@app.get("/")
def read_root():
    return {"message": "Mental Health Prediction API is running"}

@app.post("/predict")
def predict_mental_health(data: PredictionInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded.")
    
    # Convert input to DataFrame
    input_data = data.model_dump()
    df = pd.DataFrame([input_data])
    
    try:
        # Predict using the loaded model pipeline
        prediction = model.predict(df)
        score = float(prediction[0])
        # The score is typically out of 10, let's round it to 1 decimal place
        return {"Mental_Health_Score": round(score, 1)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
