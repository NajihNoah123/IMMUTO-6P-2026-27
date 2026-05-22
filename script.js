// These are all variables or constants inside the script. You guys know letters in math, so now its word inside math
let correctMagnetsPlaced = 0;
let magStatus = document.getElementById('magnet-status');
document.getElementById("magnet-launchFinished").style.display = "none";// This command document.getElementById("id") is how we get an html element
document.getElementById("drag-launchFinished").style.display = "none";// We use innerHTML to change text inside a text property. More on that in line 29

// Go to section code: This is code for going to a different section okay guys?
function goToSection(sectionId) {
  const sectionID = document.getElementById(sectionId); //This is how they get the element since a button has an onlick property that will run this code
  if (sectionID) {
    sectionID.scrollIntoView({  //We use scrollIntoView to move to another section
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

function magLabWait(milliseconds, action) { //This sets up waiting logic. We can change argument milliseconds to how much seconds we want with 3 zero's
    setTimeout(action, milliseconds);
}

// This is the slecting shape logic
function checkShapeClicked(btn) {
    if (btn.id === 'teardrop') {
         document.getElementById('drag-value').innerHTML = "Low drag. Great job. Moving to launch process!🚀🚀"; //If the user clicked teardrop button, it will changed text
         magLabWait(2000, function() { //Example of waiting logic. This waits 2s and then moves to launching through air drag resistence.
         goToSection('shape-launch');})
    }
    else if (btn.id === 'brick') { // See the innerHTML here. We make like this to change text
        document.getElementById('drag-value').innerHTML = "High Drag. Efficiency lost. Try Again!❌❌" // If user clicks brick-shape btn, this message comes
    }
    else {
        document.getElementById('drag-value').innerHTML = "Medium drag, but still not good. Try Again!❌❌" // Same as before but different text
    }
}

// This is the logic for launch countdown
function dragCountdown() {
    let dragCountdown = document.getElementById('drag-countdown');// it takes the id for dragCountdown
    dragCountdown.innerHTML = "5"
    magLabWait(1000, function() {dragCountdown.innerHTML = "4"});

    magLabWait(2000, function() {dragCountdown.innerHTML = "3"});

    magLabWait(3000, function() {dragCountdown.innerHTML = "2"});

    magLabWait(4000, function() {dragCountdown.innerHTML = "1"});

    magLabWait(5000, function() {
        dragCountdown.innerHTML = "LAUNCH NOW! 🚀🚀🚀🚀";
        document.getElementById("drag-launchFinished").style.display = block;
    });
}

function slot(magnum) {
    let magNum = magnum;
    let slot1Draggable = document.getElementById('slot01');
    let slot2Draggable = document.getElementById('slot02');
    let slot3Draggable = document.getElementById('slot03');

    if (magNum === 277) {
       slot1Draggable.draggable = true;
       magStatus.innerHTML = "Correct Answer! Drag Magnet slot 01 into the empty place";
       slot1Draggable.style.backgroundColor = "red";
    }
    else if (magNum === 210) {
       slot2Draggable.draggable = true;
       magStatus.innerHTML = "Correct Answer! Drag Magnet slot 02 into the empty place";
       slot2Draggable.style.backgroundColor = "blue";
    }
    else if (magNum === 144) { 
       slot3Draggable.draggable = true;
       magStatus.innerHTML = "Correct Answer! Drag Magnet slot 03 into the empty place";
       slot3Draggable.style.backgroundColor = "red";
    }
    else {
        magStatus.innerHTML = "Wrong Answer! Try again.";
    }
}

function onclickslot(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function magnetDrag(event) {
    event.preventDefault();
}

function onMagnetDropped(event, slotID, correctMagnet) {
    event.preventDefault();
    let buttonID = event.dataTransfer.getData("text/plain");

    if (buttonID === correctMagnet) {
        magStatus.innerHTML = "Magnet Dropped!";

        let draggedElement = document.getElementById(buttonID);
        let slotElement = document.getElementById(slotID);
        slotElement.appendChild(draggedElement); 
        
        correctMagnetsPlaced = correctMagnetsPlaced + 1;

        if (correctMagnetsPlaced === 3) {
            magStatus.innerHTML = "All Magnets are placed. Moving to launch...";
            magLabWait(2000, function() {
                goToSection('magnet-launch');
            });
        }
    }
    else {
        magStatus.innerHTML = "Wrong Magnet. Place the correct magnet!";
    }
}

function magnetCountdown() {
    let magnetCountdown = document.getElementById('magnet-countdown');
    magnetCountdown.innerHTML = "5"
    magLabWait(1000, function() {magnetCountdown.innerHTML = "4"});

    magLabWait(2000, function() {magnetCountdown.innerHTML = "3"});

    magLabWait(3000, function() {magnetCountdown.innerHTML = "2"});

    magLabWait(4000, function() {magnetCountdown.innerHTML = "1"});

    magLabWait(5000, function() {
        magnetCountdown.innerHTML = "LAUNCH NOW! 🚀🚀🚀🚀"
        document.getElementById("magnet-launchFinished").style.display = "block";
    });
}