
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
ctx.lineWidth = 10;

function drawLines (event) {
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(event.clientX, event.clientY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
}

canvas.addEventListener('mousemove', function(e) {
    if (isMouseDown) {
        coordinates.push([e.clientX, e.clientY]);
        drawLines(e);
    }
});

function clear() {
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'black';
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
        drawLines(event);
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





