import cors from 'cors';
import express from "express";

// 기본 서버연결
const app = express();
const port = 5000;

const corsOptions={
    origin:"http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello from server!');
});

app.post('/api/login',(req,res)=>{
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});