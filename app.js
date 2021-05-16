const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const https = require('https');
const { response } = require('express');
const app = express();
const path = require('path');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.post('/',(req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members : [
         {
             email_address: email,
             status : "subscribed",
             merge_fields : {
                 FNAME : firstName,
                 LNAME : lastName
             }
         }   
        ]
    };

    const jsonData =JSON.stringify(data);
    const url = 'https://us1.api.mailchimp.com/3.0/lists/075c7c1eea';  

    const Options ={
        method : "POST",
        auth : "harsh:2b5298a5fba5a135b46ab0ae15a74c02-us1"
    }
const request= https.request(url,Options,(response)=>{
    if(response.statusCode===200)
    {
        res.sendFile((path.join(__dirname, '/success.html')));
    }
    else{
        res.sendFile((path.join(__dirname, '/failure.html')));
    }
          response.on("data", (data)=>{
              console.log(JSON.parse(data));
          })
    })
    request.write(jsonData);
    request.end()

    
})

app.post('/failure' ,(req,res)=>{
    res.redirect("/")
})

app.listen(3000,()=>{
    console.log("server started on http://localhost:3000")
})
 