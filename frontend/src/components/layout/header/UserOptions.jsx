import {useState} from "react"
import "./header.css"
import {SpeedDial, SpeedDialAction} from "@material-ui/lab"
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useHistory} from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";



function UserOptions({user}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const[open, setOpen] = useState(false)
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon:<ShoppingCartIcon/>, name:"Cart", func:cart},
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];

      if (user && user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
    
     function dashboard() {
        history.push("/admin/dashboard");
    }

    function orders() {
        history.push("/orders");
    }
    function account() {
        history.push("/account");
    }

    function cart() {
        history.push("/cart");
    }

    function logoutUser() {
        dispatch(logout());
    }



    


    return (
        <>
        <Backdrop open = {open} style = {{zIndex:"10"}} />
        <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onOpen={() => {setOpen(true)}}
                onClose = {() => {setOpen(false)}}
                style = {{ position: 'absolute', top:"8px"}}
                open = {open}
                direction = "down"
                className="speedDial"
                icon={
                    <img
                      className="speedDialIcon"
                      src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                      alt="Profile"
                    />
                  }
        >
            {
                options.map((item) => (
                    <SpeedDialAction 
                        key = {item.name}
                        icon = {item.icon}
                        tooltipTitle = {item.name}
                        onClick = {item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))
            }

        </SpeedDial>



        </>

    )
}

export default UserOptions