/**
 * Created by jpmllr89 on 5/26/17.
 */
var reset = function(){
    //generate new colors
    colors = generateRandomColors(numboxes);
    //pick a new random color from array.
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    condition.textContent = " ";
    //change colors on squares.
    for(var i = 0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.background = colors[i];
            squares[i].style.display = "block"
        }else{
            squares[i].style.display="none";
        }
    }
}
var randomColorGen = function(){
    var hexadec = "#"+Math.floor(Math.random()*16777215).toString(16);
    return hexadec;
}
var generateRandomColors = function(numboxes){
    //make array
    //add num colors to array
    //return array
    var arr =[]
    for(i=0; i<numboxes;i++){
        arr.push(randomColorGen());
    }
    return arr
}
var pickColor = function(){
    return colors[Math.floor(Math.random()*colors.length)];
}
var rgbToHex = function(a){

    //converts backgroundColor rgb to hex value
    a = a.slice(4,-1).split(",");
    b = [];

    for(var i=0; i<a.length; i++){
        b.push(parseInt(a[i]).toString(16));
    }
    for(var i=0; i<b.length; i++){
        if(b[i].length<2){
            b[i]=+"0"+b[i];
        }
    }
    // b = b.join("").toString()
    b = "#"+b[0].toString()+b[1].toString()+b[2].toString();
    return b;
}
var changeColors= function(color){
    for(var i = 0; i<squares.length; i++){
        squares[i].style.background = color
    }
    header.style.backgroundColor = color;
}
var initialize = function(){
    //diffbutton event listeners.
    for (var i = 0; i<difficulty.length; i++){
        difficulty[i].addEventListener("click", function(){
            difficulty[0].classList.remove('pushed');
            difficulty[1].classList.remove('pushed');
            this.classList.add("pushed");
            this.textContent ==="Easy" ? numboxes=3: numboxes=6;
            reset();

        })
    }
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function () {

            var clickedColor = rgbToHex(this.style.backgroundColor);
            console.log(clickedColor);
            if (clickedColor == pickedColor) {
                condition.textContent = "Correct!";
                changeColors(clickedColor);
                resetGame.textContent="Play Again?"
            } else {
                this.style.backgroundColor = "#222222";
                condition.textContent = "Try Again!";
            }
        })
    }
    reset();
}
var numboxes = 6;
var difficulty = document.querySelectorAll(".difficulty");
var colors = generateRandomColors(numboxes);
var squares = document.querySelectorAll("div.square");
var colorDisplay = document.getElementById("colorDisplay");
var condition =document.getElementById("condition");
var header = document.querySelector(".header");
var resetGame = document.querySelector("#newGame");
resetGame.addEventListener("click", function(){
    reset();
    //if content is "play again" change to New Colors.
    if(resetGame.textContent == "Play Again?"){
        resetGame.textContent = "New Colors";
        header.style.backgroundColor = "#1144ee";
        condition.textContent=" ";
    }
});
var pickedColor = pickColor();
colorDisplay.textContent = pickedColor;
initialize();