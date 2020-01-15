# Eeeeevent

### Requirements

- Docker
- Docker Compose

### Installation using Docker Compose

Install Docker and Docker Compose

    Docker: https://docs.docker.com/install/
    Docker Compose: https://docs.docker.com/compose/install/

For deployment in linux or macOS

    docker-compose up --build

For deployment in windows

    1. Use linux based containers
    2. Create .env file in "client" folder and put there

        CHOKIDAR_USEPOLLING=true

    3. Instead docker compose up use:

        docker-compose -f docker-compose.win.yml up --build

### Entry points

For database

    user: "event"
    password: "defaultpassword"
    db: "eeeeeventdb"
    port: 5444


For Frontend

    localhost:3001

For Backend

    localhost:5001
