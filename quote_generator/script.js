const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Sh Loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quotes
async function newQuote() {
  loading();
  // Pick a Random quote from apiQuotes array
  //   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Pick a Random quote from local array
  //const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];

  //   If author field is empty will be replaced with Unknown
  //   authorText.textContent = quote.author != null ? quote.author : "Unknown";

  //   // Check quote length and determine font-size
  //   if (quote.text.length > 100) {
  //     quoteText.classList.add("long-quote");
  //   } else {
  //     quoteText.classList.remove("long-quote");
  //   }
  //   // Set Quote, Hide Loader
  //   quoteText.textContent = quote.text;
  //   complete();

  //--------------- My version of quote api -----------
  const quoteUrl = "https://goquotes-api.herokuapp.com/api/v1/random?count=1";
  try {
    const response = await fetch(quoteUrl);
    const responseJSON = await response.json();
    const quote = responseJSON.quotes[0];
    // console.log(quote);
    authorText.textContent = quote.author != null ? quote.author : "Unknown";

    // Check quote length and determine font-size
    if (quote.text.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
  } catch (error) {
    //Catch error
    alert(error.message);
  }
  complete();
}

//  Get Qutoes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch error
    alert(error.message);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners {they are coded at the bottom because you want your function to load before you call them}
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
