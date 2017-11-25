var models = require('./models');

console.log('Seeding database');
console.log("Removing all data from db")
models.Cache.remove({}).exec(function(err) {
	console.log('database seeded');
});
