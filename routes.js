const router = require("express")();
const {spawn} = require("child_process");
const fs = require('fs');

router.route("/").get((req,res)=>
{
    res.send("server response");
});

router.route("/ecg").post(async (req,res)=>
{
    const b64S = req.body.b64S;
    await require("./saver.js")(b64S);
    const cp = spawn('python',['ECG.py','./image.jpg'],{encoding:"utf-8"})
    //console.log(cp);
    cp.stdout.on('data',(data)=>
    {
        stri = Buffer.from(data).toString();
        console.log(stri);
        fs.unlink("./image.jpg",(err)=>
        {
            if(err)console.log(err);
        })
        res.json({result:stri});
    });
    cp.stderr.on('data', (data) => {
        console.error(`Error output from script: ${data}`);
    });
});
router.route("/lc").post(async (req,res)=>
    {
        const b64S = req.body.b64S;
        await require("./saver.js")(b64S);
        const cp = spawn('python',['lc.py','./image.jpg'],{encoding:"utf-8"})
        //console.log(cp);
        cp.stdout.on('data',(data)=>
        {
            stri = Buffer.from(data).toString();
            console.log(stri);
            fs.unlink("./image.jpg",(err)=>
            {
                if(err)console.log(err);
            })
            res.json({result:stri});
        });
        cp.stderr.on('data', (data) => {
            console.error(`Error output from script: ${data}`);
        });
    });
module.exports = router;