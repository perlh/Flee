// // utf-8编码
// function toUTF8(str) {
//     const chars = [...str];
//     const bytes = [];
//     for (let i = 0; i < chars.length; i++) {
//         const char = chars[i];
//         const code = char.codePointAt(0);
//         if (code > 0 && code < 0x7F) {
//             bytes.push(code)
//         } else if (code > 0x80 && code < 0x7FF) {
//             bytes.push((code >> 6) & 0x1f | 0xC0);
//             bytes.push(code & 0x3f | 0x80);  
//         } else if ((code > 0x800 && code < 0xFFFF) || (code > 0xE000 && code < 0xFFFF)) {
//             bytes.push((code >> 12) & 0x0f | 0xE0);
//             bytes.push((code >> 6) & 0x3f | 0x80);
//             bytes.push(code & 0x3f | 0x80); 
//         } else if (code > 0x10000 && code < 0x10FFFF) {
//             bytes.push((code >> 18) & 0x07 | 0xF0);
//             bytes.push((code >> 12) & 0x3f | 0x80);
//             bytes.push((code >> 6) & 0x3f | 0x80);
//             bytes.push(code & 0x3f | 0x80); 
//         } else if (code > 0x200000 && code < 0x3FFFFFF) {
//             bytes.push((code >> 24) & 0x03 | 0xF8);
//             bytes.push((code >> 18) & 0x3f | 0x80);
//             bytes.push((code >> 12) & 0x3f | 0x80);
//             bytes.push((code >> 6) & 0x3f | 0x80);
//             bytes.push(code & 0x3f | 0x80); 
//         } else {
//             bytes.push((code >> 30) & 0x01 | 0xFC);
//             bytes.push((code >> 24) & 0x3f | 0x80);
//             bytes.push((code >> 18) & 0x3f | 0x80);
//             bytes.push((code >> 12) & 0x3f | 0x80);
//             bytes.push((code >> 6) & 0x3f | 0x80);
//             bytes.push(code & 0x3f | 0x80); 
//         }
//     }
//     // console.log(bytes.map((char) => { return '0x' + char.toString(16)}));
//     return bytes;
// }

// function countByte(byte) {
//     let bytelen = 0;
//     while(byte & 0x80) {
//         bytelen++;
//         byte = (byte << 1) & 0xFF;
//     }
//     return bytelen || 1;
// }

// function fromUTF8(bytes) {
//     let i = 0;
//     const chars = [];
//     while(i < bytes.length) {
//         const byteLen = countByte(bytes[i]);
//         switch(byteLen) {
//             case 1:
//                 chars.push(String.fromCodePoint(bytes[i]));
//                 i += 1;
//                 break;
//             case 2:
//                 chars.push(String.fromCodePoint( (bytes[i] & 0x1F) << 6 | (bytes[i + 1] & 0x3F) ));
//                 i += 2;
//                 break;
//             case 3:
//                 chars.push(String.fromCodePoint( (bytes[i] & 0x0F) << 12 | (bytes[i + 1] & 0x3F) << 6| (bytes[i + 2] & 0x3F) ));
//                 i += 3;
//                 break;
//             case 4:
//                 chars.push(String.fromCodePoint( (bytes[i] & 0x07) << 18 | (bytes[i + 1] & 0x3F) << 12 | (bytes[i + 2] & 0x3F) << 6 | (bytes[i + 3] & 0x3F) ));
//                 i += 4;
//                 break;
//             case 5:
//                 chars.push(String.fromCodePoint( (bytes[i] & 0x03) << 24 | (bytes[i + 1] & 0x3F) << 18 | (bytes[i + 2] & 0x3F) << 12 | (bytes[i + 3] & 0x3F) << 6 | (bytes[i + 4] & 0x3F) ));
//                 i += 5;
//                 break;
//             case 6:
//                 chars.push(String.fromCodePoint( (bytes[i] & 0x01) << 30 | (bytes[i + 1] & 0x3F) << 24 | (bytes[i + 2] & 0x3F) << 18 | (bytes[i + 3] & 0x3F) << 12 | (bytes[i + 4] & 0x3F) << 6 | (bytes[i + 5] & 0x3F) ));
//                 i += 6;
//                 break;
//             default:
//                 throw new Error('invalid byte');
//         }
//     }
//     return chars.join('');
// }










var base64 = {
  table: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  utf8_en: function (str) {
    var str = str.replace(/\r\n/g, "\n");
    var utf = "";
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      if (code < 128) {
        utf += String.fromCharCode(code);
      } else if (code > 127 && code < 2048) {
        utf += String.fromCharCode((code >> 6) | 192);
        utf += String.fromCharCode((code & 63) | 128);
      } else {
        utf += String.fromCharCode((code >> 12) | 224);
        utf += String.fromCharCode(((code >> 6) & 63) | 128);
        utf += String.fromCharCode((code & 63) | 128);
      }
    }
    return utf;
  },
  utf8_de: function (str) {
    var utf = "";
    var n = 0;
    var code = (c1 = c2 = 0);
    while (n < str.length) {
      code = str.charCodeAt(n);
      if (code < 128) {
        utf += String.fromCharCode(code);
        n++;
      } else if (code > 191 && code < 224) {
        c2 = str.charCodeAt(n + 1);
        utf += String.fromCharCode(((code & 31) << 6) | (c2 & 63));
        n += 2;
      } else {
        c2 = str.charCodeAt(n + 1);
        c3 = str.charCodeAt(n + 2);
        utf += String.fromCharCode(
          ((code & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        n += 3;
      }
    }
    return utf;
  },
  utf8encode: function (str) {
    var str = base64.utf8_en(str);
    var u_b64 = base64.encode(str);
    return u_b64;
  },
  utf8decode: function (str) {
    var str = base64.decode(str);
    var u_b64 = base64.utf8_de(str);
    return u_b64;
  },
  encode: function (str) {
    var t_str = ""; //存储8位二进制
    var t_b64 = ""; //存储编码结果
    for (var i = 0; i < str.length; i++) {
      //转8位二进制
      t_str += str[i].charCodeAt().toString(2).lfill();
    }
    var leave = t_str.length % 6; //分组余数计算
    if (leave != 0) {
      //有余数时需要末尾补0
      for (var i = 0; i < 6 - leave; i++) {
        t_str += "0";
      }
    }
    for (var i = 0; i < Math.floor(t_str.length / 6); i++) {
      //编码结果存储
      t_b64 += base64.table[parseInt(t_str.substr(i * 6, 6), 2)];
    }
    t_b64 +=
      (t_str.length % 24) / 6 == 2
        ? "=="
        : (t_str.length % 24) / 6 == 3
        ? "="
        : ""; //空位补‘=’占位
    return t_b64;
  },
  decode: function (str) {
    var len = str.length;
    var t_code = 6 * len;
    if (str.substring(len - 1) == "=") {
      if (str.substring(len - 2) == "==") {
        //有两个'='，去12位
        t_code -= 12;
        len -= 2;
      } else {
        //有一个'='，去6位
        t_code -= 6;
        len -= 1;
      }
    }
    var b_b64 = "";
    for (var i = 0; i < len; i++) {
      b_b64 += base64.table.indexOf(str[i]).toString(2).lfill(6);
    }
    var d_b64 = "";
    for (var i = 0; i < Math.floor(t_code / 8); i++) {
      d_b64 += String.fromCharCode(parseInt(b_b64.substr(i * 8, 8), 2));
    }
    return d_b64;
  },
};
//test case
window.Base64 = base64;
window.be = base64.encode;
window.bd = base64.decode;
window.beu = base64.utf8encode;
window.bdu = base64.utf8decode;

String.prototype.lfill = function (num = undefined) {
  var len = this.length;
  var res = "";
  if (num == undefined) {
    if (len % 8 != 0) {
      for (let i = 0; i < 8 - (len % 8); i++) {
        res += "0";
      }
      res += this;
    } else {
      res = this.toString();
    }
  } else {
    if (num < len) {
      console.error(
        "Uncaught RangeError: String.lfill() radix argument must more than String.length."
      );
    } else {
      for (let i = 0; i < num - len; i++) {
        res += "0";
      }
      res += this;
    }
  }
  return res;
};
String.prototype.rfill = function (num = undefined) {
  var len = this.length;
  var res = this.toString();
  if (num == undefined) {
    if (len % 8 != 0) {
      for (let i = 0; i < 8 - (len % 8); i++) {
        res += "0";
      }
    } else {
      res = res;
    }
  } else {
    if (num < len) {
      console.error(
        "Uncaught RangeError: String.rfill() radix argument must more than String.length."
      );
    } else {
      for (let i = 0; i < num - len; i++) {
        res += "0";
      }
    }
  }
  return res;
};

/********************************************
 * Title:    MD5
 * Date:     2022-2-8 22:01:30
 * Version:  v1.0.0
 * Author:   Bencky1017
 * Describe: MD5 Encode without UTF-8 unicode
 *
 * https://github.com/bencky1017/crypto
 ********************************************/
function mdbk(string) {
  //algorithm=undefined
  return array2hex(calc_md5(str2array(string), string.length * 8, "0"));
}
function md5(string) {
  return array2hex(calc_md5(str2array(string), string.length * 8, "1"));
}
function calc_md5(str, len, flag) {
  // 此处的len为位长度len=length*8
  // 附加填充 信息后加入小端字节0x80(1000 0000)后填充0至448位
  // 加上原信息长度后填充0至512位
  str[len >> 5] |= 0x80 << len % 32;
  str[(((len + 64) >>> 9) << 4) + 14] = len;

  if (flag == "0") {
    // mdbk 初始参数 模E算法
    var a = 0x97504812; //内存中为 12 48 50 97;
    var b = 0xfedcba36; //内存中为 36 ba dc fe;
    var c = 0x63abcdef; //内存中为 ef cd ab 63;
    var d = 0x21840579; //内存中为 79 05 84 21;
  } else if (flag == "1") {
    var a = 0x67452301; //内存中为 01 23 45 67;
    var b = 0xefcdab89; //内存中为 89 ab cd ef;
    var c = 0x98badcfe; //内存中为 fe dc ba 98;
    var d = 0x10325476; //内存中为 76 54 32 10;
  }

  // 4个128位链接变量a,b,c,d
  // var a=0x67452301 | 0X00;	//内存中为 01 23 45 67;
  // var b=0xefcdab89 | 0X00;	//内存中为 89 ab cd ef;
  // var c=0x98badcfe | 0X00;	//内存中为 fe dc ba 98;
  // var d=0x10325476 | 0X00;	//内存中为 76 54 32 10;

  // Mj表示这一组信息的第j个子分组
  var M = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  // s数据位二维数组，计算方法未知
  var s = [
    [7, 12, 17, 22],
    [5, 9, 14, 20],
    [4, 11, 16, 23],
    [6, 10, 15, 21],
  ];
  // ti计算公式：Math.floor(Math.sin(i)*Math.pow(2,32)).toString(16);	i∈[0,64)
  var t = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
    0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
    0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
    0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
    0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
    0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ];

  for (var i = 0; i < str.length; i += 16) {
    var A = a; // 暂存原数据
    var B = b; // 暂存原数据
    var C = c; // 暂存原数据
    var D = d; // 暂存原数据

    //  FF(a, b, c, d, str[i+ j], s[0][j], t[64]);
    a = FF(a, b, c, d, str[i + 0], s[0][0], t[0]);
    d = FF(d, a, b, c, str[i + 1], s[0][1], t[1]);
    c = FF(c, d, a, b, str[i + 2], s[0][2], t[2]);
    b = FF(b, c, d, a, str[i + 3], s[0][3], t[3]);
    a = FF(a, b, c, d, str[i + 4], s[0][0], t[4]);
    d = FF(d, a, b, c, str[i + 5], s[0][1], t[5]);
    c = FF(c, d, a, b, str[i + 6], s[0][2], t[6]);
    b = FF(b, c, d, a, str[i + 7], s[0][3], t[7]);
    a = FF(a, b, c, d, str[i + 8], s[0][0], t[8]);
    d = FF(d, a, b, c, str[i + 9], s[0][1], t[9]);
    c = FF(c, d, a, b, str[i + 10], s[0][2], t[10]);
    b = FF(b, c, d, a, str[i + 11], s[0][3], t[11]);
    a = FF(a, b, c, d, str[i + 12], s[0][0], t[12]);
    d = FF(d, a, b, c, str[i + 13], s[0][1], t[13]);
    c = FF(c, d, a, b, str[i + 14], s[0][2], t[14]);
    b = FF(b, c, d, a, str[i + 15], s[0][3], t[15]);

    //  GG(a, b, c, d, str[5j+1], s[1][j], t[64]);
    a = GG(a, b, c, d, str[i + 1], s[1][0], t[16]);
    d = GG(d, a, b, c, str[i + 6], s[1][1], t[17]);
    c = GG(c, d, a, b, str[i + 11], s[1][2], t[18]);
    b = GG(b, c, d, a, str[i + 0], s[1][3], t[19]);
    a = GG(a, b, c, d, str[i + 5], s[1][0], t[20]);
    d = GG(d, a, b, c, str[i + 10], s[1][1], t[21]);
    c = GG(c, d, a, b, str[i + 15], s[1][2], t[22]);
    b = GG(b, c, d, a, str[i + 4], s[1][3], t[23]);
    a = GG(a, b, c, d, str[i + 9], s[1][0], t[24]);
    d = GG(d, a, b, c, str[i + 14], s[1][1], t[25]);
    c = GG(c, d, a, b, str[i + 3], s[1][2], t[26]);
    b = GG(b, c, d, a, str[i + 8], s[1][3], t[27]);
    a = GG(a, b, c, d, str[i + 13], s[1][0], t[28]);
    d = GG(d, a, b, c, str[i + 2], s[1][1], t[29]);
    c = GG(c, d, a, b, str[i + 7], s[1][2], t[30]);
    b = GG(b, c, d, a, str[i + 12], s[1][3], t[31]);

    //  HH(a, b, c, d, str[3i+5], s[2][j], t[64]);
    a = HH(a, b, c, d, str[i + 5], s[2][0], t[32]);
    d = HH(d, a, b, c, str[i + 8], s[2][1], t[33]);
    c = HH(c, d, a, b, str[i + 11], s[2][2], t[34]);
    b = HH(b, c, d, a, str[i + 14], s[2][3], t[35]);
    a = HH(a, b, c, d, str[i + 1], s[2][0], t[36]);
    d = HH(d, a, b, c, str[i + 4], s[2][1], t[37]);
    c = HH(c, d, a, b, str[i + 7], s[2][2], t[38]);
    b = HH(b, c, d, a, str[i + 10], s[2][3], t[39]);
    a = HH(a, b, c, d, str[i + 13], s[2][0], t[40]);
    d = HH(d, a, b, c, str[i + 0], s[2][1], t[41]);
    c = HH(c, d, a, b, str[i + 3], s[2][2], t[42]);
    b = HH(b, c, d, a, str[i + 6], s[2][3], t[43]);
    a = HH(a, b, c, d, str[i + 9], s[2][0], t[44]);
    d = HH(d, a, b, c, str[i + 12], s[2][1], t[45]);
    c = HH(c, d, a, b, str[i + 15], s[2][2], t[46]);
    b = HH(b, c, d, a, str[i + 2], s[2][3], t[47]);

    //  II(a, b, c, d, str[7 *i], s[3][j], t[64]);
    a = II(a, b, c, d, str[i + 0], s[3][0], t[48]);
    d = II(d, a, b, c, str[i + 7], s[3][1], t[49]);
    c = II(c, d, a, b, str[i + 14], s[3][2], t[50]);
    b = II(b, c, d, a, str[i + 5], s[3][3], t[51]);
    a = II(a, b, c, d, str[i + 12], s[3][0], t[52]);
    d = II(d, a, b, c, str[i + 3], s[3][1], t[53]);
    c = II(c, d, a, b, str[i + 10], s[3][2], t[54]);
    b = II(b, c, d, a, str[i + 1], s[3][3], t[55]);
    a = II(a, b, c, d, str[i + 8], s[3][0], t[56]);
    d = II(d, a, b, c, str[i + 15], s[3][1], t[57]);
    c = II(c, d, a, b, str[i + 6], s[3][2], t[58]);
    b = II(b, c, d, a, str[i + 13], s[3][3], t[59]);
    a = II(a, b, c, d, str[i + 4], s[3][0], t[60]);
    d = II(d, a, b, c, str[i + 11], s[3][1], t[61]);
    c = II(c, d, a, b, str[i + 2], s[3][2], t[62]);
    b = II(b, c, d, a, str[i + 9], s[3][3], t[63]);

    a = add(A, a);
    b = add(B, b);
    c = add(C, c);
    d = add(D, d);
  }
  return Array(a, b, c, d);
}

// 这些函数实现算法使用的四个基本操作。
function F(X, Y, Z) {
  return (X & Y) | (~X & Z);
}
function G(X, Y, Z) {
  return (X & Z) | (Y & ~Z);
}
function H(X, Y, Z) {
  return X ^ Y ^ Z;
}
function I(X, Y, Z) {
  return Y ^ (X | ~Z);
}

// 计算返回 a = b + ((a + F(b,c,d) + M + t) << s);
function FF(a, b, c, d, M, s, t) {
  return add(b, move(add(add(a, F(b, c, d)), add(M, t)), s));
}
function GG(a, b, c, d, M, s, t) {
  return add(b, move(add(add(a, G(b, c, d)), add(M, t)), s));
}
function HH(a, b, c, d, M, s, t) {
  return add(b, move(add(add(a, H(b, c, d)), add(M, t)), s));
}
function II(a, b, c, d, M, s, t) {
  return add(b, move(add(add(a, I(b, c, d)), add(M, t)), s));
}

// 无符号相加
function add(x, y) {
  var lh = (x & 0xffff) + (y & 0xffff);
  var mh = (x >> 16) + (y >> 16) + (lh >> 16);
  return (mh << 16) | (lh & 0xffff);
}

// 按位向左环移一个32位数字。
function move(str, s) {
  return (str << s) | (str >>> (32 - s));
}

// 将字符串转换为小端字节数组
function str2array(str) {
  var arr = Array();
  var mask = (1 << 8) - 1;
  for (var i = 0; i < str.length * 8; i += 8) {
    arr[i >> 5] |= (str.charCodeAt(i / 8) & mask) << i % 32;
  }
  return arr;
}

// 将小端字节数组转换为十六进制字符串。
function array2hex(arr) {
  var hexcase = 0; //字符串大小写，0为小写，1为大写
  var hex = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for (var i = 0; i < arr.length * 4; i++) {
    str +=
      hex.charAt((arr[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
      hex.charAt((arr[i >> 2] >> ((i % 4) * 8)) & 0xf);
  }
  return str;
}

//将16进制转为 字符串
function hexToString(str) {
  var val = "",
    len = str.length / 2;
  for (var i = 0; i < len; i++) {
    val += String.fromCharCode(parseInt(str.substr(i * 2, 2), 16));
  }
  console.log(val, "16进制转字符串");
  return this.utf8to16(val);
}
//处理中文乱码问题
function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        out += str.charAt(i - 1);
        break;
      case 12:
      case 13:
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        );
        break;
    }
  }

  console.log(out, "out");
  return out;
}

// 字符转16进制
function strToUtf8Bytes(str) {
  const utf8 = [];
  for (let ii = 0; ii < str.length; ii++) {
    let charCode = str.charCodeAt(ii);
    if (charCode < 0x80) utf8.push(charCode);
    else if (charCode < 0x800) {
      utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      utf8.push(
        0xe0 | (charCode >> 12),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      );
    } else {
      ii++;
      charCode =
        0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
      utf8.push(
        0xf0 | (charCode >> 18),
        0x80 | ((charCode >> 12) & 0x3f),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      );
    }
  }
  //兼容汉字，ASCII码表最大的值为127，大于127的值为特殊字符
  for (let jj = 0; jj < utf8.length; jj++) {
    var code = utf8[jj];
    if (code > 127) {
      utf8[jj] = code - 256;
    }
  }
  return utf8;
}
function strToHexCharCode(str) {
  var hexCharCode = [];
  var chars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  for (var i = 0; i < str.length; i++) {
    var bit = (str[i] & 0x0f0) >> 4;
    hexCharCode.push(chars[bit]);
    var bit = str[i] & 0x0f;
    hexCharCode.push(chars[bit]);
  }
  return hexCharCode.join("");
}

// unicode
function leftZero(str) {
  if (str != null && str != "" && str != "undefined") {
    if (str.length == 2) {
      return `00${str}`;
    }
  }
  return str;
}
function unicode(str) {
  let value = "";
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line radix
    value += `\\u${leftZero(parseInt(str.charCodeAt(i)).toString(16))}`;
  }
  return value;
}

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
}

// ============== Main ==============

function clearForm() {
  $("#md5_output").empty();
  $("#base64_output").empty();
  $("#url_output").empty();
  $("#char_and_16_output").empty();
  $("#unicode_output").empty();
}

// 编码主函数
function mainEncode() {
  clearForm();
  var str = $("#input_text").val();
  // md5
  try {
    var str_md5 = md5(str);
  } catch(error){
    var decodeString = error.name;
  } finally {
    $("#md5_output").text(str_md5);
  }

  // base64
  var decodeStringBase64 = base64.encode(str);
  $("#base64_output").text(decodeStringBase64);

  // url编码
  $("#url_output").text(encodeURIComponent(str));
  // alert(Encode_text);

  try {
    var decodeString = strToHexCharCode(strToUtf8Bytes(str));
  } catch(error){
    var decodeString = error.name;
  } finally {
    $("#char_and_16_output").text(decodeString);
  }
  try {
    var decodeString = unicode(str);
  } catch(error){
    var decodeString = error.name;
  } finally {
    $("#unicode_output").text(decodeString);
  }

  // utf-8
  try {
    var str_utf_8 = escape(str).replace(/(%u)(\w{4})/gi, "&#x$2;");;
  } catch(error){
    var decodeString = error.name;
  } finally {
    $("#utf-8_output").text(str_utf_8);
  }
}

// 解码主函数
/*

*/
function mainDecode() {
  clearForm();
  var str = $("#input_text").val();
  // base64
  try {
    var decodeString = base64.decode(str);
  } catch(error){
    var decodeString = error.name;
  } finally {
    $("#base64_output").text(decodeString);
  }

  $("#url_output").text(decodeURIComponent(str));

  //
  // 16-char
  try {
    // convertedTenVal = parseInt(str, 16);
    var str_md5 = hexToString(str);
  } catch(error){
    var decodeString = error.name;
  } finally {
    $("#char_and_16_output").text(str_md5);
  }
  // unicode
  try {
    var str_unicode = unicodeToChar(str);
  } catch(error){
    var decodeString = error.name;
  } finally {
    $("#unicode_output").text(str_unicode);
  }


   // utf-8
   try {
    var str_utf_8 = unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''));;
  } catch(error){
    var decodeString = error.name;
  } finally {
    $("#utf-8_output").text(str_utf_8);
  }
//   console.log(fromUTF8(toUTF8('hello')));
//   console.log(fromUTF8(toUTF8('你好')));
  //   decodeURIComponent(x);
}

let btnClick = document.getElementById("onButtonDecode");
btnClick.onclick = mainDecode;

let btnClick2 = document.getElementById("onButtonEncode");
btnClick2.onclick = mainEncode;
