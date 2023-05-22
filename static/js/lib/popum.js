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





// ============== Main ==============

function clearForm() {
  // 清空输出框
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
  

  res = saveToLocalStorage("input_text",str);
  saveToLocalStorage("opration","encode");
  // 显示编码成功
  // $('#status').css('display', 'block');
  if(str == ""){
    $('#input_status').text("输入为空！");
    return;
  }
  $('#input_status').text("Encode success！");

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

  res = saveToLocalStorage("input_text",str);
  saveToLocalStorage("opration","decode");
  // 显示编码成功
  // $('#status').css('display', 'block');
  if(str == ""){
    $('#input_status').text("输入为空！");
    return;
  }
  $('#input_status').text("Decode success！");
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

function onEmptyStart(){
  // empty
  // alert("test");
  // 清空本地存储
  removeFromLocalStorage("opration");
  removeFromLocalStorage("input_text");
  // 清空输出框
  clearForm();
  // 清空输入框
  $("#input_text").val("");
      // 显示编码成功
  // $('#status').css('display', 'none');
  $('#input_status').text("请在上方第一个文本框中输入要编码/解码的字符。");
  

}




let btnClick = document.getElementById("onButtonDecode");
btnClick.onclick = mainDecode;

let btnClick2 = document.getElementById("onButtonEncode");
btnClick2.onclick = mainEncode;


let onEmpty = document.getElementById("onEmpty");
onEmpty.onclick = onEmptyStart;
// // alert("hello")

// 尝试查询本地
result = getFromLocalStorage("input_text");
// alert(result);
if(result != null){
  // 提前执行历史操作
  $("#input_text").val(result);
  // 操作
  opration = getFromLocalStorage("opration");
  
  if(opration=="decode"){
    mainDecode();
  }
  if(opration=="encode"){
    mainEncode();
  }
  
}

