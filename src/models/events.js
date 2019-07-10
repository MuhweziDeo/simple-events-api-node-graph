const mongoose = require('mongoose');

const schema = mongoose.Schema;

const eventSchema = new schema({
    eventName: String,
    date: String,
    user_id: String

});

module.exports = mongoose.model('Event', eventSchema);
