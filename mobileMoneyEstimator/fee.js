/**
 * Mobile Money Transaction Fee Calculator
 * Uses Node.js readline for terminal input
 */

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const MIN_FEE = 10;
const MAX_FEE = 70;
const FEE_PERCENTAGE = 1.5;

function calculateFee(amount) {
  const calculatedFee = amount * (FEE_PERCENTAGE / 100);
  return Math.max(MIN_FEE, Math.min(calculatedFee, MAX_FEE));
}

function startCalculator() {
  readline.question('\x1b[36mUnatuma pesa ngapi? (KES): \x1b[0m', (input) => {
    const amount = parseFloat(input.replace(/,/g, ''));

    // Validate input
    if (isNaN(amount) || amount <= 0) {
      console.log('\x1b[31mTafadhali weka nambari sahihi!\x1b[0m\n');
      startCalculator(); // Retry
      return;
    }

    const fee = calculateFee(amount);
    const total = amount + fee;

    console.log(`
\x1b[32m▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  █                           █
  █   \x1b[33mRIPOTI YA MALIPO\x1b[32m      █
  █                           █
  █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
  
  \x1b[0mKiasi:       KES \x1b[35m${amount.toLocaleString('en-KE')}
  \x1b[0mAda (%${FEE_PERCENTAGE}):   KES \x1b[35m${fee.toFixed(2)}
  \x1b[0mJumla:       KES \x1b[35m${total.toLocaleString('en-KE', {minimumFractionDigits: 2})}
  
  \x1b[32mTuma kwa usalama!\x1b[0m 💵\n`);

    readline.question('\x1b[36mPress Enter to exit...\x1b[0m', () => {
      readline.close();
    });
  });
}

console.log('\x1b[34m\n=== M-Pesa Fee Calculator ===\x1b[0m');
startCalculator();