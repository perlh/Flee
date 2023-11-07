/*
str = "102,0,100,0,115,0,97,0,102,0,115,0,97,0,100,0"
*/

function int2hex(str){
    str = str.split(',');
    for(let i = 0; i < str.length; i++) {
        num = str[i];
        hex1 = num.toString(16);

        // console.log(hex1);
      }
    
}

int2hex("12,0,100,0,115,0,97,0,102,0,115,0,97,0,100,0");