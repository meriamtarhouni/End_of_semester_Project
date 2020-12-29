const palindrome = require('./palindrome');

test('Properly verifies whether a word is a palindrome',()=>{
  expect(palindrome("race car")).toBe(true);
  expect(palindrome("not a palindrome")).toBe(false);
  expect(palindrome("A man, a plan, a canal. Panama")).toBe(true);
  expect(palindrome("never odd or even")).toBe(true);
  expect(palindrome("nope")).toBe(false);
  expect(palindrome("almostomla")).toBe(false);
  expect(palindrome("0_0 (: /-\ :) 0–0")).toBe(true);

})