var game = new GamePlay();

var gameLoop;

var canvasAlien;
var contextAlien;

var canvasShooter;
var contextShooter;

var canvasBg;
var contextBg;

var startScreen;
var finishScreen;
var message;
var finishImage;

var alienImage;

var aliensKilled;
var health;
var level;

var mouseIsDown;
var bubble = [];
var len;

var bgLoaded = 0;

var cX;
var cY;
// var x;
// var y;

function GamePlay() {
	
	var shooter;
	
	this.setUpGame = function() {
		//******************************************
		canvasAlien = document.getElementById('alien');
		contextAlien = canvasAlien.getContext('2d');
		
		canvasShooter = document.getElementById('shooter');
		contextShooter = canvasShooter.getContext('2d');
		
		canvasBg = document.getElementById('background');
		contextBg = canvasBg.getContext('2d');
		
		startScreen = document.getElementById('start');
		finishScreen = document.getElementById('screen');
		message = document.getElementById('message');
		finishImage = document.getElementById('image');
		
		alienImage = new Image();
		alienImage = resourceStorage.alien1;
		
		aliensKilled = 0;
		health = 10;
		level = 2;
		
		mouseIsDown = 0;
		bubble = [];
		len = 0;
		//******************************************
		
		// startScreen.style.visibility="visible";
		finishScreen.style.visibility="hidden";
		
		updateGame();
		
		contextBg.drawImage(resourceStorage.bg,0,0,canvasBg.width,canvasBg.height);
		
		shooter = new Shooter();
		shooter.setCoordinates(10,10);
		canvasShooter.addEventListener("mousemove", shooter.move, false);
		canvasShooter.addEventListener("mousedown",shooter.mouseDown, false);
		canvasShooter.addEventListener("mouseup",shooter.mouseUp, false);
		for (i = 0; i < 7; i++) {
                bubble[i] = 0;
            }
		// canvasAlien.addEventListener("click", shooter.click, false);
		
		animate();
	};
	
	
	this.animate = function() {

	};
	
	this.startTheGame = function() {
		// shooter.canvasAlien.addEventListener("mousemove", shooter.move(), false);
		setInterval(function(){game.animate();},1000/60);
	};
}

var resourceStorage = new function() {
	
	var loaded = 0;
	
	
	this.bg = new Image();
	this.alien1 = new Image();
	this.alien2 = new Image();
	this.alien3 = new Image();
	this.alien4 = new Image();
	this.alien5 = new Image();
	this.alien6 = new Image();
	this.ufo = new Image();
	
	this.bg.src = "images/bg.png";
	this.alien1.src = "images/alien1.png";
	this.alien2.src = "images/alien2.png";
	this.alien3.src = "images/alien3.png";
	this.alien4.src = "images/alien4.png";
	this.alien5.src = "images/alien5.png";
	this.alien6.src = "images/alien6.png";
	this.ufo.src = "images/ufo.png";
	
	// this.shot = new Audio("sounds/shot.wav");
	
	function loadImage() {
		loaded++;
		if(loaded==8) {
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
	
	// this.getRandomImage = function() {
		// var s = Math.floor((Math.random()*5)+1);
		// switch (s) {
			// case 1:
				// return this.alien1;
				// break;
			// case 2:
				// return this.alien2;
				// break;
			// case 3:
				// return this.alien3;
				// break;
			// case 4:
				// return this.alien4;
				// break;
			// case 5:
				// return this.ufo;
				// break;
		// }
// 		
	// };
	
};

function Shooter() {
	
	var x;
	var y;
	
	// var c = this;
	
	// this.getcanvasAlien = function() {
		// return this.canvasAlien;
	// };
	
	this.setCoordinates = function(xCord, yCord) {
		x = xCord;
		y = yCord;
	};
	
	this.draw = function() {
		
	};
	
	this.move = function(e) {
		
		if(!e) {
			var e = event;
		}
		
		x = e.pageX - canvasShooter.offsetLeft;
		y = e.pageY - canvasShooter.offsetTop;
  		
  		contextShooter.clearRect(x-400,y-400,600,600);
		
		var scopeImg = new Image();
		scopeImg.src = "images/scope.png";
		contextShooter.drawImage(scopeImg, x-20, y-20, 40, 40);
		
	};
	
	this.mouseDown = function(e) {
		var shotSound = new Audio("sounds/shot.wav");
		shotSound.play();
		mouseIsDown = 1;
		
		if (!e)
        	e = event;
        cX = e.pageX - canvasShooter.offsetLeft;
        cY = e.pageY - canvasShooter.offsetTop;
        len = 1;
	};
	
	this.mouseUp = function() {
		mouseIsDown = 0;
		
		if (!e)
        	e = event;
        cX = e.pageX - canvasShooter.offsetLeft;
        cY = e.pageY - canvasShooter.offsetTop;
        len = 1;
	};
}

        
        function animate() {
        	// var speed = Math.floor((Math.random()*5)+1);
        	// startScreen.style.vi	sibility = "hidden";
            contextAlien.strokeStyle = "transparent";
            contextAlien.clearRect(0,0, canvasAlien.width, canvasAlien.height);
            // create a path for each bubble
            for (i = 0; i < 7; i++) {
            	var speed = Math.floor((Math.random()*level)+1);
                bubble[i]+= speed;
                if (bubble[i] >= canvasAlien.height - 50) {
                	health--;
                	var al = new Audio("sounds/aliens.wav");
                	al.play();
                	var pos = Math.floor((Math.random()*100)+1);
                    bubble[i] = -pos;
                    updateGame();
                    // var image = resourceStorage.getRandomImage();
                }
                var y = bubble[i];
                var x = (i+0.5) * 90;
                var radius = 33;
                contextAlien.beginPath();
                contextAlien.arc(x+35, y+35, radius, 0, 2 * Math.PI);
               // ctx.fillRect(x,y,50,50);
                // var alien = new Image();
                // alien.src = "images/alien3.png";
                contextAlien.drawImage(alienImage,x,y,70,70);
                contextAlien.closePath();
                // test each extant touch to see if it is on the bubble
                var pos1 = Math.floor(10+(1+120-10)*Math.random());
                for (j = 0;j < len; j++) {
                    if (contextAlien.isPointInPath(cX, cY) && mouseIsDown) {
                    	bubble[i] = -pos1;
                    	aliensKilled++;
                    	updateGame();	
                    }
                }
                contextAlien.stroke();
            }
            gameLoop = setTimeout(animate, 30);
            
            if(health<=0) {
				clearInterval(gameLoop);
				gameOver();
			}
			
			if(aliensKilled>500) {
				clearInterval(gameLoop);
				gameFinished();
			}
        }
// var game = GamePlay();

// function mousePosition(event) {
// 	
	// x = event.x;
	// y = event.y;
// 	
	// x -= canvasAlien.offsetLeft;
  	// y -= canvasAlien.offsetTop;
//   	
//   	
// };
function gameOver() {
	finishScreen.style.visibility="visible";
	message.innerHTML="You failed! Humanity is finished!";
	finishImage.setAttribute("src","images/evilalien.png");
	var laugh = new Audio("sounds/evillaugh.wav");
	laugh.play();
}

function gameFinished() {
	finishScreen.style.visibility="visible";
	message.innerHTML="You saved the world, our hero! ";
	finishImage.setAttribute("src","images/celebration.png");
	var hero = new Audio("sounds/hero.ogg");
	hero.play();
}

function updateGame() {
	
	var score = document.getElementById('score');
	score.innerHTML=aliensKilled;
	
	var score = document.getElementById('health');
	score.innerHTML=health;
	
	var score = document.getElementById('level');
	score.innerHTML=level-1;
	
	if(aliensKilled>50) {
		level = 3;
		// alienImage.src = "images/alien2.png";
		alienImage = resourceStorage.ufo;
	}
	
	if(aliensKilled>100) {
		level = 4;
		// alienImage.src = "images/alien2.png";
		alienImage = resourceStorage.alien2;
	}
	
	if(aliensKilled>170) {
		level = 5;
		alienImage = resourceStorage.alien3;
	}
	
	if(aliensKilled>270) {
		level = 6;
		alienImage = resourceStorage.alien4;
	}
	
	if(aliensKilled>380) {
		level = 7;
		alienImage = resourceStorage.alien5;
	}
	
	if(aliensKilled>450) {
		level = 8;
		alienImage = resourceStorage.alien6;
	}
	// if(health<=0) {
		// clearInterval(gameLoop);
	// }
}

function startTheGame() {
	// startScreen.remove();
	setInterval(function(){game.animate();},30);
}

function init() {
	
	// var game = GamePlay();
	game.setUpGame();
	game.startTheGame();
}

//***************************************************//
