let numb:number = 10;

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
    contact:number;
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

const isNum = (str:string)=>{
    return /\d/.test(str);
}

let empIndex:number = 0;
let empForm = document.querySelectorAll<HTMLElement>("#emp-form>div");
let empNext = document.querySelector<HTMLButtonElement>("#emp-next");
let empEnt = document.querySelectorAll<HTMLInputElement>("#emp-form input")
let empRegistrationNumber:number = 0;
let empObj = {

}


const empFormHandler = (e)=>{
    e.preventDefault();
    console.log();
    
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
        empRegistrationNumber++;
        const currForm = document.getElementById("emp-form");
        currForm!==null && currForm.classList.add("d-none");
        localStorage.setItem("ticketNumber", empRegistrationNumber.toString());
        elem!==null && elem.innerText === `your ticket number is ${empRegistrationNumber}`;
        elem!==null && elem.classList.remove("d-none");
    }else{
        let elem = empForm[empIndex].getElementsByTagName("input")[0];
        
        
        if(elem.getAttribute("name") === "fullName" && (elem.value.length<3 || isNum(elem.value))){
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger")
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3")
        }else if((elem.getAttribute("name") === "password" || elem.getAttribute("name") === "cnfPassword") && passwordVerify(elem.value)!==4){
            console.log(passwordVerify(elem.value));
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger")
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3")
        }
        else{
            let inpElem = empForm[empIndex].querySelectorAll<HTMLInputElement>("input");

        inpElem.forEach(ever =>{
            if(ever.type === "radio"){
                if(ever.checked){
                    empObj[`${ever.name}`] = ever.value;
                }
            }else{
                empObj[`${ever.name}`] = ever.value;
            }
        })

        console.log(empObj);
            
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
        console.log("dadedad")
        if(e.key === "Enter"){
            empFormHandler(e);
        }
    })
))