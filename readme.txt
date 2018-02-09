#1. Install Express generator by following command If u dont have

npm install express-generator -g

#2. Now create one sample app which utilizes express generator. Create express app by using:

express mong_expr_node_demo 
cd mong_expr_node_demo
#3 install all the dependencies declared in ur package.json
npm install

#4 open the created directory in editor

#5 Add one more entry in package.json for mongodb by using following command on ur project root directory:

npm install mongodb --save

#now you see one more entry in package.json for mongodb

#run ur app using following command
npm start

#open ur browser and type
http://localhost:3000/

#you will see weLcome to express and now ur server is listening on port number 3000


#now open ur app.js you will see var users = require('./routes/users');
#so open ur users.js which is on routes/users.js
#declare and initiate connection for mongodb

# I've defined two routes 
1. users/list - to get the list of users
2. users/new  - to insert new users 

# to insert new user, type folllowing url on ur browser
http://localhost:3000/users/new

# to see the list of users, type following url 
http://localhost:3000/list




