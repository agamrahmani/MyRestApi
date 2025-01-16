
# My Rest API

Project Description:

This project is a RESTful API built with Express.js and MongoDB, designed to manage users and business cards. It allows users to register, log in, and store business card information. The application also includes features like user authentication, encryption for passwords, and basic error logging.

Who it's for:

This API is intended for developers or businesses who need a simple backend to manage users and business card information. It's ideal for those building applications where user and business card data needs to be stored securely and accessed via a web interface. Developers working on personal or small-scale business applications can use this API as a foundation for building more complex systems.


## API Reference

#### Create User

```http
  POST {{local}}/users
```

| Parameter | Authorization     | Description                |
| :-------- | :------- | :------------------------- |
| `object` | `all` | An object that contains the schema of a user |

#### Login
```http
  POST {{local}}/login
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email, password`      | `all` | An object that includes the username and password |

### Get all users
```http
  POST {{local}}/login
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `admin` | The admin user's token |

### Get User
```http
  GET {{local}}/users/:id
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id token`      | `The registered user or admin` |  In the request header, include the ID of the user to retrieve, and in the request body, include the token of the requester. |

### Edit User
```http
  PUT {{local}}/users/:id
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id token`      | `The registered user` |  In the request header, include the ID of the user to retrieve, and in the request body, include the token of the requester. |
| `object` | `all` |  An object that contains the schema of a update user|

### Change is business status
```http
  PATCH {{local}}/users/id
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id token`      | `The registered user` |  In the request header, include the ID of the user to retrieve, and in the request body, include the token of the requester. |

### Delete User
```http
  DELETE  {{local}}/users/:id
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id token`      | `The registered user or admin` |  In the request header, include the ID of the user to retrieve, and in the request body, include the token of the requester. |

### GET all cards
```http
 GET {{local}}/cards
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
|       | `all` |  |

### GET user cards
```http
 GET {{local}}/cards/my-cards
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`token`  | `The registered user` |  The token of the user who wants to retrieve their cards|

### GET card
```http
 GET {{local}}/cards/:id
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`id`  | `all` |  The id of the card|

### Create card
```http
 POST {{local}}/cards/
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`token`  | `Business user` |  The token of the user|
|`object`  | `Business user` |  The object of the card|

### Update card
```http
PUT {{local}}/cards/:id
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`id`  | `The user who created the card` |  The id of the card|
|`token`  | `The user who created the card` |  The token of the user|
|`object`  | `The user who created the card` |  The object of the card|

### Like card
```http
 PATCH {{local}}/cards/:id
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`id`  | `A registered user` |  The id of the card|
|`token`  | `A registered user` |  The token of the user who wants to like|

### Like card
```http
 PATCH {{local}}/cards/:id
```

| Parameter | Authorization     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`id`  | `The user who created the card or admin` |  The id of the card|
|`token`  | `The user who created the card or admin` |  The token of the user who wants to delete|

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_KEY`

`CONNECTION_STRING_ATLAS`

`LOCAL_CONNECTION_STRING`

`ENVIRONMENT`


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

