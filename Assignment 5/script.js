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


      const width = window.innerWidth;

      window.onload = ()=>{
        if(width>700){
            document.getElementById("side").classList.remove("position-absolute")
            console.log("Done")
        }else{
            document.getElementById("side").classList.add("position-absolute")
            console.log("Done")
        }
      }

      const hamberger = document.getElementById("ham-menu");

      hamberger.addEventListener("click", ()=>{
        document.getElementById("side").classList.remove("d-none")
      })

      const closeHam = document.getElementById("side-close");

      closeHam.addEventListener("click", ()=>{
        document.getElementById("side").classList.add("d-none")
        document.getElementById("side").classList.add("position-absolute")
      })