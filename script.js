const itemForm = document.querySelector("#itemForm");
const itemName = document.querySelector("#itemName");
const itemCategory = document.querySelector("#itemCategory");
const itemPoints = document.querySelector("#itemPoints");
const itemList = document.querySelector("#itemList");
const itemTemplate = document.querySelector("#itemTemplate");
const randomIdeaButton = document.querySelector("#randomIdeaButton");
const clearDoneButton = document.querySelector("#clearDoneButton");

const completedCount = document.querySelector("#completedCount");
const scoreCount = document.querySelector("#scoreCount");
const totalCount = document.querySelector("#totalCount");

let items = [
  { name: "Make a team logo", category: "Creative", points: 10, done: false },
  { name: "Solve a tiny puzzle", category: "Logic", points: 15, done: false },
  { name: "Interview someone new", category: "Teamwork", points: 20, done: false }
];

const randomIdeas = [
  "Invent a school mascot app",
  "Design a better lunch line system",
  "Make a quiz about your favorite game",
  "Create a club recommendation tool",
  "Build a mini scoreboard",
  "Plan the perfect first day schedule"
];

function renderItems() {
  itemList.innerHTML = "";

  items.forEach((item, index) => {
    const card = itemTemplate.content.cloneNode(true);
    const article = card.querySelector(".item-card");
    const title = card.querySelector("h3");
    const category = card.querySelector(".category");
    const points = card.querySelector(".points");
    const button = card.querySelector(".complete-button");

    title.textContent = item.name;
    category.textContent = item.category;
    points.textContent = `${item.points} points`;
    button.textContent = item.done ? "Undo" : "Done";

    if (item.done) {
      article.classList.add("done");
    }

    // Save the item's position so the button knows which item to change.
    button.addEventListener("click", () => {
      items[index].done = !items[index].done;
      renderItems();
    });

    itemList.appendChild(card);
  });

  updateStats();
}

function updateStats() {
  const doneItems = items.filter((item) => item.done);
  const score = doneItems.reduce((total, item) => total + item.points, 0);

  completedCount.textContent = doneItems.length;
  scoreCount.textContent = score;
  totalCount.textContent = items.length;
}

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  items.push({
    name: itemName.value,
    category: itemCategory.value,
    points: Number(itemPoints.value),
    done: false
  });

  itemForm.reset();
  itemPoints.value = 10;
  itemName.focus();
  renderItems();
});

randomIdeaButton.addEventListener("click", () => {
  const idea = randomIdeas[Math.floor(Math.random() * randomIdeas.length)];
  itemName.value = idea;
  itemCategory.value = "Creative";
  itemPoints.value = 10;
  itemName.focus();
});

clearDoneButton.addEventListener("click", () => {
  items = items.filter((item) => !item.done);
  renderItems();
});

renderItems();
