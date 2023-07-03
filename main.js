

window.addEventListener("load", () => {

    // setTimeout(function() {
    //     $("#welcomeModal").modal("show");
    // }, 2000)

    // $("#stopwatchModal").modal("show");
    $("#countdownModal").modal("show");


})


/* COUNTDOWN SECTION */

let cdDisplayHours = null;
let cdDisplayMinutes = null;
let cdDisplaySeconds = null;
let cdStartInt = null;
let cdFlag = null;
const cdStartBtn = $(".cd-start-btn");
const cdDisplay = $(".countdown-display");
cdDisplay.html("00 : 00 : 00");
let cdHours = $(".cd-hours");
let cdMinutes = $(".cd-minutes");
let cdSeconds = $(".cd-seconds");
let currentDate = new Date();

$(".countdown-btn").click(function() {
        $("#countdownModal").modal("show");
        flag = true;
    })

function validateHours(cdHours) {
    return cdHours.val().length > 2 ? $(".hourMessage").text("Enter number from 0 - 99") : $(".hourMessage").text("");
}

function validateMinutes(cdMinutes) {
    return cdMinutes.val().length > 2 || cdMinutes.val() > 59 ? $(".minuteMessage").text("Enter number from 0 - 59") : $(".minuteMessage").text("");
}

function validateSeconds(cdSeconds) {
    return cdSeconds.val().length > 2 || cdSeconds.val() > 59 ? $(".secondMessage").text("Enter number from 0 - 59") : $(".secondMessage").text("");
}

function calibrateClock() {
    
    cdDisplayHours = cdHours.val().length == 2 ? cdHours.val() : cdHours.val().length == 1 ? `0${cdHours.val()}` : "00";

    cdDisplayMinutes = cdMinutes.val().length == 2 ? cdMinutes.val() : cdMinutes.val().length == 1 ? `0${cdMinutes.val()}` : "00";

    cdDisplaySeconds = cdSeconds.val().length == 2 ? cdSeconds.val() : cdSeconds.val().length == 1 ? `0${cdSeconds.val()}` : "00";

    if(cdDisplayHours < 100 && cdDisplayMinutes < 60 && cdDisplaySeconds < 60) {
        cdDisplay.html(`${cdDisplayHours} : ${cdDisplayMinutes} : ${cdDisplaySeconds}`);
    } else {
        cdDisplay.html("00 : 00 : 00");
    }

}


cdStartBtn.click(function() {
    validateHours(cdHours);
    validateMinutes(cdMinutes);
    validateSeconds(cdSeconds);
    calibrateClock();

    let totalSeconds =
    parseInt(cdDisplayHours) * 3600 +
    parseInt(cdDisplayMinutes) * 60 +
    parseInt(cdDisplaySeconds);

  cdStartInt = setInterval(function () {
    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(cdStartInt);
      cdDisplay.html("00 : 00 : 00");
      return;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const displayHours = hours.toString().padStart(2, "0");
    const displayMinutes = minutes.toString().padStart(2, "0");
    const displaySeconds = seconds.toString().padStart(2, "0");

    cdDisplay.html(`${displayHours} : ${displayMinutes} : ${displaySeconds}`);
  }, 1);
})

/* Add motivational message box underneath. Use for intervals of 5 minutes and 15 second intervals for last 90secs */




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
        startFunc1();
    } else {
        startFunc2();
    }
    flag = !flag;
    
})

function startFunc1() {

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
    
    }, 10)
}

function startFunc2() {
    console.log('function2');
    startBtn.text("Start");
    clearInterval(startInt);
}

$(".stop-btn").click(function() {
    if(startBtn.text("Pause")) 
    clearInterval(startInt);
    flag = true;
    startBtn.text("Start");
    mils = 0;
    seconds = 0;
    minutes = 0;
})

$(".reset-btn").click(function() {
    clearInterval(startInt);
    flag = true;
    startBtn.text("Start");
    mils = 0;
    seconds = 0;
    minutes = 0;
    $(".stopwatchDisplay").html("00 m : 00 s : 00 ms");
})

$("#stopwatchModal").on("hidden.bs.modal", function() {
    clearInterval(startInt); 
    flag = true;
    startBtn.text("Start");
    mils = 0;
    seconds = 0;
    minutes = 0;
    $(".stopwatchDisplay").html("00 m : 00 s : 00 ms");
    });


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