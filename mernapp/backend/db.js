const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sandeep2034maurya:mern123@cluster0.4lmoors.mongodb.net/gofoodmern?retryWrites=true&w=majority'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        const fetchedData = await mongoose.connection.db.collection('food_items');
        fetchedData.find({}).toArray(async function (err, data) {
            const foodCategory = await mongoose.connection.db.collection('foodCategory');
            foodCategory.find({}).toArray(function (err, catData) {
                if (err) console.log(err);
                else {
                    global.food_items = data;
                    global.foodCategory = catData;
                    // console.log(global.food_items);
                }
            })
        }
            // mongoose.connection.close(); // Close the connection after fetching the data
        );
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = mongoDB;
