var clockDisplay = document.getElementById('clockDisplay');
var alarmHourInput = document.getElementById('alarmHour');
var alarmMinuteInput = document.getElementById('alarmMinute');
var alarmSecondInput = document.getElementById('alarmSecond');
var alarmPeriodInput = document.getElementById('alarmPeriod');
var setAlarmBtn = document.getElementById('setAlarmBtn');
var alarmsList = document.getElementById('alarmsList');
var alarms = [];
var audio = null; // Declare audio as a global variable

// Update clock every second
setInterval(updateClock, 1000);

// Set alarm button click event
setAlarmBtn.addEventListener('click', function() {
    var hour = parseInt(alarmHourInput.value);
    var minute = parseInt(alarmMinuteInput.value);
    var second = parseInt(alarmSecondInput.value);
    var period = alarmPeriodInput.value;

    if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
        alert('Please enter valid values for the alarm time.');
        return;
    }

    var alarmTime = {
        hour: hour,
        minute: minute,
        second: second,
        period: period
    };

    alarms.push(alarmTime);
    addAlarmToUI(alarmTime);
});

// Function to update the clock display
function updateClock() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle 0 hour (midnight)
    minutes = addLeadingZero(minutes);
    seconds = addLeadingZero(seconds);

    var timeString = hours + ':' + minutes + ':' + seconds + ' ' + period;
    clockDisplay.textContent = timeString;

    checkAlarms(hours, minutes, seconds, period);
}

// Function to add an alarm to the UI
function addAlarmToUI(alarm) {
    var alarmItem = document.createElement('li');
    alarmItem.className = 'list-group-item';
    alarmItem.textContent = alarm.hour + ':' + addLeadingZero(alarm.minute) + ':' + addLeadingZero(alarm.second) + ' ' + alarm.period;

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        removeAlarm(alarm);
    });

    alarmItem.appendChild(deleteBtn);
    alarmsList.appendChild(alarmItem);
}

// Function to remove an alarm from the UI and the alarms array
function removeAlarm(alarm) {
    var index = alarms.indexOf(alarm);
    if (index !== -1) {
        alarms.splice(index, 1);
        alarmsList.removeChild(alarmsList.childNodes[index]);
    }
}

// Function to check alarms and display alert and play alarm if any alarm matches the current time
function checkAlarms(hours, minutes, seconds, period) {
    for (var i = 0; i < alarms.length; i++) {
        var alarm = alarms[i];
        if (alarm.hour === hours && alarm.minute === minutes && alarm.second === seconds && alarm.period === period) {
            playAlertWithAudio('Alarm! Time to wake up!', 'alarmSound2.wav');
            removeAlarm(alarm);
        }
    }
}

function playAlertWithAudio(message, audioPath) {
    audio = new Audio(audioPath); // Create an Audio object for the alarm sound
    audio.play(); // Play the alarm sound
    setTimeout(function() {
        alert(message); // Show the alert message
        stopAudio(); // Stop the audio when the alert is closed
    }, 200); // Adjust the delay (in milliseconds) to synchronize the audio and alert
}

function stopAudio() {
    if (audio) {
        audio.pause(); // Pause the audio
        audio.currentTime = 0; // Reset the audio to the beginning
        audio = null; // Reset the audio variable
    }
}

// Function to add leading zero to single-digit numbers
function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

