// 编码
function mainEncode() {
  let select_id = $("#decode-select").val();
  // 输入框
  let decode_input = $("#decode-input").val();
  // 输出狂
  var decode_output = $("#decode-output");
  // 清空输出框
  decode_output.val("");
  if(decode_input == ""){
    return ;
  }
  //
  // var wordArray = CryptoJS.enc.Utf8.parse(decode_input);
  switch (select_id) {
    case "0": {
      const option = {
        space: " ",
        long: "-",
        short: ".",
      };
      try {
        decode = xmorse.encode(decode_input, option);
      } catch (error) {
        decode = error;
      }
      decode_output.val(decode);
      break;
    }
    case "1": {
      try {
        var wordArray = CryptoJS.enc.Utf8.parse(decode_input);
        // var base64 =
        encode = CryptoJS.enc.Base64.stringify(wordArray);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "2": {
      // CryptoJS.MD5('hello').toString();
      try {
        encode = CryptoJS.MD5(decode_input).toString();
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "3": {
      // CryptoJS.MD5('hello').toString();
      try {
        encode = CryptoJS.SHA256(decode_input).toString();
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "4": {
      // CryptoJS.MD5('hello').toString();
      try {
        encode = CryptoJS.SHA224(decode_input).toString();
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "5": {
      // CryptoJS.MD5('hello').toString();
      try {
        encode = CryptoJS.SHA512(decode_input).toString();
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "6": {
      // CryptoJS.MD5('hello').toString();
      try {
        encode = CryptoJS.SHA384(decode_input).toString();
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "7": {
      // CryptoJS.MD5('hello').toString();
      try {
        encode = CryptoJS.SHA1(decode_input).toString();
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "8": {
      // CryptoJS.MD5('hello').toString();
      try {
        encode = CryptoJS.SHA3(decode_input).toString();
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "9": {
      /*
      Base32
      */
      try {
        encode = base32.encode(decode_input);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "10": {
      try {
        encode = encodeURIComponent(decode_input);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "11": {
      try {
        encode = strToHexCharCode(strToUtf8Bytes(decode_input));
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "12": {
      // unicode(str);
      try {
        encode = unicode(decode_input);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "13": {
      try {
        encode = escape(decode_input).replace(/(%u)(\w{4})/gi, "&#x$2;");
      } catch (error) {
        encode = error;
      } finally {
        decode_output.val(encode);
        break;
      }
    }
    default:
      break;
  }
}

// 解码
function mainDncode() {
  let select_id = $("#decode-select").val();
  // 输入框
  let decode_input = $("#decode-input").val();
  // 输出狂
  var decode_output = $("#decode-output");
  // 清空输出框
  // var wordArray = CryptoJS.enc.Utf8.parse(decode_input);
  switch (select_id) {
    case "0": {
      const option = {
        space: " ",
        long: "-",
        short: ".",
      };
      try {
        encode = xmorse.decode(decode_input, option);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }

    case "1": {
      try {
        var parsedWordArray = CryptoJS.enc.Base64.parse(decode_input);
        encode = parsedWordArray.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "9": {
      try {
        encode = base32.decode(decode_input);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "10": {
      try {
        encode = decodeURIComponent(decode_input);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "11": {
      try {
        encode = hexToString(decode_input);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "12": {
      // unicode(str);
      try {
        encode = unicodeToChar(decode_input);
      } catch (error) {
        encode = error;
      }
      decode_output.val(encode);
      break;
    }
    case "13": {
      var init_str;
      try {
        encode = unescape(decode_input.replace(/&#x/g, "%u").replace(/;/g, ""));
      } catch (error) {
        encode = error;
      } finally {
        decode_output.val(encode);
        break;
      }
    }
    default:
      break;
  }
}

let button_encode = document.getElementById("button-encode");
button_encode.onclick = mainEncode;

let button_decode = document.getElementById("button-decode");
button_decode.onclick = mainDncode;

// a = ;
// alert(string2byte("hello world"));
