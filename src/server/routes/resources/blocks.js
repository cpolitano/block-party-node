require("dotenv").load();

var Twitter = require("twitter");
var thunkify = require("thunkify");

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

var getTimeline = thunkify(client.get);

var router = require("koa-router")();

router.get("/:screen_name", function *() {

	var screen_name = this.params.screen_name;
	var params = {screen_name: screen_name};
	var response = yield getTimeline.call(client, "blocks/list", params); 
	var blocks = response[0].users;
	
	this.body = {
		success: true,
		blocks: blocks
	};

})

module.exports = router
