from flask import Flask, render_template, request
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "static/plots"

model = None

def train_model():
    global model

    # Ensure plot directory exists
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # Load data
    file_path = "salary_prediction_data.csv"
    df = pd.read_csv(file_path)

    X = df.drop("Salary", axis=1)
    y = df["Salary"]

    categorical_features = ["Education", "Location", "Job_Title", "Gender"]
    numerical_features = ["Experience", "Age"]

    preprocessor = ColumnTransformer(
        transformers=[("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)],
        remainder="passthrough"
    )

    model_pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("regressor", RandomForestRegressor(random_state=42))
    ])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model_pipeline.fit(X_train, y_train)

    y_pred = model_pipeline.predict(X_test)

    # Evaluation Metrics
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    # Plot 1: Actual vs Predicted (Line Plot)
    plt.figure(figsize=(10, 5))
    plt.plot(y_test.values[:50], label='Actual', marker='o')
    plt.plot(y_pred[:50], label='Predicted', marker='x')
    plt.title("Actual vs Predicted Salary (Sample 50)")
    plt.xlabel("Sample Index")
    plt.ylabel("Salary")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(os.path.join(app.config["UPLOAD_FOLDER"], "actual_vs_predicted.png"))
    plt.close()

    # Plot 2: Residuals Distribution
    residuals = y_test - y_pred
    plt.figure(figsize=(8, 5))
    sns.histplot(residuals, kde=True, bins=30)
    plt.title("Distribution of Residuals")
    plt.xlabel("Residuals")
    plt.tight_layout()
    plt.savefig(os.path.join(app.config["UPLOAD_FOLDER"], "residuals.png"))
    plt.close()

    # Plot 3: Feature Importance
    if hasattr(model_pipeline.named_steps["regressor"], "feature_importances_"):
        feature_names = model_pipeline.named_steps["preprocessor"].get_feature_names_out()
        importances = model_pipeline.named_steps["regressor"].feature_importances_

        feat_imp = pd.Series(importances, index=feature_names).sort_values(ascending=False)

        plt.figure(figsize=(10, 6))
        sns.barplot(x=feat_imp.values, y=feat_imp.index)
        plt.title("Feature Importance")
        plt.tight_layout()
        plt.savefig(os.path.join(app.config["UPLOAD_FOLDER"], "feature_importance.png"))
        plt.close()

    # Plot 4: Scatter Plot of Actual vs Predicted
    plt.figure(figsize=(6, 6))
    sns.scatterplot(x=y_test, y=y_pred)
    plt.xlabel("Actual Salary")
    plt.ylabel("Predicted Salary")
    plt.title("Scatter Plot: Actual vs Predicted")
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')  # Line y=x
    plt.tight_layout()
    plt.savefig(os.path.join(app.config["UPLOAD_FOLDER"], "scatter_plot.png"))
    plt.close()

    model = model_pipeline
    return mse, r2


@app.route("/", methods=["GET", "POST"])
def index():
    predicted_salary = None
    mse, r2 = train_model()

    if request.method == "POST":
        education = request.form["education"]
        experience = int(request.form["experience"])
        location = request.form["location"]
        job_title = request.form["job_title"]
        age = int(request.form["age"])
        gender = request.form["gender"]

        user_input = pd.DataFrame([{
            "Education": education,
            "Experience": experience,
            "Location": location,
            "Job_Title": job_title,
            "Age": age,
            "Gender": gender
        }])

        predicted_salary = model.predict(user_input)[0]

    return render_template(
        "index.html",
        predicted_salary=predicted_salary,
        mse=round(mse, 2),
        r2=round(r2, 2),
        plot_paths=[
            "static/plots/actual_vs_predicted.png",
            "static/plots/residuals.png",
            "static/plots/feature_importance.png",
            "static/plots/scatter_plot.png"
        ]
    )


if __name__ == "__main__":
    app.run(debug=True)
