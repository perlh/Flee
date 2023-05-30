function base92_encode(input) {
    const charTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~";
    const base = 92;
    let output = '';
  
    let value = 0;
    let bitsRemaining = 0;
  
    for (let i = 0; i < input.length; i++) {
      value |= input.charCodeAt(i) << bitsRemaining;
      bitsRemaining += 8;
  
      while (bitsRemaining >= 6) {
        output += charTable[value % base];
        value = Math.floor(value / base);
        bitsRemaining -= 6;
      }
    }
  
    if (bitsRemaining > 0) {
      output += charTable[value % base];
    }
  
    return output;
  }
  
  function base92_decode(input) {
    const charTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~";
    const base = 92;
    let output = '';
  
    let value = 0;
    let bitsRemaining = 0;
  
    for (let i = 0; i < input.length; i++) {
      const charIndex = charTable.indexOf(input[i]);
      if (charIndex === -1) {
        throw new Error('Invalid input character');
      }
  
      value |= charIndex << bitsRemaining;
      bitsRemaining += 6;
  
      if (bitsRemaining >= 8) {
        output += String.fromCharCode(value & 0xff);
        value >>= 8;
        bitsRemaining -= 8;
      }
    }
  
    return output;
  }
  