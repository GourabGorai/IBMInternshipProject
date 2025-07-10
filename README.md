# Salary Prediction Web Application

A Flask-based web application for predicting salaries based on various features like education, experience, location, job title, age, and gender. The application uses a Random Forest Regressor model trained on salary prediction data.

## Features

- **Machine Learning Model**: Uses Random Forest Regressor for salary prediction
- **Data Preprocessing**: Handles categorical features with One-Hot Encoding
- **Visualizations**: Generates four insightful plots:
  - Actual vs Predicted Salary comparison
  - Residuals distribution
  - Feature importance
  - Scatter plot of actual vs predicted values
- **Evaluation Metrics**: Calculates and displays Mean Squared Error (MSE) and R² score

## Requirements

- Python 3.x
- Flask
- pandas
- numpy
- scikit-learn
- matplotlib
- seaborn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/salary-prediction-app.git
   cd salary-prediction-app
   ```

2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Ensure you have a CSV file named `salary_prediction_data.csv` in the project directory with the required data format.

## Usage

1. Run the application:
   ```bash
   python app.py
   ```

2. Open your web browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```

3. Fill in the form with the required details:
   - Education level
   - Years of experience
   - Location
   - Job title
   - Age
   - Gender

4. Click "Predict" to see the predicted salary and model performance metrics.

## Project Structure

- `app.py`: Main Flask application file containing all the routes and model logic
- `static/plots/`: Directory where generated visualizations are stored
- `templates/`: Contains HTML templates (not included in the provided code)
- `salary_prediction_data.csv`: Dataset used for training the model

## Model Details

- **Algorithm**: Random Forest Regressor
- **Preprocessing**:
  - One-Hot Encoding for categorical features (Education, Location, Job_Title, Gender)
  - Numerical features (Experience, Age) passed through unchanged
- **Evaluation**:
  - Mean Squared Error (MSE)
  - R² score
