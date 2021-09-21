function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    // clock.style.display = 'inline-block';
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

function initializeClockBySchedule() {
// iterate over each element in the schedule
    for (var i=0; i<schedule.length; i++) {
        var startDate = schedule[i][0];
        var endDate = schedule[i][1];

        // put dates in milliseconds for easy comparisons
        var startMs = Date.parse(startDate);
        var endMs = Date.parse(endDate);
        var currentMs = Date.parse(new Date());

        // if current date is between start and end dates, display clock
        if (endMs > currentMs && currentMs >= startMs ) {
            initializeClock('clockdiv', endDate);
        }
    }

    schedule.forEach(([startDate, endDate]) => {
        // put dates in milliseconds for easy comparisons
        const startMs = Date.parse(startDate);
        const endMs = Date.parse(endDate);
        const currentMs = Date.parse(new Date());

        // if current date is between start and end dates, display clock
        if (endMs > currentMs && currentMs >= startMs ) {
            initializeClock('clockdiv', endDate);
        }
    });
}

function deadlineAcrossAllPages(){
    let deadline;
// if there's a cookie with the name myClock, use that value as the deadline
    if(document.cookie && document.cookie.match('myClock')){
        // get deadline value from cookie
        deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];
    } else {
        // otherwise, set a deadline 10 minutes from now and
        // save it in a cookie with that name

        // create deadline 10 minutes from now
        const timeInMinutes = 10;
        const currentTime = Date.parse(new Date());
        deadline = new Date(currentTime + timeInMinutes*60*1000);

        // store deadline in cookie for future reference
        document.cookie = 'myClock=' + deadline + '; path=/; domain=.yourdomain.com';
    }

    return deadline;
}

const timeInMinutes = 10;
const currentTime = Date.parse(new Date());
const myDeadline = new Date('May 22 2021').getTime();
const deadline15 = new Date(currentTime + 15 * 24 * 60 * 60 * 1000);
const deadlineAfter10Minutes = new Date(currentTime + timeInMinutes*60*1000);
// const deadlineAcrossAllPages = deadlineAcrossAllPages();
const schedule = [
    ['Jan 25 2021', 'May 23 2021'],
    ['Jul 25 2021', 'Sept 20 2021'],
    ['Sept 21 2021', 'Jul 25 2021'],
    ['Jul 25 2021', 'Jul 25 2030']
];

// initialize by special time

// initializeClockBySchedule();

// initialize clock by any deadline
initializeClock('clockdiv', myDeadline);



