const express =require('express');
const userRoute=require('./routes/api/user');

const provideRoute=require('./routes/api/provider');

const CartRoute=require('./routes/api/AddToCartR');
const OrderRoute=require('./routes/api/OrderR');
const ProductRoute=require('./routes/api/ProductR');
const app=express();
const cors=require('cors');
app.use(cors());

app.use(express.json());
const connectDB=require('./config/connectDB');
const port = process.env.PORT || 5000;

//connect databse
connectDB();
app.use('/api/users',userRoute);
app.use('/api/cart',CartRoute);
app.use('/api/orders',OrderRoute);
app.use('/api/products',ProductRoute);

app.use('/api/Providers',provideRoute);
// app.use('/api/tasks/:email',userRoute);
// app.use('/api/tasks/delete/:email',userRoute);
// app.use('/api/tasks/update/:email',userRoute);

// const PORT=5000;
app.listen(port, () => console.log(`server running on port ${port}`));