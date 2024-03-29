import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useAlert} from "react-alert"
import { clearErrors, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import Loader from '../layout/loader/Loader';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "./updatePassword.css"
import Metadata from '../layout/Metadata';


const UpdatePassword = ({history}) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const {error, isUpdated, loading} = useSelector((state) => state.profile)

  const[oldPassword, setOldPassword] = useState("")
  const[newPassword, setNewPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")


  const updatePasswordSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()
    myForm.set("oldPassword", oldPassword)
    myForm.set("newPassword", newPassword)
    myForm.set("confirmPassword", confirmPassword)
    console.log(myForm)
    dispatch(updatePassword(myForm))

  }

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success("Profile updated Successfully");
      history.push("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }


  },[error, isUpdated, dispatch, history, alert])


  

  return (
    <>
    <Metadata title = "Update Password" />

    {
      loading ? <Loader/> :
      <>
       <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
               
              </form>
            </div>
          </div>
      </>
}
      </>
  )
}

export default UpdatePassword