/**
* JSON to XML jQuery plugin. Provides quick way to convert JSON object to XML 
* string. To some extent, allows control over XML output.
* Just as jQuery itself, this plugin is released under both MIT & GPL licences.
* 
* @version 1.02
* @author Micha Korecki, www.michalkorecki.com
*/
(function ($) {
  /**
  * Converts JSON object to XML string.
  * 
  * @param json object to convert
  * @param options additional parameters 
  * @return XML string 
  */
  $.json2xml = function (json, options) {
      settings = {};
      settings = $.extend(true, settings, defaultSettings, options || {});
      return convertToXml(json, settings.rootTagName, '', 0);
  };

  var defaultSettings = {
      formatOutput: true,
      formatTextNodes: false,
      indentString: '  ',
      rootTagName: 'root',
      ignore: [],
      replace: [],
      nodes: [],
      ///TODO: exceptions system
      exceptions: []
  };

  /**
  * This is actual settings object used throught plugin, default settings
  * are stored separately to prevent overriding when using multiple times.
  */
  var settings = {};

  /**
  * Core function parsing JSON to XML. It iterates over object properties and
  * creates XML attributes appended to main tag, if property is primitive 
  * value (eg. string, number).
  * Otherwise, if it's array or object, new node is created and appened to
  * parent tag. 
  * You can alter this behaviour by providing values in settings.ignore, 
  * settings.replace and settings.nodes arrays. 
  * 
  * @param json object to parse
  * @param tagName name of tag created for parsed object
  * @param parentPath path to properly identify elements in ignore, replace 
  * 	      and nodes arrays
  * @param depth current element's depth 
  * @return XML string
  */
  var convertToXml = function (json, tagName, parentPath, depth) {
      var suffix = (settings.formatOutput) ? '\r\n' : '';
      var indent = (settings.formatOutput) ? getIndent(depth) : '';
      var xmlTag = indent + '<' + tagName;
      var children = '';

      for (var key in json) {
          if (json.hasOwnProperty(key)) {
              var propertyPath = parentPath + key;
              var propertyName = getPropertyName(parentPath, key);
              // element not in ignore array, process
              if ($.inArray(propertyPath, settings.ignore) == -1) {
                  // array, create new child element
                  if ($.isArray(json[key])) {
                      children += createNodeFromArray(json[key], propertyName,
              propertyPath + '.', depth + 1, suffix);
                  }
                  // object, new child element aswell
                  else if (typeof (json[key]) === 'object') {
                      children += convertToXml(json[key], propertyName,
              propertyPath + '.', depth + 1);
                  }
                  // primitive value property as attribute
                  else {
                      // unless it's explicitly defined it should be node
                      if (propertyName.indexOf('@') == -1) {
                          children += createTextNode(propertyName, json[key],
                depth, suffix);
                      }
                      else {
                          propertyName = propertyName.replace('@', '');
                          xmlTag += ' ' + propertyName + '="' + json[key] + '"';
                      }
                  }
              }
          }
      }
      // close tag properly
      if (children !== '') {
          xmlTag += '>' + suffix + children + indent + '</' + tagName + '>' + suffix;
      }
      else {
          xmlTag += '/>' + suffix;
      }
      return xmlTag;
  };


  /**
  * Creates indent string for provided depth value. See settings for details.
  * 
  * @param depth
  * @return indent string 
  */
  var getIndent = function (depth) {
      var output = '';
      for (var i = 0; i < depth; i++) {
          output += settings.indentString;
      }
      return output;
  };


  /**
  * Checks settings.replace array for provided name, if it exists returns
  * replacement name. Else, original name is returned.
  * 
  * @param parentPath path to this element's parent
  * @param name name of element to look up
  * @return element's final name
  */
  var getPropertyName = function (parentPath, name) {
      var index = settings.replace.length;
      var searchName = parentPath + name;
      while (index--) {
          // settings.replace array consists of {original : replacement} 
          // objects 
          if (settings.replace[index].hasOwnProperty(searchName)) {
              return settings.replace[index][searchName];
          }
      }
      return name;
  };

  /**
  * Creates XML node from javascript array object.
  * 
  * @param source 
  * @param name XML element name
  * @param path parent element path string
  * @param depth
  * @param suffix node suffix (whether to format output or not)
  * @return XML tag string for provided array
  */
  var createNodeFromArray = function (source, name, path, depth, suffix) {
      var xmlNode = '';
      if (source.length > 0) {
          for (var index in source) {
              // array's element isn't object - it's primitive value, which
              // means array might need to be converted to text nodes
              if (typeof (source[index]) !== 'object') {
                  // empty strings will be converted to empty nodes
                  if (source[index] === "") {
                      xmlNode += getIndent(depth) + '<' + name + '/>' + suffix;
                  }
                  else {
                      var textPrefix = (settings.formatTextNodes)
                  ? suffix + getIndent(depth + 1) : '';
                      var textSuffix = (settings.formatTextNodes)
                ? suffix + getIndent(depth) : '';
                      xmlNode += getIndent(depth) + '<' + name + '>'
                      + textPrefix + source[index] + textSuffix
                      + '</' + name + '>' + suffix;
                  }
              }
              // else regular conversion applies
              else {
                  xmlNode += convertToXml(source[index], name, path, depth);
              }
          }
      }
      // array is empty, also creating empty XML node		
      else {
          xmlNode += getIndent(depth) + '<' + name + '/>' + suffix;
      }
      return xmlNode;
  };

  /**
  * Creates node containing text only.
  * 
  * @param name node's name
  * @param text node text string
  * @param parentDepth this node's parent element depth
  * @param suffix node suffix (whether to format output or not)
  * @return XML tag string
  */
  var createTextNode = function (name, text, parentDepth, suffix) {
      // unformatted text node: <node>value</node>
      // formatting includes value indentation and new lines
      var textPrefix = (settings.formatTextNodes)
    ? suffix + getIndent(parentDepth + 2) : '';
      var textSuffix = (settings.formatTextNodes)
    ? suffix + getIndent(parentDepth + 1) : '';
      var xmlNode = getIndent(parentDepth + 1) + '<' + name + '>'
        + textPrefix + text + textSuffix
        + '</' + name + '>' + suffix;
      return xmlNode;
  };
})(jQuery);
















function xmlToJson(xml) {
  // Create the return object
  var obj = {};
  if (xml.nodeType == 1) { // element
  // do attributes
  if (xml.attributes.length > 0) {
  obj["@attributes"] = {};
  for (var j = 0; j < xml.attributes.length; j++) {
  var attribute = xml.attributes.item(j);
  obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
  }
  }
  } else if (xml.nodeType == 3) { // text
  obj = xml.nodeValue;
  }
  // do children
  if (xml.hasChildNodes()) {
  for (var i = 0; i < xml.childNodes.length; i++) {
  var item = xml.childNodes.item(i);
  var nodeName = item.nodeName;
  if (typeof (obj[nodeName]) == "undefined") {
  obj[nodeName] = xmlToJson(item);
  } else {
  if (typeof (obj[nodeName].length) == "undefined") {
  var old = obj[nodeName];
  obj[nodeName] = [];
  obj[nodeName].push(old);
  }
  obj[nodeName].push(xmlToJson(item));
  }
  }
  }
  return obj;
  };
  

  


function json_to_get(sstr) {
  sstr = sstr.replace(/\t/g, "");
  sstr = sstr.replace(/\"/g, "").replace("{", "").replace("}", "").sstr =
    sstr.replace(",", "&");
  sstr = sstr.replace(/\"/g, "").replace(/{/g, "").replace(/}/g, "");
  sstr = sstr.replace(/,/g, "&");
  return sstr;
}

function get_to_json(sstr) {
  sstr = sstr.replace(/&/g, '","').replace(/=/g, '":"');
  sstr = '{"' + sstr + '"}';
  return sstr;
}

var isJSON = function (str) {
  if (
    /^[\],:{}\s]*$/.test(
      str
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d (?:\.\d*)?(?:[eE][ \-]?\d )?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[) /g, "")
    )
  ) {
    return true;
  } else {
    return false;
  }
};


function checkJson(){
  let json = $("#check-json-input").val();
  if(isJSON(json)){
    alert("格式正确");
  }
  else{
    alert("格式错误！");
  }
}

// 编码主函数
function main_get_to_json() {
  var str = $("#get_json").val();
  // alert(get_to_json(str));
  $("#get_json").val("");
  // md5

  try {
    var str = get_to_json(str);
  } catch (error) {
    var str = error.name;
  } finally {
    $("#get_json").val(str);
  }
}

// 解码主函数
/*
  
  */
function main_json_to_get() {
  var str = $("#get_json").val();
  // alert(json_to_get(str));
  $("#get_json").val("");
  // base64
  try {
    var str = JSON.stringify(str);
  } catch (error) {
    var str = error.name;
  } finally {
    $("#get_json").val(str);
  }
}



function xml2json(){
  var json = $("#json2xml-input");
  json.val(xmlToJson(json.val()));
  
}


function json2xml(){
  var json = $("#json2xml-input");
  json.val($.json2xml(json.val()));
}
// let btnClick = document.getElementById("on_get_to_json");
// btnClick.onclick = main_get_to_json;
// //   on_json_to_get

// let btnClick2 = document.getElementById("on_json_to_get");
// btnClick2.onclick = main_json_to_get;

let checkJsonButton = document.getElementById("check-json-button");
checkJsonButton.onclick = checkJson;


let checkJsonButton1 = document.getElementById("json2xml-button");
checkJsonButton1.onclick = json2xml;





let checkJsonButton2 = document.getElementById("xml2json-button");
checkJsonButton2.onclick = xml2json;