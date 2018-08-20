$(document).ready(function () {
    var counter = 25;
    var breakCount = 5;
    var isRunning = false;
    var startCounter = 0;
    var audio = document.getElementById("myAudio");
    var resumeFlag = 0;
    var hour = 60;
    var countdown,
        seconds,
        funcCountdown,
        goCount,
        convertMinutes,
        backupCounter,
        breakCounter,
        breakRunning,
        secondsBreak,
        countdownBreak,
        startPercent;

    $("#hour").html(0);
    $("#hourUnits").html("HR");
    $("#minutes").html(counter);
    $("#minUnits").html("MIN");
    $("#seconds").html(0);
    $("#secUnits").html("SEC");

    var announce = function () {
        $('#screenclock div p').html('');
        audio.play();
        if (isRunning == true) {
            isRunning = false;
            $("#hour").html("");
            $("#minutes").html("");
            $("#seconds").html("");
            $("#minutes").html("BREAK TIME");

            setTimeout(function () {
                $("#hour").html(0);
                $("#hourUnits").html("HR");
                $("#minutes").html(0);
                $("#minUnits").html("MIN");
                $("#seconds").html(0);
                $("#secUnits").html("SEC");
                startBreak();

            }, 5000);
        } else {
            breakRunning = false;
            $("#minutes").html("BREAK'S OVER");
            setTimeout(function () {
                $("#hour").html(0);
                $("#hourUnits").html("HR");
                $("#minutes").html(0);
                $("#minUnits").html("MIN");
                $("#seconds").html(0);
                $("#secUnits").html("SEC");
                start();
            }, 5000);
        }
    }


    var startBreak = function () {
        breakRunning = true;
        breakCounter++;

        if (breakCounter > 1) {
            counter = backupCounter;
            breakCounter = 1;
            countdownBreak = secondsBreak;
        }

        goCount = setInterval(function () {
            var convertMinutes = Math.floor(countdownBreak / 60);
            var breakConvert = countdownBreak / 60;
            var breakDifference = secondsBreak - countdownBreak;
            var breakPercent = breakDifference / secondsBreak * 100;
            var divide = Math.floor(convertMinutes / hour);
            var timeDiff = convertMinutes - hour * divide;
            var convertSecs = countdownBreak - (convertMinutes * 60);
            console.log("convertSecs: " + convertSecs);

            if (countdownBreak <= 59 && countdownBreak >= 2) {
                $("#hour").html(0);
                $("#minutes").html(0);
                $("#seconds").html(countdownBreak);
                countdownBreak--;
                return;
            } else if (countdownBreak === 1) {
                $("#hour").html(0);
                $("#seconds").html(0);
                $("#seconds").html(countdownBreak);
                countdownBreak--;
                return;
            } else if (countdownBreak === 0) {
                $("#hour").html(0);
                $("#minutes").html(0);
                $("#seconds").html(0);
                clearInterval(goCount);
                announce();
            } else {
                if (convertMinutes > 59) {
                    $("#hour").html(divide);
                    $("#minutes").html(timeDiff);
                    $("#seconds").html(convertSecs);
                    countdownBreak--;
                    return;
                } else {
                    $("#hour").html(0);
                    $("#minutes").html(convertMinutes);
                    $("#seconds").html(convertSecs);
                    countdownBreak--;
                    return;
                }
            }
        }, 1000);
    };

    var start = function () {
        startCounter++;
        isRunning = true;
        if (startCounter > 1) {
            counter = backupCounter;
            startCounter = 1;
            countdown = seconds;
        }

        funcCountdown = setInterval(function () {
            console.log("countdown: " + countdown); //countdown is minutes converted into seconds 25 * 60 for example
            var convertMin = Math.floor(countdown / 60); // convertMin is the seconds (countdown) divided by 60 and then using Math.floor
            console.log("convertMin: " + convertMin);
            var divide = Math.floor(convertMin / hour);
            var timeDiff = convertMin - hour * divide;
            console.log("divide: " + divide);
            console.log("timeDiff: " + timeDiff);
            var convertSecs = countdown - (convertMin * 60);
            console.log("convertSecs: " + convertSecs);

            if (countdown <= 59 && countdown >= 2) {
                $("#minutes").html(0);
                $("#seconds").html(countdown);
                countdown--;
                return;
            } else if (countdown === 1) {
                $("#minutes").html(0);
                $("#seconds").html(countdown);
                countdown--;
                return;
            } else if (countdown === 0) {
                $("#hour").html(0);
                $("#minutes").html(0);
                $("#seconds").html(0);
                clearInterval(funcCountdown);
                announce();
            } else {
                if (convertMin > 59) {
                    $("#hour").html(divide);
                    $("#minutes").html(timeDiff);
                    $("#seconds").html(convertSecs);
                    countdown--;
                    return;
                } else {
                    $("#hour").html(0);
                    $("#minutes").html(convertMin);
                    $("#seconds").html(convertSecs);
                    countdown--;
                    return;
                }
            }
        }, 1000);
    };

    $("#startButton").click(function () {
        if (startCounter == 0) {
            //convert minutes to seconds since it counts down by seconds
            seconds = counter * 60; //10 minutes would be 600 seconds
            countdown = seconds;
            secondsBreak = breakCount * 60;
            countdownBreak = secondsBreak;
            backupCounter = counter;
            breakCounter = breakCount;
            start();
        }
    });

    $("#pauseButton").click(function () {
        if (isRunning == true) {
            resumeFlag = 0;
            clearInterval(funcCountdown);
        }

        if (breakRunning == true) {
            resumeFlag = 0;
            clearInterval(goCount);
        }
    });

    $("#resumeButton").click(function () {
        resumeFlag++;
        if (isRunning == true && countdown != undefined && resumeFlag == 1) {
            //convert minutes to seconds since it counts down by seconds
            seconds = counter * 60; //10 minutes would be 600 seconds
            startCounter = 0;
            start();
        } else if (
            breakRunning == true &&
            countdown != undefined &&
            resumeFlag == 1
        ) {
            secondsBreak = breakCount * 60;
            breakCounter = 0;
            startBreak();
        }
    });

    $("#sub-dur").click(function () {
        counter--;
        var divide = Math.floor(counter / hour);
        var timeDiff = counter - hour * divide;

        if (
            isRunning == false &&
            (breakRunning == false || breakRunning == undefined)
        ) {
            if (counter > 59) {
                $("#hour").html(divide);
                $("#minutes").html(timeDiff);
                $("#dur").html(counter);
            } else if (counter <= 59 && counter > 1) {
                $("#hour").html(0);
                $("#minutes").html(counter);
                $("#dur").html(counter);
            } else {
                counter = 1;
                $("#minutes").html(counter);
                $("#dur").html(counter);
            }
        }
    });

    $("#add-dur").click(function () {
        counter++;
        var divide = Math.floor(counter / hour);
        var timeDiff = counter - hour * divide;

        if (counter > 59) {
            if (
                isRunning == false &&
                (breakRunning == false || breakRunning == undefined)
            ) {
                $("#hour").html(divide);
                $("#minutes").html(timeDiff);
                $("#dur").html(counter);
            }
        } else {
            if (
                isRunning == false &&
                (breakRunning == false || breakRunning == undefined)
            ) {
                $("#minutes").html(counter);
                $("#dur").html(counter);
            }
        }
    });

    $("#sub-break").click(function () {
        if (
            breakRunning == false ||
            (breakRunning == undefined && isRunning == false)
        ) {
            if (breakCount > 1) {
                breakCount--;
                $("#bre").html(breakCount);
            } else {
                breakCount = 1;
                $("#bre").html(breakCount);
            }
        }
    });

    $("#add-break").click(function () {
        if (
            breakRunning == false ||
            (breakRunning == undefined && isRunning == false)
        ) {
            breakCount++;
            $("#bre").html(breakCount);
        }
    });

    $("#resetButton").click(function () {
        clearInterval(funcCountdown);
        clearInterval(goCount);
        counter = 25;
        breakCount = 5;
        isRunning = false;
        breakRunning = false;
        breakCounter = 0;
        startCounter = 0;
        $("#bre").html(breakCount);
        $("#dur").html(counter);
        $("#hour").html(0);
        $("#minutes").html(counter);
        $("#seconds").html(0);
    });
});
