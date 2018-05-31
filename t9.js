const Mocha = require('mocha');
const { expect } = require('chai');


const mocha = new Mocha({ ui: 'bdd' });

mocha.suite.emit('pre-require', this, 'solution', mocha);

/**
Given a T9 dial pad and an input number, find all possible letter combinations with the same
length of input number that can be constructed from the T9 word.
http://www.globalnerdy.com/wordpress/wp-content/uploads/2013/02/phone-pad-1.png

In: '234'
Out: ['adg', 'adh', 'adi', 'aeg', 'aeh', 'aei', 'afg', 'afh', 'afi', 'bdg', 'bdh', 'bdi', 'beg',
      'beh', 'bei', 'bfg', 'bfh', 'bfi', 'cdg', 'cdh', 'cdi', 'ceg', 'ceh', 'cei', 'cfg', 'cfh',
      'cfi']
**/


const dialpad = {
  '1': [''],
  '2': ['a', 'b', 'c'],
  '3': ['d', 'e', 'f'],
  '4': ['g', 'h', 'i'],
  '5': ['j', 'k', 'l'],
  '6': ['m', 'n', 'o'],
  '7': ['p', 'q', 'r', 's'],
  '8': ['t', 'u', 'v'],
  '9': ['w', 'x', 'y', 'z']
};

const addNextSetOfLetters = (dialNum, str) => dialpad[dialNum].map(nextLetter => str + nextLetter);

const getPossibilities = (numberString='') => {
  if (!numberString.length) return [];

  return numberString.split('').reduce((result, num) => {
    if (result.length) {
      result = result.map(addNextSetOfLetters.bind(null, num));
    } else {
      result.push(...dialpad[num]);
    }

    // flattens 2-dimensional result array
    return [].concat.apply([], result);
  }, []);
}


console.log(getPossibilities('234'));


// Test cases
describe('getPossibilities(numberString)', () => {
  it('handles one number', () => {
    expect(getPossibilities('6')).to.eql(['m', 'n', 'o']);
  });

  it('handles two numbers', () => {
    expect(getPossibilities('23')).to.eql([
      'ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'
    ]);
  });

  it('handles three numbers', () => {
    expect(getPossibilities('234')).to.eql([
      'adg', 'adh', 'adi', 'aeg', 'aeh', 'aei', 'afg', 'afh', 'afi', 'bdg', 'bdh', 'bdi',
      'beg', 'beh', 'bei', 'bfg', 'bfh', 'bfi', 'cdg', 'cdh', 'cdi', 'ceg', 'ceh', 'cei',
      'cfg', 'cfh', 'cfi'
    ]);
  });

  it('handles a number with no letters', () => {
    expect(getPossibilities('2314')).to.eql([
      'adg', 'adh', 'adi', 'aeg', 'aeh', 'aei', 'afg', 'afh', 'afi', 'bdg', 'bdh', 'bdi',
      'beg', 'beh', 'bei', 'bfg', 'bfh', 'bfi', 'cdg', 'cdh', 'cdi', 'ceg', 'ceh', 'cei',
      'cfg', 'cfh', 'cfi'
    ]);
  });

  it('handles two numbers including 7', () => {
    expect(getPossibilities('27')).to.eql([
      'ap', 'aq', 'ar', 'as', 'bp', 'bq', 'br', 'bs', 'cp', 'cq', 'cr', 'cs'
    ]);
  });

  it('handles no input', () => {
    expect(getPossibilities('')).to.eql([]);
  });
});

mocha.run(() => {});
