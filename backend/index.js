const express = require('express');
const mainRouter = require('./routes/index');
const cors = require('cors');
const app = express();


const port = 8000;
app.use(express.json())

app.use(cors());
app.use('/api/v1', mainRouter);

app.get("/hack",(req,res)=>{
  res.send("Good" );
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
