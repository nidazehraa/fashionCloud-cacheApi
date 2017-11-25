//API  routes file
var CacheController = require('./controllers/cache');

module.exports.init= function(app) {
	app.get('/cache', CacheController.listCache);
	app.get('/cache/:key', CacheController.readCache);
	app.post('/cache/:key', CacheController.createOrUpdateCache);
	app.put('/cache/:key', CacheController.createOrUpdateCache);
	app.delete('/cache/:key', CacheController.deleteCache);
	app.delete('/cache', CacheController.deleteAllCache);
};