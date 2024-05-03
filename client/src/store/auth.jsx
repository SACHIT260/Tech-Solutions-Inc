import { createContext,useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [token,setToken]=useState(localStorage.getItem("token"));

    const [user,setUser]=useState("");
    const [services,setServices]=useState([]);
    const [isLoading,setisLoading]=useState(true);
    const authorizationToken=`Bearer ${token}`;

   const storeTokenInLS=(serverToken)=>{
    setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    };

    const isLoggedIn=!!token
    //tackling the logout functionality
    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    //  JWT AUTHENTICATION -TO GET THE CURRENTLY LOGGED IN USER DATA

    const userAuthentication=async()=>{
        try {
            setisLoading(true);
            const response=await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                Authorization:authorizationToken,
                },
            })

        if(response.ok){
           
            const data =await response.json();
            console.log("user data",data.userData);
            setUser(data.userData);
            setisLoading(false);
        }
        else{
            console.error("Error fetching user data")
            setisLoading(false);
        }
        } catch (error) {
            console.error("Error while fetching data");
        }
    }

    const getServices= async()=>{
        try {
            const response=await fetch("http://localhost:5000/api/data/service",{
                method:"GET",
            })
            console.log(response);
            if(response.ok){
                const datas=await response.json();
                console.log("test" ,datas.msg);
                setServices(datas.msg);
            }
        } catch (error) {
            console.log(`Services frontend error:${error}`);
        }
    }

     useEffect(()=>{
        // console.log("dd")
        getServices();
        userAuthentication();
     },[]);

    return <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,services,authorizationToken,isLoading}}>
            {children}
            </AuthContext.Provider>
}

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);

    if(!authContextValue){
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;
    
}