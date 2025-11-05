# Career Page Builder

A full-stack web application that allows recruiters to easily create and manage their company’s career pages.  
It provides recruiters the flexibility to customize branding, add job listings, and preview how their public careers page will look before publishing.

## Features
- Upload and import job data from Excel
- Manage company details and branding
- Preview career page before publishing
- Enable/disable recruiter-side features
- Clean, responsive, and fast UI built with Tailwind + React

## Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend: FastAPI (Python)
- Database: SQLite
- Deployment: Vercel (Frontend)
- Version Control: Git + GitHub

## Future Improvements
- Add drag-and-drop section ordering
- Support video embedding for company intros
- SEO metadata and social preview optimization
- Accessibility improvements (ARIA labels, alt text)

-------------------------------------------------------------------------------------------------------------------------------------------------------

## How to Run the Project

### 1. Clone the Repository
git clone https://github.com/Bipasha02/CareersPageBuilder  
cd CareersPageBuilder

### 2. Setup the Backend (FastAPI)
cd server  
python3 -m venv .venv  
source .venv/bin/activate  
pip install -r requirements.txt  
uvicorn app.main:app --reload  

### 3. Setup the Frontend (React + Vite)
cd ../client  
npm install  
npm run dev  
