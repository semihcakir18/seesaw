let objects = [];

function saveState() {
  const state = {
    objects: objects,
    leftTorque: leftTorque,
    rightTorque: rightTorque,
    leftWeight: leftWeight,
    rightWeight: rightWeight,
    tiltAngle: tiltAngle,
    zIndexCounter: zIndexCounterForWeights,
  };
  localStorage.setItem("seesawState", JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem("seesawState");
  if (!saved) {
    return;
  }

  const state = JSON.parse(saved);
  objects = state.objects || [];
  leftTorque = state.leftTorque || 0;
  rightTorque = state.rightTorque || 0;
  leftWeight = state.leftWeight || 0;
  rightWeight = state.rightWeight || 0;
  tiltAngle = state.tiltAngle || 0;
  zIndexCounterForWeights = state.zIndexCounter || 3;

  objects.forEach((obj) => {
    createWeightObjectFromData(obj.x, obj.weight, obj.color, obj.zIndex);
  });

  changePlankTiltVisual(tiltAngle);
  showInfo(leftTorque, rightTorque, tiltAngle);
}

function resetState() {
  localStorage.removeItem("seesawState");

  document.querySelectorAll(".weight-object").forEach((obj) => obj.remove());

  objects = [];
  leftTorque = 0;
  rightTorque = 0;
  leftWeight = 0;
  rightWeight = 0;
  tiltAngle = 0;
  zIndexCounterForWeights = 1;

  changePlankTiltVisual(0);
  showInfo(0, 0, 0);
}

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
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(`Click position - X: ${x}, Y: ${y}`);
  return { x, y };
}
function showInfo() {
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

let randomColorsToPickFromForWeights = [
  "#772918ff",
  "#1d8831ff",
  "#172874ff",
  "#5f1664ff",
  "#156662ff",
  "#696d1aff",
];

function createWeightObjectFromData(x, weight, color, zIndex) {
  const plank = document.getElementById("plank");
  const weightObj = document.createElement("div");
  let size = 20 + weight * 4;

  weightObj.style.width = size + "px";
  weightObj.style.height = size + "px";
  weightObj.className = "weight-object";
  weightObj.style.backgroundColor = color;
  weightObj.textContent = weight + "kg";
  weightObj.style.left = x + "px";
  weightObj.style.top = -size + "px";
  weightObj.style.zIndex = zIndex.toString();
  weightObj.style.animation = "none";

  plank.appendChild(weightObj);
}

function createWeightObject(x, weight) {
  const plank = document.getElementById("plank");
  const weightObj = document.createElement("div");
  let size = 20 + weight * 4;

  const color =
    randomColorsToPickFromForWeights[
      Math.floor(Math.random() * randomColorsToPickFromForWeights.length)
    ];

  weightObj.style.width = size + "px";
  weightObj.style.height = size + "px";
  weightObj.className = "weight-object";
  weightObj.style.backgroundColor = color;
  weightObj.textContent = weight + "kg";
  weightObj.style.left = x + "px";
  weightObj.style.top = -size + "px";
  weightObj.style.zIndex = zIndexCounterForWeights.toString();

  plank.appendChild(weightObj);

  objects.push({
    weight: weight,
    x: x,
    color: color,
    zIndex: zIndexCounterForWeights,
  });

  zIndexCounterForWeights += 1;
}

function handlePlankClick(event) {
  const { x, y } = getClickPosition(event);
  const distanceFromPivot = x - 200; // the plank is 400px wide, so pivot is at 200px
  const force = createRandomForce();

  createWeightObject(x, force);
  updateLeftAndRightTorque(force, distanceFromPivot);
  tiltAngle = calculateTiltAngle(leftTorque, rightTorque);
  changePlankTiltVisual(tiltAngle);
  showInfo();
  saveState();
}

document
  .getElementById("clickable-area-for-plank")
  .addEventListener("click", handlePlankClick);

document.getElementById("reset-btn").addEventListener("click", resetState);

window.addEventListener("DOMContentLoaded", loadState);
