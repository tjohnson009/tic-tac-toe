// console.log('I am successfully running!');
const boardspaces = Array.from(document.querySelectorAll(".boardspace"));
const gameboard = document.querySelector('#gameboard'); 
const possibleWins = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
let turn = 1; // placeholder for testing

function declareWinner(result) {
  // stop play
  //render winning message and offer restart

}; 

function checkAgainstWinningCombos(array) {
  //only run if x array has 3 or more elements
  if (array.length >= 3) {
    //loop through all winning combos
    for (let i = 0; i < possibleWins.length; i++) {
      //check if the xArray contains every element in the winning combo
     let result = possibleWins[i].every(el => {
        return array.includes(el); 
      })

      if (result) {
        console.log('We have a match!'); 
        return result; 
      }
      // return result; 
    }
  }
  //check each possible win against the x array for an exact match
    //if not, check the oArray
  //check each possible win against the o array
  //map out the matches in arr
  // filter the results that don't match 
  // if there is a winner run declareWinner function
}

function xWin() {
  let currentXSpaces = boardspaces.map((div) => {
      return div.children[0].classList.contains("chosen-x");
    });

    // console.log(currentXSpaces, "X spaces"); 
    let xArray = currentXSpaces.map((el, i) => {
        if (el === true) {
          return i;
        } else {
          return -1;
        }
      })
      .filter((el) => {
        return el !== -1;
      });

    console.log(`Current X Array: [${xArray}]`); 

    checkAgainstWinningCombos(xArray); 

}; 

function oWin() {
    let currentOSpaces = boardspaces.map((div) => {
      return div.children[0].classList.contains("chosen-o");
    });
    // console.log(currentOSpaces, "O spaces."); 
    
    let oArray = currentOSpaces
    .map((el, i) => {
      if (el === true) {
        return i;
      } else {
        return -1;
      }
    })
    .filter((el) => {
      return el !== -1;
    });
    
    console.log(`Current O Array: [${oArray}]`); 
    
    checkAgainstWinningCombos(oArray); 
}; 

function checkForWins() {
  // console.log('checking for wins now...')
  xWin();
  oWin(); 
}

function switchTurns() {
  let nextTurn;
  if (turn === 1) {
    nextTurn = 0;
    // console.log(nextTurn, "O it is your turn. ");
  } else if (turn === 0) {
    nextTurn = 1;
    // console.log(nextTurn, "X it is your turn.");
  } else {
    // console.log("Something is wrong here...");
  }
  return nextTurn;
}

function addClass(x, className) {
  return x.classList.add(`${className}`);
}

function removeClass(x, className) {
  return x.classList.remove(`${className}`);
}

function renderSymbol(event) {
  let pElement = event.target.children[0];
  // console.log(pElement);
  removeClass(pElement, "potential-x");
  removeClass(pElement, "potential-o");
  if (turn === 1) {
    addClass(pElement, "chosen-x");
    pElement.innerHTML = "X";
    // console.log("Symbol should have rendered...");
  } else if (turn === 0) {
    addClass(pElement, "chosen-o");
    pElement.innerHTML = "O";
    // console.log("Symbol should have rendered...");
  }
}

function selectSpace(event) {
  // console.log(event);
  let paragraphClassList = event.target.children[0].classList;

  if (!paragraphClassList.contains('chosen')) {
      //disable the ability to click on a selected spot
     event.target.style.cursor = 'not-allowed';
     //add the appropriate symbol to the chosen space and add a chosen class to the selected space
        renderSymbol(event);
        
      } else {
        console.log('That spot is already taken. Choose another.'); 
        turn = switchTurns(); 
        return turn; 
      }
      //     //disable selecting that space again (changing the cursor)

      //     //check for wins
      checkForWins(); 
      return turn; 
}

function renderPotentialPlace(event) {  
  let boardspaceText = Array.from(event.target.children);
  // console.log(event);
  // console.log(boardspaceText[0]);
  if (turn === 1) {
    if (
      !boardspaceText[0].classList.contains("chosen-x") &&
      !boardspaceText[0].classList.contains("chosen-o")
    ) {
      boardspaceText[0].innerHTML = "X"; 
    }
    addClass(boardspaceText[0], "potential-x");
  } else if (turn === 0) {
    if (
      !boardspaceText[0].classList.contains("chosen-x") &&
      !boardspaceText[0].classList.contains("chosen-o")
    ) {
      boardspaceText[0].innerHTML = "O"; 
    }    
    addClass(boardspaceText[0], "potential-o");
  } else {
    // console.log('I cannot tell whose turn it is....')
  }
}

function removePotentialPlace(event) {
  let pElement = event.target.children[0];
  // console.log(event);
  if (turn === 1) {
    pElement.classList.remove("potential-x");
    pElement.classList.remove("potential-o");
    if (!pElement.classList.contains("chosen-o") && !pElement.classList.contains("chosen-x")) {
      // I thought we need an ! here?
      pElement.innerHTML = "";
    }
  
   } else if (turn === 0) {
      pElement.classList.remove("potential-o");
      pElement.classList.remove("potential-x");
      if (!pElement.classList.contains("chosen-x") && !pElement.classList.contains("chosen-o")) {
        pElement.innerHTML = "";
      }
    
}
}

function updateInputValues(e) {
  // console.log(e);
  let root = document.documentElement;
  // access the value of the target element changed and place the input value in a variable
  this.value = e.target.value;
  //   console.log(this.value);
  // get the new value and update the corresponding css value in the root
  if (e.target.id === "x-color-choice") {
    root.style.setProperty("--X", e.target.value);
  } else if (e.target.id === "o-color-choice") {
    root.style.setProperty("--O", e.target.value);
  }
}

boardspaces.forEach((space) => {
  let paragraph = space.children[0];

  space.addEventListener("mouseout", removePotentialPlace);

  space.addEventListener("mouseover", (e) => {
    renderPotentialPlace(e);
    if (paragraph.classList.contains("chosen-x") || paragraph.classList.contains("chosen-o")) {
      paragraph.classList.remove("potential-o");
      paragraph.classList.remove("potential-x");
    }
  });

  space.addEventListener("click", (e) => {
    selectSpace(e);
    addClass(space.children[0], 'chosen'); 
  });

  space.addEventListener("click", (e) => {
    turn = switchTurns();
    // console.log("Switch turns triggered.");
  });

});

// COLOR PICKER INPUTS
document
  .querySelector("#x-color-choice")             
  .addEventListener("change", updateInputValues);
document
  .querySelector("#o-color-choice")
  .addEventListener("change", updateInputValues);
