const mongoose = require('mongoose');
const connectDB = async () => {
    try{
            await mongoose.connect(process.env.URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });
            console.log('MongoDB connected!'); 
    }
    catch(err) {
        console.log(err.message);
        // Exit process with failure
		process.exit(1);
    }
};

module.exports = connectDB;