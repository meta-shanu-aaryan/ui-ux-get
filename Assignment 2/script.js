const collapseEmp = document.querySelector("#employee-collapse>img")

console.log(collapseEmp);

const employeeExpand = ()=>{
    console.log("Entered")
}

collapseEmp.addEventListener("click",()=>{
    const getEmpComp = document.querySelector(".employee-full")
    const rightArr = document.querySelector("#employee-collapse>img");

    if(getEmpComp.style.display==="none"){
        getEmpComp.style.display = "flex";
        rightArr.toggleClass("rotate");
    }else{
        getEmpComp.style.display = "none";
    }

    


});


