let index = 0;
let prompt = 0;

const numbers = ["1", "2", "3", "4", "5", "6", "7"]
const emotion = ["1", "2", "3", "4", "5"]
const studyday_num = ["1", "2", "3", "4", "5", "6", "7"]
const next = ["next"]

const done = ["done"]

// ordered questions
questions = [
            ["Excellent! Please type in your 4-digit random ID (i.e., 1111)."], //0 random id
            // pre-intervention rating: only assess positive and negative affect, stress
            ["How happy/content/joyful do you feel right now? Left (not at all) to Right (very)"], //1 positive affect
            ["How sad/angry/afraid do you feel right now? Left (not at all) to Right (very)"], //2 negative affect
            ["How would you rate your level of stress right now? 1 (not stressed) to 7 (extremely stressed)"], //3 stress
            // domain identification
            ["For the next few moments, join me on a mindful journey. I'm here to support your well-being with personalized mindfulness practices tailored to your interests.\n\nTo begin, please type in the primary domain you would like to focus on today:\n- Happiness: feeling good and positive.\n- Life Satisfaction: being content with your life.\n- Physical Health: how your body feels and functions.\n- Mental Health: how you feel emotionally and mentally.\n- Meaning and Purpose of Life: finding meaning and direction in life. \n- Character and Virtue: personal qualities and values.\n- Close Social Relationships: your relationships with family and friends.\n- Financial and Material Stability: how secure you are financially.\n- Spirituality: personal beliefs and connection to something greater.\n- Education: learning and gaining knowledge.\n- Employment: your job and how you feel about it.\n- Recreation: activities you enjoy in your free time.\n"], //4
            ["What specific aspects or personal experiences have influenced your decision to focus on improving this particular area? Please share any thoughts or insights that have guided your choice.\n"],//5

            // post-intervention rating: pos & neg, stress, disidentification, nonreactivity, reappraisal, satisfaction, autonomy, relatedness, competence, meaningfulness, belonging
            [""], //6 
            [""], //7
            ["How happy/content/joyful do you feel right now? Left (not at all) to Right (very)"], //8 positive affect
            ["How sad/angry/afraid do you feel right now? Left (not at all) to Right (very)"], //9 negative affect
            ["How would you rate your level of stress right now? 1 (not stressed) to 7 (extremely stressed)"], //10 stress
            ["How much did you feel that your sense of self is separate from your thoughts and emotions? 1 (not at all) to 7 (a lot)"], //11 disidentification
            ["In your experience today, how well did you think you can observe unpleasant thoughts and feelings without immediately reacting to them? 1 (not at all) to 7 (very well)"], //12 nonreactivity
            ["When faced with challenging thoughts or emotions, how much effort did you put into considering positive consequences from your experiences today? 1 (not at all) to 7 (a lot)"], //13 reappraisal
            ["How satisfied or content did your life feel today? Left (not satisfied) to Right (extremely satisfied)"], //14 satisfied            
            ["How much did you feel your actions express your true self? 1 (not at all) to 7 (very much)"], //15 autonomy
            ["To what extent did you feel close and connected with other people who are important to you? 1 (not at all) to 7 (very much)"], // 16 relatedness
            ["How much did you feel you could complete tasks and get things done successfully today? 1 (not at all) to 7 (very much)"], // 17 competence
            ["How proud did you feel to belong to your school? 1 (not at all) to 7 (a lot)"], // 18 belonging
            ["How meaningful were the activities you participated in today? 1 (not at all) to 7 (very much)"] // 19 meaningfulness          
        ]

farewell_prompts = 
[
    ["Thank you for chatting with me today and sharing your thoughts and experiences. Wishing you a fantastic day! Until next time, take care and farewell~"],
    ["Thank you for sharing your thoughts and experiences with me. May your day be filled with joy and positivity! Looking forward to our next encounter."],
    ["Thank you for sharing your thoughts and experiences with me. Have a fantastic day ahead! Until we meet again, stay well."],
    ["It has been a pleasure talking with you today. Hope your day is as amazing as you are! Until next time, stay awesome."],
    ["It has been a pleasure talking with you today. Here's to a great day ahead! Until our next chat, be well and take care."],
    ["Thank you for chatting with me today. May your day be filled with happiness and success! Until our next interaction, take care and stay positive."],
    ["Thank you for chatting with me today. Wishing you a day filled with laughter and fulfillment! Until we meet again, have a fantastic time."],
]