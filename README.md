# Event Management API
Postman Collection Link:Here you will find the Event Managent route Test data:  
https://www.postman.com/speeding-eclipse-199364/workspace/public/collection/15474628-74553929-63a1-4f84-ac28-b5570805615d?action=share&creator=15474628
## Overview
This project is a RESTful API for managing events. The API allows users to create, update, delete, and list events. Each event has attributes such as name, date, start and end time, location, description, and participants. The API also ensures that there are no scheduling conflicts for events at the same location.

## Features
- **Create Events**: Add new events with specific details.
- **View Events**: Retrieve a list of all events or details of a specific event.
- **Update Events**: Modify the details of an existing event.
- **Delete Events**: Remove an event by ID.
- **Manage Participants**: Add or remove participants from events.
- **Conflict Detection**: Prevent scheduling conflicts for events at the same location.
- **Pagination**: Efficiently list events with pagination support.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL


## Setup and Installation

### Prerequisites
- Node.js and npm installed
- Sequelize and MySQL for the database

### Step-by-Step Guide

#### Clone the Repository
```bash
git clone https://github.com/arju10/event-management-backend.git
cd event-management-backend
```
#### Install Dependencies
```bash
npm install
```
### Set Up MySQL Database
#### Log in to MySQL:
```bash
mysql -u root -p
```
#### Create a new database::
```bash
CREATE DATABASE event_management;
USE event_management;
```
#### Create the necessary tables by running the following SQL commands::
```bash
# Event Table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT
);

# Participants Table
CREATE TABLE participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    group_name VARCHAR(255), -- 'group_name' instead of 'group' to avoid SQL reserved words
    eventId INT NOT NULL,
    FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE
);

```

### Event Endpoints
#### Create a New Event
- POST   /events
#### Get All Events with Pagination
- GET /events?page=1&limit=10
#### Get a Specific Event by ID
- GET /events/:id
#### Update an Event
- PUT /events/:id
#### Delete an Event
- DELETE /events/:id

### Participant Endpoints
#### Add a Participant to an Event
- POST /events/:id/participants
#### Remove a Participant from an Event
- DELETE /events/:id/participants/:participantId
