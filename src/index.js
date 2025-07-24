const viem = require("viem");
const { privateKeyToAccount, privateKeyToAddress } = require("viem/accounts");

// Function to generate all 4-digit combinations of 0-9
function generateAll4DigitCombinations() {
    const combinations = [];
    
    // Generate all combinations from 0000 to 9999
    for (let i = 0; i <= 9999; i++) {
        // Pad with leading zeros to ensure 4 digits
        const combination = i.toString().padStart(4, '0');
        combinations.push(combination);
    }
    
    return combinations;
}


(async () => {
    const oneCTAddressPinToRecover = '';
    const privateKeyOfEOA = '';
    const eoa = ''
    
    const acccount = privateKeyToAccount(privateKeyOfEOA);
    console.log(acccount);
    
    const allCombinations = generateAll4DigitCombinations();
    
    console.log("\nTrying combinations with your existing logic...");
    for (let i = 0; i < allCombinations.length; i++) {
        const pin = allCombinations[i];
        const combined = String(eoa) + String(pin);
        const msgUint8 = new TextEncoder().encode(combined);
        const hash = viem.sha256(msgUint8);

        // get this hash signed by wallet
        const signed = await acccount.signMessage({ message: hash });

        const signedUint8 = new TextEncoder().encode(signed);
        const privateKey = viem.keccak256(signedUint8);
        const publicKey = privateKeyToAddress(privateKey);
        
        console.log(`PIN ${pin}: ${publicKey}`);
        
        
        // Check if this public key matches the target address
        if (publicKey.toLowerCase() === oneCTAddressPinToRecover.toLowerCase()) {
            console.log(`\nFOUND MATCHING PIN: ${pin}`);
            console.log(`Target address: ${oneCTAddressPinToRecover}`);
            console.log(`Generated address: ${publicKey}`);
            break;
        }
    }

    console.log("\nAll combinations generated successfully!");

})();