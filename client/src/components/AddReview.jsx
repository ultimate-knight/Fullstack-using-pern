import React, { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate, useParams } from 'react-router-dom';

const AddReview = ({ onReviewAdded }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");
    
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (rating === "Rating") {
            alert("Please select a rating");
            return;
        }
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating,
            });
            
            if (response.status === 201) {
                setName("");
                setReviewText("");
                setRating("Rating");
                if (onReviewAdded) {
                    onReviewAdded();
                }
                // Optionally, you can add a success message here
                alert("Review added successfully!");
            }
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("Failed to submit review. Please try again.");
        }
    };

    return (
        <div className='mb-2'>
            <form onSubmit={handleSubmitReview}>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            id="name" 
                            placeholder='Write your name' 
                            type="text" 
                            className="form-control" 
                            required 
                        />
                    </div><br />
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)} 
                            id="rating" 
                            className="custom-select form-control"
                            required
                        >
                            <option disabled value="Rating">Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div><br />
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea 
                        value={reviewText} 
                        onChange={(e) => setReviewText(e.target.value)} 
                        id="Review"  
                        className="form-control"
                        required
                    ></textarea>
                </div><br />
                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddReview;









