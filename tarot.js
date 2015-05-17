// requires
var https = require('https');
var fs = require('fs');

var url = 'https://klaranet.com/d/tarot/cards';


var options = {
  hostname: url.split(['/'])[2],
  //key:    fs.readFileSync('/home/melvin/s/webid.pem'),
  //cert:   fs.readFileSync('/home/melvin/s/webid.pem'),
  port:     443,
  method:   'GET',
  headers:  {'Accept': 'application/json'},
  path: '/' + url.split(['/']).slice(3).join('/')
};



var req = https.request(options, function(res) {
  res.setEncoding('utf8');
  //console.error('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  var data = '';
  res.on('data', function (chunk) {

    data += chunk;
  });

  res.on('end', function () {

    //console.log(data);



    var j = JSON.parse(data);

    function pickRandomProperty(obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1/++count)
               result = prop;
        return result;
    }



    var card = j[pickRandomProperty(j)];
    var comment = card['http://purl.org/dc/terms/comment'][0];
    var title = card['http://purl.org/dc/terms/title'][0];
    var depiction = card['http://xmlns.com/foaf/0.1/depiction'][0];

    console.log(title.value + ' : ' + comment.value);
    console.log(depiction.value);
  });

});

req.on('error', function(e){

  console.log('error ' + e);

});

req.end();
