import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function SignUp() {
    let navigate = useNavigate()
    const [credential, setcredential] = useState({ name: "", email: "", password: "", geolocation: "" });
    const onChange = (event) => {

        setcredential({ ...credential, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.geolocation })
        });


        const data = await response.json();
        console.log(data);
        if (!data.success) {
            alert('Enter valid Credential');
        }
        else {
            navigate("/login")
        }
    }
    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' onChange={onChange} value={credential.name} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} value={credential.email} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={onChange} value={credential.password} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' id='exampleInputPassword1' onChange={onChange} value={credential.geolocation} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link className='m-3 mx-1 btn btn-danger' to='/login'>Already a user?</Link>
                </form>
            </div>
        </div>
    )
}
