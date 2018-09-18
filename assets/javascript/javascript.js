   //quiz questions
        var quizQuestions = [{
            question: "What was The Beatles first single?",
            ansA: "Help!",
            ansB: "Love Me Do",
            ansC: "Let It Be",
            ansD: "All You Need is Love",
            rightAns: "B) Love Me Do"
        },
        {
            question: "In what city were The Beatles formed?",
            ansA: "Manchester",
            ansB: "London",
            ansC: "Wales",
            ansD: "Liverpool",
            rightAns: "D) Liverpool"
        },
        {
            question: "Which Beatle's first name is really James?",
            ansA: "John",
            ansB: "Ringo",
            ansC: "Paul",
            ansD: "George",
            rightAns: "C) Paul"
        },
        {
            question: "In what year was the first Beatles album released?",
            ansA: "1963",
            ansB: "1961",
            ansC: "1964",
            ansD: "1966",
            rightAns: "A) 1963"
        },
        {
            question: "In what year was the last Beatles album  released?",
            ansA: "1971",
            ansB: "1967",
            ansC: "1973",
            ansD: "1970",
            rightAns: "D) 1970"
        },
        {
            question: "Which Beatles was not originally a member of the band?",
            ansA: "John",
            ansB: "Ringo",
            ansC: "Paul",
            ansD: "George",
            rightAns: "B) Ringo"
        },
        {
            question: "What was The Beatles' top selling album?",
            ansA: "A Hard Days Night",
            ansB: "Abbey Road",
            ansC: "Sgt. Pepper's Lonely Hearts Club Band",
            ansD: "Yellow Submarine",
            rightAns: "C) Sgt. Pepper's Lonely Hearts Club Band"
        },
        {
            question: "How many albums did The Beatles release?",
            ansA: "12",
            ansB: "5",
            ansC: "8",
            ansD: "17",
            rightAns: "A) 12"
        },
        {
            question: "Which two Beatles are still alive?",
            ansA: "Paul & George",
            ansB: "George & John",
            ansC: "Ringo & George",
            ansD: "Paul & Ringo",
            rightAns: "D) Paul & Ringo"
        },
        {
            question: "Which one of these are not a Beatle Movie?",
            ansA: "Hard Days Night",
            ansB: "Yellow Submarine",
            ansC: "Love Me Do",
            ansD: "Help!",
            rightAns: "C) Love Me Do"
        }
        ]

        //count variables
        var arrayCount = 0
        var qCount = 1
        var correctCount = 0
        var timeCount
        var remainingQues = quizQuestions.length
        
        //html variables
        var qNum = $("#qNum")
        var question = $("#question")
        var AText = $("#ansA")
        var BText = $("#ansB")
        var CText = $("#ansC")
        var DText = $("#ansD")
        var timeRem = $('#timeRem')
        var wrongText = $("#wrongText")

        //current Question variables
        var chosenAns = ''
        var curQues = quizQuestions[arrayCount].question
        var curA
        var curB
        var curC
        var curD
        var curRightAns
        var countdown

        //empty arrays for incorrect answers
        var wrongAnsQues = []
        var wrongAnsChoosen = []
        var wrongAnsRight = []

        //empty array to house previous questions
        var prevQues = []

        //call new question
        newQuestion()

        //function to pull new question
        function newQuestion() {
            //reset chosenAns to empty 
            chosenAns = ''


            //if there are no more questions, call noMoreQ function
            if (remainingQues === 0) {
                noMoreQ()
                return
            }
            
            //if this is the last question, change text of button
            if(remainingQues===1){
                $('#next').text('Submit Quiz')
            }
            chooseRanQ()

            //set Values for question array
            curQues = quizQuestions[thisQ].question
            curA = quizQuestions[thisQ].ansA
            curB = quizQuestions[thisQ].ansB
            curC = quizQuestions[thisQ].ansC
            curD = quizQuestions[thisQ].ansD
            curRightAns = quizQuestions[thisQ].rightAns

            //set displayed text
            qNum.text('Question #' + qCount)
            question.text(curQues)
            AText.text('A) ' + curA)
            BText.text('B) ' + curB)
            CText.text('C) ' + curC)
            DText.text('D) ' + curD)

            //set initial time to 10, display
            timeCount = 10

            //reset time display text
            timeRem.text(timeCount + ' seconds remaining')

            //remove warningRed class (gets triggered if remaining time is less than 3)
            timeRem.removeClass('warningRed')

            //call updateTime function every second
            countdown = setInterval(updateTime, 1000)
        }

        //when answer is clicked
        $('.ans').on('click', function () {

            //removes chosen class from any of the choices in the ans class (in case a previous selection was already chosen)
            $('.ans').removeClass('chosen')

            //adding class of chosen for css styling of chosen answer
            $(this).addClass('chosen')

            //declare this as chosen answer
            chosenAns = $(this).text()
        });

        //when user clicks the next button
        $('#next').on('click', function () {
            //if user tries to click next button w/o choosing answer, alert, return, do nothing
            if (chosenAns === '') {
                return
            }
            //call next question function
            nextQuestion()
        });

        //next question function
        function nextQuestion() {

            //stop countdown
            clearInterval(countdown)

            //remove the 'chosen' class from answer (so css styling doesn't carry over into next Q)
            $('.ans').removeClass('chosen')


            //if the chosen answer was the correct answer
            if (chosenAns === curRightAns) {

                //add one to correct answer count
                correctCount++

                //increment qCount
                qCount++

                //subtract 1 from remaining questions
                remainingQues--

                //call next question function
                newQuestion()
            }
            else {
                //push wrong answer info to wrong answer arrays
                wrongAnsQues.push(curQues)
                wrongAnsChoosen.push(chosenAns)
                wrongAnsRight.push(curRightAns)
                
                //increment qCount
                qCount++

                //subtract 1 from remaining questions
                remainingQues--
                
                //call new Question function
                newQuestion()
            }
        }

        //this function is called when there are no more questions
        function noMoreQ() {

            //set results display
            qNum.text('You scored ' + correctCount + '/' + quizQuestions.length + ' correct!')

            //remove next button
            $("#next").remove()

            //clear content on all question text
            timeRem.text('')
            question.text('')
            AText.text('')
            BText.text('')
            CText.text('')
            DText.text('')
            //loop through wrong answer arrays
            for (i = 0; i < wrongAnsQues.length; i++) {
                wrongText.text('What You Missed:')
                //declare wrong answer div
                var wrongAnsDiv = $("<div>")

                //pull question from array where index = i
                var wrongAnsQDiv = $('<div> <b>Question:</b> ' + wrongAnsQues[i] + '</div>')

                //append to wrongAnsDiv
                wrongAnsDiv.append(wrongAnsQDiv)

                //pull choosen answer from array where index = i
                var wrongAnsChosDiv = $('<div> <b>Your Answer:</b> ' + wrongAnsChoosen[i] + '</div>')

                //apend to wrongAnsDiv
                wrongAnsDiv.append(wrongAnsChosDiv)

                //pull right answer from array where index = i
                var wrongAnsRightDiv = $('<div> <b> Right Answer:</b> ' + wrongAnsRight[i] + '</div>')

                //apend to wrongAnsDiv
                wrongAnsDiv.append(wrongAnsRightDiv)

                //create line div for seperating questions
                var line = $("<div>")
                line.addClass('line')

                //append div to wrong ans div
                wrongAnsDiv.append(line)

                //append wrong answer div to existing wrongQs div
                $('#wrongQs').append(wrongAnsDiv)
            
            }
        }

        //called every second when question is present
        function updateTime() {

            //-1 from timeCount
            timeCount--

            //push formatted timeCount text
            timeRem.text(timeCount + ' seconds remaining')

            //if time remaining is 3 seconds or less
            if(timeCount <=3 ){
                
                //add class to change text color to red, make font bigger
                timeRem.addClass("warningRed")
            }
            console.log(timeCount)
            //if no more time remains
            if (timeCount === 0) {
                
                //clearInterval
                clearInterval(countdown)

                //set chosen Ans to 'ran out of time'
                chosenAns = '**RAN OUT OF TIME**'

                //call next question function
                nextQuestion()

            }
        }
        function chooseRanQ(){

            //find random number between 0 and quizQuestion array length
            thisQ = Math.floor(Math.random()*quizQuestions.length)

            //if this number has already been used
            if(prevQues.indexOf(thisQ)!== -1) {

                console.log('----picked dupliacte----')
                console.log(thisQ)

                //reset thisQ value
                thisQ=''

                //recall function and return
                chooseRanQ()
                return
            }
            //if the question has not been used yet
            else{

            //add to prevQues array
            prevQues.push(thisQ)
            console.log('this question ' + thisQ)

            //return the value of thisQ
            return thisQ
            }
        }