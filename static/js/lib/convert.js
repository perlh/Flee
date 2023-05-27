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

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    // 生成一个随机索引，范围是0到charactersLength-1
    const randomIndex = Math.floor(Math.random() * charactersLength);

    // 将对应索引位置的字符添加到结果字符串中
    result += characters.charAt(randomIndex);
  }

  return result;
}

//
function getFileExtension(magicNumber) {
  switch (magicNumber) {
    case "89504E47":
      return "png";
    case "47494638":
      return "gif";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
      return "jpg";
    case "25504446":
      return "pdf";
    case "504B0304":
    case "504B0506":
    case "504B0708":
      return "zip";
    case "52617221":
      return "rar";
    // 添加其他文件类型的判断
    default: {
      $("#convert_status").text("Unknown file type");
      if (confirm("不是常用的文件格式，确定继续下载吗？")) {
        return "bin";
      } else {
        console.log("取消操作");
        return;
      }
    //   return "bin";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
    
  var downloadButton = document.getElementById("downloadButton");
  downloadButton.addEventListener("click", function () {
    var base64Input = document.getElementById("base64Input");
    var base64Data = base64Input.value.trim();
    
    // alert(base64Data);
    if (base64Data) {
      downloadFile(base64Data);
    } else {
      $("#convert_status").text("Base64 input is empty");
      console.log("Base64 input is empty");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var downloadButton = document.getElementById("convert-empty");
  downloadButton.addEventListener("click", function () {
    // alert("hellio ");
    //   var base64Input = document.getElementById("base64Input");
    //   var base64Data = base64Input.value.trim();
    //   if (base64Data) {
    //     downloadFile(base64Data);
    //   } else {
        removeFromLocalStorage("convert_input");
    $("#base64Input").val("");
    $("#convert_status").text("请在上方文本框中输入Base64编码。");
    //     console.log("Base64 input is empty");
    //   }
  });
});

function downloadFile(base64Data) {
  var fileName = "flee_" + generateRandomString(8);
  var byteCharacters = atob(base64Data);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  // 读取魔术数字
  var magicNumber = byteNumbers
    .slice(0, 4)
    .map(function (byte) {
      return byte.toString(16).toUpperCase().padStart(2, "0");
    })
    .join("");
  var extension = getFileExtension(magicNumber);
  if (!extension) {
    console.log("Unknown file type");

    return;
  }
  var blob = new Blob([byteArray], { type: "" });

  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = url;
  link.download = fileName + "." + extension;
  link.click();

  URL.revokeObjectURL(url);
}


$(document).ready(function () {

    var base64_input = getFromLocalStorage("convert_input");
    $("#base64Input").val(base64_input);
    $("#base64Input").change(saveInput);
})

function saveInput(){
    var base64Input = document.getElementById("base64Input");
    var base64Data = base64Input.value.trim()
    saveToLocalStorage("convert_input",base64Data);
}