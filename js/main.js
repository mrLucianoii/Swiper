
var toggleMenu = function(target){
    $(".menu").toggleClass("open");
    
}

var GameBoard = function(){
    this.dragEleId = null;
    this.targEleId = null;
    this.dragEleIdChild = null;
    this.targEleIdChild = null;
    
}
GameBoard.hashTable = function(){
 /*   this.hash = [
        [1,3], [-1, 1, 3], [-1, 3] 
        [-3, 1, -3]
    ] */
}
GameBoard.start = function(target){
    
    
    this.arrBlocks = $("block");
    if (this.arrBlocks.hasClass("matched")){
        this.arrBlocks.removeClass("matched");
    }
    $("board, block").toggleClass("start");
    if ( ! $("block h1").hasClass("start")){
        setTimeout(function() {
        $("block h1").addClass("start");
        GameBoard.timmer(true);

    }, 2000 );
    }else {
        $("block h1").removeClass("start");

    }
    
    var numGen = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
   }
    shuffleArray(numGen);
    
  /*  while (duplicate(numGen, target) && numGen.length < 9){
        console.log(numGen);
        numGen.push(target);
        target = Math.floor(Math.random() * 9) + 1;
    }*/
   
    for(var i=0; i < this.arrBlocks.length; i++){
        this.arrBlocks[i].innerHTML = "";
        this.arrBlocks[i].innerHTML = "<h1 class='tk-proxima-nova-alt-ext-cond' data-num='"+numGen[i]+"'>"+numGen[i]+"</h1>";

    }
var counterClick = true,
    click1, click2;
    
$("board").on('click', function(ev){
     console.log($(this));     
     console.log(ev.target);
        console.log(ev.target.offsetParent.dataset["drop"]);

    
    
    var dTarget = null;
    
    
    if (counterClick){
       dTarget = ev.target.offsetParent; // UI Effect
        $(dTarget).addClass("firstClick");
        click1 = ev.target.offsetParent.dataset["drop"]; //Get Pos
        
        counterClick = false;    
    }else {
        click2 = ev.target.offsetParent.dataset["drop"];
        GameBoard.mobileClick(click1, click2);
        
        $("[data-drop='"+click1+"']").removeClass("firstClick");
        counterClick = true;
    }
   

});

}
GameBoard.mobileClick = function(c1, c2 ){
    
    //Find availble spots
    //Take secondClick input
    console.log("inside mobile click");
    
    GameBoard.swapBlocks(c1, c2);
    
    return true;
    
}
GameBoard.allowDrop = function(ev) {
    ev.preventDefault();
    
}
GameBoard.drag = function(ev) {

    this.dragEleId = ev.target.dataset.drop;
    this.dragEleIdChild = ev.target.childNodes;
    
    console.log(ev.target.childNodes);
}
GameBoard.swapBlocks = function(swapOutChildParent, swapInChildParent){
    var swapOutNode = $("[data-drop='"+swapOutChildParent+"']")[0].childNodes[0],
        swapInNode = $("[data-drop='"+swapInChildParent+"']")[0].childNodes[0],
        dataDrop1 =  $("[data-drop='"+swapOutChildParent+"']")[0].dataset["drop"],
        dataOut1 = $("[data-drop='"+swapInChildParent+"']")[0].childNodes[0].dataset["num"],
        dataDrop2 =  $("[data-drop='"+swapInChildParent+"']")[0].dataset["drop"],
        dataOut2 = $("[data-drop='"+swapOutChildParent+"']")[0].childNodes[0].dataset["num"];
    
    $("[data-drop='"+swapInChildParent+"']")[0].childNodes[0].replaceWith(swapOutNode); 
    $("[data-drop='"+swapOutChildParent+"']")[0].appendChild(swapInNode);
    
   /* console.log(dataDrop1);
    console.log(dataOut1);
    console.log(dataDrop2);
    console.log(dataOut2);
    */ 
    
    if (dataDrop1 === dataOut1){
      //  alert("Its a Match: 1");
        $("[data-drop='"+swapOutChildParent+"']").addClass("matched")
    }
    if (dataDrop2 === dataOut2){
      //  alert("Its a Match: 2");
        $("[data-drop='"+swapInChildParent+"']").addClass("matched")

    }
    
    return console.log("Swapped");

}
GameBoard.drop = function(ev) {
    ev.preventDefault();

    this.targEleId = ev.toElement;
    this.targEleIdChild = ev.toElement.childNodes;
    
    
    var targPos = ev.path[1].dataset["drop"],
        draggedPos = parseInt(this.dragEleId),
        dragValue = parseInt(this.dragEleIdChild[0].dataset["num"]),
        targValue = this.targEleIdChild[0].data ;
   
    console.log( eval(ev.toElement.dataset["drop"]) );
    this.dropzoneBackUp =  eval(ev.toElement.dataset["drop"]);
    console.log( typeof draggedPos );

    console.log(typeof targPos);
    if (typeof targPos === undefined){
   //     alert("hi");
        targPos = ev.toElement.dataset["drop"];   
    }
    console.log("dropzone: " + targPos); // dropzone
    console.log("dropzone BackUp: " + this.dropzoneBackUp); // dropzoneBackUp

    if (targPos === undefined){
      //  alert("houston we have a problem");
        targPos = this.dropzoneBackUp;
        //console.log("dropzone Fix: " + targPos); // dropzone

    }
    console.log("element put into: "  + this.dropzoneBackUp); // put into

    
    if( draggedPos+1 == targPos || draggedPos-1 == targPos || draggedPos+3 == targPos || draggedPos-3 == targPos){

        if( targPos === dragValue ){
            GameBoard.swapBlocks(targPos, draggedPos);

        }else{
            GameBoard.swapBlocks(targPos, draggedPos);
           
        }
    }else {
        console.log("Get out of here: " + ( draggedPos ));

    }
    
}
GameBoard.timmer = function(startBool){
   
    var sec = 0;

    function pad(val) {
        return val > 9 ? val : "0" + val;
    }
        var timer = setInterval(function () {
        document.getElementById("seconds").innerHTML = pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
      //  document.getElementById("milliseconds").innerHTML = pad(parseInt( ++sec % 60, 10));

    }, 1000);

    setTimeout(function () {
        clearInterval(timer);
    }, 110000);
    
 
}

