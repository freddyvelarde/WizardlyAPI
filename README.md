# WizardlyAPI

WizardlyAPI is a user-friendly tool for developers to test, document and manage APIs. With an intuitive interface, users can easily make API requests, create and save collections, and share API documentation with their team. WizardlyAPI simplifies the API development process and helps developers save time and improve productivity.

## Get Started

If you want to run this project on your own machine then run the next command:

```bash
docker compose -f docker-compose-dev.yml up
```

for get access into postgresql db CLI:

```bash
docker exec -it postgres sh -c 'psql -h postgres -U admin -d wizardlyapi'
```

### Tests

```bash
# to run all tests just run this file
./tests.sh
```

> If you don't use docker so up the server one by one.

## Endpoints

> If you run the project from Docker containers, the main URL is: `http://localhost/api`

### Authentication

- POST: `/auth/signup` - is used to register a new user in the system by sending their signup information to the server. If the provided information is valid and the user is successfully registered

```javascript
import axios from "axios";

const body = {
  username: "John Doe",
  email: "john@example.com",
  password: "12345",
};
const headers = {
  "content-type": "Application/json",
};
const url = "http://localhost/api/auth/signup";

async function logInUser(url, body, headers) {
  try {
    const response = await axios.post(url, body, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

logInUser(url, body, headers);
```

- POST: `/auth/login` - is used to log a user into the system by sending their login credentials to the server. If the credentials are valid, an access token is returned for subsequent requests.

```javascript
import axios from "axios";

const body = {
  email: "john@example.com",
  password: "12345",
};
const headers = {
  "content-type": "Application/json",
};
const url = "https://localhost/api/auth/login";

async function registerUser(url, body, headers) {
  try {
    const response = await axios.post(url, body, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

### Users

- GET: `/users/profile` - This endpoint returns the profile information of the authenticated user.

```javascript
import axios from "axios";

const headers = {
  "access-token": "yourtoken", // this token is given when user is authenticated
};
const url = "https://localhost/api/users/profile";

async function getUserData(url, headers) {
  try {
    const response = await axios.get(url, body, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```

- DELETE: `/users/remove` - This endpoint remove the users information from the system

```javascript
import axios from "axios";

const headers = {
  "access-token": "yourtoken", // this token is given when user is authenticated
};
const url = "https://localhost/api/users/remove";

async function getUserData(url, headers) {
  try {
    const response = await axios.delete(url, body, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```
