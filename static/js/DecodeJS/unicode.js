// unicode
function leftZero(str) {
    if (str != null && str != "" && str != "undefined") {
      if (str.length == 2) {
        return `00${str}`;
      }
    }
    return str;
  }
function unicode(str) {
    let value = "";
    for (let i = 0; i < str.length; i++) {
      // eslint-disable-next-line radix
      value += `\\u${leftZero(parseInt(str.charCodeAt(i)).toString(16))}`;
    }
    return value;
  }
  
  function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
  }