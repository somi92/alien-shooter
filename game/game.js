var game = new GamePlay();

var canvasAlien = document.getElementById('alien');
var contextAlien = canvasAlien.getContext('2d');
var canvasShooter = document.getElementById('shooter');
var contextShooter = canvasShooter.getContext('2d');
var canvasBg = document.getElementById('background');
var contextBg = canvasBg.getContext('2d');

var mouseIsDown = 0;
var bubble = [];
var len = 0;
var cX;
var cY;
// var x;
// var y;

function GamePlay() {
	
	var shooter;
	
	this.setUpGame = function() {
		// this.canvasAlienA = document.getElementById('shooter');
		// this.contextAlienA = this.canvasAlienA.getcontextAlien('2d');
// 		
		// Shooter.prototype.canvasAlien = this.canvasAlienA;
		// Shooter.prototype.contextAlien = this.contextAlienA;
		var bg = new Image();
		bg.src = "images/bg.png";
		
		contextBg.drawImage(bg,0,0,canvasBg.width,canvasBg.height);
		
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
		setInterval(function(){game.animate();},30);
	};
}

var resourceStorage = new function() {
	
	this.alien1 = new Image();
	this.alien2 = new Image();
	this.alien3 = new Image();
	this.alien4 = new Image();
	this.ufo = new Image();
	
	this.alien1.src = "images/alien1.png";
	this.alien2.src = "images/alien2.png";
	this.alien3.src = "images/alien3.png";
	this.alien4.src = "images/alien4.png";
	this.ufo.src = "images/ufo.png";
	
	this.shot = new Audio("sounds/shot.wav");
	
	this.getRandomImage = function() {
		var s = Math.floor((Math.random()*5)+1);
		switch (s) {
			case 1:
				return this.alien1;
				break;
			case 2:
				return this.alien2;
				break;
			case 3:
				return this.alien3;
				break;
			case 4:
				return this.alien4;
				break;
			case 5:
				return this.ufo;
				break;
		}
		
	};
	
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
  		
  		contextShooter.clearRect(x-300,y-300,500,500);
		
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
            contextAlien.strokeStyle = "transparent";
            contextAlien.clearRect(0,0, canvasAlien.width, canvasAlien.height);
            // create a path for each bubble
            for (i = 0; i < 7; i++) {
            	var speed = Math.floor((Math.random()*5)+1);
                bubble[i]+= speed;
                if (bubble[i] >= canvasAlien.height + 10) {
                    bubble[i] = -10;
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
                contextAlien.drawImage(resourceStorage.alien1	,x,y,70,70);
                contextAlien.closePath();
                // test each extant touch to see if it is on the bubble
                for (j = 0;j < len; j++) {
                    if (contextAlien.isPointInPath(cX, cY) && mouseIsDown)
                        bubble[i] = -30;
                }
                contextAlien.stroke();
            }
            setTimeout(animate, 30);
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

function init() {
	
	// var game = GamePlay();
	game.setUpGame();
	game.startTheGame();
}

//***************************************************//
