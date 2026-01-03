import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RestaurantContext } from '../Context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';

export const UpdateRestaurant = (props) => {
    const { id } = useParams();
    const navigate=useNavigate()
    const {restaurant}=useContext(RestaurantContext)
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log({ name, location, priceRange });
    // };
    

    useEffect(()=>{
        const fetchData=async()=>{
            const response=await RestaurantFinder.get(`/${id}`)
            console.log(response.data.data)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        };
        fetchData();
    }, []); 
    
    
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const updateRestaurant=await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range:priceRange,
        })
        navigate("/");
        
    };



    
    












    return (
        <div>
            {/* <h1>{restaurant[5].name}</h1> */}
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        id="name" 
                        className='form-control' 
                        type="text" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        id="location" 
                        className='form-control' 
                        type="text" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(e.target.value)} 
                        id="price_range" 
                        className='form-control' 
                        type="number" 
                    />
                </div>
                <br />
                <button onClick={handleSubmit} className='btn btn-primary' type="submit">Submit</button>
            </form>
        </div>
    );
};
