const slider = document.querySelector('.slider')
const scale = slider.querySelector('.slider__scale')
const pin = slider.querySelector('.slider__pin')
const animationClass = 'slider__pin--transition'

const scaleLeftCoordinate = scale.getBoundingClientRect().left
const scaleRightCoordinate = scale.getBoundingClientRect().right
const scaleWidth = scaleRightCoordinate - scaleLeftCoordinate

const pinWidth = pin.getBoundingClientRect().right - pin.getBoundingClientRect().left
const pinMidpoint = pinWidth / 2
const pinOffset = 2
const pinStartCoordinate = 0 - pinMidpoint + pinOffset
const pinEndCoordinate = scaleWidth - pinMidpoint - pinOffset

const pinSnapPoints = [
  pinStartCoordinate,
  150 - pinMidpoint,
  375 - pinMidpoint,
  pinEndCoordinate
]
const pinBreakpoints = [
  75 - pinMidpoint,
  262 - pinMidpoint,
  573 - pinMidpoint
]

const onPinClick = evt => {
  evt.preventDefault()
  pin.classList.remove(animationClass)
  let pinXPosition = evt.clientX
  let pinRelativePosition

  const validateScaleBoundaries = pinPosition => {
    if (pinPosition < pinStartCoordinate) {
      return pinStartCoordinate
    } else if (pinPosition > pinEndCoordinate) {
      return pinEndCoordinate
    }
    return pinPosition
  }
  const calculatePinPosition = moveEvt => {
    const currentX = moveEvt.clientX
    const horizontalShift = pinXPosition - currentX
    pinRelativePosition = validateScaleBoundaries(
      pin.offsetLeft - horizontalShift
    )
    pinXPosition = currentX
  }
  const updatePin = (position) => {
    pin.style.left = `${position}px`
  }
  const snapPin = () => {
    let snapPoint
    if (pinRelativePosition < pinBreakpoints[0]) {
      snapPoint = pinSnapPoints[0]
    } else if (
      pinRelativePosition >= pinBreakpoints[0] &&
      pinRelativePosition < pinBreakpoints[1]
    ) {
      snapPoint = pinSnapPoints[1]
    } else if (
      pinRelativePosition >= pinBreakpoints[1] &&
      pinRelativePosition < pinBreakpoints[2]
    ) {
      snapPoint = pinSnapPoints[2]
    } else {
      snapPoint = pinSnapPoints[3]
    }
    updatePin(snapPoint)
  }

  const onMouseMove = moveEvt => {
    calculatePinPosition(moveEvt)
    updatePin(pinRelativePosition)
  }
  const onMouseUp = upEvt => {
    upEvt.preventDefault()
    pin.classList.add(animationClass)
    snapPin()
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const init = () => {
  pin.addEventListener('mousedown', evt => {
    evt.preventDefault()
    onPinClick(evt)
  })
}

export default {
  init
}
