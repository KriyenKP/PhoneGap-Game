var game;
var menuGroup;
var score = 0 ;
var reg = {};
window.onload = function() {	
    
	var gameWidth = 320;var gameHeight = 480;
	game = new Phaser.Game(580, 940, Phaser.AUTO, 'gameDiv');
	  
	//game = new Phaser.Game(650, 1024, "gameDiv");
    game.state.add("Boot", boot);
    game.state.add("Preload", preload);
    game.state.add("GameTitle", gameTitle);
	game.state.add('main', mainState);
	game.state.add('lose', loseState);  
	game.state.start("Boot");
	
}



////////////////////////////////////////////////////////////////////////////////

var boot = function(game){};

boot.prototype = {
     preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //game.scale.setMaximum();
		//game.scale.setScreenSize = true;
        game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#FFF";
     },
  	create: function(){
		game.state.start("Preload");
	}
}

////////////////////////////////////////////////////////////////////////////////
var loseState = function(game){};

loseState.prototype = 
{
     create: function(){

	game.load.audio('count', 'assets/sounds/zumaCount.ogg'); 		
	this.loseSound = game.add.audio('count');
		//this.loseSound.play();
		//this.loseSound.volume = 10; 
	
	//var style = { font: 'bold 60pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 };

   // var text = game.add.text(game.world.centerX, game.world.centerY, "phaser with a sprinkle of pixi dust", style);


		 this.road = game.add.sprite(0, 0, 'road'); 
		 this.road.scale.setTo(1, 0.87);

		  
	
		  this.loser = game.add.text(game.world.centerX, 120, "0", { font: "60px Arial", align:'center', fill: "#ffffff",wordWrap: true, wordWrapWidth: 500  });  
		  this.loser.text = "You'll never outrun the public!";  
		  this.loser.anchor.set(0.5);
		 
		  this.labelScore = game.add.text(game.world.centerX, 240, "0", { font: "40px Arial", align:'center', fill: "#ffffff",wordWrap: true, wordWrapWidth: 500   });  
		  this.labelScore.text = "Your score is :";
		  this.labelScore.anchor.set(0.5);
		  
		  this.labelScore = game.add.text(game.world.centerX, 320, "0", { font: "60px Arial", align:'center', fill: "#ffffff",wordWrap: true, wordWrapWidth: 500   });  
		  if(score == "undefined") score = 0;
		  this.labelScore.text = ""+score; 
		  this.labelScore.anchor.set(0.5);
		  
          var playButton = game.add.button(game.world.centerX, game.height / 2 + 30, "playbutton", function()
		  {game.state.start('main');});
          playButton.anchor.set(0.5);
          menuGroup = game.add.group();
          
		  var menuButton = game.add.button(game.width / 2, game.height - 30, "menubutton", toggleMenu);
          menuButton.anchor.set(0.5);
          menuGroup.add(menuButton);
          
		  
		  var resetGame = game.add.button(game.width / 2, game.height + 130, "resetgame", function(){game.state.start('Boot'); this.loseSound.pause();});
          resetGame.anchor.set(0.5);
          menuGroup.add(resetGame);
		  
		  
          var share = game.add.button(game.width / 2, game.height + 50, "share", showModal1);
          share.anchor.set(0.5);
          menuGroup.add(share);
     }
}

////////////////////////////////////////////////////////////////////////////////

var preload = function(game){};

preload.prototype = {
	preload: function(){
          game.load.image("gametitle", "assets/sprites/gametitle.png");
          game.load.image("gridedition", "assets/sprites/gridedition.png");
          game.load.image("playbutton1", "assets/sprites/playbutton.png");
          game.load.image("menubutton", "assets/sprites/menubutton.png");
          game.load.image("resetgame", "assets/sprites/resetgame.png");
          game.load.image("thankyou", "assets/sprites/thankyou.png");
		  game.load.image("share", "assets/sprites/share.png");
		  game.load.audio('hehe', 'assets/sounds/hehe.ogg'); 
		  game.load.audio('ow', 'assets/sounds/ow.ogg'); 
		  game.load.audio('count', 'assets/sounds/zumaCount.ogg'); 
		  game.load.audio('POO', 'assets/sounds/pointOfOrder.ogg'); 
		  game.load.image('road', 'assets/sprites/road.png');
          game.load.image('bird', 'assets/sprites/zuma.png');
          game.load.image('playbutton', 'assets/sprites/zumabig.png');	      
		  game.load.image('hands', 'assets/sprites/hands.png');  
          game.load.image('pipe', 'assets/sprites/van.png');
		  game.load.image("twitter","assets/sprites/twit.png");
          game.load.image("facebook","assets/sprites/FB.png");
		  game.load.image("inhub","assets/sprites/inhub.png");

	},
  	create: function(){
		game.state.start("GameTitle");
	}
}

////////////////////////////////////////////////////////////////////////////////

var gameTitle = function(game){}



gameTitle.prototype = {

     create: function(){
		 
	reg.modal = new gameModal(game);
    createModals();
  	var m1 = this.game.add.button(100, 80, "m1", showModal1);

		 
		 this.road = game.add.sprite(0, 0, 'road'); 
		 this.road.scale.setTo(1, 0.87);

          var title = game.add.sprite(game.width / 2, 100, "gametitle");
          title.anchor.set(0.5); 
		  
		  var caption = game.add.text(game.width/2-180, 150, "0", { font: "30px Arial", fill: "#ffffff" });  
		  caption.text = "Will Zupta outrun the public?";  

          var playButton = game.add.button(game.width / 2, game.height / 2 + 10, "playbutton", function(){game.state.start('main');});
          playButton.anchor.set(0.5);
		  
		 var caption2 = game.add.text(game.width/2 - 90, game.height / 2 +150, "0", { font: "30px Arial", fill: "#ffffff" });  
		  caption2.text = "Keep tapping!";  
		  
          menuGroup = game.add.group();
          
		  
		  var menuButton = game.add.button(game.width / 2, game.height - 30, "menubutton", toggleMenu);
          menuButton.anchor.set(0.5);
          menuGroup.add(menuButton);
		  
		  var share = game.add.button(game.width / 2, game.height + 50, "share", showModal1);
          share.anchor.set(0.5);
          menuGroup.add(share);
		  
		  var resetGame = game.add.button(game.width / 2, game.height + 130, "resetgame", function(){});
          resetGame.anchor.set(0.5);
          menuGroup.add(resetGame);
          
		  
		  this.POO = game.add.audio('POO');
		  this.POO.play();
		  this.POO.volume = 10;
     }
}

function toggleMenu(){
     if(menuGroup.y == 0){
          var menuTween = game.add.tween(menuGroup).to({
               y: -160     
          }, 500, Phaser.Easing.Bounce.Out, true);
     }
     if(menuGroup.y == -160){
          var menuTween = game.add.tween(menuGroup).to({
               y: 0    
          }, 500, Phaser.Easing.Bounce.Out, true);     
     }
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////Create modals//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function createModals() {
  // reg.modal.createModal({
  //           type:"modal1",
  //           includeBackground: true,
  //           modalCloseOnInput: true,
  //           itemsArr: [
  //               {
  //                   type: "text",
  //                   content: "Simple Text with Modal background, \n nothing fancy here...",
  //                   fontFamily: "Luckiest Guy",
  //                   fontSize: 42,
  //                   color: "0xFEFF49",
  //                   offsetY: -50
  //               }
  //           ]
  //       });
  reg.modal.createModal({
            type:"modal1",
            includeBackground: true,
            modalCloseOnInput: true,
            itemsArr: [
                {
                    type: "graphics",
                    graphicColor: "0xffffff",
                    graphicWidth: 600,
                    graphicHeight: 1000
                },
				{
                    type: "image",
                    content: "inhub",
                    offsetY: -300,
                    contentScale: 0.8,
                    callback: function(){
                       window.open("http://inhub.co.za", 'inhub');
                    }
            },
                {
                    type: "text",
                    content: "Hey there! \n This game was something I made in my spare\ntime to learn how this system works. I realise there \n are features missing and stuff but I'll be getting to them \nsoon! So for now this game should be considered a \nbeta version and incomplete.\n\n Regards, Kri",
                    fontSize: 22,
                    color: "0x1e1e1e",
                    offsetY: -50
                },
				              {
                    type: "image",
                    content: "twitter",
                    offsetY: 150,
                    offsetX: 80,
                    contentScale: 0.8,
                    callback: function(){
                       window.open("https://twitter.com/intent/tweet?text=X", 'twitter');
                    }
            },
                {
                    type: "image",
                    content: "facebook",
                    offsetY: 150,
                    offsetX: -80,
                    contentScale: 0.8,
                    callback: function () {
                        window.open("https://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2FIndeterminateDesigns")
                    }
            }
            ]
        });

  //////// modal 2 ////////////
  reg.modal.createModal({
            type:"modal2",
            includeBackground: true,
            modalCloseOnInput: true,
            itemsArr: [
                {
                    type: "text",
                    content: "Seriously???",
                    fontFamily: "Luckiest Guy",
                    fontSize: 42,
                    color: "0xFEFF49",
                    offsetY: 50
                },
              {
                    type: "image",
                    content: "gameover",
                    offsetY: -50,
                    contentScale: 0.6
                }
            ]
        });
  ///////// modal 3 //////////
   reg.modal.createModal({
            type:"modal3",
            includeBackground: true,
            modalCloseOnInput: true,
  itemsArr: [
                {
                    type: "image",
                    content: "gameover",
                    offsetY: -110,
                    contentScale: 0.6
            },
                {
                    type: "image",
                    content: "tryagain",
                    contentScale: 0.6
            },
                {
                    type: "image",
                    content: "yes",
                    offsetY: 100,
                    offsetX: -80,
                    contentScale: 0.6,
                    callback: function () {
                        alert("YES!");
                    }
            },
                {
                    type: "image",
                    content: "no",
                    offsetY: 100,
                    offsetX: 80,
                    contentScale: 0.6,
                    callback: function () {
                        alert("NO!");
                    }
            }
            ]
   });
  //////// modal 4 //////////
  reg.modal.createModal({
            type:"modal4",
            includeBackground: true,
            modalCloseOnInput: true,
  itemsArr: [
    					{
                type: "text",
                    content: "Share the awesomeness!",
                    fontFamily: "Luckiest Guy",
                    fontSize: 42,
                    color: "0xfb387c",
                    offsetY: -80
              },
              {
                    type: "image",
                    content: "twitter",
                    offsetY: 20,
                    offsetX: 80,
                    contentScale: 0.8,
                    callback: function(){
                       window.open("https://twitter.com/intent/tweet?text=Cool%20modals%20%40%20http%3A%2F%2Fcodepen.io%2Fnetgfx%2Fpen%2FbNLgaX", 'twitter');
                    }
            },
                {
                    type: "image",
                    content: "facebook",
                    offsetY: 20,
                    offsetX: -80,
                    contentScale: 0.8,
                    callback: function () {
                        window.open("http://www.facebook.com/sharer.php?u=Cool%20modals%20%40%20http%3A%2F%2Fcodepen.io%2Fnetgfx%2Fpen%2FbNLgaX")
                    }
            }
            ]
   });
  /////// modal 5 //////////
  reg.modal.createModal({
            type:"modal5",
            includeBackground: false,
            modalCloseOnInput: true,
  itemsArr: [
                {
                    type: "image",
                    content: "modalBG",
                    offsetY: -20,
                    contentScale: 1
            },
                {
                    type: "image",
                    content: "clear",
                    contentScale: 0.5,
                    offsetY: -80
            },
                {
                    type: "image",
                    content: "star",
                    offsetY: 80,
                    offsetX: -100,
                    contentScale: 0.6
            },
    					{
                    type: "image",
                    content: "star",
                    offsetY: 50,
                    offsetX: 0,
                		contentScale: 0.6
            },
    					{
                    type: "image",
                    content: "star",
                    offsetY: 80,
                    offsetX: 100,
                		contentScale: 0.6
            },
            {
              			type : "text",
              			content: "X",
                    fontSize: 52,
              			color: "0x000000",
              			offsetY: -130,
                    offsetX: 240,
              			callback: function(){
                      reg.modal.hideModal("modal5");
                    }
            }

            ]
   });
  ////// modal 6 //////////

  reg.modal.createModal({
            type: "modal6",
            includeBackground: true,
            backgroundColor: "0xffffff",
    				backgroundOpacity: 0.8,
            itemsArr: [
                {
                    type: "text",
                    content: "Starting \nNext Level",
                    fontFamily: "Luckiest Guy",
                    fontSize: 52,
                    offsetY: -100
                },
                {
                    type: "text",
                    content: "5",
                    fontFamily: "Luckiest Guy",
                    fontSize: 42,
                    offsetY: 0
                }
            ]
        });
}

function showModal1(){
  reg.modal.showModal("modal1");
}
function showModal2(){
 reg.modal.showModal("modal2");
}
function showModal3() {
  reg.modal.showModal("modal3");
}
function showModal4() {
  reg.modal.showModal("modal4");
}
function showModal5() {
  reg.modal.showModal("modal5");
}
function showModal6() {
  reg.modal.showModal("modal6");
  countDown(updateCountdown, function () {
       reg.modal.hideModal("modal6");

  });
}

function countDown(fn, endFn) {
    var endFn = endFn || function(){};

    var _timer = game.time.create(false);
    _timer.start();
    _timer.onComplete.add(endFn);
    _timer.repeat(Phaser.Timer.SECOND, 5, fn, this);
    window.console.log("adding timer", game);
}

function updateCountdown() {
    var item = reg.modal.getModalItem("modal6", 2);
    var index = Number(item.text);

    window.console.log("index: ", index, item);

    item.setText(String(index - 1));
    item.update();
    item.x = game.width / 2 - (item.width / 2);
    item.y = game.height / 2 - (item.height / 2);
}



////////////////////////////////////////////////////////////////////////////////////////////////

var mainState = {

    preload: function() { 
        if(!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.setMinMax(game.width, game.height, game.width, game.height);
        }
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#71c5cf';



        // Load the jump sound
       // game.load.audio('jump', 'assets/jump.wav'); 
    },

    create: function() { 

        game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.road = game.add.sprite(0, 20, 'road'); 
		
		this.road = this.game.add.tileSprite(0, 0, 600, 1024, 'road');
        //this.road.autoScroll(-200, 0);
		this.road.autoScroll(-100,0);
	    this.road.scale.setTo(1, 0.87);

    	//this.road.width = game.width;
        this.pipes = game.add.group();
        this.timer = game.time.events.loop(2300, this.addRowOfPipes, this);           
 		this.hands = game.add.sprite(0, game.height / 2 - 250, 'hands');
        this.bird = game.add.sprite(90, 66, 'bird');


        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000; 

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5); 
 
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
        game.input.onDown.add(this.jump, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  

		this.ow = game.add.audio('ow');
	    this.lose = game.add.audio("count");
        this.hehe = game.add.audio('hehe');
        this.hehe.volume = 10;
    },

    update: function() {
        if (this.bird.y < 0 || this.bird.y > game.world.height)
            this.restartGame(); 

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this); 
            
        // Slowly rotate the bird downward, up to a certain point.
        if (this.bird.angle < 20)
            this.bird.angle += 1;  
    },

    jump: function() {
        // If the bird is dead, he can't jump
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -400;

        // Jump animation
        game.add.tween(this.bird).to({angle: -20}, 100).start();

        // Play sound
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;
            
        // Set the alive property of the bird to false
        this.bird.alive = false;
		this.ow.play();
		this.ow.volume = 10;
		
		if("vibrate" in window.navigator) 
		{
    		window.navigator.vibrate(100);
		}
        // Prevent new pipes from appearing
        game.time.events.remove(this.timer);
    
        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
 
    },

    restartGame: function() {
        game.state.start('lose');
		//this.loseSound.pause();
    },

    addOnePipe: function(x, y) {
        var pipe = game.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);

        pipe.body.velocity.x = -200;  
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        var hole = Math.floor(Math.random()*5)+1;
        
        for (var i = 0; i < 10; i++)
            if (i != hole && i != hole +1) this.addOnePipe(500, i*100+20);  
			 
    
        this.score += 1;
		this.hehe.play();
		this.hehe.volume = 10;
        this.labelScore.text = this.score;  
		score = this.score;
    },
};
