/**
 * This JS File dynamically generates multiple choice quiz questions loaded in from an Array of JSON's and displays it to the 
 * screen. It it takes in user input to decide how many questions with a max questions and a minimum of 1 question.
 * @author John Poku
 * @since 09.23.2020
 */
    var quizArr = [
        {
            "question": "1) How do you create a function in JavaScript?",
            "answers": [
                        "function:myFunction()",
                        "function myFunction()",
                        "def myFunction()",
                        "myFunction()"
                    ],
                "correct": "function myFunction()"
        },
        { 
            "question": "2) What is the correct way to write a JavaScript array?",
            "answers": [
                        "['red', 'green', 'blue'];", 
                        "'red', 'green', 'blue';", 
                        "(1:'red', 2:'green', 3:'blue');", 
                        "1 = ('red), 2 = ('green'), 3 = ('blue');" 
                    ],
            "correct": "['red', 'green', 'blue'];"
        
        },
        {
            "question": " How do you declare a JavaScript variable?",
            "answers": [
                        "variable meow = new variable();", 
                        "variable meow;", 
                        "v meow;", 
                        "var meow;" 
                    ],
            "correct": "var meow;"
        },
        {
            "question": "4) var a = 5 <br> funtion first() {<br> a = 6;<br>}",
            "answers": [
                        0,
                        5,
                        6,
                        "null"
                    ],
            "correct": "5"
        },
        {
            "question": "5) What is the correct syntax for referring to an external script called 'bork.js?'",
            "answers": [
                        "'&ltscript src='bork.js&gt'",
                        "'&ltscript href='bork.js&gt'",
                        "'&ltscript ref='bork.js&gt'",
                        "'&ltscript name='bork.js&gt'"
                    ],
            "correct": "'&ltscript src='bork.js&gt'"
        },
    ]

    /** 
     * This functions waits for the window and dom to finish loading and then begins to generate the quiz.
     */
    window.onload = () => {
        let numQuestions = userPrompt();
        displayQuestions(quizArr, numQuestions);
    }

    /**
     * This funciton prompts a user for an integer and returns that integer
     */
    function userPrompt() {
        var numberOfQuestions = prompt("Enter the number of questions you want Max: 5 and Min: 1");
        try {
            if(numberOfQuestions < 1 || numberOfQuestions > 5)
                throw Exception
            else return numberOfQuestions
        } catch (Exception) {
            userPrompt();
        }
    }

    /**
     * This function displays JavaScript questions up to the number requested with a max of 5 and min of 1
     * @param {Array} arr An array of JSON .
     * @param {Int} numQuestions The number of questions.
     */
    function displayQuestions(arr, numQuestions) 
    {
        let array = arr;
        let questionCounter = 0;
        for (question of array)
        {
            if(questionCounter == numQuestions) return;
            let questionOutput = '';
            var answers = '';
            ++questionCounter;

            let questDiv = document.createElement('div')
            questDiv.setAttribute('class', 'questions');
            
            questionOutput += '<p>' + question.question + '<p><br>';
            for (let i = 0; i < question.answers.length; i++)
            {
                let ans = question.answers[i]

                answers += `<input type="radio" name="question${questionCounter}"id="q${questionCounter}a${i}" value="${ans}">
                <label for="q${questionCounter}a${i}" value="${ans}"><span>${ans}</span></label><br>`;
            }

            questDiv.innerHTML = questionOutput + answers;
            document.getElementById('questionsContainer').appendChild(questDiv);
        }
    }