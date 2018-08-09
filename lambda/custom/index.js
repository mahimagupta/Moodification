'use strict';

var Alexa = require('alexa-sdk');
var flag=0;
var streamInfo = {
  title: 'Moodify',
  subtitle: 'A starter template for an Alexa audio streaming skill.',
  cardContent: "Get more details at: https://skilltemplates.com",
  //url1: 'https://s3.amazonaws.com/audio-dan/dandavis_A1_1_1+(online-audio-converter.com).mp3',
  //url2: 'https://s3.amazonaws.com/harmeetsingh/clintanderson_A1_1_1+(online-audio-converter.com).mp3',
  //image: {
    //largeImageUrl: 'https://s3.amazonaws.com/cdn.dabblelab.com/img/alexa-card-lg.png',
    //smallImageUrl: 'https://s3.amazonaws.com/cdn.dabblelab.com/img/alexa-card-sm.png'
  //}
};

exports.handler = (event, context, callback) => {
  var alexa = Alexa.handler(event, context, callback);

  alexa.registerHandlers(
    handlers,
    audioEventHandlers
  );

  alexa.execute();
};

var handlers = {

  'LaunchRequest': function() {
  
    this.emit(':ask','How are you feeling?');
  },
  'SadIntent' : function() {
    
         flag=1;
         streamInfo.url1=randomPhrase(Happy);
         this.response.speak('Let me play you a Happy Song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
 
  },
  'LazyIntent' : function() {
         
         flag=2;
         streamInfo.url1=randomPhrase(Energetic);
         this.response.speak('Lets change your mood.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
      
  },
  'RomanticIntent' : function() {
         
         flag=3;
         streamInfo.url1=randomPhrase(Romantic);
         this.response.speak('Let me play a romantic song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
      
  },
  'PartyIntent' : function() {
         
         flag=4;
         streamInfo.url1=randomPhrase(Party);
         this.response.speak('Let me play some party song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
      
  },
  'CalmIntent' : function() {
         
         flag=5;
         streamInfo.url1=randomPhrase(Relax);
         this.response.speak('Let me play some soothing music.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
      
  },
  'Handler' : function() {
    this.emit(':ask','khatam');
  },
  

  'AMAZON.HelpIntent': function() {
    // skill help logic goes here
    this.emit(':responseReady');
  },
  'SessionEndedRequest': function() {
    // no session ended logic needed
  },
  'ExceptionEncountered': function() {
    console.log("\n---------- ERROR ----------");
    console.log("\n" + JSON.stringify(this.event.request, null, 2));
    this.callback(null, null)
  },
  'Unhandled': function() {
    this.response.speak('Sorry. Something went wrong.');
    this.emit(':responseReady');
   },
  'AMAZON.NextIntent': function() {
  
  if(flag==1)
  {  
    streamInfo.url1=randomPhrase(Happy2);
    this.response.speak('Let me play another Happy Song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
    this.emit(':responseReady');
  }
  else if (flag==5)
  {
     streamInfo.url1=randomPhrase(Relax2);
    this.response.speak('Let me play another relaxing Song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
    this.emit(':responseReady');
  }
  else if (flag==2)
  {
    streamInfo.url1=randomPhrase(Energetic2);
    this.response.speak('Let me play another energetic Song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
    this.emit(':responseReady');
  }
    else if (flag==3)
  {
    streamInfo.url1=randomPhrase(Romantic2);
    this.response.speak('Let me play another romantic Song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
    this.emit(':responseReady');
  }
  else
  {
    streamInfo.url1=randomPhrase(Party2);
    this.response.speak('Let me play another party Song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
    this.emit(':responseReady');
  }

  },
  'AMAZON.PreviousIntent': function() {
    this.response.speak('This skill does not support skipping.');
    this.emit(':responseReady');
  },
  'AMAZON.PauseIntent': function() {
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.CancelIntent': function() {
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.StopIntent': function() {
    this.response.speak('Okay. GoodBye! See you later.').audioPlayerStop();
    this.emit(':responseReady');
  },
  'AMAZON.ResumeIntent': function() {
    this.emit('PlayStream');
  },
  
  'AMAZON.StartOverIntent': function() {
    this.response.speak('Sorry. I can\'t do that yet.');
    this.emit(':responseReady');
  },
  'AMAZON.YesIntent': function() {
    this.emit('LaunchRequest');
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', 'By then!');
  },
   'PlayCommandIssued': function() {

     if (this.event.request.type === 'IntentRequest') {
       var cardTitle = streamInfo.subtitle;
       var cardContent = streamInfo.cardContent;
       var cardImage = streamInfo.image;
       this.response.cardRenderer(cardTitle, cardContent, cardImage);
     }

     this.response.speak('Enjoy.').audioPlayerPlay('REPLACE_ALL', streamInfo.url, streamInfo.url, null, 0);
     this.emit(':responseReady');
   },
   'PauseCommandIssued': function() {
     this.emit('AMAZON.StopIntent');
   }
}

const Happy=['https://s3.amazonaws.com/rocksong/happy.mp3','https://s3.amazonaws.com/rocksong/feeling+good.mp3','https://s3.amazonaws.com/rocksong/Oasis+-+Wonderwall.mp3'];

const Energetic=['https://s3.amazonaws.com/rocksong/ACDC+-+You+Shook+Me+All+Night+Long+(Official+Video).mp3','https://s3.amazonaws.com/rocksong/Avicii+-+Addicted+To+You.mp3'];

const Romantic=['https://s3.amazonaws.com/rocksong/Ed+Sheeran+-+Thinking+Out+Loud+%5BOfficial+Video%5D.mp3','https://s3.amazonaws.com/rocksong/Taylor_Swift_-_Love_story_(mp3.pm).mp3'];

const Party=['https://s3.amazonaws.com/rocksong/rockstar.mp3','https://s3.amazonaws.com/rocksong/rockabye.mp3','https://s3.amazonaws.com/rocksong/LMFAO+-+Party+Rock+Anthem+ft.+Lauren+Bennett%2C+GoonRock.mp3'];

const Relax=['https://s3.amazonaws.com/rocksong/Beyonce%CC%81+-+Halo.mp3','https://s3.amazonaws.com/rocksong/Photograph+-+Ed+Sheeran+(Lyrics).mp3','https://s3.amazonaws.com/rocksong/Vance_Joy_-_Riptide_(mp3.pm).mp3'];

const Romantic2=['https://s3.amazonaws.com/rocksong/Niall+Horan+-+This+Town+(Lyric+Video).mp3','https://s3.amazonaws.com/rocksong/The+Chainsmokers+-+Closer+(Lyrics)(ft.+Halsey).mp3','https://s3.amazonaws.com/rocksong/She+Will+Be+Loved-+Maroon+5+%5B%5Bwith+lyrics%5D%5D.mp3'];

const Energetic2=['https://s3.amazonaws.com/rocksong/Beastie+Boys+-+Body+Movin\'.mp3','https://s3.amazonaws.com/rocksong/Salt-N-Pepa+-+Push+It.mp3','https://s3.amazonaws.com/rocksong/Shake+Your+Body+(Down+to+the+Ground).mp3'];

const Happy2=['https://s3.amazonaws.com/rocksong/Maroon+5+-+Girls+Like+You+ft.+Cardi+B.mp3', 'https://s3.amazonaws.com/rocksong/The+Chainsmokers+-+Paris+(Lyric).mp3', 'https://s3.amazonaws.com/rocksong/American+Authors+-+Best+Day+Of+My+Life.mp3'];

const Party2=['https://s3.amazonaws.com/rocksong/Sia+-+Cheap+Thrills+(Lyric+Video)+ft.+Sean+Paul.mp3','https://s3.amazonaws.com/rocksong/Paramore+Ain\'t+It+Fun+%5BOFFICIAL+VIDEO%5D.mp3', 'https://s3.amazonaws.com/rocksong/Walk+The+Moon+Shut+Up+and+Dance+With+Me+Lyrics.mp3'];

const Relax2=['https://s3.amazonaws.com/rocksong/All+Saints+-+Pure+Shores+(Official+Music+Video).mp3','https://s3.amazonaws.com/rocksong/Coldplay+-+The+Scientist.mp3','https://s3.amazonaws.com/rocksong/Coldplay+-+Paradise+(Official+Video).mp3',];



function randomPhrase(myData) {

    var i = 0;

    i = Math.floor(Math.random() * myData.length);

    return(myData[i]);
}


var audioEventHandlers = {
  'PlaybackStarted': function() {
    this.emit(':responseReady');
  },
  'PlaybackFinished': function() {
    this.emit(':responseReady');
  },
  'PlaybackStopped': function() {
    this.emit(':responseReady');
  },
  'PlaybackNearlyFinished': function() {
    this.emit(':ask', 'Do you have any other questions for me?');
  },
  'PlaybackFailed': function() {
    this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
    this.emit(':responseReady');
  }
}
