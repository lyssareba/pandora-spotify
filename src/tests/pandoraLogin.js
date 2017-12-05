var config = require('../../nightwatch.conf.js');
var user = {
  sessionID: '',
  username: '',
  password: '',
  thumbsup: {},
}
var endOfPage = false;
var y;
var mediaListId=[];
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
    .waitForElementVisible("(//*/div[@class='MediaListItem'])[1]")
    .element('xpath', "(//*/div[@class='MediaListItem'])[1]", function(songs) {
      var regex = new RegExp(/(\.)\d+/, 'g');
      var regex2 = new RegExp(/(\-)\d+/, 'g');
      user.sessionID = songs.value.ELEMENT.match(regex);
      var temp = songs.value.ELEMENT.match(regex2);
      elementNum = temp[0].slice(1);
      mediaListId=getSongId();
      browser.pause(5000);
      user.thumbsup=getSongData();
    })

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
      var inView;
      var songData= [];
      console.log(mediaListId[0]);
      browser.elementIdValue(mediaListId[0], function(res){
        console.log(res);
      })
      
      //  for(var i = 0; i <mediaListId.length-1; i++){
      //    if(browser.elementIdLocationInView(mediaListId[i])){
      //      inView=true;
      //    } else {
      //      inView=false;
      //    }

      //    if(inView){
      //      browser.elementIdValue(mediaListId[i], function(res){
      //        console.log(res);
      //      })
      //     //  songData.push()
      //    } else {
      //      browser.execute('scrollBy(200, 0)');
      //      i--;
      //    }
      //   }
       

      return;
    }

    //         browser.getLocationInView("(//*/div[@class='MediaListItem'])["+i+"]", function(res){
    //           y = res.value.y
    //           browser.pause(2000)
    //           if(y>600){
    //             browser.execute('scrollTo(0,600)')
    //           };
    //         })
    //       };

    //       if(songs.value[i].ELEMENT != undefined){
    //         mediaListId.push(songs.value[i].ELEMENT);
    //         browser.getLocationInView("(//*/div[@class='MediaListItem'])["+i+"]", function(res){
    //           y = res.value.y
    //           browser.pause(2000)
    //           if(y>600){
    //             browser.execute('scrollTo(0,600)')
    //           };
    //         })
    //       };
    //     };
    //   }
    // })
    browser.pause(2000)
  }
};