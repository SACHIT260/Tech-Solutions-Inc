import { useEffect, useState } from "react"
import { useAuth } from "../store/auth";
// import { deleteContactById } from "../../../server/controllers/admin-controller";
import {toast} from "react-toastify"

export const AdminContacts=()=>{

    const {authorizationToken}=useAuth();

    const [contactData,setContactData]=useState([]);
    
    const getContactsData=async ()=>{
        try {
            const response=await fetch("http://localhost:5000/api/admin/contacts",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                },
            })
            const data=await response.json();
            console.log("Contact data",data);
            if(response.ok){
                console.log(response);
                setContactData(data);
                }
                
            
        } catch (error) {
            console.log(error);
        }
    }

    //Defining contact delete function
    const deleteContactById= async (id)=>{
        try {
            const response=await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:authorizationToken,
                },
            });
            if(response.ok){
                getContactsData();
                toast.success("Deleted Successfully");
            }
            else{
                toast.error("Not Deleted");
            }
        } catch (error) {
            
        }
    }


    useEffect(()=>{
        getContactsData();
    },[])

    return( <>
        {/* {contactData.map((curContactData,index) => { 
              return <p key={index}>{curContactData.username}</p> 
         })} */}

         <section className="admin-contacts-section">
            <h1>Admin Contact Data</h1>

            <div className="container admin-users">
            {contactData.map((curContactData,index) => { 
              const {username,email,message,_id}=curContactData;
              return(
                <div key={index}>
                    <p>{username}</p>
                    <p>{email}</p>
                    <p>{message}</p>
                    <button className="btn" onClick={()=>deleteContactById(_id)}>delete</button>
                </div>
              )
         })}
            </div>
         </section>
    </>
    );
};