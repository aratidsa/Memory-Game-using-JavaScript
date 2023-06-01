// pick id and class from html 

const board = document.querySelector('.board')
const cardsLeft = document.getElementById('cards-left')
const moves = document.getElementById('moves')
const scoreDisplay = document.getElementById('score')
const timeDisplay = document.getElementById('timer')
const modalMoves = document.getElementById('modal-moves')
const modalLostMoves = document.getElementById('modal1-moves')
const modalScoreDisplay = document.getElementById('modal-score')
const modalTimeDisplay = document.getElementById('modal-timer')
const buttonSelection = document.querySelector('.container1')
const selectionHeading = document.querySelector('.heading1')
let possibleChoices = document.querySelectorAll('.grid')
const modal = document.querySelector('.modal')
const modal1 = document.querySelector('.modal1')
const movesAllowed = document.getElementById('moves-allowed')


const ratingPoor = document.getElementById('rating-poor')
const ratingAverage = document.getElementById('rating-average')
const ratingPerfect= document.getElementById('rating-perfect')
const modalRatingPoor = document.getElementById('modal-rating-poor')
const modalRatingAverage = document.getElementById('modal-rating-average')
const modalRatingPerfect= document.getElementById('modal-rating-perfect')

// Array of Images

const cardArray = [
    {   name:'dog', img:'images/dog.jpeg'    },    {   name:'cat', img:'images/cat.jpeg'    },
    {   name:'deer', img:'images/deer.jpeg'  },  { name:'cheetah', img:'images/cheetah.jpeg' },
    {   name:'elephant', img:'images/elephant.jpeg' },    { name:'giraffe', img:'images/giraffe.jpeg'    }, 
    {   name:'tiger',img:'images/tiger.jpeg'    },   { name:'tortoise',  img:'images/tortoise.jpeg'    },
    {   name:'wolf', img:'images/wolf.jpeg'   },  { name:'zebra',  img:'images/zebra.jpeg'    },    
]

//Declarations

let numberOfCards
let cardChosen = []
let cardChosenId = []
let cardsWon = []
let boardCards
let cardClicked = 0
let playerChoice

let minutes
let seconds
let currentime = 0
let currentTimerId

//possibleChoices are generated when select buttons are clicked by user

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click',(e) =>
{
   playerChoice = e.target.id
   console.log(playerChoice)
   checkGrid(playerChoice)
}))

// function to select the grids

function checkGrid(p)
{  
    //grid3x2
   if(p === 'grid3x2')
   {
    createBoard(6)
    }
    //grid4x3
   if(p === 'grid4x3')
   {
    createBoard(12)
   }
   //grid5x4
   if(p === 'grid5x4')
   {
    createBoard(20)
   }
}

// create the board of the game

function createBoard(num)
{
    //clear the game Board
    board.innerHTML = ""

    //sorts the images from cardArray
    cardArray.sort(()=>0.5 - Math.random())

    //get the desired number of cards
    boardCards = cardArray.slice(0,num/2)
    
    //duplicate the cards
    boardCards = boardCards.concat(boardCards)
   
    //sort the cards 
    boardCards.sort(() => 0.5 - Math.random())
    
    // start the timer
    currentTimerId = setInterval(currentTime, 300)

    // display board 3 X 2
    if(num === 6)
    {   //store and show number of cards to be played
        numberOfCards = num
        cardsLeft.innerHTML = numberOfCards
        
        //selection buttons and heading should not be seen
        buttonSelection.style.display = "none"
        selectionHeading.style.display = "none"

        //display board
        board.style.display="block"

        //board size for grid 3x2
        board.style.width = "600px"
        board.style.height = "400px"
        board.style.marginLeft = "440px"
        board.style.marginTop = "20px"

        // add cards to the board
        for(let i = 0; i < num ; i++)
        {   // create image element
            let card = document.createElement('img')
            card.setAttribute('src',"images/newscreen.jpeg")
            card.setAttribute('data-id',i) 
            //on clicking the card call flipCard function
            card.addEventListener('click',flipCard)           
            board.appendChild(card)            
        }         
    }

     //board size for grid 4x3
    if(num === 12)
    {  
        //store and show number of cards to be played
        numberOfCards = num
        cardsLeft.innerHTML = numberOfCards
        
        //selection buttons and heading should not be seen
        buttonSelection.style.display = "none"
        selectionHeading.style.display = "none"

        //display board
        board.style.display="block"

        //board size for grid 4x3
        board.style.width = "700px"
        board.style.height = "500px"
        board.style.marginLeft = "410px"
        board.style.marginTop = "20px"

        // add cards to the board
        for(let i = 0; i < num ; i++)
        {   // create image element
            let card = document.createElement('img')
            card.setAttribute('src',"images/newscreen.jpeg")
            card.setAttribute('data-id',i) 
            //on clicking the card call flipCard function
            card.addEventListener('click',flipCard)           
            board.appendChild(card)            
        }         
    }

     //board size for grid 5x4
    if(num === 20)
    {  
        //store and show number of cards to be played
        numberOfCards = num
        cardsLeft.innerHTML = numberOfCards
        
        //selection buttons and heading should not be seen
        buttonSelection.style.display = "none"
        selectionHeading.style.display = "none"

        //display board
        board.style.display="block"

        //board size for grid 5x4
        board.style.width = "900px"
        board.style.height = "650px"
        board.style.marginLeft = "320px"
        board.style.marginTop = "10px"

        // add cards to the board
        for(let i = 0; i < num ; i++)
        {   // create image element
            let card = document.createElement('img')
            card.setAttribute('src',"images/newscreen.jpeg")
            card.setAttribute('data-id',i)  
            //on clicking the card call flipCard function
            card.addEventListener('click',flipCard)          
            board.appendChild(card)            
        }         
    }
}

// function to flip the cards and display the image

function flipCard()
{
    //get the id of the card clicked
    let cardId = this.getAttribute('data-id')    

    //push the names of the cards clicked in the array
    cardChosen.push(boardCards[cardId].name)    
    
    //store and display the number of clicks on the card
    cardClicked += 1
    moves.innerHTML = cardClicked 
    modalMoves.innerHTML = cardClicked
    modalLostMoves.innerHTML = cardClicked
   
    //push the Id's of the cards clicked
    cardChosenId.push(cardId)    

    //display the image of the card when clicked
    this.setAttribute('src',boardCards[cardId].img)

    //check for a match after 2 cards are selected
    if(cardChosen.length == 2)
    {
       setTimeout(checkMatch, 500)
    }

    //check for number of clicks allowed for each grid
    checkNumberOfClicks()
}

//function to check matches of cards
function checkMatch()
{  
   //pick all the images
   let cards = document.querySelectorAll('.board img')
    
   // if you have clicked the same image flip the cards back
   if(cardChosenId[0] == cardChosenId[1])
   {
     cards[cardChosenId[0]].setAttribute('src','images/newscreen.jpeg')
     cards[cardChosenId[1]].setAttribute('src','images/newscreen.jpeg')
   }

   // if you have found a match
   if(cardChosen[0] == cardChosen[1] && cardChosenId[0] != cardChosenId[1])
   {  
    cards[cardChosenId[0]].removeEventListener('click',flipCard)
    cards[cardChosenId[1]].removeEventListener('click',flipCard)

    // for every match you get a point
    cardsWon.push(cardChosen)
    console.log(cardsWon)    

    // after every match the number of cards decreases by 2
    numberOfCards -= 2
    console.log(numberOfCards)
    cardsLeft.innerHTML = numberOfCards
   }

   // if match not found flip the cards back
   else
   {
     cards[cardChosenId[0]].setAttribute('src','images/newscreen.jpeg')
     cards[cardChosenId[1]].setAttribute('src','images/newscreen.jpeg')
   }

   //display the score after every match found
   scoreDisplay.innerHTML = cardsWon.length
   modalScoreDisplay.innerHTML = cardsWon.length

   //initalize the array
   cardChosen = []
   cardChosenId = []

   //if all matches are found
   if(numberOfCards === 0)
   {  
      //calculate the rating
      calculateRatingStars()

      //clear the timer
      clearInterval(currentTimerId)
      
      //display the modal
      modal.style.display="block"  
      board.style.display="none"        
   }   
}

// function to generate time in minutes and seconds
function currentTime()
{   
    currentime += 1
    
    //display the time in seconds
    if(currentime < 60)
    {  timeDisplay.textContent = currentime + " sec"  
       modalTimeDisplay.innerHTML = currentime + " sec"       
    }
    //display the time in minutes and seconds
    else if (currentime < 3600)   
    {
        minutes = Math.floor(currentime/60)
        seconds = currentime % 60
        newTime = minutes+" min"+":"+seconds+" sec"
        timeDisplay.textContent = newTime
        modalTimeDisplay.innerHTML = newTime        
    }       
}

function calculateRatingStars()
{   
    // Star Rating for grid3x2
    if(playerChoice ==='grid3x2' && (cardClicked === 6 || cardClicked <=8))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="gold"
        ratingPerfect.style.color="gold"    
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="gold"
        modalRatingPerfect.style.color="gold"         
    }
    if(playerChoice ==='grid3x2' && (cardClicked >= 9 || cardClicked <= 11))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="gold"
        ratingPerfect.style.color="none"      
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="gold"
        modalRatingPerfect.style.color="none"           
    }
    if(playerChoice ==='grid3x2' && (cardClicked >= 12 || cardClicked <= 14))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="none"
        ratingPerfect.style.color="none"   
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="none"
        modalRatingPerfect.style.color="none"     
    }

    // Star Rating for grid4x3
    if(playerChoice ==='grid4x3' && (cardClicked === 12 || cardClicked <= 16))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="gold"
        ratingPerfect.style.color="gold"   
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="gold"
        modalRatingPerfect.style.color="gold"                  
    }
    if(playerChoice ==='grid4x3' && (cardClicked >= 17 || cardClicked <= 20))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="gold"
        ratingPerfect.style.color="none" 
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="gold"
        modalRatingPerfect.style.color="none"                  
    }
    if(playerChoice ==='grid4x3' && (cardClicked >= 21 || cardClicked < 25))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="none"
        ratingPerfect.style.color="none"     
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="none"
        modalRatingPerfect.style.color="none"              
    }

    // Star Rating for grid5x4
    if(playerChoice ==='grid5x4' && (cardClicked === 20 || cardClicked <= 25))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="gold"
        ratingPerfect.style.color="gold"  
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="gold"
        modalRatingPerfect.style.color="gold"                   
    }
    if(playerChoice ==='grid5x4' && (cardClicked >= 26 || cardClicked <= 30))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="gold"
        ratingPerfect.style.color="none"   
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="gold"
        modalRatingPerfect.style.color="none"                
    }
    if(playerChoice ==='grid5x4' && (cardClicked >= 31 || cardClicked < 45))
    {
        ratingPoor.style.color="gold"
        ratingAverage.style.color="none"
        ratingPerfect.style.color="none" 
        modalRatingPoor.style.color="gold"
        modalRatingAverage.style.color="none"
        modalRatingPerfect.style.color="none"                  
    }
}

//function to check whether number of clicks allowed is exceeding than the number of clicks made

function checkNumberOfClicks()
{   
    // clicks allowed for grid3x2
    if(playerChoice ==='grid3x2' && cardClicked >= 15)
    {
        modal1.style.display="block"
        board.style.display="none"
        clearInterval(currentTimerId)
        movesAllowed.innerHTML = "12"
    }

    // clicks allowed for grid4x3
    if(playerChoice ==='grid4x3' && cardClicked >= 26)
    {
        modal1.style.display="block"
        board.style.display="none"
        clearInterval(currentTimerId)
        movesAllowed.innerHTML = "20"
    }

    // clicks allowed for grid5x4
    if(playerChoice ==='grid5x4' && cardClicked >= 46)
    {
        modal1.style.display="block"
        board.style.display="none"
        clearInterval(currentTimerId)
        movesAllowed.innerHTML = "40"
    }
}

// function when play again button is clicked
function playAgain()
{
    //reinitialize all the content 
    modal.style.display="none" 
    modal1.style.display="none" 
    ratingPoor.style.color="white"
    ratingAverage.style.color="white"
    ratingPerfect.style.color="white"    
    modalRatingPoor.style.color="white" 
    modalRatingAverage.style.color="white" 
    modalRatingPerfect.style.color="white" 

    numberOfCards = 0
    cardChosen = []
    cardChosenId = []
    cardsWon = []
    cardClicked = 0
    currentime = 0
 
    cardsLeft.innerHTML = " 0 "
    moves.innerHTML = " 0 "
    modalMoves.innerHTML = " 0 "
    scoreDisplay.innerHTML = " 0 "
    modalScoreDisplay.innerHTML = " 0 "
    timeDisplay.textContent = " 0 "
    modalTimeDisplay.innerHTML = " 0 "
    modalLostMoves.innerHTML = " 0 "
    movesAllowed.innerHTML = " 0 "

    //clear the timer
    clearInterval(currentTimerId)

    //call the function createboard again of playerchoice
    checkGrid(playerChoice)

    //display the board
    board.style.display = "block"    
}

function exitGame()
{
    //reinitialize all the content 
    modal.style.display="none" 
    modal1.style.display="none" 
    ratingPoor.style.color="white"
    ratingAverage.style.color="white"
    ratingPerfect.style.color="white"    
    modalRatingPoor.style.color="white" 
    modalRatingAverage.style.color="white" 
    modalRatingPerfect.style.color="white" 

    numberOfCards = 0
    cardChosen = []
    cardChosenId = []
    cardsWon = []
    cardClicked = 0
    currentime = 0

    cardsLeft.innerHTML = " 0 "
    moves.innerHTML = " 0 "
    modalMoves.innerHTML = " 0 "
    scoreDisplay.innerHTML = " 0 "
    modalScoreDisplay.innerHTML = " 0 "
    timeDisplay.textContent = " 0 "
    modalTimeDisplay.innerHTML = " 0 "
    modalLostMoves.innerHTML = " 0 "
    movesAllowed.innerHTML = " 0 "

    //clear the timer
    clearInterval(currentTimerId)

    //display the selection button and headings
    buttonSelection.style.display = "block"
    selectionHeading.style.display = "block" 
}



function newGame()
{
    modal.style.display="none" 
    modal1.style.display="none" 
    ratingPoor.style.color="white"
    ratingAverage.style.color="white"
    ratingPerfect.style.color="white"    
    modalRatingPoor.style.color="white" 
    modalRatingAverage.style.color="white" 
    modalRatingPerfect.style.color="white" 

    //do not display the board
    board.style.display = "none"

    numberOfCards = 0
    cardChosen = []
    cardChosenId = []
    cardsWon = []
    cardClicked = 0
    currentime = 0

    cardsLeft.innerHTML = " 0 "
    moves.innerHTML = " 0 "
    modalMoves.innerHTML = " 0 "
    scoreDisplay.innerHTML = " 0 "
    modalScoreDisplay.innerHTML = " 0 "
    timeDisplay.textContent = " 0 "
    modalTimeDisplay.innerHTML = " 0 "
    modalLostMoves.innerHTML = " 0 "
    movesAllowed.innerHTML = " 0 "

    //clear the timer
    clearInterval(currentTimerId)

    //display the selection button and headings
    buttonSelection.style.display = "block"
    selectionHeading.style.display = "block" 
}