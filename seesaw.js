let leftTorque = 0;
let rightTorque = 0;
let tiltAngle = 0; // in degrees
// This function may only return the multiplaction of two numbers , but i added it for clarity
function calculateTorque(force, distance) {
    return force * distance;
}
function calculateTiltAngle(leftTorque, rightTorque) {
    const angle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
    return angle;

}

function handlePlankClick(event) {
    const clickableArea = document.getElementById('clickable-area-for-plank');
    const rect = clickableArea.getBoundingClientRect();

    const x = event.clientX - rect.left;

    console.log('x:', x);
}

document.getElementById('clickable-area-for-plank').addEventListener('click', handlePlankClick);
