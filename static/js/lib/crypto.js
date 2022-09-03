/*
// Des
// */
// //DES加密
// function encryptByDES(message, key){
//     var keyHex = CryptoJS.enc.Utf8.parse(key);
//     var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     return encrypted.ciphertext.toString();
// }
// //DES加密
// function decryptByDES(ciphertext, key){
//     var keyHex = CryptoJS.enc.Utf8.parse(key);
//     var decrypted = CryptoJS.DES.decrypt({
//         ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
//     }, keyHex, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     var result_value = decrypted.toString(CryptoJS.enc.Utf8);
//     return result_value;
// }






function mainEncode() {
    let select_id = $("#crypto-select").val();
    // 输入框
    let crypto_input = $("#crypto-input").val();
    // 输出狂
    var crypto_output = $("#crypto-output");
    // 清空输出框
    let key = $("#crypto-key").val();
    // 文本域初始化
    crypto_output.val("");
    switch (select_id) {
      case "0": {
        try {
          encode_data = CryptoJS.AES.encrypt(crypto_input, key).toString();
        } catch (error) {
          encode_data = error;
        }
        crypto_output.val(encode_data);
        break;
      }
      default:
        break;
    }
    //   alert("encode");
  }
  
  function mainDncode() {
    let select_id = $("#crypto-select").val();
    // 输入框
    let crypto_input = $("#crypto-input").val();
    // 输出狂
    var crypto_output = $("#crypto-output");
    // 清空输出框
    let key = $("#crypto-key").val();
    // 文本域初始化
    crypto_output.val("");
    switch (select_id) {
      case "0": {
        try {
          encode =  CryptoJS.AES.decrypt(crypto_input, key);
        } catch (error) {
          encode = error;
        }
        crypto_output.val(encode);
        break;
      }
      case "1":
        break;
      default:
        break;
    }
  }
  
  let button_encode = document.getElementById("button-encode");
  button_encode.onclick = mainEncode;
  
  let button_decode = document.getElementById("button-decode");
  button_decode.onclick = mainDncode;
  
//   alert(CryptoJS.SHA256("hello world"));

// alert(CryptoJS.DES.encrypt("Message", "Secret Passphrase"));
// alert(ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString());