
const trailer=document.querySelector('.trailer')


const animateTrailer=e=>{
  
  const x=e.clientX-trailer.offsetWidth/2
  const y=e.clientY-trailer.offsetHeight/2
  const rect=trailer.getBoundingClientRect()

 // trailer.style.transform=`translate(${x}px,${y}px)`
  const keyFrame={transform:`translate(${x}px,${y}px)`}
  trailer.animate(keyFrame,{
    duration:500,
    fill:'forwards'
  })
}
window.onmousemove=(e)=>{


  animateTrailer(e)
}