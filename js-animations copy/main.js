const right =document.querySelector('.right')

window.onmousemove=(e)=>{
    const x=e.clientX
    const newWidth=x/window.innerWidth*100
    right.style.width=newWidth+`%`

}

right.addEventListener('drag',(e)=>{
    console.log(99);
})




