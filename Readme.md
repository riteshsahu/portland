***Web app with role based chat system.***


Role --- 
1. Admin
2. Management
3. Internal Employee
4. External Employee
5. Client

Status ---
1. Active
2. Inactive

Job Status ---
1. Pending
2. Completed


## Environment Setup

 1. Make sure correct node version is installed as per `package.json` 
 2. Install dependencies for both backend and webapp `npm i`
 3. Make sure `server/config/env/local.js` file is present with the required keys
 4. Run Development Server -  `npm run start` and `cd Public && npm run start`
 5. Dump database using `server/db/portland.gz`
 6. Should be running at `localhost:3000` and `localhost:5000`

Note: `development` is stable branch

## Test Credentials

You may create users by visiting `/register`