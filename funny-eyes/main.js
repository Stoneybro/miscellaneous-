const nav=document.querySelector('nav')

// nav.getElementsByTagName('a').forEach(link => {
//   link.addEventListener('click',()=>{
//     console.log(99);
//   })
// });
for (const link of nav.getElementsByTagName('a')) {
 link.onmousemove=e=>{
  const rect=link.getBoundingClientRect()
  const img=link.querySelector('img')

    img.style.left=`${e.clientX-rect.left}px`
    img.style.top=`${e.clientY-rect.top}px`

 }
}
// window.onmousemove=(e)=>{
//   const percent=e.clientY/window.innerHeight
//   const y=percent*-1*nav.offsetHeight
//   console.log(e.clientY);
//   nav.animate({
//     transform:`translateY(${y}px)`
//   },{
//     fill:"forwards",
//     duration:'auto'
//   }
//   )
// }
console.log(window.innerHeight,nav.offsetHeight);