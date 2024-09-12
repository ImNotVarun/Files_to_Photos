
# File to Image Converter

## Description

File to Image Converter is a web application that allows users to convert files into images and extract files from images. This project uses a React frontend and a Flask backend to provide a seamless file conversion experience.

I have created this project because i have a pixel phone that means i can upload all photos in the google phptos without limit , so i have just created this website now i can convert all my files to photos and upload them on the google photos

## Features

- Convert multiple files into a single image
- Extract files from an image
- User-friendly interface with drag-and-drop functionality
- Progress bar for upload and conversion processes

## Technologies Used

- Frontend:
  - React
  - Vite
  - Tailwind CSS
- Backend:
  - Flask
  - NumPy
  - Pillow (PIL)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- Python (v3.7 or later)
- npm or yarn

## Installation

### Frontend

1. Clone the repository:
   ```
   git clone https://github.com/your-username/file-to-image-converter.git
   cd file-to-image-converter
   ```

2. Install the dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Backend

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. (optional) Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables:
   ```
   VITE_API_URL=http://localhost:5000
   ```

## Running the Application

1. Start the backend server:
   ```
   python app.py
   ```

2. In a new terminal, start the frontend development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

## Contributing

Contributions to the File to Image Converter project are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

## Contact

If you want to contact me, you can reach me at <imnotvarun@gmail.com>.
