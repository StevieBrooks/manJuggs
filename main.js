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


/*YOUTUBE SECTION*/
const youtubeBtn = document.querySelector(".youtube-btn");
const youtubeModal = document.querySelector("#youtubeModal");
const muscleArray = document.querySelectorAll(".yt-item");
let muscleChoice = null;
let carouselInner = document.querySelector(".carousel-inner");
const ytItem = document.querySelector(".yt-item");
let carouselArr = Array.from(carouselInner);
carouselArr.push(ytItem);
console.log(carouselArr);


youtubeBtn.addEventListener("click", () => {
    youtubeModal.style.display = "block";

    Object.values(muscleArray).forEach(item => {
        item.addEventListener("click", () => {
            muscleChoice = item.innerHTML;

            const xhr = new XMLHttpRequest();
        
            xhr.open('GET', `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${muscleChoice}%20workout`);
        
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === this.DONE) {
                    const res = JSON.parse(this.responseText);
                    console.log(res);
                    if(res.items.length == 0) {
                        console.log("Apologies, no data right now.")
                    } else {                     
                        res.items.forEach(item => {
                            // carouselInner.innerHTML += ytItem;
                            carouselArr.push(ytItem);
                            console.log(carouselArr.length);
                            
                            
                            // ytItem.children[0].children[0].src = item.thumbnails[0].url;
                            // Object.keys(item).forEach(key => {
                            //     if(key == "thumbnails") {
                            //         console.log("you can use this item");
                            //     }
                            // })
    
                            /*may need for if statement edge cases (if(Objext contains thumbnail, etc) - https://masteringjs.io/tutorials/fundamentals/foreach-object */
                        })
                    }
                    console.log(carouselArr);
                }
            });
        
            xhr.setRequestHeader('X-RapidAPI-Key', 'cd323733eemsh2260acaef042b68p173ddajsn26dd1647e98f');
            xhr.setRequestHeader('X-RapidAPI-Host', 'youtube-search-results.p.rapidapi.com');
            /* NEED TO FIGURE OUT TO HIDE API KEY FROM NOW ON - VERY IMPORTANT!!! 
            use this - https://www.freecodecamp.org/news/how-to-securely-store-api-keys-4ff3ea19ebda/
            */
        
            xhr.send();
        })
    })

    





    // ytItem1.children[0].attributes[0].value = "https://www.youtube.com/";
    // ytItem1.children[1].attributes[0].value = "https://www.youtube.com/";
})