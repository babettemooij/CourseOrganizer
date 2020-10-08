window.onload =  function(){
   var requests = [d3.csv('data/data_r.csv')]
   Promise.all(requests).then(function(response) {
     data = lower(response);
     console.log(data)
  }).catch(function(e) {
      throw(e);
  });
};

function search(){
  const input = document.getElementById('search_input').value.toLowerCase();
  console.log(input)
  const found = data[0].filter(element => element.title.includes(input) || element.courses.includes(input) || element.authors.includes(input) || element.topic1.includes(input) || element.topic2.includes(input) || element.topic3.includes(input) || element.keywords.includes(input));
  console.log(found)
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
