import inventory from "./inventory.ES6";

let arrInventory = Object.keys(inventory);

let foundations = arrInventory.filter(function (item) {
  return inventory[item].foundation;
});
let extras = arrInventory.filter(function (item) {
  return inventory[item].extra;
});
let proteins = arrInventory.filter(function (item) {
  return inventory[item].protein;
});
let dressings = arrInventory.filter(function (item) {
  return inventory[item].dressing;
});

class Salad {
  constructor(foundation, dressing, id) {
    this.foundation = foundation;
    this.proteins = [];
    this.extras = [];
    this.dressing = dressing;
    this.id = id;
  }

  add(newIngredient) {
    if (newIngredient !== undefined || newIngredient !== "") {
      switch (this.whatAmI(newIngredient)) {
        case "foundation":
          this.foundation = newIngredient;
          break;
        case "extra":
          this.extras.push(newIngredient);
          break;
        case "protein":
          this.proteins.push(newIngredient);
          break;
        case "dressing":
          this.dressing = newIngredient;
          break;
        default:
          return false;
      }
      return true;
    }
    return false;
  }

  remove(newIngredient) {
    if (newIngredient !== undefined || newIngredient !== "") {
      switch (this.whatAmI(newIngredient)) {
        case "foundation":
          this.foundation = "";
          break;
        case "extra":
          this.extras.splice(this.extras.indexOf(newIngredient), 1);
          break;
        case "protein":
          this.proteins.splice(this.proteins.indexOf(newIngredient), 1);
          break;
        case "dressing":
          this.dressing = "";
          break;
        default:
          return false;
      }
      return true;
    }
    return false;
  }

  static price() {
    let sumArray = [];

    sumArray.push(
      inventory[this.foundation] === undefined ||
        inventory[this.foundation] === ""
        ? 0
        : inventory[this.foundation].price
    );

    sumArray.push(
      inventory[this.dressing] === undefined || inventory[this.dressing] === ""
        ? 0
        : inventory[this.dressing].price
    );

    if (!(this.proteins === undefined) || !(this.proteins.length === 0)) {
      this.proteins.forEach(function (e) {
        sumArray.push(inventory[e].price);
      });
    }

    if (!(this.extras === undefined) || !(this.extras.length === 0)) {
      this.extras.forEach(function (e) {
        sumArray.push(inventory[e].price);
      });
    }

    return sumArray.reduce(function (acc, cur) {
      return acc + cur;
    });
  }

  whatAmI(ingredient) {
    if (
      foundations.find(function (item) {
        return item.localeCompare(ingredient) === 0;
      })
    ) ingredient = "foundation";
    else if (
      extras.find(function (item) {
        return item.localeCompare(ingredient) === 0;
      })
    ) ingredient = "extra";
    else if (
      proteins.find(function (item) {
        return item.localeCompare(ingredient) === 0;
      })
    ) ingredient = "protein";
    else if (
      dressings.find(function (item) {
        return item.localeCompare(ingredient) === 0;
      })
    ) ingredient = "dressing";
    else ingredient = "none";

    return ingredient;
  }

  toString() {
    let tempFoundation =
      this.foundation === undefined || this.foundation === ""
        ? ""
        : this.foundation;
    let tempDressing =
      this.dressing === undefined || this.dressing === "" ? "" : this.dressing;
    return (
      "This " +
      this.constructor.name +
      " contains:" +
      "\n" +
      "--------------------" +
      "\n" +
      "Foundation: " +
      tempFoundation +
      "\n" +
      "Proteins: " +
      this.proteins.join(", ") +
      "\n" +
      "Extras: " +
      this.extras.join(", ") +
      "\n" +
      "Dressing: " +
      tempDressing +
      "\n" +
      "Price: " +
      this.price() +
      "kr"
    );
  }

  getSetId(id) {
    if (id === undefined || id === "") {
        return this.id;
    }
    this.id = id;
  }
}

class ExtraGreenSalad extends Salad {
  price() {
    let sumArray = [];

    sumArray.push(
        ((inventory[this.foundation] === undefined || inventory[this.foundation] === "") ? 0 : inventory[this.foundation].price) * 1.3);

    sumArray.push(
      ((inventory[this.dressing] === undefined || inventory[this.dressing] === "") ? 0 : inventory[this.dressing].price) * 0.5);

    if (!(this.proteins === undefined) || !(this.proteins.length === 0)) {
      this.proteins.forEach(function (e) {
        sumArray.push(inventory[e].price * 0.5);
      });
    }

    if (!(this.extras === undefined) || !(this.extras.length === 0)) {
      this.extras.forEach(function (e) {
        sumArray.push(inventory[e].price * 0.5);
      });
    }

    return sumArray.reduce(function (acc, cur) {
      return acc + cur;
    });
  }
}

class GourmetSalad extends Salad {
  constructor(foundation, proteins, extras, dressing, founMul, dresMul) {
    super(foundation, proteins, extras, dressing);
    this.founMul = founMul;
    this.protMul = [];
    this.extMul = [];
    this.dresMul = dresMul;
  }

  add(newIngredient, amount) {
    if ((newIngredient !== undefined || newIngredient !== "") &&
      (amount !== undefined || amount !== "")) {
      switch (this.whatAmI(newIngredient)) {
        case "foundation":
          this.foundation = newIngredient;
          this.founMul = amount;
          break;
        case "extra":
          this.extras.push(newIngredient);
          this.extMul.push(amount);
          break;
        case "protein":
          this.proteins.push(newIngredient);
          this.protMul.push(amount);
          break;
        case "dressing":
          this.dressing = newIngredient;
          this.dresMul = amount;
          break;
        default:
          return false;
      }
      return true;
    }
    return false;
  }

  remove(newIngredient) {
    if (newIngredient !== undefined || newIngredient !== "") {
      switch (this.whatAmI(newIngredient)) {
        case "foundation":
          this.foundation = "none";
          break;
        case "extra":
          this.extMul.splice(this.extras.indexOf(newIngredient), 1);
          this.extras.splice(this.extras.indexOf(newIngredient), 1);
          break;
        case "protein":
          this.protMul.splice(this.protMul.indexOf(newIngredient), 1);
          this.proteins.splice(this.proteins.indexOf(newIngredient), 1);
          break;
        case "dressing":
          this.dressing = "none";
          break;
        default:
          return false;
      }
      return true;
    }
    return false;
  }

  price() {
    let sumArray = [];

    sumArray.push(
      (inventory[this.foundation] === undefined ||
      inventory[this.foundation] === ""
        ? 0
        : inventory[this.foundation].price) * this.founMul
    );

    sumArray.push(
      (inventory[this.dressing] === undefined || inventory[this.dressing] === ""
        ? 0
        : inventory[this.dressing].price) * this.dresMul
    );

    let tempM = this.protMul;
    let tempE = this.proteins;

    if (
      (!(tempE === undefined) || !(tempE.length === 0)) &&
      (!(tempM === undefined) || !(tempM.length === 0))
    ) {
      this.proteins.forEach(function (e) {
        sumArray.push(inventory[e].price * tempM[tempE.indexOf(e)]);
      });
    }

    tempM = this.extMul;
    tempE = this.extras;

    if (
      (!(tempE === undefined) || !(tempE.length === 0)) &&
      (!(tempM === undefined) || !(tempM.length === 0))
    ) {
      this.extras.forEach(function (e) {
        sumArray.push(inventory[e].price * tempM[tempE.indexOf(e)]);
      });
    }

    return sumArray.reduce(function (acc, cur) {
      return acc + cur;
    });
  }
}

// function ceasar() {
//   let myCeasarSalad = new Salad();
//   myCeasarSalad.add("Sallad");
//   myCeasarSalad.add("Kycklingfilé");
//   myCeasarSalad.add("Krutonger");
//   myCeasarSalad.add("Parmesan");
//   myCeasarSalad.add("Tomat");
//   myCeasarSalad.add("Fetaost");
//   myCeasarSalad.remove("Fetaost");
//   myCeasarSalad.add("Ceasardressing");
//   myCeasarSalad.toString();
// }

// function mysalad() {
//   let mySalad = new ExtraGreenSalad();
//   mySalad.add("Sallad");
//   mySalad.add("Kycklingfilé");
//   mySalad.add("Krutonger");
//   mySalad.add("Parmesan");
//   mySalad.add("Tomat");
//   mySalad.add("Ceasardressing");
//   mySalad.toString();
// }

// function gourmet_normal() {
//   let myGourmet_n = new GourmetSalad();
//   myGourmet_n.add("Sallad", 1.0);
//   myGourmet_n.add("Kycklingfilé", 1.0);
//   myGourmet_n.add("Krutonger", 1.0);
//   myGourmet_n.add("Parmesan", 1.0);
//   myGourmet_n.add("Tomat", 1.0);
//   myGourmet_n.add("Ceasardressing", 1.0);
//   myGourmet_n.toString();
// }

// function gourmet_extra() {
//   let myGourmet_e = new GourmetSalad();
//   myGourmet_e.add("Sallad", 1.3);
//   myGourmet_e.add("Kycklingfilé", 0.5);
//   myGourmet_e.add("Krutonger", 0.5);
//   myGourmet_e.add("Parmesan", 0.5);
//   myGourmet_e.add("Tomat", 0.5);
//   myGourmet_e.add("Ceasardressing", 0.5);
//   myGourmet_e.toString();
// }

export { Salad, ExtraGreenSalad, GourmetSalad };
