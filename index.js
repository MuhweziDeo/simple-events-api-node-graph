const app = require('./src/app');
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/events')
    .then(console.log('connected'))
    .catch(err => console.log(err));


app.listen(8000, () => console.log(`Find me here`));
