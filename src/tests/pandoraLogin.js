var config = require('../../nightwatch.conf.js');
var user = {
  sessionID: '',
  username: '',
  password: '',
  thumbsup: [],
}
var endOfPage = false;
var y;
var mediaListId=[];
var thumbsUp;

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
    .getText("//*/span[@data-qa='thumbs_up_link']/span[2]")
    .pause(1000)
    .waitForElementVisible("//*/div[@class='MediaListItem'][1]")

    .elements('xpath', "//*/div[@class='MediaListItem']", function(songs) {
      console.log(songs.value);
      mediaListId.push(songs.value[i].ELEMENT);
      console.log(mediaListId);

      if(mediaListId.length<thumbsUp-1) {
        for(var i in songs){
          if(songs.value[i].ELEMENT === undefined){
            endOfPage=true;
            return false;
          };
          if(songs.value[i].ELEMENT != undefined){
            mediaListId.push(songs.value[i].ELEMENT);
            browser.getLocationInView("(//*/div[@class='MediaListItem'])["+i+"]", function(res){
              y = res.value.y
              browser.pause(2000)
              if(y>600){
                browser.execute('scrollTo(0,600)')
              };
            })
          };
        };
      }
    })
    .pause(2000)
  }
};