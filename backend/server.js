require("dotenv").config();

//importing modules
const express =require("express");
const cors = require("cors");
const sequelize = require("./utils/db");

//importing middleware
const {verify} = require("./middleware/verifyToken");

//importing routes
const authRouter = require("./router/authRouter");
const listRouter = require("./router/listRouter");
const sharedRouter = require("./router/sharedListRouter");

//iimporting models
const User = require("./model/userModel");
const List = require("./model/listModel");
const SharedList = require("./model/sharedListModel");

//instantiating the application
const app = express();

app.use(cors());
app.use(express.json());


//defining the relation between the user and todo-list
User.hasMany(List, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
List.belongsTo(User, {
    foreginKey: "userId",
    onDelete: "CASCADE",
})
User.hasMany(SharedList, {
   foreignKey: "userId",
   onDelete: "CASCADE", 
})
SharedList.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
})

//initializing the route endpoint
app.use("/sign", authRouter);
app.use("/list", verify, listRouter);
app.use("/shared", verify, sharedRouter);



const port = process.env.PORT  || 3000;
//listening on port
async function initiate(){
    try{
        await sequelize.sync();
        console.log("db connected successfully");
        app.listen(port, ()=>{
            console.log(`Server is running at ${port}`);
        });
    } catch(error){
        console.log(error);
    }
}
initiate();


//mayank@gmail.com
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjUzNTY4OH0.smz1D4mw4tdVPI3grweJLOfAxuWusA53wLkYkDATo9M
//mayank123@gmail.com
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNjUzNTcxM30.RDqb9NNvOc6Ax3dctpYsY4PKw9sVFvbdCEmIxZKHbRo
//mummy@gmail.com
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxNjUzNTc0NX0.oS8STncu4rWhkjBLwA6zXT0ouDwRkG-NeBWWt6gfm1c