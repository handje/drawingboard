const canvas=document.getElementById("jscanvas");
var ctx = canvas.getContext('2d');

const size=document.getElementById("size");
const colors=document.getElementsByClassName("colorJs");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.strokeStyle="#000000"; //default color: black
ctx.lineWidth=2.5;

let painting=false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
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
    ctx.strokeStyle=event.target.style.backgroundColor;
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}

if(size){
    size.addEventListener("input",handleSizeChange);
}

Array.from(colors).forEach(color=>color.addEventListener("click",changeColor));