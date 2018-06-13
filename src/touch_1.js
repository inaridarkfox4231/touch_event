var play_on = [false, false, false, false];

audiojs.events.ready(function(){
   var a = audiojs.createAll();
   var audio = a[0];
   var sound_C4 = a[1];
   var sound_C4sharp = a[2];
   var sound_D4 = a[3];
   document.getElementById("fox").addEventListener("click", function(e){
       if(!play_on[0]){ audio.play(); play_on[0] = true;
       }else{ audio.pause(); play_on[0] = false; }
   });
   document.getElementById("C4").addEventListener("click", function(e){
     if(!play_on[1]){ sound_C4.play(); play_on[1] = true;
     }else{ sound_C4.pause(); play_on[1] = false; }
   })
   document.getElementById("C4sharp").addEventListener("click", function(e){
     if(!play_on[2]){ sound_C4sharp.play(); play_on[2] = true;
     }else{ sound_C4sharp.pause(); play_on[2] = false; }
   })
   document.getElementById("D4").addEventListener("touchstart", function(e){
      if(!play_on[3]){ sound_D4.play(); play_on[3] = true; }
   }, false)
   document.getElementById("D4").addEventListener("touchend", function(e){
      if(play_on[3]){ sound_D4.pause(); play_on[3] = false; }
   }, false)
});
