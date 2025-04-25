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

let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [
                2009,
                2010,
                2011,
                2012,
                2013,
                2014,
                2015
            ],
            datasets: [
                {
                    label: "Series A",
                    data: [0, 150, 20, 150, 20, 50, 150],
                    borderColor: 'rgb(142, 174, 255)',
                },
                {
                    label: "Series B",
                    data: [0, 30, 50, 80, 110, 150, 170],
                    borderColor: 'rgb(75, 192, 192)',
                },
                {
                    label: "Series C",
                    data: [0, 50, 150, 40, 150, 40, 130],
                    borderColor: 'rgb(251, 136, 245)',
                },
            ],
        },
    });


    const dtx = document.getElementById("donut-chart").getContext("2d");

    const doughnutChart = new Chart(dtx, {
        type: 'doughnut',
        radius: "140%",
        data: {
            labels: [
              'Canada',
              'USA',
              'London'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [30, 12, 20],
              backgroundColor: [
                '#5b6be8',
                '#40a4f1',
                '#c1c5e2'
              ],
              hoverOffset: 4
            }]
          },
          options:{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "50%",
          }
      });