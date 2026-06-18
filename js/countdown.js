// set the date we're counting down to
$(document).ready(function(){


// variables for time units
var days, hours, minutes, seconds, daysPercentage, hoursPercentage, minutesPercentage, secondsPercentage;

// get tag element
var countdown = document.getElementById('countdown');
if(countdown){
    const el = $('#countdown');
    const date = el.attr('data');
    const time = el.attr('time');
    const target_date = new Date(`${date}T${time}`).getTime();

// update the tag with id "countdown" every 1 second
setInterval(function () {

    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    // do some time calculations
    days = parseInt(seconds_left / 86400);
    daysPercentage = (days / 365) * 502.4;
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    hoursPercentage = (hours / 24) * 502.4;
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    minutesPercentage = (minutes / 60) * 502.4;
    seconds = parseInt(seconds_left % 60);
    secondsPercentage = (seconds / 60) * 502.4;

    // format countdown string + set tag value
    countdown.innerHTML = '<span class="days">' + days +  ' <label>Дней</label><span class="timerLoader"><svg viewbox="0 0 200 200"><circle r="90" cx="100" cy="100" fill="none" stroke-width="4" stroke="#ccc"/><circle class="timerLoader__progress" r="90" cx="100" cy="100" fill="none" stroke-width="12" stroke="#ccc" stroke-linecap="round" stroke-dasharray="' + daysPercentage + ' 502,4"/></svg></span></span> <span class="hours">' + hours + ' <label>часов</label> <span class="timerLoader"><svg viewbox="0 0 200 200"><circle r="90" cx="100" cy="100" fill="none" stroke-width="4" stroke="#ccc"/><circle class="timerLoader__progress" r="90" cx="100" cy="100" fill="none" stroke-width="12" stroke="#ccc" stroke-linecap="round" stroke-dasharray="' + hoursPercentage + ' 502,4"/></svg></span> </span> <span class="minutes">'
    + minutes + ' <label>минут</label><span class="timerLoader"><svg viewbox="0 0 200 200"><circle r="90" cx="100" cy="100" fill="none" stroke-width="4" stroke="#ccc"/><circle class="timerLoader__progress" r="90" cx="100" cy="100" fill="none" stroke-width="12" stroke="#ccc" stroke-linecap="round" stroke-dasharray="' + minutesPercentage + ' 502,4"/></svg></span></span> <span class="seconds">' + seconds + ' <label>сек</label><span class="timerLoader"><svg viewbox="0 0 200 200"><circle r="90" cx="100" cy="100" fill="none" stroke-width="4" stroke="#ccc"/><circle class="timerLoader__progress" r="90" cx="100" cy="100" fill="none" stroke-width="12" stroke="#ccc" stroke-linecap="round" stroke-dasharray="' + secondsPercentage + ' 502,4"/></svg></span></span><span style="display: none"></span>';

}, 1000);
}
});
