# 💼 Machine Learning Salary Predictor

A sophisticated web application that predicts salaries based on various professional and demographic factors using machine learning algorithms. Built as an internship project for Edunet Foundation in collaboration with AICTE and IBM.

## 🎯 Project Overview

This salary prediction system uses Random Forest Regression to analyze and predict salaries based on:
- Education Level
- Years of Experience
- Location (Urban/Suburban/Rural)
- Job Title
- Age
- Gender

The application features an interactive web interface with real-time validation, multiple visual themes, and comprehensive model evaluation metrics.

![Application Overview](static/app-overview-screenshot.jpg)
*Main Application Interface - Showing the salary prediction form with real-time validation*

## 🏢 Internship Details

- **Company**: Edunet Foundation in collaboration with AICTE and IBM
- **Intern**: Gourab Gorai
- **Project**: Machine Learning Salary Predictor
- **Duration**: 6 weeks
- **Academic Background**: BCA - 2025 Passout Candidate

## ✨ Features

### Core Functionality
- **Salary Prediction**: Real-time salary prediction based on user inputs
- **Model Performance Metrics**: MSE and R² score display
- **Input Validation**: Comprehensive form validation with error handling
- **Interactive Visualizations**: Multiple plots for model evaluation

![Salary Prediction Result](static/prediction-result-screenshot.jpg)
*Salary Prediction Result - Displaying predicted salary with professional formatting*

![Model Performance Metrics](static/model-metrics-screenshot.jpg)
*Model Performance Metrics - MSE and R² score visualization with detailed statistics*

### User Interface
- **3D Matrix Background**: Animated cyberpunk-style background effects
- **Multiple Themes**: 
  - Matrix (Default): Green 3D textures with black background
  - Modern: White textures with blue background
  - Static: No animations, clean interface
- **Responsive Design**: Mobile-friendly interface
- **Real-time Feedback**: Instant validation and error messages

![User Interface Demo](static/ui-features-demo.jpg)
*User Interface Features - Real-time validation and responsive design demonstration*

![Mobile Responsive](static/mobile-responsive-screenshot.jpg)
*Mobile Responsive Design - Optimized interface for smartphones and tablets*

### Model Evaluation
- **Performance Metrics**: MSE and R² score calculation
- **Evaluation Table**: Detailed comparison of actual vs predicted values
- **Visual Analytics**: Four comprehensive plots:
  - Actual vs Predicted (Line Plot)
  - Residuals Distribution
  - Feature Importance
  - Scatter Plot Analysis

## 🛠️ Technology Stack

### Backend
- **Python 3.x**
- **Flask**: Web framework
- **Pandas**: Data manipulation and analysis
- **Scikit-learn**: Machine learning algorithms
- **Matplotlib & Seaborn**: Data visualization
- **NumPy**: Numerical computations

### Frontend
- **HTML5**: Structure and semantics
- **CSS3**: Styling with advanced animations
- **JavaScript (ES6+)**: Interactive functionality
- **Responsive Design**: Mobile-first approach

### Machine Learning
- **Algorithm**: Random Forest Regressor
- **Preprocessing**: One-Hot Encoding for categorical variables
- **Pipeline**: Scikit-learn Pipeline for streamlined processing
- **Validation**: Train-test split with performance metrics

## 📁 Project Structure

```
salary-predictor/
│
├── app.py                 # Main Flask application
├── salary_prediction_data.csv  # Training dataset
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── Styles.css        # CSS styling and themes
│   ├── Script.js         # JavaScript functionality
│   ├── plots/            # Generated model evaluation plots
│   └── assets/           # Company logos and icons
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip package manager

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/salary-predictor.git
cd salary-predictor
```

### Step 2: Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install flask pandas scikit-learn matplotlib seaborn numpy
```

### Step 4: Prepare Dataset
Ensure `salary_prediction_data.csv` is in the root directory with columns:
- Education
- Experience
- Location
- Job_Title
- Age
- Gender
- Salary

### Step 5: Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## 📊 Dataset Requirements

The application expects a CSV file named `salary_prediction_data.csv` with the following structure:

| Column | Data Type | Description | Valid Values |
|--------|-----------|-------------|--------------|
| Education | String | Educational qualification | High School, Bachelor, Master, PhD |
| Experience | Integer | Years of experience | 0-70 |
| Location | String | Work location type | Urban, Suburban, Rural |
| Job_Title | String | Job position | Director, Manager, Analyst, Engineer |
| Age | Integer | Age in years | 18-100 |
| Gender | String | Gender | Male, Female |
| Salary | Float | Monthly salary (target variable) | Positive numbers |

## 🎨 Theme System

The application features three distinct themes:

### Matrix Theme (Default)
- 3D animated green matrix background
- Cyberpunk aesthetic
- Dynamic floating elements

![Matrix Theme](static/matrix-theme-screenshot.jpg)
*Matrix Theme - Cyberpunk aesthetic with animated 3D green matrix background*

### Modern Theme
- Clean blue gradient background
- White accents instead of green
- Professional appearance

![Modern Theme](static/modern-theme-screenshot.jpg)
*Modern Theme - Clean blue gradient with white accents for professional appearance*

### Static Theme
- No background animations
- Optimized for performance
- Accessibility-friendly

![Static Theme](static/static-theme-screenshot.jpg)
*Static Theme - Clean interface without animations, optimized for performance*

Toggle between themes using the theme switcher button in the header.

## 🔍 Model Details

### Algorithm: Random Forest Regressor
- **Ensemble Method**: Uses multiple decision trees
- **Handles Non-linearity**: Captures complex relationships
- **Feature Importance**: Provides insights into variable significance
- **Robust**: Less prone to overfitting

### Preprocessing Pipeline
1. **Categorical Encoding**: One-Hot Encoding for categorical variables
2. **Feature Scaling**: Handled automatically by Random Forest
3. **Train-Test Split**: 80-20 split with random state for reproducibility

### Evaluation Metrics
- **Mean Squared Error (MSE)**: Measures average squared differences
- **R² Score**: Coefficient of determination (model fit quality)
- **Residual Analysis**: Distribution of prediction errors
- **Feature Importance**: Relative importance of each feature

## 📈 Model Evaluation Features

### Performance Visualization
1. **Actual vs Predicted Line Plot**: Shows model accuracy across samples
2. **Residuals Histogram**: Distribution of prediction errors
3. **Feature Importance Bar Chart**: Variable significance ranking
4. **Scatter Plot**: Correlation between actual and predicted values

![Model Performance Plots](static/model-evaluation-plots.jpg)
*Model Evaluation Plots - Comprehensive visualization of model performance metrics*

![Feature Importance Chart](static/feature-importance-chart.jpg)
*Feature Importance Analysis - Shows which factors most influence salary predictions*

### Evaluation Table
- Displays first 20 test samples
- Shows actual vs predicted salaries
- Calculates prediction errors and percentages
- Color-coded for easy interpretation

![Evaluation Table](static/evaluation-table-screenshot.jpg)
*Model Evaluation Table - Detailed comparison of actual vs predicted salaries with error metrics*

## 🛡️ Input Validation

### Comprehensive Validation Rules
- **Age-Experience Consistency**: Ensures logical relationship
- **Numerical Constraints**: Age (1-100), Experience (0-70)
- **Required Fields**: All inputs must be provided
- **Real-time Feedback**: Instant validation as user types

![Input Validation Demo](static/input-validation-demo.jpg)
*Input Validation System - Real-time validation with error highlighting and success indicators*

### Error Handling
- **File Validation**: Checks dataset existence and format
- **Data Quality**: Validates required columns and data types
- **Model Training**: Handles insufficient data scenarios
- **Prediction Errors**: Manages invalid inputs gracefully

![Error Handling](static/error-handling-screenshot.jpg)
*Error Handling - Comprehensive error messages and flash notifications*

## 🌐 Browser Compatibility

- **Chrome**: Fully supported
- **Firefox**: Fully supported
- **Safari**: Fully supported
- **Edge**: Fully supported
- **Mobile Browsers**: Responsive design optimized

## 📱 Responsive Design

- **Mobile-First**: Optimized for smartphones
- **Tablet Support**: Adapted layouts for tablets
- **Desktop**: Full-featured experience
- **Touch-Friendly**: Large buttons and touch targets

## 🚧 Development Notes

### Known Limitations
- Dataset must be in specific format
- Limited to predefined categorical values
- Requires manual dataset updates

### Future Enhancements
- Dynamic dataset upload functionality
- Additional ML algorithms comparison
- Export prediction results to PDF
- User authentication system
- Historical prediction tracking

## 👨‍💻 Developer Profile

**Gourab Gorai**
- BCA Student (2025 Passout)
- Passionate about AI/ML and innovative solutions
- **LinkedIn**: [Gourab Gorai](https://www.linkedin.com/in/gourab-gorai-4a51541ba)
- **Portfolio**: [gourabgorai.netlify.app](https://gourabgorai.netlify.app)

## 🎓 Acknowledgments

- **Edunet Foundation** for providing the internship opportunity
- **AICTE** for the collaboration and support
- **IBM** for the technical guidance and resources
- **Open Source Community** for the amazing libraries and tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues in the GitHub repository
2. Create a new issue with detailed description
3. Contact the developer through LinkedIn
---

**Made with ❤️ by Gourab Gorai as part of Edunet Foundation Internship Program**
