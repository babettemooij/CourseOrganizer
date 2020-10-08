window.onload =  function(){
   var requests = [d3.csv('data/data_r.csv')]
   Promise.all(requests).then(function(response) {
     // read data again
     var data = lower(response);

     // get the field parameter from url
     // in this case it is the title
     const queryString = window.location.search;
     const urlParams = new URLSearchParams(queryString);
     const title = urlParams.get('title');
     // search in data for title
     let data_document= data[0].filter(element => element.title.includes(title));
     // preprocess data for pretty printing
     data_document = preprocess(data_document);
     // add data to html page
     seperate_view(data_document[0]);
  }).catch(function(e) {
      throw(e);
  });
};


function seperate_view(data_document) {
  // mustache template
  // dynamically fill template of documnent view.html
  var template = document.getElementById('seperate_view_template').innerHTML;
  var rendered = Mustache.render(template, data_document);
  document.getElementById('fill_seperate_view_template').innerHTML = rendered;
}
