var http=require("http");
var fs=require("fs");
var qs=require("querystring");
var EmployeeDetails=require("./Nodejsassgnt2related");

var EmpId;
var Name;
var Basic_Pay;

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
                    <lable>Name</lable>
                    <input type="text" id="Name" name="Name"  required />
                    <br/>
                    <lable>Basic_Pay</lable>
                    <input type="text" id="Basic_Pay" name="Basic_Pay"  required />
                    <br/>
                    <button>Get Details</button>
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
        //console.log(data);
    });
    req.on("end",function()
    {
    var obj=qs.parse(body);
    console.log(obj.EmpId);
    EmpId=obj.EmpId;
    Name=obj.Name;
    Basic_Pay=parseInt(obj.Basic_Pay);
    var emp=new EmployeeDetails(EmpId,Name,Basic_Pay)
    var netpay=emp.getNetPayment();
    console.log(netpay);
    res.end(`<!Doctype html>
    <html>
        <head>
            <title>Employee Details</title>
        </head>
        <body>
            <form action="/" method ="post">
                <lable>EmpId</lable>
                <input type="text" id="EmpId" name="EmpId" value=${EmpId} required/>
                <br/>
                <lable>Name</lable>
                <input type="text" id="Name" name="Name" value=${Name} required readonly/>
                <br/>
                <lable>Basic_Pay</lable>
                <input type="text" id="Basic_Pay" name="Basic_Pay" value=${Basic_Pay} required readonly/>   
                <br/>
                <lable>NetPay</lable>
                <input type="text" id="NetPay" name="NetPay" value=${netpay} required readonly/>
            </form>
        </body>
    </html>`);

    MongoClient.connect('mongodb://127.0.0.1:27017/Rectangle',function(err,db)
{
    if(err)
    {
        console.log(err);
    }
    var insertdoc = [{ EmpId:EmpId,Employeename:Name,BasicPay:Basic_Pay,NetPayment:netpay}];
    db.collection('EmployeeDetails').insertMany(insertdoc,function(err,result)
    {
        if(err) throw err;
        {
        console.log("document inserted sucessfully");
        }
    });
       
    db.close();
    
});
    
    });
    
    }
}).listen(3000);