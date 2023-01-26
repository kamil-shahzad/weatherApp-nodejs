const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html", "UTF-8");

const replaceVal = (tempVal, orgVal)=>{
    
let temperature = tempVal.replace("{%tempValue%}" , orgVal.main.temp)
console.log(temperature);
return temperature
}
const server = http.createServer((req, res)=>{
    if(req.url = "/"){
        requests(`https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=3169f70f6529bbdc2ebf376dc3925159`)
        .on('data', (chunk) => {
            const objdata = JSON.parse(chunk)
            const objArray = [objdata];
            const degTemp = objArray[0].main.temp;
            var fToCel = Math.floor(degTemp - 271.16);
        //   console.log(fToCel);
          const realTimeData = objArray.map((val)=>replaceVal(homeFile , val)).join("")
      //to get the data in string instead of an array 
            console.log(realTimeData)
            res.write(realTimeData)
        })
        .on('end', function (err) {
          if (err) return console.log('connection closed due to errors', err);
          res.end();
        });
    }

});

server.listen(8000, "127.0.0.1", ()=>{
    console.log("server is working")
})