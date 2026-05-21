// These are all variables or constants inside the script. You guys know letters in math, so now its word inside math

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
         magLabWait(2000, function() { //Example of waiting logic. This waits 2 function and then moves to launching through air drag resistence.
         goToSection('shape-launch');})
    }
    else if (btn.id == 'brick') {
        document.getElementById('drag-value').innerHTML = "High Drag. Efficiency lost. Try Again!❌❌" // If user clicks brick-shape btn, this message comes
    }
    else {
        document.getElementById('drag-value').innerHTML = "Medium drag, but still not good. Try Again!❌❌" // Same as before but different text
    }
}

// This is the logic for countdown
function dragCountdown() {
    let dragCountdown = document.getElementById('drag-countdown');
    dragCountdown.innerHTML = "5"
    magLabWait(1000, function() {dragCountdown.innerHTML = "4"});

    magLabWait(2000, function() {dragCountdown.innerHTML = "3"});

    magLabWait(3000, function() {dragCountdown.innerHTML = "2"});

    magLabWait(4000, function() {dragCountdown.innerHTML = "1"});

    magLabWait(5000, function() {dragCountdown.innerHTML = "LAUNCH NOW! 🚀🚀🚀🚀"});
}