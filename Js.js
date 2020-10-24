window.onload = function(){
   console.log("hello world")
   var Times = [];
   Times.push({
       key: "practiceTime",
       value: Date.now()
   })
   var DbDistances = [];
   var anyClickLoc = [];
    var div = document.getElementById("plattegrond");
    var divOffset = offset(div);
    console.log(divOffset.left, divOffset.top);
    var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
    var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
    var goal = {x:goalleft, y:goaltop} 
    var click = {x:0, y:0};
    localStorage.setItem("currentTask", -4)
    var show = false;
    document.getElementById("eventPreview").style.opacity = "0"
    nextTask()
    //var pgloc = {x:document.getElementById("plattegrond").pageX, y:document.getElementById("plattegrond").pageY};
    //var plattegrondpositie = $("#plattegrond").position();
    // example use
    //var div = document.querySelector('plattegrond');
    //console.log(plattegrondpositie)

    function getClickLocation(event){
         click["x"] = event.pageX - divOffset.left;
         click["y"] = event.pageY - divOffset.top;
        console.log(click)
        eventPreview(click, show);
    }

    function Distance(click, goalX, goalY){
        if ((click["x"] == goalX - divOffset.left) && (click["y"] == goalY - divOffset.top)) {
            return 0;
        }
        else {
            var deltaX = goalX - click["x"] //- divOffset.left + 80
            var deltaY = goalY - click["y"] //- divOffset.top + 80
            deltaX *= deltaX;
            deltaY *= deltaY;
            dist = Math.round(Math.sqrt(deltaX + deltaY))
            return dist;
        }
    }

    function getDistanceToGoal(click, goal, opdrachtNummer){
        var keyname = "after" + opdrachtNummer + "Distance"
        if ((click["x"] == goal["x"] - divOffset.left) && (click["y"] == goal["y"] - divOffset.top)) {
            DbDistances.push({
                key: keyname,
                value: 0
            })
            return 0;
        }
        else {
            var deltaX = goal["x"] - click["x"] - divOffset.left
            var deltaY = goal["y"] - click["y"] - divOffset.top
            deltaX *= deltaX;
            deltaY *= deltaY;
            dist = Math.round(Math.sqrt(deltaX + deltaY))
            console.log(dist)
            DbDistances.push({
                key: keyname,
                value: dist
            })
            return dist;
        }
    }

    var methods = {
        init: function () {
            $(document).click(_handleClick);
        }
    };

    function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop + 40, left: rect.left + scrollLeft + 40 }
    }

    function nextTask(event){
        currentTask = localStorage.getItem("currentTask")
        //console.log("currenttask is:   " + parseInt(currentTask))
        volgendeOpdracht = parseInt(currentTask) + 1
        var keyname = "after" + currentTask + "Time"
        localStorage.setItem("currentTask", volgendeOpdracht)
        Times.push({
            key: keyname,
            value: Date.now()
        })
        changeTask(volgendeOpdracht)
    }



    function changeTask(opdrachtNummer){
        var img = document.getElementById("plattegrond");
        var Qtext = document.getElementById("Qtext");
        if(opdrachtNummer == -4){
            document.getElementById("plattegrond").style.display = "none";
        }
        else if(opdrachtNummer == -3){
            //PLATTEGROND 1 TEST
            img.src = "plattegrond1.png";
            Qtext.innerHTML = "Je wilt graag Horen wat Emma Watson vond van het spelen in Harry Potter";    
            var goalleft = divOffset.left + 116; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 389; //y doelcoordinaat waar 0 = bovenkant van de afbeelding 116, 389
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == -2){
            //PLATTEGROND 2 TEST
            document.getElementById("eventPreview").style.opacity = "0"
            document.getElementById("part2").style.display = "block"
            img.src = "plattegrond2.png";
            Qtext.innerHTML = "Je wilt voor je nieuwe baan graag Outlook leren gebruiken omdat dit daar de standaard mail provider is.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == -1){
            //PLATTEGROND 3 TEST
            categorieshow("theater")
            categorieshow("muziek")
            categorieshow("film")
            categorieshow("techniek")
            categorieshow("Overige")
            document.getElementById("part3").style.display = "none"
            img.src = "plattegrond3.png";
            Qtext.innerHTML = "Je hebt je ingeschreven voor de cursus Bier brouwen.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 0){
            document.getElementById("dubbelklik").style.display = "none";
            categoriehide("theater")
            categoriehide("muziek")
            categoriehide("film")
            categoriehide("techniek")
            categoriehide("Overige")
            document.getElementById("plattegrond").style.display = "none";
            document.getElementById("scrollcontainer").style.display = "none";
            Qtext.innerHTML = "Dit waren de testplattegronden. Op de volgende pagina begint het onderzoek. Dubbelklik om naar de volgende pagina te gaan.";
        }
        else if(opdrachtNummer == 1){
            Times.push({
                key: "StartTime",
                value: Date.now()
            })
            document.getElementById("dubbelklik").style.display = "block";
            document.getElementById("plattegrond").style.display = "block";
            img.src = "plattegrond1.png";
            Qtext.innerHTML = "Je bent van plan een cursus te volgen voor het maken van djembé muziek. Volgens de planning is die in lokaal 11. Klik op de locatie.";    
            var goalleft = divOffset.left + 116; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 389; //y doelcoordinaat waar 0 = bovenkant van de afbeelding 116, 389
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 2){
            img.src = "plattegrond1.png";
            Qtext.innerHTML = "Je wilt graag een concert bijwonen met muziek van Vivaldi.";
            var goalleft = divOffset.left + 634; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 236; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 3){
            img.src = "plattegrond1.png";
            Qtext.innerHTML = "Je bent van plan een film te maken in de toekomst en wilt graag weten hoe je de beste Thriller opbouwt.";
            var goalleft = divOffset.left + 367; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 303; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 4){
            img.src = "plattegrond1.png";
            Qtext.innerHTML = "Na het leren over films wil je graag weten hoe je een mooie poster kunt photoshoppen voor de film.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 5){
            img.src = "plattegrond1.png";
            Qtext.innerHTML = "Net klaar met de photoshop cursus wil je graag een heerlijk kopje koffie halen bij de dichtstbijzijnde koffietent.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 6){
            document.getElementById("part3").style.display = "block"
            categorieshow("theater")
            categorieshow("muziek")
            categorieshow("film")
            categorieshow("techniek")
            categorieshow("Overige")
            document.getElementById("eventPreview").style.opacity = "0"
            document.getElementById("part2").style.display = "block"
            document.getElementById("scrollcontainer").style.display = "block";
            img.src = "plattegrond2.png";
            Qtext.innerHTML = "Je bent van plan een cursus te volgen voor het schilderen van natuur. Volgens de planning is die in lokaal 47. Klik op de locatie";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 7){
            img.src = "plattegrond2.png";
            Qtext.innerHTML = "Je hebt net de schilder cursus achter de rug en hebt zin in een kopje koffie. Klik op het dichtstbijzijnde koffiekraampje.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 8){
            img.src = "plattegrond2.png";
            Qtext.innerHTML = "Je wilt thuis een bureau bouwen om thuis te werken maar hebt geen flauw idee hoe je hout moet zagen dus dat wil je op dit festival graag leren.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 9){
            img.src = "plattegrond2.png";
            Qtext.innerHTML = "Je bent geïnteresseerd in rock muziek en wilt graag meer weten over dit genre.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop}
            getDistanceToGoal(click, goal, opdrachtNummer); 
        }
        else if(opdrachtNummer == 10){
            img.src = "plattegrond2.png";
            Qtext.innerHTML = "Voor je werk is het handig om te weten hoe EHBO werkt. Je zoekt hier de juiste activiteit om dit te leren.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 11){
            categorieshow("theater")
            categorieshow("muziek")
            categorieshow("film")
            categorieshow("techniek")
            categorieshow("Overige")
            document.getElementById("part3").style.display = "none"
            img.src = "plattegrond3.png";
            Qtext.innerHTML = "Je bent van plan een cursus te volgen voor het maken van een vogelhuisje. Volgens de planning is die in lokaal 27. Klik op de locatie";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 12){
            img.src = "plattegrond3.png";
            Qtext.innerHTML = "Je hoorde van vrienden dat Pierre Bokma op het festival zou zijn. Je zou graag een activiteit volgen bij hem.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 13){
            img.src = "plattegrond3.png";
            Qtext.innerHTML = "Bij Pierre Bokma heb je de smaak te pakken gekregen en je gaat direct door naar de improvisatie activiteit.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 14){
            img.src = "plattegrond3.png";
            Qtext.innerHTML = "Je hebt net de improvisatie cursus achter de rug en hebt zin in een kopje koffie. Klik op het dichtstbijzijnde koffiekraampje.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 15){
            img.src = "plattegrond3.png";
            Qtext.innerHTML = "Graag zou je als souvenir van dit festival iets in 3D willen printen om naar huis te nemen. Gelukkig is hier een cursus voor.";
            var goalleft = divOffset.left + 100; //x doelcoordinaat waar 0 = linkerkant van de afbeelding
            var goaltop = divOffset.top + 150; //y doelcoordinaat waar 0 = bovenkant van de afbeelding
            var goal = {x:goalleft, y:goaltop} 
            getDistanceToGoal(click, goal, opdrachtNummer);
        }
        else if(opdrachtNummer == 16){
            //SAVE ALL DICTS AND DATAS
            document.getElementById("dubbelklik").style.display = "none";
            categoriehide("theater")
            categoriehide("muziek")
            categoriehide("film")
            categoriehide("techniek")
            categoriehide("Overige")
            document.getElementById("plattegrond").style.display = "none";
            document.getElementById("scrollcontainer").style.display = "none";
            Qtext.innerHTML = "Bedankt voor het testen van de plattegronden. Om het onderzoek af te ronden vraag ik u om de download knop aan te klikken en over te gaan naar de google forms survey. Deze vragenlijst bestaat uit een klein aantal vragen. Aan het eind van de lijst kunt u het gedownloadde bestand uploaden zodat wij deze kunnen gebruiken voor het onderzoek.";
            document.getElementById("DownloadButton").style.display = "inline-block";
            //SAVE ALL DICTS AND DATAS
            // window.location.href = "eind.html";
            //var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
        }
    }

    function eventPreview(click, show){
        if(document.getElementById("plattegrond").src.includes("plattegrond1.png")){
            var x = click["x"];
            var y = click["y"];
            console.log("processed click")
            console.log(click)
            var prevImg = document.getElementById("eventPreviewImg");
            var prevText = document.getElementById("eventPreviewText")
            var margin = 30
            var didIOpen = false;
            var didIClose = false;
            var whatNumberOpened = null;
            if(document.getElementById("eventPreview").style.opacity == "1"){
                document.getElementById("eventPreview").style.opacity = "0"
                prevImg.style.opacity = "0"
                didIClose = true;
            }
            else if(Distance(click, 466, 50) < margin){    //1 //760x663
                console.log("correct")
                prevImg.src = "https://www.alysstephens.org/assets/2019/05/MTW-Scene-Work-1-1020x680.jpg";
                prevText.innerHTML = "Improvisatie. Bij deze cursus ga je je improvisatie skills bij het theater verbeteren."
                show=true;
                whatNumberOpened = 1;
            }
            else if(Distance(click, 507, 47) < margin){   //2
                prevImg.src = "https://fh-sites.imgix.net/sites/2354/2020/07/30125203/stand-up-comedy.jpg";
                prevText.innerHTML = "Stand up Comedy. Bij deze cursus leer je hoe het is om Stand up Comedian te zijn.";
                show=true;
                whatNumberOpened = 2;

            }
            else if(Distance(click, 587, 35) < margin){   //3
                prevImg.src = "https://upload.wikimedia.org/wikipedia/commons/b/b2/Chopiniana_Baku.jpg";
                prevText.innerHTML = "Ballet. Leer alles wat je maar wilt weten over ballet.";
                show=true;
                whatNumberOpened = 3

            }
            else if(Distance(click, 640, 32) < margin){   //4
                prevImg.src= "https://flevopost.nl/media/ODkwNzFfNGFjMDU1OTNiODhjNjdlZDQ3MDU0OGZmYzNjOTllODVjZDY2Y2I5Y182MjB4QzM1MDB4MTk2OSswKzkx.jpg";
                prevText.innerHTML = "Circustheater. Bekijk een voorstelling en probeer zelf ook wat stunts!";
                show=true;
                whatNumberOpened = 4


            }
            else if(Distance(click, 684, 70) < margin){   //5
                prevImg.src= "https://theaterzuidplein.nl/wp-content/uploads/2018/12/2019-02-10-G-Drempeltheater_banner-6-1047x648-c-center.jpg";
                prevText.innerHTML = "Drama. Wat is een drama voorstelling en waarom is het zo pakkend?";
                show=true;
                whatNumberOpened = 5

            }
            else if(Distance(click, 647, 94) < margin){   //6
                prevImg.src= "https://lokaal24.cdn-tmo.nl/files/maassluis24/2015/2015-09/JeugdtheaterhuisGroot.jpg";
                prevText.innerHTML = "Kindertheater. Een show voor de kinderen.";
                show=true;
                whatNumberOpened = 6

            }
            else if(Distance(click, 522, 87) < margin){   //7
                prevImg.src= "https://www.dansstudiovanharten.nl/content/uploads/2019/03/20181216-IMG_1091a-Canon-EOS-5D-MKII-600x350.jpg";
                prevText.innerHTML = "Dans. Bekijk een prachtige dansvoorstelling van een lokale dansgroep.";
                show=true;
                whatNumberOpened = 7

            }
            else if(Distance(click, 467, 92) < margin){   //8
                prevImg.src= "https://i.ytimg.com/vi/LqjenOz0eJg/maxresdefault.jpg";
                prevText.innerHTML = "Poppenkast. Een leuke poppenkast voorstelling voor jong en oud.";
                show=true;
                whatNumberOpened = 8

            }
            else if(Distance(click, 528, 132) < margin){   //9
                prevImg.src= "https://images4.persgroep.net/rcs/ASkATl_SsEGWhre1IAofYoRCfck/diocontent/150075499/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8";
                prevText.innerHTML = "Pierre Bokma. Pierre vertelt over het theater leven.";
                show=true;
                whatNumberOpened = 9

            }
            else if(Distance(click, 526, 176) < margin){   //10
                prevImg.src= "https://www.theaterkrant.nl/wp-content/uploads/2020/03/selectie-bij-robert-010-1-1240x717.jpg";
                prevText.innerHTML = "Wat is Theater? Waar komt het vandaan?";
                show=true;
                whatNumberOpened = 10

            }
            else if(Distance(click, 532, 228) < margin){   //11
                prevImg.src= "https://afrikapercussie.nl/wp/wp-content/uploads/2019/11/Djembe-introductie-cursus-Afrika-PErcussie.jpeg";
                prevText.innerHTML = "Djembé. Leer alles over het afrikaanse drum instrument.";
                show=true;
                whatNumberOpened = 11

            }
            else if(Distance(click, 587, 255) < margin){   //12
                prevImg.src= "https://imgs.classicfm.com/images/126827?crop=16_9&width=660&relax=1&signature=Dpmy1aTCnL6rmQKTjnrNQTylmuY=";
                prevText.innerHTML = "Piano. Leer je eerste liedjes op de piano spelen.";
                show=true;
                whatNumberOpened = 12

            }
            else if(Distance(click, 638, 239) < margin){   //13
                prevImg.src= "https://www.concertgebouw.nl/media/cache/cdp_header__landscape/media/productionimage/image/201609-17-19-nederlands-philharmonisch-orkest-ronald-knapp-4.jpg";
                prevText.innerHTML = "Viool. Luister naar een prachtig stuk van Vivaldi gespeeld op viool.";
                show=true;
                whatNumberOpened = 13

            }
            else if(Distance(click, 696, 178) < margin){   //14
                prevImg.src= "https://muzeem.weebly.com/uploads/8/2/1/2/82122478/topography_orig.jpg";
                prevText.innerHTML = "Mime. Bekijk een voorstelling en leer hoe mime is ontstaan.";
                show=true;
                whatNumberOpened = 14

            }
            else if(Distance(click, 700, 278) < margin){   //15
                prevImg.src= "https://www.kaliberkunstenschool.nl/wp-content/uploads/2017/05/harp-3961060_1920-1024x683.jpg";
                prevText.innerHTML = "Harp. Hoe werkt een harp precies? Je leert het hier.";
                show=true;
                whatNumberOpened = 15

            }
            else if(Distance(click, 583, 340) < margin){   //16
                prevImg.src= "https://www.super-prof.nl/blog/wp-content/uploads/2019/05/akoestische-gitaar-1060x707.jpg";
                prevText.innerHTML = "Gitaar. Leer akkoorden spelen op de gitaar.";
                show=true;
                whatNumberOpened = 16

            }
            else if(Distance(click, 582, 402) < margin){   //17
                prevImg.src= "https://pixnio.com/free-images/2017/02/16/2017-02-16-13-29-22.jpg";
                prevText.innerHTML = "Rock. Wat maakt een goed rock nummer?";
                show=true;
                whatNumberOpened = 17

            }
            else if(Distance(click, 493, 282) < margin){   //18
                prevImg.src= "https://storage.demediahub.nl/45300000/45270000/45263000/148698521413357_45262786_1280.jpg";
                prevText.innerHTML = "Klassiek. aanschouw een prachtig orkest en leer over hoe het in elkaar zit.";
                show=true;
                whatNumberOpened = 18

            }
            else if(Distance(click, 429, 291) < margin){   //19
                prevImg.src= "https://blogs.chapman.edu/wp-content/uploads/sites/16/2017/12/D6A6720-740x410.jpg";
                prevText.innerHTML = "Montage. Wat gebeurt er tussen het maken van de film en de uitgave?";
                show=true;
                whatNumberOpened = 19

            }
            else if(Distance(click, 408, 335) < margin){   //20
                prevImg.src= "https://s.studiobinder.com/wp-content/uploads/2019/10/What-is-Stop-Motion-Animation-DIY-Animation-Featured-StudioBinder.jpg";
                prevText.innerHTML = "Stop-Motion. Maak je eigen stop motion film!";
                show=true;
                whatNumberOpened = 20

            }
            else if(Distance(click, 363, 300) < margin){   //21
                prevImg.src= "https://www.filmlijstjes.com/wp-content/uploads/2017/05/gone-girl.jpg";
                prevText.innerHTML = "Thriller. Wat maakt het thriller genre zo spannend?";
                show=true;
                whatNumberOpened = 21

            }
            else if(Distance(click, 300, 309) < margin){   //22
                prevImg.src= "https://www.freelancewriting.com/wp-content/uploads/2016/07/script-writing-for-films-1.jpg";
                prevText.innerHTML = "Scenario. Hoe schrijf je een pakkend maar realistisch scenario.";
                show=true;
                whatNumberOpened = 22

            }
            else if(Distance(click, 235, 315) < margin){   //23
                prevImg.src= "https://images3.persgroep.net/rcs/LAlLIcXOQWGE4kxqBfiAOwV5dUI/diocontent/120618618/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8";
                prevText.innerHTML = "Horror. Kijk een short film over horror.";
                show=true;
                whatNumberOpened = 23

            }
            else if(Distance(click, 153, 307) < margin){   //24
                prevImg.src= "https://www.raindance.org/wp-content/uploads/2018/02/continuit-1080x608.png";
                prevText.innerHTML = "Continuïteit. Hoe zorg je dat de continuiteit van een film goed zit?";
                show=true;
                whatNumberOpened = 24

            }
            else if(Distance(click, 242, 354) < margin){   //25
                prevImg.src= "https://www.filmacademie.ahk.nl/media/nfa/_processed_/d/8/csm_20161204_SETBEELDEN_AIMEE_u___DD5_020_kopie_7a20ba35ae.jpg";
                prevText.innerHTML = "Regie. Leer hoe de filmindustrie bij elkaar blijft plakken.";
                show=true;
                whatNumberOpened = 25

            }
            else if(Distance(click, 279, 350) < margin){   //26
                prevImg.src= "https://smallpressnetwork.com.au/wp-content/uploads/2016/12/Real-logo-1100x620.jpg";
                prevText.innerHTML = "Hoe geef je een film uit?";
                show=true;
                whatNumberOpened = 26

            }
            else if(Distance(click, 116, 389) < margin){   //27
                prevImg.src= "https://www.planetfem.com/wp-content/uploads/2015/03/vogelvilla-770x548.jpg";
                prevText.innerHTML = "Maak je eigen vogelhuisje voor thuis.";
                show=true;
                whatNumberOpened = 27

            }
            else if(Distance(click, 175, 399) < margin){   //28
                prevImg.src= "https://pennywatch.nl/wp-content/uploads/2020/04/3d-aandelen.png";
                prevText.innerHTML = "Ontwerp je eigen 3D model en print deze uit.";
                show=true;
                whatNumberOpened = 28

            }
            else if(Distance(click, 116, 436) < margin){   //29
                prevImg.src= "https://lh3.googleusercontent.com/proxy/11OuEGG8iQ6B9OwnRaicCRDVhfjAqsmXOUpJsKyXSLXZuOU80otmqyAmZ_HNqvnyMepumknEQWsKlnH-HcezKVz7mIQmht--j_ZScMrMaLuHWKKOuWcoZ_h9";
                prevText.innerHTML = "Leer eindelijk de juiste techniek voor het zagen.";
                show=true;
                whatNumberOpened = 29

            }
            else if(Distance(click, 183, 452) < margin){   //30
                prevImg.src= "https://www.talu.de/wp-content/uploads/2018/08/holzbalken-verbinden-97462983-fl.jpg";
                prevText.innerHTML = "Welke houtverbindingen zijn er en welke is perfect voor jouw project.";
                show=true;
                whatNumberOpened = 30

            }
            else if(Distance(click, 331, 395) < margin){   //31
                prevImg.src= "https://images1.persgroep.net/rcs/Qh_rIuaVEH_4hFn-Uo2MXvSs9QY/diocontent/153159234/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8";
                prevText.innerHTML = "Dwayne Johnson vertelt over zijn ervaringen in de filmindustrie.";
                show=true;
                whatNumberOpened = 31

            }
            else if(Distance(click, 331, 437) < margin){   //32
                prevImg.src= "https://images3.persgroep.net/rcs/cnKXto9AyG6V-_0Tlatu43HLm7M/diocontent/77015624/_fill/1403/900/?appId=21791a8992982cd8da851550a453bd7f&quality=0.9";
                prevText.innerHTML = "Emma Watson legt uit hoe het was om in Harry Potter te spelen.";
                show=true;
                whatNumberOpened = 32

            }
            else if(Distance(click, 219, 501) < margin){   //33
                prevImg.src= "https://images3.persgroep.net/rcs/tTik6qRgqWnnCF9hv8Haic3jdAs/diocontent/140119981/_fill/600/315/?appId=21791a8992982cd8da851550a453bd7f&quality=0.7";
                prevText.innerHTML = "Wat doet een automonteur?";
                show=true;
                whatNumberOpened = 33

            }
            else if(Distance(click, 90, 528) < margin){   //34
                prevImg.src= "https://amp.thenational.ae/image/policy:1.687873:1513633514/image/jpeg.jpg?f=16x9&w=1200&$p$f$w=dfa40e8";
                prevText.innerHTML = "biotechnologie. Wat is de toekomst?";
                show=true;
                whatNumberOpened = 34

            }
            else if(Distance(click, 48, 548) < margin){   //35
                prevImg.src= "https://www.super-prof.nl/blog/wp-content/uploads/2020/01/bioengineering-apparatuur.jpg";
                prevText.innerHTML = "bio-engineering en hoe het jouw leven beïnvloedt.";
                show=true;
                whatNumberOpened = 35

            }
            else if(Distance(click, 48, 586) < margin){   //36
                prevImg.src= "https://www.martijnboere.nl/wp-content/uploads/2014/12/side21.jpg";
                prevText.innerHTML = "Timmeren. Hoe hamer jij in 2 slagen een spijker in het hout?";
                show=true;
                whatNumberOpened = 36

            }
            else if(Distance(click, 41, 640) < margin){   //37
                prevImg.src= "https://i1.wp.com/bouwenuitvoering.nl/wp-content/uploads/2019/12/AAA-111.jpg?fit=940%2C470&ssl=1";
                prevText.innerHTML = "infrastructuur. waar gaat het fout?";
                show=true;
                whatNumberOpened = 37

            }
            else if(Distance(click, 92, 641) < margin){   //38
                prevImg.src= "https://www.ikwoonfijn.nl/wp-content/uploads/2019/04/Wandisolatie-in-huis.jpg";
                prevText.innerHTML = "Wat is de beste isolatietechniek voor het bouwen van een huis?";
                show=true;
                whatNumberOpened = 38

            }
            else if(Distance(click, 139, 639) < margin){   //39
                prevImg.src= "https://www.schramdelier.nl/wp-content/uploads/2019/06/lassen-1000x600.jpg";
                prevText.innerHTML = "metaalbewerking en waarom jij het moet leren.";
                show=true;
                whatNumberOpened = 39

            }
            else if(Distance(click, 113, 579) < margin){   //40
                prevImg.src= "https://www.biernet.nl/images/fr_post/64395-Bierbrouwen.jpg";
                prevText.innerHTML = "Doe het zelf bier brouwen voor thuis.";
                show=true;
                whatNumberOpened = 40

            }
            else if(Distance(click, 161, 578) < margin){   //41
                prevImg.src= "https://www.aob.nl/wp-content/uploads/2019/02/Natuurkunde-vso.jpg";
                prevText.innerHTML = "Beginners les over natuurkunde.";
                show=true;
                whatNumberOpened = 41

            }
            else if(Distance(click, 218, 640) < margin){   //42
                prevImg.src= "https://www.werkspot.nl/images/cms/original/5bc299fd-bf60-4626-8ef2-3a007195c03c.jpeg";
                prevText.innerHTML = "Metseltechnieken voor het bouwen van een muurtje.";
                show=true;
                whatNumberOpened = 42

            }
            else if(Distance(click, 271, 642) < margin){   //43
                prevImg.src= "https://persgroep.pubble.cloud/d9c7ad83/content/2019/9/e6d5c4d7-ec43-465a-bf78-4427513943fb_thumb840.jpg";
                prevText.innerHTML = "In deze EHBO cursus leer jij alles wat je moet weten in geval van nood.";
                show=true;
                whatNumberOpened = 43

            }
            else if(Distance(click, 331, 515) < margin){   //44
                prevImg.src= "https://web.fastcrm.rocks//files/NGFLORI/photo/small_14_groepslessen-cursus-bloemschikken.jpg";
                prevText.innerHTML = "Maak het mooiste bloemstuk voor jou in huis.";
                show=true;
                whatNumberOpened = 44

            }
            else if(Distance(click, 331, 562) < margin){   //45
                prevImg.src= "https://www.voyago.nl/wp-content/uploads/2018/11/mozaiek-947x500.jpg";
                prevText.innerHTML = "Maak een mooi stukje mozaïek voor aan de muur.";
                show=true;
                whatNumberOpened = 45

            }
            else if(Distance(click, 317, 643) < margin){   //46
                prevImg.src= "https://www.interiorinsider.nl/wp-content/uploads/2014/12/ccdcb24d42b02a49dc825a0bfd3b7f57.jpg";
                prevText.innerHTML = "Maak je eigen kerststukje voor op tafel.";
                show=true;
                whatNumberOpened = 46

            }
            else if(Distance(click, 383, 581) < margin){   //47
                prevImg.src= "https://images-na.ssl-images-amazon.com/images/I/71KaNz7a4JL._AC_SL1024_.jpg";
                prevText.innerHTML = "Leer schilderen in de stijl van Bob Ross.";
                show=true;
                whatNumberOpened = 47

            }
            else if(Distance(click, 365, 641) < margin){   //48
                prevImg.src= "https://www.outlooktransfer.com/media/error/outlook-standalone.jpg";
                prevText.innerHTML = "Leer nu outlook gebruiken voor je volgende baan of eigengebruik.";
                show=true;
                whatNumberOpened = 48

            }
            else if(Distance(click, 419, 583) < margin){   //49
                prevImg.src= "https://static.boredpanda.com/blog/wp-content/uploads/2015/06/photoshop-digital-art-martin-de-pasquale-fb__700.jpg";
                prevText.innerHTML = "Leer de basis van photoshop om je eigen plaatjes te bewerken.";
                show=true;
                whatNumberOpened = 49

            }
            else if(Distance(click, 424, 635) < margin){   //50
                prevImg.src= "https://www.toolshero.nl/wp-content/uploads/2017/08/design-thinking-toolshero.jpg";
                prevText.innerHTML = "Hoe ontwerp je een eigen logo?";
                show=true;
                whatNumberOpened = 50

            }
            else if(Distance(click, 477, 577) < margin){   //51
                prevImg.src= "https://www.ex-gm.be/Moppen/luc%20colin3.jpg";
                prevText.innerHTML = "Leer hoe je de besten moppen kunt tappen op de juiste momenten.";
                show=true;
                whatNumberOpened = 51

            }
            else if(Distance(click, 525, 563) < margin){   //52
                prevImg.src= "https://artpub.nl/imager/pagecontent/blog/117069/graffiti_d94dfa31b927e536a6112962ab29d002.jpg";
                prevText.innerHTML = "Schrijf je eigen initialen in graffiti.";
                show=true;
                whatNumberOpened = 52

            }
            else if(Distance(click, 515, 627) < margin){   //53
                prevImg.src= "https://media.wired.com/photos/5bbbf0c47dd50f2cfdb75023/125:94/w_1490,h_1120,c_limit/Drone-626576048.jpg";
                prevText.innerHTML = "Vlieg een eigen drone voor de beste shots.";
                show=true;
                whatNumberOpened = 53

            }
            else if(Distance(click, 587, 561) < margin){   //54
                prevImg.src= "https://moodindicator.online/wp-content/uploads/2019/05/Complimenten.jpg";
                prevText.innerHTML = "Leer goede complimenten geven voor de beste teamspirit.";
                show=true;
                whatNumberOpened = 54
            }
            else{
                show=false
            }
            
            if(show==true){
                //document.getElementById("eventPreview").style.display = "block";
                document.getElementById("eventPreview").style.opacity = "1"
                prevImg.style.opacity = "1"
                didIOpen = true;
            }
            else{
                //document.getElementById("eventPreview").style.display = "none";
                document.getElementById("eventPreview").style.opacity = "0"
                prevImg.style.opacity = "0"
                prevImg.src= "";
                prevText.innerHTML = "";
            }
            var keyname = "clickAt" + Date.now();
            anyClickLoc.push({
                key: keyname,
                value: [x, y, didIOpen, whatNumberOpened, didIClose, Date.now()]
            })
            console.log(anyClickLoc)
        }
    }

    document.addEventListener("click", getClickLocation);
    document.ondblclick = function() {nextTask(Event)};

    
    document.getElementById('DownloadButton').onclick = function(event){
        var data = JSON.stringify(Times) + "  \n \n \n  " + JSON.stringify(DbDistances) + "  \n \n \n  " + JSON.stringify(anyClickLoc);
        var json = data,
        blob = new Blob([json], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
    
        this.href = url;
        this.target = '_blank';
        
        // target filename
        this.download = `${name}.json`;
    }
}

function categorie(cat){
    var thiscat = document.getElementsByClassName(cat);

        if(document.getElementsByClassName(cat)[0].style.display == "none"){
            //check
            console.log("fas fa-check-circle " + cat + "3" );
            document.getElementsByClassName(cat + "3")[0].className = "fas fa-check-circle " + cat + "3" ;
            [].forEach.call(thiscat, function (e) {
                e.childNodes.forEach(el => {
                    if(el.style){
                        el.style.display = "";
                    }
                })
                e.style.display = "";
            });
        }
        else{
            document.getElementsByClassName(cat + "3")[0].className = "fas fa-circle " + cat + "3"  ;
            [].forEach.call(thiscat, function (e) {
                e.childNodes.forEach(el => {
                    if(el.style){
                        el.style.display = "none";
                    }
                })
                e.style.display = "none";
            });

        // [].forEach.call(thiscat, function (el) {
        //     e.style.display = "block";
        // });
    }
}

function categorieshow(cat){
    var thiscat = document.getElementsByClassName(cat);
    if(document.getElementsByClassName(cat)[0].style.display == "none"){
        //check
        [].forEach.call(thiscat, function (e) {
            e.childNodes.forEach(el => {
                if(el.style){
                    el.style.display = "";
                }
            })
            e.style.display = "";
        });
    }
}

function categoriehide(cat){
    var thiscat = document.getElementsByClassName(cat);
    if(document.getElementsByClassName(cat)[0].style.display == ""){
        //check
        [].forEach.call(thiscat, function (e) {
            e.childNodes.forEach(el => {
                if(el.style){
                    el.style.display = "none";
                }
            })
            e.style.display = "none";
        });
    }
}
