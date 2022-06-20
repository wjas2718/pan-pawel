/*GRAPHICS*/
var chair = chrome.runtime.getURL("paw/chair.svg");
var walk0 = chrome.runtime.getURL("paw/walk0.svg");
var walk1 = chrome.runtime.getURL("paw/walk1.svg");
var walk2 = chrome.runtime.getURL("paw/walk2.svg");
var walk3 = chrome.runtime.getURL("paw/walk3.svg");

var paw1 = chrome.runtime.getURL("paw/paw1.svg");
var paw2 = chrome.runtime.getURL("paw/paw2.svg");
var paw3 = chrome.runtime.getURL("paw/paw3.svg");
var paw4 = chrome.runtime.getURL("paw/paw4.svg");
var paw5 = chrome.runtime.getURL("paw/paw5.svg");

var sleep = chrome.runtime.getURL("paw/sleep.svg");

const list1 = [walk0,walk0,paw3,walk1,walk1];
const list2 = [walk2,walk2,paw4,walk3,walk3];

/*BODY*/
var myimg = document.createElement("img");
myimg.src = chair;
myimg.className = "myimage";
document.body.appendChild(myimg);

source = paw1;

var pawel = document.createElement("img");
pawel.setAttribute("id","pawel");
pawel.src = source;
pawel.className = "pawel";
document.body.appendChild(pawel);

/*MOVING*/
var width = window.screen.width + 100;
var id = null;
var i = 0;
let position = 0;
let moverate = 1.5;
let elem = document.getElementById("pawel");

function UpdatePosition(distance) {
  position = position + distance;

  if (position<-100) {
      position = width;
  }
  else if (position>width) {
      position = -100;
  }
}

function RefreshPosition() {
  let x  = position;
  elem.style.right = x + 'px';
}

/*WALK*/
var tout = null

function WalkLeft(){
  clearTimeout(tout);
  tout = setTimeout(Stand2, 4000);

  clearInterval(id);
  id = setInterval(frame, 80);

  function frame(){
      UpdatePosition(moverate);
      i++;
      source = list1[i%5];
      elem.src= source; 
      RefreshPosition();
  }
}

function WalkRight(){
  clearTimeout(tout);
  tout = setTimeout(Stand2, 4000);

  clearInterval(id);
  id = setInterval(frame, 80);

  function frame(){
      UpdatePosition(-moverate);
      i++;
      source = list2[i%5];
      elem.src= source; 
      RefreshPosition();
  }
}

/*SLEEP*/
function Sleep(){
  clearInterval(id);
  id = setInterval(frame, 80);

  function frame(){
      if (position == 0) {
          elem.src = sleep;
          clearInterval(id);
      }
      else if (position == 1) {
          position = 0;
          elem.src = sleep;
          clearInterval(id);
      }
      else {
          UpdatePosition(-moverate);
          i++;
          source = list2[i%5];
          elem.src= source; 
          RefreshPosition();
      }
  }
}

/*STAND*/
function Stand1(){
  elem.src = paw1;
}

function Stand2(){
  clearInterval(id);
  if (position < 0.5*width) {
    elem.src = paw2;
  }
  else {
    elem.src = paw5;
  }
}

/*RANDOMISE*/
var idn = null;
var funct = null;
var n = 0;
const flist = [WalkLeft, Sleep, WalkRight, Sleep, Stand1, Sleep, Stand2]

function Rand(){
  clearInterval(idn);
  idn = setInterval(frame, 8000);

  function frame(){
    n = Math.floor(Math.random()* 7);
    funct = flist[n];
    window.funct.call()
  }
}

Rand()