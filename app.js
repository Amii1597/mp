// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);
  
  // DOM

  const btnnext= document.querySelector(".next");
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDivs = document.querySelectorAll(".results__result");
  const resultWinner = document.querySelector(".results__winner");
  const resultText = document.querySelector(".results__text");
  const playAgainBtn = document.querySelector(".play-again");
  const scoreNumber = document.querySelector(".score__number");
  let score = 0;
  const scoreNumber1 = document.querySelector(".score__number1");
  let score1 = 0;
  const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  
  // Game Logic
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);

      choose(choice);
 
    });
  });
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
    
  }
  
  function aiChoose() {

    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
    
  }

  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}" >
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 500);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  }


  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isLoser(results.reverse());
      if (userWins) {
        resultText.innerText = " YOU WIN" +  
        " AGAINST PC";
        resultDivs[0].classList.toggle("winner");
        keepScore(1);
        playAgainBtn.innerHTML="Play Again";
        
        btnnext.style.display='block';
       
      } else if (aiWins) {
        resultText.innerText = "YOU LOST" + 
        " AGAINST PC";
        resultDivs[0].classList.toggle("winner");
        keepScore1(1);
        playAgainBtn.innerHTML="Play Again"
        btnnext.style.display='none';
      } else {
        resultText.innerText = "TIE UP";
        playAgainBtn.innerHTML="Replay"
        btnnext.style.display='none';
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
  
    }, 500);
  }


  // score show in html
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  function isLoser(results1) {
    return results1[0].beats === results1[1].name;
  }
  function keepScore(point) {
    score += point;
    scoreNumber.innerText = score;
 
    localStorage.setItem("My_score", score);
    localStorage.getItem(score);
  }
  function keepScore1(point) {
    score1 += point;
    scoreNumber1.innerText = score1;
   localStorage.setItem("PC_score", score1);
   localStorage.getItem(score1);
  }


  // Play Again
  playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  });


   // Show/Hide Rules
  function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active")
}

