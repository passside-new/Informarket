'use strict'

const file = document.getElementById("upload");
const product_name = document.getElementById("product_name");
const product_describe = document.getElementById("product_describe");
const price = document.getElementById("price");
const tag = document.getElementById("tag");

// document.getElementById("uploadCheck").addEventListener('click', () =>{
//   const itemName = encodeURIComponent(item.value);
//   const introContent = encodeURIComponent(intro.value);
//   //const tagName = encodeURIComponent(tag.value);
//   document.cookie = 'itemName=' + itemName;
//   document.cookie = 'introContent=' + introContent;
//   document.cookie = 'sellPoint=' + sell.value;
//   //document.cookie = 'tagName=' + tag.value;
// });

upload.addEventListener('click',()=>{
  const product_name = encodeURIComponent(product_name.value);
  const product_describe = encodeURIComponent(product_describe.value);
  //const tagName = encodeURIComponent(tag.value);
  document.cookie = 'product_name=' + product_name;
  document.cookie = 'product_describe=' + product_describe;
  document.cookie = 'price=' + price.value;
  //document.cookie = 'tagName=' + tag.value;
  setTimeout(function(){
    location.href = './buy_check.html';
  }, 1*1000);
});