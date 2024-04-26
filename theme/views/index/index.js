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
  
  // ============== Main ==============
  
  function clearForm() {
    // 清空输出框
    $("#base64_output").val("");
    $("#base32_output").val("");
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
      $('#input_status').text("输入不能为空！");
      return;
    }
    $('#input_status').text("编码");
  
    if(str== ""){
      $("#base64_output").val("");
      $("#base32_output").val("");
      $("#utf-8_output").val("");
      $("#url_output").val("");
      $("#unicode_output").val("");
      $("#char_and_16_output").val("");
      return false;
    }
    // base32
    try {
      var str_base32 = flee_base32_encode(str);
    } catch(error){
      var str_base32 = error;
    } finally {
      $("#base32_output").val(str_base32);
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
      var str_utf_8 = error;
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
      $('#input_status').text("输入不能为空！");
      return;
    }
    $('#input_status').text("解码");
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
      var char16 = hexToString(str);
    } catch(error){
      var char16 = error;
    } finally {
      $("#char_and_16_output").val(char16);
    }
    // unicode
    try {
      var str_unicode = unicodeToChar(str);
    } catch(error){
      var str_unicode = error;
    } finally {
      $("#unicode_output").val(str_unicode);
    }
  
  
     // utf-8
     try {
      var str_utf_8 = unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''));
    } catch(error){
      var str_utf_8 = error;
    } finally {
      $("#utf-8_output").val(str_utf_8);
    }
     // md5 
    try {
      var result = flee_base32_decode(str);
    } catch(error){
      var result = error;
    } finally {
      $("#base32_output").val(result);
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
    $('#input_status').text("请在上面文本框输入要编码的文本");
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
  
  // JavaScript 代码
  function copyText(id) {
    // 获取输入框元素
    var input = document.getElementById(id);
  
    // 选中输入框中的文本
    input.select();
  
    // 复制文本
    document.execCommand('copy');
  
    // 取消选中状态
    window.getSelection().removeAllRanges();
  
    // 提示复制成功
    alert('已复制到剪贴板！');
  }