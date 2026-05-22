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
         magLabWait(2000, function() { //Example of waiting logic. This waits 2s and then moves to launching through air drag resistence.
         goToSection('shape-launch');})
    }
    else if (btn.id == 'brick') {
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

    magLabWait(5000, function() {dragCountdown.innerHTML = "LAUNCH NOW! 🚀🚀🚀🚀"});
}

const state = {
        unlocked: {
            neo: false,     // Magnet 1
            super: false,   // Magnet 2
            electro: false  // Magnet 3 (New)
        },
        slots: {
            1: null,        // Equipped magnet type in Slot 1
            2: null,        // Equipped magnet type in Slot 2
            3: null         // Equipped magnet type in Slot 3 (New)
        },
        selectedMagnet: null, // For single-tap flow
        puzzlesSolved: {
            1: false,
            2: false,
            3: false
        }
    };

    // Synthesizer Web Audio API for feedback sounds
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playTone(freq, type, duration, gainVal = 0.15) {
        try {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.type = type;
            osc.frequency.value = freq;
            
            gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
            
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.warn("Audio Context awaiting user click.", e);
        }
    }

    function playClickSound() {
        playTone(600, 'sine', 0.12, 0.08);
    }

    function playSuccessSound() {
        playTone(523.25, 'sine', 0.15, 0.1);
        setTimeout(() => {
            playTone(659.25, 'sine', 0.25, 0.1);
        }, 120);
    }

    function playErrorSound() {
        playTone(180, 'sawtooth', 0.3, 0.15);
    }

    function playEngineHum() {
        const duration = 2.5;
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(80, audioCtx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(480, audioCtx.currentTime + duration);

        osc2.type = 'square';
        osc2.frequency.setValueAtTime(82, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(484, audioCtx.currentTime + duration);

        gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc1.start();
        osc2.start();
        osc1.stop(audioCtx.currentTime + duration);
        osc2.stop(audioCtx.currentTime + duration);
    }

    // --- TELEMETRY NOTIFICATION HELPER ---
    function updateTelemetry(text, colorClass = "text-cyan-400") {
        const info = document.getElementById("terminal-status-info");
        info.className = `text-[10px] font-mono ${colorClass} transition-all duration-200`;
        info.innerText = text;
    }

    // --- PUZZLE CHECKING ---
    function checkAnswer(puzzleId, answer) {
        playClickSound();
        if (state.puzzlesSolved[puzzleId]) return;

        let isCorrect = false;
        if (puzzleId === 1 && answer === 277) isCorrect = true;
        if (puzzleId === 2 && answer === 210) isCorrect = true;
        if (puzzleId === 3 && answer === 144) isCorrect = true;

        const card = document.getElementById(`puzzle-${puzzleId}-card`);
        const statusSpan = document.getElementById(`p${puzzleId}-status`);

        if (isCorrect) {
            playSuccessSound();
            state.puzzlesSolved[puzzleId] = true;
            
            // Adjust card styling on success
            card.classList.remove('border-slate-800/60');
            card.classList.add('border-emerald-500/40', 'bg-emerald-950/10', 'shadow-neon-green');
            statusSpan.innerText = "Calibrated";
            statusSpan.classList.remove('text-amber-400', 'bg-amber-500/10', 'border-amber-500/20');
            statusSpan.classList.add('text-emerald-400', 'bg-emerald-500/10', 'border-emerald-500/20');

            // Disable other options on solved card
            const pButtons = card.querySelectorAll('button');
            pButtons.forEach(btn => {
                btn.disabled = true;
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                if (parseInt(btn.innerText) === answer) {
                    btn.classList.remove('bg-slate-950/80', 'text-slate-300');
                    btn.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/40');
                }
            });

            // Unlock relative magnet inside stockpile
            let magnetKey = 'neo';
            if (puzzleId === 2) magnetKey = 'super';
            if (puzzleId === 3) magnetKey = 'electro';
            unlockMagnet(magnetKey);
            updateProgressText();
        } else {
            playErrorSound();
            card.classList.add('border-rose-500/50', 'shadow-neon-red');
            updateTelemetry("Calibration Polarity Error. Re-calculating...", "text-rose-400");
            setTimeout(() => {
                card.classList.remove('border-rose-500/50', 'shadow-neon-red');
            }, 800);
        }
    }

    function unlockMagnet(key) {
        state.unlocked[key] = true;
        let magId = 'magnet-neo';
        if (key === 'super') magId = 'magnet-super';
        if (key === 'electro') magId = 'magnet-electro';
        
        const magnetEl = document.getElementById(magId);
        magnetEl.classList.remove('opacity-35', 'cursor-not-allowed', 'bg-slate-900/20');
        
        let borderGlow = 'border-sky-500/30 hover:border-sky-400/80 shadow-neon-blue';
        if (key === 'super') borderGlow = 'border-violet-500/30 hover:border-violet-400/80 shadow-neon-purple';
        if (key === 'electro') borderGlow = 'border-purple-500/30 hover:border-purple-400/80 shadow-neon-purple';

        magnetEl.className = `bg-slate-900 p-2.5 rounded-lg border cursor-pointer transition-all duration-300 relative flex items-center space-x-3 ${borderGlow}`;
        magnetEl.setAttribute('draggable', 'true');
        
        const name = key === 'neo' ? 'Neodymium Core' : key === 'super' ? 'Superconducting Coil' : 'Electro-Booster';
        updateTelemetry(`Unlocked: ${name}. Place into Track Slot.`, "text-emerald-400");
    }

    function updateProgressText() {
        let count = 0;
        if (state.puzzlesSolved[1]) count++;
        if (state.puzzlesSolved[2]) count++;
        if (state.puzzlesSolved[3]) count++;
        document.getElementById('calibration-progress').innerText = `Calibrated: ${count}/3`;
    }

    // --- DRAG, CLICK AND DROPOUT SELECTION ---
    function handleDragStart(event, magnetType) {
        if (!state.unlocked[magnetType]) {
            event.preventDefault();
            return;
        }
        event.dataTransfer.setData("text/plain", magnetType);
        playClickSound();
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function handleDrop(event, slotNum) {
        event.preventDefault();
        const magnetType = event.dataTransfer.getData("text/plain");
        if (magnetType && state.unlocked[magnetType]) {
            equipMagnet(magnetType, slotNum);
        }
    }

    function selectMagnet(magnetType) {
        if (!state.unlocked[magnetType]) {
            updateTelemetry("Component Locked! Solve card puzzle to calibrate.", "text-amber-400");
            playErrorSound();
            return;
        }
        
        playClickSound();
        if (state.selectedMagnet === magnetType) {
            state.selectedMagnet = null;
            clearInventoryHighlight();
            updateTelemetry("Component deselected.", "text-slate-400");
        } else {
            state.selectedMagnet = magnetType;
            highlightActiveSelection(magnetType);
            const name = magnetType === 'neo' ? 'Neodymium Core' : magnetType === 'super' ? 'Superconducting Coil' : 'Electro-Booster';
            updateTelemetry(`Selected: ${name}. Tap a vacant Track Slot.`, "text-cyan-400");
        }
    }

    function highlightActiveSelection(magnetType) {
        clearInventoryHighlight();
        let activeId = 'magnet-neo';
        if (magnetType === 'super') activeId = 'magnet-super';
        if (magnetType === 'electro') activeId = 'magnet-electro';
        document.getElementById(activeId).classList.add('ring-2', 'ring-cyan-400', 'shadow-[0_0_20px_rgba(34,211,238,0.5)]');
    }

    function clearInventoryHighlight() {
        document.getElementById('magnet-neo').classList.remove('ring-2', 'ring-cyan-400', 'shadow-[0_0_20px_rgba(34,211,238,0.5)]');
        document.getElementById('magnet-super').classList.remove('ring-2', 'ring-cyan-400', 'shadow-[0_0_20px_rgba(34,211,238,0.5)]');
        document.getElementById('magnet-electro').classList.remove('ring-2', 'ring-cyan-400', 'shadow-[0_0_20px_rgba(34,211,238,0.5)]');
    }

    function selectSlot(slotNum) {
        if (state.selectedMagnet) {
            equipMagnet(state.selectedMagnet, slotNum);
            state.selectedMagnet = null;
            clearInventoryHighlight();
        } else {
            if (state.slots[slotNum]) {
                const unequippedType = state.slots[slotNum];
                state.slots[slotNum] = null;
                updateSlotDisplay(slotNum);
                const name = unequippedType === 'neo' ? 'Neodymium' : unequippedType === 'super' ? 'Superconducting' : 'Electro-Booster';
                updateTelemetry(`Removed ${name} from Slot ${slotNum}.`, "text-amber-400");
                playTone(400, 'sine', 0.15, 0.1);
                checkTrackReady();
            } else {
                updateTelemetry(`Slot ${slotNum} is empty. Tap an inventory magnet to slot in.`, "text-slate-400");
                playTone(300, 'sine', 0.15, 0.08);
            }
        }
    }

    function equipMagnet(magnetType, slotNum) {
        // Prevent putting same magnet instance into multiple slots
        if (state.slots[1] === magnetType) state.slots[1] = null;
        if (state.slots[2] === magnetType) state.slots[2] = null;
        if (state.slots[3] === magnetType) state.slots[3] = null;

        state.slots[slotNum] = magnetType;
        updateSlotDisplay(1);
        updateSlotDisplay(2);
        updateSlotDisplay(3);

        const magnetTitle = magnetType === 'neo' ? 'Neodymium Core' : magnetType === 'super' ? 'Superconducting Coil' : 'Electro-Booster';
        updateTelemetry(`Equipped ${magnetTitle} in Slot ${slotNum}.`, "text-emerald-400");
        playSuccessSound();

        checkTrackReady();
    }

    function updateSlotDisplay(slotNum) {
        const dropZone = document.getElementById(`slot-${slotNum}-drop`);
        const contentDiv = document.getElementById(`slot-${slotNum}-content`);
        const activeMagnet = state.slots[slotNum];

        if (activeMagnet) {
            dropZone.classList.remove('dashed-slot-empty');
            dropZone.classList.add('dashed-slot', 'bg-slate-900/60', 'shadow-neon-blue', 'border-transparent');
            
            const isNeo = activeMagnet === 'neo';
            const isSuper = activeMagnet === 'super';
            
            const icon = isNeo ? '🧲' : isSuper ? '⚡' : '🌀';
            const colorClass = isNeo ? 'text-sky-400' : isSuper ? 'text-violet-400' : 'text-purple-400';
            const name = isNeo ? 'Neodymium' : isSuper ? 'Superconduct' : 'Electro-Boost';
            
            contentDiv.innerHTML = `
                <div class="text-lg">${icon}</div>
                <span class="text-[11px] font-extrabold ${colorClass}">${name}</span>
                <span class="text-[8px] text-slate-500 font-mono">CALIBRATED FIELD</span>
            `;
        } else {
            dropZone.classList.remove('dashed-slot', 'bg-slate-900/60', 'shadow-neon-blue');
            dropZone.classList.add('dashed-slot-empty');
            
            contentDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
                </svg>
                <span class="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">Slot ${slotNum}: Empty</span>
            `;
        }
    }

    function checkTrackReady() {
        const launchBtn = document.getElementById('launch-btn');
        const hasMagnet1 = state.slots[1] !== null;
        const hasMagnet2 = state.slots[2] !== null;
        const hasMagnet3 = state.slots[3] !== null;

        if (hasMagnet1 && hasMagnet2 && hasMagnet3) {
            launchBtn.disabled = false;
            launchBtn.classList.remove('bg-slate-800', 'text-slate-500', 'cursor-not-allowed', 'border-slate-700/50');
            launchBtn.classList.add('bg-cyan-500', 'text-slate-950', 'hover:bg-cyan-400', 'shadow-neon-blue', 'border-transparent');
            updateTelemetry("ALL FIELD INTERFACES SECURED. Launch active.", "text-cyan-400");
        } else {
            launchBtn.disabled = true;
            launchBtn.classList.remove('bg-cyan-500', 'text-slate-950', 'hover:bg-cyan-400', 'shadow-neon-blue', 'border-transparent');
            launchBtn.classList.add('bg-slate-800', 'text-slate-500', 'cursor-not-allowed', 'border-slate-700/50');
        }
    }

    // --- MAGLEV RUN TEST SIMULATION ---
    function launchTestTrain() {
        if (document.getElementById('launch-btn').disabled) return;

        updateTelemetry("Initiating magnetic induction sequence...", "text-amber-400");
        playEngineHum();

        const train = document.getElementById('maglev-train');
        const brakeIndicator = document.getElementById('brake-indicator');
        const container = document.getElementById('track-container');

        // Dynamically compute bottom offset height for precise dynamic glide
        const targetOffsetHeight = container.clientHeight - 68; // Capsule offset from container bottom
        
        // Show train capsule at the dock
        train.style.transition = 'none';
        train.style.opacity = '1';
        train.style.transform = 'translate(-50%, 0px)';
        
        document.getElementById('launch-btn').disabled = true;

        setTimeout(() => {
            // Animate transition glide through slots
            train.style.transition = 'transform 2.2s cubic-bezier(0.25, 1, 0.5, 1)';
            train.style.transform = `translate(-50%, ${targetOffsetHeight}px)`;
            updateTelemetry("Capsule accelerating through 3 field stages!", "text-cyan-400");
        }, 100);

        // Brake target action visualizer
        setTimeout(() => {
            brakeIndicator.classList.remove('bg-rose-500');
            brakeIndicator.classList.add('bg-emerald-500', 'shadow-neon-green');
            updateTelemetry("Decelerometer active. Capsule safe in Stop point.", "text-emerald-400");
            checkTrackReady();
        }, 2300);

        // Auto clean train visual transition
        setTimeout(() => {
            brakeIndicator.classList.remove('bg-emerald-500', 'shadow-neon-green');
            brakeIndicator.classList.add('bg-rose-500');
            train.style.transition = 'opacity 0.4s ease';
            train.style.opacity = '0';
        }, 4500);
    }

    // --- HARD SYSTEM RESET ---
    function resetTerminal() {
        playTone(150, 'square', 0.5, 0.2);
        
        state.unlocked.neo = false;
        state.unlocked.super = false;
        state.unlocked.electro = false;
        
        state.slots[1] = null;
        state.slots[2] = null;
        state.slots[3] = null;
        
        state.selectedMagnet = null;
        
        state.puzzlesSolved[1] = false;
        state.puzzlesSolved[2] = false;
        state.puzzlesSolved[3] = false;

        // Reset Card UI Elements
        [1, 2, 3].forEach(pId => {
            const card = document.getElementById(`puzzle-${pId}-card`);
            const statusSpan = document.getElementById(`p${pId}-status`);
            
            card.className = "bg-slate-900/40 p-3 rounded-lg border border-slate-800/60 hover:border-slate-700/60 transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2";
            statusSpan.innerText = "Locked";
            statusSpan.className = "text-[8px] font-mono text-amber-400 bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20 uppercase";
            
            const pButtons = card.querySelectorAll('button');
            pButtons.forEach(btn => {
                btn.disabled = false;
                btn.className = "py-1.5 px-3 text-xs font-mono font-bold bg-slate-950/80 hover:bg-slate-800 text-slate-300 rounded border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-150";
            });
        });

        // Reset Stockpile components
        ['neo', 'super', 'electro'].forEach(key => {
            const magId = key === 'neo' ? 'magnet-neo' : key === 'super' ? 'magnet-super' : 'magnet-electro';
            const el = document.getElementById(magId);
            el.className = "bg-slate-900/20 p-2.5 rounded-lg border border-slate-800/40 opacity-35 cursor-not-allowed transition-all duration-300 relative flex items-center space-x-3";
            el.setAttribute('draggable', 'false');
        });

        // Track updates
        updateSlotDisplay(1);
        updateSlotDisplay(2);
        updateSlotDisplay(3);
        checkTrackReady();
        updateProgressText();

        updateTelemetry("Hard reset complete. Ready for calibration...", "text-slate-400");
    }

    //This is end of ai code