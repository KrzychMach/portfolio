let lastRenderTime = 0;
const SPEED = 5;
const SNAKE_BODY = [
    {x: 11, y: 11},
];
const plansza = document.getElementById('plansza');
let inputDir = {x: 0, y: 0};
let food = {x: 5, y: 5};
const EXP_RATE = 1;
let newSegments = 0;
let gameOver = false;

function main(currentTime){
    if(gameOver){
        if (confirm("Przegrałeś. Wciśnij 'OK', aby spróbować ponownie.")){
            document.location.reload();
        }
        return;
    }

    window.requestAnimationFrame(main);
    
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1/SPEED) {return;}

    lastRenderTime = currentTime;

    update();
    draw(plansza);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => { //RUCH
    switch (e.key) {
        case 'ArrowUp':
            if (inputDir.y != 0) {break;}
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            if (inputDir.y != 0) {break;}
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            if (inputDir.x != 0) {break;}
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            if (inputDir.x != 0) {break;}
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})

function update() {
    //Żarcie
    if (onSnake(food)) {
        expandSnake(EXP_RATE);
        do {
            food = {
                x: Math.floor(Math.random() * 21) + 1,
                y: Math.floor(Math.random() * 21) + 1
                
            }
        } while (onSnake(food))
    }
    //Biały węgorz
    addSeg();
    for (let i = SNAKE_BODY.length - 2; i>=0; i--){
        SNAKE_BODY[i+1] = { ...SNAKE_BODY[i] };
    }
    SNAKE_BODY[0].x += inputDir.x;
    SNAKE_BODY[0].y += inputDir.y;
    //Śmierć
    checkDeath();
}

function draw(plansza) {
    plansza.innerHTML = '';
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    plansza.appendChild(foodElement);
    SNAKE_BODY.forEach(segment =>{
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        plansza.appendChild(snakeElement);
    })
}

function expandSnake(amount){
    newSegments += amount;
}

function onSnake(poz){
    return SNAKE_BODY.some(segment => {
        return equalPos(segment, poz);
    })
}

function equalPos(poz1, poz2){
    return (poz1.x == poz2.x && poz1.y == poz2.y);
}

function addSeg(){
    for (let i = 0; i < newSegments; i++){
        SNAKE_BODY.push({ ...SNAKE_BODY[SNAKE_BODY.length - 1] });
    }

    newSegments = 0;
}

function checkDeath(){
    gameOver = outsideGrid() || snakeIntersection();
}

function outsideGrid(){
    if (
        SNAKE_BODY[0].x < 1 ||
        SNAKE_BODY[0].x > 21 ||
        SNAKE_BODY[0].y < 1 ||
        SNAKE_BODY[0].y > 21
    ){
        return true;
    } else {
        return false;
    }
}

function snakeIntersection(){
    let f = false;
    for (let i = 1; i < SNAKE_BODY.length; i++){
        if (equalPos(SNAKE_BODY[0], SNAKE_BODY[i])){
            f = true;
        }
    }
    return f;
}