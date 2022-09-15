function sliderInit(){
    const slideValue = document.querySelector("#ZoomSpinnerValue");
    const inputSlider = document.querySelector("#ZoomSlider");

    var x = document.getElementById("slider");
    x.style.display = "none";

    inputSlider.oninput = (()=>{
        let value = inputSlider.value;
        value = Math.round(value/100)*100;
        inputSlider.value = value;
        slideValue.innerText = value;
        maxLidar = value;
        slideValue.style.left = (value*100/4000) + "%"; 
        slideValue.classList.add("show");
    });

    inputSlider.onblur = (() => {
        slideValue.classList.remove("show");
    });
    
}

function sliderDisappear(){
    var x = document.getElementById("slider");

    x.style.display = "none";
}
function sliderAppear(){
    var x = document.getElementById("slider");

    x.style.display = "block";
}

