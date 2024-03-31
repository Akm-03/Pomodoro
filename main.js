
var session_seconds = "00";
var session_minutes = 25;

var click_sound = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

function start_timer() {
  click_sound.play();

  session_minutes = 24;
  session_seconds = 59;

  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;

  var minutes_interval = setInterval(minutesTimer, 60000);
  var seconds_interval = setInterval(secondsTimer, 1000);

  function minutesTimer() {
    session_minutes = session_minutes - 1;
    document.getElementById("minutes").innerHTML = session_minutes;
  }

  function secondsTimer() {
    session_seconds = session_seconds - 1;
    document.getElementById("seconds").innerHTML = session_seconds;

   
    if (session_seconds <= 0) {
      if (session_minutes <= 0) {
       
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);

        document.getElementById("done").innerHTML =
          "Session Completed!! Take a Break";

        document.getElementById("done").classList.add("show_message");

        bell.play();
      }
    
      session_seconds = 60;
    }
  }

  

}










document.addEventListener("DOMContentLoaded", function() {
  let workDuration = document.getElementById("work-duration").value * 60;
  let breakDuration = document.getElementById("break-duration").value * 60;
  let timer;
  let isWorking = true;
  let isPaused = true;
  let sessionCount = 0;

  const displayTime = document.getElementById("time-display");
  const progressBar = document.getElementById("progress-bar");
  const sessionCounter = document.getElementById("session-count");

  function startTimer(duration) {
      let startTime = Date.now();
      let endTime = startTime + duration * 1000;

      timer = setInterval(function() {
          let currentTime = Date.now();
          let remainingTime = endTime - currentTime;

          if (remainingTime <= 0) {
              clearInterval(timer);
              if (isWorking) {
                  sessionCount++;
                  sessionCounter.textContent = sessionCount;
                  isWorking = false;
                  displayTime.textContent = formatTime(breakDuration);
                  progressBar.style.width = "0%";
                  startTimer(breakDuration);
              } else {
                  isWorking = true;
                  displayTime.textContent = formatTime(workDuration);
                  progressBar.style.width = "0%";
                  startTimer(workDuration);
              }
          } else {
              displayTime.textContent = formatTime(Math.floor(remainingTime / 1000));
              progressBar.style.width = ((duration * 1000 - remainingTime) / (duration * 1000)) * 100 + "%";
          }
      }, 1000);
  }

  function formatTime(seconds) {
      let mins = Math.floor(seconds / 60);
      let secs = seconds % 60;
      return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  document.getElementById("start-btn").addEventListener("click", function() {
      if (isPaused) {
          isPaused = false;
          startTimer(isWorking ? workDuration : breakDuration);
      }
  });

  document.getElementById("pause-btn").addEventListener("click", function() {
      isPaused = true;
      clearInterval(timer);
  });

  document.getElementById("reset-btn").addEventListener("click", function() {
      isPaused = true;
      clearInterval(timer);
      sessionCount = 0;
      sessionCounter.textContent = sessionCount;
      progressBar.style.width = "0%";
      displayTime.textContent = formatTime(workDuration);
  });

  document.getElementById("work-duration").addEventListener("input", function() {
      workDuration = this.value * 60;
      if (isWorking && isPaused) {
          displayTime.textContent = formatTime(workDuration);
      }
  });

  document.getElementById("break-duration").addEventListener("input", function() {
      breakDuration = this.value * 60;
      if (!isWorking && isPaused) {
          displayTime.textContent = formatTime(breakDuration);
      }
  });
  document.getElementById("pause-btn").addEventListener("click", function() {
    isPaused = true;
    clearInterval(timer);
    if (isWorking) {
        displayTime.textContent = formatTime(workDuration);
    } else {
        displayTime.textContent = formatTime(breakDuration);
    }
    progressBar.style.width = "0%";
});

});
