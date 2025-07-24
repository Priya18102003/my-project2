const qaList = [
    { link:"What is the primar...",
        question: "What is the primary purpose of React in web development, and how does it contribute to building dynamic and interactive user interfaces?", 
      answer: "React is primarily used for building user interfaces, allowing developers to create reusable UI components and manage the state of applications efficiently." },
      {  link:"What is the result...",
        question: "What is the result of 5+3?", 
      answer: "8" },
      { link:"is React a JavaScr...",
        question: "Is React a JavaScript library?", 
      answer: "Yes, React is a JavaScript library for building user interfaces." },
      {link:"Explain the conce...",
        question: "Explain the concept of JSX in React?",
       answer: "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files, making it easier to describe what the UI should look like." },
      { link:"What is the capita...",
        question: "What is the capital of France?", 
      answer: "Paris" },
      { link:"Define Newton's S...",
        question: "Define Newton's Second Law of Motion.",
      answer: "Newton's Second Law states that Force = Mass * Acceleration (F = ma)." },
      { link:"What is the square...",
        question: "What is the square root of 144?", 
      answer: "12" },
      { link:"What does HTML sta...",
        question: "What does HTML stand for?", 
      answer: "Hyper Text Markup Language" },
      { link:"Who developed the...",
        question: "Who developed the Python programming language?",
       answer: "Guido van Rossum" },
      { link:"What is the chemic...",
        question: "What is the chemical symbol for Gold?",
       answer: "Au" },
      { link:"Solve:15 * 6",
        question: "Solve: 15 * 6", 
      answer: "90" },
      {link:"Explain the conce...",
         question: "Explain the concept of Object-Oriented Programming.",
       answer: "Object-Oriented Programming (OOP) is a programming paradigm that organizes software into objects that contain both data and methods." },
      { link:"What is the functi...",
        question: "What is the function of RAM in a computer?", 
      answer: "RAM (Random Access Memory) is used to store and access data that is actively being used by the system, making operations faster." },
      { link:"Which planet is kn...",
        question: "Which planet is known as the Red Planet?", 
      answer: "Mars" },
      { link:"Calculate the are...",
        question: "Calculate the area of a rectangle with length 10cm and width 5cm.", 
      answer: "50cm<sup>2</sup>" },
      { link:"What is an algorit...",
        question: "What is an algorithm?", 
      answer: "An algorithm is a step-by-step procedure or formula for solving a problem." }
    ];
  

  const resultsContainer = document.getElementById("resultsContainer");
  let isFullView = false;
  let showAll = false;
  const defaultLimit = 10;
  const moreBtn = document.createElement("button");
  const statusLine = document.createElement("p");

  function displayQuestions(showAllAnswers = false, filteredList = null) {
    const list = filteredList || qaList;
    resultsContainer.innerHTML = "";

    let displayList = showAll ? list : list.slice(0, defaultLimit);

    displayList.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("result-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const link = document.createElement("a");
      link.href = "#";
      link.className = "question-label";
      link.textContent = item.link;

      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.textContent = item.question;
      questionDiv.style.display = "none";

      const answerDiv = document.createElement("div");
      answerDiv.className = "answer";
      answerDiv.innerHTML = item.answer;
      answerDiv.style.display = "none";

      const typeDiv = document.createElement("div");
      typeDiv.className = "type";
      typeDiv.textContent = "Type: " + (item.type || "N/A");
      typeDiv.style.display = "none";

      const ownerDiv = document.createElement("div");
      ownerDiv.className = "owner";
      ownerDiv.textContent = "Owner: " + (item.owner || "N/A");
      ownerDiv.style.display = "none";

      const marksDiv = document.createElement("div");
      marksDiv.className = "marks";
      marksDiv.textContent = "Marks: " + (item.marks || "N/A");
      marksDiv.style.display = "none";      

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "actions";
      actionsDiv.innerHTML = `<i class="fa fa-edit"></i> <i class="fa fa-trash"></i>`;
      actionsDiv.style.display = "none";

      const label = document.createElement("label");
      label.style.display = "block";
      label.style.cursor = "pointer";
      label.appendChild(checkbox);
      label.appendChild(link);

      /*div.appendChild(label);
      div.appendChild(questionDiv);*/
        // First column: Question and answer
      const qaColumn = document.createElement("div");
      qaColumn.appendChild(label);
      qaColumn.appendChild(questionDiv);
      qaColumn.appendChild(answerDiv);

// Append in grid order
      div.appendChild(qaColumn);
      div.appendChild(typeDiv);
      div.appendChild(ownerDiv);
      div.appendChild(marksDiv);
      div.appendChild(actionsDiv);
      div.appendChild(answerDiv);
      div.appendChild(typeDiv);
      div.appendChild(ownerDiv);
      div.appendChild(marksDiv);
      div.appendChild(actionsDiv);

      if (showAllAnswers) {
        link.style.display = "none";
        questionDiv.style.display = "block";
        answerDiv.style.display = "block";
      }

      link.addEventListener("click", (e) => {
        e.preventDefault();
        link.style.display = "none";
        questionDiv.style.display = "block";
        answerDiv.style.display = "block";
      });

      [questionDiv, answerDiv].forEach(el => {
        el.addEventListener("click", () => {
          if (!isFullView) {
            link.style.display = "inline-block";
            questionDiv.style.display = "none";
            answerDiv.style.display = "none";
          }
        });
      });

      resultsContainer.appendChild(div);
    });

    // Status & More/Less button
  

    statusLine.textContent = `Showing ${showAll ? qaList.length : defaultLimit} out of ${qaList.length}`;
    resultsContainer.appendChild(statusLine);

      moreBtn.textContent = showAll ? "Less" : "More";
    moreBtn.style.marginTop = "10px" ;
    moreBtn.onclick = () => {
    showAll = !showAll;
    displayQuestions(isFullView);
    };
    resultsContainer.appendChild(moreBtn);
  }

  function searchFunction() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filtered = qaList.filter(item =>
      (item.question?.toLowerCase() || "").includes(input) ||
      (item.answer?.toLowerCase() || "").includes(input)
    );
    displayQuestions(isFullView, filtered);
  }

  document.getElementById("fullViewBtn").addEventListener("click", () => {
    isFullView = !isFullView;
    displayQuestions(isFullView);
  });

  function toggleDropdown() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");

    window.onclick = function(event) {
      if (!event.target.closest(".view-check")) {
        dropdown.classList.remove("show");
      }
    };
  }

  function applyFilters() {
    const showQuestion = document.getElementById("showQuestion").checked;
    const showType = document.getElementById("showType").checked;
    const showOwner = document.getElementById("showOwner").checked;
    const showMarks = document.getElementById("showMarks").checked;
    const showActions = document.getElementById("showActions").checked;

    document.querySelectorAll(".question").forEach(el => el.style.display = showQuestion || isFullView ? "block" : "none");
    document.querySelectorAll(".answer").forEach(el => el.style.display = showQuestion || isFullView ? "block" : "none");
    document.querySelectorAll(".type").forEach(el => el.style.display = showType ? "inline" : "none");
    document.querySelectorAll(".owner").forEach(el => el.style.display = showOwner ? "inline" : "none");
    document.querySelectorAll(".marks").forEach(el => el.style.display = showMarks ? "inline" : "none");
    document.querySelectorAll(".actions").forEach(el => el.style.display = showActions ? "inline" : "none");
  }
 displayQuestions(false);