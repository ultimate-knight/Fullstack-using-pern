require('dotenv').config();
const express = require('express');
const cors=require('cors')
// const morgan = require('morgan');
const app = express();
const db=require("./db");

// app.use(morgan('tiny'));


// app.use((req, res, next)=>{
//     console.log('hey there')
//     next();
// });


app.use(cors());
app.use(express.json())

// Second middleware (if needed)

app.get("/api/v1/restaurant", async (req, res) => {

    try{
        const results=await db.query("select * from restaurant")
        const restaurantRatingData=await db.query("select * from restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id=reviews.restaurant_id;");
        // console.log('results', results)
        // console.log('restaurant data',restaurantRatingData)

        // console.log(results);
        res.status(200).json({
            status: "success",
            results: restaurantRatingData.rows.length,
            data: { restaurant: restaurantRatingData.rows
    
            },
        }); 
    }catch(err){
        console.log(err);
    }

});


app.get("/api/v1/restaurant/:id", async (req, res) => {
    console.log(req.params.id);

     try {
        const restaurant=await db.query(" select * from restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id=reviews.restaurant_id where id=$1;", [req.params.id]);
        const reviews=await db.query("select * from reviews where restaurant_id=$1", [req.params.id]);
        // console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data:{
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
    
            },
        });
    }catch(err){

        console.log(err);
    }

    
});







app.post("/api/v1/restaurant", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query("INSERT INTO restaurant (name, location, price_range) values($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);

        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0], // Adjust based on how your db.query result is structured
            },
        });
    } catch (err) {
        console.log(err);
        // res.status(500).json({
        //     status: "error",
        //     message: "An error occurred while adding the restaurant.",
        // });
    }
});























app.put("/api/v1/restaurant/:id", async (req, res)=>{
    try{
        const results=await db.query("UPDATE restaurant SET name=$1, location=$2, price_range=$3 where id=$4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id ]);
        res.status(201).json({
            status: "success",
            data:{
                restaurant: results.rows[0],
    
            },
        });
        // console.log(results);

    }catch(err){
        console.log(err)
    }
    console.log(req.params.id);
    console.log(req.body);
});




app.delete("/api/v1/restaurant/:id", async (req, res)=>{

    try{
        const results=db.query("DELETE from restaurant where id=$1", [req.params.id,]);

        res.status(204).json({
            status: 'success',


    });
    }catch(err){
        console.log(err);
    }
});



app.post("/api/v1/restaurant/:id/addReview", async (req, res)=>{

    try{
        const newReview=await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) values($1, $2, $3, $4) returning *;', [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: 'success',
            data:{
                review: newReview.rows[0]
            }
        })

    }catch(err){
        console.log(err);

    }


})




// 404 handler should be placed after all routes
app.use((req, res) => {
    console.log('yeah my middleware');
    res.status(404).send({
        name: 'maaz'
    });
});


app.use((req, res, next) => {
    console.log('yeah our second middleware');
    next(); // Ensure this is called to continue to the next middleware
});




// const port = process.env.PORT || 3002;
const port=3002;
app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});














