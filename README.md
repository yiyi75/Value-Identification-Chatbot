# Value Identification Chatbot

![Chatbot Logo](/public/robot.png)

The Value Identification Chatbot, known as "Chattake," is an interactive web-based chatbot designed to help users identify and assess domains that are important to their well-being. The chatbot provides individualized and customized mindfulness interventions based on the user's selected domain and personal assessment.

**Live Website:** [Value Identification Chatbot](https://domainchatbot-a4a28.web.app/)

## How It Works

The Chatbot is built using HTML, JavaScript, and Firebase for backend functionality. Here's an overview of its main features:

- **Wellness Check-In**: Users start a conversation with Chattake to check in with their mental and emotional wellbeing.

- **Domain Identification**: Users can identify specific domains in their life that are important to their well-being. For example, they can select domains related to relationships, stress, happiness, or other aspects.

- **Mindfulness Interventions**: Chattake offers individualized mindfulness interventions tailored to the user's selected domain and current emotional state.

- **Emotional Assessment**: The chatbot assesses the user's emotional state by asking questions related to positive affect, negative affect, stress, disidentification, nonreactivity, reappraisal, life satisfaction, autonomy, relatedness, competence, belonging, and meaningfulness.

- **Firebase Integration**: Firebase is used for real-time data storage and retrieval, ensuring that user interactions and assessments are securely managed.
  
## Getting Started

To run the Value Identification Chatbot locally, follow these steps:

1. Clone this GitHub repository to your local machine:

   ```shell
   git clone https://github.com/yiyi75/value-identification-chatbot.git

2. Open the HTML file (index.html) in your web browser.
3. Start a conversation with Chattake and begin the value identification process.

**Please Note**: To use the ChatGPT API, you need to initialize it with your own OpenAI API key. Replace the following lines in the index_domains.js with your API key:
   ```javascript
   // replace with your openai api
   const apiKey = 'xxx'; 
