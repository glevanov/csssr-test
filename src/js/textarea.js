const textarea = document.querySelector('.about')

const updateHeight = () => {
  textarea.style.height = ''
  textarea.style.height = textarea.scrollHeight + 'px'
}

const onInput = () => {
  updateHeight()
}

const init = () => {
  updateHeight()
  textarea.addEventListener('input', onInput)
}

export default {
  init
}
