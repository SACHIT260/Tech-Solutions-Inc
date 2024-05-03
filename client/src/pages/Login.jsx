import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"
export const Login=()=>{

    const [user,setUser]=useState({
        email:"",
        password:"",
    })

    const navigate=useNavigate();
    const {storeTokenInLS} =useAuth();

    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name;
        let value=e.target.value;

        setUser({
            ...user,
            [name]:value,
        })

    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(user)

        try {
            const response= await fetch(`https://tech-solutions-inc.onrender.com/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user),
            });
            const res_data= await response.json();
            console.log("res from server",res_data);
            if(response.ok){
                
                storeTokenInLS(res_data.token);
                // // localStorage.setItem("token",res_data.token);
                toast.success("login successful");
                setUser({email:"",password:""})
                navigate("/");
            }
            else{
                toast.error(res_data.extraDetails? res_data.extraDetails:res_data.message);
                console.log("inavlid credential");

            }
        } catch (error) {
            console.log("login",error)
        }
    }

    return <>
        <section className="login-page">
            <main>
                <div className="section-login">
                    <div className="conatiner-log grid grid-two-cols">
                        <div className="login-image">
                            <img src="/images/login.png" 
                            alt="a girl is trying to do registration" 
                            width="400"
                            height="500"
                            />
                        </div>
                        {/* let's tackle registration form */}
                        <div className="login-form">
                            <h1 className="main-heading mb-3">Login form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>
                                
                                <div>
                                    <label className="lab-log" htmlFor="email">email</label>
                                    <input 
                                    className="inp-log"
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
                                    <label className="lab-log" htmlFor="password">password</label>
                                    <input 
                                    className="inp-log"
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

                                <button type="submit" className="btn btn-submit">Login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
}
