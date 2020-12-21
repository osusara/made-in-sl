# made-in-sl
Made In Sri Lanka is an E-commerce website that sells local products in Sri Lanka. This website opens up a whole new market for local products such as Sri Lankan tea, handcrafts, and other Sri Lankan products which have a massive demand in foreign countries. I'm developing this project as a mini project at my university. I'm using the MERN stack to develop the project.

## Get started

- Clone your forked repository.

  ```
  git clone https://github.com/USERNAME/made-in-sl
  cd made-in-sl
  ```
- Install dependencies.

  ```
  npm run setup
  ```

## Configurations

- Create a file "default.json" in /config directory

- Add these to the file

  ```
  {
    "mongoURI": "MONGODB_URI",
    "jwtPrivateKey": "A_SECRET_FOR_CLIENT_AUTH",
    "jwtAdminKey": "A_SECRET_FOR_ADMIN_AUTH"
  }
  ```

## Run in dev mode

- Run the apps client and admin views in the development mode

  ```
  npm run dev
  ```
  
  Open [http://localhost:3000](http://localhost:3000) to view the client page in the browser.<br>
  Open [http://localhost:3001](http://localhost:3001) to view the admin page in the browser.

- Runs only the apps client view in the development mode

  ```
  npm run dev-client
  ```
  
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser

- Runs only the apps admin view in the development mode

  ```
  npm run dev-admin
  ```
  
  Open [http://localhost:3001](http://localhost:3001) to view it in the browser

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
