var input = process.argv.splice(3);
var fs = require('fs');

function twitterFunction() {
    var Twitter = require('twitter');
    var client = new Twitter(require('./keys.js').twitterKeys);
    var params = { screen_name: 'realDonaldTrump' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0, n = 20; i < n; i++) {
                console.log(tweets[i].created_at + ' - ' + tweets[i].text);
                fs.appendFileSync('log.txt', tweets[i].created_at + ' - ' + tweets[i].text + '\n');
            }
            console.log('**********');
            fs.appendFileSync('log.txt', '**********' + '\n');
        } else if (error) {
            console.log(error);
        }
    });
}

function spotifyFunction() {
    var spotify = require('spotify');
    // var input = process.argv.splice(3);
    if (input === '') {
        input = 'The Sign Ace of Base'
    }
    spotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else if (!err) {
            // console.log(JSON.stringify(data.tracks.items[0], null, 2));
            console.log('Artist Name: ' + data.tracks.items[0].album.artists[0].name);
            console.log('Song Name: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('**********');
            fs.appendFileSync('log.txt', 'Artist Name: ' + data.tracks.items[0].album.artists[0].name + '\n');
            fs.appendFileSync('log.txt', 'Song Name: ' + data.tracks.items[0].name + '\n');
            fs.appendFileSync('log.txt', 'Preview Link: ' + data.tracks.items[0].album.artists[0].external_urls.spotify + '\n');
            fs.appendFileSync('log.txt', 'Album: ' + data.tracks.items[0].album.name + '\n');
            fs.appendFileSync('log.txt', '**********' + '\n');
        }
    });
}

function omdbFunction() {
    var request = require("request");
    // var input = process.argv.slice(3);
    if (input === '') {
    	input = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&r=json", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body));
            console.log('Name: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            console.log('Rotten Tomatoes URL: ' + JSON.parse(body).Ratings[1].Value);
            console.log('**********');
            fs.appendFileSync('log.txt', 'Name: ' + JSON.parse(body).Title + '\n');
            fs.appendFileSync('log.txt', 'Year: ' + JSON.parse(body).Year + '\n');
            fs.appendFileSync('log.txt', 'IMDB Rating: ' + JSON.parse(body).imdbRating + '\n');
            fs.appendFileSync('log.txt', 'Country: ' + JSON.parse(body).Country + '\n');
            fs.appendFileSync('log.txt', 'Language: ' + JSON.parse(body).Language + '\n');
            fs.appendFileSync('log.txt', 'Plot: ' + JSON.parse(body).Plot + '\n');
            fs.appendFileSync('log.txt', 'Actors: ' + JSON.parse(body).Actors + '\n');
            fs.appendFileSync('log.txt', 'Rotten Tomatoes URL: ' + JSON.parse(body).Ratings[1].Value + '\n');
            fs.appendFileSync('log.txt', '**********' + '\n');
        }
    });
}

function dwisFunction() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		var data1 = data.split('\n');
		for (var i = 0, n = data1.length; i < n; i++) {
			var data2 = data1[i].split(',');
			input = data2[1];
			main(data2[0]);
		}
	});
}

function main(command) {
    switch (command) {
        case 'my-tweets':
            twitterFunction();
            break;
        case 'spotify-this-song':
            spotifyFunction();
            break;
        case 'movie-this':
            omdbFunction();
            break;
        case 'do-what-it-says':
        	dwisFunction();
            break;
        default:
    }
}

main(process.argv[2]);