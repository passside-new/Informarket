'use strict'

let cookies = document.cookie;
let cookiesArray = cookies.split(';');
let product_name = 0;
let price = 0;
let product_describe = 0;
let cArray = 0;
let test1 = 'product_name';
let test2 = 'price';
let test3 = 'product_describe';
function onLoad(){
  for (let c of cookiesArray){
    cArray = c.split("=");
    console.log(cArray[0]);
    console.log(btoa(cArray[0]));
    if ((btoa(cArray[0]) === 'IGl0ZW1OYW1l') || (btoa(cArray[0]) === btoa('product_name'))){
      //'IGl0ZW1OYW1l'は'itemName'の文字コード
      itemName = cArray[1];
      console.log(product_name);
    } else if ((btoa(cArray[0]) === 'IHNlbGxQb2ludA==') || (btoa(cArray[0]) === btoa('price'))){
      //'c2VsbFBvaW50'は'sellPoint'の文字コード
      sellPoint = cArray[1];
      console.log(price);
    } else if ((btoa(cArray[0]) === 'IGludHJvQ29udGVudA==')|| (btoa(cArray[0]) === btoa('product_describe'))){
      //'IGludHJvQ29udGVudA=='は'introContent'の文字コード
      introContent = cArray[1];
      console.log(product_describe);
    } else {
      console.log(cArray[0].charCodeAt());
    }
  }
  document.getElementById("product_name").textContent += decodeURIComponent(product_name);
  document.getElementById("price").textContent += price;
  document.getElementById("product_describe").textContent += decodeURIComponent(product_describe);
  console.log(decodeURIComponent(product_describe));
  console.log(test1.charCodeAt());
  console.log(test2.charCodeAt());
  console.log(test3.charCodeAt());
};

window.onload = onLoad;