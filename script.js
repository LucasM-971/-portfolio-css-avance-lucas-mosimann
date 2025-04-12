// Variables d'éléments
const openBtn = document.getElementById('open-window');
const windowBox = document.getElementById('floating-window');
const header = document.getElementById('header');
const closeBtn = document.getElementById('close-window');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('close-popup');
const openFormBtn = document.getElementById('open-form');
const noteForm = document.getElementById('note-container');
const cancelBtn = document.getElementById('cancel-btn');

// Variables pour le drag du popup
let isDragging = false;
let offsetX, offsetY;

// Ouvrir la fenêtre flottante
openBtn.addEventListener('click', () => {
    windowBox.style.display = 'block';
});

// Déplacer la fenêtre flottante
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

// Fermer la fenêtre flottante
closeBtn.addEventListener('click', () => {
    windowBox.style.display = 'none';
});

closeBtn.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    e.preventDefault();
    windowBox.style.display = 'none';
}, { passive: false });

// Ouvrir/fermer le popup
function closePopup() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactive le défilement du body
}

function openPopup() {
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Désactive le défilement du body
}

// Gestion du drag du popup
dragElement(popup);

function dragElement(elmnt) {
    const dragZone = document.getElementById("drag-zone");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    dragZone.onmousedown = dragMouseDown;
    dragZone.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        e.preventDefault(); // Empêche le comportement par défaut
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault(); // Empêche le comportement par défaut
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

// Ouvrir le formulaire
openFormBtn.addEventListener('click', () => {
    noteForm.style.display = 'block';
    noteForm.style.position = 'absolute';
    noteForm.style.left = '50%';
    noteForm.style.top = '50%';
    noteForm.style.transform = 'translate(-50%, -50%)';
    document.body.style.overflow = 'hidden'; // Désactive le défilement du body
});

// Annuler et fermer le formulaire
cancelBtn.addEventListener('click', () => {
    noteForm.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactive le défilement du body
});

// Fermer le popup en cliquant sur le bouton "Fermer"
closePopupBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Empêche la propagation de l'événement
    e.preventDefault(); // Empêche l'action par défaut
    closePopup(); // Ferme le popup
});

// Fermer le popup en touchant sur mobile
closePopupBtn.addEventListener('touchstart', (e) => {
    e.stopPropagation(); // Empêche la propagation de l'événement
    e.preventDefault(); // Empêche l'action par défaut
    closePopup(); // Ferme le popup
}, { passive: false });

// Gestion de la taille de la fenêtre (pour masquer le défilement quand le clavier est visible)
window.addEventListener('resize', () => {
    if (window.innerHeight < document.documentElement.clientHeight) {
        document.body.style.overflow = 'hidden'; // Empêche le défilement quand le clavier est visible
    } else {
        document.body.style.overflow = 'auto'; // Restaure le défilement normal
    }
});
