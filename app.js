// console.log('I am successfully running!');
const boardspaces = Array.from(document.querySelectorAll(".boardspace"));
const gameboard = document.querySelector('#gameboard'); 
const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turn = 1; // placeholder for testing

function checkAgainstWinningCOmbos(array) {
  //map out the matches in arr
  //loop through all winning combos
  // filter the results that don't match 
}

function xWin() {
  let win = false; 
  let currentXSpaces = boardspaces.map((div) => {
      return div.children[0].classList.contains("chosen-x");
    });

    console.log(currentXSpaces, "X spaces"); 
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

    console.log(xArray); 
  if (win === true) {

  } else {
  
  }; 

}; 

function oWin() {
  let win = false;
  if (win === true) {
  
  } else {

  }
}; 

function checkForWins() {
  // console.log('I checked for wins just now.'); 

  //map method
  let currentOSpaces = boardspaces.map((div) => {
    return div.children[0].classList.contains('chosen-o'); 
  }); 
  console.log(currentOSpaces, 'O spaces.'); 

  // let currentXSpaces = allSpaces.map((div) => {
  //   return div.children[0].classList.contains('chosen-x'); 
  // }); 
  // console.log(currentXSpaces, 'X spaces'); 
  xWin();
  oWin(); 
  //I need to try to loop over the X Array and O array and check if there is a true in the positions that match
  //each winning array.
  // let xArray = currentXSpaces.map((el, i) => {
  //     if (el === true) {
  //       return i; 
  //       } else {
  //         return -1; 
  //       }
  // })
  // .filter(el => {
  //   return el !== -1; 
  // }); 
  
  // console.log(xArray); 

  
  // for (let i = 0; i < currentXSpaces.length; i++) {
  //   // let xArray = []; 
  //   if (currentXSpaces[i] === true) {
  //    xArray.push(currentXSpaces.indexOf(currentXSpaces[i])); 
  //   }
  //   // console.log(xArray); 
  //   // return xArray; 
  // }

  // xArray = currentXSpaces
  //   .filter(el => el === true)
  //   console.log(xArray);


  


  
  
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
