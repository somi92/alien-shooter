/*
 * This is the implementation of a small game called 'Alien Shooter'.
 * 
 * The story:
 * The earth is being invaded by aliens and player's task is to destroy
 * them and save the humanity. :)
 * The player needs to destroy 500 alines in order to succeed and he has
 * 10 units of health. A health unit is lost when an alien falls to the
 * ground. Aliens arrive in seven waves (levels), each faster than the
 * previous one.
 * 
 * Development stage:
 * v1.0.0-beta
 * 
 * Source code is under GNU GENERAL PUBLIC LICENSE, Version 2, June 1991.
 * For license details visit http://choosealicense.com/licenses/gpl-v2/.
 * 
 * Programmed by:
 * Milos Stojanovic
 * email: milos92s@yahoo.com
 * git-hub: https://github.com/somi92/alien-shooter
 * 
 */

// instance of GamePlay, see GamePlay class
var game = new GamePlay();

// class to hold and manage game elements and flow
function GamePlay() {
	
	// variable to hold game timer which loops the animation
	var gameLoop;
	var shooter;
	
	// variables to hold canvas on which aliens are drawn
	this.canvasAlien;
	this.contextAlien;
	
	// variables for holding shooter canvas
	this.canvasShooter;
	this.contextShooter;
	
	// variables for holding bonus canvas
	this.canvasBonus;
	this.contextBonus;
	
	// background canvas
	var canvasBg;
	var contextBg;
	
	// screen displayed when the game is over
	var finishScreen;
	// message shown in the end
	var message;
	// image shown in the end
	var finishImage;
	// variables that hold current alien image
	var alienImage;
	
	// keeping track of aliens killed
	var aliensKilled;
	// keeping track of players health
	var health;
	// keeping track of game level
	var level;
	
	// determine if the mouse click is up or down, 0=up, 1=down
	this.mouseIsDown;
	// array that holds aliens vertical position on the screen
	var alien = [];
	
	var boxX;
	var boxY;
	
	// this variable is used to hold the length of touches when using
	// touchscreen devices (multiple touches at the same time), however, 
	// this version of the game wont support touch screen devices so this
	// variable will always be =1 because it is only possible to have one
	// click at the same time, support for touchscreen devices will be
	// implemented in next version
	this.len;
	
	// variables to hold horizontal and vertical position of shooter on canvas
	this.cX;
	this.cY;
	
	this.slots = [];
	var missiles;
	
	this.bonusEnabled;
	this.bonusFalling;
	this.bonusInLevel;
	
	this.timeMachineSwitch;
	var timeMachineCounter;
	
	// this function sets up the game environment
	this.setUpGame = function() {
		
		this.canvasAlien = document.getElementById('alien');
		this.contextAlien = this.canvasAlien.getContext('2d');
		
		this.canvasShooter = document.getElementById('shooter');
		this.contextShooter = this.canvasShooter.getContext('2d');
		
		this.canvasBonus = document.getElementById('bonus');
		this.contextBonus = this.canvasBonus.getContext('2d');
		
		canvasBg = document.getElementById('background');
		contextBg = canvasBg.getContext('2d');
		
		startScreen = document.getElementById('start');
		finishScreen = document.getElementById('screen');
		message = document.getElementById('message');
		finishImage = document.getElementById('image');
		
		// this.slot1 = document.getElementById('slot1');
		// this.slot2 = document.getElementById('slot2');
		// this.slot3 = document.getElementById('slot3');
		
		this.slots[0] = document.getElementById('slot1');
		this.slots[1] = document.getElementById('slot2');
		this.slots[2] = document.getElementById('slot3');
		missiles = 0;
		
		this.bonusEnabled = true;
		this.timeMachineSwitch = false;
		timeMachineCounter = 0;
		this.bonusInLevel = 0;
		
		alienImage = new Image();
		alienImage = imageStorage.alien1;
		
		aliensKilled = 0;
		health = 10;
		level = 2;
		
		boxX = -20;
		boxY = -20;
		this.bonusFalling = false;
		
		this.mouseIsDown = 0;
		alien = [];
		this.len = 0;

		finishScreen.style.visibility="hidden";
		
		this.updateGame();
		
		contextBg.drawImage(imageStorage.bg,0,0,canvasBg.width,canvasBg.height);
		
		shooter = new Shooter();
		shooter.setCoordinates(10,10);
		
		// listeners to track the position of mouse nad its keys
		this.canvasShooter.addEventListener("mousemove", shooter.move, false);
		this.canvasShooter.addEventListener("mousedown",shooter.mouseDown, false);
		this.canvasShooter.addEventListener("mouseup",shooter.mouseUp, false);
		
		// initialize the aliens vertical position to 0
		for (i = 0; i < 7; i++) {
                alien[i] = 0;
            }
	};
	
	// this function is repeatedly executed and it draws all dynamic elements in game
	this.animate = function() {
		
		var timeReverse;
		
        this.contextAlien.strokeStyle = "transparent";
        this.contextAlien.clearRect(0,0, this.canvasAlien.width, this.canvasAlien.height);
        
        this.contextBonus.strokeStyle = "transparent";
        this.contextBonus.clearRect(0,0, this.canvasAlien.width, this.canvasAlien.height);
        
        if(this.timeMachineSwitch==true && timeMachineCounter<=70) {
          		// alien[i] += (speed-50);
          		timeReverse = 3;
          		timeMachineCounter++;
          		// console.log("Inside true");
          	} else {
          		this.timeMachineSwitch = false;
          		timeReverse = 0;
          		timeMachineCounter = 0;
          		// console.log("Inside false");
            	// alien[i] += speed;	
          	}
        
        // in this loop a path is created for each alien
        for (i = 0; i < 7; i++) {
          	
          	var speed = Math.floor((Math.random()*level)+1);
          	alien[i] += (speed-timeReverse);
          	// if(this.timeMachineSwitch==true && timeMachineCounter<=100000) {
          		// // alien[i] += (speed-50);
          		// alien[i] -= 100;
          		// timeMachineCounter++;
          	// } else {
          		// this.timeMachineSwitch == false;
          		// timeMachineCounter = 0;
            	// alien[i] += speed;	
          	// }
            
            if (alien[i] >= this.canvasAlien.height - 50) {
              	// health--;
               	var al = new Audio("sounds/aliens.ogg");
               	al.play();
               	var pos = Math.floor((Math.random()*100)+1);
                alien[i] = -pos;
                this.updateGame();
            }
            
            var y = alien[i];
			var x = (i+0.5) * 90;
            var radius = 33;
            this.contextAlien.beginPath();
            this.contextAlien.arc(x+35, y+35, radius, 0, 2 * Math.PI);
            this.contextAlien.drawImage(alienImage,x,y,70,70);
            this.contextAlien.closePath();
            var pos1 = Math.floor(10+(1+120-10)*Math.random());
        
            // this loop checks if click has occured on any alien and sends it back to the top, see len
            for (j = 0;j < this.len; j++) {
   		         if (this.contextAlien.isPointInPath(this.cX, this.cY) && this.mouseIsDown) {
                   	alien[i] = -pos1;
                   	aliensKilled++;
                   	this.updateGame();	
                 }
             }
             
             this.contextAlien.stroke();
        }
        
        if(this.bonusFalling==false && this.bonusEnabled==true && this.bonusInLevel<3 ) {
        	
        	var mysteryP = Math.floor((Math.random()*1000)+1);
        	if(mysteryP>=998 && mysteryP<=1000 && level>1) {
        		
        		bonusFalling = true;
        		this.bonusInLevel++;
        		boxX = (Math.random()*650)+50;
        		boxY = -20;
        		this.contextBonus.beginPath();
        		this.contextBonus.arc(boxX+35, boxY+35, 33, 0, 2 * Math.PI);
        		this.contextBonus.drawImage(imageStorage.mystery_box,boxX,boxY,70,70);
        		this.contextBonus.closePath();
        	}	
        	
        } else {
        	
        	if (boxY >= this.canvasAlien.height - 50) {
               	
               	bonusFalling = false;
               	
            } else {
            	
            	boxY += 5;
	        	this.contextBonus.beginPath();
	        	this.contextBonus.arc(boxX+35, boxY+35, 33, 0, 2 * Math.PI);
	        	this.contextBonus.drawImage(imageStorage.mystery_box,boxX,boxY,70,70);
	        	this.contextBonus.closePath();
	        	if(boxY>50 && boxY<70) {
	        		var box_sound = new Audio("sounds/box_falling.ogg");
	        		box_sound.play();	
	        	}
	        	
	        	if (this.contextBonus.isPointInPath(this.cX, this.cY) && this.mouseIsDown) {
                   	bonusFalling = false;
                   	// aliensKilled++;
                   	// this.updateGame();
                   	this.openTheBox();
                 }
            }
        	
        }
        
        // check for game over  
        if(health<=0) {
			clearInterval(gameLoop);
			this.gameOver();
		}
		
		// check for game finished
		if(aliensKilled>500) {
			clearInterval(gameLoop);
			this.gameFinished();
		}
	};
	
	this.openTheBox = function() {
		
		var p = (Math.random()*100)+1;
		if(missiles<3) {
			if(p>=0 && p<50) {
				this.slots[0+missiles].setAttribute("src","images/missile.png");
				missiles++;
				// if(missiles==3) {
					// this.bonusEnabled=false;
				// }
			}
			if(p>=50 && p<=100) {
				this.timeMachineSwitch=true;
				var al = new Audio("sounds/slow_down.ogg");
               	al.play();	
			}
			// if(p>=50 && p<=100) {
				// var al = new Audio("sounds/aliens.ogg");
               	// al.play();
				// health--;
				// this.updateGame();
			// }
		} else {
				this.timeMachineSwitch=true;
				var al = new Audio("sounds/slow_down.ogg");
               	al.play();
		}
	};
	
	// function that starts the game by firing animate function in certain interval
	this.startTheGame = function() {
		gameLoop = setInterval(function(){game.animate();},30);
	};
	
	// updates the games data regarding health, aliens killed and level transition
	this.updateGame = function() {
		var score = document.getElementById('score');
		score.innerHTML=aliensKilled;
		
		var score = document.getElementById('health');
		score.innerHTML=health;
		
		var score = document.getElementById('level');
		score.innerHTML=level-1;
		
		if(aliensKilled>50) {
			level = 3;
			alienImage = imageStorage.ufo;
			this.bonusInLevel = 0;
		}
		
		if(aliensKilled>100) {
			level = 4;
			alienImage = imageStorage.alien2;
			this.bonusInLevel = 0;
		}
		
		if(aliensKilled>170) {
			level = 5;
			alienImage = imageStorage.alien3;
			this.bonusInLevel = 0;
		}
		
		if(aliensKilled>270) {
			level = 6;
			alienImage = imageStorage.alien4;
			this.bonusInLevel = 0;
		}
		
		if(aliensKilled>380) {
			level = 7;
			alienImage = imageStorage.alien5;
			this.bonusInLevel = 0;
		}
		
		if(aliensKilled>450) {
			level = 8;
			alienImage = imageStorage.alien6;
			this.bonusInLevel = 0;
		}
	};
	
	// function that ends the game when player fails, displays game over message
	this.gameOver = function() {
		finishScreen.style.visibility="visible";
		message.innerHTML="You failed! Humanity is doomed!";
		finishImage.setAttribute("src","images/evilalien.png");
		var laugh = new Audio("sounds/evillaugh.ogg");
		laugh.play();
	};
	
	// function that ends the game when player successfuly finishes and displays congrat message
	this.gameFinished = function() {
		finishScreen.style.visibility="visible";
		message.innerHTML="You saved the world, congrats! ";
		finishImage.setAttribute("src","images/celebration.png");
		var hero = new Audio("sounds/hero.ogg");
		hero.play();
	};
}

// this object holds all images and has a function that insures that all the images are loaded before game starts
var imageStorage = new function() {
	
	var loaded = 0;
	
	
	this.bg = new Image();
	this.scope = new Image();
	this.alien1 = new Image();
	this.alien2 = new Image();
	this.alien3 = new Image();
	this.alien4 = new Image();
	this.alien5 = new Image();
	this.alien6 = new Image();
	this.ufo = new Image();
	this.evilalien = new Image();
	this.celebration = new Image();
	this.mystery_box = new Image();
	
	this.bg.src = "images/bg.png";
	this.scope.src = "images/scope.png";
	this.alien1.src = "images/alien1.png";
	this.alien2.src = "images/alien2.png";
	this.alien3.src = "images/alien3.png";
	this.alien4.src = "images/alien4.png";
	this.alien5.src = "images/alien5.png";
	this.alien6.src = "images/alien6.png";
	this.ufo.src = "images/ufo.png";
	this.evilalien.src = "images/evilalien.png";
	this.celebration.src = "images/celebration.png";
	this.mystery_box.src = "images/mystery_box.png";
	
	// this.shot = new Audio("sounds/shot.wav");
	
	function loadImage() {
		loaded++;
		if(loaded==12) {
			window.init();
		}
	}
	
	this.bg.onload = function() {
		loadImage();
	};
	
	this.alien1.onload = function() {
		loadImage();
	};
	
	this.alien2.onload = function() {
		loadImage();
	};
	
	this.alien3.onload = function() {
		loadImage();
	};
	
	this.alien4.onload = function() {
		loadImage();
	};
	
	this.alien5.onload = function() {
		loadImage();
	};
	
	this.alien6.onload = function() {
		loadImage();
	};
	
	this.ufo.onload = function() {
		loadImage();
	};
	
	this.scope.onload = function() {
		loadImage();
	};
	
	this.evilalien.onload = function() {
		loadImage();
	};
	
	this.celebration.onload = function() {
		loadImage();
	};
	
	this.mystery_box.onload = function() {
		loadImage();
	};
};

// class that manages the shooter (players scope)
function Shooter() {
	
	var x;
	var y;
	
	this.setCoordinates = function(xCord, yCord) {
		x = xCord;
		y = yCord;
	};
	
	// updates the scope position by following the mouse
	this.move = function(e) {
		
		if(!e) {
			var e = event;
		}
		
		x = e.pageX - game.canvasShooter.offsetLeft;
		y = e.pageY - game.canvasShooter.offsetTop;
  		
  		game.contextShooter.clearRect(x-400,y-400,600,600);
		game.contextShooter.drawImage(imageStorage.scope, x-20, y-20, 40, 40);
		
	};
	
	// fires when mouse is down
	this.mouseDown = function(e) {
		var shotSound = new Audio("sounds/shot.ogg");
		shotSound.play();
		game.mouseIsDown = 1;
		
		if (!e)
        	e = event;
        game.cX = e.pageX - game.canvasShooter.offsetLeft;
        game.cY = e.pageY - game.canvasShooter.offsetTop;
        game.len = 1;
	};
	
	// fires when mouse is up
	this.mouseUp = function() {
		game.mouseIsDown = 0;
		
		if (!e)
        	e = event;
        game.cX = e.pageX - game.canvasShooter.offsetLeft;
        game.cY = e.pageY - game.canvasShooter.offsetTop;
        game.len = 1;
	};
}

// main function to initialize the whole game
function init() {
	game.setUpGame();
	game.startTheGame();
}
