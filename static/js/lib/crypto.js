function mainEncode() {
    let select_id = $("#crypto-select").val();
    // 输入框
    let crypto_input = $("#crypto-input").val();
    // 输出狂
    var crypto_output = $("#crypto-output");
    // 清空输出框
    let key = $("#crypto-key").val();
    // 文本域初始化

    if(key == "" ||crypto_input=="" ){
      crypto_output.val("null");
      return 
    }

    let crypto_mode = $("#crypto-mode").val();
    let crypto_padding = $("#crypto-padding").val();
    let crypto_iv = $("#crypto-iv").val();
    crypto_output.val("");
    switch (select_id) {
      case "0": {
        try{
          encode_data = EncryptAES(crypto_input,key,crypto_mode,crypto_padding,crypto_iv)
          // var encode_data = CryptoJS.DES.encrypt("Message", "Secret Passphrase");
        }catch(error){
          encode_data = error;
        }
        crypto_output.val(encode_data);
        break;
      }
      case "1": {
        try{

          encode_data = encryptByDES(crypto_input,key,crypto_mode,crypto_padding,crypto_iv)
          // var encode_data = CryptoJS.DES.encrypt("Message", "Secret Passphrase");
        }catch(error){
          encode_data = error;
        }
        crypto_output.val(encode_data);
        break;
      }
      default:
        break;
    }
}
  
  // 解密函数
function mainDncode() {
  // 得到
  let select_id = $("#crypto-select").val();
  // 输入框
  let crypto_input = $("#crypto-input").val();
  // 输出狂
  var crypto_output = $("#crypto-output");
  // 得到密钥
  let key = $("#crypto-key").val();

  if(key == "" ||crypto_input==""){
    crypto_output.val("null");
    return 
  }

  let crypto_mode = $("#crypto-mode").val();
  let crypto_padding = $("#crypto-padding").val();
  let crypto_iv = $("#crypto-iv").val();
  // 文本域初始化
  crypto_output.val("");
  switch (select_id) {
    case "0": {
      try {  
        alert(crypto_input) 
        decryptedFromText = DecryptAES(crypto_input,key,crypto_mode,crypto_padding,crypto_iv)
        alert(decryptedFromText)
      } catch (error) {
        decryptedFromText = error;
      }
      crypto_output.val(decryptedFromText);
      break;
    }
    case "1": {
      try {   
        decryptedFromText = decryptByDES(crypto_input,key,crypto_mode,crypto_padding,crypto_iv)
        // alert(decryptedFromText)
      } catch (error) {
        decryptedFromText = error;
      }
      crypto_output.val(decryptedFromText);
      break;
    }
    
    default:
      break;
  }
}

let button_encode = document.getElementById("button-encode");
button_encode.onclick = mainEncode;

let button_decode = document.getElementById("button-decode");
button_decode.onclick = mainDncode;

//DES加密
function encryptByDES(message, key,mode,padding,iv){
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  mode_finally = CryptoJS.mode.ECB
  if(mode == "ECB"){
    mode_finally = CryptoJS.mode.ECB
  }else if(mode=="CBC"){
    mode_finally = CryptoJS.mode.CBC
  }else if(mode=="CFB"){
    mode_finally = CryptoJS.mode.CFB
  }else if(mode=="CTR"){
    mode_finally = CryptoJS.mode.CTR
  }else if(mode=="OFB"){
    mode_finally = CryptoJS.mode.OFB
  }

  padding_finally =CryptoJS.pad.Pkcs7
  if(padding == "Pkcs7"){
    padding_finally =CryptoJS.pad.Pkcs7
  }else if(padding=="Iso97971"){
    padding_finally =CryptoJS.pad.Iso97971
  }else if(padding=="AnsiX923"){
    padding_finally =CryptoJS.pad.AnsiX923
  }else if(padding=="Iso10126"){
    padding_finally =CryptoJS.pad.Iso10126
  }else if(padding=="ZeroPadding"){
    padding_finally =CryptoJS.pad.ZeroPadding
  }else if(padding=="NoPadding"){
    padding_finally =CryptoJS.pad.NoPadding
  }
  

  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      iv: iv,
      mode: mode_finally,
      padding: padding_finally
  });
  return encrypted.ciphertext.toString();
}
//DES加密
function decryptByDES(ciphertext, key,mode,padding,iv){
  ciphertext = (ciphertext + '').replace(/\n*$/g, '').replace(/\n/g, ''); //增加这一行，将换行符替换为空
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);


  mode_finally = CryptoJS.mode.ECB
  if(mode == "ECB"){
    mode_finally = CryptoJS.mode.ECB
  }else if(mode=="CBC"){
    mode_finally = CryptoJS.mode.CBC
  }else if(mode=="CFB"){
    mode_finally = CryptoJS.mode.CFB
  }else if(mode=="CTR"){
    mode_finally = CryptoJS.mode.CTR
  }else if(mode=="OFB"){
    mode_finally = CryptoJS.mode.OFB
  }

  padding_finally =CryptoJS.pad.Pkcs7
  if(padding == "Pkcs7"){
    padding_finally =CryptoJS.pad.Pkcs7
  }else if(padding=="Iso97971"){
    padding_finally =CryptoJS.pad.Iso97971
  }else if(padding=="AnsiX923"){
    padding_finally =CryptoJS.pad.AnsiX923
  }else if(padding=="Iso10126"){
    padding_finally =CryptoJS.pad.Iso10126
  }else if(padding=="ZeroPadding"){
    padding_finally =CryptoJS.pad.ZeroPadding
  }else if(padding=="NoPadding"){
    padding_finally =CryptoJS.pad.NoPadding
  }

  var decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
  }, keyHex, {
      iv: iv,
      mode: mode_finally,
      padding: padding_finally
  });
  var result_value = decrypted.toString(CryptoJS.enc.Utf8);
  return result_value;
}








//AES加密
function encryptByAES(message, key,mode,padding,iv){
  mode_finally = CryptoJS.mode.ECB
  if(mode == "ECB"){
    mode_finally = CryptoJS.mode.ECB
  }else if(mode=="CBC"){
    mode_finally = CryptoJS.mode.CBC
  }else if(mode=="CFB"){
    mode_finally = CryptoJS.mode.CFB
  }else if(mode=="CTR"){
    mode_finally = CryptoJS.mode.CTR
  }else if(mode=="OFB"){
    mode_finally = CryptoJS.mode.OFB
  }

  padding_finally =CryptoJS.pad.Pkcs7
  if(padding == "Pkcs7"){
    padding_finally =CryptoJS.pad.Pkcs7
  }else if(padding=="Iso97971"){
    padding_finally =CryptoJS.pad.Iso97971
  }else if(padding=="AnsiX923"){
    padding_finally =CryptoJS.pad.AnsiX923
  }else if(padding=="Iso10126"){
    padding_finally =CryptoJS.pad.Iso10126
  }else if(padding=="ZeroPadding"){
    padding_finally =CryptoJS.pad.ZeroPadding
  }else if(padding=="NoPadding"){
    padding_finally =CryptoJS.pad.NoPadding
  }
  var key = CryptoJS.enc.Utf8.parse(key);//123456789abc这个自己随便写，相当于密钥吧，也可以自己单独用个变量存
  var srcs = CryptoJS.enc.Utf8.parse(message);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode:mode_finally,
    padding: padding_finally
  });
  return encrypted.toString();
}
//AES解密
function decryptByAES(ciphertext, key,mode,padding,iv){
  
  ciphertext = (ciphertext + '').replace(/\n*$/g, '').replace(/\n/g, ''); 
  // ciphertext = CryptoJS.enc.Hex.parse(ciphertext);
  // var keyHex = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);


  mode_finally = CryptoJS.mode.ECB
  if(mode == "ECB"){
    mode_finally = CryptoJS.mode.ECB
  }else if(mode=="CBC"){
    mode_finally = CryptoJS.mode.CBC
  }else if(mode=="CFB"){
    mode_finally = CryptoJS.mode.CFB
  }else if(mode=="CTR"){
    mode_finally = CryptoJS.mode.CTR
  }else if(mode=="OFB"){
    mode_finally = CryptoJS.mode.OFB
  }

  padding_finally =CryptoJS.pad.Pkcs7
  if(padding == "Pkcs7"){
    padding_finally =CryptoJS.pad.Pkcs7
  }else if(padding=="Iso97971"){
    padding_finally =CryptoJS.pad.Iso97971
  }else if(padding=="AnsiX923"){
    padding_finally =CryptoJS.pad.AnsiX923
  }else if(padding=="Iso10126"){
    padding_finally =CryptoJS.pad.Iso10126
  }else if(padding=="ZeroPadding"){
    padding_finally =CryptoJS.pad.ZeroPadding
  }else if(padding=="NoPadding"){
    padding_finally =CryptoJS.pad.NoPadding
  }
  var key = CryptoJS.enc.Utf8.parse(key);//要和加密的密钥一样
  var ciphertext = CryptoJS.enc.Utf8.parse(ciphertext);
  var decrypt = CryptoJS.AES.decrypt(ciphertext, key, {
    mode:mode_finally,
    padding: padding
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}








// 加密
function EncryptAES (text,key,mode,padding,iv) {
  mode_finally = CryptoJS.mode.ECB
  if(mode == "ECB"){
    mode_finally = CryptoJS.mode.ECB
  }else if(mode=="CBC"){
    mode_finally = CryptoJS.mode.CBC
  }else if(mode=="CFB"){
    mode_finally = CryptoJS.mode.CFB
  }else if(mode=="CTR"){
    mode_finally = CryptoJS.mode.CTR
  }else if(mode=="OFB"){
    mode_finally = CryptoJS.mode.OFB
  }

  padding_finally =CryptoJS.pad.Pkcs7
  if(padding == "Pkcs7"){
    padding_finally =CryptoJS.pad.Pkcs7
  }else if(padding=="Iso97971"){
    padding_finally =CryptoJS.pad.Iso97971
  }else if(padding=="AnsiX923"){
    padding_finally =CryptoJS.pad.AnsiX923
  }else if(padding=="Iso10126"){
    padding_finally =CryptoJS.pad.Iso10126
  }else if(padding=="ZeroPadding"){
    padding_finally =CryptoJS.pad.ZeroPadding
  }else if(padding=="NoPadding"){
    padding_finally =CryptoJS.pad.NoPadding
  }
  return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: mode_finally,
    padding: padding_finally
  }).toString()
}

// 解密
function DecryptAES (text,key,mode,padding,iv) {
  mode_finally = CryptoJS.mode.ECB
  if(mode == "ECB"){
    mode_finally = CryptoJS.mode.ECB
  }else if(mode=="CBC"){
    mode_finally = CryptoJS.mode.CBC
  }else if(mode=="CFB"){
    mode_finally = CryptoJS.mode.CFB
  }else if(mode=="CTR"){
    mode_finally = CryptoJS.mode.CTR
  }else if(mode=="OFB"){
    mode_finally = CryptoJS.mode.OFB
  }

  padding_finally =CryptoJS.pad.Pkcs7
  if(padding == "Pkcs7"){
    padding_finally =CryptoJS.pad.Pkcs7
  }else if(padding=="Iso97971"){
    padding_finally =CryptoJS.pad.Iso97971
  }else if(padding=="AnsiX923"){
    padding_finally =CryptoJS.pad.AnsiX923
  }else if(padding=="Iso10126"){
    padding_finally =CryptoJS.pad.Iso10126
  }else if(padding=="ZeroPadding"){
    padding_finally =CryptoJS.pad.ZeroPadding
  }else if(padding=="NoPadding"){
    padding_finally =CryptoJS.pad.NoPadding
  }
  let decrypted = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(text), CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: mode_finally,
    padding: padding_finally
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
