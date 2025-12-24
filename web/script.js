const scientists = [
  "Alan Turing",
  "Andrey Markov",
  "Barbara Liskov",
  "Charles Babbage",
  "Dabbala Breddy",
  "David Deutsch",
  "Dennis Ritchie",
  "Edsger",
  "Euclid",
  "Geoffrey",
  "Guido Van Rossum",
  "Issac Newton",
  "James Gosling",
  "Kent Thompson",
  "Larry Page",
  "Lesile Lamport",
  "Linus Torvalds",
  "Mark Zuckerberg",
  "Martin Cooper",
  "Martin Hellman"
];

let currentIndex = 0;
let selectedAnswer = "";

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

function startGame() {
  showScreen("scientists");
  loadScientists();
}

function loadScientists() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  scientists.forEach((name, index) => {
    const img = document.createElement("img");
    img.src = `../images/${name}.jpeg`;
    img.onclick = () => startQuiz(index);
    grid.appendChild(img);
  });
}

function startQuiz(index) {
  currentIndex = index;

  document.querySelectorAll(".grid img").forEach(img => {
    img.classList.remove("active");
    img.classList.add("dim");
  });

  const selectedImg = document.querySelectorAll(".grid img")[index];
  selectedImg.classList.add("active");
  selectedImg.classList.remove("dim");

  document.getElementById("quizBox").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  document.getElementById("quizImage").src =
    `../images/${scientists[currentIndex]}.jpeg`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  selectedAnswer = "";

  let options = [...scientists]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (!options.includes(scientists[currentIndex])) {
    options[0] = scientists[currentIndex];
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => {
      selectedAnswer = opt;

      document.querySelectorAll("#options button")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");
    };

    optionsDiv.appendChild(btn);
  });
}

function submitAnswer() {
  const popup = document.getElementById("popup");

  popup.textContent =
    selectedAnswer === scientists[currentIndex]
      ? "✅ Correct Answer!"
      : "❌ Wrong Answer";

  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
    nextScientist();
  }, 3000);
}

function nextScientist() {
  currentIndex = (currentIndex + 1) % scientists.length;
  startQuiz(currentIndex);
}
