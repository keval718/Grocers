const express =require('express');
const userRoute=require('./routes/api/user');

const app=express();
app.use(express.json());
const connectDB=require('./config/connectDB');

//connect databse
connectDB();
app.use('/api/users',userRoute);

// app.use('/api/tasks/:email',userRoute);
// app.use('/api/tasks/delete/:email',userRoute);
// app.use('/api/tasks/update/:email',userRoute);

const PORT=5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));