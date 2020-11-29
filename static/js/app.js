// Page JS for the Advent Calendar
// Created 2020-11-24

var app = app || {};

app.showAllDates = 0;

app.spreadsheetId = "1Fk2HrHM-2CPUCIlORGcwnYELPOqTeMtYbCLemOu6C10";
app.spreadsheetUrl = "https://spreadsheets.google.com/feeds/list/" + app.spreadsheetId + "/1/public/values?alt=json"; 
app.useMarkdown = true;

app.data = [];

app.retrieveSpreadsheetJson = function () {
  
  // Thanks to
  // http://bionicteaching.com/google-sheets-json-with-jquery/
  $.getJSON(app.spreadsheetUrl, function(data) {
                      
    var entry = data.feed.entry;
    // console.log(entry);
                      
    $(entry).each(function(){
      //make sure this matches your column labels when you change the source sheet
      // $('.results').prepend('<h2>'+this.gsx$title.$t+'</h2><p>'+this.gsx$url.$t+'</p>');
      var item = {
        date: this.gsx$date.$t,
        title: this.gsx$title.$t,
        subtitle: this.gsx$subtitle.$t,
        description: this.gsx$description.$t,
        imagesrc: this.gsx$imagesrc.$t,
        visiturl: this.gsx$visiturl.$t,
      };

      // Optionally change Markdown-formatted text in the description field to HTML
      if(app.useMarkdown !== false) {
        item.description = app.converter.makeHtml(item.description);
        // console.log(item.description);
      }
    
      // Check if the date is in the past
      // Thanks to
      // https://momentjs.com/docs/#/query/is-same-or-before/
      if(app.showAllDates || moment(item.date).isSameOrBefore()) {
        app.data.push(item)
      }
      else {
        console.log('Skipping ' + item.date);
      }
      
    });
                    
  }).done(function() {
    console.log("Successfully loaded spreadsheet data");
    app.displayLoadedCardData();

    app.hideLoadingMessage();

  }).fail(function() {
    console.log("Failed to load spreadsheet data");

    app.showErrorMessage("Couldn’t load spreadsheet data, try again later!");

    app.hideLoadingMessage();

  });

}

app.hideLoadingMessage = function () {
  $("#acLoadingMessage").hide();
}

app.showErrorMessage = function(message) {
  $("#acCardListPlaceholder").html(
    app.itemCardPlaceholderTemplate({
      message: message
    })
  );
}

app.displayLoadedCardData = function () {

  // var data = JSON.parse(app.sampleData);

  if(app.data.length === 0) {
    app.showErrorMessage("(It’s not Dec. 1 yet, come back soon…!)");
    return;
  }

  $(app.data).each(function(index, item){
    // console.log(index);
    // console.log(item);

    $("#acCardList").append(
      app.itemCardTemplate({item: item})
    );

  });

  console.log('Loaded card HTML elements');

}

$(function () {
  // Initial page load config
  console.log("Running!");

  app.itemCardTemplate = _.template($("#itemCardTemplate").html());
  app.itemCardPlaceholderTemplate = _.template($("#itemCardPlaceholderTemplate").html());

  app.converter = new showdown.Converter({
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
    ghCompatibleHeaderId: true,
    emoji: true
  });

  // Run the spreadsheet lookup!
  app.retrieveSpreadsheetJson(app.spreadsheetUrl);

});
