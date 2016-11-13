


var toggleMenu = function(target){
    $(".menu").toggleClass("open");
    
}

var GameBoard = function(){
    this.dragEleId = null;
    this.targEleId = null;
    this.dragEleIdChild = null;
    this.targEleIdChild = null;
    
}
GameBoard.start = function(target){
    this.arrBlocks = $("block");

    $("board, block").toggleClass("start");
    if ( ! $("block h1").hasClass("start")){
        setTimeout(function() {
        $("block h1").addClass("start");

    }, 2000);
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
    
    
    var targPos = ev.path[1].dataset["drop"],
        draggedPos = parseInt(this.dragEleId),
        dragValue = parseInt(this.dragEleIdChild[0].dataset["num"]),
       targValue = this.targEleIdChild[0].data ;
   
    console.log( eval(ev.toElement.dataset["drop"]) );
    this.dropzoneBackUp =  eval(ev.toElement.dataset["drop"]);
    console.log( typeof draggedPos );

    console.log(typeof targPos);
    if (typeof targPos === undefined){
        alert("hi");
        targPos = ev.toElement.dataset["drop"];   
    }
    console.log("dropzone: " + targPos); // dropzone
    console.log("dropzone BackUp: " + this.dropzoneBackUp); // dropzoneBackUp

    if (targPos === undefined){
        alert("houston we have a problem");
        targPos = this.dropzoneBackUp;
            console.log("dropzone Fix: " + targPos); // dropzone

    }
    console.log("element put into: "  + this.dropzoneBackUp); // put into

    
    if( draggedPos+1 == targPos || draggedPos-1 == targPos || draggedPos+3 == targPos || draggedPos-3 == targPos){
                   console.log("your 3 coolest");

        if( targPos === dragValue ){
            console.log("your the coolest");
            
            this.arrBlocks[draggedPos -1 ].innerHTML = "FUCKER";
            
            this.arrBlocks[targPos - 1].innerHTML = "you";
            
            
            
            //console.log($(""));
            console.log(this.arrBlocks[targPos].id);

            
        }else{
            console.log("your not cool");
            var swapOutNode = $("[data-drop='"+targPos+"']")[0].childNodes[0],
                swapInNode = $("[data-drop='"+draggedPos+"']")[0].childNodes[0];
            
            $("[data-drop='"+draggedPos+"']")[0].childNodes[0].replaceWith(swapOutNode); 
            $("[data-drop='"+targPos+"']")[0].appendChild(swapInNode);
            

        }

    }else {
        console.log("Get out of here: " + ( draggedPos ));

    }
    
}
