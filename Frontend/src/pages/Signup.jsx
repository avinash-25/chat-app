import React from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
  let navigate = useNavigate();
  return (
    <div className='w-full h-[100vh] bg-slate-300 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex-col gap-[30px]'>
        <div className='w-full h-[200px] bg-[#866ef0] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center '>
          <h1 className='text-gray-200 font-bold text-[30px] ' >Welcome to <span className='text-cyan-400' >NxtChat</span></h1>
        </div>

        <form className='w-full flex flex-col gap-[20px] items-center'>

          <input type="username" placeholder='Enter username' className='w-[90%] h-[50px] outline-none border-2 border-[#ba7373] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg flex-col gap-[30px] ' />

          <input type="email" placeholder='Enter email' className='w-[90%] h-[50px] outline-none border-2 border-[#ba7373] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg flex-col gap-[30px] ' />

          <div className='w-[90%] h-[50px]' >

          <input type="password" placeholder='Enter Password' className='w-[90%] h-full outline-none border-2 border-[#ba7373] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg flex-col gap-[30px] ' />

          </div>

          <button className='px-[20px] py-[10px] bg-[#866ef0] text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner rounded-2xl shadow-gray-400 shadow-lg' >SignUp</button>

          <p className='cursor-pointer' onClick={()=>navigate('/login')} >Already have an account ? <span className='text-[#866ef0] text-[bold] ' >Login</span></p>

          </form>
      </div>
    </div>
  )
}

export default Signup
