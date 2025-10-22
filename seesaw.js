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
function changePlankTiltVisual(tiltAngle) {
  const plank = document.getElementById("plank");
  plank.style.transform = `translateX(-50%) rotate(${tiltAngle}deg)`;
}
function createRandomForce() {
  return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
}
function updateLeftAndRightTorque(force, distanceFromPivot) {
  if (distanceFromPivot < 0) {
    leftTorque += calculateTorque(force, Math.abs(distanceFromPivot));
  } else if (distanceFromPivot > 0) {
    rightTorque += calculateTorque(force, distanceFromPivot);
  } else {
    // No torque applied if clicked exactly at the pivot
  }
}

function handlePlankClick(event) {
  const clickableArea = document.getElementById("clickable-area-for-plank");
  const rect = clickableArea.getBoundingClientRect();

  const x = event.clientX - rect.left;

  console.log("x:", x);
  let distanceFromPivot = x - 200;
  console.log("distanceFromPivot:", distanceFromPivot);

  const force = createRandomForce();
  console.log("force:", force);

  updateLeftAndRightTorque(force, distanceFromPivot);
  tiltAngle = calculateTiltAngle(leftTorque, rightTorque);
  console.log("tiltAngle:", tiltAngle);
  changePlankTiltVisual(tiltAngle);
}

document
  .getElementById("clickable-area-for-plank")
  .addEventListener("click", handlePlankClick);
