import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"

// import "./Register.css"

export const Register=()=>{

    const [user,setUser]=useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });

    const navigate=useNavigate();
    const {storeTokenInLS}=useAuth();

    //Handling the input
    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;

        setUser({
            ...user,
            [name]:value,
        })

    }

    //Handling the form submission
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(user)

        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user),
                
            });
            const res_data=await response.json();
            console.log("res from server",res_data);
            if(response.ok){
                 
                 storeTokenInLS(res_data.token);
                // // localStorage.setItem("token",res_data.token);
                setUser({
                    username:"",
                    email:"",
                    phone:"",
                    password:"",
                });
                toast.success("Registration Successfull");
                navigate("/")
            }
            // console.log(response)
            else{
                toast.error(res_data.extraDetails? res_data.extraDetails:res_data.message);
            }
        } catch (error) {
            console.log("register",error);
        }
    }

    return <>
        <section>
            <main>
                <div className='section-registrartion'>
                    <div className="conatiner-reg grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/register.png" 
                            className="img-reg"
                            alt="a girl is trying to do registration" 
                            width="400"
                            height="500"
                            />
                        </div>
                        {/* let's tackle registration form */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">registration form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>
                                <div className="reg">
                                    <label className="lab-reg" htmlFor="username">username</label>
                                    <input 
                                    className="inp-reg"
                                    type="text"
                                    name="username" 
                                    placeholder="username"
                                    id="username"
                                    required
                                    autoComplete="off"
                                    value={user.username}
                                    onChange={handleInput}
                                    />
                                   
                                </div>
                                <div>
                                    <label className="lab-reg" htmlFor="email">email</label>
                                    <input 
                                    className="inp-reg"
                                    type="email"
                                    name="email" 
                                    placeholder="enter your email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput}
                                    />
                                   
                                </div>
                                <div>
                                    <label className="lab-reg" htmlFor="phone">phone</label>
                                    <input 
                                    className="inp-reg"
                                    type="number"
                                    name="phone" 
                                    placeholder="phone"
                                    id="phone"
                                    required
                                    autoComplete="off"
                                    value={user.phone}
                                    onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label className="lab-reg" htmlFor="password">password</label>
                                    <input 
                                    className="inp-reg"
                                    type="password"
                                    name="password" 
                                    placeholder="password"
                                    id="password"
                                    required
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput}
                                    />
                                </div>
                                <br />

                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
}