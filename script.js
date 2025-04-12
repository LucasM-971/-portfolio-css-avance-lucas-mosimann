const openBtn = document.getElementById('open-window');
const windowBox = document.getElementById('floating-window');
const header = document.getElementById('header');

openBtn.addEventListener('click', () => {
    windowBox.style.display = 'block';
});

let isDragging = false;
let offsetX, offsetY;

header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowBox.offsetLeft;
    offsetY = e.clientY - windowBox.offsetTop;
});

header.addEventListener('touchstart', (e) => {
    isDragging = true;
    offsetX = e.touches[0].clientX - windowBox.offsetLeft;
    offsetY = e.touches[0].clientY - windowBox.offsetTop;
}, { passive: false });

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        windowBox.style.left = `${e.clientX - offsetX}px`;
        windowBox.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        windowBox.style.left = `${e.touches[0].clientX - offsetX}px`;
        windowBox.style.top = `${e.touches[0].clientY - offsetY}px`;
    }
}, { passive: false });

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('touchend', () => {
    isDragging = false;
}, { passive: false });

const closeBtn = document.getElementById('close-window');

closeBtn.addEventListener('click', () => {
    windowBox.style.display = 'none';
});

closeBtn.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    e.preventDefault();
    windowBox.style.display = 'none';
}, { passive: false });

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

dragElement(document.getElementById("popup"));

function dragElement(elmnt) {
    const dragZone = document.getElementById("drag-zone");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    dragZone.onmousedown = dragMouseDown;
    dragZone.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        e.preventDefault();
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.touches) {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        }
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

const openFormBtn = document.getElementById('open-form');
const noteForm = document.getElementById('note-container');
const cancelBtn = document.getElementById('cancel-btn');

openFormBtn.addEventListener('click', () => {
    noteForm.style.display = 'block';
    noteForm.style.position = 'absolute';
    noteForm.style.left = '50%';
    noteForm.style.top = '50%';
    noteForm.style.transform = 'translate(-50%, -50%)';
});

cancelBtn.addEventListener('click', () => {
    noteForm.style.display = 'none';
});

openFormBtn.addEventListener('click', () => {
    noteForm.style.display = 'block'; // Affiche le formulaire
    document.body.style.overflow = 'hidden'; // Empêche le défilement du body
});

cancelBtn.addEventListener('click', () => {
    noteForm.style.display = 'none'; // Cache le formulaire
    document.body.style.overflow = 'auto'; // Restaure le défilement du body
});

window.addEventListener('resize', () => {
    if (window.innerHeight < document.documentElement.clientHeight) {
        document.body.style.overflow = 'hidden'; // Empêche le défilement quand le clavier est visible
    } else {
        document.body.style.overflow = 'auto'; // Restaure le défilement normal
    }
});
