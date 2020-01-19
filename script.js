// Canvas
var ctx;
var imgBg;
var score = 0;
var imgLeben = new Image();
var startBu = document.getElementById('startButton');
var loading = document.getElementById('loading');

// Spieler—Variablen
var imgPlayer = new Image();
var imgDeadPlayer = new Image();
var playY = 500;
var playX = 200;
var key,pos = 0;
var minX = 100;
var maxX = 300;
var step = 100;
var lebenAbzug = 106; // -20 

// Item-Variablen
var img = ["Bilder/gerichteins.png", "Bilder/gerichtzwei.png", "Bilder/gerichtdrei.png", "Bilder/gerichtvier.png"];
var imgDrops;
var x = 100;
var y = 0;
var noOfDrops = 5;
var fallingDrops = [];
var xAchse = [0, 100, 200, 300, 400];
var countDownSec = 10;

// Sound-Variablen
var stepLinks = new Audio('Sound/links.wav');
var stepRechts = new Audio('Sound/rechts.wav');
var spielAudio = new Audio('Sound/gameAudio.wav');
var audioFangen = new Audio('Sound/gefangen.wav');
var audioFalsch = new Audio('Sound/falsch.wav');
var gameOver = new Audio('Sound/gameover.wav');

    function drawScore() {
        ctx.font = "10px Score";
        ctx.fillStyle = "#000";
        if (score <= -10){ ctx.fillText("SCORE " + '00000' , 197, 85); }
        if (score == 0){ ctx.fillText("SCORE " + '0000'+ score, 197, 85); }
        if (score >= 10 && score < 100){ ctx.fillText("SCORE " + '000'+ score, 197, 85); }
        if (score >= 100 && score < 1000){ ctx.fillText("SCORE " + '00'+ score, 197, 85); }
        if (score >= 1000 && score < 10000){ ctx.fillText("SCORE " + '0'+ score, 197, 85); }
    }

    function drawPlayer () {
        imgPlayer.src = 'Bilder/player5.png';
        ctx.drawImage (imgPlayer, playX, playY);
    }

    function drawDeadPlayer () {
        imgDeadPlayer.src = 'Bilder/player6.png';
        ctx.drawImage (imgDeadPlayer, playX, playY);
    }

    function drawBackground(){  
        ctx.drawImage(imgBg, 0, 0); //Background
    }

    function drawLeben() {
        imgLeben.src = 'Bilder/leben.png'
        ctx.drawImage (imgLeben, 0, 0, lebenAbzug, 20, 195, 650, lebenAbzug, 20);
    }

    function countDown() {
        ctx.fillText("GAME RESTART IN" + countDownSec, 600, 600);
        setInterval(function(){ countDownSec = countDownSec - 1 }, 1000);
    }
    

    function checkLeben() {
        if(lebenAbzug <= 1) {
            spielAudio.pause();
            ctx.font = "30px Score";
            ctx.fillText("GAME OVER", 100, 300);
            ctx.font = "15px Score";
            ctx.fillText("YOUR SCORE " + score, 125, 350);
            drawDeadPlayer();
            countDown();
            gameOver.play();
            setInterval(function() { window.location.reload(true); }, 10000);
            draw.stop();


            return;
                   
                   }

                }
            
        

        document.onkeydown=function(e) {
          pos=1;
          key=window.event?e.keyCode:e.which;
        }

        document.onkeyup=function(e){
            pos=0;
        }

        function imgRandom(imgArr) {
            return imgArr[Math.floor(Math.random() * imgArr.length)];
        }

        function minusLeben() {
                    for (j = 0; j < noOfDrops; j++) {
                        if (((playY) - (fallingDrops[j]["y"]) <= 60) && ((playX) == (fallingDrops[j]["x"])) && (fallingDrops[j].image.src.indexOf('vier')) != ('-1')) {
                        score -= 10;
                        lebenAbzug -= 21; 

                        fallingDrops[j].y = 0;
                        fallingDrops[j].image.src = imgRandom(img);
                        fallingDrops[j].x = xAchse[Math.floor(Math.random()*xAchse.length)];
                        fallingDrops[j].speed = 6 + Math.random() * 6; 

                        drawScore();
                        drawLeben();
                        audioFalsch.play();

                            }

                        }   
                    }

        function plusPoints() {
                    for (h = 0; h < noOfDrops; h++) {
                        if (((playY) - (fallingDrops[h]["y"]) <= 60) && ((playX) == (fallingDrops[h]["x"])) && (fallingDrops[h].image.src.indexOf('vier')) == ('-1')) {
                        score += 10;

                        fallingDrops[h].y = 0;
                        fallingDrops[h].image.src = imgRandom(img);
                        fallingDrops[h].x = xAchse[Math.floor(Math.random()*xAchse.length)];
                        fallingDrops[h].speed = 6 + Math.random() * 6;                   
                        
                        drawScore();
                        audioFangen.play();

                            }

                        }   
                    }

    /* ! Spiel pausieren 
        if(keyCode==32){
        paused = !paused;
                }*/

    function startGame() {  

        startBild.style.display = 'none';

            /*if(paused) {
                ctx.fillText('Pause', width/2, height/2);
                return;
            }*/ 

            function draw() {

                checkLeben();
                drawBackground();
                drawScore();
                drawPlayer();
                plusPoints();
                minusLeben();
                drawLeben();


                for (var i=0; i < noOfDrops; i++)
                {
                ctx.drawImage (fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); 

                fallingDrops[i].y += fallingDrops[i].speed; 
                if (fallingDrops[i].y > 450) {  // y-max für gerichte 
                fallingDrops[i].image.src = imgRandom(img);
                fallingDrops[i].y = 0 
                fallingDrops[i].x = xAchse[Math.floor(Math.random()*xAchse.length)];
                fallingDrops[i].speed = 6 + Math.random() * 6;
                    
            }

        }
                if(pos==0)return;

                if(key==37) {
                if (playX < minX) {
                        playX = 0; 
                    } else { playX = playX - step;
                    }
                stepLinks.play();
                }

                if(key==39) {
                if (playX > maxX) {
                        playX = 400; 
                    } else { playX = playX + step;
                    }
                stepRechts.play();
            }

        }


            function setup() {
                var canvas = document.getElementById('canvasRegn');

                spielAudio.addEventListener('ended', function() {
                spielAudio.currentTime = 0;
                spielAudio.play();
                }, false);
                spielAudio.play();

                if (canvas.getContext) {
                    ctx = canvas.getContext('2d');

                    imgBg = new Image();
                    imgBg.src = 'Bilder/gameBG1.png';
                
                setInterval(draw, 110);

                for (var i = 0; i < noOfDrops; i++) {
                    var fallingDr = new Object();
                    fallingDr["image"] =  new Image();
                    fallingDr.image.src = imgRandom(img);

                    fallingDr["x"] = xAchse[Math.floor(Math.random()*xAchse.length)];
                    fallingDr["y"] = 0;
                    fallingDr["speed"] = 6 + Math.random() * 6;
                    fallingDrops.push(fallingDr); 

                    }

                }

            }


            setup();


        }
