import { useState } from 'react'
import './index.css'

function App() {
  const [formData, setFormData] = useState({
    Age: 21,
    Gender: 'Male',
    Academic_Level: 'Undergraduate',
    Most_Used_Platform: 'Facebook',
    Purpose_Of_Use: 'Networking',
    Avg_Daily_Usage_Hours: 4.0,
    Daily_Unlocks: 100,
    Study_Hours: 4.5,
    Physical_Activity_Hours: 2.0,
    Sleep_Hours_Per_Night: 7.0,
    Stress_Level: 'Medium',
    Grouped_country: 'Other'
  });

  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setScore(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setScore(data.Mental_Health_Score);
    } catch (err) {
      setError(err.message || 'Failed to fetch prediction. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Mental Health AI</h1>
        <p>Predict your mental well-being score based on digital habits.</p>
      </header>

      <div className="glass-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            
            <div className="input-group">
              <label htmlFor="Age">Age</label>
              <input type="number" name="Age" id="Age" className="input-field" value={formData.Age} onChange={handleChange} required min="10" max="100"/>
            </div>

            <div className="input-group">
              <label htmlFor="Gender">Gender</label>
              <select name="Gender" id="Gender" className="input-field" value={formData.Gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="Academic_Level">Academic Level</label>
              <select name="Academic_Level" id="Academic_Level" className="input-field" value={formData.Academic_Level} onChange={handleChange}>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="Grouped_country">Country</label>
              <input type="text" name="Grouped_country" id="Grouped_country" className="input-field" value={formData.Grouped_country} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <label htmlFor="Most_Used_Platform">Most Used Platform</label>
              <select name="Most_Used_Platform" id="Most_Used_Platform" className="input-field" value={formData.Most_Used_Platform} onChange={handleChange}>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Snapchat">Snapchat</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="YouTube">YouTube</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="Purpose_Of_Use">Purpose Of Use</label>
              <select name="Purpose_Of_Use" id="Purpose_Of_Use" className="input-field" value={formData.Purpose_Of_Use} onChange={handleChange}>
                <option value="Networking">Networking</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="News">News</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="Avg_Daily_Usage_Hours">Daily Usage (Hours)</label>
              <input type="number" step="0.1" name="Avg_Daily_Usage_Hours" id="Avg_Daily_Usage_Hours" className="input-field" value={formData.Avg_Daily_Usage_Hours} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <label htmlFor="Daily_Unlocks">Daily Phone Unlocks</label>
              <input type="number" name="Daily_Unlocks" id="Daily_Unlocks" className="input-field" value={formData.Daily_Unlocks} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <label htmlFor="Study_Hours">Study Hours</label>
              <input type="number" step="0.1" name="Study_Hours" id="Study_Hours" className="input-field" value={formData.Study_Hours} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <label htmlFor="Physical_Activity_Hours">Physical Activity (Hours)</label>
              <input type="number" step="0.1" name="Physical_Activity_Hours" id="Physical_Activity_Hours" className="input-field" value={formData.Physical_Activity_Hours} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <label htmlFor="Sleep_Hours_Per_Night">Sleep (Hours)</label>
              <input type="number" step="0.1" name="Sleep_Hours_Per_Night" id="Sleep_Hours_Per_Night" className="input-field" value={formData.Sleep_Hours_Per_Night} onChange={handleChange} required/>
            </div>

            <div className="input-group">
              <label htmlFor="Stress_Level">Stress Level</label>
              <select name="Stress_Level" id="Stress_Level" className="input-field" value={formData.Stress_Level} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>

          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Predicting...' : 'Get Mental Health Score'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {score !== null && !error && (
          <div className="result-container">
            <div className="result-score">{score} / 10</div>
            <div className="result-label">Predicted Mental Health Score</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
