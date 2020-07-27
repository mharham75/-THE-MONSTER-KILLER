const ATTACK_VALUE = 10;    //force with which user can atack
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;    //FORCE WITH WHICH MONSTER CAN ATTACK

let chosenMaxValue = 100;
let currentMonsterHealth = chosenMaxValue ;
let currentPlayerHealth = chosenMaxValue ;

adjustHealthBars(chosenMaxValue);


function attackHandler(){   //attack launched 
    const damage = dealMonsterDamage(ATTACK_VALUE);
        currentMonsterHealth -= damage;
        const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
        currentPlayerHealth -= playerDamage;
        if(currentMonsterHealth<=0 && currentPlayerHealth>0)
            alert('You won!');
        else if(currentPlayerHealth <=0 && currentMonsterHealth>0)
            alert('You Lost!');
        else if(currentMonsterHealth<=0 && currentPlayerHealth<=0)
            alert('You have a draw');
}

function strongAttackHandler(){
    const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
        currentMonsterHealth -= damage;
        const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
        currentPlayerHealth -= playerDamage;
        if(currentMonsterHealth<=0 && currentPlayerHealth>0)
            alert('You won!');
        else if(currentPlayerHealth <=0 && currentMonsterHealth>0)
            alert('You Lost!');
        else if(currentMonsterHealth<=0 && currentPlayerHealth<=0)
            alert('You have a draw');
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
