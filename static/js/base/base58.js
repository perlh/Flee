const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// Base58编码函数
function base58_encode(str) {
  const bytes = new TextEncoder().encode(str);
  let num = BigInt('0');
  let power = BigInt('1');

  for (let i = bytes.length - 1; i >= 0; i--) {
    const byteValue = BigInt(bytes[i]);
    num += byteValue * power;
    power *= BigInt('256');
  }

  let encoded = '';

  while (num > BigInt('0')) {
    const remainder = num % BigInt('58');
    num /= BigInt('58');
    encoded = ALPHABET[Number(remainder)] + encoded;
  }

  // Handle leading zeros
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === 0x00) {
      encoded = '1' + encoded;
    } else {
      break;
    }
  }

  return encoded;
}

// Base58解码函数
function base58_decode(str) {
  let num = BigInt('0');
  let power = BigInt('1');

  for (let i = str.length - 1; i >= 0; i--) {
    const charIndex = ALPHABET.indexOf(str[i]);
    num += BigInt(charIndex) * power;
    power *= BigInt('58');
  }

  const bytes = [];

  while (num > BigInt('0')) {
    const remainder = num % BigInt('256');
    num /= BigInt('256');
    bytes.unshift(Number(remainder));
  }

  // Handle leading ones
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '1') {
      bytes.unshift(0x00);
    } else {
      break;
    }
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}