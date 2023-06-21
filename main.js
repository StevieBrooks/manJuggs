let modal = document.querySelector(".modal");
let welcomeModal = document.querySelector("#welcomeModal");
let box = document.querySelector(".box");
let modalClose = document.querySelector(".btn-close");

window.addEventListener("load", () => {

    setTimeout(function() {
        welcomeModal.style.display = "block";
    }, 2000)

})

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
})