/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {

  $(".error-message").hide();
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

const createTweetElement = function(tweetDb) {
  const unixTimestamp = Date(tweetDb.created_at);
   const milliseconds = unixTimestamp.toString();
  const $newTweet = 
    $(`<article class='tweet'>
    <header>
    <img src="${tweetDb.user.avatars}"/>
      <span>
         ${tweetDb.user.name}
      </span>
    </header>
    <p>${escape(tweetDb.content.text)}</p>
    <footer>
    <span><strong>${milliseconds}</strong></span>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-sync"></i>
      <i class="fas fa-heart"></i>
    </div>
    </div>
  </footer>
  </article>`)

  return $newTweet;
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const eachTweet = createTweetElement(tweet);
    $('#tweets-container').prepend(eachTweet)
    
  }
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

$(".button-tweet").on('click', function(event) {
  $(".compose-tweet").focus();
  $(".compose-tweet").toggle();

})

$("form").on("submit", function(event) {
  event.preventDefault();
  console.log('Ajax request working well...')
  const tweet = $('form textarea').val();
  if(tweet === "" || tweet === null){
    $('.error-message').slideDown();
    $('.error-message strong').text("Tweet is empty !")
    setTimeout(() => {
      $('.error-message').slideUp(); 
    }, 2000);
  } else if(tweet.length > 140){
     $('.error-message').slideDown()
     $('.error-message strong').text("Your tweet exceeds the maximum characters!");
     setTimeout(() => {
      $('.error-message').slideUp(); 
     }, 2000);
  } else {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $("form").serialize() 
    })
    .then(() => {
      $("#tweets-container").empty();
      $("#tweet-text").val('');
      loadTweets();
    })
    $(".error-message").hide();
      $(".error-message").slideUp();
  }
  })
  

const loadTweets = function () {
  $.ajax({
    url: '/tweets',
    method: 'GET',
  })
  .then(function (response) {
    renderTweets(response);
    console.log("Finished loading, did it work, i dunno");
  })
}
//loadTweets();
})

