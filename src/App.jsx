import { useState,useEffect } from 'react'
import './App.css'
import './mobile-view.css'
import CircularTimer from './component/circularTimer.jsx';
import { fireConfetti } from "./confetti.js";

function App() {
  const [time, setTime] = useState({y:"",mo:"",d:"",h:"", m:"", s:"", ampm:""});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours24 = now.getHours();
      const hours12 = hours24 % 12 || 12;

      setTime({
        y: String(now.getFullYear()).padStart(2,"0"),
        mo: String(now.getMonth() + 1).padStart(2,"0"),
        d: String(now.getDate()).padStart(2,"0"),
        dt: now.toLocaleString("en-US", { weekday: "short" }),
        h: String(hours12).padStart(2, "0"),
        m: String(now.getMinutes()).padStart(2,"0"),
        s: String(now.getSeconds()).padStart(2,"0"),
        ampm: now.getHours() > 12 ? "PM" : "AM",
      })
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  },[]);


  // focus btn.
const [focused, setFocused] = useState(false);

// focus time input.
const [hours, setHours] = useState(0);
const [minutes, setMinutes] = useState(25);

// focus timer.
const [totalSeconds, setTotalSeconds] = useState(0);
const [secondsLeft, setSecondsLeft] = useState(0);

//confirmation stop focusing.
const [confirm, setConfirm] = useState(false);

const [pause, setPause] = useState(false);

function handleFocus() {
  const total = hours * 3600 + minutes * 60;
  if (total <= 0) return;
  setTotalSeconds(total);
  setSecondsLeft(total);

  setConfirm(prev => !prev);
  setFocused(prev => !prev);
}

useEffect(() => {
  if(!focused || pause || secondsLeft <= 0) return;

  const timer = setInterval(() => {
    setSecondsLeft(prev => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [focused, secondsLeft,pause]);

// confetti
useEffect(() => {
  if (secondsLeft === 0 && focused) {
    fireConfetti();
  }
}, [secondsLeft, focused]);

// theme change.
const [theme, setTheme] = useState(false);
function handleTheme() {
  setTheme(prev => !prev);
}
document.body.className = theme ? "theme1" : "theme2";  


  return (
    <>
    <CircularTimer
      total={totalSeconds}
      left={secondsLeft}
      setLeft={setSecondsLeft}
      focus={focused}
      pause={pause}
      setPause={setPause}
      theme={theme}
    />


    <div className={`main-div ${focused ? "hide" : ""}`}>
  
  <div className='main-div-inner'> 
    <a href='https://suraj-dev.vercel.app/' target='_blank'><img src='/self.png' className='logo-img' /></a>
    <p className={`${!theme ? "p1" : "p1-1"}`}>Make this year count!</p>
    <button onClick={handleTheme} className={`${theme ? "theme-btn-2" : "theme-btn"}`}>{theme ? "LIGHT" : "DARK"}</button>
  </div>

    <div className='top-div'>
    <span className={`${!theme ? "year" : "year-1"}`}>{time.y}</span>

    <div className={`${!theme ? "day-month-div" : "day-month-div-2" }`}>
      <div className='day-div'>
        <span className='day-month'>{time.d}</span>
        <p className='p2'>DATE</p>
      </div>
      <div className='colon-div'>
        <p className='colon-p'>:</p>
        <p></p>
      </div>
      <div className='month-div'>
        <span className='day-month'>{time.mo}</span>
        <p className='p2'>MONTH</p>
      </div>
      <div className='date-div'>
        <span className='date'>{time.dt}</span>
      </div>
    </div>      
      
    </div>

    <div className={`${!theme ? "time-div" : "time-div-2" }`}>  
      <div>
      <span className='hms'>{time.h}</span>
      {/* <span className='hms1'>HOURS</span> */}
      </div>
      <span className='hms2'>:</span>
      <div>
      <span className='hms'>{time.m}</span>
      {/* <span className='hms1'>MINUTES</span> */}
      </div>
      <span className='hms2'>:</span>
      <div>
      <span className='hms'>{time.s}</span>
      {/* <span className='hms1'>SECONDS</span> */}
      </div>
    </div>


    </div>
    <div className='focus-main-div'>

    <button className={`focus-div ${focused ? "move-top" : ""}`} onClick={handleFocus}>
      {
      !focused ? <div className='focus'>START FOCUSING</div> :
      focused ? <div className='focus'>STOP FOCUSING</div> :
      secondsLeft === 0 ? <div className='focus focus-done'>HOME</div> : ""
      }

    </button>

    <div className={`focus-time ${focused ? "hide" : ""}`}>
      <div className="time-input">
        <input
          type="number"
          min="0"
          max="12"
          value={hours}
          onChange={e => setHours(e.target.value)}
        />
        <span>h</span>
      </div>
      <div className="time-input">
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={e => setMinutes(e.target.value)}
        />
        <span>m</span>
      </div>
    </div>

    </div>


      
      
    </>
  )
}

export default App
