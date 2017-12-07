var config = require('../../nightwatch.conf.js');
const writeJsonFile = require('write-json-file');
var fs = require('fs');

var user = {
  sessionID: '',
  username: '',
  password: '',
  thumbsup: [],
}
var songData = {
  song: '',
  artist: '',
  radio: '',
};
var endOfPage = false;
var y;
var mediaList=[];
var thumbsUp;
var elementNum;

module.exports = {

  'Step 1 - Login to Pandora' : function(browser) {
    browser
    .url('http://www.pandora.com/account/sign-in')
    .useXpath()
    .waitForElementVisible("//input[@title='Email']")
    .setValue("//input[@title='Email']", 'lyssareba@gmail.com')
    .setValue("//input[@title='Password']", 'asdfhole34')
    .waitForElementVisible("//button[@class='Login__form__row__button']", 1000)
    .click("//button[@class='Login__form__row__button']")
    .pause(1000)
    .session('get',function(res) {
      user.sessionID = res.sessionId;
    });
    //.pause(10000)      
    //.end();
  },
  'Step 2 - Access Profile Page' : function(browser) {
    browser
    .useXpath()
    .waitForElementVisible("//*/button[@class='Avatar Avatar--clickable']", 2000)
    .click("//*/button[@class='Avatar Avatar--clickable']")
    .waitForElementVisible("//*/a[@href='/profile']", 5000)
    .click("//*/a[@href='/profile']")
    .pause(1000)
    .waitForElementVisible("//*[@class='UserProfile__Profile']",5000)
  },
  'Step 3 - Access Thumbs Up Page' : function(browser) {
    browser
    .useXpath()
    .waitForElementVisible("//*/span[@data-qa='thumbs_up_link']")
    .click("//*/span[@data-qa='thumbs_up_link']")
    .pause(2000)
    .getText("//*/span[@class='ProfileNav__count']", function(res){
      thumbsUp=res.value;
    })
    .pause(1000)
    .waitForElementVisible("(//*/a[@class='MediaListItem__primaryText'])[1]")
    .getText('xpath', "(//*/a[@class='MediaListItem__primaryText'])", function(songs) {
      getSongData();
      browser.pause(2000);
    // var regex = new RegExp(/(\.)\d+/, 'g');
    // var regex2 = new RegExp(/(\-)\d+/, 'g');
    // user.sessionID = songs.value.ELEMENT.match(regex);
    // var temp = songs.value.ELEMENT.match(regex2);
    // elementNum = temp[0].slice(1);
    // mediaListId=getSongId();
    // browser.pause(5000);
    // user.thumbsup=getSongData();
    })
    .pause(1500)
    .end();
  
    function getSongId() {
      var id = [];
      var end = parseInt(thumbsUp) + parseInt(elementNum) - 1;
      var start = elementNum;
      for(var i = start; i < end; i++){
        id.push('0'+ user.sessionID + '-' + i);
      }
      console.log(id);
      return id;
    }
    function getSongData(){
      var end = parseInt(thumbsUp) - 1;
      var start = 1;
      for(var i = start; i < 10; i++){
        browser
        .getText('xpath', "(//*[@class='MediaListItem__primaryText'])[" + i + "]", function(song) {
          songData.song = song.value;
        })
        .getText('xpath', "(//*[@class='MediaListItem__secondaryText'])[" + i + "]", function(artist) {
          songData.artist = artist.value;
        })
        .getText('xpath', "(//*[@class='MediaListItem__tertiaryText'])[" + i + "]", function(radio) {
          songData.radio = radio.value;
          console.log(songData);
          mediaList.push(songData); 
          writeToFile(songData);
        }) 
        .execute('scrollBy(0, 200)')
        // JSON.stringify(mediaList);
        // writeJsonFile('songs2.json', songData);
      }
      return;
    }
    function writeToFile(data){
      fs.readFile('songs.json', function (err, res) {
        console.log(res);
        if(Object.keys(res).length === 0 && res.constructor === Object){
          console.log (err);
          var json = (data instanceof Object) ? JSON.stringify(data,null,4): data ;
          fs.writeFile('songs.json', json, 'utf-8');
        } else {
          var obj = [];
          obj = JSON.parse(res);
          obj.push(data);
          var json = (data instanceof Object) ? JSON.stringify(obj,null,4): data ;
          fs.writeFile('songs.json', json, 'utf-8');
          console.log("written");
        }
      })
      return;
    }
  }
};
