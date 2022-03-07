const INITIAL_COLOR="#000000";
const ACCENT_COLOR="#eef295";
const WHITE="#FFFFFF";

const canvas=document.getElementById("jscanvas"); //canvas
var ctx = canvas.getContext('2d');

const size=document.getElementById("size"); //pensize
const colors=document.getElementsByClassName("colorJs"); //color

//mode button
const fill=document.getElementById("fill");
const paint=document.getElementById("paint");
const clear=document.getElementById("clear");
const save=document.getElementById("save");
//initail
const canvasWidth=document.getElementsByClassName("canvas")[0].offsetWidth;
const canvasHeight=document.getElementsByClassName("canvas")[0].offsetHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

ctx.strokeStyle= INITIAL_COLOR;//default color: black
paint.style.backgroundColor=ACCENT_COLOR; //default mode: paint

//canvas 초기 배경
ctx.fillStyle=WHITE;
ctx.fillRect(0, 0,canvasWidth,canvasWidth );

ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;


let painting=false;
let filling=false;

//function
function stopPainting(){
    painting=false;
}
function startPainting(){
    if(!filling){
        painting=true;
    }
}

//canvas위에 마우스가 올라왔을때 좌표표시
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath(); //경로를 시작
        ctx.moveTo(x,y); //지정된 좌표로 옮기기(시작점 설정)
    }else{
        ctx.lineTo(x,y); //현재위치에서 x,y까지 선을 그림
        ctx.stroke(); //윤곽선을 이용하여 선을 그림
    }
    
}

//pen size 변환
function handleSizeChange(event){
    const pensize=event.target.value;
    ctx.lineWidth=pensize;

}

//색 변환
function changeColor(event){ 
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function fillCanvas(){ //fill
    painting=false;
    filling=true;
    fill.style.backgroundColor=ACCENT_COLOR;
    paint.style.backgroundColor=WHITE;
}
function handleCanvasClick(){ //canvas click
    if(filling){
        ctx.fillRect(0, 0,canvasWidth,canvasWidth );
    }
}

function handlePaintClick(){ //paint click
    filling=false;
    paint.style.backgroundColor=ACCENT_COLOR;
    fill.style.backgroundColor=WHITE;
}
function onClear(){
    ctx.clearRect(0, 0,canvasWidth,canvasWidth );
}

function handleCM(event){
    event.preventDefault(); //우클릭 방지
}

function handleSaveClick(){ //image 저장
    const image=canvas.toDataURL("image/png");
    const link=document.createElement("a");
    link.href=image;
    link.download="image";
    link.click();
}
//main
if(canvas){ 
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM); //우클릭
}

if(size){
    size.addEventListener("input",handleSizeChange);
}

Array.from(colors).forEach(color=>color.addEventListener("click",changeColor));

if(fill){
    fill.addEventListener("click",fillCanvas);
}

if(paint){
    paint.addEventListener("click",handlePaintClick);
}

if(clear){
    clear.addEventListener("click",onClear);
}

if(save){
    save.addEventListener("click",handleSaveClick);
}