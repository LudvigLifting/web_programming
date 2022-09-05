'use strict';
const imported = require("./inventory.js");

let arrInventory = Object.keys(imported.inventory);
//console.log(arrInventory);

let foundations = arrInventory.filter(function (item) {
    return imported.inventory[item].foundation
});
let extras = arrInventory.filter(function (item) {
    return imported.inventory[item].extra;
});
let proteins = arrInventory.filter(function (item) {
    return imported.inventory[item].protein;
});
let dressings = arrInventory.filter(function (item) {
    return imported.inventory[item].dressing;
});

let output = 'Foundations: ' + foundations.join(', ') + '\n' +
    'Proteins: ' + proteins.join(', ') + '\n' +
    'Extras: ' + extras.join(', ') + '\n' +
    'Dressings: ' + dressings.join(', ') + '\n';
console.log(output);

class Salad {

    constructor(foundation, proteins, dressing) {
        this.foundation = foundation;
        this.proteins = proteins;
        this.extras = [];
        this.dressing = dressing;
    }

    add(newIngredient) {
        switch (this.whatAmI(newIngredient)) {
            case 'foundation':
                this.foundation = newIngredient;
                break;
            case 'extra':
                this.extras.push(newIngredient);
                break;
            case 'protein':
                this.proteins = newIngredient;
                break;
            case 'dressing':
                this.dressing = newIngredient;
                break;
            default:
                console.log('Ingredient does not exist');
                return false;
        }
        return true;
    }

    remove(newIngredient) {
        switch (this.whatAmI(newIngredient)) {
            case 'foundation':
                this.foundation = 'none';
                break;
            case 'extra':
                this.extras.splice(this.extras.indexOf(newIngredient), 1);
                break;
            case 'protein':
                this.proteins = 'none';
                break;
            case 'dressing':
                this.dressing = 'none';
                break;
            default:
                console.log('Ingredient does not exist');
                return false;
        }
        return true;
    }

    price() {
        let sumArray = [];

        sumArray.push(imported.inventory[this.foundation].price);

        sumArray.push(imported.inventory[this.proteins].price);

        sumArray.push(imported.inventory[this.dressing].price);

        this.extras.forEach(function (e) {
            sumArray.push(imported.inventory[e].price);
        });

        return sumArray.reduce(function (acc, cur) {
            return acc + cur;
        });
    }

    whatAmI(ingredient) {
        if (foundations.find(function (item) {
            return item.localeCompare(ingredient) === 0;
        })) ingredient = 'foundation';
        else if (extras.find(function (item) {
            return item.localeCompare(ingredient) === 0;
        })) ingredient = 'extra';
        else if (proteins.find(function (item) {
            return item.localeCompare(ingredient) === 0;
        })) ingredient = 'protein';
        else if (dressings.find(function (item) {
            return item.localeCompare(ingredient) === 0;
        })) ingredient = 'dressing';
        else ingredient = 'none';

        return ingredient;
    }

    toString() {
        console.log('This ' + this.constructor.name + ' contains:');
        console.log('--------------------');
        console.log('Foundation: ' + this.foundation);
        console.log('Proteins: ' + this.proteins);
        console.log('Extras: ' + this.extras.join(', '));
        console.log('Dressing: ' + this.dressing);
        console.log('Price: ' + this.price() + 'kr' + '\n');
    }
}

class ExtraGreenSalad extends Salad {

    price() {
        let sumArray = [];

        sumArray.push(imported.inventory[this.foundation].price * 1.3);

        sumArray.push(imported.inventory[this.proteins].price * .5);

        sumArray.push(imported.inventory[this.dressing].price * .5);

        this.extras.forEach(function (e) {
            sumArray.push(imported.inventory[e].price * .5);
        });

        return sumArray.reduce(function (acc, cur) {
            return acc + cur;
        });
    }
}

class GourmetSalad extends Salad {

    constructor(foundation, proteins, extras, dressing, founMul, protMul, dresMul) {
        super(foundation, proteins, extras, dressing);
        this.founMul = founMul;
        this.protMul = protMul;
        this.extMul = [];
        this.dresMul = dresMul;
    }

    add(newIngredient, amount) {
        switch (this.whatAmI(newIngredient)) {
            case 'foundation':
                this.foundation = newIngredient;
                this.founMul = amount;
                break;
            case 'extra':
                this.extras.push(newIngredient);
                this.extMul.push(amount);
                break;
            case 'protein':
                this.proteins = newIngredient;
                this.protMul = amount;
                break;
            case 'dressing':
                this.dressing = newIngredient;
                this.dresMul = amount;
                break;
            default:
                console.log('Ingredient does not exist');
                return false;
        }
        return true;
    }

    remove(newIngredient) {
        switch (this.whatAmI(newIngredient)) {
            case 'foundation':
                this.foundation = 'none';
                break;
            case 'extra':
                this.extMul.splice(this.extras.indexOf(newIngredient), 1);
                this.extras.splice(this.extras.indexOf(newIngredient), 1);
                break;
            case 'protein':
                this.proteins = 'none';
                break;
            case 'dressing':
                this.dressing = 'none';
                break;
            default:
                console.log('Ingredient does not exist');
                return false;
        }
        return true;
    }

    price() {
        let sumArray = [];

        sumArray.push(imported.inventory[this.foundation].price * this.founMul);

        sumArray.push(imported.inventory[this.proteins].price * this.protMul);

        sumArray.push(imported.inventory[this.dressing].price * this.dresMul);

        let tempM = this.extMul;
        let tempE = this.extras;
        this.extras.forEach(function (e) {
            sumArray.push(imported.inventory[e].price * tempM[tempE.indexOf(e)]);
        });

        return sumArray.reduce(function (acc, cur) {
            return acc + cur;
        });
    }
}

function ceasar() {
    let myCeasarSalad = new Salad();
    myCeasarSalad.add('Sallad');
    myCeasarSalad.add('Kycklingfilé');
    myCeasarSalad.add('Krutonger');
    myCeasarSalad.add('Parmesan');
    myCeasarSalad.add('Tomat');
    myCeasarSalad.add('Fetaost');
    myCeasarSalad.remove('Fetaost');
    myCeasarSalad.add('Ceasardressing');
    myCeasarSalad.toString();
}

function mysalad() {
    let mySalad = new ExtraGreenSalad();
    mySalad.add('Sallad');
    mySalad.add('Kycklingfilé');
    mySalad.add('Krutonger');
    mySalad.add('Parmesan');
    mySalad.add('Tomat');
    mySalad.add('Ceasardressing');
    mySalad.toString();
}

function gourmet_normal() {
    let myGourmet_n = new GourmetSalad();
    myGourmet_n.add('Sallad', 1.0);
    myGourmet_n.add('Kycklingfilé', 1.0);
    myGourmet_n.add('Krutonger', 1.0);
    myGourmet_n.add('Parmesan', 1.0);
    myGourmet_n.add('Tomat', 1.0);
    myGourmet_n.add('Ceasardressing', 1.0);
    myGourmet_n.toString();
}

function gourmet_extra() {
    let myGourmet_e = new GourmetSalad();
    myGourmet_e.add('Sallad', 1.3);
    myGourmet_e.add('Kycklingfilé', .5);
    myGourmet_e.add('Krutonger', .5);
    myGourmet_e.add('Parmesan', .5);
    myGourmet_e.add('Tomat', .5);
    myGourmet_e.add('Ceasardressing', .5);
    myGourmet_e.toString();
}

ceasar();
mysalad();
gourmet_normal();
gourmet_extra();
