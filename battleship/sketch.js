const boardSize = 10;

let board,
box_width,
box_height,
score,
clicked_board; // will keep track of which boxes have been clicked

function setup(){
    createCanvas(500,500);
    box_width = width/boardSize;
    box_height = height/boardSize;
    reset();
}

function draw(){
    drawBoard();
    displayScore();
}

/**
 * Draws the board to canvas.
 */
const drawBoard = function(){
    for(let i = 0; i < boardSize ; i++){
        for(let j = 0; j < boardSize ; j++){
            const x = i * box_width;
            const y = j * box_height;
            const box_is_a_ship = board[i][j];
            const clicked = clicked_board[i][j];
            if(clicked){
                if(box_is_a_ship){
                    fill("red");
                }else{
                    fill("black");
                }
            }else{
                fill("blue");
            }
            rect(x,y,box_width,box_height);
        }
    }
}

// Many ways of handling the mouse click!
function mousePressed(){
    const i = Math.floor(mouseX/box_width);
    // effectivley, converts the mouseX to the index of box 
    // Try using real values to check the math!
    const j = Math.floor(mouseY/box_height);

    if(!clicked_board[i][j]){
        // if box not already clicked
        // record it being clicked
        clicked_board[i][j] = true;

        if(board[i][j]){
            // if the box contains a "ship"
            // add a point
            score++;
        }
    }

    // if every box has been clicked, reset the board
    if(everythingClicked()){
        reset();
    }
}

/**
 * Returns true if every box is clicked, false otherwise.
 */
const everythingClicked = function(){
    return clicked_board.every(row=>row.every(block=>block));
}

/**
 * Draws the score on the canvas.
 */
const displayScore = function(){
    textSize(24);
    stroke("black");
    fill("purple");
    text(`Score: ${score}`, 10,30);
}

// Bonus - reseting board
/**
 * Resets state of the game.
 */
const reset = function(){
    score = 0;
    board = [];
    clicked_board = [];
    
    // 2-Dimension array of booleans representing if box contains
    // a ship or not
    for(let i = 0;i<boardSize;i++){
        board[i] = [];
        clicked_board[i] = [];
        for(let j = 0;j<boardSize;j++){
            // 10% chance of box being true (a "ship")
            board[i][j] = random() < .1; 
            clicked_board[i][j] = false;
        }
    }
}