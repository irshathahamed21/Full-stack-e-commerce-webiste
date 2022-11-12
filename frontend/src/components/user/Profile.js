import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import Loader from "../layout/loader/Loader"
import "./profile.css"



function Profile({history}) {

    const {loading, isAuthenticated, user} = useSelector((state)=> state.user)
    console.log(user)
    // useEffect(() => {
    //     if(isAuthenticated === false){
    //         history.push("/history")
    //     }

    // },[])


    return  (
       <>
       {    loading ? (<Loader/> ): (   <>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src = {user.avatar.url} alt = {user.name} />
                    <Link to = "/me/update">Update Profile</Link>                    
                </div>   
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt).substr(0, 10)}</p>
                    </div>
                    <div>
                        <Link to="/orders">My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>             

            </div>
        </>)
}
        </>
    )
}

export default Profile