const timediv=document.querySelector('.time')
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
  console.log(id);
  const isLeftSide=(id%10===0)
    const isRightSide=(id%10===9)
    console.log(isLeftSide,isRightSide);
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
function Gameover(square) {
  isGameOver=true
  squares.forEach(square => {
    if (square.classList.contains('bomb')) {
      square.textContent='💣'
      square.style.backgroundColor='white'
    }
  });
}

function win(params) {
  let matches
  for (let index = 0; index < squares.length; index++) {
    if (squares[index].classList.contains('flag')&&squares[index].classList.contains('bomb')) {
      matches++
    }
    
  }
 
  if (matches===bombAmount) {
    console.log('you win');
  }
}

  //const timing=setInterval(()=>{
  //  time()
  //},1000)
//  clearInterval(timing)
timing()
function time(params) {
  timediv.textContent=sec
  sec++
  
}