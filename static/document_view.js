window.onload =  function(){
   var requests = [d3.csv('data/data_r.csv')]
   Promise.all(requests).then(function(response) {
     var data = lower(response);
     const queryString = window.location.search;
     const urlParams = new URLSearchParams(queryString);
     console.log(queryString)
     const title = urlParams.get('title');
     console.log(title)
     data_document= data[0].filter(element => element.title.includes(title));
     console.log(data_document)
     seperate_view(data_document[0]);
  }).catch(function(e) {
      throw(e);
  });
};
function seperate_view(data_document) {
  var template = document.getElementById('seperate_view_template').innerHTML;
  var rendered = Mustache.render(template, data_document);
  document.getElementById('fill_seperate_view_template').innerHTML = rendered;
}

function lower(obj){
  for (var prop in obj) {
    if (typeof obj[prop] === 'string') {
      obj[prop] = obj[prop].toLowerCase();
    }
    if (typeof obj[prop] === 'object') {
      lower(obj[prop]);
      }
    }
  return obj;
}
