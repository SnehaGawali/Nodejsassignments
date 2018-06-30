var http=require("http");
var fs=require("fs");
var qs=require("querystring");
var EmpId;
var Name;
var Basic_Pay=0;
var NetPay=0;
var GrossPay=0;
var HRA=0;

var deductions=1000;

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
  
    if(obj.Basic_Pay>=50000)
    {
        HRA=(0.4*Basic_Pay);
        GrossPay=Basic_Pay+HRA;
        NetPay=GrossPay-deductions;
      //return NetPay;
    }
    else
    {
        HRA=(0.3*Basic_Pay);
        GrossPay=Basic_Pay+HRA;
        NetPay=GrossPay-deductions;
        //return NetPay;
    }

    res.end(`<!Doctype html>
    <html>
        <head>
            <title>Employee Details</title>
        </head>
        <body>
            <form action="/" method ="post">
                <lable>EmpId</lable>
                <input type="text" id="EmpId" name="EmpId" placeholder=${EmpId} required/>
                <br/>
                <lable>Name</lable>
                <input type="text" id="Name" name="Name" value=${Name} required readonly/>
                <br/>
                <lable>Basic_Pay</lable>
                <input type="text" id="Basic_Pay" name="Basic_Pay" value=${Basic_Pay} required readonly/>
                <br/>
                <lable>NetPay</lable>
                <input type="text" id="NetPay" name="NetPay" value=${NetPay} required readonly/>
                <br/>
                <button>Get Details</button>
            </form>
        </body>
    </html>`);

    MongoClient.connect('mongodb://127.0.0.1:27017/Rectangle',function(err,db)
{
    if(err)
    {
        console.log(err);
    }
    var insertdoc = [{ EmpId:EmpId,Employeename:Name,BasicPay:Basic_Pay,NetPayment:NetPay}];
    db.collection('EmployeeDetails').insertMany(insertdoc,function(err,result)
    {
        if(err) throw err;
        {
        console.log("document inserted sucessfully");
        }
    });
       
    db.close();
    
});

    //res.end("fahren = "+fahren.toString()+" celsius= "+celcius.toString());
    });
    
    }
}).listen(3000);