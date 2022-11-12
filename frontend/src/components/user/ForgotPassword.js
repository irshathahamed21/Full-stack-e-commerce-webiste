import React from 'react'
import "./ForgotPassword.css"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { forgotPassword } from '../../actions/userAction';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("email", email)
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {

    },[])

  return (
  <>
    <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">
                Forgot Password
            </h2>
            <form className='forgotPasswordForm' onSubmit={forgotPasswordSubmit}>
                // now 1:20 superb lunch for 20 min
                <div className="forgotPasswordEmail">
                    <input 
                        type = "email"
                        placeholder = "Email"
                        value = {email}
                        name = "email"
                        onChange = {(e) => setEmail(e.target.value)}
                        />
                </div>
                <input
                    type = "submit"
                    value = "Send"
                    className="forgotPasswordBtn"

                />

            </form>

        </div>
    </div>
  </>
  )
}

export default ForgotPassword