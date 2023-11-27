
import { Label, Input, Button } from '@fluentui/react-components'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(email, password)
        let body = {
            email,
            password,
        }
        //  body = JSON.stringify(body);
        const response = await axios.post('http://localhost:8000/api/login', body);

        console.log(response);
        if (response && response.status === 200) {
              localStorage.setItem("token",response?.data.token);
            navigate("/dashboard");
        }

    }
useEffect(()=>{
   const token =  localStorage.getItem("token");
   if(token){
    navigate("/dashboard");
   }

},[])

    return (
        <div className='w-full min-h-full  bg-[#081420]'>
            <div className=' bg-[#081420]  p-8 rounded  shadow-md w-full flex justify-center items-center  h-full mt-40 '>
                <div className=' border w-[500px] h-[300px] bg-[#081420] '>
                    <h2 className='text-white font-semibold text-center mb-4 mt-4 text-2xl'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='p-4'>
                            {/* Email */}
                            <div className='mb-4'>
                                <Label className='!text-white block'>Email/Mobile</Label>
                                <Input onChange={(e) => setEmail(e.target.value)} placeholder='John@gmail.com' className="w-full" />
                            </div>
                            {/* Password */}
                            <div className='mb-4'>
                                <div>
                                    <Label className='!text-white block'>Password</Label>
                                    <Input onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="w-full" />
                                </div>
                            </div>

                            {/* Login Button */}
                            <Button type='submit' className='!text-white !bg-[#2DC535] w-full'>Login</Button>
                        </div>
                       <div className='text-center'> <Link to="/signup" className='text-white text-center '>Not a member? SignUp</Link></div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login