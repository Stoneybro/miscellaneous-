const start=document.getElementById('start')
const hideModal=document.querySelector('.modal')
const wrapper=document.querySelector('.wrapper')
const timediv=document.querySelector('.time')
const game=document.querySelector('#game')
const grid=document.querySelector('.grid')
const bomb=document.querySelector('.bomb')

let sec=0
let squares=[]
const width=10
let flags=0
function createBoard(params) {

  const bombAmount=20 
  const bombArray=Array(bombAmount).fill('bomb')
  const emptyArray=Array((width*width)-bombAmount).fill('valid')
  const allArray=bombArray.concat(emptyArray)
  const shuffledArray=allArray.sort(()=>Math.random() -0.5)

  for (let i = 0; i < width*width; i++) {
    const square=document.createElement('div')
    square.setAttribute('id',i)
    grid.appendChild(square)
    square.classList.add(shuffledArray[i])
    squares.push(square)
    square.addEventListener('click',()=>{
      clicked(square)
    })
    square.oncontextmenu=(e)=>{
      e.preventDefault()
      flag(square)
    }
  }
  function flag(square) {
    
    if (isGameOver)return
    if (!square.classList.contains('checked') && (flags<bombAmount)) {
      
      if (!square.classList.contains('flag') ) {
        square.classList.add('flag')
        square.textContent='🏁'
        flags++
        win()
      }else{
        square.classList.remove('flag')
        square.textContent=''
        flags--
      }
      
    }
  }
  for (let i = 0; i < squares.length; i++) {
    let total=0
    const isLeftSide=(i%10===0)
    const isRightSide=(i%10===9)
    if (squares[i].classList.contains('valid')) {
      if(i>0 && !isLeftSide && squares[i-1].classList.contains('bomb'))total++
      if(i>9 && !isRightSide&&squares[i+1-width].classList.contains('bomb'))total++
      if(i>10 && squares[i-width].classList.contains('bomb'))total++
      if(i>11 && !isLeftSide&&squares[i-1-width].classList.contains('bomb'))total++
      if(i<98 && !isRightSide&&squares[i+1].classList.contains('bomb'))total++
      if(i<90 && !isLeftSide&&squares[i-1+width].classList.contains('bomb'))total++
      if(i<89 && squares[i +width].classList.contains('bomb'))total++
      if(i<88 && !isRightSide&&squares[i+1+width].classList.contains('bomb'))total++;
     
      squares[i].setAttribute('data',total)


    }
    
  }
}
createBoard()
let isGameOver;
function clicked(square) {

  if(isGameOver)return
  if(square.classList.contains('checked' || 'flag')  )return
  if (square.classList.contains('bomb')) {
    Gameover(square)
  }else{
    let total=square.getAttribute('data')
    if (total !=0) {
      square.classList.add('checked')
      square.textContent=total
      return
    }
    square.classList.add('checked')
   
    checkSquare(square)
  }
}

function checkSquare(square) {
  const id=square.getAttribute('id')

  const isLeftSide=(id%10===0)
    const isRightSide=(id%10===9)

  setTimeout(()=>{
    if (id>0 && !isLeftSide) {
      const newId=squares[parseInt(id)-1].id
      const newsquare=document.getElementById(newId)
      clicked(newsquare,newId)
    }
    if (id>9 && !isRightSide) {
      const newId=squares[parseInt(id)+1-width].id
      const newsquare=document.getElementById(newId)
      clicked(newsquare)
    }
    if (id>10 ) {
      const newId=squares[parseInt(id)-width].id
      const newsquare=document.getElementById(newId)
      clicked(newsquare)
    }
    if (id>11 && !isLeftSide) {
      const newId=squares[parseInt(id)-1-width].id
      const newsquare=document.getElementById(newId)
      clicked(newsquare)
    }
    if (id<98 && !isRightSide) {
      const newId=squares[parseInt(id)+1].id
      const newsquare=document.getElementById(newId)
      clicked(newsquare)
    }
    if (id<90 && !isLeftSide) {
      const newId=squares[parseInt(id)+1-width].id
      const newsquare=document.getElementById(newId)
      clicked(newsquare)
    }
    if (id<88 && !isRightSide) {
      const newId=squares[parseInt(id)+1-width].id
      const newsquare=document.getElementById(newId)
      clicked(newsquare)
    }
    if (id<89 ) {
      const newId=squares[parseInt(id)+1-width].id
      const newsquare=document.getElementById(newId)
      clicked(newsquare)
    }
  },10)
}
let settimer
start.addEventListener('click',()=>{
  wrapper.classList.remove('blur')
  hideModal.classList.add('hide-modal')
  settimer=setInterval(()=>timer(),10)
  restart()


})

function Gameover(square) {
 
  isGameOver=true
  squares.forEach(square => {
    if (square.classList.contains('bomb')) {
      square.textContent='💣'
      square.style.backgroundColor='white'
    }
  });
  setTimeout(()=>{
    wrapper.classList.add('blur')
    hideModal.classList.remove('hide-modal')
    game.innerHTML='YOU LOST!!! 💣'
    start.innerHTML='Restart'
  },750)

  
  clearInterval(settimer)
}

function win(params) {
  let matches
  for (let index = 0; index < squares.length; index++) {
    if (squares[index].classList.contains('flag')&&squares[index].classList.contains('bomb')) {
      matches++
    }
    
  }
 
  if (matches===bombAmount) {
    setTimeout(()=>{
      wrapper.classList.add('blur')
      hideModal.classList.remove('hide-modal')
      game.innerHTML='YOU Win!!! 🎉'
      start.innerHTML='Restart game'
    },750)
  }
}

let hour=0
let minutes=5
let seconds=59
let milliseconds=1000

 






document.getElementById('seconds').innerHTML='00'
document.getElementById('minutes').innerHTML=`0${minutes}`
document.getElementById('milliseconds').innerHTML='000'


function timer(params) {
  document.getElementById('seconds').innerHTML=seconds<10?`0${seconds}`:seconds
 milliseconds= milliseconds-10
 if (milliseconds<100) {
  document.getElementById('milliseconds').innerHTML=`0${milliseconds}`
 }else{
  document.getElementById('milliseconds').innerHTML=milliseconds
 }
  if (milliseconds===0) {
    milliseconds=1000
    seconds--
     document.getElementById('seconds').innerHTML=seconds<10?`0${seconds}`:seconds
  
  }
  if (seconds===0) {
    seconds=59
    minutes--
    document.getElementById('minutes').innerHTML=minutes<10?`0${minutes}`:minutes
  }
  if (minutes===-1) {
    document.getElementById('minutes').innerHTML=`00`
    

  }
}

function restart(params) {
  
   hour=0
   minutes=5
   seconds=59
   milliseconds=1000
}






