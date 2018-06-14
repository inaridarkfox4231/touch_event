// 問題集
var query = new Array;
for(var i = 1; i < 120; i++){
    img = new Image();
    img.src = "./interval/IV" + i.toString() + ".png";
    query.push(img);
}
var white = new Image();
white.src = "./interval/WHITE.png";
// 解答
var ans = ["M3", "m3", "m3", "M3", "P5", "P4", "P5", "m6", "m7", "M7", "m2", "m3",
           "m3", "m3", "M3", "m3", "m3", "M3", "+4", "+4", "m2", "m3", "M7", "M6",
            "m6", "P5", "o5", "+4", "P4", "P5", "P5", "o5", "+4", "M2", "M2", "M2",
            "P4", "P5", "M2", "M2", "m2", "M2", "M2", "M2", "m2", "M3", "m3", "m3",
           "M3", "M3", "m3", "m3", "P4", "P4", "P4", "+4", "P4", "P4", "P4", "P5",
           "P5", "P5", "P5", "P5", "P5", "o5", "M6", "M6", "m6", "M6", "M6", "m6",
           "m6", "M7", "m7", "m7", "M7", "m7", "m7", "m7", "P4", "P4", "P4", "P4",
           "P4", "P4", "P5", "P5", "P5", "P5", "P5", "P5", "+4", "+4", "o5", "o5",
           "+4", "o5", "o5", "o5", "o5", "+4", "+4", "o5", "m2", "M2", "m3", "M3",
           "P4", "o5", "P5", "m6", "o7", "m7", "M7", "o7", "o4", "o4", "+2"]

//0~118のランダム化を行う（ことができればいいな）
var seq = [];
var queryId = [];
for(var i = 0; i < 119; i++){ seq.push(i); }
for(var i = 0; i < 119; i++){
    var k = Math.floor(Math.random() * (119 - i));
    queryId.push(seq[k]);
    seq[k] = seq[118 - i];
}
for(var i = 0; i < 20; i++){
   console.log(queryId[i]);
}

function get_ctx(){
    // メイン関数（コンテクストの取得）
    var canvas = document.getElementById("Query");
    if(!canvas.getContext){ return; }
    var ctx = canvas.getContext("2d");
    return ctx;
}

function show_ans(i, flag){
    document.getElementById("ans").innerText = ans[i];
    if(flag){
        document.getElementById("correct").innerText = "　正解！";
    }else{
        document.getElementById("wrong").innerText = "　不正解！";
    }
}

function set_img(i){
   var ctx = get_ctx();
   ctx.drawImage(white, 0, 0);
   ctx.drawImage(query[i], 15, 15);
}

var x = -1;
var answered = true;

document.getElementById("nextQuery").addEventListener("click", function(e){
    if(answered){
         x += 1;
         if(x == 118){ x = 0; }
         document.getElementById("interval").value = "";
         document.getElementById("ans").innerText = "";
         document.getElementById("correct").innerText = "";
         document.getElementById("wrong").innerText = "";
         document.getElementById("nextQuery").innerText = "解答する";
         set_img(queryId[x]);
         answered = false;
         return;
    }else{
         var s = document.getElementById("interval").value;
         console.log(s);
         if(s.length < 2){ return; }
         show_ans(queryId[x], s == ans[queryId[x]]);
         answered = true;
         document.getElementById("nextQuery").innerText = "次の問題";
    }
})

function init(){
    document.getElementById("nextQuery").innerText = "はじめる";
}
