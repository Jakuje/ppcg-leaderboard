try {
  var QUESTION_ID = /id=([0-9]+)/.exec(window.location.href)[1];
} catch (e) {
  document.body.innerHTML = "<p>Whoops! You didn't specify an ID.</p>";
}

var api_request = new XMLHttpRequest(),
  count = 1;

function new_table_row(table_node, val1, val2, val3) {
  row = table_node.insertRow();
  row.insertCell().innerHTML = val1;
  row.insertCell().innerHTML = val2;
  row.insertCell().innerHTML = val3;
}

function linkify(text, link) {
  return "<a href='" + link + "' target='_blank'>" + text + "</a>";
}

function process_data(items) {
  var result = [];

  Object.keys(items).forEach(function(index) {
    var first_line = items[index].body.split("\n", 1)[0].replace(/<\/?strong>/g, "");
    var info = /<h\d>.*?<a href="(.*?)".*?>(.*?)<\/a>|<h\d>(?:\[.*?\])?(?:<.*>)?(.*?)[,(-]/i.exec(first_line);
    var data = {};
    try {
      data.author = items[index].owner.display_name,
      data.link = info[1],
      data.lang = (info[2] || info[3]).trim(),
      data.byte_count = /(-?\d+)\D*<\/h\d>/.exec(first_line)[1],
      data.share_link = items[index].share_link,
      data.author_link = items[index].owner.link;
    } catch(e) {
      console.log("Encountered error with title: "+ first_line);
    }
    result.push(data);
  });

  result = result.filter(Boolean).filter(function(element) { return element.hasOwnProperty("byte_count") });

  result.sort(function(a, b) {
    return parseInt(a.byte_count) - parseInt(b.byte_count);
  });

  result.forEach(function(answer_info) {
    if (answer_info.lang) {
      var overall = document.getElementById("overall");
      if (answer_info.link) {
        new_table_row(overall, linkify(answer_info.lang, answer_info.link), linkify(answer_info.author, answer_info.author_link), linkify(answer_info.byte_count, answer_info.share_link));
      } else {
        new_table_row(overall, answer_info.lang, linkify(answer_info.author, answer_info.author_link), linkify(answer_info.byte_count, answer_info.share_link));
      }
    }
  });

  var used_langs = [];
  result.forEach(function(answer_info) {
    if (answer_info.lang) {
      if (used_langs.indexOf(answer_info.lang.toLowerCase()) === -1) {
        var overall = document.getElementById("langs");
        if (answer_info.link) {
          new_table_row(overall, linkify(answer_info.lang, answer_info.link), linkify(answer_info.author, answer_info.author_link), linkify(answer_info.byte_count, answer_info.share_link));
        } else {
          new_table_row(overall, answer_info.lang, linkify(answer_info.author, answer_info.author_link), linkify(answer_info.byte_count, answer_info.share_link));
        }
        used_langs.push(answer_info.lang.toLowerCase());
      }
    }
  });
}

function perform_request(last_response) {
  api_request.open("GET", "https://api.stackexchange.com/2.2/questions/" + QUESTION_ID + "/answers?page=" + count++ +"&pagesize=100&order=desc&sort=creation&site=codegolf&filter=!t)IWYnsLAZle2tQ3KqrVveCRJfxcRLe&key=MIk0IeHK)wMRb9cJe7pO1Q((&client_id=15046")
  api_request.send();
  api_request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(this.responseText);
      if (response.has_more) {
        perform_request((last_response || []).concat(response.items));
      } else {
        process_data((last_response || []).concat(response.items));
      }
    }
  };
}

perform_request();
