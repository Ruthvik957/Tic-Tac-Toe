let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newDiv = document.createElement("div");

let turnO = true; // player O or player X

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],  // fixed from 2.5 to 2,5,8
    [0,4,8],
    [2,4,6],
];

// append newDiv to body to display winner
document.body.appendChild(newDiv);

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        if(box.innerText === "") {  // prevent overwriting
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            checkWinner(); // call after every move
        }
    });
});

const checkWinner = () => {
    for(let pattern of winPatterns){
        let a = boxes[pattern[0]].innerText;
        let b = boxes[pattern[1]].innerText;
        let c = boxes[pattern[2]].innerText;

        if(a !== "" && a === b && b === c){
            newDiv.innerText = `Winner is ${a}`; // fixed template literal
            boxes.forEach(box => box.disabled = true); // stop further clicks
            return;
        }
    }

    // optional: check for tie
    let isTie = Array.from(boxes).every(box => box.innerText !== "");
    if(isTie) newDiv.innerText = "It's a Tie!";
};

// Reset button (if you have it in HTML)
if(resetbtn){
    resetbtn.addEventListener("click", ()=>{
        boxes.forEach(box => {
            box.innerText = "";
            box.disabled = false;
        });
        newDiv.innerText = "";
        turnO = true;
    });
}
