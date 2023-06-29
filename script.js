
$(function(){
    var actual=0;
    var data = [];
    
    data[0] = ["Esercizi di stile(rinquore)", "La morte di Rinquore (14/02/08) // Rancore", "3:04","1",0,"la_morte_di_rinquore.jpg","la_morte_di_rinquore.mp3"];
    data[1] = ["Live Forever", "LIVE FOREVER // lil peep", "2:40","2",1,"live_forever.jpg","live_forever.mp3"];
    data[2] = ["Ultimo mondo Cannibale", "Destroy the Enemy // Dsa Commando", "3:35","3",2,"ultimo_mondo_cannibale.jpg","ultimo_mondo_cannibale.mp3"];
    data[3] = ["Note Killer", "Mi Fist // Club Dogo", "4:24","4",3,"note_killer.jpg","note_killer.mp3"];
    data[4] = ["The indutry don't understand", "60Hz // DJ Shocca", "3:05","5",4,"the_industry_dont_understand.jpg","the_industry_dont_understand.mp3"];

    var suono = new Audio(data[0][6]);
    $("#name_of_song").html(data[0][0]);
    $("#album_and_artist").html(data[0][1]);
    $("#totalTime").html(data[0][2]);
    var durationTime=(parseInt(data[0][2].slice(0,1)*60)+parseInt(data[0][2].slice(2,4)));
    var state=0;
    var percent=0;
    var timerForSong = setInterval(timerForSongv2, 1000);
    setInterval(timerForMinutev2, 1000);
    function startTimer() {
        timerForSong = setInterval(timerForSongv2, 1000);
      }
    function stopTimer() {
        clearInterval(timerForSong);
      }

    $('#plusButton').click(function(){
        if (state>=durationTime) {
            $("#stateTime").html("0:00");
        }else{
            if($("#cheky").prop("checked")){state=state+4;}else{state=state+5;}
            checkTheProgressBar();
            suono.currentTime=state;
        }
    });

    $('#minusButton').click(function(){
        if ($("#cheky").prop("checked")) {state=state-6;}else{state=state-5;}
            if (state<=0) {
                $("#stateTime").html("0:00");
                state=0;
            }
            suono.currentTime=state;
            checkTheProgressBar();
    });

    $('#skipButton').click(function(){
        suono.pause()
        data[0][4]=data[data.length-1][4]+1;
        data.sort(function(a, b) {return a[4] - b[4];});
        resetAll();
        if ($("#cheky").prop("checked")) {suono.play();}
        setTheTopImage();
    });

    $('#cheky').click(function(){
        if ($("#cheky").prop("checked")) { suono.play();}else{suono.pause();}
    });


    $('#skipBackButton').click(function(){
        suono.pause()
        for (let i = 0; i < data.length-1; i++){data[i][4]+=1}
        data[data.length-1][4]=0
        console.log(data)
        data.sort(function(a, b) {return a[4] - b[4];});
        resetAll();
        if ($("#cheky").prop("checked")) {suono.play();}
        setTheTopImage();
    });


    $('#pointer').draggable({
        axis: 'x',
        containment: "#baseProgressBar",
        drag: function() {
            
          stopTimer();
          suono.pause();
          var progressBarWidth = parseFloat($("#baseProgressBar").css("width"));
          var pointerPosition = parseFloat($(this).css("left"));
          var xPos = (pointerPosition / progressBarWidth) * 100 + "%";
          state = (pointerPosition / progressBarWidth) * durationTime;
          percent=xPos
          $('#progressBar').css("width", xPos);
          $("#stateTime").html(timeFormatter(Math.floor(state)));
          suono.currentTime = state;
          if (xPos!=100) {
          }
        }
      });
      
      $('#pointer').on('dragstop', function() {
        if ($("#cheky").prop("checked")){suono.play();}
        
        startTimer();

      });
      
      
    function setTheTopImage(){
        $("#fir_image").attr("src",data[1][5]);
        $("#sec_image").attr("src",data[2][5]);
        $("#thi_image").attr("src",data[3][5]);
        $("#fou_image").attr("src",data[4][5]);
    }

    function checkTheProgressBar(){
        if(Math.floor(state*100/durationTime)!=percent){
            percent=Math.floor(state*100/durationTime);
            if (percent<0) {
                percent=0;
                state=0;
            }
            if (percent>=100){percent=0;
                $("#progressBar").css("width",0+"%");
                $("#stateTime").html("0:00");
                
            } else if (percent<=0){percent=0;
                $("#progressBar").css("width",0+"%");
                $("#stateTime").html("0:00");
            }
            $("#progressBar").css("width",percent+"%");
            var progressBarWidth = $("#progressBar").css("width");
            $("#pointer").css("left", progressBarWidth);
        }
    }

    function timerForSongv2(){
        slist(document.getElementById("imageList"));
        if ($("#cheky").prop("checked")) {
            state++; 
            if (state>=durationTime){
                suono.pause()
                data[0][4]=data[data.length-1][4]+1;
                data.sort(function(a, b) {return a[4] - b[4];});
                suono=new Audio(data[0][6]);
                resetAll();
                setTheTopImage();
                suono.play();
            }
        }
        
    }
    function timerForMinutev2(){
           checkTheProgressBar();
           $("#stateTime").html(timeFormatter(Math.floor(state)));
    }
     
    function slist (target) {
        target.classList.add("slist");
        let items = target.getElementsByTagName("li"), current = null;
        for (let i of items) {
          i.draggable = true;
          i.ondragstart = e => { current = i; };
          i.ondragover = e => e.preventDefault();
          i.ondrop = e => {
            if (i != current) {
                let tmp = null;
                let currentpos = 0, droppedpos = 0;

                for (let it = 0; it < items.length; it++) {
                    if (current == items[it]) { currentpos = it; }
                    if (i == items[it]) { droppedpos = it; }
                }
                var sup =data[currentpos+1][4];
                data[currentpos+1][4]=data[droppedpos+1][4];
                data[droppedpos+1][4]=sup;
                data.sort(function(a, b) {return a[4] - b[4];});

                tmp = items[currentpos].querySelector('div > div > img').src;
                items[currentpos].querySelector('div > div > img').src = items[droppedpos].querySelector('div > div > img').src;
                items[droppedpos].querySelector('div > div > img').src = tmp;

                setTheTopImage();
            }
          };
        }
      }

      function resetAll(){
        state=0;
        $("#pointer").css("left", "0px")
        $("#stateTime").html("0:00");
        $("#progressBar").css("width",0+"%");
        $("#name_of_song").html(data[0][0]);
        $("#album_and_artist").html(data[0][1]);
        $("#totalTime").html(data[0][2]);
        $("#main_image").attr("src",data[0][5]);
        durationTime=(parseInt(data[0][2].slice(0,1)*60)+parseInt(data[0][2].slice(2,4)));durationTime=(parseInt(data[0][2].slice(0,1)*60)+parseInt(data[0][2].slice(2,4)));
        suono = new Audio(data[0][6]);
      }
});


    function timeFormatter(time) {
        let secs = time % 60; if (secs <= 9) secs = "0" + secs;
        return Math.floor(time / 60) + ":" + secs;
    }
