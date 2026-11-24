let timerInterval = null;
        let stopwatchInterval = null;

        let timerSeconds = 0;
        let stopwatchSeconds = 0;

        let alarm = "";

        function formatTime(seconds) {
            let h = Math.floor(seconds / 3600);
            let m = Math.floor((seconds % 3600) / 60);
            let s = seconds % 60;

            return String(h).padStart(2, "0") + ":" +
                   String(m).padStart(2, "0") + ":" +
                   String(s).padStart(2, "0");
        }

        function updateClock() {
            let now = new Date();

            document.getElementById("clock").textContent =
                now.toLocaleTimeString("ru-RU", {
                    hour12: false
                });

            let currentTime = String(now.getHours()).padStart(2, "0") +
                ":" + String(now.getMinutes()).padStart(2, "0");

            if (alarm !== "" && currentTime === alarm) {
                document.getElementById("alarmMessage").textContent = "Пора!";
                alarm = "";
            }
        }

        function startTimer() {
            if (timerInterval !== null) return;

            if (timerSeconds === 0) {
                let minutes = Number(document.getElementById("minutes").value) || 0;
                let seconds = Number(document.getElementById("seconds").value) || 0;

                timerSeconds = minutes * 60 + seconds;
            }

            if (timerSeconds <= 0) return;

            timerInterval = setInterval(function() {
                timerSeconds--;

                let m = Math.floor(timerSeconds / 60);
                let s = timerSeconds % 60;

                document.getElementById("timer").textContent =
                    String(m).padStart(2, "0") + ":" +
                    String(s).padStart(2, "0");

                if (timerSeconds <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    document.getElementById("timer").textContent = "Время вышло!";
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        function resetTimer() {
            stopTimer();
            timerSeconds = 0;
            document.getElementById("timer").textContent = "00:00";
            document.getElementById("minutes").value = "";
            document.getElementById("seconds").value = "";
        }

        function startStopwatch() {
            if (stopwatchInterval !== null) return;

            stopwatchInterval = setInterval(function() {
                stopwatchSeconds++;

                document.getElementById("stopwatch").textContent =
                    formatTime(stopwatchSeconds);
            }, 1000);
        }

        function stopStopwatch() {
            clearInterval(stopwatchInterval);
            stopwatchInterval = null;
        }

        function resetStopwatch() {
            stopStopwatch();
            stopwatchSeconds = 0;

            document.getElementById("stopwatch").textContent = "00:00:00";
            document.getElementById("laps").innerHTML = "";
        }

        function addLap() {
            let li = document.createElement("li");

            li.textContent = formatTime(stopwatchSeconds);

            document.getElementById("laps").append(li);
        }

        function updateNewYear() {
            let now = new Date();
            let year = now.getFullYear();

            let newYearDate = new Date(year + 1, 0, 1);

            let difference = newYearDate - now;

            let days = Math.ceil(difference / (1000 * 60 * 60 * 24));

            document.getElementById("newYear").textContent =
                days + " дней 🎄";
        }

        function setAlarm() {
            alarm = document.getElementById("alarmTime").value;

            document.getElementById("alarmMessage").textContent =
                alarm ? "Будильник установлен на " + alarm : "Выберите время";
        }

        updateClock();
        updateNewYear();

        setInterval(updateClock, 1000);
        setInterval(updateNewYear, 60000);