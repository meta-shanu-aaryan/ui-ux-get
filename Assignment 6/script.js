let empIndex = 0;
let empForm = document.querySelectorAll("#emp-form>div");

let empNext = document.getElementById("emp-next")

let empFormData = {
}

let ticketNumber = 0;

let empEnt = document.querySelectorAll("#emp-form input")


const employeeFormHandler = (e)=>{
    e.preventDefault();
    if(empIndex+1 == empForm.length){
        empEnt.forEach(inp => {
            if(inp.type === "radio"){
                if(inp.checked){
                    localStorage.setItem(inp.tagName, inp.value);
                    console.log(inp.value);
                }
            }else{
                localStorage.setItem(inp.tagName, inp.value);
                console.log(inp.value);
            }

        })

        let elem = document.getElementById("ticket-no");
        ticketNumber++;
        document.getElementById("emp-form").classList.add("d-none")
        localStorage.setItem("ticketNumber", ticketNumber);
        elem.innerText = `your ticket number is ${ticketNumber}`;
        elem.classList.remove("d-none")
    }else{
        console.log(empForm[empIndex].getElementsByTagName("input")[0].value)
        console.log(empForm[empIndex].getElementsByTagName("input")[0].value.length)
        if(empForm[empIndex].getElementsByTagName("input")[0].value.length<3){
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger")
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3")
        }else{
            empForm[empIndex].classList.add("d-none");
            empForm[++empIndex].classList.remove("d-none");
        }
    }
}

empNext.addEventListener("click", employeeFormHandler)


empEnt.forEach(e => (
    e.addEventListener("keypress",(e)=>{
        if(e.key === "Enter"){
            employeeFormHandler;
        }
    })
))


const passwordInput = document.querySelectorAll("#emp-form input[type=\"password\"]");

passwordInput.forEach(passInput=> (
    passInput.addEventListener("input", (e)=>{
        // console.log(passInput.value)
        if(passInput.value.length < 8){
            passInput.classList.remove("border");
            passInput.classList.add("border-danger");
            passInput.classList.add("border-3");
        }else{
            passInput.classList.remove("border-danger");
            passInput.classList.add("border-success");
        }
    })
))


let vehicleInputIndex = 0;

let vehicleForm = document.querySelectorAll("#vehicle-form>div");

let vehicleInput = document.querySelectorAll("#vehicle-form input");

const vehicleFormHandler = (e)=>{
    e.preventDefault();
    if(vehicleInputIndex+1 == vehicleForm.length){
        document.getElementById("vehicle-form").classList.add("d-none")
        document.getElementById("vehicle-confirmation").classList.remove("d-none")
        
    }else{
        vehicleForm[vehicleInputIndex].classList.add("d-none")
        vehicleForm[++vehicleInputIndex].classList.remove("d-none")
    }
}

let vehicleNext = document.getElementById("vehicle-next")

vehicleNext.addEventListener("click", vehicleFormHandler);

const displayPriceInDollar = ()=>{
    document.querySelectorAll(".price-inr").forEach(inrPrice => (
        inrPrice.classList.add("d-none")
    ))
    document.querySelectorAll(".price-yen").forEach(yenPrice =>(
        yenPrice.classList.add("d-none")
    ))
    document.querySelectorAll(".price-usd").forEach(yenPrice =>(
        yenPrice.classList.remove("d-none")
    ))
}

const displayPriceInYen = ()=>{
    document.querySelectorAll(".price-inr").forEach(inrPrice => (
        inrPrice.classList.add("d-none")
    ))
    document.querySelectorAll(".price-usd").forEach(yenPrice =>(
        yenPrice.classList.add("d-none")
    ))
    document.querySelectorAll(".price-yen").forEach(yenPrice =>(
        yenPrice.classList.remove("d-none")
    ))
}

const displayPriceInInr = ()=>{
    document.querySelectorAll(".price-usd").forEach(inrPrice => (
        inrPrice.classList.add("d-none")
    ))
    document.querySelectorAll(".price-yen").forEach(yenPrice =>(
        yenPrice.classList.add("d-none")
    ))
    document.querySelectorAll(".price-inr").forEach(yenPrice =>(
        yenPrice.classList.remove("d-none")
    ))
}

document.getElementById("usd-btn").addEventListener("click", displayPriceInDollar)
document.getElementById("inr-btn").addEventListener("click", displayPriceInInr)
document.getElementById("yen-btn").addEventListener("click", displayPriceInYen)