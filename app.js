const textInput = document.getElementById("text");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const ctx = canvas.getContext("2d");
const color = document.getElementById("color");
const modeBtn = document.getElementById("mode-btn");
const destyroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("erase-btn");
const fileInput = document.getElementById("file");
const saveBnt = document.getElementById("save");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function canclePainting(){
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    color.value = event.target.dataset.color;
}

function onModeClick(event){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCavasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, 800, 800);
    }
}

function onDestroy(){
    if(confirm("Are you sure to delete all?")){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 800, 800);
    }
}

function onErase(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 200, 200, 400, 400);
    };
}

function onDoubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "68px selif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}



canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);
canvas.addEventListener("click", onCavasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destyroyBtn.addEventListener("click", onDestroy);
eraseBtn.addEventListener("click", onErase);

fileInput.addEventListener("change", onFileChange);

saveBnt.addEventListener("click", onSaveClick);