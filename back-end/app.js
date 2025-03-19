import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the WNYU Archives');
});



console.log("Starting server...");
app.listen(process.env.PORT ?? 8080, () => {
    console.log("Server running on port", process.env.PORT ?? 8080);
});