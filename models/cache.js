var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = JSON.parse(fs.readFileSync('./config/dbserver.json', 'utf-8'));
var crypto = require("crypto");

//This method takes care of the overwrtitng functionality
var checkAndReplaceRecord = function(next) {
	var self = this;
	self.modifiedAt = new Date();
	if (!self.isNew) return next();
	self.model('Cache').count({}, function(err, count) {
		//check for the record that has been last modified and replace
		if (count + 1 > config.cache.maxLimit) {
			self.model('Cache')
				.findOne({}, {
					_id: 1
				})
				.sort({
					modifiedAt: 1
				}).exec(function(err, cache) {
					self.isNew = false;
					self._id = cache._id;
					self.createdAt = new Date();
					self.modifiedAt = new Date();
					next();
				});
		} else {
			next();
		}
	});
};


//Cache
var CacheSchema = new Schema({
	key: {
		type: String,
		trim: true,
		index: true
	},
	ttl: {
		type: Number,
		default: 86400 //one day
	},
	content: {
		type: String,
		default: (Math.random() + 1).toString(36).substring(7) //generates a random String
	},
	modifiedAt: {
		type: Date,
		default: Date.now,
		index: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		index: true
	}
}, {
	collection: 'cache'
});

CacheSchema.pre('save', checkAndReplaceRecord);

module.exports = mongoose.model('Cache', CacheSchema);
