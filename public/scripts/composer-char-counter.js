//console.log("Hello");

$(document).ready(function() {
  // --- our code goes here ---
  console.log('HI');


$("#tweet-text").on("input",function(event){
  event.preventDefault();
 const lengthOfText = 140-$(event.target).val().length; // val() refers to id="tweet-text".Length of whatever is typed into text box.
    const counter = $(".counter");
    // document.querySelector('.counter')
   counter.val(lengthOfText);
  
   if (counter.val() <= 0) {
    counter.css("color","red");
  } else {
    counter.css("color","black");
  }
  });
});

// # for ids
// . for classes
// tag itself for tags