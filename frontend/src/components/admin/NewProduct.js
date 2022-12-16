import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

const NewProduct = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [descriptionm, setDescription] = useState("")
    const [stock, setStock] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];

    const createProductSubmitHandler = (e) => {
        e.preventDefault()

    }

    const createProductImageChange = () => {

    }
    
  return (
    <>
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            <form
                className='createProductForm'
                encType = "multipart/form-data"
                onSubmit={createProductSubmitHandler}
            >
                <h1>Create Product</h1>
                <div>
                    <input 
                        type = "text"
                        placeholder = "Product Name"
                        required
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                    />    
                </div>
                <div>
                    <input 
                        type = "number"
                        placeholder = "price"
                        required
                        value = {price}
                        onChange = {(e) => setPrice(e.target.value)}
                    />    
                </div>
                <div>
                    <input 
                        type = "text"
                        placeholder = "Product Name"
                        required
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                    />    
                </div>
                <div>
                    <textarea 
                        placeholder = "Product Description"
                        value = {description}
                        onChange = {(e) => setDescription(e.target.value)}
                    ></textarea>    
                </div>
                <div>
                  <select onChange = {setCategory(e.target.value)} value = {category}>
                    {
                        categories.map((ctg) => (
                            <option key = {ctg} value = {ctg}>{ctg}</option>
                        ))
                    }
                  </select>
                </div>
                <div>
                    <input 
                        type = "Number"
                        placeholder = "Stock"
                        required
                        value = {stock}
                        onChange = {(e) => setStock(e.target.value)}
                    />    
                </div>
                <div>
                    <input 
                        type = "file"
                        name = "avatar"
                        accept='image/*'
                        onChange = {createProductImageChange}
                        multiple
                    /> 
                </div> 
                <Button
                        id = "createProductBtn"
                        type = "submit"

                >
                    Create
                </Button>  
            </form>
        </div>
    </div>
    </>
  )
}

export default NewProduct