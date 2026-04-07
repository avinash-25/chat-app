import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';

function Signup() {
  let navigate = useNavigate();

  let [show, setShow] = useState(false);

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(`${serverUrl}/signup`, {
        username,
        email,
        password,
      }, { withCredentials: true });
      console.log(result)
      setLoading(false);
      setError(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);

    }
  }

  return (
    <div className='w-full h-[100vh] bg-slate-300 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
        <div className='w-full h-[200px] bg-[#866ef0] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center '>
          <h1 className='text-gray-200 font-bold text-[30px] ' >Welcome to <span className='text-cyan-400' >NxtChat</span></h1>
        </div>

        <form className='w-full flex flex-col gap-[20px] items-center'  onSubmit={handleSignup} >

          <input type="text" placeholder='Enter username' className='w-[90%] h-[50px] outline-none border-2 border-[#ba7373] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg flex-col gap-[30px]' onChange={(e) => setUsername(e.target.value)} value={username} />

          <input type="email" placeholder='Enter email' className='w-[90%] h-[50px] outline-none border-2 border-[#ba7373] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg flex-col gap-[30px]' onChange={(e) => setEmail(e.target.value)} value={email}/>

          <div className='w-[90%] h-[50px] border-2 border-[#ba7373] overflow-hidden rounded-lg shadow-gray-400 shadow-lg relative ' >

            <input type={`${show ? "text" : "password"}`} placeholder='Enter Password' className='w-full h-full outline-none  px-[20px] py-[10px] bg-[white]  flex-col gap-[30px] ' onChange={(e) => setPassword(e.target.value)} value={password} />

            <span className='absolute top-[10px] right-[20px] text-[13px] text-[#866ef0] cursor-pointer' onClick={() => setShow(prev => !prev)} >{`${show ? "Hide" : "show"}`}</span>

          </div>
{err && <p className='text-red-500' >{err}</p>}
          <button className='px-[20px] py-[10px] bg-[#866ef0] text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner rounded-2xl shadow-gray-400 shadow-lg' type='submit' disabled={loading} >{loading?"Loading...":"Sign Up"}</button>

          <p className='cursor-pointer' onClick={()=>navigate('/login')} >Already have an account ? <span className='text-[#866ef0] text-[bold] ' >Login</span></p>

          </form>
      </div>
    </div>
  )
}

export default Signup
