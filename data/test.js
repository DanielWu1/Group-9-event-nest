var myDate = new Date();
// myData = myDate.toESTString()
var mytime = myDate.toLocaleDateString();
var myhour = myDate.getHours()
let myctime = new Date("2021-12-10 09:10")
let my1time = "11/05/2021"
let my11time = new Date("12/10/2021")
var validDate = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
var validTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
console.log(my11time > myctime)
console.log(myhour)
console.log(myDate)
console.log(mytime)
console.log(myctime)
console.log(my11time)
if (!my1time.match(validDate)) {
    console.log(false);
}
let my = ["12/10/2021", "09:00"]
let my1 = my[0] +' ' + my[1]
let my111time = new Date(my1)
let mystart = new Date(my[0] + ' ' + my[1])
console.log(mystart)
console.log(myctime > mystart || mystart >my11time )

// function checktime (time){
//     let myreturn = false
//     if (Object.prototype.toString.call(myctime) === "[object Date]") {
//     // it is a date
//     if (isNaN(myctime.getTime())) {  // d.valueOf() could also work
//       // date is not valid
//       myreturn = false
//     } else {
//       // date is valid
//       myreturn = false
//     }
//   } else {
//     // not a date
//     myreturn = false
//   }
//   return myreturn
// }
// let mycheck = checktime(23123123)
// console.log(mycheck)
