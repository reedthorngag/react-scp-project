# SCP Polytech Project
A full stack project for polytech which uses express, postgres and react

The backend is stored in backend/ the frontend is stored in react-app/, which has its own package.json so it can be run independantly in a seperate docker container for development which is what the DockerFile is for, otherwise for production it is built once when the docker container is created, this means you can have auto reload on both the backend and frontend simultaniously. for development the react app runs on port 3000

