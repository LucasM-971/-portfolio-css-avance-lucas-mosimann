const openBtn = document.getElementById('open-window');
const windowBox = document.getElementById('floating-window');
const header = document.getElementById('header');

openBtn.addEventListener('click', () => {
    windowBox.style.display = 'block';
});

// DRAG & DROP
let isDragging = false;
let offsetX, offsetY;

header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowBox.offsetLeft;
    offsetY = e.clientY - windowBox.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        windowBox.style.left = `${e.clientX - offsetX}px`;
        windowBox.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});


const closeBtn = document.getElementById('close-window');

closeBtn.addEventListener('click', () => {
    windowBox.style.display = 'none';
});


// Fermer le popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
function openPopup() {
    document.getElementById("popup").style.display = "block";
}
// Rendre le popup déplaçable
dragElement(document.getElementById("popup"));

function dragElement(elmnt) {
    const dragZone = document.getElementById("drag-zone");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    dragZone.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Position initiale du curseur
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calcul du déplacement
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Appliquer la position
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


