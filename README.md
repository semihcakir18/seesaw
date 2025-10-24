# Seesaw Simulation
<img width="1919" height="928" alt="image" src="https://github.com/user-attachments/assets/82e99295-4bd4-4822-8041-8f3934f96e43" />

## How to Run

Simply open the `index.html` file with a live server extension (like Live Server for VS Code) or any local web server. That's it!

## Development Journey

This project was built step by step, learning and implementing physics-based interactions along the way.

### 1. Setting Up the Foundation
Started with the basic HTML structure - a plank, a pivot triangle, and a clickable area. Added an event listener to capture mouse clicks and get the x-coordinate where the user clicked.

### 2. Physics Implementation
This was the core part. I implemented:
- **Torque calculation**: `torque = force × distance` where force is the weight and distance is measured from the pivot point
- **Tilt angle calculation**: Based on the difference between left and right torques, constrained to ±30 degrees
- **Random weight generation**: Each click generates a random weight between 1-10 kg
- Separate tracking of left and right torques to determine which side is heavier

### 3. Visual Feedback & Animation
Added smooth CSS transitions to make the plank tilt visually when weights are added. The rotation is applied using CSS transforms, creating a realistic seesaw motion. Also created the `showInfo()` function to display torque values in real-time.

### 4. Weight Objects
Implemented visual representations for the weights as circles that appear on the plank. Their size is proportional to their weight (heavier = bigger). Made sure they always sit on top of the plank using absolute positioning. Added info displays for left and right side weights.

### 5. LocalStorage Persistence
To make the simulation persist across page refreshes, I implemented:
- `saveState()`: Saves the current state (all weights, torques, tilt angle) to localStorage
- `loadState()`: Restores the saved state when you reload the page
- `resetState()`: Clears everything and starts fresh
- `createWeightObjectFromData()`: Recreates weight objects from saved data

There was a bug here where the program would crash if localStorage was empty on first load, but that got fixed quickly.

### 6. Polish & UX Improvements
- Made all colors CSS variables for easy theming
- Made the font size inside weight circles scale proportionally with their size for better readability
- Changed the font to something more stylish (Chiron Sung HK)

### 7. Preview System
Added a preview circle that shows where and how big the next weight will be before you click. To make this work properly, I had to pre-generate the random weight so the preview size would be accurate. This involved refactoring the random weight generation logic.

### 8. Sound Effects
Added tap and reset sound effects to make the interaction more satisfying. The tap sound plays when you drop a weight, and there's a reset sound for clearing the board.

### 9. Deployment
Deployed to Vercel. Initially ran into some 404 issues because Vercel was trying to serve from the `public` folder, but the files were in the root. Fixed by moving everything into the `public` folder and adjusting all the paths.

### 10. Final Touches
Added a favicon (that cute little icon you see in the browser tab) and a footer with my portfolio link.

---

Built with vanilla JavaScript, HTML, and CSS - no frameworks, just pure web fundamentals.
