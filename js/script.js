var $imgClass = $('.imgClass');
var $description = $('.description');
var $wikiElem = $('#wikipedia-links');
var $nytHeaderElem = $('#nytimes-header');
var $nytElem = $('#nytimes-articles');
var $greeting = $('#greeting');

function loadData() {

   // clear out old data before new request
   $wikiElem.text("");
   $nytElem.text("");

   return false;
};

$('#submit-btn').on('click', function () {

   var street = $('#street').val();
   var city = $('#city').val();
   var address = street + ',' + city;
   var response;
   var data;
  
   //Google maps
   $imgClass.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '&key=AIzaSyARYlLSUYf3vSR3IIL0pZe6hFTxZ7i3R4M"/>');
 
   //Wikipedia
   $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&titles=' + city,
      dataType: "jsonp",
      jsonp: "callback",
      success: function (data) {

         var obj = data.query.pages;
         var content = obj[Object.keys(obj)[0]];
         $description.append(content.extract);
      }
   });
   
//New York Times
   var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=69ca3450a93f421ea0d1df6402c49630';
   $.getJSON(nytimesUrl, function (data) {

      $nytHeaderElem.text('New York Times Articles About ' + city);
      articles = data.response.docs;
      for (var i = 0; i < articles.length; i++) {
         var article = articles[i];
         $nytElem.append('<li class="article">' +
                 '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
                 '<p>' + article.snippet + '</p>' +
                 '</li>');
      };
   })
           .error(function (e) {
              $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
           });
});

$('#form-container').submit(loadData);
