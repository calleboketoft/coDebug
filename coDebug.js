// Disables console.debug if localStorage.debug

export default angular.module('coDebug', [])

.config(() => {

  if (!(localStorage.debug)) { // eslint-disable-line no-undef
    // noop the console.debug
    console.debug = function () {}
  } else {
    // if the browser doesn't support console.debug
    if (!console.debug) {
      console.debug = function () {
        console.log.apply(console, arguments)
      }
    }
  }
})
