
const sg = new ShapeGenerator();
id1 = sg.makeShape("./Audio.mp3", "sizingAudioVis", "Shape Of You");
sg.changeTheme(id1, "blue");
document.getElementById("changeSmall").addEventListener("click", function(){ 
    sg.changeSize(id1, 0);
});
document.getElementById("changeMedium").addEventListener("click", function(){ 
    sg.changeSize(id1, 1);
});
document.getElementById("changeLarge").addEventListener("click", function(){ 
    sg.changeSize(id1, 2);
});


id2 = sg.makeShape("./Audio3.mp3", "audioVisTheme", "Lost In Illusion");
sg.changeSize(id2, 1);
document.getElementById("changeYellow").addEventListener("click", function(){ 
    sg.changeTheme(id2, "yellow");
});
document.getElementById("changeBlue").addEventListener("click", function(){ 
    sg.changeTheme(id2, "blue");
});
document.getElementById("changePink").addEventListener("click", function(){ 
    sg.changeTheme(id2, "pink");
});


id3 = sg.makeShape("./Audio2.mp3", "audioVisInfo", "Unravel");
sg.changeSize(id3, 1);
sg.changeTheme(id3, "pink");
document.getElementById("addInfo").addEventListener("click", function(){ 
    content = document.getElementById("changeInfoText").value
    sg.addToInfo(id3, content);
    document.getElementById("changeInfoText").value = ""
});
document.getElementById("changeInfo").addEventListener("click", function(){ 
    content = document.getElementById("changeInfoText").value
    sg.changeInfo(id3, content);
    document.getElementById("changeInfoText").value = ""
});
 
sg.addToInfo(el5, "<br>Author: Ed Sheeran <br>Released: 6 January 2017");