export default () => {
  const aboutElement = document.querySelector('.about')

  const inputHandler = () => {
    aboutElement.style.height = ''
    aboutElement.style.height = aboutElement.scrollHeight + 'px'
  }

  aboutElement.addEventListener('input', inputHandler)
}
