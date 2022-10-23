'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece = (startStack, endStack) => {

  // Temp Array to temporarily hold the array element before .pop removes it, then it'll be called in the .push method to re-add to the correct object array
  let tempArray = []

  switch (startStack) {
    case "a":
      if (stacks.a.length <= 0) {
        console.log("There are no move disks to move in stack A")
        return false
      } else {
        tempArray = stacks.a.splice(-1).pop()
      }
      break;
    case "b":
      if (stacks.b.length <= 0) {
        console.log("There are no move disks to move in stack B")
        return false
      } else {
        tempArray = stacks.b.splice(-1).pop()
      }
      break;
    case "c":
      if (stacks.c.length <= 0) {
        console.log("There are no move disks to move in stack C")
        return false
      } else {
        tempArray = stacks.c.splice(-1).pop()
      }
      break;
  }

  switch (endStack) {
    case "a":
      if (movePiece() == false) {
        console.log("I am in the FALSE statement")
      } else {
      stacks.a.push(tempArray)
      }
      break;
    case "b":
      if (movePiece() == false) {
        console.log("I am in the FALSE statement")
      } else {
      stacks.b.push(tempArray)
      }
      break;
    case "c":
      if (movePiece() == false) {
        console.log("I am in the FALSE statement")
      } else {
      stacks.c.push(tempArray)
      }
      break;
  }

  // Check for win here, and in the main function to catch the win AFTER the last element is moved
  checkForWin()
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {


  // This is to check if the move is legal or illegal - if it's illegal, it'll return true and won't be ran
  if (startStack == "a" && endStack == "b") {
    if (stacks.a[stacks.a.length - 1] > stacks.b[stacks.b.length - 1]) {
      return false
    }
  } else if (startStack == "a" && endStack == "c") {
    if (stacks.a[stacks.a.length - 1] > stacks.c[stacks.c.length - 1]) {
      return false
    }
  } else if (startStack == "b" && endStack == "a") {
    if (stacks.b[stacks.b.length - 1] > stacks.a[stacks.a.length - 1]) {
      return false
    }
  } else if (startStack == "b" && endStack == "c") {
    if (stacks.b[stacks.b.length - 1] > stacks.c[stacks.c.length - 1]) {
      return false
    }
  } else if (startStack == "c" && endStack == "a") {
    if (stacks.c[stacks.c.length - 1] > stacks.a[stacks.a.length - 1]) {
      return false
    }
  } else if (startStack == "c" && endStack == "b") {
    if (stacks.c[stacks.c.length - 1] > stacks.b[stacks.b.length - 1]) {
      return false
    }
  } else {
    return true
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  if (stacks.c.length === 4) {
    console.log("Congratulations! You won!")
    return true
  } else {
    return false
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {

  startStack = startStack.toLowerCase()
  endStack = endStack.toLowerCase()

  // This is to catch inputs that are NOT valid - if the input is valid, it'll go to the ELSE statement and invoke the Win and Move functions
  if (startStack !== "a" && startStack !== "b" && startStack !== "c" || endStack !== "a" && endStack !== "b" && endStack !== "c") {
    console.log("Please enter a valid input of either A, B, or C.")
  } else if (isLegal(startStack, endStack) == false) {
    console.log("This move is not allowed. Please try again.")
  } else {
    checkForWin()
    movePiece(startStack, endStack)
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
