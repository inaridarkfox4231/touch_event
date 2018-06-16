// 問題集
var query = new Array;
for(var i = 1; i <= 120; i++){
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
           "P4", "o5", "P5", "m6", "o7", "m7", "M7", "o7", "o4", "o4", "+2", "+3"]

// 0~119のランダム化を行う（ことができればいいな）
var seq = [];
var queryId = [];
for(var i = 0; i < 120; i++){ seq.push(i); }
for(var i = 0; i < 120; i++){
    var k = Math.floor(Math.random() * (120 - i));
    queryId.push(seq[k]);
    seq[k] = seq[119 - i];
}

// 2~7の問題がいくつあるかチェック
var kind = [0, 0, 0, 0, 0, 0, 0, 0]
// 2~7のうち何問解けたかチェック
var correct = [0, 0, 0, 0, 0, 0, 0, 0]
// テスト用
for(var i = 0; i < 120; i++){
   kind[parseInt(ans[i][1])]++;
}
for(var i = 2; i <= 7; i++){ console.log(i.toString() + "の問題は" + kind[i].toString() + "問")}

function get_ctx(){
    // メイン関数（コンテクストの取得）
    var canvas = document.getElementById("Query");
    if(!canvas.getContext){ return; }
    var ctx = canvas.getContext("2d");
    return ctx;
}
// 正誤出力
function show_ans(i, flag){
    document.getElementById("ans").innerText = ans[i];
    if(flag){
        document.getElementById("correct").innerText = "　正解！";
        correct[parseInt(ans[i][1])]++;  // 正解したらカウント
    }else{
        document.getElementById("wrong").innerText = "　不正解！";
    }
}
// 問題の画像生成
function set_img(i){
   var ctx = get_ctx();
   ctx.drawImage(white, 0, 0);
   ctx.drawImage(query[i], 15, 15);
}

var x = -1;
var answered = true;

// クリックによる問題送り、解答
document.getElementById("nextQuery").addEventListener("click", function(e){
    if(answered){ makeNextQuery();
    }else{ judge(); }
})
// エンターキーによる問題送り、解答
document.addEventListener("keydown", function(e){
    if(e.keyCode == 13){
        if(answered){ makeNextQuery();
        }else{ judge(); }
    }
})

// 次の問題を生成する関数
function makeNextQuery(){
    x += 1;
    if(x == 120){ x = 0; reset(); }
    document.getElementById("toptext").innerText = "第" + (x + 1).toString() + "問";
    document.getElementById("interval").value = "";
    document.getElementById("interval").focus();
    document.getElementById("ans").innerText = "";
    document.getElementById("correct").innerText = "";
    document.getElementById("wrong").innerText = "";
    document.getElementById("nextQuery").innerText = "解答する";
    set_img(queryId[x]);
    answered = false;
}

// 入力欄の正誤判定を行う関数
function judge(){
    var s = document.getElementById("interval").value;
    if(s.length < 2){ return; }
    show_ans(queryId[x], s == ans[queryId[x]]);
    answered = true;
    document.getElementById("nextQuery").innerText = "次の問題";
    if(x == 119){ show_result(); }
}

// 結果表示（2～7についてそれぞれ何問正解したかっていう）
function show_result(){
    for(var i = 2; i <= 7; i++){ result(i); }
}

// resyltの部分関数
function result(i){
    _str_ = i.toString() + "度：" + correct[i].toString() + "/" + kind[i].toString() + "　";
    document.getElementById("IV_" + i.toString()).innerText = _str_;
}

// リセット処理（文字列解放）
function reset(){
    for(var i = 2; i <= 7; i++){
        document.getElementById("IV_" + i.toString()).innerText = "";
        correct[i] = 0;
    }
}

// 初期化
function init(){
    document.getElementById("nextQuery").innerText = "はじめる";
}
