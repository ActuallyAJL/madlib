console.log("You look marvelous!");

//story
// It had been a hard, {adjective} day on the {silly word} trail. The cowboys drove a herd of {plural noun} across the dry plains, kicking up {noun} along the way as they looked for somewhere to bed down.

const mainElement = document.querySelector("main");

mainElement.addEventListener("click", (event) => {
	event.preventDefault();
  if (event.target.id.startsWith("tellStory")) {
    const madlib = {
      adjective: document.querySelector('#adj').value,
      sillyword: document.querySelector('#silly').value,
      pluralnoun: document.querySelector('#plNoun').value,
      noun: document.querySelector('#noun').value,
    };
    //set/save to sessionStorage
	setDataToStorage(madlib);
    renderStory();
  } else if (event.target.id.startsWith("startOver")) {
	  renderInputs();
  }
});

const getDataFromStorage = (dataKey) => {
  //use JSON.parse()
  return JSON.parse(sessionStorage.getItem(dataKey));
};

const setDataToStorage = (dataObj) => {
  //use JSON.stringify()
  sessionStorage.setItem('myMadlib' , JSON.stringify(dataObj));
};

const clearStorage = (dataKey) => {
  sessionStorage.removeItem(dataKey);
};

const renderInputs = () => {
  clearStorage("madlib");
  // show inputs fields
  let inputHTML = `
	<header><h1>Alex's Madlib Generator</h1></header>
      <form id = 'inField''>
        <input placeholder='Adjective' type="text" id="adj" name="adj" /><br /><br />
        <input placeholder='Silly Word'type="text" id="silly" name="silly" /><br /><br />
        <input placeholder='Plural Noun' type="text" id="plNoun" name="plNoun" /><br /><br />
        <input placeholder='Noun'type="text" id="noun" name="noun" /><br /><br />
        <button id="tellStory">Tell Me A Story</button>
      </form>

      <div id="madlib-body"></div>
	`;
  mainElement.innerHTML = inputHTML;
  //show 'Tell Story' button
};

const renderStory = () => {
  //get from sessionStorage
  const userSelection = getDataFromStorage('myMadlib');
  //show the story
  const story = `<h3>It had been a hard, ${userSelection.adjective} day on the ${userSelection.sillyword} trail. The cowboys drove a herd of ${userSelection.pluralnoun} across the dry plains, kicking up ${userSelection.noun} along the way as they looked for somewhere to bed down.</h3>`;
  document.querySelector('#madlib-body').innerHTML = story;
  //show startOver button
  document.querySelector('#inField').innerHTML += `<button id="startOver">Start Over</button>`;
  //startOver will invoke renderInputs()
};

renderInputs();
