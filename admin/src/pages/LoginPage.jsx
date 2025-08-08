import { useContext, useState } from "react"
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function LoginPage(){

    const [state, setState] = useState('Admin')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {setDToken} = useContext(DoctorContext);
    const {setAToken} = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        console.log("clicked")
        if(state === 'Admin'){

            const {data} = await axios.post(backendUrl + '/appointo/admin/login', {email, password});
            console.log(data)
            if(data.success){
                setAToken(data.message);
                localStorage.setItem('aToken', data.token);
                navigate('/');
                window.location.reload();
            }else{
                toast.error(data.message);
            }
        }else{
            const {data} = await axios.post(backendUrl + '/appointo/doctor/login', {email, password});
            console.log(data);
            if(data.success){
                setDToken(data.token);
                localStorage.setItem('dToken', data.token);
                // navigate('/appointo/doctor');
            }else{
                toast.error(data.message);
            }
        }
    }
    
    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
           <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-600 text-sm shadow-xl/10">
                <p className="text-2xl font-semibold m-auto"><span className="text-[#284B63] text-4xl">{state}</span> Login</p>
                <div className="w-full">
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-300 focus:border-[#284B63] focus:outline-none rounded w-full p-2 mt-1" required/>
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-300 focus:border-[#284B63] focus:outline-none rounded w-full p-2 mt-1" required/>
                </div>
           <button className="bg-[#284B63] cursor-pointer text-white w-full py-2 rounded-md text-base">Login</button>
           {
            state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
           }
           </div>
        </form>
    )
}