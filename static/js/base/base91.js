function array_flip( trans ) {
	var key, tmp_ar = {};
	for ( key in trans ) {
	       if ( trans.hasOwnProperty( key ) ) {
	            tmp_ar[trans[key]] = key;
		}
	}
	return tmp_ar;
}

b91_enctab = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
	'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '#', '$',
	'%', '&', '(', ')', '*', '+', ',', '.', '/', ':', ';', '<', '=',
	'>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', '"'];
b91_dectab = array_flip(b91_enctab);

function base91_decode(d) {
	var l = d.length, v = -1, n=0, b=0, o='', c, i;
	for (i = 0; i < l; i+=1) {
		c = b91_dectab[d[i]];
		if (typeof c !== 'number') { continue; }
		if (v < 0) { v = c; }
		else {
			v += c * 91;
			b = b | ( v << n );
			if ((v & 8191) > 88) { n += 13; }
		  else { n += 14; }
			do {
				o += String.fromCharCode(b & 255);
				b = b >> 8;
				n -= 8;
			} while (n > 7);
			v = -1;
		}
	}
	if (v + 1 != 0) { o +=  String.fromCharCode((b | v << n) & 255); }
	return o;
}

function base91_encode(d) {
	var l = d.length, n=0, b=0, v=0, o='', i;
	for (i = 0; i < l; i+=1) {
		b |= d.charCodeAt(i) << n;
		n += 8;
		if (n > 13) {
			v = b & 8191;
			if (v > 88) {
				b >>= 13;
				n -= 13;
			} else {
				v = b & 16383;
				b >>= 14;
				n -= 14;
			}
			o += b91_enctab[v % 91] + b91_enctab[Math.floor( v / 91 )];
		}
	}
	if (n !== 0) {
		o +=  b91_enctab[b % 91];
		if (n > 7 || b > 90) { o += b91_enctab[Math.floor( b / 91 )]; }
	}
	return o;
}