const ATTACK_VALUE = 10;    //force with which user can atack
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;    //FORCE WITH WHICH MONSTER CAN ATTACK
const HEAL_VALUE = 20;

let chosenMaxValue = 100;
let currentMonsterHealth = chosenMaxValue ;
let currentPlayerHealth = chosenMaxValue ;
let hasBonusLife = true;

adjustHealthBars(chosenMaxValue);

function endRound(){
    const initailPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <=0 && hasBonusLife){  //land a bonus life to user (once only) if he is dead
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initailPlayerHealth;
        setPlayerHealth(initailPlayerHealth);
        alert('You would be dead but the bonus life saved you!');
    }

    if(currentMonsterHealth<=0 && currentPlayerHealth>0)
        alert('You won!');
    else if(currentPlayerHealth <=0 && currentMonsterHealth>0)
        alert('You Lost!');
    else if(currentMonsterHealth<=0 && currentPlayerHealth<=0)
        alert('You have a draw');
}

function attackMonster(modeOfAttack){
    let maxDamage;
    if(modeOfAttack === 'ATTACK')
    {      maxDamage = ATTACK_VALUE;    }
    else if(modeOfAttack === 'STRONG_ATTACK')
    {    maxDamage = STRONG_ATTACK_VALUE;    }

        const damage = dealMonsterDamage(maxDamage);
        currentMonsterHealth -= damage;
        endRound();
}


function attackHandler(){   //attack launched 
    attackMonster('ATTACK');
}

function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
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
    endRound();
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);