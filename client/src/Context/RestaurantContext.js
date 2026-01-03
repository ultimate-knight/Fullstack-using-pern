import React, {useState, createContext} from 'react'


export const RestaurantContext=createContext();

export const RestaurantContextProvider=props=>{
    const [restaurant, setRestaurant]=useState([]);
    const [selectedRestaurant, setSelectedRestaurant]=useState([])

    const addRestaurant=(restaurants)=>{
        setRestaurant([...restaurant, restaurants]);
    }
    return(
        <RestaurantContext.Provider value={{restaurant, setRestaurant, addRestaurant, selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantContext.Provider>
    )
}















