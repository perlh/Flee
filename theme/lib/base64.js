var base64={
	table:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	utf8_en:function(str){
		var str = str.replace(/\r\n/g, "\n");
		var utf = '';
		for (var i = 0; i < str.length; i++) {
			var code = str.charCodeAt(i);
			if (code < 128) {
				utf += String.fromCharCode(code)
			} else if ((code > 127) && (code < 2048)) {
				utf += String.fromCharCode((code >> 6) | 192);
				utf += String.fromCharCode((code & 63) | 128)
			} else {
				utf += String.fromCharCode((code >> 12) | 224);
				utf += String.fromCharCode(((code >> 6) & 63) | 128);
				utf += String.fromCharCode((code & 63) | 128)
			}
		}
		return utf;
	},
	utf8_de:function(str){
		var utf = '';
		var n = 0;
		var code = c1 = c2 = 0;
		while (n < str.length) {
			code = str.charCodeAt(n);
			if (code < 128) {
				utf += String.fromCharCode(code);
				n++
			} else if (code > 191 && code < 224) {
				c2 = str.charCodeAt(n + 1);
				utf += String.fromCharCode((code & 31) << 6 | c2 & 63);
				n += 2
			} else {
				c2 = str.charCodeAt(n + 1);
				c3 = str.charCodeAt(n + 2);
				utf += String.fromCharCode((code & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
				n += 3
			}
		}
		return utf;
	},
	utf8encode:function(str){
		var str=base64.utf8_en(str);
		var u_b64=base64.encode(str)
		return u_b64;
	},
	utf8decode:function(str){
		var str=base64.decode(str);
		var u_b64=base64.utf8_de(str);
		return u_b64;
	},
	encode:function(str){
		var t_str='';//存储8位二进制
		var t_b64='';//存储编码结果
		for (var i = 0; i < str.length; i++) {//转8位二进制
			t_str+=str[i].charCodeAt().toString(2).lfill();
		}
		var leave=t_str.length%6;//分组余数计算
		if (leave!=0) {//有余数时需要末尾补0
			for (var i = 0; i < 6-leave; i++) {t_str+='0';}
		}
		for (var i = 0; i < Math.floor(t_str.length/6); i++) {//编码结果存储
			t_b64+=base64.table[parseInt(t_str.substr(i*6,6),2)];
		}
		t_b64+=t_str.length%24/6==2?'==':t_str.length%24/6==3?'=':'';//空位补‘=’占位
		return t_b64;
	},
	decode:function(str){
		var len=str.length;
		var t_code=6*len;
		if (str.substring(len-1)=='=') {
			if (str.substring(len-2)=='==') {//有两个'='，去12位
				t_code-=12;len-=2;
			}else{//有一个'='，去6位
				t_code-=6;len-=1;
			}
		}
		var b_b64='';
		for (var i = 0; i < len; i++) {
			b_b64+=(base64.table.indexOf(str[i]).toString(2).lfill(6))
		}
		var d_b64='';
		for (var i = 0; i < Math.floor(t_code/8); i++) {
			d_b64+=String.fromCharCode(parseInt(b_b64.substr(i*8,8),2));
		}
		return d_b64;
	}
};
//test case
window.Base64=base64;
window.be=base64.encode;
window.bd=base64.decode;
window.beu=base64.utf8encode;
window.bdu=base64.utf8decode;

String.prototype.lfill = function(num=undefined) {
	var len=this.length;
	var res='';
	if (num==undefined) {
		if (len%8!=0) {
			for (let i = 0; i < 8-len%8; i++) {res+='0';}
				res+=this;
		}else{res=this.toString();}
	}else{
		if (num<len) {console.error('Uncaught RangeError: String.lfill() radix argument must more than String.length.');}
		else{
			for (let i = 0; i < num-len; i++) {res+='0';}
				res+=this;
		}
	}
	return res;
};
String.prototype.rfill = function(num=undefined) {
	var len=this.length;
	var res=this.toString();
	if (num==undefined) {
		if (len%8!=0) {
			for (let i = 0; i < 8-len%8; i++) {res+='0';}
		}else{res=res;}
	}else{
		if (num<len) {console.error('Uncaught RangeError: String.rfill() radix argument must more than String.length.');}
		else{
			for (let i = 0; i < num-len; i++) {res+='0';}
		}
	}
	return res;
};