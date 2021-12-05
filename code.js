function datetime(str) 
{
    let datetimer=[] 
    let date=''
    let time=''
    for(let i=0;i<10;i++)
    {
        date+=str[i]
    } 
    for(let j=11;j<16;j++)
    {
        time+=str[j]
    } 
    datetimer.push(date) 
    datetimer.push(time) 
    return datetimer
} 

console.log(datetime("2021-12-22T14:30"))