'use strict';

var Alexa = require('alexa-sdk');
var flag=0;
var streamInfo = {
  title: 'Moodify',
  subtitle: 'A starter template for an Alexa audio streaming skill.',
  cardContent: "Get more details at: https://skilltemplates.com",
  url1: 'https://s3.amazonaws.com/audio-dan/dandavis_A1_1_1+(online-audio-converter.com).mp3',
  url2: 'https://s3.amazonaws.com/harmeetsingh/clintanderson_A1_1_1+(online-audio-converter.com).mp3',
  image: {
    largeImageUrl: 'https://s3.amazonaws.com/cdn.dabblelab.com/img/alexa-card-lg.png',
    smallImageUrl: 'https://s3.amazonaws.com/cdn.dabblelab.com/img/alexa-card-sm.png'
  }
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
    
         //flag=1;
         //this.emit('PlayStream');
         streamInfo.url1=randomPhrase(Happy);
         this.response.speak('Let me play you a Happy Song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
 
  },
  'LazyIntent' : function() {
         
         streamInfo.url1=randomPhrase(Energetic);
         this.response.speak('Lets change your mood.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
      
  },
  'RomanticIntent' : function() {
    
         streamInfo.url1=randomPhrase(Romantic);
         this.response.speak('Let me play a romantic song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
      
  },
  'PartyIntent' : function() {
    
         streamInfo.url1=randomPhrase(Party);
         this.response.speak('Let me play some party song.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
      
  },
  'CalmIntent' : function() {
    
         streamInfo.url1=randomPhrase(Relax);
         this.response.speak('Let me play some soothing music.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
         this.emit(':responseReady');
      
  },
  'Handler' : function() {
    this.emit(':ask','khatam');
  },
  
  // 'PlayStream': function() {
  //   if(flag==1)
  //     {
  //        streamInfo.url1=randomPhrase(Sad);
  //        this.response.speak('Lets change your mood.').audioPlayerPlay('REPLACE_ALL', streamInfo.url1, streamInfo.url1, null, 0);
  //        this.emit(':responseReady');

  //     }
  //   else
  //     {
  //       streamInfo.url2=randomPhrase(Happy);
  //       this.response.speak('Let me play some music.').audioPlayerPlay('REPLACE_ALL', streamInfo.url2, streamInfo.url2, null, 0);
  //       this.emit(':responseReady');
  //     }
    
  // },
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
    this.emit(':tell', 'aa gya unhndled me');
    this.emit(':tell', 'hahaha');
    this.response.speak('Sorry. Something went wrong.');
    this.emit(':responseReady');
   },
  'AMAZON.NextIntent': function() {
    this.response.speak('This skill does not support skipping.');
    this.emit(':responseReady');
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
    this.response.speak('Okay. I\'ve stopped the stream.').audioPlayerStop();
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



function randomPhrase(myData) {
    // the argument is an array [] of words or phrases

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
    //this.response.audioPlayerPlay('REPLACE_ALL', streamInfo.url, streamInfo.url, null, 0);
    //this.emit(':responseReady');
    this.emit(':ask', 'Do you have any other questions for me?');
  },
  'PlaybackFailed': function() {
    this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
    this.emit(':responseReady');
  }
}
