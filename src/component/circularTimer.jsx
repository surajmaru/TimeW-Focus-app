import { useState } from "react";

export default function CircularTimer({total, left,setLeft, focus,pause,setPause,theme}){
    const radius = 110;
    const stroke = 7;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const progress = left / total;
    const strokeDashoffset = circumference - progress * circumference;
    const angle = progress * 2 * Math.PI - Math.PI / 2;

    const center = 100;
    const dotRadius = normalizedRadius;

    const dotX = center + dotRadius * Math.cos(angle);
    const dotY = center + dotRadius * Math.sin(angle);


    const [color,setColor] = useState(false);
    // pause play logic.
    function handlePause(){
        setPause(prev => !prev);
        setColor(prev => !prev);
    }
    function handleReset(){
        setLeft(total);
    }

    return (
        
    <div  className={`circle-timer ${focus ? "unhide" : ""}`}>

    <div className="timer-title"> 
       {/* <p className="you-can-do-it">{getMotivation(left)}</p> */}
        {

        left === 0 ? (
        <p>You did it, you deserve this W !!</p>
        ) : left < 60 ? (
        <p className="you-can-do-it">Almost There...</p>
        ) : left < 300 ? (
        <p className="you-can-do-it">Hang in there..</p>
        ) : left < 600 ? (
        <p className="you-can-do-it">Don't you quit now, Don't you dare!</p>
        ) : (
        <p>You can do it!</p>
        )
        }
    </div>

    <svg height="200" width="200" className="clock">
      <circle
        stroke="rgba(0, 0, 0, 0.68)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx="100"
        cy="100"
      />
      <circle
        stroke="#0bec03"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx="100"
        cy="100"
        transform="rotate(-90 100 100)"
      />
      {left < 60 ? (
        <circle
            cx={dotX}
            cy={dotY}
            r="4"
            fill="#ec0303"
        >
            <animate
            attributeName="r"
            values="4;6;4"
            dur="1s"
            repeatCount="indefinite"
            />
        </circle>
        ) : 
        <circle
        cx={dotX}
        cy={dotY}
        r="4"
        fill="#ec0303"
        style={{
            filter: "drop-shadow(0 0 8px #ec0303)"
        }}
        />
        }
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className={` ${color ? "color" : theme ? "color-2" : "timer-text"} `}
      >
        {formatTime(left)}
      </text>
    </svg>

        <div className="pause-reset">
    <button className={`pause-btn`} onClick={handlePause}>{pause ? "RESUME" : "PAUSE"}</button>
    <button className={`reset-btn`} onClick={handleReset}>RESET</button>
        </div>

    </div>
  );
}

function formatTime(sec) {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
