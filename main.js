
"use strict"

var collapsed_panel;
var collapsed_bg_exit;
var btnExpandCTA_dc;

var expanded_panel;
var expanded_bg_exit;
var btnCloseCTA_dc;
var ytClose;
var learnMore;
var text2;
var isExpanded = false;
var isFirst = true;

var learnMoreDisplay;
var playBlocker;
var retryBlocker;
var learnMoreBlocker;
var Blocker;
var collapseStopAnimation;
var animationDuration = 0;
var focused=true;
//----Setting up----
var expandedborder = document.getElementById("expandedborder")
expandedborder.style.display="none";
// If true, start function. If false, listen for INIT.
window.onload = function() {
  collapseStopAnimation = setInterval(onFocusTimer, 1000 / 60);
  if (Enabler.isInitialized()) {
      enablerInitHandler();
  } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
}

function enablerInitHandler() {
    // Start ad, initialize animation,
    // load in your image assets, call Enabler methods,
    // and/or include other Studio modules.
    // Or also, you can start the Polite Load

    if (Enabler.isVisible()) {
      adVisibilityHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE,
      adVisibilityHandler);
    }



}
function adVisibilityHandler() {
    // Load in additional assets or start the animation/video
    InitMH();
}

function addListeners(){
  // Click to Action events
  //Expand-collapse
  btnExpandCTA_dc.addEventListener('click', clickExpandCTA, false);
  btnCloseCTA_dc.addEventListener('click', clickCloseCTA, false);
  ytClose.addEventListener('click', clickYTClose, false);




  //btnExpandCTA_dc.addEventListener('mouseover', clickExpandCTA, false);

  // Expand Event Listeners
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START,expandStart);
  //Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH,expandFinish);

  // Collapse Event Listeners
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START,collapseStart);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH,collapseFinish);

  //Exits
  collapsed_bg_exit.addEventListener('click', bgExitHandler, false);
  expanded_bg_exit.addEventListener('click', bgExitHandler, false);

  window.addEventListener("focus", function(event) { focused = true;}, false);
  window.addEventListener("blur", function(event) { focused = false;}, false);
}

//This function should be called only after the Enabler.isInitialized
function InitMH(){

/*Offset of left,top and width height, respectively, of the expanded Masthead.
  The expansion of a Masthead is only from 970x250 -> 970x500, so this configuration will not change*/
  Enabler.setExpandingPixelOffsets(0,0,970,500);

  //Assign Variables

  Blocker= document.getElementById("Blocker")
  learnMoreBlocker= document.getElementById("learnMoreBlocker")
  retryBlocker= document.getElementById("retryBlocker");
  collapsed_panel = document.getElementById("collapsed-panel");
  collapsed_bg_exit = document.getElementById("collapsed-bg-exit");
  btnExpandCTA_dc = document.getElementById("ctaExpand_dc");

  expanded_panel = document.getElementById("expanded-panel");
  expanded_bg_exit = document.getElementById("expanded-bg-exit");
  btnCloseCTA_dc = document.getElementById("ctaClose_dc");
  ytClose = document.getElementById("ytClose");
  learnMore = document.getElementById("learnMore");
  learnMoreDisplay= document.getElementById("endframe_BG");
  text2 = document.getElementById('text2')

Blocker.style.display="none";

  //Adding listeners
  addListeners();

}

function onFocusTimer(){

  if(animationDuration==1100){
    stopAnimation();
    clearInterval(collapseStopAnimation)
  }
  animationDuration++;
 // console.log(animationDuration)
}

function backupImage(){

}

//----Expanding/collapse functions----
function clickExpandCTA(){
  //stopAnimation ();

  Enabler.requestExpand();


}

function clickCloseCTA(){
  // console.log('hello')
  stopAnimation()

  Enabler.reportManualClose();
  Enabler.requestCollapse();
  close = false;
}

function clickYTClose(){
  stopAnimation()
  try{expanded_bg_exit.style.display="none";}catch(Error){}
  try{expanded_panel.style.display="none";}catch(Error){}

  if(isExpanded){
    Enabler.requestCollapse();
  }

  close = false;
}

function learMoreExit(e){
  clearInterval(collapseStopAnimation)
  stopAnimation ();
   if(isExpanded){
    Enabler.requestCollapse();
  }
}



function expandStart() {
  clearInterval(collapseStopAnimation)
  isExpanded = true;
  Enabler.startTimer('TMR YT GoSurf: Expansion Time');
  collapsed_panel.style.display = "none";
  expandedborder.style.display = "block";
   // Create your animation to expand here.

  expanded_panel.style.display = "block";
  retryBlocker.style.display="block";
  learnMoreBlocker.style.display="block";
  if(isFirst)
  {
    setTimeout(function(){
      gamestart();
    },2000);
    isFirst = false;
  }
  else
  {
    gamestart();
  }

    Enabler.finishExpand();
}

function collapseStart() {
  isExpanded = false;

  // Create your animation to collapse here.
 //expanded_panel.style.display = "none";


  try{ Levelupsound.pause();}catch(Error){}
   try{Levelupsound.currentTime = 0;}catch(Error){}
  collapsed_panel.style.display = "block";
  expanded_panel.style.display = "none";
   Enabler.finishCollapse();

}

function collapseFinish() {
   expandedborder.style.display = "none";
  Enabler.stopTimer('TMR YT GoSurf: Expansion Time');
}
function addResolveListener(){

   Blocker.style.display="block";
   learnMoreBlocker.style.display="none";
   retryBlocker.style.display="none";
   setTimeout(function(){Blocker.style.display="none";},500)
   learnMore.addEventListener('click', learMoreExit, false);
}
//----Exits----
function bgExitHandler(e) {
  clearInterval(collapseStopAnimation)
  stopAnimation ();

  // Enabler.exitOverride('Background Exit', 'http://www.this.will.always.navigate.here.com');
  if(isExpanded){
    Enabler.requestCollapse();
  }
}
