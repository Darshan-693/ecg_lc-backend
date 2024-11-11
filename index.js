const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors(
    {
        origin: "https://magical-melba-9b251c.netlify.app"
    }
));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/',require('./routes'));

app.listen(process.env.port,()=>
{
    console.log("listening");
})
