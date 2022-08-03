const clock = () => {
  let date = new Date()
  // let hours = date.getHours()
  // let minutes = date.getMinutes()
  // let seconds = date.getSeconds()
  // let format = hours >= 12 ? 'pm' : 'am'
  // hours = hours % 12
  // hours = hours ? hours : 12 // the hour '0' should be '12'
  // minutes = minutes < 10 ? '0' + minutes : minutes
  // seconds = seconds < 10 ? '0' + seconds : seconds
  // let time = `${hours}:${minutes}:${seconds}${format}`

  let time = date.toLocaleTimeString()
  let clockContent = document.getElementById('time')
  clockContent.innerText = time;
  setInterval(clock, 1000)


}
clock()
let isTrue = true;
let clockDiv = document.getElementById('clockContent')
let toggle = document.getElementById('toggle')

toggle.addEventListener('click', (e) => {
  e.preventDefault()
  isTrue = !isTrue;
  if (!isTrue) {
    clockDiv.style.visibility = "hidden";
    toggle.innerText = 'Show';
  } else {
    clockDiv.style.visibility = "visible";
    toggle.innerText = 'Hide';
  }
   console.log(isTrue);
   console.dir(toggle.innerText);

})
