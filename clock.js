function showTime(){
    var now        =  new Date(),
    hours      =  now.getHours(),
    minutes    =  now.getMinutes(),
    seconds    =  now.getSeconds();
  if(hours < 10){
      hours   = '0' + hours;
     }
    if(minutes < 10){
      minutes = '0' + minutes;
     }
    if(seconds < 10){
      seconds =  '0' + seconds;
     }
    // if(hours > 10 ){
    //  TweenMax.from(".planetmars", 90, { opacity: 0.5});
    // }
    if(hours > 10 && hours < 17){
     TweenMax.from(".sun", 90, { opacity: 1});
     }

     if(hours > 17 && hours < 10){
     TweenMax.from(".moon", 90, { opacity: 1});
     }
     //  if(hours > 17 && hours < 12 ){
     // TweenMax.from(".sun", 90, { opacity: 0});
     // }

 document.getElementById('clock').textContent = hours + '      ' + ':' + '      ' + minutes + '      ' + ':' + '      ' + seconds;
}



function showDate(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
 document.getElementById('date').textContent = today;
}

window.onload = function(){
  "use strict";
  setInterval(showTime, 500);
   setInterval(showDate, 500);
}


var tl = new TimelineMax();{

TweenMax.from("img", 900, { transformOrigin:"50% 50%", rotation:"+=360", repeat:-1, ease:Linear.easeNone});
// TweenMax.from("img", 900, { transformOrigin:"50% 50%", rotation:"+=360", repeat:-1, ease:Linear.easeNone});




}


var width = 1200;
var height = 1200;


var banner = document.querySelector("#banner");
var baseStar = document.querySelector(".star");

var frag = document.createDocumentFragment();
/*Creating fragment: 
Appending a star directly to the banner element will trigger a reflow. There are 300 stars, so appending them one at a time could trigger 300 reflows. That does not include any additional reflows or repaints that might be caused by changing the initial style for each star. By appending all the stars to a document fragment, modifying them on there, and then adding it to the banner element will trigger only 1 reflow and repaint.*/

var appearMin = 0.3;
var appearMax = 0.8;

var delayMin = 2;
var delayMax = 6;

var durationMin = 0.3;
var durationMax = 1;

var numAnimations = 50;
var numStars = 300;

var stars = [];
var eases = [];

for (var i = 0; i < numAnimations; i++) {
  
  var ease = new RoughEase({ 
    template:  Linear.easeNone, 
    strength: random(1, 3), 
    points: Math.floor(random(50, 200)), 
    taper: "both", 
    randomize: true, 
    clamp: true
  });
  
  eases.push(ease);
}

// Wait for images to load
window.addEventListener("load", onLoad);

function onLoad() {
    
  for (var i = 0; i < numStars; i++) {
    stars.push(createStar());
  }
  
  document.body.removeChild(baseStar);
  banner.appendChild(frag);
}

function createStar() {
  // var index = random(textures.length)|0;
  // var star = textures[index].cloneNode(true);
  var star = baseStar.cloneNode(true);
  frag.appendChild(star);
  
  TweenLite.set(star, {
    rotation: random(360),
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    x: random(width),
    y: random(height),
  });
  
  var tl = new TimelineMax({ repeat: -1, yoyo: true });
   
  for (var i = 0; i < numAnimations; i++) {
    
    var ease1 = eases[Math.floor(random(numAnimations))];
    var ease2 = eases[Math.floor(random(numAnimations))];
    
    var alpha = random(0.7, 1);
    var scale = random(0.15, 0.4);
    
    var appear = "+=" + random(appearMin, appearMax);
    var delay = "+=" + random(delayMin, delayMax);  
    var duration1 = random(durationMin, durationMax);
    var duration2 = random(durationMin, durationMax);   
    
    tl.to(star, duration1, { autoAlpha: alpha, scale: scale, ease: ease1 }, delay)
      .to(star, duration2, { autoAlpha: 0, scale: 0, ease: ease2 }, appear)
  }
    
  tl.progress(random(1));
  
  return {
    element: star,
    timeline: tl
  };
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
}
