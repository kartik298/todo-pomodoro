
import React from "react";
import { useState,useEffect } from "react";
function Promodoro() {

    const [timer,setTimer]=useState(1*60);
    const [isActive,setisActive]=useState(false);
    const [isBreak,setIsBreak]=useState(false);
    const [isPause,setPause]=useState(false);

    useEffect(()=>
    {
      let interval=null;

      if(isActive&&timer>0)
      {
        interval=setInterval(()=>
        {
          setTimer((prevTimer)=>prevTimer-1)
        },1000);
      }
      else if(timer===0)
      {
        setIsBreak((prevIsbreak)=>!prevIsbreak);
        setTimer(isBreak?1*60:1*60);
      }

      return ()=>
      {
        clearInterval(interval);
      }

    },[isActive,timer,isBreak])

    const handlerest=()=>
    {
      setIsBreak(false);
      setisActive(false);
      setTimer(1*60);
    }

    const formatTimer=(timer)=>{

      console.log(timer)
      const min=Math.floor(timer/60);
      const sec=timer%60;
      return`${min.toString().padStart(2,"0")}: ${sec.toString().padStart(2,"0")}`;

    };

    const handlepause=()=>
    {
      console.log(timer)
      setPause(true);
      setisActive(false);
    }

    const handlestart=()=>
    {
      console.log(timer)
      setPause(false);
      setisActive(true);
    }

  return (
    <div className="App">
    <h1>Pomodoro timer</h1>
    <div>{isBreak?"Break": "work"}</div>
    <div>{isPause?"pause":"start"}</div>
    <div>{formatTimer(timer)}</div>
    <button className="button" onClick={handlestart}>start</button>
    <button className="button" onClick={handlepause}>pause</button>
    <button className="button" onClick={handlerest}>reset</button>
    </div>
  );
}

export default Promodoro;
