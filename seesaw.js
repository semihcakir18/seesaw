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
function getClickPosition(event) {
  const clickableArea = document.getElementById("clickable-area-for-plank");
  const rect = clickableArea.getBoundingClientRect();
  return event.clientX - rect.left;
}
function showInfo(leftTorque, rightTorque, tiltAngle) {
  const leftWeightInfo = document.getElementById("left-weight");
  const rightWeightInfo = document.getElementById("right-weight");
  const tiltAngleInfo = document.getElementById("angle");
  leftWeightInfo.textContent = `Left Torque: ${leftTorque.toFixed(2)}`;
  rightWeightInfo.textContent = `Right Torque: ${rightTorque.toFixed(2)}`;
  tiltAngleInfo.textContent = `Tilt Angle: ${tiltAngle.toFixed(2)}°`;
}

function handlePlankClick(event) {
  const x = getClickPosition(event);
  const distanceFromPivot = x - 200;
  const force = createRandomForce();

  updateLeftAndRightTorque(force, distanceFromPivot);
  tiltAngle = calculateTiltAngle(leftTorque, rightTorque);
  changePlankTiltVisual(tiltAngle);
  showInfo(leftTorque, rightTorque, tiltAngle);
}

document
  .getElementById("clickable-area-for-plank")
  .addEventListener("click", handlePlankClick);
