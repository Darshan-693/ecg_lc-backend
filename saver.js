const fs =require('fs');
const saver = async (base64String)=>
{
    console.log("saving image")
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    
    const buffer = Buffer.from(base64Data, 'base64');
    
    await fs.writeFile("image.jpg", buffer, 'binary', (err) => {
        if (err) {
            console.error("Error writing the file:", err);
        }
    });
}
module.exports = saver;