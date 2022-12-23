import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, clearErrors, getProductDetails } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import "./updateProduct.css"

const UpdateProduct = ({history, match}) => {
    const dispatch = useDispatch()
    const {error, product} = useSelector((state) => state.productDetails)
    const {loading, error: updateError, isUpdated} = useSelector((state) => state.product)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [Stock, setStock] = useState("")
    const [category, setCategory] = useState("")
    const [oldImages, setOldImages] = useState([])
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const productId = match.params.id 

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
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))    
        }
        else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }

        if (error) {
          dispatch(clearErrors());
        }

        if(updateError){
            dispatch(clearErrors())
        }

        if(isUpdated === true){
            history.push("/admin/products")
            dispatch({type:UPDATE_PRODUCT_RESET})
        }
       
   
      }, [dispatch, error, history, isUpdated, updateError, productId, product, history]);
    

    const updateProductSubmitHandler = (e) => {
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
        // did not put id for update product
        dispatch(updateProduct(productId, myForm))
    }

    const updateProductImageChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])
        setOldImages([])
        files.forEach((file) => {
            const reader = new FileReader()

            reader.onload = () => {
                if(reader.readyState === 2){
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
                onSubmit={updateProductSubmitHandler}
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
                        onChange = {(e) => setDescription(e.target.value)}
                    ></textarea>    
                </div>
                <div>
                  <AccountTreeIcon /> 
                  <select onChange = {(e)=>setCategory(e.target.value)} >
                     {/* dont put value in select tag for this error i spent 2 hours */}
                        <option value = "">Select category</option>
                    {
                        categories.map((ctg) => (
                            <option key = {ctg} value = {ctg}>{ctg}</option>
                        ))
                    }
                  </select>
                </div>
                <div>
                    <StorageIcon />
                    <input 
                        type = "Number"
                        placeholder = "Stock"
                        required
                        value = {Stock}
                        onChange = {(e) => setStock(e.target.value)}
                    />    
                </div>
                <div>
                    <input 
                        type = "file"
                        name = "avatar"
                        accept='image/*'
                        onChange = {updateProductImageChange}
                        multiple
                    /> 
                </div> 
                <div id="createProductFormImage">
                    {oldImages &&
                        oldImages.map((image, index) => (
                            <img key={index} src={image.url} alt="Old Product Preview" />
                    ))}
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

export default UpdateProduct