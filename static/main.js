function preprocess(obj) {
  const num_items = obj.length;
  for (var prop in obj) {
    // create new property processed title with the first letter of each word in title as capital letter
    const title = obj[prop]['title'];
    if (title) {
      obj[prop]['processed_title'] = titleCase(title);
    }
    // add abstract only if the document is a paper if its a slide set field to empty
    const type = obj[prop]['type'];
    if (type === 'paper') {
      obj[prop]['show_abstract'] = preprocess_abstract_text(
        obj[prop]['abstract']
      );
    } else if (type === 'slides') {
      obj[prop]['show_abstract'] = '';
    }
    // add abstract only if the document is a paper if its a slide set field to empty
    const keywords = obj[prop]['keywords'];
    if (keywords) {
      obj[prop]['show_keywords'] = obj[prop]['keywords'];
    } else if (!keywords) {
      obj[prop]['show_keywords'] = 'None';
    }
    // add count
    let num = (Number(prop)+1).toString();

    obj[prop]['count'] = num  + "/" + num_items
  }
  return obj;
}

function preprocess_abstract_text(str) {
  let short_abstract = str.split(' ').slice(0, 50).join(' ');
  short_abstract = 'Abstract: ' + short_abstract + ' (... see more)';
  return short_abstract;
}

function lower(obj) {
  // set everything to lowercase except filenames
  for (var prop in obj) {
    if (typeof obj[prop] === 'string' && prop != 'filename') {
      obj[prop] = obj[prop].toLowerCase();
    }
    if (typeof obj[prop] === 'object' && prop != 'filename') {
      lower(obj[prop]);
    }
  }
  return obj;
}

function titleCase(str) {
  // set first letter of each word in str to capital letter
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}
