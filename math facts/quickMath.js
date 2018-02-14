var topNumber;
var bottomNumber;
var totalAnswered = 0;
var numRight = 0;
var numWrong = 0;
var grade;
var operationSymbol = $("#operation");
var range10 = document.getElementById("ten");
var range12 = document.getElementById("twelve");
var specificNumber;
var min;
var max;
var correctAnswer;
var timeout;
var answer;

// clear input when user clicks clear button

$("#clear").click(function() {
    
    $("#answer").val("");
})




// toggle selected class on options buttons

$('.operationsButton').click(function() {
   //Add active class to the clicked button
   $('.operationsButton').removeClass('selected');
    $(this).addClass('selected');
    return false;
});

$('.timeLimitButton').click(function() {
   //Remove active class from all buttons
   $('.timeLimitButton').removeClass('selected');
   //Add active class to the clicked button
   $(this).addClass('selected');
    return false;
});

$('.rangeButton').click(function() {
   //Remove active class from all buttons
   $('.rangeButton').removeClass('selected');
   //Add active class to the clicked button
   $(this).addClass('selected');
    return false;
});


// clears timeout for creating card when timer is 0
function stopFunction() {
                clearTimeout(timeout);
            };

// click play, create card, start/display counter
$("#play").click(function() {
    if ($(window).width() < 1150){
        $("#answer").attr("readonly", true);
        $("#numberPad").css("visibility", "visible");
        $(".clearEnter").show();
        
    };
    
    createCard();
    clearStats();
    $("#stats").css("visibility", "visible");
    
    var counter = $(".timeLimitButton.selected").val();
    setInterval(function() {
        counter--;
        if (counter >= 0) {
            $("#timer").text(counter);
        }
        if (counter === 0) {
            $("#timer").text("Time's up!");
            $("#timer").css("left", "415px");
            clearInterval(counter);
            $("#play").css("visibility", "visible");
            $("#card").css("visibility", "hidden");
            $("#numberPad").css("visibility", "hidden");
            $(".clearEnter").hide();
            $("#success").hide();
            $("#wrong").hide();
            stopFunction();
        }
    }, 1000);
});



// attach click event to enter key and prevent multiple submissions

var callback = detectOperationForChecking;

 $("#answer").keyup(function(event) {
    if(event.keyCode == 13) callback;
        $(function() {
          $('#form').submit(function(){
            $("input[type='submit']", this)
              .attr('disabled', 'disabled');
            return true;
          });
        });
        
    });

$("#enter").click(callback);



// get random numbers for top and bottom numbers
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};


// create card according to selected operation
function createCard() {
    $("#enter").removeAttr('disabled');
    
    if ($("#add").hasClass("selected")) {
        createCardAddition();
    } else if ($("#subtract").hasClass("selected")) {
        createCardSubtraction();
    } else if ($("#multiply").hasClass("selected")) {
        createCardMultiplication();
    } else if ($("#divide").hasClass("selected")) {
        createCardDivision();
    }
};


// create cards based on selected operation

    function createCardAddition() {
        specificNumber = $("select option:selected").val();
        operationSymbol.text("+");
            
        if ($(range10).hasClass('selected') && specificNumber == "all") { 
                topNumber = getRandomIntInclusive(0, 10);
                bottomNumber = getRandomIntInclusive(0, 10);
                    
            } else if ($(range12).hasClass('selected') && specificNumber == "all") {
                topNumber =  getRandomIntInclusive(0, 12);
                bottomNumber = getRandomIntInclusive(0, 12);
                
            } else if ($(range10).hasClass('selected') && (specificNumber != "all")) {
                topNumber = getRandomIntInclusive(0, 10);
                bottomNumber = Number(specificNumber);
                
            } else if ($(range12).hasClass('selected') && (specificNumber !="all")) {
                topNumber = getRandomIntInclusive(0, 12);
                bottomNumber = Number(specificNumber);
            };

            $("#topNumber").text(topNumber);
            $("#bottomNumber").text(bottomNumber);
            $("#card").css("visibility", "visible");
            $("#play").css("visibility","hidden");
            $("#answer").val("");
            $("#answer").focus();
        
    };

    function createCardSubtraction() {
        specificNumber = $("select option:selected").val();
        operationSymbol.text("-");
            
        if ($(range10).hasClass('selected') && specificNumber == "all") { 
                
                topNumber = getRandomIntInclusive(0, 10);
                bottomNumber = getRandomIntInclusive(0, 10);
                    
            } else if ($(range12).hasClass('selected') && specificNumber == "all") {
                topNumber =  getRandomIntInclusive(0, 12);
                bottomNumber = getRandomIntInclusive(0, 12);
                
            } else if ($(range10).hasClass('selected') && (specificNumber != "all")) {
                topNumber = getRandomIntInclusive(0, 10);
                bottomNumber = Number(specificNumber);
                
            } else if ($(range12).hasClass('selected') && (specificNumber !="all")) {
                topNumber = getRandomIntInclusive(0, 12);
                bottomNumber = Number(specificNumber);
            };

            if (topNumber >= bottomNumber) {
                $("#topNumber").text(topNumber);
                $("#bottomNumber").text(bottomNumber);
            } else {
                createCardSubtraction();
            }
                $("#card").css("visibility", "visible");
                $("#play").css("visibility","hidden");
                $("#answer").val("");
                $("#answer").focus();
        
    };

function createCardMultiplication() {
        specificNumber = $("select option:selected").val();
        operationSymbol.text("x");
            
        if ($(range10).hasClass('selected') && specificNumber == "all") { 
                
                topNumber = getRandomIntInclusive(0, 10);
                bottomNumber = getRandomIntInclusive(0, 10);
                    
            } else if ($(range12).hasClass('selected') && specificNumber == "all") {
                topNumber =  getRandomIntInclusive(0, 12);
                bottomNumber = getRandomIntInclusive(0, 12);
                
            } else if ($(range10).hasClass('selected') && (specificNumber != "all")) {
                topNumber = getRandomIntInclusive(0, 10);
                bottomNumber = Number(specificNumber);
                
            } else if ($(range12).hasClass('selected') && (specificNumber !="all")) {
                topNumber = getRandomIntInclusive(0, 12);
                bottomNumber = Number(specificNumber);
            };

                $("#topNumber").text(topNumber);
                $("#bottomNumber").text(bottomNumber);
                $("#card").css("visibility", "visible");
                $("#play").css("visibility","hidden");
                $("#answer").val("");
                $("#answer").focus();
    
    };


function getMultiplesTen(bottomNumber) {
    var answers = [];
    for (var i = 0; i <= 10; i++) {
        answers.push(bottomNumber * i);
        
    };
    return answers[Math.floor(Math.random() * answers.length)];
};

function getMultiplesTwelve(bottomNumber) {
    var answers = [];
    for (var i = 0; i <= 12; i++) {
        answers.push(bottomNumber * i);
        
    };
    return answers[Math.floor(Math.random() * answers.length)];
};

function createCardDivision() {
    operationSymbol.html("&divide;");
    specificNumber = $("select option:selected").val();
   
    if ($(range10).hasClass('selected') && specificNumber == "all") {
        
        bottomNumber = getRandomIntInclusive(1, 10);
        topNumber = getMultiplesTen(bottomNumber);        
        
 
    } else if ($(range12).hasClass("selected") && specificNumber == "all") {
        bottomNumber = getRandomIntInclusive(1, 12);
        topNumber = getMultiplesTwelve(bottomNumber);
        
       
        
    } else if ($(range10).hasClass('selected') && specificNumber != "all") {
        bottomNumber = Number(specificNumber);
        topNumber = getMultiplesTen(bottomNumber);
         
        
    } else if ($(range12).hasClass("selected") && specificNumber != "all") {
        bottomNumber = Number(specificNumber);
        topNumber = getMultiplesTwelve(bottomNumber);
         
    };
                $("#topNumber").text(topNumber);
                $("#bottomNumber").text(bottomNumber);
                $("#card").css("visibility", "visible");
                $("#play").css("visibility","hidden");
                $("#answer").val("");
                $("#answer").focus();
    
};





// track/display number of correct responses

function trackNumRight() {
        
        
        totalAnswered = totalAnswered + 1;
        numRight = numRight + 1;
        grade = Math.round((numRight / totalAnswered) * 100);
        $("#numRight").text(numRight);
        $("#grade").text(grade);
        
    };



// track/display number of wrong responses

function trackNumWrong() {
      
        totalAnswered = totalAnswered + 1;
        numWrong = numWrong + 1;
        grade = Math.round((numRight / totalAnswered) * 100);
        $("#numWrong").text(numWrong);
        $("#grade").text(grade);
        
    };


function detectOperationForChecking() {
    $("#enter").attr('disabled','disabled');
    if ($("#add").hasClass('selected')) {
        checkAnswerAddition();
    } else if ($("#subtract").hasClass('selected')) {
        checkAnswerSubtraction();
    } else if ($("#multiply").hasClass('selected')) {
        checkAnswerMultiplication();
    } else if ($("#divide").hasClass('selected')) {
        checkAnswerDivision();
    }
}


// check answer against user input, show right/wrong, update stats, display new card

function checkAnswerAddition() {
    answer = parseInt($("#answer").val(), 10);
    correctAnswer = topNumber + bottomNumber;
    if (answer == correctAnswer) {
        trackNumRight();
        $("#success").show();
        timeout = setTimeout(function(){
            $("#success").hide();
            createCard();
        }, 1000);
    } else {
        trackNumWrong();
        $("#correctAnswer").text(correctAnswer);
        $("#wrong").show();
        timeout = setTimeout(function(){
            $("#wrong").hide();
            createCard();
        }, 2000);
    }
}

function checkAnswerSubtraction() {
    answer = parseInt($("#answer").val(), 10);
    correctAnswer = topNumber - bottomNumber;
     if (answer == correctAnswer) {
        trackNumRight();
        $("#success").show();
        timeout = setTimeout(function(){
            $("#success").hide();
            createCard();
        }, 1000);
    } else {
        trackNumWrong();
        $("#correctAnswer").text(correctAnswer);
        $("#wrong").show();
        timeout = setTimeout(function(){
            $("#wrong").hide();
            createCard();
        }, 2000);
    }
}

function checkAnswerMultiplication() {
    answer = parseInt($("#answer").val(), 10);
    correctAnswer = topNumber * bottomNumber;
     if (answer == correctAnswer) {
        trackNumRight();
        $("#success").show();
        timeout = setTimeout(function(){
            $("#success").hide();
            createCard();
        }, 1000);
    } else {
        trackNumWrong();
        $("#correctAnswer").text(correctAnswer);
        $("#wrong").show();
        timeout = setTimeout(function(){
            $("#wrong").hide();
            createCard();
        }, 2000);
    }
}

function checkAnswerDivision() {
    answer = parseInt($("#answer").val(), 10);
    correctAnswer = topNumber / bottomNumber;
     if (answer == correctAnswer) {
        trackNumRight();
        $("#success").show();
        timeout = setTimeout(function(){
            $("#success").hide();
            createCard();
        }, 1000);
    } else {
        trackNumWrong();
        $("#correctAnswer").text(correctAnswer);
        $("#wrong").show();
        timeout = setTimeout(function(){
            $("#wrong").hide();
            createCard();
        }, 2000);
    }
}
 

// clear stats div    

    function clearStats() {
        $("#numRight").text("");
        $("#numWrong").text("");
        $("#grade").text("");
        totalAnswered = 0;
        numRight = 0;
        numWrong = 0;
        grade = 0;
    }


// get specific number from select: options

    $('select').on('change', function() {
           var specificNumber = ( this.value );
    
       }); // assigns value of the number selected to variable


// connect number pad button press to input
   
   
$(".number").click(function() {
    var value = $(this).val();
    $("#answer").val($("#answer").val() + value);
    $("#answer").focus();

});


