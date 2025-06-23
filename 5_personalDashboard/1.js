const date = document.querySelector(".date");
const daytime = document.querySelector(".daytime");
const elems = document.querySelectorAll(".card");
const fullelems = document.querySelectorAll(".fullelems");
(function ExitFullPage() {
  fullelems.forEach((fullelem, idx) => {
    let h1 = document.createElement("h1");
    h1.classList.add(
      "esc",
      "text-[13px]",
      "font-[jmono]",
      "capitilize",
      "text-center",
      "w-[200px]",
      "bg-white",
      "text-black",
      "border-black",
      "border-[1px]",
      "border-b-0"
    );
    h1.innerText = `' Press Esc to Exit '`;
    h1.id = idx;
    fullelem.insertBefore(h1, fullelem.firstChild);
  });
})();
const escapes = document.querySelectorAll(".esc");
const landingpage = document.querySelector("#landingPage");

setInterval(() => {
  let curr = new Date();
  daytime.innerText = `${curr.toLocaleDateString("en-US", {
    weekday: "long",
  })}, ${curr.toLocaleTimeString("en-GB")}`;
}, 1000);
(function setdate() {
  let currdate = new Date().toLocaleDateString();
  date.innerText = currdate;
})();
/* ---------- LANDING PAGE  ---------- */

function weatherCardDashboard(){
  const weatherStatus = document.querySelector('.weatherstatus');
  function showLastUpdated() {
    const timestamp = localStorage.getItem('weatherTimestamp');
    if (timestamp) {
      const lastUpdated = new Date(timestamp);
      const now = new Date();
      const diffMs = now - lastUpdated;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      weatherStatus.innerText = `Last updated ${diffHrs > 0 ? `${diffHrs}h ` : ''}${diffMins}min ago`;
    } else {
      weatherStatus.innerText = '';
    }
  }

  const locationinp = document.querySelector('.location');
  const tempinp = document.querySelector('.temp');
  const wdinp = document.querySelector('.weatherdescription');
  const precipitationinp = document.querySelector('.precip');
  const humidityinp = document.querySelector('.humi');
  const windinp = document.querySelector('.wind');

  function UpdateDashboard(dashboard){
    tempinp.innerText = dashboard.temp;
    wdinp.innerText = dashboard.wd;
    locationinp.innerHTML = `<span class='font-[jmono]'>>-</span>${dashboard.location}`;
    precipitationinp.innerText = dashboard.precipitation;
    humidityinp.innerText = dashboard.humidity;
    windinp.innerText = dashboard.wind;
  }
  function locationcoords(callback) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      callback(lat, lon);
    });
  }
  locationcoords((lat, lon) => {
      let currdate = new Date().toLocaleDateString();
      const apiKey = "4e67de2f2a754931b3053531252006";
      if( !localStorage.getItem('coordinates') ){
        localStorage.setItem('coordinates',JSON.stringify({lati:lat,longi:lon}));
      }
      let LocallyStoredCoords = JSON.parse(localStorage.getItem('coordinates'))
      let LocallyStoredLati = Math.floor(Number(LocallyStoredCoords.lati))
      let LocallyStoredLongi = Math.floor(Number(LocallyStoredCoords.longi))
      let isLocationSame = Math.floor(lat) == LocallyStoredLati && Math.floor(lon) == LocallyStoredLongi

      let weatherdashboard={};
      async function weatherApiCall(){
        try {
          localStorage.setItem('localhour',JSON.stringify(new Date().getHours()))
          const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
          if (!response.ok){
             throw new Error(`HTTP error! Status: ${response.status}`) 
            }

          const weatherdata = await response.json();
          weatherdashboard={
            location:`${weatherdata.location.name} (${weatherdata.location.region})`,
            temp:`${weatherdata.current.temp_c}°C`,
            wd:`[ ${weatherdata.current.condition.text} ]`,
            precipitation:`Precipitation: ${weatherdata.current.precip_in}in`,
            humidity: `Humidity: ${weatherdata.current.humidity}%`,
            wind:`Wind: ${weatherdata.current.wind_kph}km/hr`
          };

          localStorage.setItem('weatherLocalDashboard',JSON.stringify(weatherdashboard));
          UpdateDashboard(weatherdashboard);
          const now = new Date();
          localStorage.setItem('weatherTimestamp', now.toISOString());
          console.log('weather API called...');
        } 
        catch (error) {
          console.error('Weather API failed:', error.message);
          // Optionally show fallback data or a UI message
          const cached = localStorage.getItem('weatherLocalDashboard');
          if (cached) {
            weatherLocalDashboard = JSON.parse(cached);
            UpdateDashboard(weatherLocalDashboard);
            showLastUpdated(); // show cached timestamp
          } else {
            UpdateDashboard({
              location: 'Unavailable',
              temp: 'N/A',
              wd: '[Error]',
              precipitation: 'Precipitation: N/A',
              humidity: 'Humidity: N/A',
              wind: 'Wind: N/A'
            });
            weatherStatus.innerText = 'Weather unavailable';
          }
        }
      };
      function apicaller(){
        let currhour=new Date().getHours()
        let prevhour=Number(localStorage.getItem('localhour'));
        isHourSame = currhour === prevhour

        if(localStorage.getItem('date') !== currdate || !localStorage.getItem('weatherLocalDashboard') || !isLocationSame || !isHourSame){
          localStorage.setItem('date', currdate);
          weatherApiCall();
          } else{
          weatherLocalDashboard=JSON.parse(localStorage.getItem('weatherLocalDashboard'))
          UpdateDashboard(weatherLocalDashboard);
          showLastUpdated()
          // console.log('local dashboard used');
        };

      };apicaller();

      setInterval(()=>{
        apicaller();
        console.log('checking...');
      },3600000)
  });
};weatherCardDashboard();


(function OpenCards() {
  elems.forEach((elem,idx) => {
    elem.addEventListener("click", () => {
      fullelems[elem.id].classList.toggle("hidden");
      landingpage.classList.toggle("hidden");
      fullelems[elem.id].focus();
    });
  });
  fullelems.forEach((fullelem) => {
    fullelem.setAttribute("tabindex", "0");
    fullelem.addEventListener("keydown", (el) => {
      if (el.key === "Escape") {
        fullelem.classList.toggle("hidden");
        landingpage.classList.toggle("hidden");
      }
    });
  });
  escapes.forEach((esc) => {
    esc.addEventListener("click", (el) => {
      fullelems[esc.id].classList.toggle("hidden");
      landingpage.classList.toggle("hidden");
    });
  });
})();

////////////////////////////////////.   TODO page

function toDoPage(){
  const todoForm = document.querySelector(".todoForm");
  const todoBox = document.querySelector(".todobox");
  let tasklist =[{name:'toDO Title',details:'some details',time:"here's the time",day:''}];

  function taskListUpdater(){
    let sum='';
    if(!localStorage.getItem('tasklist')){localStorage.setItem('tasklist', JSON.stringify(tasklist));console.log('halo');
    };
    const storedTaskList = localStorage.getItem('tasklist')
    tasklist = storedTaskList.length>2 ? JSON.parse(storedTaskList) : tasklist
    tasklist.forEach((task,idx) => {
      sum+= `<div id=${idx} class="taskItem min-h-[80px] w-[100%] p-4 border-[1px] border-black flex gap-[12.5%] justify-between items-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] hover:text-black transition text-black/60 backdrop-blur-xs font-[gs]">
                  <div class="left flex flex-col justify-between items-start w-[40%] overflow-hidden">
                  <span class="taskname text-[20px] font-semibold capitalize bg-[rgba(0,0,0,0.05)] rounded-[5px] px-3">${task.name ? (idx+1) +"'" + task.name : idx+1}</span>
                    <span class="taskdet text-sm px-3">${task.details}</span>
                  </div>
                  <div class="right flex justify-between flex-1">
                    <div class="flex flex-col justify-center items-center">
                      <span class="text-sm capitalize font-[jmonol]">${task.day} @${task.time}</span>
                    </div>
                    <button class="taskdone btnshadow px-3 py-1 text-sm border-[1px] border-black transition hover:bg-black/80 hover:text-white font-[jmonol]">Done</button>
             </div></div>`;
      });
    todoBox.innerHTML=sum;
  };taskListUpdater();

  function addtask(){todoForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const curr= new Date();
  const todoTitle = document.querySelector(".todoTitle");
  const todoDets = document.querySelector(".todoDets");
  const taskname = todoTitle.value.trim()?todoTitle.value.trim():'ToDo';
  const taskdets = todoDets.value.trim()?todoDets.value.trim():'some details...';
  todoTitle.value='';
  todoDets.value='';
  tasklist.push({name:taskname, details:taskdets,important: false,time:curr.toLocaleTimeString("en-US"),day:curr.toLocaleDateString( "en-US", { weekday: "long" })})
  localStorage.setItem("tasklist", JSON.stringify(tasklist));
  taskListUpdater()
}
  )};addtask();

  function TaskDelete() {
  todoBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("taskdone")) {
      const taskItem = e.target.closest(".taskItem");
      tasklist.splice(Number(taskItem.id),1);
      localStorage.setItem("tasklist", JSON.stringify(tasklist));
      taskListUpdater()
    };fullelems[0].focus();
  });
  };TaskDelete();

  (function TutorialCardOnEscape(){escapes[0].addEventListener('click',()=>{
    console.log('hello');
    tasklist = tasklist.length==0?[{name:'toDO Title',details:'some details',time:"here's the time",day:''}]:tasklist
    taskListUpdater()
  })})();

  (function TutorialCardOnEscapekey(){fullelems[0].addEventListener("keydown", (el) => {
      if (el.key === "Escape") {
        tasklist = tasklist.length==0?[{name:'toDO Title',details:'some details',time:"here's the time",day:''}]:tasklist
        taskListUpdater()
      }
   })})();

  console.log('todo function started');
};
toDoPage()


//////////////////////////////// Planner Page

function plannerPage(){
  let currDate = new Date().toLocaleDateString();
  const StartHour=6;
  const Hours =24-StartHour;
  const plannerHoursTile = Array.from({length:Hours},(elem,idx)=>`${idx+StartHour}:00 - ${idx+StartHour+1}:00`);
  const plannercontainer = document.querySelector('.plannercontainer');
  if(localStorage.getItem('date')!=currDate){
    localStorage.removeItem('plannerTaskList');
    localStorage.setItem('date',currDate);
  }
  let plannerTaskList= Array.from({length:Hours},(elem,idx)=>{return {id:`${idx}`, task:""}})

  function plannerHoursTiling(){
    let timesum='';
    if(!localStorage.getItem('plannerTaskList')){localStorage.setItem('plannerTaskList', JSON.stringify(plannerTaskList));console.log('new tasklist key generated...')};
    plannerTaskList=JSON.parse(localStorage.getItem('plannerTaskList'));
    plannerHoursTile.forEach((elem,idx)=>{
      timesum+=`<div class="planner-time group w-[49%] h-[100px] flex flex-col p-2 relative border border-black bg-white/30 hover:bg-[rgba(255,255,255,0.7)]  transition hover:shadow-2xl">
                    <h1 class="timings absolute text-[15px] font-[jmono] text-left bg-white/10 text-black w-34 px-2 transition">${elem}</h1>
                  <div class="flex flex-1 items-center">
                  <input id="${idx}" type="text" class="plannerTaskInput z-2 h-full focus:outline-none flex-1 text-[18px] text-black placeholder:text-[15px] placeholder-grey-400 px-2 selection:bg-fuchsia-900 selection:text-white" placeholder="@tasks" value="${plannerTaskList[idx]?plannerTaskList[idx].task:''}">
                  <button class="taskclear font-[jmonol] btnshadow text-[12px] border-[1px] border-black hover:bg-black-80  px-4 py-2 hover:bg-black/80 hover:text-white transition">Clear</button>
                  </div>
                </div>`});
    plannercontainer.innerHTML=timesum;
  };plannerHoursTiling();
  function updatePlannerTile(idx) {
    const tile = document.querySelectorAll(`.plannerTaskInput`)[idx];
    if (tile) {tile.value = plannerTaskList[idx].task;}
  };
  function plannerTaskAssign(){
    plannercontainer.addEventListener('input', (e) => {
      if (e.target.classList.contains('plannerTaskInput')) {
        const idx = e.target.id;
        plannerTaskList[idx].task = e.target.value;
        localStorage.setItem('plannerTaskList', JSON.stringify(plannerTaskList));
      }
    });
  };plannerTaskAssign()
  function plannerClearTask(){
    plannercontainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('taskclear')) {
        const idx = e.target.previousElementSibling.id;
        plannerTaskList[idx].task = '';
        localStorage.setItem('plannerTaskList', JSON.stringify(plannerTaskList));
        updatePlannerTile(idx);
        fullelems[1].focus()
      };
    });
  };plannerClearTask();

  console.log('planner function started');
};
plannerPage()


//////////////////////////Motivation Page

function motivationPage(){
  const quoteArea =document.querySelector('.quote')
  const authorArea =document.querySelector('.author')
  async function QuoteDisplay(){
    const motivationquote = await (await fetch('https://quotes-api-self.vercel.app/quote')).json();
    quoteArea.innerText=motivationquote.quote; authorArea.innerText = `~ ${motivationquote.author}`;
  };QuoteDisplay();
  (function quotechange(){
    escapes[2].addEventListener('click',()=>{
      QuoteDisplay();
    });
    fullelems[2].addEventListener('keydown',(key)=>{
      key.key=='Escape'?QuoteDisplay():'';
    })
  })()
};
motivationPage()

//////////////////////////Pomodoro Page

function pomodoroPage() {
  const Timertypes = [`25:00`, `05:00`, `10:00`];
  const timer = document.querySelector('.timer');
  timer.innerText = Timertypes[0];

  const pomPausePlaybtn = document.querySelector('.pomodoroPausePlay');
  const pomReset = document.querySelector('.pomodoroReset');
  const pomodoroBtns = document.querySelectorAll('.pomodorobtns');
  const pomodoroButtons = document.querySelector('.pomodoroButtons')

  let selectedID = 0;
  let timeleft = TotalTimeInSeconds(selectedID);
  let intervalID = null;
  let isPaused = true;

  function TotalTimeInSeconds(n) {
    const [min, sec] = Timertypes[n].split(':').map(Number);
    return min * 60 + sec;
  };
  function TimeDisplay(x) {
    const minutes = Math.floor(x / 60);
    const seconds = Math.floor(x % 60);
    timer.innerText = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
  };
  function timerSelection() {
    pomodoroButtons.addEventListener('click',(btn)=>{
      const btnElem = btn.target.closest('.pomodorobtns');
      if (!btnElem) return;
      selectedID = btnElem.id;
      // selectedID = btn.target.id;
      timeleft = TotalTimeInSeconds(selectedID);
      TimeDisplay(timeleft);
      clearInterval(intervalID);
      intervalID = null;
      isPaused = true;
      pomPausePlaybtn.classList.remove('pause', 'bg-black', 'text-white/80');
      pomPausePlaybtn.innerText = 'Play';
      pomodoroBtns.forEach(btn => btn.classList.remove('bg-black', 'text-white/80'));
      btnElem.classList.add('bg-black', 'text-white/80');
    })
  };
  function StartStop() {
    pomPausePlaybtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pomPausePlaybtn.classList.toggle('pause');
      pomPausePlaybtn.innerText = isPaused ? 'Play' : 'Pause';
      pomPausePlaybtn.classList.toggle('bg-black');
      pomPausePlaybtn.classList.toggle('text-white/80');

      if (!isPaused && !intervalID) {
        if (timeleft > 0) {TimeDisplay(timeleft);timeleft -= 1;}

        intervalID = setInterval(() => {
          if (timeleft >= 0) {
            TimeDisplay(timeleft);
            timeleft -= 1;
          } else {
            clearInterval(intervalID);
            intervalID = null;
            isPaused = true;
            pomPausePlaybtn.innerText = 'Play';
            pomPausePlaybtn.classList.remove('pause', 'bg-black', 'text-white/80');
          }
        }, 1000);
      }
      if (isPaused && intervalID) {
        clearInterval(intervalID);
        intervalID = null;
      }
    });
  };
  function reset() {
    pomReset.addEventListener('click', () => {
      clearInterval(intervalID);
      intervalID = null;
      isPaused = true;
      timeleft = TotalTimeInSeconds(selectedID);
      TimeDisplay(timeleft);
      pomPausePlaybtn.classList.remove('pause', 'bg-black', 'text-white/80');
      pomPausePlaybtn.innerText = 'Play';
    });
  };
  TimeDisplay(timeleft);
  timerSelection();
  StartStop();
  reset();
  console.log('pomodoro function started');
};
pomodoroPage()


//////////////////////////Diary Page

///////////////
function diaryPage(){
console.log('diary function started');
};
