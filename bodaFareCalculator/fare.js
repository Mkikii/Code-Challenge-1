/**
 * Boda Boda Fare Estimator (Node.js Version)
 * Uses readline for terminal input in Node.js environment.
 */

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateBodaFare() {
  readline.question("Unafika wapi Mkubwa? Kilometer ngapi?: ", (userInput) => {
    // Validate input
    const distanceInKm = parseFloat(userInput);
    
    if (isNaN(distanceInKm) || distanceInKm <= 0) {
      console.log("Hiyo si sahihi! Tafadhali ingiza nambari halisi ya kilometa.");
      readline.close();
      return;
    }

    // Calculate fare
    const baseFare = 50;
    const perKmRate = 15;
    const totalFare = baseFare + (distanceInKm * perKmRate);

    // Display results
    console.log(`
Uko kwote? Io ni ${distanceInKm} km:
---------------------------------
Ukikalia Pikipiki: KES ${baseFare}
Mpaka Uko (${distanceInKm} km × KES ${perKmRate}): KES ${distanceInKm * perKmRate}
---------------------------------
Jumla: KES ${totalFare}

Panda Pikipiki! Safi nayo! 🛵`);

    readline.close();
  });
}

// Run the function
calculateBodaFare();