var bouncingsheep2 = function(p){

  var img;  // Declare variable 'img'.
  var imgsize;
  var count = 0;
  var mySheep = [];

  var width = 700;
  var height = 225;
  var aspectratio = height/width;
  var imgaspectratio;
  var maxWidth = width;
  var minWidth = 400;

  p.setup = function() {
    p.onResize();
    p.createCanvas(width, height);
    imgsize = width/5;
    img = p.loadImage("media/sheep.png");  // Load the image
    imgaspectratio = img.height/img.width;
    p.imageMode(p.CENTER);
    mySheep.push(new p.sheep(p.random(width),p.random(height)));
  }

   p.draw = function() {

    if(isScrolledIntoView('#bouncingsheep2'))
    {

      //p.background(255,255,153);
      p.background(255);

      for(var i=0; i<mySheep.length; i++){
        mySheep[i].updatePositions();
        mySheep[i].draw();
      }
    }
  }


  p.sheep = function(x0,y0){
    this.x = x0;
    this.y = y0;
    this.v = 0;
    this.g = 0.2;
    this.multiplier = p.random() < 0.5 ? -1 : 1;

    this.updatePositions = function(){

      // integrate y position (constant acceleration)
      this.v -= this.g;
      this.y -= this.v;

      // integrate x position (constant velocity)
      this.x += 2*this.multiplier;


      //y constrains
      if(this.y<imgsize/2){
        this.v *= -1;
        this.y = imgsize/2;
      }
      else if(this.y>height - imgsize/2){
        //this.v *= -1;
        this.v = p.sqrt(height/7);
        this.y = height - imgsize/2;
      }

      // x constraints
      if(this.x>width-imgaspectratio*imgsize/2){
        this.x =width-imgaspectratio*imgsize/2;
        this.multiplier = -1;
      }
      else if(this.x<imgaspectratio*imgsize/2){
        this.x = imgaspectratio*imgsize/2;
        this.multiplier *= -1;
      }

    }

    this.draw = function(){
      p.image(img, this.x, this.y, imgsize, imgaspectratio*imgsize);
    }
  }

  p.windowResized = function() {
    p.onResize();
  }

  p.onResize = function(){
    //if(isScrolledIntoView('#bouncingsheep2'))
    //{
    var divWidth = $('#bouncingsheep2').width() ? $('#bouncingsheep2').width() : p.windowWidth;
    width = divWidth;
    height = aspectratio*width;
    p.resizeCanvas(width, height);
    imgsize = width/5;

    //}
  }

}
