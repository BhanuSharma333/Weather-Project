const { ESRCH } = require("constants");
const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
const query=req.body.cityName;
    const apiKey="5cc8143318505de5a587d7cbc669899b";
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    
    https.get(url,function(response){ //response=reponse from weather server
                                    //res =response of our server
            console.log(response.statusCode);
            response.on("data",function(data){
                const weatherData=JSON.parse(data);
                const temp=weatherData.main.temp;
                const weatherDescription=weatherData.weather[0].description;
                const icon=weatherData.weather[0].icon;
                const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
                res.write("<p>The weather currently is "+weatherDescription+"</p>");
                res.write("<h1>The temperature in "+query+" is "+temp+" in Celsius </h1>");
                res.write("<img src="+imageUrl+">");
                res.send();
});
    });
});

app.listen("3000",function(){
    console.log("the server is runing at port 3000");
});


