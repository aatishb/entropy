var arrangesheep = function(p){

  var img;  // Declare variable 'img'.
  var imgsize;
  var imgaspectratio;
  var mySheep;
  var numArrangements;
  //var slider;
  var selectedSheep = -1;
  var arrangementsFound = [];
  var numArrangementsFound = 0;

  var width = 800;
  var buffer = width/10;
  var height = 300+buffer;
  var aspectratio = height/width;
  var textsize = height/10;

  p.preload = function(){
    img = p.loadImage("media/sheep1.png");  // Load the image
  }

  p.setup = function() {
    p.createCanvas(width, height);
    imgsize = width/6;
    imgaspectratio = img.height/img.width;
    //imageMode(CENTER);
    p.noStroke();
    //stroke('green');

    mySheep = new p.sheep(3);
    numArrangements = mySheep.numArrangements;

    p.fill(0);
    p.textSize(textsize);
    p.textAlign(p.CENTER,p.CENTER);
    mySheep.arrange(0);

    arrangementsFound.push([mySheep.numLeft,mySheep.numMiddle,mySheep.numRight]);
    numArrangementsFound++;

    p.onResize();

  }


  p.draw = function() {

  if(isScrolledIntoView('#arrangesheep')){

    if(p.mouseIsPressed){
      // if mouse is pressed..
      // ..if no sheep is selected, look to see if mouse cursors is over one
      if(selectedSheep == -1){
        var flag = 0;
        for(var i = 0; i<mySheep.numSheep; i++){
          var x = mySheep.positions[i][0];
          var y = mySheep.positions[i][1];
          if(p.mouseX>0 && p.mouseX<width && p.mouseY>0 && p.mouseY<height){
            if(p.mouseX-x < imgsize && p.mouseY-y< imgaspectratio*imgsize && flag == 0)
            {
              mySheep.positions[i][0] = p.mouseX-imgsize/2;
              mySheep.positions[i][1] = p.mouseY-imgaspectratio*imgsize/2;
              selectedSheep = i;
              flag = 1;
            }
          }
        }
      }
      // ..otherwise have the selected sheep follow the mouse
      else{
        mySheep.positions[selectedSheep][0] = p.mouseX-imgsize/2;
        mySheep.positions[selectedSheep][1] = p.mouseY-imgaspectratio*imgsize/2;
      }

    }

    mySheep.draw();
    p.fill(0);
    if(numArrangementsFound<10){
      p.text('You found '+ numArrangementsFound + ' of '+numArrangements+' arrangements',width/2,height-buffer/2);
    }
    else{
      p.text('Hooray! You found all '+numArrangements+' arrangements!',width/2,height-buffer/2);
    }
  }
  }

  p.sheep = function(numSheep){

    this.numSheep = numSheep;
    this.numLeft = numSheep;
    this.numMiddle = 0;
    this.numRight = 0;
    this.arrangements = [];
    this.positions = [];

    for(var i=0; i<=numSheep; i++){
      for(var j=0; j<=numSheep; j++){
        for(var k=0; k<=numSheep; k++){
          if(i+j+k==numSheep){
            this.arrangements.push([k,j,i]);
          }
        }
      }
    }

    this.numArrangements = this.arrangements.length

    this.arrange = function(choice){

      var pickNewArrangement = this.arrangements[choice];

      this.numLeft = pickNewArrangement[0];
      this.numMiddle = pickNewArrangement[1];
      this.numRight = pickNewArrangement[2];

      this.positions = [];

      for(var i = 0; i<this.numLeft; i++){
        this.positions.push([(i%2)*width/6,p.floor(i/2)*(height-buffer)/2]);
      }

      for(var i = 0; i<this.numMiddle; i++){
        this.positions.push([width/3 + (i%2)*width/6, p.floor(i/2)*(height-buffer)/2]);
      }

      for(var i = 0; i<this.numRight; i++){
        this.positions.push([2*width/3 + (i%2)*width/6, p.floor(i/2)*(height-buffer)/2]);
      }

    }

    this.neaten = function(){
      this.positions = [];
      for(var i = 0; i<this.numLeft; i++){
        this.positions.push([(i%2)*width/6,p.floor(i/2)*(height-buffer)/2]);
      }
      for(var i = 0; i<this.numMiddle; i++){
        this.positions.push([width/3 + (i%2)*width/6, p.floor(i/2)*(height-buffer)/2]);
      }
      for(var i = 0; i<this.numRight; i++){
        this.positions.push([2*width/3 + (i%2)*width/6, p.floor(i/2)*(height-buffer)/2]);
      }
      //console.log(this.positions.length);
    }

    this.draw = function(){
      //background(123,231,126,60); //lawn green
      p.fill(130,244,133,60);
      p.rect(0,0,width/3,height-buffer);
      p.rect(2*width/3,0,width/3,height-buffer);
      p.fill(113,221,116,60);
      p.rect(width/3,0,width/3,height-buffer);
      p.fill(240);
      p.rect(0,height-buffer,width,buffer);

      for (var i = 0; i<this.numSheep; i++){
        var x = this.positions[i][0];
        var y = this.positions[i][1];
        p.image(img, x, y, imgsize, imgaspectratio*imgsize);
      }
    }
  }


  p.mouseReleased = function(){

    if(isScrolledIntoView('#arrangesheep')){

      mySheep.numLeft = 0;
      mySheep.numMiddle = 0;
      mySheep.numRight = 0;

      for(var i=0; i<3; i++){
        var x = mySheep.positions[i][0] + imgsize/2;
        if(x<width/3){mySheep.numLeft++;}
        if(x>=width/3 && x<2*width/3){mySheep.numMiddle++;}
        if(x>=2*width/3){mySheep.numRight++;}
      }


      // checks to see if we've already seen this arrangement
      var flag = 0;
      for(var i=0; i<arrangementsFound.length; i++){
        var array = arrangementsFound[i];
        if(array[0] == mySheep.numLeft && array[1] == mySheep.numMiddle && array[2] == mySheep.numRight){
          flag = 1;
        }
      }

      // if not, add it to our list
      if(flag == 0){
        arrangementsFound.push([mySheep.numLeft,mySheep.numMiddle,mySheep.numRight]);
      }


      // checks to see how many of all arrangements have we found
      numArrangementsFound = 0;

      for(var i=0; i<mySheep.arrangements.length; i++){
        for(var j=0; j<arrangementsFound.length; j++){

          var array1 = mySheep.arrangements[i];
          var array2 = arrangementsFound[j];

          if(array1[0]==array2[0] && array1[1]==array2[1] && array1[2]==array2[2]){
            numArrangementsFound++;
          }
        }
      }

      // neaten sheep positions
      mySheep.neaten();

      // deselect sheep
      selectedSheep = -1;

    }

    return false;

  }

  p.windowResized = function() {
    p.onResize();
  }

  p.onResize = function(){

    var divWidth = $('#arrangesheep').width() ? $('#arrangesheep').width() : p.windowWidth;
    width = divWidth;
    height = aspectratio*width;

    p.resizeCanvas(width, height);
    buffer = width/10;
    imgsize = width/6;
    textsize = height/10;
    p.textSize(textsize);
    p.textAlign(p.CENTER,p.CENTER);
    mySheep.neaten();

  }


}

