1. install express, mongoose
-> npm i express mongoose --save
2. install nodemon(for auto update server when save)
-> npm i nodemon --save
3. create scripts in package.json to initial for nodemon
4. install .env for connect string DB
-> npm i dotenv --save
5. pass connect string 
-> env.config()
-> process.env.MDB_CONNECT_STRING