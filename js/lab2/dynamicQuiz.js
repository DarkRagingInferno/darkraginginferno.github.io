
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

    window.onload = () => {
        displayQuestions(quizArr);
    }

    function displayQuestions(arr) 
    {
        let array = arr;
        let questionCounter = 0;
        for (question of array)
        {
            let questionOutput = '';
            var answers = '';
            ++questionCounter;

            let questDiv = document.createElement('div')
            questDiv.setAttribute('class', 'questions');
            
            questionOutput += '<p>' + question.question + '<p><br>';
            for (let i = 0; i < question.answers.length; i++)
            {
                let ans = question.answers[i]
                console.log(ans)

                answers += `<input type="radio" name="question${questionCounter}"id="q${questionCounter}a${i}" value="${ans}">
                <label for="q${questionCounter}a${i}" value="${ans}"><span>${ans}</span></label><br>`;
            }

            questDiv.innerHTML = questionOutput + answers;
            document.getElementById('questionsContainer').appendChild(questDiv);
        }
    }