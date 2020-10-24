window.onload = function(){
    localStorage.clear();
    let naam = document.querySelector('#js--naam');
    document.getElementById("js--button").onclick = function(){
        console.log(naam)
        // if (naam.value) {
            localStorage.setItem("naam", naam.value);
            localStorage.setItem("status", "alpha");
            console.log(naam)
        //}
        window.location.href = "Onderzoek.html";
    }
}