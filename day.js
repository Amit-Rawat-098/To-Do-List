module.exports=date;


function date(){
var today= new Date();
var options={
    weekday: "long",
    month: "long",
    day: "numeric",
};

day=today.toLocaleDateString("en-US",options);
return day;
}