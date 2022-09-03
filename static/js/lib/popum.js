

// ============== Main ==============

function clearForm() {
  $("#base64_output").val("");
  $("#md5_output").val("");
  $("#utf-8_output").val("");
  $("#url_output").val("");
  $("#unicode_output").val("");
  $("#char_and_16_output").val("");
}

// 编码主函数
function mainEncode() {
  clearForm();
  var str = $("#input_text").val();
  
  if(str== ""){
    $("#base64_output").val("");
    $("#md5_output").val("");
    $("#utf-8_output").val("");
    $("#url_output").val("");
    $("#unicode_output").val("");
    $("#char_and_16_output").val("");
    return false;
  }
  // md5
  try {
    var str_md5 = md5(str);
  } catch(error){
    var decodeString = error;
  } finally {
    $("#md5_output").val(str_md5);
  }

  // base64
  var decodeStringBase64 = Base64.encode(str);
  $("#base64_output").val(decodeStringBase64);

  // url编码
  $("#url_output").val(encodeURIComponent(str));
  // alert(Encode_text);

  try {
    var decodeString = strToHexCharCode(strToUtf8Bytes(str));
  } catch(error){
    var decodeString = error;
  } finally {
    $("#char_and_16_output").val(decodeString);
  }
  try {
    var decodeString = unicode(str);
  } catch(error){
    var decodeString = error;
  } finally {
    $("#unicode_output").val(decodeString);
  }

  // utf-8
  try {
    var str_utf_8 = escape(str).replace(/(%u)(\w{4})/gi, "&#x$2;");;
  } catch(error){
    var decodeString = error;
  } finally {
    $("#utf-8_output").val(str_utf_8);
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
    // var decodeString = base64.decode(str);
    var decodeString = Base64.decode(str);
  } catch(error){
    var decodeString = error;
  } finally {
    $("#base64_output").val(decodeString);
  }

  $("#url_output").val(decodeURIComponent(str));

  //
  // 16-char
  try {
    // convertedTenVal = parseInt(str, 16);
    var str_md5 = hexToString(str);
  } catch(error){
    var decodeString = error;
  } finally {
    $("#char_and_16_output").val(str_md5);
  }
  // unicode
  try {
    var str_unicode = unicodeToChar(str);
  } catch(error){
    var decodeString = error;
  } finally {
    $("#unicode_output").val(str_unicode);
  }


   // utf-8
   try {
    var str_utf_8 = unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''));
  } catch(error){
    var decodeString = error;
  } finally {
    $("#utf-8_output").val(str_utf_8);
  }
//   console.log(fromUTF8(toUTF8('hello')));
//   console.log(fromUTF8(toUTF8('你好')));
  //   decodeURIComponent(x);
}

let btnClick = document.getElementById("onButtonDecode");
btnClick.onclick = mainDecode;

let btnClick2 = document.getElementById("onButtonEncode");
btnClick2.onclick = mainEncode;
