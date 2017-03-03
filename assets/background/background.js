

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function r_in_r(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_user_info(send_response) {
  chrome.identity.getProfileUserInfo(function(userInfo) {
    console.log(userInfo);
    send_response({data:userInfo});
  });
}

/**
 * Sends a message to the content script.
 * @param  {object} msg_content     data to be sent in message.
 * @param  {function} on_response   function to be called when response is recieved.
 */
function message_content(msg_content, on_response) {
  // set default on_response function if none provided.
  if (!on_response) {
    on_response = function (response) {
      console.log(response);
    }
  }
  // get reference to current tab
  chrome.tabs.query(cur_tab, function(tabs) {
    var tab = tabs[0];
    // send message to content script.
    chrome.tabs.sendMessage(tab.id, msg_content, null, on_response);
  });
}

/**
 * Handler for messages from the content script or popup script.
 * @param  {object} request        message data from the content script.
 * @param  {object} sender         data about the tab from which the message
 *                                 came.
 * @param  {function} sendResponse function to use to send the response back to
 *                                 the content script/tab/sender..
 */
function onMessage(request, sender, sendResponse) {
  console.log("Message recieved: " + JSON.stringify(request));
  switch (request.action) {
    case 'get_user_info':
      get_user_info(sendResponse);
      break;
  }
}

function init () {
  chrome.runtime.onMessage.addListener(onMessage);
}

init();
