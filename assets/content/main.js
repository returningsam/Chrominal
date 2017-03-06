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

function get_query_string(tokens) {
  var q_str = "";
  for (var i = 0; i < tokens.length; i++) {
    q_str += tokens[i];
    if (i < tokens.length-1) q_str += "+";
  }
  return q_str;
}

function google(tokens) {
  var base = "https://www.google.com/search?q=" + get_query_string(tokens);
  window.open(base, '_blank');
}

function bing(tokens) {
  var base = "https://www.bing.com/search?q=" + get_query_string(tokens);
  window.open(base, '_blank');
}

function duckduckgo(tokens) {
  var base = "https://duckduckgo.com/?q=" + get_query_string(tokens);
  window.open(base, '_blank');
}

function youtube(tokens) {
  var base = "https://www.youtube.com/results?search_query=" + get_query_string(tokens);
  window.open(base, '_blank');
}

function search(tokens, op) {
  if (tokens.length < 1) {
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
  cur_hist_ind = cmd_history.length;
  update_output(get_prompt() + " " + inp_str);
}

function prev_cmd() {
  if (cur_hist_ind != null && cur_hist_ind > 0) {
    cur_hist_ind--;
    update_inp_val(cmd_history[cur_hist_ind]);
  }
}

function next_cmd() {
  if (cur_hist_ind != null && cur_hist_ind < cmd_history.length) {
    cur_hist_ind++;
    if (cur_hist_ind == cmd_history.length) {
      update_inp_val("");
    }
    else {
      update_inp_val(cmd_history[cur_hist_ind]);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// BOOKMARKS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function get_bookmarks() {
  chrome.bookmarks.getTree( function (tree) {
    bookmarks = tree[0];
    //console.log(bookmarks);
  });
}

function get_parent_rec(tree,parent_id) {
  if (tree.id == parent_id) return tree;

  else {
    var found_tree = false;
    for (var i = 0; i < tree.children.length; i++) {
      if (!found_tree) {
        found_tree = get_parent_rec(tree.children[i],parent_id);
        if (found_tree) break;
      }
    }
    return found_tree;
  }
}

function get_parent(tree) {
  var parent_id = tree.parentId;

  if (parent_id) return get_parent_rec(bookmarks,parent_id);
  else return false;
}

function get_cur_pos() {
  var dir_tokens = cwd.replace("~","").split("/");
  var tree_cur = bookmarks;
  while (dir_tokens[0] == "") {
    dir_tokens.splice(0,1);
  }
  if (dir_tokens.length == 0) {
    return tree_cur;
  }
  while (dir_tokens.length > 0) {
    for (var j = 0; j < tree_cur.children.length; j++) {
      if (tree_cur.children[j].title == dir_tokens[0]) {
        tree_cur = tree_cur.children[j];
        console.log(tree_cur);
        break;
      }
    }
    dir_tokens.splice(0,1);
  }

  return tree_cur;
}

function get_temp_new_pos(dir_str) {
  var tree_cur = get_cur_pos();

  var dir_tokens = dir_str.split("/");
  // check for root dir
  if (dir_tokens[0] == "~" || dir_tokens[0] == "") {
    tree_cur = bookmarks;
    dir_tokens.splice(0,1);
  }
  while (dir_tokens.length > 0) {
    var found = false;
    for (var j = 0; j < tree_cur.children.length; j++) {
      if (dir_tokens[0] == "..") {
        tree_temp = get_parent(tree_cur);
        if (tree_temp) {
          tree_cur = tree_temp;
        }
        found = true;
        break;
      }
      if (tree_cur.children[j].title == dir_tokens[0]) {
        found = true;
        tree_cur = tree_cur.children[j];
        break;
      }
    }
    if (!found) {
      return false;
    }
    dir_tokens.splice(0,1);
  }
  return tree_cur;
}

function ls(tokens) {
  var tree_cur;
  if (tokens.length == 1) {
    tree_cur = get_temp_new_pos(tokens[0]);
    if (!tree_cur) {
      update_output("ls: " + tokens[0] + ": No such file or directory");
    }
  }
  else if (tokens.length == 0) {
    tree_cur = get_cur_pos();
  }
  else {
    update_output("usage: ls [folder]");
    update_output("support for multiple folders will be added later");
    return;
  }
  var ls_str = "";
  console.log(tree_cur);
  for (var i = 0; i < tree_cur.children.length; i++) {
    ls_str += tree_cur.children[i].title;
    if (i < tree_cur.children.length-1) {
      ls_str += "\xa0\xa0\xa0\xa0\xa0\xa0";
    }
  }
  if (ls_str.length > 0) {
    update_output(ls_str);
  }
}

function cd(tokens) {
  if (tokens.length == 0) {
    tokens = ["~"];
  }
  else if (tokens.length > 1) {
    update_output("usage: cd [folder]");
    return;
  }

  tree_cur = get_temp_new_pos(tokens[0]);
  if (!tree_cur) {
    update_output("cd: No such file or directory: " + tokens[0]);
    return;
  }
  if (!tree_cur.children) {
    update_output("cd: not a directory: " + tokens[0]);
    return;
  }
  else {
    var cwd_tok = cwd.split("/").concat(tokens[0].split("/"));
    while (cwd_tok.indexOf("..") > -1) {
      var ind = cwd_tok.indexOf("..");
      if (cwd_tok[ind-1]) {
        cwd_tok.splice(ind-1,1);
      }
      ind = cwd_tok.indexOf("..");
      cwd_tok.splice(ind,1);
    }
    cwd = cwd_tok.join("/");
  }
}
//
// function star_match(pat, str, st_en) {
//   if (st_en) {
//     while (true) {
//
//     }
//   }
//   else {
//
//   }
// }

function bk_open(tokens) {
  if (tokens.length < 1) {
    update_output("usage: open [bookmark ...]");
  }
  var tree_cur = get_cur_pos();
  for (var i = 0; i < tokens.length; i++) {
    var found = false;
    for (var j = 0; j < tree_cur.children.length; j++) {
      if (tokens[i] == tree_cur.children[j].title && tree_cur.children[j].url) {
        window.open(tree_cur.children[j].url, '_blank');
        found = true;
      }
    }
    if (!found) {
      update_output("open: not a bookmark: " + tokens[i]);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////

function update_inp_val(new_val) {
  document.getElementById('main_input').value = new_val;
}

function tokenize_inp(inp_str) {
  // tokenize
  var tokens = inp_str.split(" ");

  while (tokens.indexOf("") > -1) {
    tokens.splice(tokens.indexOf(""),1);
  }

  //check for escaped spaces
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i][tokens[i].length-1] == "\\") {
      if (tokens[i+1]) {
        tokens[i] = tokens[i].replace("\\","") + " " + tokens[i+1];
        tokens.splice(i+1,1);
        i--;
      }
    }
  }
  return tokens;
}

function parse_input() {
  get_bookmarks();
  // take input
  var inp_str = document.getElementById('main_input').value;
  // empty input
  update_inp_val("");
  // add command to history
  add_history(inp_str);

  var tokens = tokenize_inp(inp_str);

  var main_cmd = tokens.splice(0,1);
  // match
  if (main_cmd == "search") {
    search(tokens,def_search);
  }
  else if (search_ops[main_cmd]) {
    search(tokens,main_cmd);
  }
  else if (main_cmd == "ls") {
    ls(tokens);
  }
  else if (main_cmd == "cd") {
    cd(tokens);
  }
  else if (main_cmd == "open") {
    bk_open(tokens);
  }
  else {
    update_output("-ch_term: " + main_cmd + ": command not found");
  }
  update_prompt();
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

function get_prompt() {
  if (user_name == "you") {
    chrome.identity.getProfileUserInfo(function(userInfo) {
      if (userInfo.email) {
        user_name = userInfo.email.split("@")[0];
        if (user_name != "you") {
          setTimeout(update_prompt, 10);
        }
      }
    });
  }
  return prompt_base + user_name + ":" + cwd + prompt_ind;
}

function update_prompt() {
  document.getElementById('prompt').innerHTML = get_prompt();
}

function auto_focus() {
  document.getElementById('main_input').focus();
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
  window.addEventListener('click',auto_focus);
}

function init() {
  get_bookmarks();
  add_listeners();
  update_prompt();

}

window.onload = init;
