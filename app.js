// jshint esversion:6
const express = require("express")
const app = express()
const https = require("https")
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))

const port = 3000

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

})

app.post("/",(req,res)=>{

  const cityName = req.body.cityName;
  const apiKey = "1f5de4fb8504338a4b038502202e7f57";
  const unit = "metric";

  url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ apiKey +"&units="+ unit +""
  https.get(url, (response)=>{
    console.log(response.statusCode)
    response.on("data",(data)=>{
      const weather = JSON.parse(data);
      const temp = weather.main.temp;
      const weatherDescription = weather.weather[0].description;
      const  weatherImage = weather.weather[0].icon;

      const imageUrl = "http://openweathermap.org/img/wn/" + weatherImage + "@2x.png";
      console.log(temp)
      console.log(weatherDescription)
      res.write("<h1>the temperature in "+ cityName +" is "+temp+" degree celcious</h1>")
      res.write("<p>the weather is " + weatherDescription + "</p>")
      res.write("<img src = " + imageUrl + ">")
      res.send()})})
})


app.listen(process.env.PORT || port,function(){
  console.log("server is up")
})
