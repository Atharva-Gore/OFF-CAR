body {
  background-color: #111;
  color: white;
  font-family: sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
}

h1 {
  margin-top: 20px;
  font-size: 2rem;
}

#gameContainer {
  width: 375px;
  height: 500px;
  margin: 20px auto;
  background: #333;
  border: 3px solid #888;
  position: relative;
  overflow: hidden;
}

.lane-divider {
  position: absolute;
  top: 0;
  left: 50%;
  width: 5px;
  height: 100%;
  background: #ccc;
  transform: translateX(-50%);
}

.enemyCar, #playerCar {
  position: absolute;
  width: 50px;
  height: 90px;
}

#playerCar {
  bottom: 10px;
  left: 175px;
}

.scoreBoard {
  margin-top: 10px;
}

#restartBtn {
  margin-top: 10px;
  padding: 8px 20px;
  font-size: 1rem;
  background: #00aaff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: none;
}

#restartBtn:hover {
  background: #007acc;
}
