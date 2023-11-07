function isNumericString(number) {
    return /^\d+$/.test(number);
  }
  
function base62_encode(number) {
    if (!isNumericString(number)){
        return "请输入数字！";
    }
    
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const base = 62;
    let encoded = '';
  
    if (number === 0) {
      return '0';
    }
  
    while (number > 0) {
      const remainder = number % base;
      encoded = characters[remainder] + encoded;
      number = Math.floor(number / base);
    }
  
    return encoded;
  }
  
  function base62_decode(encoded) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const base = 62;
    let decoded = 0;
  
    for (let i = 0; i < encoded.length; i++) {
      const char = encoded[i];
      const value = characters.indexOf(char);
      decoded = decoded * base + value;
    }
  
    return decoded;
  }
  