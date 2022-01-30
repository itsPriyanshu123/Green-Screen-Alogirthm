var fgImage = null;
var bgImage = null;
var fgCan; 
var bgCan;

function loadForegroundImage(){
  var File = document.getElementById ("foreground");
  fgImage = new SimpleImage(File);
  fgCan = document.getElementById("fgCanvas");
  fgImage.drawTo(fgCan);
}

function loadBackgroundImage(){
  var File = document.getElementById ("background");
  bgImage = new SimpleImage(File);
  bgCan = document.getElementById("bgCanvas");
  bgImage.drawTo(bgCan);
}

function doGreenScreen(){
  if(fgImage == null||! fgImage.complete()){
    alert("foreground not loaded");
    return;
  }
  if (bgImage == null||! bgImage.complete()){
    alert("background not loaded");
  }
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var greenThreshold = 240;
  for (var pixel of fgImage.values()){
    var x = pixel.getX();
    var y = pixel.getY();
if (pixel.getGreen() > greenThreshold){
  var bgPixel = bgImage.getPixel (x,y);
  output.setPixel(x,y,bgPixel);
} 
    else{output.setPixel(x,y,pixel);
  }
 }
    output.drawTo(fgCanvas);
  doClear(bgCanvas);
}

function clearCanvas(){
  doClear(fgCanvas);
  doClear(bgCanvas);
}
function doClear(canvas){
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}