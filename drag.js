// from this stack overflow question and answer https://stackoverflow.com/questions/53247852/javascript-moveable-divs-with-javascript
function dragElement(elmnt) {
    console.log("help");
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var newX, newY;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:

        newX = elmnt.offsetLeft - pos1;
        newY = elmnt.offsetTop - pos2;

        console.log("height:" +window.innerHeight);
        if(newY < window.innerHeight - elmnt.offsetHeight && newY > 0 &&
            newX < screen.width - elmnt.offsetWidth && newX > 0){
            elmnt.style.top = newY + "px";
            elmnt.style.left = newX+ "px";
        }
        // if(newX < screen.width - elmnt.offsetWidth && newX > 0) {
        //     elmnt.style.left = newX+ "px";
        // }


        //change panning of audio if controller
        if(playing){
            playConstruction(elmnt.offsetLeft);
            if (elmnt == clubController){
                panClub(elmnt.offsetLeft);
            }
        }
        
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        //print new html
        console.log("top: " + elmnt.style.top + "; left: " + elmnt.style.left + ";")
        elmnt.classList.remove('large');
        document.onmouseup = null;
        document.onmousemove = null;
        stopConstructionNoise();
    }
}

function enlargeElement(elmnt) {
    elmnt.addEventListener('dblclick', function (e) {
        elmnt.classList.toggle('large');
        stopConstructionNoise();
    });
}