import React from 'react'
import {Button} from "@material-ui/core"

import "./contact.css"


export const Contact = () => {
  return (
    <div className = "contactContainer">
    <a href="mailto:21irshath@gmail.com" className="mailBtn">
        <Button>Contact:21irshath@gmail.com</Button>
    </a>
    </div>
  )
}
