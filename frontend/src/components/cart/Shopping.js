import React, {useState} from 'react'
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import {useDispatch, useSelector} from "react-redux"
import { Country, State } from "country-state-city";

const Shopping = () => {
    const dispatch = useDispatch()
    const {shoppingInfo} = useSelector((state) => state.cart)
    const[address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState]= useState()
    const [country, setCountry] = useState()
    const[pinCode, setPinCode] = useState()
    const[phoneNo, setPhoneNo] = useState()

  return (
   <>
    <div className="shoppingContainer">
        <div className="shippingBox">
            <form>
                <div>
                    <HomeIcon/>
                    <input
                        type = "text"
                        placeholder='Address'
                        required
                        value = {address}
                        onChange = {(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <LocationCityIcon/>
                    <input
                        type = "text"
                        placeholder='City'
                        required
                        value = {city}
                        onChange = { (e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <PinDropIcon/>
                    <input
                        type = "text"
                        placeholder='Pincode'
                        required
                        value = {pinCode}
                        onChange = { (e) => setPinCode(e.target.value)}
                    />
                </div>
                <div>
                    <PhoneIcon/>
                    <input
                        type = "text"
                        placeholder='Phone No'
                        required
                        value = {phoneNo}
                        onChange = { (e) => setPhoneNo(e.target.value)}
                        
                    />
                </div>
                <div>
                    <PublicIcon/>
                    <select
                        required
                        value={country}
                        onChange = {(e) => setCountry(e.target.value)}
                    >
                        <option value = "">Country</option>
                        { Country && Country.getAllCountries.map((item) => (
                                <option value = {item.isoCode} key = {item.isoCode}>
                                    {item.name}
                                </option>
                        ))
                        }
                    </select>    
                </div>
                {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input type = "submit" value = "Continue" className="shippingBtn"
              disabled={state ? false : true}  />
            </form>
        </div>
    </div>
   </>
  )
}

export default Shopping
