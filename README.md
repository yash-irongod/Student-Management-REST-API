# Student Management REST API

A REST API built with Node.js and Express.js. Student records are stored in an in-memory array; no database is used.

## Run the project

```bash
npm install
npm start
```

The server runs at `http://localhost:3000`.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get a student by ID |
| POST | `/students` | Add a student |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

For POST and PUT, send JSON with both `name` and `course`:

```json
{
  "name": "Aarav Sharma",
  "course": "BCA"
}
```

Import `postman/Student_Management_API.postman_collection.json` into Postman to test the endpoints. Start the server before running the collection.

Student data is stored in memory and resets when the server restarts.
