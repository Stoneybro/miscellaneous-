const eye=document.querySelectorAll('.eye')
const anchor=document.querySelector('.anchor')
const nameInput=document.querySelector('#name')

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
nameInput.addEventListener('input',(e)=>{
    const text=e.target.value.length
   const functionRotate= scale(text,0,20,48,-48)
   const inputRotate=functionRotate+135+90
   console.log(inputRotate);
  rotateEye(inputRotate)
})

function angle(cx,cy,ex,ey) {
    const dy=ey-cy
     const dx= ex-cx
   
    const rad=Math.atan2(dy,dx)
    const deg=rad*180/Math.PI
    return deg
}

window.onmousemove=(e)=>{
    const x=e.clientX
    const y=e.clientY
    
    

    let rectx
   let recty
   const rect=anchor.getBoundingClientRect()
  

        rectx=rect.left+rect.width/2
        recty=rect.top+rect.height/2
        const angledeg=angle(x,y,rectx,recty)
    rotateEye(angledeg)    
   }
   function rotateEye(angledeg) {
    eye.forEach((eye)=>{
        eye.style.transform=`rotate(${90+angledeg}deg)`
    })
}