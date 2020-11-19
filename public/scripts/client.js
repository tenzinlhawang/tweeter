/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {

const createTweetElement = function(tweetDb) {
  const $newTweet = 
    $(`<article>
    <header>
    <img src="${tweetDb.user.avatars}"/>
      <span>
         ${tweetDb.user.name}
      </span>
    </header>
    <p>${tweetDb.content.text}</p>
    <footer>
    <span><strong>${tweetDb.created_at}</strong></span>
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
    $('#tweets-container').append(eachTweet)
    
  }
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}


$("form").on("submit", function(event) {
  event.preventDefault();
  console.log('Ajax request working well...')
  const tweet = $('form textarea').val();
  if(tweet === "" || tweet === null){
    return alert("Your tweet is empty");
  } else if(tweet.length > 140){
    return alert("Your tweet exceeds the maximum characters!");
  } else {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $("form").serialize() 
    })
    .catch(err => console.log(err))
    .always(() => console.log("Finished sending, did it work, i dunno"))
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
loadTweets();
})

