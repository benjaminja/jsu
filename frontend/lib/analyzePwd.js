export default value => {
  let pwd = 0
  let reCapital = /[A-Z]/
  let reDigit = /[0-9]/
  let reSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  let reEverything = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  if (value.length >= 8) pwd += 1
  if (reCapital.test(value)) pwd += 1
  if (reDigit.test(value)) pwd += 1
  if (reSpecial.test(value)) pwd += 1
  if (reEverything.test(value)) pwd += 1
  return pwd
}
