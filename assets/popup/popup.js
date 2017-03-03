var base_links = [
  "random",
  "http://meta.stackexchange.com/",
  "http://stackoverflow.com/",
  "http://es.stackoverflow.com/",
  "http://arduino.stackexchange.com/",
  "http://german.stackexchange.com/",
  "http://pets.stackexchange.com/",
  "http://sqa.stackexchange.com/",
  "http://cs.stackexchange.com/",
  "http://webmasters.stackexchange.com/",
  "http://aviation.stackexchange.com/",
  "http://skeptics.stackexchange.com/",
  "http://networkengineering.stackexchange.com/",
  "http://lifehacks.stackexchange.com/",
  "http://bicycles.stackexchange.com/",
  "http://history.stackexchange.com/",
  "http://blender.stackexchange.com/",
  "http://ux.stackexchange.com/",
  "http://music.stackexchange.com/",
  "http://christianity.stackexchange.com/",
  "http://mathoverflow.net/",
  "http://biology.stackexchange.com/",
  "http://parenting.stackexchange.com/",
  "http://drupal.stackexchange.com/",
  "http://academia.stackexchange.com/",
  "http://rpg.stackexchange.com/",
  "http://anime.stackexchange.com/",
  "http://gamedev.stackexchange.com/",
  "http://photo.stackexchange.com/",
  "http://money.stackexchange.com/",
  "http://raspberrypi.stackexchange.com/",
  "http://salesforce.stackexchange.com/",
  "http://movies.stackexchange.com/",
  "http://travel.stackexchange.com/",
  "http://workplace.stackexchange.com/",
  "http://pt.stackoverflow.com/",
  "http://magento.stackexchange.com/",
  "http://chemistry.stackexchange.com/",
  "http://mechanics.stackexchange.com/",
  "http://webapps.stackexchange.com/",
  "http://wordpress.stackexchange.com/",
  "http://gis.stackexchange.com/",
  "http://scifi.stackexchange.com/",
  "http://sharepoint.stackexchange.com/",
  "http://ru.stackoverflow.com/",
  "http://codereview.stackexchange.com/",
  "http://security.stackexchange.com/",
  "http://softwareengineering.stackexchange.com/",
  "http://graphicdesign.stackexchange.com/",
  "http://ell.stackexchange.com/",
  "http://physics.stackexchange.com/",
  "http://tex.stackexchange.com/",
  "http://electronics.stackexchange.com/",
  "http://cooking.stackexchange.com/",
  "http://stats.stackexchange.com/",
  "http://diy.stackexchange.com/",
  "http://dba.stackexchange.com/",
  "http://android.stackexchange.com/",
  "http://math.stackexchange.com/",
  "http://apple.stackexchange.com/",
  "http://gaming.stackexchange.com/",
  "http://unix.stackexchange.com/",
  "http://english.stackexchange.com/",
  "http://askubuntu.com/",
  "http://superuser.com/",
  "http://serverfault.com/",
  "http://engineering.stackexchange.com/",
  "http://tor.stackexchange.com/",
  "http://judaism.stackexchange.com/",
  "http://woodworking.stackexchange.com/",
  "http://reverseengineering.stackexchange.com/",
  "http://datascience.stackexchange.com/",
  "http://space.stackexchange.com/",
  "http://sound.stackexchange.com/",
  "http://pm.stackexchange.com/",
  "http://softwarerecs.stackexchange.com/",
  "http://homebrew.stackexchange.com/",
  "http://gardening.stackexchange.com/",
  "http://video.stackexchange.com/",
  "http://sports.stackexchange.com/",
  "http://philosophy.stackexchange.com/",
  "http://outdoors.stackexchange.com/",
  "http://windowsphone.stackexchange.com/",
  "http://quant.stackexchange.com/",
  "http://hinduism.stackexchange.com/",
  "http://japanese.stackexchange.com/",
  "http://bitcoin.stackexchange.com/",
  "http://codegolf.stackexchange.com/",
  "http://writers.stackexchange.com/",
  "http://puzzling.stackexchange.com/",
  "http://crypto.stackexchange.com/",
  "http://hermeneutics.stackexchange.com/",
  "http://worldbuilding.stackexchange.com/",
  "http://fitness.stackexchange.com/",
  "http://dsp.stackexchange.com/",
  "http://spanish.stackexchange.com/",
  "http://politics.stackexchange.com/",
  "http://french.stackexchange.com/",
  "http://mathematica.stackexchange.com/",
  "http://boardgames.stackexchange.com/",
  "http://islam.stackexchange.com/",
  "http://freelancing.stackexchange.com/",
  "http://sitecore.stackexchange.com/",
  "http://3dprinting.stackexchange.com/",
  "http://genealogy.stackexchange.com/",
  "http://hardwarerecs.stackexchange.com/",
  "http://expressionengine.stackexchange.com/",
  "http://poker.stackexchange.com/",
  "http://ham.stackexchange.com/",
  "http://ebooks.stackexchange.com/",
  "http://russian.stackexchange.com/",
  "http://patents.stackexchange.com/",
  "http://musicfans.stackexchange.com/",
  "http://productivity.stackexchange.com/",
  "http://sustainability.stackexchange.com/",
  "http://buddhism.stackexchange.com/",
  "http://italian.stackexchange.com/",
  "http://chinese.stackexchange.com/",
  "http://cstheory.stackexchange.com/",
  "http://coffee.stackexchange.com/",
  "http://martialarts.stackexchange.com/",
  "http://opendata.stackexchange.com/",
  "http://alcohol.stackexchange.com/",
  "http://earthscience.stackexchange.com/",
  "http://astronomy.stackexchange.com/",
  "http://robotics.stackexchange.com/",
  "http://expatriates.stackexchange.com/",
  "http://craftcms.stackexchange.com/",
  "http://cogsci.stackexchange.com/",
  "http://bricks.stackexchange.com/",
  "http://linguistics.stackexchange.com/",
  "http://joomla.stackexchange.com/",
  "http://vi.stackexchange.com/",
  "http://emacs.stackexchange.com/",
  "http://portuguese.stackexchange.com/",
  "http://scicomp.stackexchange.com/",
  "http://economics.stackexchange.com/",
  "http://law.stackexchange.com/",
  "http://ethereum.stackexchange.com/",
  "http://health.stackexchange.com/",
  "http://elementaryos.stackexchange.com/",
  "http://chess.stackexchange.com/",
  "http://communitybuilding.stackexchange.com/",
  "http://languagelearning.stackexchange.com/",
  "http://korean.stackexchange.com/",
  "http://ai.stackexchange.com/",
  "http://retrocomputing.stackexchange.com/",
  "http://opensource.stackexchange.com/",
  "http://esperanto.stackexchange.com/",
  "http://latin.stackexchange.com/",
  "http://crafts.stackexchange.com/",
  "http://monero.stackexchange.com/",
  "http://civicrm.stackexchange.com/",
  "http://hsm.stackexchange.com/",
  "http://stackapps.com/",
  "http://computergraphics.stackexchange.com/",
  "http://startups.stackexchange.com/",
  "http://tridion.stackexchange.com/",
  "http://mythology.stackexchange.com/",
  "http://matheducators.stackexchange.com/"
];

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function r_in_r(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sends a message to the background script
 * @param  {object} msg_content   data to be sent in the message
 * @param  {function} on_response function to be called when response is recieved.
 */
function send_message(msg_content, on_response) {
  // set default on_response function if none provided.
  if (!on_response) {
    on_response = function (response) {
      console.log(response.toString());
    }
  }
  chrome.runtime.sendMessage(msg_content, on_response);
}

function init_popup() {
  for (var i = 0; i < base_links.length; i++) {
    var option = document.createElement('option');
    option.value = base_links[i];
    option.innerHTML = base_links[i].replace("http://","").split(".")[0];
    document.getElementById('exchanges').appendChild(option);
  }
  document.getElementById('go').addEventListener('click', function () {
    var base = document.getElementById('exchange').value;
    if (base == "random" || base == "") {
      base = base_links[r_in_r(0,base_links.length-1)];
    }
    send_message({action:"new_question",base:base},function () {
      window.close();
    });
  });
}

document.addEventListener('DOMContentLoaded', init_popup);
