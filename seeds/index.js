const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i ++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62bfdaa2b57f5544bbc59fc1',
            location: `${cities[random1000].city}, 
            ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eum omnis vitae aliquam temporibus, velit accusantium suscipit non recusandae alias doloremque officia. Dicta numquam recusandae porro consectetur rem corporis officiis?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dw1dvjbx1/image/upload/v1657109027/YelpCamp/skyes9w6t7tmf9xwonpj.png',
                  filename: 'YelpCamp/skyes9w6t7tmf9xwonpj',
                },
                {
                    url: 'https://res.cloudinary.com/dw1dvjbx1/image/upload/v1657109160/YelpCamp/gbmlexikgzr09bahcpbl.jpg',
                    filename: 'YelpCamp/gbmlexikgzr09bahcpbl',
                  }
              ]
        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});