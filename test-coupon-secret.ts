import * as security from './lib/insecurity'

let failures = 0

try {
  const realCoupon = security.generateCoupon(50)
  const discount = security.discountFromCoupon(realCoupon)
  if (discount === 50) {
    console.log('PASS: legitimately signed coupon validated (discount = 50)')
  } else {
    console.log('FAIL: real coupon did not validate, got:', discount)
    failures++
  }
} catch (e: any) {
  console.log('FAIL: error generating/validating real coupon:', e.message)
  failures++
}

const forged = 'q:<Irhz3)x'
const forgedResult = security.discountFromCoupon(forged)
if (forgedResult === undefined) {
  console.log('PASS: forged coupon was rejected')
} else {
  console.log('FAIL: forged coupon was accepted, got:', forgedResult)
  failures++
}

if (failures > 0) {
  console.log(`\n${failures} test(s) failed`)
  process.exit(1)
} else {
  console.log('\nAll secret-management coupon tests passed')
}
