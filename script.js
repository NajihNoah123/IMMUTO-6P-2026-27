// --- GLOBAL VARIABLES & STATE INITIALIZATION ---
let correctMagnetsPlaced = 0;
let magStatus = document.getElementById('magnet-status');

// Safely hiding the terminal launch buttons until milestones are reached
document.getElementById("magnet-launchFinish").style.display = "none"; // Fixed ID name mismatch
document.getElementById("drag-launchFinished").style.display = "none";

// Smooth section transition runner
function goToSection(sectionId) {
  const sectionID = document.getElementById(sectionId); 
  if (sectionID) {
    sectionID.scrollIntoView({  
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

// Global millisecond delay timer
function magLabWait(milliseconds, action) { 
    setTimeout(action, milliseconds);
}

// Phase 1: Shape Selection Verification Logic
function checkShapeClicked(btn) {
    if (btn.id === 'teardrop') {
         document.getElementById('drag-value').innerHTML = "Low drag. Great job. Moving to launch process!🚀🚀"; 
         magLabWait(2000, function() { 
             goToSection('shape-launch');
         });
    }
    else if (btn.id === 'brick') { 
        document.getElementById('drag-value').innerHTML = "High Drag. Efficiency lost. Try Again!❌❌";
    }
    else {
        document.getElementById('drag-value').innerHTML = "Medium drag, but still not good. Try Again!❌❌"; 
    }
}

// Phase 1: Aerodynamic Air Runway Countdown Indicator
function dragCountdown() {
    let dragCountdownContainer = document.getElementById('drag-countdown');
    dragCountdownContainer.innerHTML = "5";
    magLabWait(1000, function() { dragCountdownContainer.innerHTML = "4"; });
    magLabWait(2000, function() { dragCountdownContainer.innerHTML = "3"; });
    magLabWait(3000, function() { dragCountdownContainer.innerHTML = "2"; });
    magLabWait(4000, function() { dragCountdownContainer.innerHTML = "1"; });
    magLabWait(5000, function() {
        dragCountdownContainer.innerHTML = "LAUNCH NOW! 🚀🚀🚀🚀";
        document.getElementById("drag-launchFinished").style.display = "block"; // Fixed missing string quotes
    });
}

function slot(magnum) {
    let magNum = magnum;
    
    let slot1Button = document.getElementById('slot-01'); 
    let slot2Button = document.getElementById('slot-02');
    let slot3Button = document.getElementById('slot-03');

    if (magNum === 277) {
       // Turn on dragging for the actual button element!
       slot1Button.setAttribute("draggable", "true"); 
       slot1Button.style.cursor = "grab";
       slot1Button.style.backgroundColor = "#e74c3c"; // Turns the button red to show it's ready!
       magStatus.innerHTML = "Correct Answer! Drag MAGNET 01 into SLOT 01";
    }
    else if (magNum === 210) {
       slot2Button.setAttribute("draggable", "true");
       slot2Button.style.cursor = "grab";
       slot2Button.style.backgroundColor = "#3498db"; // Turns it blue!
       magStatus.innerHTML = "Correct Answer! Drag MAGNET 02 into SLOT 02";
    }
    else if (magNum === 144) { 
       slot3Button.setAttribute("draggable", "true");
       slot3Button.style.cursor = "grab";
       slot3Button.style.backgroundColor = "#2ecc71"; // Turns it green!
       magStatus.innerHTML = "Correct Answer! Drag MAGNET 03 into SLOT 03";
    }
    else {
        magStatus.innerHTML = "Wrong Answer! Try again.";
    }
}

// Drag and Drop Pipeline Events
function onclickslot(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function magnetDrag(event) {
    event.preventDefault();
}

function onMagnetDropped(event, slotID, correctMagnet) {
    event.preventDefault();
    let buttonID = event.dataTransfer.getData("text/plain");

    // Fixed comparison to verify the dragged button ID matches the slot requirement parameter
    if (buttonID === slotID) {
        magStatus.innerHTML = "Magnet Dropped successfully!";

        let draggedElement = document.getElementById(buttonID);
        let slotElement = event.currentTarget; // Targets the slot box directly
        
        slotElement.innerHTML = ""; // Clears the fallback text channel
        slotElement.appendChild(draggedElement); 
        
        // Style updates for successfully fitted pieces
        draggedElement.setAttribute("draggable", "false");
        draggedElement.style.cursor = "default";
        slotElement.style.backgroundColor = "#2ecc71";
        
        correctMagnetsPlaced = correctMagnetsPlaced + 1;

        if (correctMagnetsPlaced === 3) {
            magStatus.innerHTML = "All Magnets are placed. Moving to launch...";
            magLabWait(2000, function() {
                goToSection('magnet-launch');
            });
        }
    }
    else {
        magStatus.innerHTML = "Wrong Magnet layout sequence! Place the correct component.";
    }
}

// Phase 2: Maglev Core Field Acceleration Countdown
function magnetCountdown() {
    let magnetCountdownContainer = document.getElementById('magnet-countdown');
    magnetCountdownContainer.innerHTML = "5";
    magLabWait(1000, function() { magnetCountdownContainer.innerHTML = "4"; });
    magLabWait(2000, function() { magnetCountdownContainer.innerHTML = "3"; });
    magLabWait(3000, function() { magnetCountdownContainer.innerHTML = "2"; });
    magLabWait(4000, function() { magnetCountdownContainer.innerHTML = "1"; });
    magLabWait(5000, function() {
        magnetCountdownContainer.innerHTML = "LAUNCH NOW! 🚀🚀🚀🚀";
        document.getElementById("magnet-launchFinish").style.display = "block";
    });
}