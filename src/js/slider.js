const slider = document.querySelector('.slider')
const sliderScale = slider.querySelector('.slider__scale')
const sliderPin = slider.querySelector('.slider__pin')

const scaleLeftCoordinate = sliderScale.getBoundingClientRect().left
const scaleRightCoordinate = sliderScale.getBoundingClientRect().right
const scaleWidth = scaleRightCoordinate - scaleLeftCoordinate
const scaleSnapPoints = {
  first: scaleLeftCoordinate,
  second: scaleLeftCoordinate + 150,
  third: scaleLeftCoordinate + 375,
  last: scaleRightCoordinate
}
const scaleBreakpoints = {
  first: scaleLeftCoordinate + scaleSnapPoints.second / 2,
  second: scaleSnapPoints.second + (scaleSnapPoints.third - scaleSnapPoints.second) / 2,
  third: scaleSnapPoints.third + (scaleSnapPoints.last - scaleSnapPoints.third) / 2
}

const pinWidth = sliderPin.getBoundingClientRect().right - sliderPin.getBoundingClientRect().left
const pinMidpoint = pinWidth / 2
const pinStartCoordinate = 0 - pinMidpoint
const pinEndCoordinate = scaleWidth - pinMidpoint

const onSliderClick = evt => {
  evt.preventDefault()
  let sliderXPosition = evt.clientX
  let sliderRelativePosition

  const validateSliderBoundaries = sliderPosition => {
    if (sliderPosition < pinStartCoordinate) {
      return pinStartCoordinate
    } else if (sliderPosition > pinEndCoordinate) {
      return pinEndCoordinate
    }
    return sliderPosition
  }
  const calculateSliderPosition = moveEvt => {
    const currentTouchX = moveEvt.clientX
    const horizontalShift = sliderXPosition - currentTouchX
    sliderRelativePosition = validateSliderBoundaries(
      sliderPin.offsetLeft - horizontalShift
    )
    sliderXPosition = currentTouchX
  }
  const renderSliderPosition = () => {
    sliderPin.style.left = `${sliderRelativePosition}px`
  }
  const snapSliderPosition = () => {
    if (sliderRelativePosition < scaleBreakpoints.first) {
      sliderRelativePosition = scaleSnapPoints.first
    } else if (
      sliderRelativePosition >= scaleBreakpoints.first &&
      sliderRelativePosition < scaleBreakpoints.second
    ) {
      sliderRelativePosition = scaleSnapPoints.second - pinMidpoint
    } else if (
      sliderRelativePosition >= scaleBreakpoints.second &&
      sliderRelativePosition < scaleBreakpoints.third
    ) {
      sliderRelativePosition = scaleSnapPoints.third - pinMidpoint
    } else {
      sliderRelativePosition = scaleSnapPoints.last
    }
    renderSliderPosition()
  }

  const onMouseMove = moveEvt => {
    calculateSliderPosition(moveEvt)
    renderSliderPosition()
  }
  const onMouseUp = upEvt => {
    upEvt.preventDefault()
    snapSliderPosition()
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const init = () => {
  sliderPin.addEventListener('mousedown', evt => {
    evt.preventDefault()
    onSliderClick(evt)
  })
}

export default {
  init
}
