var releasesheep = function(p){
  var farm,splash,sheep,restart;  // Declare variable 'img'.
  var imgaspectratio, scalefactor, newbuffer;
  var buffer;
  var xstart, middlegap, xend, ystart, yend;
  var sheep_array = [0,0,0,0,0,0,1,1,1,1,1];
  var go = false;
  var stats = {};
  var numSheep;
  var lineWidth;
  var simulationSpeed = 1; // simulation speed in frames per second (goes between 1 and 60)
  var backgroundColor = 255;
  var width, height;

  p.preload = function(){
    splash = p.loadImage("media/releasesheep.png");
    farm = p.loadImage("media/twofarms.png");
    sheep = p.loadImage("media/sheep_tiny.png");
    restart = p.loadImage("media/restart.png");
    slow = p.loadImage("media/slow.png");
    fast = p.loadImage("media/fast.png");
    crazy = p.loadImage("media/crazy.png");
  }

  p.setup = function() {

    imgaspectratio = 438/614; //farm.width/farm.height;
    width = 600;
    height = 600/(2*0.713);
    p.createCanvas(width, height);

    for(var i=0; i<=6; i++){
      stats[i] = 0;
    }
    p.onResize();

  }


  p.draw = function() {

  if(isScrolledIntoView('#releasesheep')){


    if(go && p.frameCount%p.round(60/simulationSpeed)==0){
      p.countSheep();
      p.placeAllSheep();
      p.makeBarChart();
    }
  }

  }

  p.mousePressed = function(){
    if(isScrolledIntoView('#releasesheep'))
    {

      if(!go&&p.mouseX>0 && p.mouseX < width && p.mouseY>0 && p.mouseY<height){
        p.makeLabels();
        go = true;
      }

      if(go){
        if(p.abs(p.mouseX-width/4)<=((buffer/4)*restart.width/restart.height)/2 && p.abs(p.mouseY-(height-buffer/4))<=(buffer/4)/2){
          p.restartSimulation();
          simulationSpeed = 1;
        }
        if(p.abs(p.mouseX-(p.map(2.5,1,8,width/2,width-buffer/2)+1.5*newbuffer))<=((buffer/4)*slow.width/slow.height)/2 && p.abs(p.mouseY-(height-buffer/4))<=(buffer/4)/2){
          simulationSpeed = 1;
        }
        if(p.abs(p.mouseX-(p.map(5,1,8,width/2,width-buffer/2)+1.5*newbuffer))<=((buffer/4)*fast.width/fast.height)/2 && p.abs(p.mouseY-(height-buffer/4))<=(buffer/4)/2){
          simulationSpeed = 5;
        }
        if(p.abs(p.mouseX-(p.map(7.5,1,8,width/2,width-buffer/2)+1.5*newbuffer))<=((buffer/4)*crazy.width/crazy.height)/2 && p.abs(p.mouseY-(height-buffer/4))<=(buffer/4)/2){
          simulationSpeed = 60;
        }
      }
    }
    return false;
  }


  p.restartSimulation = function(){
    p.background(backgroundColor);
    p.image(farm, width/4, height/2, imgaspectratio*(height-buffer), height-buffer);
    p.makeLabels();

    for(var i=0; i<=6; i++){
      stats[i] = 0;
    }


  }

  p.makeLabels = function(){
    p.textSize(0.7*lineWidth);
    p.textAlign(p.CENTER,p.CENTER);
    p.fill('black');

    p.text('Sheep on top farm',3*width/4,buffer/4);
    for(var count = 1; count<14; count+=2){
      var ypos = p.map(count,0,14,ystart,height-ystart);
      p.text(6-(count-1)/2,(width/2)+5*newbuffer,ypos);
    }

    p.textSize(0.3*lineWidth);
    p.textAlign(p.CENTER,p.CENTER);

    p.image(restart,width/4,height-buffer/4,(buffer/4)*restart.width/restart.height,buffer/4);

    //p.text('Speed:',p.map(1,1,10,width/2,width),height-buffer/4);
    p.image(slow,p.map(2.5,1,8,width/2,width-buffer/2)+1.5*newbuffer,height-buffer/4,(buffer/4)*slow.width/slow.height,buffer/4);
    p.image(fast,p.map(5,1,8,width/2,width-buffer/2)+1.5*newbuffer,height-buffer/4,(buffer/4)*fast.width/fast.height,buffer/4);
    p.image(crazy,p.map(7.5,1,8,width/2,width-buffer/2)+1.5*newbuffer,height-buffer/4,(buffer/4)*crazy.width/crazy.height,buffer/4);

  }

  p.makeBarChart = function(){

    var sum = 0;
    var maxEntry = 0;
    for(var i=0; i<=6;i++){
      sum+=stats[i];
      if(stats[i]>maxEntry){
        maxEntry = stats[i];
      }
    }
    var maxpercentage = maxEntry/sum;

    var startxbar = (width/2)+8*newbuffer;
    var endxbar = width - buffer/2;
    var barheight = 0.8*(height-2*ystart)/7;

    p.textSize(0.3*lineWidth);
    p.textAlign(p.LEFT,p.CENTER);
    p.fill(backgroundColor);
    p.rect(startxbar, ystart, (endxbar-startxbar)+10, (height+middlegap-buffer)/2 + yend - ystart);

    for(var i=0; i<=6;i++){
      var ypos = p.map(2*i+1,0,14,ystart,height-ystart);
      var currentpercentage = stats[6-i]/sum;
      if(currentpercentage==0){
        p.fill('steelblue');
        p.rect(startxbar, ypos-barheight/2, 2, barheight);
        //fill('white');
        //text(round(100*currentpercentage)+'%',startxbar*1.01,ypos);
      }
      else{
        p.fill('steelblue');
        p.rect(startxbar, ypos-barheight/2, (endxbar-startxbar)*currentpercentage/maxpercentage, barheight);
        p.fill('white');
        p.text(p.round(100*currentpercentage)+'%',startxbar*1.01,ypos);
      }
    }


  }

  p.placeAllSheep = function(){

    p.image(farm, width/4, height/2, imgaspectratio*(height-buffer), height-buffer);     // place background image
    p.placeSheep(numSheep[0],'top','left');
    p.placeSheep(numSheep[1],'top','middle');
    p.placeSheep(numSheep[2],'top','right');
    p.placeSheep(numSheep[3],'bottom','left');
    p.placeSheep(numSheep[4],'bottom','middle');
    p.placeSheep(numSheep[5],'bottom','right');

  }

  p.placeSheep = function(num,str1,str2){

    var yarr = [1,3,5];

    if(str2=='left'){var xarr = [1,3];}
    else if(str2=='middle'){var xarr = [5,7];}
    else if(str2=='right'){var xarr = [9,11];}

    var count = 0;
    while(count<num){

    var xpos = p.map(xarr[count%2],0,12,xstart,xend);
    var ypos = p.map(yarr[p.floor(count/2)%3],0,6,ystart,yend);

    if(str1=='top'){
      p.image(sheep, xpos, ypos, sheep.width*scalefactor, sheep.height*scalefactor);
    }
    else if(str1=='bottom'){
      p.image(sheep, xpos, (height+middlegap-buffer)/2+ypos, sheep.width*scalefactor, sheep.height*scalefactor);
    }
    count++;
    }

  }

  // shuffle function from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  p.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  p.countSheep = function(){

    sheep_array = p.shuffle(sheep_array);
    numSheep = [];// [1,2,1,0,2,0];

    var count = 0;
    for(var i=0; i<sheep_array.length;i++){
      if(sheep_array[i]==1){
        numSheep.push(count);
        count=0;
      }
      if(sheep_array[i]==0){
        count++;
      }
    }
    if(count!=0){
      numSheep.push(count);
    }

    stats[numSheep[0]+numSheep[1]+numSheep[2]]++;

  }

  p.windowResized = function() {
    p.onResize();
  }

  p.onResize = function(){
    var divWidth = $('#releasesheep').width() ? $('#releasesheep').width() : p.windowWidth;
    width = divWidth;
    height = width/(2*imgaspectratio);

    p.resizeCanvas(width, height);
    p.background(backgroundColor);
    p.imageMode(p.CENTER);
    buffer = width/6;
    scalefactor = (height-buffer)/farm.height;
    newbuffer = (height-buffer)/40;
    middlegap = (46/614)*(height-buffer);
    xstart = width/4 - (imgaspectratio*(height-buffer)/2) + newbuffer;
    xend = width/4 + (imgaspectratio*(height-buffer)/2) - newbuffer;
    ystart = (buffer)/2 + newbuffer;
    yend = (height-middlegap)/2 - newbuffer;


    p.noStroke();
    lineWidth = (yend-ystart)/3;

    if(!go){
        p.image(splash, width/4, height/2, imgaspectratio*(height-buffer), height-buffer);
    }
    else{
        p.makeLabels();
      }
  }

}