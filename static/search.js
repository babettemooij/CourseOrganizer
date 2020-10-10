window.onload = function () {
  var requests = [d3.csv('data.csv')];
  Promise.all(requests)
    .then(function (response) {
      data = lower(response);
      // onkeyup of search bar start searching
      $('#search_input').keyup(search);
    })
    .catch(function (e) {
      throw e;
    });
};

function search() {
  // search function for the search bar
  const input = document.getElementById('search_input').value.toLowerCase();
  let found = data[0].filter(
    (element) =>
      element.title.includes(input) ||
      element.courses.includes(input) ||
      element.authors.includes(input) ||
      element.topic1.includes(input) ||
      element.topic2.includes(input) ||
      element.topic3.includes(input) ||
      element.type.includes(input) ||
      element.abstract.includes(input) ||
      element.course_name_abbreviation.includes(input) ||
      element.year_created.includes(input) ||
      element.keywords.includes(input)
  );
  found = preprocess(found);
  add_all_results(found);
}

function update_files(data_document, target_id) {
  // mustache template
  // this function will fill in the information of one document
  var template = document.getElementById('mp_template').innerHTML;
  var rendered = Mustache.render(template, data_document);
  document.getElementById(target_id).innerHTML = rendered;
}

function add_all_results(found) {
  // this function adds all the document together on the page
  // remove old document
  d3.selectAll('.result_document').remove();
  for (i in found) {
    // id for each document
    const target = 'target' + i;
    d3.select('.results')
      .append('div')
      .attr('id', target)
      .attr('class', 'result_document');
    update_files(found[i], target);
  }
}


// filter functions
var filters = []

function make_filter(filter) {
  filters_2 = filters.filter(function (element) { return element[1] != filter[1]; });
  if (filters.length == filters_2.length) {
    filters.push(filter)
  }
  else {
    filters = filters_2
  }
  filter_update(filters)
}

function filter_update(filters) {
  let found = data[0].filter(
    (element) => {
      for (filter of filters) {
        type = filter[0]
        input = filter[1]
        if (type.includes("year")) {
          if (element.year_created >= input[0] && element.year_created <= input[1]) {
            return true
          }
        }
        else if (type.includes("page_count")) {
          if (element.page_count >= input[0] && element.page_count <= input[1]) {
            return true
          }
        }
        else if (type.includes("category")) {
          if (element.category.includes(input)) {
            return true
          }
        }
        else if (type.includes("doc")) {
          if (element.type.includes(input)) {
            return true
          }
        }
        else if (type.includes("course")) {
          if (element.course_name_abbreviation.includes(input)) {
            return true
          }
        }
        else {
          return false
        }
      }
    })
  found = preprocess(found);
  add_all_results(found);
}

