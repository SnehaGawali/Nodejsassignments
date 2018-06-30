var http=require("http");
var fs=require("fs");
var qs=require("querystring");
var EmpId;
var MongoClient=require('mongodb').MongoClient;


http.createServer(function(req,res)
{
    if(req.method=="GET")
    {
        res.end(`<!Doctype html>
        <html>
            <head>
                <title>Employee Details</title>
            </head>
            <body>
                <form action="/" method ="post">
                    <lable>EmpId</lable>
                    <input type="text" id="EmpId" name="EmpId" placeholder="Employee ID" required/>
                    <br/>
                    
                    <button>Delete details</button>
                </form>
            </body>
        </html>`);
    }
    else if(req.method=="POST")
    {
       
        var body="";
        req.on("data",function(chunk)
    {
        body+=chunk;
    
    });
    req.on("end",function()
    {
    var obj=qs.parse(body);
    console.log(obj.EmpId);
    EmpId=obj.EmpId;
   
    MongoClient.connect('mongodb://127.0.0.1:27017/Rectangle',function(err,db)
{
    if(err)
    {
        console.log(err);
    }
   
    db.collection('EmployeeDetails').deleteOne({EmpId:EmpId},function(err,result)
    {
        if(err) throw err;                    
         res.end(`<!Doctype html>
<html>
    <head>
        <title>Employee Details</title>
    </head>
    <body>
        <form action="/" method ="post">
            <lable>Deleted successfully</lable>
            
        </form>
    </body>
</html>`);
          
   });
   
    db.close();   
   
});
   
    });
    
    }
}).listen(3000);

