import React, {useState, useEffect, useRef} from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"





const LoginSignup = ( {history, location}) => {

    const dispatch = useDispatch()

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const[loginEmail, setLoginEmail] = useState("")
    const[loginPassword, setLoginPassword] = useState("")
    
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    

    const {name, email, password} = user
    const [avatar, setAvatar] = useState("./Profile.png")
    const [avatarPreview, setAvatarPreview] = useState("./Profile.png")

    const loginSubmit = (e) => {
        e.preventDefault()


    }

    const registerSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)

    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar") {
            const reader = new FileReader()

            reader.onload = () => {

            }


        }
        else {
            setUser({...user, [e.target.name] : e.target.value})
        }
    }

    const switchTabs = (e,tab) => {
        if(tab === "login"){

        }
        if(tab === "register") {
            
        }
    }

    


    
  return (
   <>
   <div className="LoginSignupContainer">
    <div className="LoginSignupBox">
        <div>
            <div className="login_signup_toggle">
                <p>LOGIN</p>
                <p>REGISTER</p>
            </div>
            <button></button>
        </div>
        <form className="loginForm"  encType="multipart/form-data" ref = {loginTab} onSubmit = {loginSubmit}>
            <div className="loginEmail">
                <MailOutlineIcon />
                <input  
                    type = "email" 
                    placeholder="Email"
                    required
                    value = {loginEmail}
                    onChange = {() => {setLoginEmail(e.target.value)}}
                />
            </div>
            <div className="loginPassword">
                <LockOpenIcon />
                <input  
                    type = "password" 
                    placeholder="Password"
                    required
                    value = {loginPassword}
                    onChange = {() => {setLoginPassword(e.target.value)}}
                  />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
        </form>
        <form className = "signupForm" ref = {registerTab} onSubmit = {registerSubmit}>
            <div className="signupName">
                <FaceIcon/>
                <input 
                    type="text"
                    placeholder='Name'
                    required
                    value = {name}
                    onChange = {registerDataChange}
                 />
            </div>
            <div className="signupEmail">
                <MailOutlineIcon />
                <input  
                    type = "email" 
                    placeholder="Email"
                    required
                    value = {email}
                    onChange = {registerDataChange}
                />
            </div>
            <div className="signupPassword">
                <LockOpenIcon />
                <input  
                    type = "password" 
                    placeholder="Password"
                    required
                    value = {password}
                    onChange = {registerDataChange}
                  />
            </div>
            <div id="registerImage">
                <img src = {""} alt = "Avatar Preview" />
                <input  
                    type="file" 
                    name='avatar'
                    accept = "image/*"
                    onChange = {registerDataChange}
                 />
            </div>
            <input type="submit" value="Register" className='signUpBtn' />
        </form>
    </div>

   </div>
   </>

  )
}

export default LoginSignup