var game;
var menuGroup;
var score = 0 ;

window.onload = function() {	      
	game = new Phaser.Game(540, 600, "gameDiv");
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
		game.scale.setScreenSize = true;
          game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
          game.stage.backgroundColor = "#020028";
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
		 
		  this.loser = game.add.text(game.width / 2 - 160, 60, "0", { font: "60px Arial", fill: "#ffffff" });  
		  this.loser.text = "YOU LOSE!";  
		 
		  this.labelScore = game.add.text(game.width / 2 - 130, 120, "0", { font: "40px Arial", fill: "#ffffff" });  
		  this.labelScore.text = "Your score is :"; 
		  
		  this.labelScore = game.add.text(game.width / 2 - 10, 180, "0", { font: "40px Arial", fill: "#ffffff" });  
		  if(score == "undefined") score = 0;
		  this.labelScore.text = ""+score; 
		  
		  
		  
          /*var title = game.add.sprite(game.width / 2, 60, "gametitle");
          title.anchor.set(0.5);
          var grid = game.add.sprite(game.width / 2, 130, "gridedition");
          grid.anchor.set(0.5); */
          var playButton = game.add.button(game.width / 2, game.height / 2 + 10, "playbutton", function()
		  {game.state.start('main');});
          playButton.anchor.set(0.5);
          menuGroup = game.add.group();
          var menuButton = game.add.button(game.width / 2, game.height - 30, "menubutton", toggleMenu);
          menuButton.anchor.set(0.5);
          menuGroup.add(menuButton);
          var resetGame = game.add.button(game.width / 2, game.height + 50, "resetgame", function(){game.state.start('Boot');});
          resetGame.anchor.set(0.5);
          menuGroup.add(resetGame);
          var thankYou = game.add.button(game.width / 2, game.height + 130, "thankyou", function(){});
          thankYou.anchor.set(0.5);
          menuGroup.add(thankYou);          
     }
}

////////////////////////////////////////////////////////////////////////////////

var preload = function(game){};

preload.prototype = {
	preload: function(){
          game.load.image("gametitle", "assets/sprites/gametitle.png");
          game.load.image("gridedition", "assets/sprites/gridedition.png");
          game.load.image("playbutton", "assets/sprites/playbutton.png");
          game.load.image("menubutton", "assets/sprites/menubutton.png");
          game.load.image("resetgame", "assets/sprites/resetgame.png");
          game.load.image("thankyou", "assets/sprites/thankyou.png");
	},
  	create: function(){
		game.state.start("GameTitle");
	}
}

////////////////////////////////////////////////////////////////////////////////

var gameTitle = function(game){}

gameTitle.prototype = {
     create: function(){
          var title = game.add.sprite(game.width / 2, 60, "gametitle");
          title.anchor.set(0.5); 
          var grid = game.add.sprite(game.width / 2, 130, "gridedition");
          grid.anchor.set(0.5);
          var playButton = game.add.button(game.width / 2, game.height / 2 + 10, "playbutton", function(){game.state.start('main');});
          playButton.anchor.set(0.5);
          menuGroup = game.add.group();
          var menuButton = game.add.button(game.width / 2, game.height - 30, "menubutton", toggleMenu);
          menuButton.anchor.set(0.5);
          menuGroup.add(menuButton);
          var resetGame = game.add.button(game.width / 2, game.height + 50, "resetgame", function(){});
          resetGame.anchor.set(0.5);
          menuGroup.add(resetGame);
          var thankYou = game.add.button(game.width / 2, game.height + 130, "thankyou", function(){});
          thankYou.anchor.set(0.5);
          menuGroup.add(thankYou);          
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
		game.load.image('road', 'assets/sprites/road.png');
        game.load.image('bird', 'assets/sprites/zuma.png');
		game.load.image('hands', 'assets/sprites/hands.png');  
        game.load.image('pipe', 'assets/sprites/van.png'); 

        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav'); 
    },

    create: function() { 
	
			// If this is not a desktop (so it's a mobile device) 
		/*if (game.device.desktop == false) 
		{
			// Set the scaling mode to SHOW_ALL to show all the game
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
			// Set a minimum and maximum size for the game
			// Here the minimum is half the game size
			// And the maximum is the original game size
			game.scale.setMinMax(game.width/2, game.height/2, 
				game.width, game.height);
		
			// Center the game horizontally and vertically
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
		}*/
        game.physics.startSystem(Phaser.Physics.ARCADE);
		this.road = game.add.sprite(0, 0, 'road'); 
		this.road.height = game.height;
    	this.road.width = game.width;
        this.pipes = game.add.group();
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);           
 		this.hands = game.add.sprite(0, 40, 'hands');
        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000; 

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5); 
 
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
        game.input.onDown.add(this.jump, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  

        // Add the jump sound
        this.jumpSound = game.add.audio('jump');
        this.jumpSound.volume = 0.2;
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

        this.bird.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.bird).to({angle: -20}, 100).start();

        // Play sound
        this.jumpSound.play();
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;
            
        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        game.time.events.remove(this.timer);
    
        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function() {
        game.state.start('lose');
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
            if (i != hole && i != hole +1) this.addOnePipe(400, i*60+10);  
			 
    
        this.score += 1;
        this.labelScore.text = this.score;  
		score = this.score;
    },
};
