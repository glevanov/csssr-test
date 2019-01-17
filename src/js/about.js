const about = document.querySelector('.about')

const updateHeight = () => {
  about.style.height = ''
  about.style.height = about.scrollHeight + 'px'
}

const inputHandler = () => {
  updateHeight()
}

const init = () => {
  updateHeight()
  about.addEventListener('input', inputHandler)
}

export default {
  init
}
