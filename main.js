

window.addEventListener("load", () => {

    // setTimeout(function() {
    //     $("#welcomeModal").modal("show");
    // }, 2000)

    $("#stopwatchModal").modal("show");


})


/* STOPWATCH SECTION */

let minutes = 0;
let seconds = 0;
let mils = 0;
let displayMinutes = null;
let displaySeconds = null;
let displayMils = null;
let startInt = null;
let flag = null;
const startBtn = $(".start-btn");

    $(".stopwatch-btn").click(function() {
        $("#stopwatchModal").modal("show");
        flag = true;
    })

    $(".stopwatchDisplay").html("00 m : 00 s : 00 ms");
    startBtn.click(function() {

        if(flag) {
            function1();
        } else {
            function2();
        }
        flag = !flag;
        
    })

    function function1() {

        console.log('function1');
        
        startBtn.text("Pause");
            
        startInt = setInterval(function() {
            mils += 1;

            if (mils == 100) {
                mils = 0;
                seconds += 1;
            }
    
            if (seconds == 60) {
                seconds = 0;
                minutes += 1;
            }
    
            displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
            displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
            displayMils = mils < 10 ? `0${mils}` : mils;
    
            $(".stopwatchDisplay").html(`${displayMinutes} m : ${displaySeconds} s : ${displayMils} ms`);
        
        }, 0010)
    }

    function function2() {
        console.log('function2');
        startBtn.text("Start");
        clearInterval(startInt);
    }
    
    $(".stop-btn").click(function() {
        clearInterval(startInt);
        flag = flag;
        startBtn.text("Start");
        mils = 0;
        seconds = 0;
        minutes = 0;
    })

    $(".reset-btn").click(function() {
        clearInterval(startInt);
        flag = flag;
        startBtn.text("Start");
        mils = 0;
        seconds = 0;
        minutes = 0;
        $(".stopwatchDisplay").html("00 m : 00 s : 00 ms");
    })
/* 2 issues - clock slightly too fast
            - if stop or reset is clicked without pausing first, function 2 is triggered first when reclicking start button.
     */




/*YOUTUBE SECTION*/
const youtubeBtn = document.querySelector(".youtube-btn");
const youtubeModal = document.querySelector("#youtubeModal");
const muscleArray = document.querySelectorAll(".ytdd-item");
let muscleChoice = null;
let carouselInner = document.querySelector(".carousel-inner");
let ytItem = null; 
let carouselArr = [];



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
                            carouselArr.push(item);
                        })
                    }

                    console.log(carouselArr);

                    carouselArr.forEach(item => {
                        if(item.type == 'video') {

                            ytItem = document.querySelector(".yt-item:nth-child(2)");
                            const cloneItem = ytItem.cloneNode(true);
                            carouselInner.appendChild(cloneItem);

                            cloneItem.children[0].href = item.url;
                            cloneItem.children[0].children[0].src = item.thumbnails[0].url;
                            cloneItem.children[1].href = item.url;
                            cloneItem.children[1].children[0].children[1].innerHTML += item.duration;
                            cloneItem.children[1].children[0].children[3].innerHTML += item.views;
                            cloneItem.children[1].children[0].children[5].innerHTML += item.uploadedAt;



                                                        // Object.keys(item).forEach(key => {
                            //     if(key == "thumbnails") {
                            //         console.log("you can use this item");
                            //     }
                            // })
    

                        }
                    })
                    console.log(carouselInner.children);

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