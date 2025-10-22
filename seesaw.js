let leftTorque = 0;
let rightTorque = 0;
let tiltAngle = 0; // in degrees
let zIndexCounterForWeights = 3;
let leftWeight = 0;
let rightWeight = 0;


// This function may only return the multiplaction of two numbers , but i added it for clarity
function calculateTorque(force, distance) {
  return force * distance;
}
// the tilt angle calculation formula given in the project description
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
    leftWeight += force;
  } else if (distanceFromPivot > 0) {
    rightTorque += calculateTorque(force, distanceFromPivot);
    rightWeight += force;
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
  const leftTorqueInfo = document.getElementById("left-torque");
  const rightTorqueInfo = document.getElementById("right-torque");
  const leftWeightInfo = document.getElementById("left-weight");
  const rightWeightInfo = document.getElementById("right-weight");
  const tiltAngleInfo = document.getElementById("angle");
  leftTorqueInfo.textContent = `Left Torque: ${leftTorque.toFixed(2)}`;
  rightTorqueInfo.textContent = `Right Torque: ${rightTorque.toFixed(2)}`;
  leftWeightInfo.textContent = `Left Weight: ${leftWeight} kg`;
  rightWeightInfo.textContent = `Right Weight: ${rightWeight} kg`;
  tiltAngleInfo.textContent = `Tilt Angle: ${tiltAngle.toFixed(2)}°`;
}

let randomColorsToPickFromForWeights = [ "#772918ff", "#1d8831ff", "#172874ff", "#5f1664ff", "#156662ff", "#696d1aff" ];
function createWeightObject(x, weight) {
  const plank = document.getElementById("plank");
  const weightObj = document.createElement("div");
  let size = 20 + weight * 4;

  weightObj.style.width = size + "px";
  weightObj.style.height = size + "px";
  weightObj.className = "weight-object";
  weightObj.style.backgroundColor = randomColorsToPickFromForWeights[Math.floor(Math.random() * randomColorsToPickFromForWeights.length)];
  weightObj.textContent = weight + "kg";
  weightObj.style.left = x + "px";
  weightObj.style.top = -size + "px";
  weightObj.style.zIndex = zIndexCounterForWeights.toString();

  zIndexCounterForWeights += 1;

  plank.appendChild(weightObj);
}

function handlePlankClick(event) {
  const x = getClickPosition(event);
  const distanceFromPivot = x - 200;
  const force = createRandomForce();

  createWeightObject(x, force);
  updateLeftAndRightTorque(force, distanceFromPivot);
  tiltAngle = calculateTiltAngle(leftTorque, rightTorque);
  changePlankTiltVisual(tiltAngle);
  showInfo(leftTorque, rightTorque, tiltAngle);
}

document
  .getElementById("clickable-area-for-plank")
  .addEventListener("click", handlePlankClick);
