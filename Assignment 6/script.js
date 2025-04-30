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
        empForm[empIndex].classList.add("d-none");
        empForm[++empIndex].classList.remove("d-none");
    }
}

empNext.addEventListener("click", employeeFormHandler)


empEnt.forEach(e => (
    e.addEventListener("keypress",()=>{
        if(e.key === "Enter"){
            employeeFormHandler;
        }
    })
))