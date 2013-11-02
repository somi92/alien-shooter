 var can, ctx,
            canX = [], canY = [], bubble = [],
            mouseIsDown = 0, len = 0;
 
        function init() {
            can = document.getElementById("alien");
            ctx = can.getContext("2d");
 
            can.addEventListener("mousedown", mouseDown, false);
            can.addEventListener("mousemove", mouseXY, false);
            // can.addEventListener("touchstart", touchDown, false);
            // can.addEventListener("touchend", touchUp, false);
            // can.addEventListener("touchmove", touchXY, false);
 
            document.body.addEventListener("mouseup", mouseUp, false);
            // document.body.addEventListener("touchcancel", touchUp, false);
            for (i = 0; i < 6; i++) {
                bubble[i] = 0;
            }
            animate();
        }
 
        function mouseUp() {
            mouseIsDown = 0;
            mouseXY();
        }
 
        function mouseDown() {
            mouseIsDown = 1;
            var sound = new Audio("sounds/shot2.wav");
            sound.play();
            mouseXY();
        }
 
        function touchDown() {
            mouseIsDown = 1;
            touchXY();
        }
 
        function touchUp(e) {
            if (!e)
                e = event;
            len = e.targetTouches.length;
        }
 
        function mouseXY(e) {
            if (!e)
                e = event;
            canX[0] = e.pageX - can.offsetLeft;
            canY[0] = e.pageY - can.offsetTop;
            len = 1;
        }
 
        // function touchXY(e) {
            // if (!e)
                // e = event;
            // e.preventDefault();
            // len = e.targetTouches.length;
            // for (i = 0; i < len; i++) {
                // canX[i] = e.targetTouches[i].pageX - can.offsetLeft;
                // canY[i] = e.targetTouches[i].pageY - can.offsetTop;
            // }
        // }
 
        // function animate() {
        	// var speed = Math.floor((Math.random()*5)+1);
            // ctx.strokeStyle = "red";
            // ctx.clearRect(0,0, can.width, can.height);
            // // create a path for each bubble
            // for (i = 0; i < 4; i++) {
                // bubble[i]+= 4;
                // if (bubble[i] >= can.height + 10)
                    // bubble[i] = -10;
                // var y = bubble[i];
                // var x = (i + 1) * 50;
                // var radius = 20;
                // ctx.beginPath();
                // ctx.arc(x, y, radius, 0, 2 * Math.PI);
                // ctx.closePath();
                // // test each extant touch to see if it is on the bubble
                // for (j = 0;j < len; j++) {
                    // if (ctx.isPointInPath(canX[j], canY[j]) && mouseIsDown)
                        // bubble[i] = -30;
                // }
                // ctx.stroke();
            // }
            // setTimeout(animate, 30);
        // }
        
function animate() {
        	// var speed = Math.floor((Math.random()*5)+1);
            // ctx.strokeStyle = "red";
            ctx.clearRect(0,0, can.width, can.height);
            // create a path for each bubble
            for (i = 0; i < 6 	; i++) {
            	var speed = Math.floor((Math.random()*5)+1);
                bubble[i]+= speed;
                if (bubble[i] >= can.height + 10)
                    bubble[i] = -10;
                var y = bubble[i];
                var x = (i + 1) * 60;
                var radius = 20;
                ctx.beginPath();
                ctx.arc(x+25, y+25, radius, 0, 2 * Math.PI);
               // ctx.fillRect(x,y,50,50);
                var alien = new Image();
                alien.src = "images/alien1.png";
                ctx.drawImage(alien,x,y,50,50);
                ctx.closePath();
                // test each extant touch to see if it is on the bubble
                for (j = 0;j < len; j++) {
                    if (ctx.isPointInPath(canX[j], canY[j]) && mouseIsDown)
                        bubble[i] = -30;
                }
                ctx.stroke();
            }
            setTimeout(animate, 30);
        }