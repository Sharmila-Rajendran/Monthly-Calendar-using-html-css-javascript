const calendar = document.getElementById('calendar');
const date = document.getElementById('date');
const daysCont = document.getElementById('days');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const TodayButton = document.getElementById('tdybutt');
const GotoButton = document.getElementById('gobutt');
const DateInput = document.getElementById('dateInput');
const EventDay = document.getElementById('evtday');
const EventDate = document.getElementById('evtdate');
const EventCont = document.getElementById('evnts');
const addeventButton = document.getElementById('evntadd');
const addeventWrapper = document.getElementById('wrap');
const addCloseButt = document.getElementById('close');
const addeventTitle = document.getElementById('eventName');
const addeventFrom = document.getElementById('eventTimefrom');
const addeventTo = document.getElementById('eventTimeto');
const addeventSub = document.getElementById('evtbutt');

let now = new Date();
let active;
let month = now.getMonth();
let year = now.getFullYear();

const Months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EventsArray=[];

function Calendar(){
    date.innerText = `${Months[month]} ${year}`;
    daysCont.innerHTML = '';
    const Dayone = new Date(year, month, 1).getDay();
    const Monthdays = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < Dayone; i++) {
        daysCont.innerHTML += `<div class="empCont"></div>`;
    }
    for (let i = 1; i <= Monthdays; i++) {  
        const day = new Date(year, month, i);
        const today = now.getDate() === i && now.getMonth() === month && now.getFullYear() === year;  
        const dayclass = today ? 'day today' : 'day';
        daysCont.innerHTML += `<div class="${dayclass}" data-day="${i}">${i}</div>`;
    }
    document.querySelectorAll('.day').forEach(day => {
        day.addEventListener('click', (e) => {
            const selectday = e.target.dataset.day;
            selectDate(selectday);
        });
    });
}

function selectDate(day){
    active = new Date(year, month, day);
    EventDay.innerText = active.toLocaleDateString('en-US', { weekday: 'long' });
    EventDate.innerText = active.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    EventDisplay();
}

function EventDisplay(){
    EventCont.innerHTML = '';
    const events = EventsArray.filter(event => event.date === active.toDateString());
    events.forEach(event => {
        EventCont.innerHTML += `<div class="event">${event.name} (${event.from} - ${event.to})</div>`;
    });
}

previous.addEventListener('click', () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    Calendar();
});

next.addEventListener('click', () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    Calendar();
});

GotoButton.addEventListener('click', () => {
    const datePart = DateInput.value.split('/');
    if (datePart.length === 2) {
        const [mm, yyyy] = datePart;
        month = parseInt(mm) - 1;
        year = parseInt(yyyy);
        Calendar();
    }
});

TodayButton.addEventListener('click', () => {
    now = new Date();
    month = now.getMonth();
    year = now.getFullYear();
    Calendar();
});

addeventButton.addEventListener('click', () => {
    addeventWrapper.classList.add('open');
});

addCloseButt.addEventListener('click', () => {
    addeventWrapper.classList.remove('open');
});

addeventSub.addEventListener('click', () => {
    const eventName = addeventTitle.value;
    const eventFrom = addeventFrom.value;
    const eventTo = addeventTo.value;

    if (eventName && eventFrom && eventTo && active) {
        EventsArray.push({
            name: eventName,
            from: eventFrom,
            to: eventTo,
            date: active.toDateString(),
        });
        EventDisplay();
        addeventWrapper.classList.remove('open');
    }
});

Calendar();
