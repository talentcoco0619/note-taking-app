# Daily Notes Project
## Overview
The Daily Notes project is a web application that allows users to create, manage, and delete notes. Each note can include text and audio. The project is built using Django and Django REST Framework for the backend, and React with Vite, TypeScript, TailwindCSS, and Ant Design for the frontend.

## Features:
- User registration and authentication (JWT-based)
- Users can create, read, update, and delete their notes
- Audio recording and playback integrated via react-audio-voice-recorder
- Only authenticated users can perform CRUD operations
- Backend testing with pytest and frontend testing with jest
- Admin page for managing user is_active field is not built (can be set directly in the DBMS)

## Assumptions
- Admin Management of User Status: The is_active field, which controls user login access, can be toggled directly in the database. There is no admin interface to manage this.
- Audio Recording: The frontend utilizes the react-audio-voice-recorder module to allow users to record voice and attach it to their notes.
- Database: PostgreSQL is used for data storage. The schema includes user and note models.
- Testing: Automated unit tests are written with jest for the frontend and pytest for the backend.

## Technical Design & Architecture
### Backend
- Django and Django REST Framework (DRF) are used to expose a REST API for interacting with the application’s data.
- User model: A custom user model is used, which includes fields such as email, username, password, and is_active. The is_active field determines whether a user can log in.
- Notes model: The note model has fields such as title, description, audio, date, and user_id (to associate notes with users).
- JWT Authentication: Users authenticate using JSON Web Tokens (JWT).
- Testing: Backend functionality is tested using pytest, with separate test cases for API endpoints and business logic.

### Frontend
- React is used for building the user interface with TypeScript for static type checking.
- Vite is used as the build tool for fast development and production builds.
- TailwindCSS is used for styling the components, and Ant Design is used for ready-made UI components like forms and buttons.
- Voice Recorder: react-audio-voice-recorder allows users to record audio and save it along with notes.
- State Management: React's built-in state management is used along with hooks for component-level state.


## Running the Application(with Docker command)
```bash
docker-compose up -d --build
```

## Running the Application(without Docker command)

### Backend
1.Clone the repository:
```bash
git clone https://github.com/talentcoco0619/note-taking-app.git
cd note-taking-app
```

2.Install Python dependencies:

```bash
cd backend
python -m venv venv
venv/Scripts/activate
pip install -r requirement.txt
```

3.Set up the PostgreSQL database:
- Make sure you have PgAdmin installed and running.
- Create a database named daily_notes (or use the name defined in settings.py).
- Apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

4.Start the backend server:
```bash
python manage.py runserver
```

### Frontend
1.Navigate to the frontend directory:
```bash
cd frontend
```

2.Install npm dependencies:
```bash
npm install
```

3.Environment:

.env

VITE_API_URL="Backend base url"

```bash
npm run dev
```

4.Run the frontend development server:
```bash
npm run dev
```

## Testing
- Frontend Tests (jest):

To run the frontend tests with jest:
```bash
npm run test
```

- Backend Tests (pytest):
```bash
pytest
```

http://localhost:8000/redocs/

http://localhost:8000/swagger/
