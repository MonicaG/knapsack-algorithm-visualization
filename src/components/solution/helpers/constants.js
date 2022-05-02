const TITLE_STEP_2 = "Step 2: Build Table";
const TITLE_STEP_3 = "Step 3: Find Solution";
const STEP_BTN_NAME = "Step";
const INBETWEEN_BTN_NAME = "Find Solution Items";

function step2Instructions(btnName) {
  return `Press the "${btnName}" button to fill the table.`;
}

function step3Instructions(btnName) {
  return `Press the "${btnName}" button to find the items.`;
}

function stepBetweenInstructions(btnName) {
  return `Press the "${btnName}" button to go to the next step of the algorithm.`;
}

export {TITLE_STEP_2, TITLE_STEP_3, step2Instructions, STEP_BTN_NAME, step3Instructions, stepBetweenInstructions, INBETWEEN_BTN_NAME};
