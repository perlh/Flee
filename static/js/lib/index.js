function test1() {  // 通过chrome.runtime.sendMessage发送消息给background.js
    fetch('https://md5.hsm.cool/api?hash=21232f297a57a5a743894a0e4a801fc3')
        .then(response => {
            // console.log('Response status:', response.status);
            // if(response.status!=200){
            //     return 
            // }
            alert(response.status)
            return response.json();
        })
        .then(data => {
            // console.log('Hash:', data.hash);
            // alert(data)
            alert(data.hash);
            
            alert(data.data);
        })
        .catch(error => {
            alert(error);
        });
}

let onEmpty2 = document.getElementById("fetchButton");
onEmpty2.onclick = test1;

