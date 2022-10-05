const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
    .connect("mongodb://localhost:27017/yelp-camp")
    .then(() => {
        console.log("mongodb connect success");
    })
    .catch(err => console.log(err));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: "6337d94e54aec3904790ec2a",
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni temporibus commodi eum in consequatur tenetur mollitia iste culpa, molestiae quidem minus illum ipsa porro, dicta doloribus sit aliquid officiis repudiandae.",
            price: price,
            geometry: {
                type: "Point",
                coordinates: [cities[random].longitude, cities[random].latitude]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dw6db3mad/image/upload/v1664869105/YelpCamp/crml6monarflreuq8so0.png",
                    filename: "YelpCamp/crml6monarflreuq8so0"
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => mongoose.connection.close());
