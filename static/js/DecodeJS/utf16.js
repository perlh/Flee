
// 如果有特殊需求，要转成utf16，可以用以下函数
function ToUTF16(str) {
    var result = new Array();
 
    var k = 0;
    for (var i = 0; i < str.length; i++) {
        var j = str[i].charCodeAt(0);
        result[k++] = j & 0xFF;
        result[k++] = j >> 8;
    }
 
    return result;
}