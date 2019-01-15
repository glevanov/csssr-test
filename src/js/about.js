const about = document.querySelector('.about')

const inputHandler = () => {
  about.style.height = ''
  about.style.height = about.scrollHeight + 'px'
}

const init = () => {
  about.addEventListener('input', inputHandler)
}

export default {
  init
}
