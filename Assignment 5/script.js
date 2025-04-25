let btn = document.querySelectorAll(".collapsable");

const toggleCollapse = ()=>{
    console.log("clicked")
    let nextSibling = btn.nextElementSibling;
    console.log(nextSibling)
    if(nextSibling.style.display==="none"){
        nextSibling.style.display="flex";
    }else{
        nextSibling.style.display="none"
    }
}

btn.forEach(button=>{
    button.addEventListener("click", ()=>{
        console.log("clicked")
        const nextSibling = button.nextElementSibling;
        console.log(nextSibling)
        if(nextSibling.style.display==="none"){
            nextSibling.style.display="flex";
        }else{
            nextSibling.style.display="none"
        }
    });
})

// btn.addEventListener("click", toggleCollapse);

