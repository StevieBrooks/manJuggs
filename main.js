

window.addEventListener("load", () => {

    // setTimeout(function() {
    //     $("#welcomeModal").modal("show");
    // }, 2000)

    // $("#stopwatchModal").modal("show");
    // $("#countdownModal").modal("show");
    // $("#todoModal").modal("show");
    // $("#gymModal").modal("show");
    // $("#bleepModal").modal("show");
    // $("#youtubeModal").modal("show");

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
/* end of stopwatch section */


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
/* end of countdown section */


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
/* end of todo list section */


/* BLEEP SECTION */

$(".bleep-btn").click(function() {
    $("#bleepModal").modal("show");
})

/* only 9 levels for demo purposes */
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
    level4: {
        shuttles: 9,
        "time per shuttle (s)": 7.21,
        "total level time (s)": 64.8,
        "distance per level (m)": 180,
        "cumulative distance (m)": 640
    },
    level5: {
        shuttles: 9,
        "time per shuttle (s)": 6.86,
        "total level time (s)": 61.7,
        "distance per level (m)": 180,
        "cumulative distance (m)": 820
    },
    level6: {
        shuttles: 10,
        "time per shuttle (s)": 6.55,
        "total level time (s)": 65.5,
        "distance per level (m)": 200,
        "cumulative distance (m)": 1020
    },
    level7: {
        shuttles: 10,
        "time per shuttle (s)": 6.26,
        "total level time (s)": 62.6,
        "distance per level (m)": 200,
        "cumulative distance (m)": 1220
    },
    level8: {
        shuttles: 11,
        "time per shuttle (s)": 6,
        "total level time (s)": 66,
        "distance per level (m)": 220,
        "cumulative distance (m)": 1440
    },
    level9: {
        shuttles: 11,
        "time per shuttle (s)": 5.76,
        "total level time (s)": 63.4,
        "distance per level (m)": 220,
        "cumulative distance (m)": 1660
    },
}

let time = 0;
let bleepMils = 0;
let bleepSecs = 0;
let shuttleCount = 0;
let levDeets = null;
let bleepClock = null;
let i = 0;
let beep = new Audio('beep.wav');
let beepNewLevel = new Audio('beepNewLevel.wav');

$(".bleep-start").click(function() {
    beepNewLevel.play();
    $(".bleep-distance").css("display", "none");
    $(".bleep-final-level").css("display", "none");
    $(".bleep-level").css("display", "block");

    levDeets = Object.entries(levelDetails);
    console.log(levDeets[i]);

    console.log(shuttleCount);
    clearInterval(bleepClock);

    
    bleepClock = setInterval(function() {
        $(".bleep-level").text(`Level: ${levDeets[i][0].slice(5)} / Shuttle: ${shuttleCount}`)
        bleepMils++;
        if(bleepMils == 100) {
            bleepMils = 0;
            bleepSecs++;
        }
        time = `${bleepSecs}.${bleepMils}`;
        console.log(time);



        if(time == levDeets[i][1]["time per shuttle (s)"]) {
            bleepSecs = 0;
            bleepMils = 0;
            shuttleCount++;
            beep.play();
            console.log(shuttleCount);
        }

        if(shuttleCount == levDeets[i][1].shuttles) {
            i++;
            shuttleCount = 0;
            beepNewLevel.play();
            console.log(levDeets[i]);
            $(".bleep-mot").css("display", "block");
            $(".bleep-mot").text(`Congrats, onto level ${i + 1}`);
            setTimeout(removeMot, 2000);
        }
    }, 10)   

})

$(".bleep-stop").click(function() {
    $(".bleep-level").css("display", "none");
    $(".bleep-distance").css("display", "block");
    $(".bleep-final-level").css("display", "block");
    setTimeout(resetTest, 1);
   
    
    if(i < 1) {
        $(".bleep-distance").text(`Total Distance: ${shuttleCount * 20}`);
    } else {
        let longerDistance = (levDeets[i - 1][1]["cumulative distance (m)"]) + (shuttleCount * 20);
        $(".bleep-distance").text(`Total Distance: ${longerDistance}`);
    }

    $(".bleep-final-level").text(`Final Level: ${levDeets[i][0].slice(5)} / Shuttle: ${shuttleCount}`)
})

function resetTest() {
    time = 0;
    bleepMils = 0;
    bleepSecs = 0;
    shuttleCount = 0;
    i = 0;
    clearInterval(bleepClock);
}

function removeMot() {
    $(".bleep-mot").css("display", "none");
}
/* end of bleep test section */


/* GYM SEARCH SECTION */

// let userLat = null;
// let userLong = null;
// // let showPosition = null;

// $(".gym-btn").click(function() {
//     $("#gymModal").modal("show");

//     var x = document.getElementById("demo");

//     function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
//     }
//     getLocation();

//     function showPosition(position) {
//         userLat = position.coords.latitude;
//         userLong = position.coords.longitude;
//     x.innerHTML = "Latitude: " + position.coords.latitude +
//     "<br>Longitude: " + position.coords.longitude;
//     /* need to figure out how to extract this data and use in ajax call. console log below aint working */
//     makeAjaxRequest(userLat, userLong);
//     }

//     function makeAjaxRequest(userLat, userLong) {
//         const settings = {
//             async: true,
//             crossDomain: true,
//             url: `gymSearch.php`,
//             method: 'GET',
//         };
        
//         $.ajax(settings).done(function (response) {
//             let gymResponse = JSON.parse(response);
//             console.log(gymResponse);
//         });
//     }

// })


/*YOUTUBE SECTION*/
/* return to this later */


// const youtubeBtn = document.querySelector(".youtube-btn");
// const youtubeModal = document.querySelector("#youtubeModal");
// const muscleArray = $(".ytdd-item");
//   let muscleChoice = null;
//   let carouselInner = $(".carousel-inner");
//   let ytItem = null;
//   let carouselArr = null;

// youtubeBtn.addEventListener("click", () => {
//     $("#youtubeModal").modal("show");

//     Object.values(muscleArray).forEach(item => {
//         item.addEventListener("click", () => {
            
//             $(".dropdown-toggle").text(item.innerHTML);
//             muscleChoice = item.innerHTML;

//             const xhr = new XMLHttpRequest();
        
//             xhr.open('GET', `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${muscleChoice}%20workout`);
        
//             xhr.addEventListener('readystatechange', function () {
//                 if (this.readyState === this.DONE) {
//                     carouselArr = [];
//                     const res = JSON.parse(this.responseText);
//                     console.log(res);
//                     if(res.items.length == 0) {
//                         console.log("Apologies, no data right now.")
//                     } else {                     
//                         res.items.forEach(item => {
//                             carouselArr.push(item);
//                         })
//                     }

//                     console.log(carouselArr);

//                     carouselArr.forEach(item => {
//                         if(item.type == 'video') {

//                             carouselInner.append().html(`
//                             <div class="carousel-item yt-item">
//                             <a href="${item.url}" target="_blank"><img src="${item.thumbnails[0].url}" class="d-block w-100" alt="..."></a>
//                             <a href="${item.url}" target="_blank">
//                               <div class="carousel-caption d-md-block bg-primary">
//                                 <h5></h5>
//                                 <span class="yt-duration">Duration: ${item.duration}</span>
//                                 <br>
//                                 <span class="yt-views">Views: ${item.views}</span>
//                                 <br>
//                                 <span class="yt-upload">Uploaded: ${item.uploadedAt}</span>
//                               </div>
//                             </a>
//                           </div>
//                             `);

//                             ytItem = document.querySelector(".yt-item:nth-child(2)");
//                             const cloneItem = ytItem.cloneNode(true);
//                             carouselInner.appendChild(cloneItem);




//                                                         Object.keys(item).forEach(key => {
//                                 if(key == "thumbnails") {
//                                     console.log("you can use this item");
//                                 }
//                             })
    

//                         }
//                     })
//                     console.log(carouselInner);

//                 }
//             });
        
//             xhr.setRequestHeader('X-RapidAPI-Key', 'cd323733eemsh2260acaef042b68p173ddajsn26dd1647e98f');
//             xhr.setRequestHeader('X-RapidAPI-Host', 'youtube-search-results.p.rapidapi.com');
        
//             xhr.send();
//         })
//     })

    




// })

// $("#youtubeModal").on("hidden.bs.modal", function() {
//     $(".dropdown-toggle").text("Select Muscle Group");
//     });