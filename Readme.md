node server/script/index.js
node -e "require('./server/script').sync();"
node -e "require('./server/script').seedData();"


Role --- 
1. Admin
2. Management
3. Internal Employee
4. External Employee
5. Client

Status---
1. Active
2.Inactive

Job Status---
1. Pending
2. Completed


-------------------------------
GET USER WITH QUERY PARAMS


GET-> http://localhost:5000/api/user?firstName=john&lastName=john&email=john@john.com&role=1

GET -> http://localhost:5000/api/user/userList

--------------------------------
CREATE USER 
POST-> http://localhost:5000/api/user
body:{
"firstName": "john",
"lastName": "john",
"email": "john@john.com",
"password": "123456",
"role": 2,
"isActive": 1, // fix
"status": 1, // fix
"createdAt": "2019/25/07",
"updatedAt": "null", // fix
"createdBy": "john",
"updatedBy": "null" // fix
}

-------------------------------------------

UPDATE USER DETAILS
PUT -> http://localhost:5000/api/user/:id
body:{
"firstName": "john",
"lastName": "john",
"email": "john@john.com",
"password": "123456",
"role": 2,
"isActive": 1, //fix
"status": 1,
"createdAt": "2019/25/07",
"updatedAt": "null", //fix
"createdBy": "john",
"updatedBy": "null" //fix
}

--------------
DELETE USER
DELETE-> http://localhost:5000/api/user/:id

--------------
User Login
POST-> http://localhost:5000/api/user/auth
body:{
    email:"",
    password:""
}

----------------------
CREATE JOB
POST -> http://localhost:5000/api/job

body={
"jobId": 323242342,
"jobTitle": "This is Job Title",
"createdBy": 2,
"jobStatus":1,
"participants": "11,22"
}

-----------------------
SEARCH JOB

pending----------------- GET -> http://localhost:5000/api/job?jobId=3423&jobStatus=1&createdBy=2


