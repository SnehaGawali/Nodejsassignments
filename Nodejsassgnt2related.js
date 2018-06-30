module.exports=class EmployeeDetails{
   
    constructor(EmpId,Name,Basic_Pay)
    {
     this.EmpId=EmpId;
     this.Employeename=Name;
     this.BasicPay=Basic_Pay;
     
    }
    
   getNetPayment()
  {
    if(this.BasicPay<=5000)
    {
        var NetPayment=this.BasicPay+0.3*this.BasicPay-1000;
        return NetPayment;
    }
   else if(this.BasicPay>5000)
    {
        var NetPayment=this.BasicPay+0.4*this.BasicPay-1000;
        return NetPayment;
    }

  }
}