# CampusFind

A simple MERN stack lost and found web app for campus use.

## About

CampusFind allows users to post lost or found items. Each post contains item details, location, contact information, date, and current status. Users can add, update, resolve, filter, and delete item posts.

## Built With

* MongoDB
* ExpressJS
* React
* NodeJS
* Mongoose
* Vite

## Features

* Add lost/found item
* View all item posts
* Edit item details
* Mark item as resolved
* Filter items by Lost, Found, or Resolved
* Delete item posts
* Save data in MongoDB

## Project Folders

```text
CampusFind-FullStack/
├── Coursework/
├── Project/
│   ├── backend/
│   └── frontend/
├── README.md
├── learning-diary.md
└── video-link.txt
```

## Running the Project

Start MongoDB first.

Backend:

```bash
cd Project/backend
npm install
npm run dev
```

Frontend:

```bash
cd Project/frontend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5001
```

Frontend runs on:

```text
http://localhost:5173
```

## Environment File

Create a `.env` file inside `Project/backend`.

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/campusfind
```

## API Endpoints

```text
GET    /api/items
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
```

## Demo

The demo video link is saved in `video-link.txt`.
