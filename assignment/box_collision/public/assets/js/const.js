const container = document.getElementById("container");
const offset = 30;
var maxHeight = window.innerHeight - offset;
var maxWidth = window.innerWidth - offset;
var maxVelocity = 3;
container.style.width = maxWidth + "px";
container.style.height = maxHeight + "px";

const minDiameter = 20;
const maxDiameter = 40;

const minSpawnWidth = 40;
const maxSpawnWidth = maxWidth - 40;

const minSpawnHeight = 100;
const maxSpawnHeight = maxHeight - 100;

const massFactor = 20;
