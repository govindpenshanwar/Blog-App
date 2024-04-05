const mongoose = require('mongoose');

 async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BloggerDB').then(() => {
            console.log("Db Connected");
        }).catch((err) => {
            console.error("Err connecting DB");
        });
    } catch (error) {
        console.error("Err connecting db => ", error.message);
    }
}

module.exports =  connect;