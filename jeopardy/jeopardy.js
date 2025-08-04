// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
//this var makes it easier and cleaner so we can ref to it w/o retyping it everytime, not sure if it's more efficient or not since JS needs to constantly ref to it
const API_URL = "https://rithm-jeopardy.herokuapp.com/api/";

//i think this might be necessary for later
let categories = [];
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;
const startButton = document.getElementById("start");
/** Get NUM_CATEGORIES - random category from API.
 *
 * Returns array of category ids
 * the function name suggestions throw me off, didn't seem efficient enough and not easily understandable to anyone
 */

async function getRandomCategoryIds() {
  try {
    // API call to get 10 categories
    const response = await axios.get(`${API_URL}categories?count=100`);

    // Extract category list from response
    const categories = response.data;

    // Shuffle the categories array with spread
    const shuffled = fisherYatesShuffle([...categories]);

    // Select the first `count` number of category IDs
    const randomCategoryIds = shuffled
      .slice(0, NUM_CATEGORIES)
      .map((cat) => cat.id);

    console.log(randomCategoryIds);
    return randomCategoryIds;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fisher-Yates shuffle
function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Return object with data about a category:
 *
 *  Returns key/value pairs in objects for,{ title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

//once we know the id, we can use to get category info
async function getCategory(catId) {
  const res = await axios.get(`${API_URL}category?id=${catId}`);
  const cat = res.data;

  // Pick a subset of questions and prepare them
  const clues = _.sampleSize(cat.clues, NUM_QUESTIONS_PER_CAT).map((clue) => ({
    question: clue.question,
    answer: clue.answer,
    showing: null, // State: null = hidden, question = showing question, answer = showing answer
  }));
  //push data into categories
  categories.push({ title: cat.title, clues });
  //use this to check if it works correctly
  console.log("clues", clues);
  console.log("categories", categories);
  return { title: cat.title, clues };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  // clear what is previously there/existing content
  $("thead").empty;
  $("tbody").empty;

  //   bld table header
  let $tr = $("<tr>");
  for (let category of categories) {
    $tr.append(`<th>${category.title}</th>`);
  }
  $("thead").append($tr);

  //   build table body;
  //   for (let rowIdx = 0)
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  const category = await getCategory(4);
  console.log(category);
}

startButton.addEventListener("click", setupAndStart);
//impliment start & then add event listener
/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
