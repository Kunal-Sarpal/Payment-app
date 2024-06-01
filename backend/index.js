const express = require('express');
const mainRouter = require('./routes/index');
const cors = require('cors');
const app = express(); 


const port = 3000;

app.use(cors());
app.use('/api/v1', mainRouter);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
