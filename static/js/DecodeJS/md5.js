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
  