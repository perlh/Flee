// 关于本地存储的相关代码

// 保存数据到本地存储
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
  // 从本地存储中获取数据
  function getFromLocalStorage(key) {
    var value = localStorage.getItem(key);
    if (value) {
      return value;
    }
    return null;
  }
  
  // 从本地存储中移除数据
  function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
  
  // 清空本地存储中的所有数据
  function clearLocalStorage() {
    localStorage.clear();
  }
  
  // base64
  function flee_base64_decode(flee_string) {
    var encode;
    try {
    //   var parsedWordArray = CryptoJS.enc.Base64.parse(flee_string);
      encode = Base64.decode(flee_string);
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  function flee_base64_encode(flee_string) {
    var encode;
    try {
      encode = Base64.encode(flee_string);
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  function flee_base32_decode(flee_string) {
    var encode;
    try {
      encode = base32.decode(flee_string);
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  function flee_base32_encode(flee_string) {
    var encode;
    try {
      encode = base32.encode(flee_string);
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  function flee_morse_decode(flee_string) {
    var encode;
    const option = {
      space: " ",
      long: "-",
      short: ".",
    };
    try {
      // alert(mosijie(flee_string));
      encode = mosijie(flee_string);
      // encode = morseDecode(flee_string);

      // alert(encode);
    } catch (error) {
      encode = error;
    }
    return encode;
    // decode_output.val(encode);
  }
  
  function flee_morse_encode(flee_string) {
    var decode;
    const option = {
      space: " ",
      long: "-",
      short: ".",
    };
    try {
      decode = mosi(flee_string);
      
    } catch (error) {
      decode = error;
    }
    // alert(encode);
    return decode;
  }
  
  
  function flee_md5_encode(flee_string) {
    var encode;
    try {
    //   encode = CryptoJS.MD5(flee_string).toString();
      encode = md5(flee_string);
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  function flee_sha1_encode(flee_string) {
    var encode;
    try {
      encode = CryptoJS.SHA1(flee_string).toString();
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  function flee_sha3_encode(flee_string) {
    var encode;
    try {
      encode = CryptoJS.SHA3(flee_string).toString();
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  
  function flee_sha224_encode(flee_string) {
    var encode;
    try {
      encode = CryptoJS.SHA224(flee_string).toString();
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  // function flee_sha256_decode(flee_string) {
  
  // }
  
  function flee_sha256_encode(flee_string) {
    var encode;
    try {
      encode = CryptoJS.SHA256(flee_string).toString();
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  // function flee_sha384_decode(flee_string) {
  
  // }
  
  function flee_sha384_encode(flee_string) {
    var encode;
    try {
      encode = CryptoJS.SHA384(flee_string).toString();
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  function flee_sha512_encode(flee_string) {
    var encode;
    try {
      encode = CryptoJS.SHA512(flee_string).toString();
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  function flee_string2hex_decode(flee_string) {
    var encode;
    try {
      encode = hexToString(flee_string);
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  function flee_string2hex_encode(flee_string) {
    var encode;
    try {
      encode = strToHexCharCode(strToUtf8Bytes(flee_string));
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  function flee_url_encode(flee_string) {
    var encode;
    try {
      encode = encodeURIComponent(flee_string);
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  function flee_url_decode(flee_string) {
    var encode;
    try {
      encode = decodeURIComponent(flee_string);
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  function flee_unicode_encode(flee_string) {
    var encode;
    try {
      encode = unicode(flee_string);
    } catch (error) {
      encode = error;
    }
  
    return encode;
  }
  function flee_unicode_decode(flee_string) {
    var encode;
    try {
      encode = unicodeToChar(flee_string);
    } catch (error) {
      encode = error;
    }
  
    return encode;
  }
  function flee_utf8_encode(flee_string) {
    var encode;
    try {
      encode = escape(flee_string).replace(/(%u)(\w{4})/gi, "&#x$2;");
    } catch (error) {
      encode = error;
    }
    // alert(encode);
    return encode;
  }
  function flee_utf8_decode(flee_string) {
    var encode;
    try {
      encode = unescape(flee_string.replace(/&#x/g, "%u").replace(/;/g, ""));
    } catch (error) {
      encode = error;
    }
    return encode;
  }
  
  
  function flee_sm3_encode(flee_string) {
    var sm3;
    try{
      sm3 = smEncrypt.sm3(flee_string);
    }catch(error){
      sm3 = error;
    }
    return sm3;
  }
  
  
  
  // Base16编码函数
  function flee_base16_encode(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      const hex = str.charCodeAt(i).toString(16);
      result += hex.padStart(2, "0");
    }
    return result;
  }
  
  // Base16解码函数
  function flee_base16_decode(str) {
    let result = "";
    for (let i = 0; i < str.length; i += 2) {
      const hex = str.substr(i, 2);
      const charCode = parseInt(hex, 16);
      result += String.fromCharCode(charCode);
    }
    return result;
  }
  
  function onEmptyStart() {
    removeFromLocalStorage("flee_encoding_input");
    removeFromLocalStorage("flee_encoding_opration");
    removeFromLocalStorage("flee_encoding_select");

    // 清空输入框
    $("#decode-input").val("");
    $("#output_textarea").val("");
  }
  
  
  
  
  // 主函数
  function flee_main() {
    var opration = $("#opration").val();
    let input_textarea = $("#decode-input").val();
  
    // alert(input_textarea);
    // 获取选择的值
    var flee_encoding_select = $("#decode-select").val();
    // 获取输出框对象
    var output_textarea = $("#output_textarea");
    saveToLocalStorage("flee_encoding_input", input_textarea);
    saveToLocalStorage("flee_encoding_opration", opration);
    saveToLocalStorage("flee_encoding_select", flee_encoding_select);
    var output_result = "";
    if (opration === "encode") {
      // encode
      switch (flee_encoding_select) {
        case "base64": {
          // alert("base64 encode");
          output_result = flee_base64_encode(input_textarea);
          break;
        }
        case "base32": {
          output_result = flee_base32_encode(input_textarea);
          break;
        }
        case "morse": {
          output_result = flee_morse_encode(input_textarea);
          break;
        }
        case "md5": {
          output_result = flee_md5_encode(input_textarea);
          break;
        }
        case "sha1": {
          output_result = flee_sha1_encode(input_textarea);
          break;
        }
        case "sha3": {
          output_result = flee_sha3_encode(input_textarea);
          break;
        }
        case "sha224": {
          output_result = flee_sha224_encode(input_textarea);
          break;
        }
        case "sha256": {
          output_result = flee_sha256_encode(input_textarea);
          break;
        }
        case "sha384": {
          output_result = flee_sha384_encode(input_textarea);
          break;
        }
        case "sha512": {
          output_result = flee_sha512_encode(input_textarea);
          break;
        }
        case "string2hex": {
          output_result = flee_string2hex_encode(input_textarea);
          break;
        }
        case "url": {
          output_result = flee_url_encode(input_textarea);
          break;
        }
        case "utf8": {
          output_result = flee_utf8_encode(input_textarea);
          break;
        }
        case "unicode": {
          output_result = flee_unicode_encode(input_textarea);
          break;
        }
        case "sm3": {
          // https://github.com/44021987/smEncrypt
          output_result = flee_sm3_encode(input_textarea);
          break;
        }
        case "base16": {
          // https://github.com/44021987/smEncrypt
          output_result = flee_base16_encode(input_textarea);
          break;
        }
        case "base58": {
          // https://github.com/44021987/smEncrypt
          output_result = base58_encode(input_textarea);
          break;
        }
        case "base62": {
          // https://github.com/44021987/smEncrypt
          output_result = base62_encode(input_textarea);
          break;
        }
        case "base91": {
          // https://github.com/44021987/smEncrypt
          // output_result = base91_encode(input_textarea);
          output_result = base91_encode(input_textarea); 
          break;
        }
        case "base92": {
          // https://github.com/44021987/smEncrypt
          output_result = base92_encode(input_textarea);
          break;
        }
        default: {
          output_result = "Encode not exist！";
          // $("#output_textarea").css('color', 'red');
        }
      }
    } else {
      // decode
      switch (flee_encoding_select) {
        case "base64": {
          // alert("base64 decode");
          output_result = flee_base64_decode(input_textarea);
          break;
        }
        case "base32": {
          output_result = flee_base32_decode(input_textarea);
          break;
        }
        case "morse": {
          output_result = flee_morse_decode(input_textarea);
          break;
        }
        case "string2hex": {
          output_result = flee_string2hex_decode(input_textarea);
          break;
        }
        case "url": {
          output_result = flee_url_decode(input_textarea);
          break;
        }
        case "utf8": {
          output_result = flee_utf8_decode(input_textarea);
          break;
        }
        case "unicode": {
          output_result = flee_unicode_decode(input_textarea);
          break;
        }
        case "base16": {
          output_result = flee_base16_decode(input_textarea);
          break;
        }
        case "base58": {
          output_result = base58_decode(input_textarea);
          break;
        }
        case "base62": {
          output_result = base62_decode(input_textarea);
          break;
        }
        case "base91": {
          output_result = base91_decode(input_textarea);
          break;
        }
        case "base92": {
          output_result = base92_decode(input_textarea);
          break;
        }
        case "md5":{
          if(isMd5(input_textarea)){
            $("#output_textarea").val("查询中...");
            md5_decode(input_textarea);
          }else{
            $("#output_textarea").val("输入不是md5格式！");
          }
          break;
        }
        default: {
          output_result = "Decode Not exist！";
          // $("#output_textarea").css('color', 'red');
        }
      }
    }
    
    // alert(output_result);
    if(flee_encoding_select!="md5"|| opration!="decode"){
      output_textarea.val(output_result);
    }
    
  }
  function isMd5(value) {
    /*
     * 判断字符串是否为 MD5 值
     */
    var pattern = /^[a-fA-F0-9]{32}$/;
    return pattern.test(value);
  }
  
  
  // 立即执行
  $(document).ready(function () {
    let onEmpty = document.getElementById("onEmpty");
    onEmpty.onclick = onEmptyStart;
    flee_encoding_input = getFromLocalStorage("flee_encoding_input");
    flee_encoding_select = getFromLocalStorage("flee_encoding_select");
    flee_encoding_opration = getFromLocalStorage("flee_encoding_opration");
    // $('#selectId').val('optionValue');
    if (flee_encoding_input != null) {
      $("#decode-input").val(flee_encoding_input);
      $("#decode-select").val(flee_encoding_select);
      $("#opration").val(flee_encoding_opration);
      flee_main();
    }
    $("#decode-select").change(flee_main);
    $("#opration").change(flee_main);
    $("#decode-input").on("input", function () {
      flee_main();
    });
  });
  
  
  
  function md5_decode(hash) {  // 通过chrome.runtime.sendMessage发送消息给background.js
    fetch('https://md5.hsm.cool/api?hash='+hash)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log('Hash:', data.hash);
            // alert(data)
            if(data.status==true){
              $("#output_textarea").val(data.data);
            }else{
              $("#output_textarea").val("未找到md5解密值！");
            }
        })
        .catch(error => {
            return error;
        });
        // alert(result1.data)
  }
  