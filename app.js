// console.log('I am successfully running!'); 
const boardspaces = Array.from(document.querySelectorAll('.boardspace'));
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

function switchTurns() {
    let nextTurn; 
        if (turn === 1) {
          nextTurn = 0;
          console.log(nextTurn, 'O it is your turn. ');
        } else if (turn === 0) {
          nextTurn = 1;
          console.log(nextTurn, 'X it is your turn.'); 
        } else {
          console.log("Something is wrong here...");
        }
        return nextTurn; 
};

function selectSpace() {
    console.log('Boardspace selected!')
    if (turn === 1) {
        //add a chosen class to the selected space
        //disable selecting that space again (changing the cursor)
        //
        //
        //
        //
    } else if (turn === 0) {

    } else {
        // console.log('I dont know whose turn it is master...'); 
    }
}

function renderPotentialPlace(event) {
    let boardspaceText = Array.from(event.target.children); 
    if (turn === 1) {
            boardspaceText[0].innerHTML = 'X'; //placeholder
            boardspaceText[0].classList.add("potential-x"); 
    } else if (turn === 0) {
            boardspaceText[0].innerHTML = 'O'; //placeholder
            boardspaceText[0].classList.add("potential-o"); 
    } else {
        console.log('I cannot tell whose turn it is....')
    }
}; 

function removePotentialPlace(event) {
    // event.target.children[0].classList.remove("potential-Choice"); 
        if (turn === 1) {
            event.target.children[0].innerHTML = ""; 
          event.target.children[0].classList.remove("potential-x");
          event.target.children[0].classList.remove("potential-o");
        } else if (turn === 0) {
            event.target.children[0].innerHTML = ""; 
          event.target.children[0].classList.remove("potential-o");
          event.target.children[0].classList.remove("potential-x");
        }
}; 

function updateInputValues(e) {
  // console.log(e);
  let root = document.documentElement;
  // access the value of the target element changed and place the input value in a variable
  this.value = e.target.value;
  //   console.log(this.value);
  // get the new value and update the corresponding css value in the root
  if (e.target.id === 'x-color-choice') {
        root.style.setProperty("--X", e.target.value);
  } else if (e.target.id === "o-color-choice") {
    root.style.setProperty("--O", e.target.value);
  }

}; 

boardspaces.forEach((space) => {
    space.addEventListener('mouseover', renderPotentialPlace);
    space.addEventListener('mouseout', removePotentialPlace);  
    space.addEventListener("click", (e) => {
        selectSpace();  
    });
    space.addEventListener("click", (e) => {
        turn = switchTurns(); 
        console.log('Switch turns triggered.'); 
    });
});

document.querySelector('#x-color-choice').addEventListener('change', updateInputValues); 
document.querySelector("#o-color-choice").addEventListener("change", updateInputValues); 