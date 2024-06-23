const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
let msg=document.querySelector(".msg p");


window.addEventListener("load", ()=>{
    updateex();
});
const  updateex=async()=>{
    let amount=document.querySelector("input");
    let amt=amount.value;
    if(amt<=0)
    {
        alert("Please Enter Valid Number!!!");
        amt=1;
        amount.value="1";
    }
    // console.log(fromcurr.value);
    const url=`${BASE_URL}${fromcurr.value.toLowerCase()}.json`;
    let data = await (await fetch(url)).json();
    // console.log(response1);
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    // console.log(rate);
    const finalamt=amt*rate;
    msg.innerText=`${amt} ${fromcurr.value}=${finalamt} ${tocurr.value}`;
}
dropdowns.forEach((select) => {                         //1
    for (const currcode in countryList) {
        const opt = document.createElement("option");
        opt.innerText = currcode;
        if(select.name==="from" && currcode==="USD")
            {
                opt.selected="selected";
            }
        if(select.name==="to" && currcode==="INR")
            {
                opt.selected="selected";
            }    
        opt.value = currcode;
        select.append(opt);
    }
    select.addEventListener("change",(evt)=>{
          updateflag(evt.target);
        //   console.log(evt);
    })
});
const updateflag=(element)=>{
        let currcode=element.value;
        let countrycode=countryList[currcode];
        let newlink=`https://flagsapi.com/${countrycode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
        img.src=newlink;
        

}

btn.addEventListener("click",(evt)=>{
        evt.preventDefault(); //so that after clicking on button the page will not be refreshed.
        updateex();
});






