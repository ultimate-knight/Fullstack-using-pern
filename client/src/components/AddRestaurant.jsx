import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../Context/RestaurantContext'

export const AddRestaurant = () => {
    const {addRestaurant}=useContext(RestaurantContext);
    const [name, setName]= useState("")
    const [location, setLocation]= useState("")
    const [price_range, setPricerange]= useState("pricerange")

    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            const response=await RestaurantFinder.post("/", {
                name,
                location,
                price_range: price_range
            })
            addRestaurant(response.data.data.restaurant)
            console.log(response)
        }catch(err){

        }

    }
  return (
    <div className='mb-5'>
    <form action="">
      <div className="row">
        <div className="col">
          <input value={name} onChange={e=>setName(e.target.value)} type="text" className='form-control' placeholder='Name' />
        </div>
        <div className="col">
          <input value={location} type="text" className='form-control' onChange={e=>setLocation(e.target.value)} placeholder='Location' />
        </div>
        <div className="col">
          <select value={price_range} onChange={e=>setPricerange(e.target.value)} className='custom-select my-1 mr-sm-2' style={{ backgroundColor: '#e0f7fa', color: '#00796b', fontWeight: 'bold', borderRadius: '5px' }}>
            <option disabled selected>Price range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div className="col">
          <button onClick={handleSubmit} type="submit" className='btn btn-primary'>Add</button>
        </div>
      </div>
    </form>
  </div>
  
  )
}
