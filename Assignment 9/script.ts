enum gender{
    male,
    female
}
class Employee{
    fullName:string;
    gender:gender;
    emailId:string;
    password:string;
    confirmPassword:string;
    contact:string;
}


enum vehicleType{
    bicycle,
    bike,
    car,
    truck
}
class Vehicle{
    vehicleName:string;
    vehicletype:vehicleType;
    vehicleNumber:string;
    employeeId:string;
    identification:string;
}

enum passType{
    daily,
    monthly,
    yearly
}

class CarPass{
    vehicletype:vehicleType;
    passtype:passType;
    vehicle:Vehicle;
    employee:Employee;
}

const passwordVerify = (password:string)=>{
    let strength = 0;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(password);
    const hasNumeric = /\d/.test(password)

    if(hasUppercase) strength++;
    if(hasLowercase) strength++;
    if(hasSpecialChar) strength++;
    if(hasNumeric) strength++;

    return strength;
}

let emp1:Employee = new Employee;

const isNum = (str:string)=>{
    return /\d/.test(str);
}

let empIndex:number = 0;
let empForm = document.querySelectorAll<HTMLElement>("#emp-form>div");
let empNext = document.querySelector<HTMLButtonElement>("#emp-next");
let empEnt = document.querySelectorAll<HTMLInputElement>("#emp-form input")
let empRegistrationNumber:number = 0;
let empObj = {
    "password" : "",
    "cnfPassword":"",
    "contact":"",
    "fullName":"",
    "email":"",
    "gender":"",
}


const empFormHandler = (e)=>{
    e.preventDefault();
    
    if(empIndex+1 == empForm.length){
        empEnt.forEach(inp => {
            if(inp.type === "radio"){
                if(inp.checked){
                    empObj[inp.name] = inp.value;
                }
            }else{
                empObj[inp.name] = inp.value;
                
            }

        })
        emp1.confirmPassword = empObj.cnfPassword;
        emp1.contact = empObj.password;
        emp1.emailId = empObj.email;
        emp1.fullName = empObj.fullName;
        emp1.gender = empObj.gender==="male"?gender.male:gender.female;


        let elem = document.getElementById("ticket-no") as HTMLDivElement;
        
        empRegistrationNumber++;
        const currForm = document.getElementById("emp-form");
        currForm!==null && currForm.classList.add("d-none");
        localStorage.setItem("ticketNumber", empRegistrationNumber.toString());
        if(elem!==null) elem.innerText = `your ticket number is ${empRegistrationNumber}`;
        elem!==null && elem.classList.remove("d-none");
        console.log(empObj);
        
    }else{
        let elem = empForm[empIndex].getElementsByTagName("input")[0];
        
        
        if(elem.getAttribute("name") === "fullName" && (elem.value.length<3 || isNum(elem.value))){
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger")
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3")
        }else if((elem.getAttribute("name") === "password" || elem.getAttribute("name") === "cnfPassword") && passwordVerify(elem.value)!==4){
            console.log(passwordVerify(elem.value));
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger")
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3")
        }else if(elem.getAttribute("name") === "cnfPassword" && elem.value!==empObj.password){
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger")
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3")

        }else if(elem.getAttribute("name") === "contact" && (!isNum(elem.value) && elem.value.length<8)){
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger")
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3")
        }else{
            empForm[empIndex].classList.add("d-none");
            empForm[++empIndex].classList.remove("d-none");
        }
    }
}

if(empNext!==null){
    empNext.addEventListener("click", empFormHandler);
}


empEnt.forEach(eve => (
    eve.addEventListener("keypress",(e)=>{
        if(e.key === "Enter"){
            empFormHandler(e);
        }
    })
))

const passwordInput = document.querySelectorAll<HTMLInputElement>("#emp-form input[type=\"password\"]");

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


let vehicleInputIndex:number = 0;

let vehicleForm = document.querySelectorAll<HTMLDivElement>("#vehicle-form>div");

let vehicleInput = document.querySelectorAll<HTMLInputElement>("#vehicle-form input");

const vehicleFormHandler = (e)=>{
    e.preventDefault();
    if(vehicleInputIndex+1 == vehicleForm.length){
        const vehForm = document.getElementById("vehicle-form") as HTMLFormElement;
        if(vehForm!==null){
            vehForm.classList.add("d-none")
        }

        const vehConfirmation = document.getElementById("vehicle-confirmation");
        if(vehConfirmation!==null){
            vehConfirmation.classList.remove("d-none")
        }
        
    }else{
        vehicleForm[vehicleInputIndex].classList.add("d-none")
        vehicleForm[++vehicleInputIndex].classList.remove("d-none")
    }
}

let vehicleNext = document.getElementById("vehicle-next") as HTMLButtonElement;

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

const usdBtn = document.getElementById("usd-btn");
if(usdBtn!==null){
    usdBtn.addEventListener("click", displayPriceInDollar)
}

const inrBtn = document.getElementById("inr-btn");
if(inrBtn!==null){
    inrBtn.addEventListener("click", displayPriceInInr)
}

const yenBtn = document.getElementById("yen-btn");
if(yenBtn!==null){
    yenBtn.addEventListener("click", displayPriceInYen)
}

