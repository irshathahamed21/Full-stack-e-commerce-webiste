import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, clearErrors } from '../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import "./newProduct.css"
import { useAlert } from "react-alert";


const NewProduct = ({history}) => {
    const dispatch = useDispatch()
    const {loading, error, success, product} = useSelector((state) => state.newProduct)
    console.log(success)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [Stock, setStock] = useState(0)
    const [category, setCategory] = useState("")
    console.log(category)
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const alert = useAlert()
    

    const categories = [
        "Kitchen & Home Appliances",
        "Furniture",
        "Electronics",
        "Footwear",
        "Men's Clothing",
        "Women's Clothing",
        "Home essentials",
        "Snacks",
        "Chocolates and candies",
        "Camera",
        "SmartPhones",
      ];

      useEffect(() => {
        if (error) {
        alert.error(error)
        dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Product Created Successfully");
          history.push("/admin/dashboard");
          dispatch({type:NEW_PRODUCT_RESET})
        }
      }, [dispatch, error, history, success]);
    

    const createProductSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("price", price)
        myForm.set("description", description)
        myForm.set("category", category)
        myForm.set("Stock", Stock)
        images.forEach((image) => {
            myForm.append("images", image)
        })
        dispatch(createProduct(myForm))
    }

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])
        files.forEach((file) => {
            const reader = new FileReader()
            console.log(reader.result)
            reader.onload = () => {
                if(reader.readyState === 2){
                    console.log(reader.result)
                    setImagesPreview((old) => [...old, reader.result])
                    setImages((old) => [...old, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
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
                    <SpellcheckIcon />
                    <input 
                        type = "text"
                        placeholder = "Product Name"
                        required
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                    />    
                </div>
                <div>
                    <AttachMoneyIcon />
                    <input 
                        type = "number"
                        placeholder = "price"
                        required
                        value = {price}
                        onChange = {(e) => setPrice(e.target.value)}
                    />    
                </div>
                <div>
                    <DescriptionIcon />
                    <textarea 
                        placeholder = "Product Description"
                        value = {description}
                        cols = "30"
                        rows="1"
                        onChange = {(e) => setDescription(e.target.value)}
                    ></textarea>    
                </div>
                <div>
                  <AccountTreeIcon/>  
                  <select onChange = {(e)=>setCategory(e.target.value)} >
                            <option value = "">Select Category</option>
                    {        
                        categories.map((ctg) => (
                            <option key = {ctg} value = {ctg}>{ctg}</option>
                        ))
                    }
                  </select>
                </div>
                <div>
                    <StorageIcon/>
                    <input 
                        type = "Number"
                        placeholder = "Stock"
                        required
                        value = {Stock}
                        onChange = {(e) => setStock(e.target.value)}
                    />    
                </div>
                <div id = "createProductFormFile">
                    <input 
                        type = "file"
                        name = "avatar"
                        accept='image/*'
                        onChange = {createProductImageChange}
                        multiple
                    /> 
                </div> 
                <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" />
                    ))}
                </div>
            
                <Button
                        id = "createProductBtn"
                        type = "submit"
                        disabled = {loading ? true:false}
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