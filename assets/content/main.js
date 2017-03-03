var cmd_history;
var bookmarks;
var def_search = "google";
var search_ops = {"google":google,"bing":bing,"duckduckgo":duckduckgo,"youtube":youtube};

var cur_hist_ind;
var prompt_base = "chrome@"
var user_name = "you";
var cwd = "~";
var prompt_ind = "$";


////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// SEARCH ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


function google(tokens) {
  var base = "https://www.google.com/search?q=";
  for (var i = 1; i < tokens.length; i++) {
    base += tokens[i];
    if (i < tokens.length-1) base += "+";
  }
  window.location.href = base;
}

function bing(tokens) {
  var base = "https://www.bing.com/search?q=";
  for (var i = 1; i < tokens.length; i++) {
    base += tokens[i];
    if (i < tokens.length-1) base += "+";
  }
  window.location.href = base;
}

function duckduckgo(tokens) {
  var base = "https://duckduckgo.com/?q=";
  for (var i = 1; i < tokens.length; i++) {
    base += tokens[i];
    if (i < tokens.length-1) base += "+";
  }
  window.location.href = base;
}

function youtube(tokens) {
  var base = "https://www.youtube.com/results?search_query=";
  for (var i = 1; i < tokens.length; i++) {
    base += tokens[i];
    if (i < tokens.length-1) base += "+";
  }
  window.location.href = base;
}

function search(tokens, op) {
  if (!op) {
    if (tokens.length < 2) {
      update_output("Usage: search [query]");
      update_output("To change the default search engine, refer to the 'set' command");
      return;
    }
    op = def_search;
  }
  if (tokens.length < 2) {
    update_output("Usage: " + op + " [query]");
    update_output("To change the default search engine, refer to the 'set' command");
    return;
  }
  search_ops[op](tokens);
  update_output("searching " + op + "...")
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// HISTORY //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function add_history(inp_str) {
  if (!cmd_history) {
    cmd_history = [];
  }
  cmd_history.push(inp_str);
  update_output("\ \ " + cur_prompt + " " + inp_str);
}

function prev_cmd() {
  if (cur_hist_ind == null) {
    cur_hist_ind = cmd_history.length-1;
  }
  else if (cur_hist_ind > 0) {
    cur_hist_ind--;
  }
  update_inp_val(cmd_history[cur_hist_ind]);
  console.log(cur_hist_ind);
}

function next_cmd() {
  if (cur_hist_ind != null) {
    cur_hist_ind++;
    if (cur_hist_ind > cmd_history.length-1) {
      cur_hist_ind = null;
    }
    if (cur_hist_ind == null) {
      update_inp_val("");
    }
    else {
      update_inp_val(cmd_history[cur_hist_ind]);
    }
  }
  console.log(cur_hist_ind);
}

////////////////////////////////////////////////////////////////////////////////

function update_inp_val(new_val) {
  document.getElementById('main_input').value = new_val;
}

function parse_input() {
  // take input
  var inp_str = document.getElementById('main_input').value;
  add_history(inp_str);
  // tokenize
  var tokens = inp_str.split(" ");

  // match
  if (tokens[0] == "search") {
    search(tokens);
  }
  else if (Object.keys(search_ops).indexOf(tokens[0]) > -1) {
    search(tokens,tokens[0]);
  }
  else {
    update_output("-ch_term: " + tokens[0] + ": command not found");
  }

  // empty input
  update_inp_val("");
}

function update_output(new_str) {
  var new_ln;
  if (new_str) {
    new_ln = document.createElement('p');
    new_ln.innerHTML = new_str;
  }
  else {
    new_ln = document.createElement('br');
  }

  document.getElementById('output_cont').appendChild(new_ln);
}

function update_prompt() {
  if (user_name == "you") {
    chrome.identity.getProfileUserInfo(function(userInfo) {
      if (userInfo.email) {
        user_name = userInfo.email.split("@")[0];
        console.log(user_name);
        if (user_name != "you") {
          setTimeout(update_prompt, 10);
        }
      }
    });
  }
  document.getElementById('prompt').innerHTML = prompt_base + user_name + ":" + cwd + prompt_ind;
}

function keydown_handler(key_ev) {
  var key_code = key_ev.keyCode;
  switch (key_code) {
    case 38:
      // up
      prev_cmd();
      break;
    case 40:
      // down
      next_cmd();
      break;
  }
}

function key_handler(key_ev) {
  var key_code = key_ev.keyCode;
  var key = key_ev.key;
  switch (key_code) {
    case 13:
      // enter
      parse_input();
      break;
  }
}

function add_listeners() {
  window.addEventListener('keypress',key_handler);
  document.getElementById('main_input').addEventListener('keydown',keydown_handler);
}

function init() {
  add_listeners();
  update_prompt();
}

window.onload = init;
