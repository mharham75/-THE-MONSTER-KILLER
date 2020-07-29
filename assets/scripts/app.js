const ATTACK_VALUE = 10;    //force with which user can atack
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;    //FORCE WITH WHICH MONSTER CAN ATTACK
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_GAME_OVER = 'GAME_OVER' ;

const entertedValue = prompt('MAximum life for you and monster','100');

let chosenMaxValue = parseInt(entertedValue);
let battleLog = [] ;

let currentMonsterHealth = chosenMaxValue ;
let currentPlayerHealth = chosenMaxValue ;
let hasBonusLife = true;

if(isNaN(chosenMaxValue) || chosenMaxValue <=0){ //if user enters invalid number
    chosenMaxValue = 100;
}

adjustHealthBars(chosenMaxValue);

function writeToLog(event,value,monsterHealth,playerHealth){
    let logEntry ;
    if(event === LOG_EVENT_PLAYER_ATTACK){
        logEntry ={
            event : event,
            value : value,
            targer : 'MONSTER',
            finalMonsterHealth : monsterHealth,
            finalPlayerHealth : playerHealth
        };
    }
    else if(event === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry ={
            event : event,
            value : value,
            targer : 'MONSTER',
            finalMonsterHealth : monsterHealth,
            finalPlayerHealth : playerHealth
        };
    }
    else if(event === LOG_EVENT_PLAYER_HEAL){
        logEntry ={
            event : event,
            value : value,
            targer : 'MONSTER',
            finalMonsterHealth : monsterHealth,
            finalPlayerHealth : playerHealth
        };
    }
    else if(event === LOG_EVENT_MONSTER_ATTACK){
        logEntry ={
            event : event,
            value : value,
            targer : 'PLAYER',
            finalMonsterHealth : monsterHealth,
            finalPlayerHealth : playerHealth
        };
    }
    else if(event === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry ={
            event : event,
            value : value,
            targer : 'MONSTER',
            finalMonsterHealth : monsterHealth,
            finalPlayerHealth : playerHealth
        };
    }
    battleLog.push(logEntry);
}

function reset(){ //reset game once anyone dies
    currentMonsterHealth = chosenMaxValue ;
    currentPlayerHealth = chosenMaxValue ;
    resetGame(chosenMaxValue);
}

function endRound(){
    const initailPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);

    if(currentPlayerHealth <=0 && hasBonusLife){  //land a bonus life to user (once only) if he is dead
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initailPlayerHealth;
        setPlayerHealth(initailPlayerHealth);
        alert('You would be dead but the bonus life saved you!');
    }

    if(currentMonsterHealth<=0 && currentPlayerHealth>0){
        alert('You won!');
        writeToLog(LOG_EVENT_GAME_OVER,'you won',currentMonsterHealth,currentPlayerHealth);
    }
    else if(currentPlayerHealth <=0 && currentMonsterHealth>0){
        alert('You Lost!');
        writeToLog(LOG_EVENT_GAME_OVER,'you lost',currentMonsterHealth,currentPlayerHealth);
    }
    else if(currentMonsterHealth<=0 && currentPlayerHealth<=0){
        alert('You have a draw');
        writeToLog(LOG_EVENT_GAME_OVER,'draw',currentMonsterHealth,currentPlayerHealth);
    }   

    if(currentPlayerHealth <=0 || currentMonsterHealth <=0) 
        reset();
}

function attackMonster(modeOfAttack){
    let maxDamage;
    let logEvent;
    if(modeOfAttack === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    }
    else if(modeOfAttack === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }

        const damage = dealMonsterDamage(maxDamage);
        currentMonsterHealth -= damage;
        writeToLog(logEvent,damage,currentMonsterHealth,currentPlayerHealth);
        endRound();
}


function attackHandler(){   //attack launched 
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxValue-HEAL_VALUE){
        alert('You cant heal more than your max initial health');
        healValue = chosenMaxValue - currentPlayerHealth;
    }
    else{
            healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth +=HEAL_VALUE;
    writeToLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPlayerHealth);
    endRound();
}

function printLogHandler(){
    console.log(battleLog);
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);