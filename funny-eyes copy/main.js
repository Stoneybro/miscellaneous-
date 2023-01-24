
const trailer=document.querySelector('.trailer')


const animateTrailer=(e,interaction)=>{
  
  const x=e.clientX-trailer.offsetWidth/2
  const y=e.clientY-trailer.offsetHeight/2
  const rect=trailer.getBoundingClientRect()
 // trailer.style.transform=`translate(${x}px,${y}px)`
  const keyFrame={transform:`translate(${x}px,${y}px) scale(${interaction?5:1})`}
  trailer.animate(keyFrame,{
    duration:500,
    fill:'forwards'
  })
}

window.onmousemove=(e)=>{
  const interactable=e.target.closest('.present')
  const interaction=interactable!==null
  animateTrailer(e,interaction)

}