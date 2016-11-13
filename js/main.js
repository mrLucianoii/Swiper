
"use strict";

var toggleMenu = function(target){
    $(".menu").toggleClass("open");
    
}
var start = function(target){
    var arrBlocks = $("block");
    //$("block");
    $("board, block").toggleClass("start");
    if ( ! $("block h1").hasClass("start")){
        setTimeout(function() {
        $("block h1").addClass("start");

    }, 2000);
    }else {
        $("block h1").removeClass("start");
    }
    
    console.log(arrBlocks);
    
    for(var i=0; i < arrBlocks.length; i++){
        
    }
    
}

var GameBoard = function(){
    this.dragEleId = null;
    this.targEleId = null;
    this.dragEleIdChild = null;
    this.targEleIdChild = null;
    
}
GameBoard.allowDrop = function(ev) {
    ev.preventDefault();
    
}

GameBoard.drag = function(ev) {

    this.dragEleId = ev.target.dataset.drop;
    this.dragEleIdChild = ev.target.childNodes;
    
    console.log(ev.target.childNodes);
}

GameBoard.drop = function(ev) {
    ev.preventDefault();

    this.targEleId = ev.toElement;
    this.targEleIdChild = ev.toElement.childNodes;
   // this.targEleIdChild[0].innerHTML = "100";
    
    var targPos = this.targEleId.dataset.drop,
        draggedPos = parseInt(this.dragEleId);
       // draValue = parseInt(this.targEleIdChild[0].dataset.num);
    
    
    console.log("target: " + targPos);
    console.log(this.dragEleIdChild[1].dataset.num);
    
    if( draggedPos+1 == targPos || draggedPos-1 == targPos || draggedPos+3 == targPos || draggedPos-3 == targPos){
        alert("Oh yes this is cool");
        // Check if its a match
      //  console.log(targValue)
       /* if( targValue === draggedPos ){
            alert("your the coolest");
        }*/

    }else {
        alert("Get out of here: " + ( parseInt(draggedPos) + 1));
    }
    
}
