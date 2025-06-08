// Import Node.js readline module for user input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateChaiIngredients() {
    readline.question('Karibu! How many cups of Chai Bora would you like to make? ', (numberOfCups) => {
        // Convert input to number
        const cups = parseFloat(numberOfCups);
        
        // Calculate ingredients
        const water = 200 * cups;
        const milk = 50 * cups;
        const teaLeaves = cups;
        const sugar = 2 * cups;
        
        // Display results
        console.log(`\nTo make ${cups} cups of Kenyan Chai, you will need:`);
        console.log(`Water: ${water} ml`);
        console.log(`Milk: ${milk} ml`);
        console.log(`Tea Leaves (Majani): ${teaLeaves} tablespoons`);
        console.log(`Sugar (Sukari): ${sugar} teaspoons`);
        console.log("\nEnjoy your Chai Bora!");
        
        readline.close();
    });
}

// Run the function
calculateChaiIngredients();