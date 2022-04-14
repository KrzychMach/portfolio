const button1 = document.getElementById('1');
const button2 = document.getElementById('2');
const button3 = document.getElementById('3');
const button4 = document.getElementById('4');
const button5 = document.getElementById('5');
const button6 = document.getElementById('6');
const button7 = document.getElementById('7');
const button8 = document.getElementById('8');
const button9 = document.getElementById('9');
let xoFlag = 0;
let winFlag = 0;
let drawFlag = 0;
let board = []
for (let i=0; i<3; i++){
    board[i] = [];
}

button1.addEventListener('click', () => {
    if (winFlag) return;
    if (drawFlag) return;
    if (button1.innerText !== '') return;
    addXO(1);
    checkWin();
    if (winFlag === 0) checkDraw();
});

button2.addEventListener('click', () => {
    if (winFlag) return;
    if (button2.innerText !== '') return;
    addXO(2);
    checkWin();
    if (winFlag === 0) checkDraw();
});

button3.addEventListener('click', () => {
    if (winFlag) return;
    if (button3.innerText !== '') return;
    addXO(3);
    checkWin();
    if (winFlag === 0) checkDraw();
});

button4.addEventListener('click', () => {
    if (winFlag) return;
    if (button4.innerText !== '') return;
    addXO(4);
    checkWin();
    if (winFlag === 0) checkDraw();
});

button5.addEventListener('click', () => {
    if (winFlag) return;
    if (button5.innerText !== '') return;
    addXO(5);
    checkWin();
    if (winFlag === 0) checkDraw();
});

button6.addEventListener('click', () => {
    if (winFlag) return;
    if (button6.innerText !== '') return;
    addXO(6);
    checkWin();
    if (winFlag === 0) checkDraw();
});

button7.addEventListener('click', () => {
    if (winFlag) return;
    if (button7.innerText !== '') return;
    addXO(7);
    checkWin();
    if (winFlag === 0) checkDraw();
});

button8.addEventListener('click', () => {
    if (winFlag) return;
    if (button8.innerText !== '') return;
    addXO(8);
    checkWin();
    if (winFlag === 0) checkDraw();
});

button9.addEventListener('click', () => {
    if (winFlag) return;
    if (button9.innerText !== '') return;
    addXO(9);
    checkWin();
    if (winFlag === 0) checkDraw();
});

function addXO (num) {
    let toAdd;
    if (xoFlag){
        toAdd = 'X';
        xoFlag = 0;
    } else {
        toAdd = 'O';
        xoFlag = 1;
    }
    switch (num){
        case 1:
            button1.innerText = toAdd;
            board[0][0] = toAdd;
            break;
        case 2:
            button2.innerText = toAdd;
            board[0][1] = toAdd;
            break;
        case 3:
            button3.innerText = toAdd;
            board[0][2] = toAdd;
            break;
        case 4:
            button4.innerText = toAdd;
            board[1][0] = toAdd;
            break;
        case 5:
            button5.innerText = toAdd;
            board[1][1] = toAdd;
            break;
        case 6:
            button6.innerText = toAdd;
            board[1][2] = toAdd;
            break;
        case 7:
            button7.innerText = toAdd;
            board[2][0] = toAdd;
            break;
        case 8:
            button8.innerText = toAdd;
            board[2][1] = toAdd;
            break;
        case 9:
            button9.innerText = toAdd;
            board[2][2] = toAdd;
            break;
        default: break;
    }
}

function checkWin(){
    for (let i=0; i<3; i++){
        if (board[i][1] === board[i][0] && board[i][1] === board[i][2]
            && board[i][1] !== undefined){
                let result = board[i][1] + ' wins!';
                window.alert(result);
                winFlag = 1;
            }
    }
    for (let j=0; j<3; j++){
        if (board[1][j] === board[0][j] && board[1][j] === board[2][j]
            && board[1][j] !== undefined){
                let result = board[1][j] + ' wins!';
                window.alert(result);
                winFlag = 1;
            }
    }
    if (board[1][1] === board[0][0] && board[1][1] === board[2][2]
        && board[1][1] !== undefined){
            let result = board[1][1] + ' wins!';
            window.alert(result);
            winFlag = 1;
        }
    if (board[1][1] === board[0][2] && board[1][1] === board[2][0]
        && board[1][1] !== undefined){
            let result = board[1][1] + ' wins!';
            window.alert(result);
            winFlag = 1;
        }
}

function checkDraw(){
    let sum = 0;
    for (let i=0; i<3; i++){
        for (let j=0; j<3; j++){
            if (board[i][j] !== undefined){
                sum++;
            }
        }
    }
    if (sum === 9){
        drawFlag = 1;
        window.alert('Draw!')
    }
}