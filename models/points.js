const mongoose = require('mongoose');

const pointsSchema = mongoose.Schema({
    points: [Number],
    color: String,
    shapeType: String,
});

module.exports = mongoose.model('Points',pointsSchema);