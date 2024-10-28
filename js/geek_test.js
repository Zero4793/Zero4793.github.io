$(function () {
    $("#geek_test").submit(validate);
});


// Add an error message to the #errors element
function addError(message) {
    var p = document.createElement("p");
    var text = document.createTextNode(message);
    p.appendChild(text);
    document.getElementById("errors").appendChild(p);
}


// Clear all error messages from the #errors element
function clear(){
    //clear errors and score
    $("#errors").html("");
    $('#score').html("");
    //clear next button and fail message
    $("#registerBtn").fadeOut(1000);
    $(".center p").fadeOut(1000);
}


// Validate the form, returning true if valid, false otherwise
function validate(e) {
    e.preventDefault();
    clear();
    var success = true;

    //glasses
    if (!$("#glasses_yes").prop("checked") && !$("#glasses_no").prop("checked")) { success = false; addError("Do you wear glasses?"); }

    //drink
    if($("select[name='drink']").val()==-1){success = false; addError("You must select a drink");}

    //date
    if($("select[name='date']").val()==-1){success = false; addError("You must choose a date");}


    //Scoring
    let score = 0;
    //glasses
    if ($("#glasses_yes").prop("checked")) { score += 10;}
    //drink
    score += parseInt($("select[name='drink']").val());
    //date
    score += parseInt($("select[name='date']").val());
    //qualities
    const ranks = getRankByValue();
    for (const rank in ranks) {
        score += (6 - parseInt(rank)) * parseFloat(ranks[rank]);
    }
    //watched
    const watched = $("input[name='watched']:checked");
    score += watched.length * 5;

    //output score
    if (success) {
        $('#score').html("Your Score: " + score);

        //reveal next button after 10s
        if(score>=50){setTimeout(() => {
            $("#registerBtn").fadeIn(2000);
        }, 10000);} // 10s
        else{setTimeout(() => {
            $(".center p").fadeIn(2000);
        }, 10000);} // 10s

        if(score==100){
            $('#score').html("Your Score: " + score + " (Perfect Score!)");
            $('#score').css("color","var(--GOLD)");
            animateGeek();
        }
        else if(score<50){
            $('#score').css("color","var(--ERR)");
            animateFail();
        }
        else{
            $('#score').css("color","var(--WIN)");
            animatePass();
        }
    } else {
        //reset images
        $(".pane img").fadeOut(1000);
        //reveal first image       
        setTimeout(() => {
            $(".pane img[src='img/nerdTinder.png']").fadeIn(1000);
        }, 1000);
    }
}


function getRankByValue() {
    const rankMap = {};

    // Iterate over each rankElement to extract value and associated rank
    $('.rankElement .rankDisp').each(function () {
        const value = $(this).attr('value');
        const rank = $(this).text();
        rankMap[rank] = value;
    });

    return rankMap;
}


// Animate Fail - Fade Out and Fade In
function animateFail() {
    $(".pane img").fadeOut(2000);

    const img = $(".pane img[src='img/not_geeky_enough_option_1.png']");
    setTimeout(() => {
        img.fadeIn(6000);
    }, 2000);
}

// Animate Pass - Slide Down
function animatePass() {
    $(".pane img").fadeOut(2000);

    setTimeout(() => {
        const img = $(".pane img[src='img/welcome_geek_option_1.png']");
        img.css({
            top: '-100%', // Start from above the viewport
            position: 'relative',
            display: 'block'
        }).animate({
            top: '0' // Slide to its original position
        }, 4000);
    }, 2000);
}

// Animate Geek - Shrink, Fade Out, Fade In, and Grow
function animateGeek() {
    const oldImg = $(".pane img");
    const newImg = $(".pane img[src='img/super_geek_option_1.png']");

    oldImg.css({
        transition: 'all 2s', // Prepare for the shrink animation
    }).css({
        transform: 'scale(0.5)', // Shrink
        opacity: 0 // Fade out
    });

    // Delay for the original image to shrink and fade out
    setTimeout(() => {
        oldImg.hide(); // Hide the original image

        newImg.css({
            transition: 'none', // Reset any previous transition
            transform: 'scale(0.5)', // Start at half size
            opacity: 0, // Start with 0 opacity
            display: 'block' // Make it visible
        }).css({
            transition: 'all 2s' // Prepare for the grow animation
        });

        // Delay for the new image to get ready
        setTimeout(() => {
            newImg.css({
                transform: 'scale(1)', // Grow
                opacity: 1 // Fade in
            });
        }, 50);
    }, 2000);
}



// i wish timeout had the time first then the function, would make it easier to read