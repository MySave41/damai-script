// ==UserScript==
// @name Auto submit for piao.damai.cn
// @version      0.1
// @description  大麦网自动定时发送订票请求
// @author       Kagurazaka Kotori
// @homepageURL  https://github.com/kagurazakakotori/damai-script
// @downloadURL  https://raw.githubusercontent.com/kagurazakakotori/damai-script/master/Auto%20submit%20for%20piao.damai.cn.user.js
//
// @namespace Violentmonkey Scripts
// @match https://piao.damai.cn/*
// @grant none
// @require      https://cdn.bootcss.com/jquery/1.8.2/jquery.min.js
// 
// ==/UserScript==

let num = '4';  //所购买门票数量
let proId = '12068634';  //所购买门票之Price ID,F12可知
let startTime = 1514545200000;  //开票时间

console.log("Stalled:" + proId + "x" + num);

// DO NOT edit the following

let companyId = '872'; // 872 for Shanghai

if ($.now() < startTime) {
  // Get offset
  let serverTime = new Array();
  let localTime = new Array();
  let offset = new Array();
  let sum = 0;
  for (i = 0; i < 50; i++) {
    serverTime[i] = parseInt($.ajax({
      type: "GET",
      url: "../serverTime.aspx",
      async: false
    }).responseText);
    localTime[i] = $.now();
    offset[i] = serverTime[i] - localTime[i];
    console.log(offset[i]);
    sum += offset[i];
    setTimeout(2000);
  }
  console.log(sum)

  // calculate average offset
  let average = parseInt(sum / offset.length);
  console.log("Average delay:" + average);

  let interval = setInterval(function () {
    console.log("Now" + $.now());
    console.log("serverTime" + ($.now() + average));
    if (($.now() + average) >= startTime) {
      clearInterval(interval);
      location.href = "//www.damai.cn/GotoShopping.aspx?_action=Immediately&proId=" + proId + "&optype=1&companyId=" + companyId + "&num=" + num + "&n=0";
      console.log("RequestSent");
    }
  }, 20);
} else {
  location.href = "//www.damai.cn/GotoShopping.aspx?_action=Immediately&proId=" + proId + "&optype=1&companyId=" + companyId + "&num=" + num + "&n=0";
  console.log("RequestSent");
}