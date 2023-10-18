# Project Three

## Resources

** Routes **

** Attributes **

- name (string)
- type (string)
- grade (string)
- attempts (string)
- rating (string)

## Schema

'''
CREATE TABLE routes (id INTEGER PRIMARY KEY, name TEXT, type TEXT, grade TEXT, attempts TEXT, rating TEXT);
'''

## REST endpoints

| Name                      | Method | Path       |
| ------------------------- | ------ | ---------- |
| Retrieve routes colletion | GET    | /routes    |
| Retrieve single route     | GET    | /routes/id |
| Create new route          | POST   | /routes    |
| Updates single route      | PUT    | /routes/id |
| Delete single route       | DELETE | /routes/id |
