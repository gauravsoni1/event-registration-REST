const app = require('./app');

//Start the server
app.listen(process.env.PORT,()=>{
  console.log(`server is running on port ${process.env.PORT}`);
});