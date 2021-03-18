export const isMobile = {
  Android (): any { return navigator.userAgent.match(/Android/i) },
  BlackBerry (): any { return navigator.userAgent.match(/BlackBerry/i) },
  iOS (): any { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
  Opera (): any { return navigator.userAgent.match(/Opera Mini/i) },
  Windows (): any { return navigator.userAgent.match(/IEMobile/i) },
  any (): any { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) }
}
