

window.addEventListener("load", () => {

    // setTimeout(function() {
    //     $("#welcomeModal").modal("show");
    // }, 2000)

    // $("#stopwatchModal").modal("show");
    // $("#countdownModal").modal("show");
    // $("#todoModal").modal("show");
    // $("#gymModal").modal("show");
    $("#bleepModal").modal("show");

})


/* BLEEP SECTION */

$(".bleep-btn").click(function() {
    $("#bleepModal").modal("show");
})

const levelDetails = {
    level1: {
        shuttles: 7,
        "time per shuttle (s)": 9,
        "total level time (s)": 63,
        "distance per level (m)": 140,
        "cumulative distance (m)": 140
    },
    level2: {
        shuttles: 8,
        "time per shuttle (s)": 8,
        "total level time (s)": 64,
        "distance per level (m)": 160,
        "cumulative distance (m)": 300
    },
    level3: {
        shuttles: 8,
        "time per shuttle (s)": 7.58,
        "total level time (s)": 60.6,
        "distance per level (m)": 160,
        "cumulative distance (m)": 460
    },
}

let time = 0;
let shuttleCount = 0;
let levDeets = null;
let bleepClock = null;
let i = 0;

$(".bleep-start").click(function() {

    levDeets = Object.entries(levelDetails);
    console.log(levDeets);

    console.log(shuttleCount);
    
    bleepClock = setInterval(function() {
        time++;   
        console.log(time);
        if(time == levDeets[i][1]["time per shuttle (s)"]) {
            console.log("hit");
            time = 0;
            shuttleCount++;
            console.log(shuttleCount);
            if(shuttleCount == levDeets[i][1].shuttles) {
                i++;
                shuttleCount = 0;
                console.log(levDeets[i]);
                $(".bleep-level").text(`Congrats, onto level ${i + 1}`);
            }
        }
    }, 0100)

    
    

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


/* COUNTDOWN SECTION */

let cdDisplayHours = null;
let cdDisplayMinutes = null;
let cdDisplaySeconds = null;
let cdStartInt = null;
const cdStartBtn = $(".cd-start-btn");
const cdResetBtn = $(".cd-reset-btn");
const cdDisplay = $(".countdown-display");
cdDisplay.html("00 : 00 : 00");
let cdHours = $(".cd-hours");
let cdMinutes = $(".cd-minutes");
let cdSeconds = $(".cd-seconds");
let totalSeconds = null;
let hourFail = null;
let minFail = null;
let secFail = null;
let onStandby = null;

$(".countdown-btn").click(function() {
        $("#countdownModal").modal("show");
        onStandby = true;
    })

function validateHoursField() {
    if(!validateHours(cdHours)) {
        $(".hourMessage").text("Enter number from 0 - 99");
        cdHours.css("box-shadow", "0 0 3px red");
        cdHours.val("");
        hourFail = true;
    } else {
        $(".hourMessage").text("");
        hourFail = false;
    }
}

function validateHours(cdHours) {
    return cdHours.val() < 100;
}

function validateMinutesField() {
    if(!validateMinutes(cdMinutes)) {
        $(".minuteMessage").text("Enter number from 0 - 59");
        cdMinutes.css("box-shadow", "0 0 3px red");
        cdMinutes.val("");
        minFail = true;
    } else {
        $(".minuteMessage").text("");
        minFail = false;
    }

}
function validateMinutes(cdMinutes) {
    return cdMinutes.val().length < 2 || cdMinutes.val() < 60;
}

function validateSecondsField() {
    if(!validateSeconds(cdSeconds)) {
        $(".secondMessage").text("Enter number from 0 - 59");
        cdSeconds.css("box-shadow", "0 0 3px red");
        cdSeconds.val("");
        secFail = true;
    } else {
        $(".secondMessage").text("");
        secFail = false;
    }

function validateSeconds(cdSeconds) {
    return cdSeconds.val().length < 2 || cdSeconds.val() < 60;
}
}

function calibrateClock() {
    
    cdDisplayHours = cdHours.val().length == 2 ? cdHours.val() : cdHours.val().length == 1 ? `0${cdHours.val()}` : "00";

    cdDisplayMinutes = cdMinutes.val().length == 2 ? cdMinutes.val() : cdMinutes.val().length == 1 ? `0${cdMinutes.val()}` : "00";

    cdDisplaySeconds = cdSeconds.val().length == 2 ? cdSeconds.val() : cdSeconds.val().length == 1 ? `0${cdSeconds.val()}` : "00";

}


cdStartBtn.click(function() {

    if(onStandby) {
        timerFunc1();
    } else {
        timerFunc2();
    }

    onStandby = !onStandby;

    

    function timerFunc1() {

        validateHoursField();
        validateMinutesField();
        validateSecondsField();
        calibrateClock();

        if(!hourFail && !minFail && !secFail) {
            totalSeconds =
            parseInt(cdDisplayHours) * 3600 +
            parseInt(cdDisplayMinutes) * 60 +
            parseInt(cdDisplaySeconds);

            cdStartBtn.text("Stop");
        
          cdStartInt = setInterval(function () {
        
            totalSeconds--;
        
            if (totalSeconds < 0) {
              clearInterval(cdStartInt);
              cdDisplay.html("00 : 00 : 00");
              cdStartBtn.text("Start");
              onStandby = true;
              return;
            }
        
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
        
            const displayHours = hours.toString().padStart(2, "0");
            const displayMinutes = minutes.toString().padStart(2, "0");
            const displaySeconds = seconds.toString().padStart(2, "0");
        
            cdDisplay.html(`${displayHours} : ${displayMinutes} : ${displaySeconds}`);
        
          }, 1000);

          setTimeout(function() {
            cdHours.val("");
            cdMinutes.val("");
            cdSeconds.val("");
          }, 2000)

        }
    }

    function timerFunc2() {
        clearInterval(cdStartInt);
        onStandby = true;
    }
})

cdResetBtn.click(function() {
    cdDisplay.html("00 : 00 : 00");
    clearInterval(cdStartInt);
    cdHours.val("");
    cdMinutes.val("");
    cdSeconds.val("");
    onStandby = true;
    cdStartBtn.text("Start");
    $(".hourMessage").text("");
    $(".minuteMessage").text("");
    $(".secondMessage").text("");
})

$("#countdownModal").on("hidden.bs.modal", function() {
    clearInterval(cdStartInt); 
    onStandby = false;
    cdStartBtn.text("Start");
    cdDisplay.html("00 : 00 : 00");
    $(".hourMessage").text("");
    $(".minuteMessage").text("");
    $(".secondMessage").text("");
    cdHours.val("");
    cdMinutes.val("");
    cdSeconds.val("");
    });

    /* 
    
        FIX THESE THINGS...

        - After invalid entry, timer needs to be reset otherwise new entry does nothing
        - Pause feature might be nice
        - Add motivational message box underneath. Use for intervals of 5 minutes and 15 second intervals for last 90secs
    
    */


/* TO-DO SECTION */

$(".todo-btn").click(function() {
    $("#todoModal").modal("show");
})

const todoInput = $(".todo-input");
const todoButton = $(".todo-button");
const tdModalBody = $(".td-modal-body");

todoButton.click(function() {
    tdModalBody.append(`
    <div class="card td-card my-2">
    <div class="card-body py-1">
      <div class="row">
        <div class="col col-8">
          <p class="mb-0">${todoInput.val()}</p>
        </div>
        <div class="col col-4">
          <button class="td-done">Done</button>
          <button class="td-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
    `);
    todoInput.val("");
})

$("#todoModal").on("keydown", function(e) {
    if(e.originalEvent.keyCode == 13 && todoInput.val().length > 0) {
        tdModalBody.append(`
    <div class="card td-card my-2">
        <div class="card-body py-1">
            <div class="row">
                <div class="col col-8">
                    <p class="mb-0">${todoInput.val()}</p>
                </div>
                <div class="col col-4">
                    <button class="td-done">Done</button>
                    <button class="td-delete">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `);
    todoInput.val("");
    }
})

tdModalBody.on("click", ".td-done", function(e) {
    console.log(e.target.parentElement.previousElementSibling.children[0]);
    const task = e.target.parentElement.previousElementSibling.children[0];
    
    task.classList.toggle("task-done");
})

tdModalBody.on("click", ".td-delete", function(e) {
    e.target.parentElement.parentElement.parentElement.remove();
})


/* GYM SEARCH SECTION */

let userLat = null;
let userLong = null;
// let showPosition = null;

$(".gym-btn").click(function() {
    $("#gymModal").modal("show");

    var x = document.getElementById("demo");

    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    }
    getLocation();

    function showPosition(position) {
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    /* need to figure out how to extract this data and use in ajax call. console log below aint working */
    makeAjaxRequest(userLat, userLong);
    }

    function makeAjaxRequest(userLat, userLong) {
        const settings = {
            async: true,
            crossDomain: true,
            url: `gymSearch.php`,
            method: 'GET',
        };
        
        $.ajax(settings).done(function (response) {
            let gymResponse = JSON.parse(response);
            console.log(gymResponse);
        });
    }

})


/*YOUTUBE SECTION*/
const youtubeBtn = document.querySelector(".youtube-btn");
const youtubeModal = document.querySelector("#youtubeModal");
const muscleArray = document.querySelectorAll(".ytdd-item");
let muscleChoice = null;
let carouselInner = document.querySelector(".carousel-inner");
let ytItem = null; 
let carouselArr = [];



youtubeBtn.addEventListener("click", () => {
    $("#youtubeModal").modal("show");

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