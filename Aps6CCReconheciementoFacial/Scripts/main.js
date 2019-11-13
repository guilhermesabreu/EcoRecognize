var modal = document.getElementById("popUp");

var btn = document.getElementById("btnEntrar");

btn.onclick = function () {
    modal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

