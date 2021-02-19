/*********************************************
 * Fractal Tree using p5.js.                 *
 * Author : Arthur Freeman                   *
 * Date : 19/02/2020                         *
 *********************************************/ 
const canvasWidth = 800; 
const canvasHeight = 800;
let n = 11;
let theta = 38.5 * (Math.PI / 180); 
let nodes = [];
let angleMult = 1.01;
let reduceFactor = 1.3;
let input, button;

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function powerOf2(v) {
    return v && !(v & (v - 1));
}

function generateGraph(n, nodes) {
    let i = 1;
    let l = canvasHeight - floor(canvasHeight / reduceFactor);
    while (nodes.length < Math.pow(2, n)) {
        if(powerOf2(nodes.length)) {
            l = l / reduceFactor;
            angleMult *= angleMult;
        }
        nodes.push(new Node(Math.abs(nodes[i].x - l * Math.cos(theta*angleMult)), Math.abs(nodes[i].y - l * Math.sin(theta*angleMult))));
        nodes.push(new Node(Math.abs(nodes[i].x + l * Math.cos(theta*angleMult)), Math.abs(nodes[i].y - l * Math.sin(theta*angleMult))));
        
        i++;
    }
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    slider = createSlider(0, 180, 45, 0);
    background(220);
    input = createInput();
    input.value(10);
    reinitialise();
}

function reinitialise() {
    background(225);
    nodes = [];
    angleMult = 1.01;
    reduceFactor = 1.3;
    nodes.push(undefined);
    nodes.push(new Node(floor(canvasWidth/2), canvasHeight - floor(canvasHeight / 4)));
    generateGraph(n, nodes);
    line(floor(canvasWidth/2), canvasHeight, 
         floor(canvasWidth/2), canvasHeight - floor(canvasHeight / 4)
    );
    drawGraph(nodes);
}

function drawGraph(nodes) {
    for(let i=1; i < floor(nodes.length / 2); i++) {
        line(nodes[i].x, nodes[i].y, nodes[2*i].x, nodes[2*i].y);
        line(nodes[i].x, nodes[i].y, nodes[2*i+1].x, nodes[2*i+1].y);
    }
}

function mouseDragged() {
    theta = slider.value() * (Math.PI / 180);
    n = int(input.value());
    reinitialise();
}
