let mainColor = 'black';
let lineWidth = 10;
function changeColor(color) {
    mainColor = color;
}

const colorTds = document.querySelectorAll('.my-color');
const currentColor = document.getElementById('current-color');

const lineWidthInput = document.getElementById('line-width');

lineWidthInput.oninput = function (e) {
    console.log(this.value);
    lineWidth = this.value;
};

function removeClasses() {
    colorTds.forEach(colorTd => {
        colorTd.classList.remove('active-color');
    })
}

colorTds.forEach(colorTd => {
    colorTd.addEventListener('click', function () {
        changeColor(this.dataset.color);
        removeClasses();
        this.classList.add('active-color');
        currentColor.style.background = this.dataset.color;
    });

});



let canvas = document.getElementById('main-canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isMouseDown = false;
let coordinates = [];



canvas.addEventListener('mousedown', function() {
    isMouseDown = true;
});
canvas.addEventListener('mouseup', function() {
    isMouseDown = false;
    ctx.beginPath();
    coordinates.push('mouseup');
});

ctx.lineWidth = lineWidth;


function drawLines (event, width) {
    ctx.lineWidth = width;
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(event.clientX, event.clientY, width/2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
}

canvas.addEventListener('mousemove', function(e) {
    if (isMouseDown) {
        coordinates.push([e.clientX, e.clientY, mainColor, lineWidth]);
        ctx.strokeStyle = mainColor;
        ctx.fillStyle = mainColor;
        drawLines(e, lineWidth);
    }
});

function clear() {
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = mainColor;
    ctx.strokeStyle = mainColor;
}

function save() {
    localStorage.setItem('coordinates', JSON.stringify(coordinates));
}

function replay() {
    let timer = setInterval(function() {
        if ( !coordinates.length){
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
        let coord = coordinates.shift();
        let event = {
            clientX: coord[0],
            clientY: coord[1],
        };
        ctx.fillStyle = coord[2];
        ctx.strokeStyle = coord[2];
        drawLines(event, coord[3]);
    }, 20);
}

document.addEventListener('keydown', function(e) {
    let saveKey = 83;
    let repeatKey = 82;
    let clearKey = 67;

    if ( e.keyCode === saveKey ) {
        save();
        console.log('Saved');
    }

    if ( e.keyCode === repeatKey ) {
        console.log('Replaing ...');
        coordinates = JSON.parse(localStorage.getItem('coordinates'));
        clear();
        replay();
    }

    if ( e.keyCode === clearKey ) {
        clear();
        console.log('Cleared');
    }
});





