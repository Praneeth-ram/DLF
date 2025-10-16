## 🗄️ Database Fake Data Generation and Deployment

### 📋 **Project Overview**
This project creates a **PostgreSQL database**, generates **fake property management data** using the **Faker** package in Python, and inserts it into the database.  
The generated data includes:
- Users  
- Properties  
- Documents (auto-generated as PDFs using ReportLab)  
- Ownership history and enquiries  

The project was designed for testing and data simulation before integrating with a live application.  

---

### ⚙️ **Files Included**
| File Name | Description |
|------------|-------------|
| **`dlf_data_gen.py`** | Main Python script that creates the schema, generates fake data, and inserts it into the database. |
| **`.env`** | Contains environment variables for database credentials (DB name, user, password, and host). |
| **`requirements.txt`** | List of Python packages required to run the script. |

---

### 🧩 **Technologies & Libraries**
- **Python 3.9+**
- **PostgreSQL**
- **Render** (for deployment)
- **Faker** – to generate fake names, addresses, and text.  
- **psycopg2** – for PostgreSQL database connection.  
- **bcrypt** – for password hashing.  
- **tqdm** – for progress visualization.  
- **ReportLab** – for generating PDF documents.  
- **python-dotenv** – for managing environment variables.  

---

### 🚀 **Setup Instructions**
1. **Clone or extract** the project folder.
2. Create a **Python virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Set up your `.env` file** with your PostgreSQL database credentials:
   ```env
   DB_NAME="your_database_name"
   DB_USER="your_database_user"
   DB_PASSWORD="your_password"
   DB_HOST="your_database_host"
   ```
5. **Run the script** to create tables and insert fake data:
   ```bash
   python dlf_data_gen.py
   ```

---

### 🧠 **What the Script Does**
- Creates all required tables and relationships automatically.
- Inserts:
  - 50,000 fake users  
  - 10,000 fake properties  
  - 1 document (PDF) per property  
- Saves PDF documents directly into the database as binary data (`BYTEA`).
- Displays progress for each stage using `tqdm`.

---

### 🧩 **Deployment on Render**
The project was deployed on **Render**, but an issue occurred during database connection.  
Render required an **IP address to whitelist** for database access, and I was not sure how to connect without specifying a fixed IP.  

This README and the attached files reflect my independent work and the challenges I faced during the deployment phase.

---

### 🪪 **Author**
**Kumaresan Kanthasamy**  
Python Developer | Data Enthusiast  
📧 *kumaresk002@gmail.com*  
