# Project Four

## Resources

### Attributes

**Routes**

- name (string)
- type (string)
- grade (string)
- attempts (string)
- rating (string)

**Users**

- email (string)
- password (string)
- firstName (string)
- lastName (string)

## Schema

```SQL
CREATE TABLE routes (
id INTEGER PRIMARY KEY,
name TEXT,
type TEXT,
grade TEXT,
attempts TEXT
rating TEXT);

CREATE TABLE users (
id INTEGER PRIMARY KEY,
firstName TEXT,
lastName TEXT,
email TEXT,
password TEXT
);
```

## REST endpoints

| Name                      | Method   | Path         |
| ------------------------- | -------- | ------------ |
| Retrieve routes colletion | GET      | /routes      |
| Retrieve single route     | GET      | /routes/id   |
| Create new route          | POST     | /routes      |
| Updates single route      | PUT      | /routes/id   |
| Delete single route       | DELETE   | /routes/id   |
| ------------------------- | -------- | ------------ |
| Create a new User         | POST     | /users       |
| Create a new Session      | POST     | /sessions    |

```
Password hashed using bcrypt hashing method then stored into Database
Used bcrypt verfiy method to check users password with Database password for sign in
```

# f23-authentication-mackayroy
