(firebase.auth)
// Initialize ChatGPT API
// replace with your openai api
const apiKey = 'xxx'; 
const apiUrl = 'https://api.openai.com/v1/chat/completions';

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");

  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.key === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault(); // Prevent the default behavior of the key
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

// generate random numbers
function randomXToY(minVal,maxVal)
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}
var randomNumber = randomXToY(10000, 99999);
var randomNumber1 = randomXToY(10000, 99999);

// generate random letters
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}

var randomLetters = makeid(5)
var randomLetters1 = makeid(5)

// Concatenate the values together
const profileId = randomNumber + randomLetters + randomNumber1 + randomLetters1;

let conversation = [];
let user_input = [];
let user_reason = [];

//domain bot
const persona = {
  "prompt": "The mindfulness instructor has successfully guided individuals in cultivating mindfulness. The instructor is ready to provide one personalized mindfulness practice based on users' specific domain and reasons they wish to improve. The instructor won't mention themselves as an AI language model or doesn't have personal experience.",
  "background": "The mindfulness instructor has years of experience practicing and teaching mindfulness meditation. They have a deep understanding of the benefits of mindfulness and are passionate about sharing their knowledge with others."
};
//stress openended
const persona1 = {
  prompt: "The following is a conversation with an empathetic instructor. If the user shares positive thoughts regarding the provided exercise, the instructor should feel happy for them and offer motivating words, encouraging them to practice mindfulness in their free time. If the user's response is negative towards the exercise, the instructor should incorporate the user's feedback and suggest an alternative exercise tailored to the user's circumstances.",

//   "start_sequence" : "\nCHATBOT:",
//   "restart_sequence" : "\nUSER:"
}; 

// Function to call the OpenAI API
// domain bot auto-generated response
async function generateResponse(prompt, userDomain, userReason, userReflection) {
  const promptWithPersona = `${persona1.prompt}\n${prompt}`;
  const history = conversation.map(([input, response, domain, reason, reflection]) => 
    `${input}\n${response}\nDomain: ${domain}\nReason: ${reason}\nReflection: ${reflection}`).join('\n');
  const promptWithHistory = `${history}\n${promptWithPersona}`;
  const reflection = userReflection;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0301',
      messages: [
        { role: 'system', content: promptWithHistory },
        { role: 'user', content: reflection }
      ],
    }),
  });

  const data = await response.json();
  if (data.choices && data.choices.length > 0) {
    const story = data.choices[0].message.content; 
    const sentences = story.trim().split('. ');

    sentences.forEach((sentence, index) => {
      setTimeout(() => {
        let formattedSentence = (index === sentences.length - 1) ? sentence : sentence + '.';
        displayChatbotResponse(prompt, formattedSentence); // use prompt instead of input
      }, index * 2000); 
    });

    const totalDelay = sentences.length * 2000; 
    setTimeout(() => {
      const transitionMessage = "***Feel free to ask me further questions; when you're ready to proceed to the next section of the training, type 'next'.***";
      displayChatbotResponse(prompt, transitionMessage);
    }, totalDelay);
  
    conversation.push([userReflection, story]);
    return story;
  } else {
    // Return a default message or an error message to the user
    displayChatbotResponse(input, 'An error occurred while generating the response. Please try again.');
  }
}  

async function generateResponse1(prompt, userDomain, userReason) {
  const promptWithPersona = `${persona.prompt}\n${prompt}`;
  const history = conversation.map(([input, response, domain, reason]) =>
    `${input}\n${response}\nDomain: ${domain}\nReason: ${reason}`
  ).join('\n');

  const promptWithHistory = `${history}\n${promptWithPersona}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0301',
      messages: [
        { role: 'system', content: `You chose to focus on the ${userDomain} domain because ${userReason}. Provide one specific personalized mindfulness practice recommendation based on your situation.` },
        { role: 'user', content: promptWithHistory }
      ],
    }),
  });

  const data = await response.json();
  if (data.choices && data.choices.length > 0) {
    const story = data.choices[0].message.content;
    const sentences = story.trim().split('. ');

    const filteredAndFormattedSentences = sentences.reduce((acc, sentence) => {
      if (!/^\d+\.\s/.test(sentence)) {
        const formattedSentence = sentence.endsWith('.') ? sentence : sentence + '.';
        acc.push(formattedSentence);
      }
      return acc;
    }, []);

    filteredAndFormattedSentences.forEach((sentence, index) => {
      setTimeout(() => {
        displayChatbotResponse(prompt, sentence);
      }, index * 2000);
    });


    const totalDelay = filteredAndFormattedSentences.length * 2000;
    setTimeout(() => {
      const transitionMessage = "\n\n\n***Please read the instructions above and practice on your own for several minutes.***\n\n***When you're ready, I'd love to hear a brief reflection from you about the exercise we did.***";
      displayChatbotResponse(prompt, transitionMessage);
    }, totalDelay);

    conversation.push([userReason, story]);
    return story;
  } else {
    // Return a default message or an error message to the user
    displayChatbotResponse(input, 'An error occurred while generating the response. Please try again.');
  }
}


///Date///
// Get the current date in a localized format (e.g., "dd/mm/yyyy" for "fr-CA" locale)
const startDate = new Date().toLocaleDateString('fr-CA'); //2023-07-20
// Get the current time (hour:minute:seconds) in a localized format (e.g., "hh:mm:ss" for "fr-CA" locale)
const startTime = new Date();

localStorage.setItem("startTime", startTime);
localStorage.setItem("startDate", startDate);

/// main function
function output(input) {
  let text = input.trim();
  let product;
  if (index == 0 && text.length > 0 && studyday_num.includes(text)) {
      localStorage.setItem("studyday", input)
      product = questions[index];
      addChat(input, product);
      index += 1;
  }  else if (index == 1) {
    if (text.length == 4 && /^\d{4}$/.test(text)) {
        localStorage.setItem("randomid", input);
        product = "Let's begin with a few quick check-in questions. Please select the emoji that best represents your feeling.\n\n" + questions[index];
        PosMood(input, product);
        index += 1;
    } else {
        // Prompt the user to enter the correct format.
        product = "Please enter a valid 4-digit random ID.";
        addChat(input, product);  // Assuming addChat can be used to display messages to the user.
    }
  } else if (index == 2 && text.length > 0 && emotion.includes(text)) {
      localStorage.setItem("positive_pre", input)
      product = questions[index]; //ask neg
      neg(input, product);
      index += 1;
  } else if (index == 3 && text.length > 0 && emotion.includes(text)) {
      localStorage.setItem("negative_pre", input)
      product = questions[index]; //ask stress
      stress(input, product);
      index += 1;
  // domain identification
  } else if (index == 4 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("stress_pre", input);     
      product = questions[index]; // ask domain
      addChat(input, product);
      index += 1;
   } else if (index == 5 && text.length > 0) {     
      localStorage.setItem("domain", input);  
      product = questions[index]; // ask reason
      addChat(input, product);
      conversation.push([input, product]);
      user_input.push(text);
      index += 1;
  } else if (index == 6 && text.length > 0) {     
      const userDomain = user_input[0]; // Extract user's selected domain from the first input
      const userReason = text; // User's reason is the second input
      user_reason.push(text);
      displayUserInput(input);
      localStorage.setItem("reason", input);  
      generateResponse1(user_input, userDomain, userReason).then(response => {
        if (!response) {
          console.error('Response is undefined.');
      }
      });
      index += 1;
  } else if (index == 7 && text.length > 0) {     
      // If the user types 'next', then increment index and skip the response generation
      if (input.toLowerCase() === "next" || input.toLowerCase() === "next ") {     
        index++;     
        product = "Thank you for opening up to me! Let's now discuss how you're feeling at this moment.\n\n" + questions[index]; //ask positive affect
        PosMood(input, product);
        index++;
        return; // Return to prevent the execution of the following lines for this case
      }
    
      const userDomain = user_input[0]; // Extract user's selected domain
      const userReason = user_reason[0]; // Extract user's reason
      const userReflection = text;

      displayUserInput(input);
      localStorage.setItem("reflection", input);  
      generateResponse(user_input, userDomain, userReason, userReflection).then(response => {
        if (!response) {
          console.error('Response is undefined.');
        }
      });
// post intervention
  } else if (index == 8 && text.length > 0) {
      //localStorage.setItem("user_thoughts", input);
      product = "Thank you for opening up to me! Let's now discuss how you're feeling at this moment.\n\n" + questions[index]; //ask positive affect
      PosMood(input, product);
      index += 1;
  } else if (index == 9 && text.length > 0 && emotion.includes(text)) {
      localStorage.setItem("positive_post", input);
      product = questions[index]; //ask negative affect
      neg(input, product);
      index += 1;
  } else if (index == 10 && text.length > 0 && emotion.includes(text)) {
      localStorage.setItem("negative_post", input);
      product = questions[index]; //ask stress
      stress(input, product);
      index += 1;
  } else if (index == 11 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("stress_post", input);
      product = questions[index]; //ask disidentification
      aware(input, product);
      index += 1;  
  } else if (index == 12 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("disidentification", input);
      product = questions[index]; //ask nonreactivity
      react(input, product);
      index += 1;      
  } else if (index == 13 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("nonreactivity", input);     
      product = questions[index]; // ask reappraisal
      VideoRating(input, product);
      index += 1;
  } else if (index == 14 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("reappraisal", input);     
      product = questions[index]; // ask life satisfaction
      LifeSatisfaction(input, product);
      index += 1;
  } else if (index == 15 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("satisfied", input);     
      product = questions[index]; // ask autonomy
      aware(input, product);
      index += 1;
  } else if (index == 16 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("autonomy", input);     
      product = questions[index]; // ask relatedness
      react(input, product);
      index += 1;
  } else if (index == 17 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("relatedness", input);     
      product = questions[index]; // ask competence
      VideoRating(input, product);
      index += 1;
  } else if (index == 18 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("competence", input);     
      product = questions[index]; // ask belonging
      belong(input, product);
      index += 1;
  } else if (index == 19 && text.length > 0 && numbers.includes(text)) {
      localStorage.setItem("belonging", input);     
      product = questions[index]; // ask meaning
      react(input, product);
      index += 1;
  } else if (index == 20 && text.length > 0) {
      localStorage.setItem("meaning", input);  
      product = farewell_prompts[Math.floor(Math.random() * farewell_prompts.length)][0];

      // Get the finish time when the user completes the survey
      const endTime = new Date();
      localStorage.setItem("endTime", endTime);  
      // calculte time spent
      const startTime = new Date(localStorage.getItem("startTime"));
      const durationInMilliseconds = endTime - startTime;
      // Convert the duration to hours, minutes, and seconds
      const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = durationInSeconds % 60;
      localStorage.setItem("timeTakenSec", seconds); 
      localStorage.setItem("timeTakenMin", minutes); 

      addChat(input, product);
      //retrieve saved variables
      // pre
      let randomid = localStorage.getItem("randomid");
      let studyday = localStorage.getItem("studyday");
      let positive_pre = Number(localStorage.getItem("positive_pre"));
      let negative_pre = Number(localStorage.getItem("negative_pre"));
      let stress_pre = Number(localStorage.getItem("stress_pre"));
      // intervention
      let domain = localStorage.getItem("domain");
      let reason = localStorage.getItem("reason");
      let user_reflection = localStorage.getItem("reflection");
      // post
      let positive_post = Number(localStorage.getItem("positive_post"));
      let negative_post = Number(localStorage.getItem("negative_post"));
      let stress_post = Number(localStorage.getItem("stress_post"));
      let disidentification = Number(localStorage.getItem("disidentification"));
      let nonreactivity = Number(localStorage.getItem("nonreactivity"));
      let reappraisal = Number(localStorage.getItem("reappraisal"));
      let satisfied = Number(localStorage.getItem("satisfied"));
      let autonomy = Number(localStorage.getItem("autonomy"));
      let relatedness = Number(localStorage.getItem("relatedness"));
      let competence = Number(localStorage.getItem("competence"));
      let belonging = Number(localStorage.getItem("belonging"));
      let meaning = Number(localStorage.getItem("meaning")); 
      // date and time
      let startDate = localStorage.getItem("startDate");
      let startTime1 = localStorage.getItem("startTime");
      let endTimeX = localStorage.getItem("endTime");
      let timeSpentSec = localStorage.getItem("timeTakenSec");
      let timeSpentMin = localStorage.getItem("timeTakenMin");

      // Save the conversation to Firebase Realtime Database
      var profileRef = firebase.database().ref("Profile/" + profileId);
      profileRef.set({
        RandomID: randomid,
        StudyDay: studyday,
        Positive_pre: positive_pre,
        Negative_pre: negative_pre,
        Stress_pre: stress_pre,
        Domain: domain,
        Reason: reason,
        User_reflection: user_reflection,
        conversation: conversation,
        Positive_post: positive_post,
        Negative_post: negative_post,
        Stress_post: stress_post,
        Disidentification: disidentification,
        Nonreactivity: nonreactivity,
        Reappraisal: reappraisal,
        Satisfied: satisfied,
        Autonomy: autonomy,
        Relatedness: relatedness,
        Competence: competence,
        Belonging: belonging,
        Meaning: meaning,
        StartDate: startDate,
        StartTime: startTime1,
        EndTime: endTimeX,
        SurveySeconds: timeSpentSec,
        SurveyMinutes: timeSpentMin    
      });   
      index += 1;
  }  else if (index == 21 && text.length >0) {  
    product = questions[index];
    product = farewell_prompts[Math.floor(Math.random() * farewell_prompts.length)][0] + "\n\nYou can proceed to the next section on Qualtrics by clicking the blue 'Next' button located in the right corner.";
    addChat(input, product);
  }
}

// **************************Chat functions**************************
// Initialize botTyping variable
// Global variable to store bot response div
let typingCount = 0;

function displayUserInput(input) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  // Create new bot response
  // let botDiv = document.createElement("div");
  // let botImg = document.createElement("img");
  // let botText = document.createElement("span");
  // typingCount++;
  // botDiv.id = "bot-" + typingCount;
  // botImg.src = "bot-mini.png";
  // botImg.className = "avatar";
  // botDiv.className = "bot response";
  // botText.innerText = "Typing...";
  // botDiv.appendChild(botText);
  // botDiv.appendChild(botImg);
  // messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
}


// function displayChatbotResponse(input, product) {
//   const messagesContainer = document.getElementById("messages");

//   // Find the most recent bot typing indicator
//   let botDiv = document.getElementById("bot-" + typingCount);
//   if (botDiv) {
//     let botText = botDiv.getElementsByTagName("span")[0];
//     let botImg = botDiv.querySelector(".avatar"); // Select the avatar using class name
//     botText.innerText = "Typing...";
//     // Keep messages at most recent
//     messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

//     // Fake delay to seem "real"
//     setTimeout(() => {
//       botText.innerText = `${product}`;
//     }, 2000);
//   } else {
//     // Create new bot response
//     botDiv = document.createElement("div");
//     let botImg = document.createElement("img");
//     let botText = document.createElement("span");
//     typingCount++;
//     botDiv.id = "bot-" + typingCount;
//     botImg.src = "bot-mini.png";
//     botImg.className = "avatar";
//     botDiv.className = "bot response";
//     botText.innerText = "Typing...";
//     botDiv.appendChild(botText);
//     botDiv.appendChild(botImg);
//     messagesContainer.appendChild(botDiv);
//     // Keep messages at most recent
//     messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

//     // Fake delay to seem "real"
//     setTimeout(() => {
//       botText.innerText = `${product}`;
//     }, 2000);
//   }

//   // Keep messages at most recent
//   messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

//   // Scroll to most recent message after a delay
//   setTimeout(() => {
//     messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight;
//   }, 3000);
//   setTimeout(() => {
//     messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight;
//   }, 5000);
// }

let messageIndex = 0; // Keeps track of the index of messages

function displayChatbotResponse(input, product) {
  const messagesContainer = document.getElementById("messages");

  // Split the product into sentences
  const sentences = product.trim().split('. ');

  // Create a new bot response
  const botDiv = document.createElement("div");
  const botImg = document.createElement("img");
  const botText = document.createElement("span");

  // Update the bot's message index
  messageIndex++;

  botDiv.id = "bot-" + messageIndex;
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";

  // Initially set the message to 'Typing...'
  botText.innerText = 'Typing...';
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);

  // Adjust scroll to show the 'Typing...' message
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Replace 'Typing...' with the first sentence after a short delay
  setTimeout(() => {
      botText.innerText = sentences[0];
      messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  }, 500);

  // Display the rest of the sentences one by one
  sentences.slice(1).forEach((sentence, index) => {
      setTimeout(() => {
          const newBotText = document.createElement("span");
          newBotText.innerText = sentence;
          botDiv.appendChild(newBotText);

          // Adjust scroll to show the new sentence
          messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
      }, (index + 2) * 3000); // Adjust the delay as needed, index + 2 to account for the initial delay and first sentence
  });
}

// **************************Chat functions**************************
function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);

  // Keep messages at most recent
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000)

  // Keep messages at most recent
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight}, 1000)
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight}, 3000)
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight}, 5000)
}

//**************Ratings*****************
// Function for the stress question
function stress(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response"; 
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight
  
  const createStressImg = (src, rating) => {
    const stressImg = document.createElement("img");
    stressImg.src = src;
    stressImg.className = "scale1";
    stressImg.id = "s" + rating;
    stressImg.addEventListener("click", function () {
      let input = rating.toString();
      output(input);
      //document.getElementById("input").focus();
    });
    return stressImg;
  };

  if (botDiv) {
    botText = botDiv.getElementsByTagName("span")[0];
    let botImg = botDiv.querySelector(".avatar");
    // Keep messages at most recent
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
  } else {
    const botDiv = document.createElement("div");
    const botImg = document.createElement("img");
    botText = document.createElement("span");
    typingCount++;
    botDiv.id = "bot-" + typingCount;
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = `${product}`;
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }

  setTimeout(() => {
    botText.innerText = `${product}`;
    //removeEmotionImgs(messagesContainer); // Remove existing emotion images
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      messagesContainer.appendChild(createStressImg("n1.jpg", 1));
      messagesContainer.appendChild(createStressImg("n2.jpg", 2));
      messagesContainer.appendChild(createStressImg("n3.jpg", 3));
      messagesContainer.appendChild(createStressImg("n4.jpg", 4));
      messagesContainer.appendChild(createStressImg("n5.jpg", 5));
      messagesContainer.appendChild(createStressImg("n6.jpg", 6));
      messagesContainer.appendChild(createStressImg("n7.jpg", 7));  
  }, 2500);
  
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 2000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 3000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 5000);
}

// Negative affect
function neg(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response"; 
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight
  
  const createNegImg = (src, rating) => {
    const negImg = document.createElement("img");
    negImg.src = src;
    negImg.className = "scale";
    negImg.id = "n" + rating;
    negImg.addEventListener("click", function () {
      let input = rating.toString();
      output(input);
      //document.getElementById("input").focus();
    });
    return negImg;
  };

  if (botDiv) {
    botText = botDiv.getElementsByTagName("span")[0];
    let botImg = botDiv.querySelector(".avatar");
    // Keep messages at most recent
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
  } else {
    const botDiv = document.createElement("div");
    const botImg = document.createElement("img");
    botText = document.createElement("span");
    typingCount++;
    botDiv.id = "bot-" + typingCount;
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = `${product}`;
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }

  setTimeout(() => {
    botText.innerText = `${product}`;
    //removeEmotionImgs(messagesContainer); // Remove existing emotion images
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      messagesContainer.appendChild(createNegImg("neg3.png", 1));
      messagesContainer.appendChild(createNegImg("neg4.png", 2));
      messagesContainer.appendChild(createNegImg("neg5.png", 3));
      messagesContainer.appendChild(createNegImg("neg6.png", 4));
      messagesContainer.appendChild(createNegImg("neg7.png", 5));
  }, 2500);
  
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 2000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 3000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 5000);
}

// Disidentification rating
function aware(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response"; 
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight
  
  const createAwareImg = (src, rating) => {
    const awareImg = document.createElement("img");
    awareImg.src = src;
    awareImg.className = "scale1";
    awareImg.id = "a" + rating;
    awareImg.addEventListener("click", function () {
      let input = rating.toString();
      output(input);
      //document.getElementById("input").focus();
    });
    return awareImg;
  };

  if (botDiv) {
    botText = botDiv.getElementsByTagName("span")[0];
    let botImg = botDiv.querySelector(".avatar");
    // Keep messages at most recent
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
  } else {
    const botDiv = document.createElement("div");
    const botImg = document.createElement("img");
    botText = document.createElement("span");
    typingCount++;
    botDiv.id = "bot-" + typingCount;
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = `${product}`;
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }

  setTimeout(() => {
    botText.innerText = `${product}`;
    //removeEmotionImgs(messagesContainer); // Remove existing emotion images
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      messagesContainer.appendChild(createAwareImg("a1.jpg", 1));
      messagesContainer.appendChild(createAwareImg("a2.jpg", 2));
      messagesContainer.appendChild(createAwareImg("a3.jpg", 3));
      messagesContainer.appendChild(createAwareImg("a4.jpg", 4));
      messagesContainer.appendChild(createAwareImg("a5.jpg", 5));
      messagesContainer.appendChild(createAwareImg("a6.jpg", 6));
      messagesContainer.appendChild(createAwareImg("a7.jpg", 7));  
  }, 2500);
  
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 2000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 3000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 5000);
}

// Reactivity rating
function react(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response"; 
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight
  
  const createReactImg = (src, rating) => {
    const reactImg = document.createElement("img");
    reactImg.src = src;
    reactImg.className = "scale1";
    reactImg.id = "r" + rating;
    reactImg.addEventListener("click", function () {
      let input = rating.toString();
      output(input);
      //document.getElementById("input").focus();
    });
    return reactImg;
  };

  if (botDiv) {
    botText = botDiv.getElementsByTagName("span")[0];
    let botImg = botDiv.querySelector(".avatar");
    // Keep messages at most recent
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
  } else {
    const botDiv = document.createElement("div");
    const botImg = document.createElement("img");
    botText = document.createElement("span");
    typingCount++;
    botDiv.id = "bot-" + typingCount;
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = `${product}`;
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }

  setTimeout(() => {
    botText.innerText = `${product}`;
    //removeEmotionImgs(messagesContainer); // Remove existing emotion images
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      messagesContainer.appendChild(createReactImg("r1.jpg", 1));
      messagesContainer.appendChild(createReactImg("r2.jpg", 2));
      messagesContainer.appendChild(createReactImg("r3.jpg", 3));
      messagesContainer.appendChild(createReactImg("r4.jpg", 4));
      messagesContainer.appendChild(createReactImg("r5.jpg", 5));
      messagesContainer.appendChild(createReactImg("r6.jpg", 6));
      messagesContainer.appendChild(createReactImg("r7.jpg", 7));  
  }, 2500);
  
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 2000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 3000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 5000);
}

// Belonging rating
function belong(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response"; 
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight
  
  const createBelongImg = (src, rating) => {
    const belongImg = document.createElement("img");
    belongImg.src = src;
    belongImg.className = "scale1";
    belongImg.id = "a" + rating;
    belongImg.addEventListener("click", function () {
      let input = rating.toString();
      output(input);
      //document.getElementById("input").focus();
    });
    return belongImg;
  };

  if (botDiv) {
    botText = botDiv.getElementsByTagName("span")[0];
    let botImg = botDiv.querySelector(".avatar");
    // Keep messages at most recent
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
  } else {
    const botDiv = document.createElement("div");
    const botImg = document.createElement("img");
    botText = document.createElement("span");
    typingCount++;
    botDiv.id = "bot-" + typingCount;
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = `${product}`;
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }

  setTimeout(() => {
    botText.innerText = `${product}`;
    //removeEmotionImgs(messagesContainer); // Remove existing emotion images
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      messagesContainer.appendChild(createBelongImg("b1.jpg", 1));
      messagesContainer.appendChild(createBelongImg("b2.jpg", 2));
      messagesContainer.appendChild(createBelongImg("b3.jpg", 3));
      messagesContainer.appendChild(createBelongImg("b4.jpg", 4));
      messagesContainer.appendChild(createBelongImg("b5.jpg", 5));
      messagesContainer.appendChild(createBelongImg("b6.jpg", 6));
      messagesContainer.appendChild(createBelongImg("b7.jpg", 7));  
  }, 2500);
  
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 2000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 3000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 5000);
}

// Video rating
function VideoRating(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response"; 
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight
  
  const createVideoRatingImg = (src, rating) => {
    const videoratingImg = document.createElement("img");
    videoratingImg.src = src;
    videoratingImg.className = "scale1";
    videoratingImg.id = "a" + rating;
    videoratingImg.addEventListener("click", function () {
      let input = rating.toString();
      output(input);
      //document.getElementById("input").focus();
    });
    return videoratingImg;
  };

  if (botDiv) {
    botText = botDiv.getElementsByTagName("span")[0];
    let botImg = botDiv.querySelector(".avatar");
    // Keep messages at most recent
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
  } else {
    const botDiv = document.createElement("div");
    const botImg = document.createElement("img");
    botText = document.createElement("span");
    typingCount++;
    botDiv.id = "bot-" + typingCount;
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = `${product}`;
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }

  setTimeout(() => {
    botText.innerText = `${product}`;
    //removeEmotionImgs(messagesContainer); // Remove existing emotion images
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      messagesContainer.appendChild(createVideoRatingImg("o1.jpg", 1));
      messagesContainer.appendChild(createVideoRatingImg("o2.jpg", 2));
      messagesContainer.appendChild(createVideoRatingImg("o3.jpg", 3));
      messagesContainer.appendChild(createVideoRatingImg("o4.jpg", 4));
      messagesContainer.appendChild(createVideoRatingImg("o5.jpg", 5));
      messagesContainer.appendChild(createVideoRatingImg("o6.jpg", 6));
      messagesContainer.appendChild(createVideoRatingImg("o7.jpg", 7));  
  }, 2500);
  
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 2000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 3000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 5000);
}

// Life Satisfaction rating
function LifeSatisfaction(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight

  const createEmotionImg = (src, rating) => {
    const emotionImg = document.createElement("img");
    emotionImg.src = src;
    emotionImg.className = "scale";
    emotionImg.id = "e" + rating;
    emotionImg.addEventListener("click", function () {
      output(rating.toString());
      //document.getElementById("input").focus();
    });
    return emotionImg;
  };

  if (botDiv) {
    botText = botDiv.getElementsByTagName("span")[0];
    let botImg = botDiv.querySelector(".avatar");
    //botText.innerText = "Typing...";
    // Keep messages at most recent
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
  } else {
    const botDiv = document.createElement("div");
    const botImg = document.createElement("img");
    botText = document.createElement("span");
    typingCount++;
    botDiv.id = "bot-" + typingCount;
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = `${product}`;
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }

  setTimeout(() => {
    botText.innerText = `${product}`;
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      messagesContainer.appendChild(createEmotionImg("1.png", 1));
      messagesContainer.appendChild(createEmotionImg("2.png", 2));
      messagesContainer.appendChild(createEmotionImg("3.png", 3));
      messagesContainer.appendChild(createEmotionImg("4.png", 4));
      messagesContainer.appendChild(createEmotionImg("5.png", 5));
      messagesContainer.appendChild(createEmotionImg("6.png", 6));
      messagesContainer.appendChild(createEmotionImg("7.png", 7));
  }, 2500);

  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 2000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 3000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 5000);
}

// Positive Mood rating
function PosMood(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.offsetHeight

  const createEmotionImg = (src, rating) => {
    const emotionImg = document.createElement("img");
    emotionImg.src = src;
    emotionImg.className = "scale";
    emotionImg.id = "e" + rating;
    emotionImg.addEventListener("click", function () {
      output(rating.toString());
      //document.getElementById("input").focus();
    });
    return emotionImg;
  };

  if (botDiv) {
    botText = botDiv.getElementsByTagName("span")[0];
    let botImg = botDiv.querySelector(".avatar");
    //botText.innerText = "Typing...";
    // Keep messages at most recent
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.clientHeight;

    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000);
  } else {
    const botDiv = document.createElement("div");
    const botImg = document.createElement("img");
    botText = document.createElement("span");
    typingCount++;
    botDiv.id = "bot-" + typingCount;
    botImg.src = "bot-mini.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = `${product}`;
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  }

  setTimeout(() => {
    botText.innerText = `${product}`;
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
      messagesContainer.appendChild(createEmotionImg("3.png", 1));
      messagesContainer.appendChild(createEmotionImg("4.png", 2));
      messagesContainer.appendChild(createEmotionImg("5.png", 3));
      messagesContainer.appendChild(createEmotionImg("6.png", 4));
      messagesContainer.appendChild(createEmotionImg("7.png", 5));
  }, 2500);

  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 2000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 3000);
  setTimeout(() => {
    messagesContainer.scrollTop =
      messagesContainer.scrollHeight - messagesContainer.offsetHeight;
  }, 5000);
}
