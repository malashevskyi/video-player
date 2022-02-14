export function format(numb: number): string {
  let minutes: string | number = Math.floor(numb / 60) % 60
  minutes = minutes >= 10 ? minutes : '0' + minutes

  let hours: string | number = Math.floor(numb / 3600)
  hours = hours >= 10 ? hours : '0' + hours

  let seconds: string | number = Math.floor(numb % 60)
  seconds = seconds >= 10 ? seconds : '0' + seconds

  if (hours != 0) {
    return hours + ':' + minutes + ':' + seconds
  }

  return minutes + ':' + seconds
}
