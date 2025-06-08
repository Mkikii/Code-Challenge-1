function calculateChaiIngredients(numberOfCups) {
  const waterPerCup = 200; // ml
  const milkPerCup = 50; // ml
  const teaLeavesPerCup = 1; // tablespoon
  const sugarPerCup = 2; // teaspoons

  const water = waterPerCup * numberOfCups;
  const milk = milkPerCup * numberOfCups;
  const teaLeaves = teaLeavesPerCup * numberOfCups;
  const sugar = sugarPerCup * numberOfCups;

  console.log(`To make ${numberOfCups} cups of Kenyan Chai, you will need:`);
  console.log(`Water: ${water} ml`);
  console.log(`Milk: ${milk} ml`);
  console.log(`Tea Leaves (Majani): ${teaLeaves} tablespoons`);
  console.log(`Sugar (Sukari): ${sugar} teaspoons`);
  console.log("Enjoy your Chai Bora!");
}