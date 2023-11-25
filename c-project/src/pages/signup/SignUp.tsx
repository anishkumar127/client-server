
import { Label, Input, Button } from '@fluentui/react-components'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [fullName, setFullName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(email, password)
        let body = {
            email,
            password,
            phone,
            fatherName,
            fullName
        }
        const response = await axios.post('http://localhost:8000/api/signup', body);

        console.log(response);
        if (response && response.status === 201) {
            navigate("/");
        }

    }
    return (
        <div className='w-full min-h-full  bg-[#081420]'>
            <div className=' bg-[#081420]  p-8 rounded  shadow-md w-full flex justify-center items-center  h-full mt-40 '>
                <div className=' border w-[500px] h-[500px] bg-[#081420] '>
                    <h2 className='text-white font-semibold text-center mb-4 mt-4 text-2xl'>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='p-4'>
                            {/* full Name */}
                            <div className='mb-4'>
                                <Label className='!text-white block'>Full Name</Label>
                                <Input onChange={(e) => setFullName(e.target.value)} placeholder='John' className="w-full" />
                            </div>
                            {/* Father Name */}
                            <div className='mb-4'>
                                <Label className='!text-white block'>Father Name</Label>
                                <Input onChange={(e) => setFatherName(e.target.value)} placeholder='Doe' className="w-full" />
                            </div>

                            {/* Email */}
                            <div className='mb-4'>
                                <Label className='!text-white block'>Email/Mobile</Label>
                                <Input onChange={(e) => setEmail(e.target.value)} placeholder='John@gmail.com' className="w-full" />
                            </div>
                            {/* Phone */}
                            <div className='mb-4'>
                                <Label className='!text-white block'>Phone Number:</Label>
                                <Input onChange={(e) => setPhone(e.target.value)} placeholder='123456789' className="w-full" />
                            </div>
                            {/* Password */}
                            <div className='mb-4'>
                                <div>
                                    <Label className='!text-white block'>Password</Label>
                                    <Input onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="w-full" />
                                </div>
                            </div>

                            {/* Login Button */}
                            <Button type='submit' className='!text-white !bg-[#2DC535] w-full'>Sign Up</Button>
                        </div>
                        <p className='text-white text-center '>Alread a member? Login</p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default SignUp