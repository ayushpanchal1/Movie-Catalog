const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9c786aca8fmshd5224909fe3c2fdp17c25djsn3fa2459b228c',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

////////////////////////////////////////////////////////////////////////////////////////////////////

function movie_search (){
var movie_name = document.getElementById("search_value").value;
document.querySelector(`.movies-list`).innerHTML = null;
document.querySelector(`.reviews-list`).innerHTML = null;
fetch('https://imdb8.p.rapidapi.com/auto-complete?q='+movie_name, options)
	.then(response => response.json())
    .then(data => {
        const list = data.d;
        list.map((item) => {
            const name = item.l; 
            const year = item.y;
            const actors = item.s; 
            const rank = item.rank;
            const poster = item.i.imageUrl;
            const id = item.id;
            const movie = `<li><div class="movie-card" id="${id}"><figure class="card-banner" onclick="get_details()"><img src="${poster}"></figure><div class="title-wrapper"><h3 class="card-title">${name}</h3><time datetime="2022">${year}</time></div><div class="card-meta"><div class="badge badge-outline">HD</div><div class="rating"><ion-icon name="star"></ion-icon><data>${rank}</data></div></div></div></li>`
            document.querySelector(`.movies-list`).innerHTML += movie;
        })
    })  
	.then(response => console.log(response))
	.catch(err => console.error(err)); 
}

function get_details (){
  var gid = event.target.parentElement.id;
  document.querySelector(`.movie-detail`).innerHTML = null;
  fetch('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst='+gid+'&currentCountry=US', options)
    .then(response => response.json())
      .then(datag => {
          const dat = datag;
          console.log(dat);
          console.log(gid);

              var gimage = dat["title"]["image"]["url"];
              var gruntime = dat["title"]["runningTimeInMinutes"];
              var gyear = dat["title"]["year"];
              var gtitle = dat["title"]["title"];
              var grating = dat["ratings"]["rating"];
              var ggenre = dat["genres"];
              var goutline = dat["plotOutline"]["text"];
              var gsummary = dat["plotSummary"]["text"];
              var gtitletype = dat["title"]["titleType"]
              var putres = `<div class="container">

              <figure class="movie-detail-banner">
    
                <img src="${gimage}" alt="Free guy movie poster">
    
              </figure>
    
              <div class="movie-detail-content">
    
                <p class="detail-subtitle">${gtitletype}</p>
    
                <h1 class="h1 detail-title">
                  ${gtitle}
                </h1>
    
                <div class="meta-wrapper">
    
                  <div class="badge-wrapper">
                    <div class="badge badge-fill">${grating}/10</div>
    
                    <div class="badge badge-outline">HD</div>

                    <div class="badge badge-fill">${ggenre}</div>
                  </div>
    
                  
    
                  <div class="date-time">
    
                    <div>
                      <ion-icon name="calendar-outline"></ion-icon>
    
                      <time datetime="2021">${gyear}</time>
                    </div>
    
                    <div>
                      <ion-icon name="time-outline"></ion-icon>
    
                      <time datetime="PT115M">${gruntime} min</time>
                    </div>
    
                  </div>
    
                </div>
    
                <p class="storyline">
                  ${gsummary}
                </p>
    
                <div class="details-actions" id = "${gid}">
    
                  
                  
    
                    
                
    
                  <div class="title-wrapper">
                    <p class="title">Have a look at what others think</p>
    
                    <p class="text">read user reviews</p>
                  </div>
    
                  <button class="btn btn-primary" onclick="get_reviews()">
                  <ion-icon name="heart-outline"></ion-icon>
    
                    <span>Reviews</span>
                  </button>
    
                </div>
    
              </div>
    
            </div>`
              document.querySelector(`.movie-detail`).innerHTML = putres;
          
      })  
    .then(response => console.log(response))
    .catch(err => console.error(err)); 
}

function get_reviews (){
  var rid = event.target.parentElement.id;
  document.querySelector(`.reviews-list`).innerHTML = null;
  fetch('https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst='+rid, options)
    .then(response => response.json())
      .then(datar => {
          const listr = datar.reviews;
          console.log(listr);
          listr.map((item) => {
              
              const authortitle = item.reviewTitle;
              const authorname = item.author["displayName"]; 
              const authorrating = item.authorRating;
              const authortext = item.reviewText;
              const reviewlike = item.interestingVotes["up"];
              const reviewdislikes = item.interestingVotes["down"];
              const putrev = `<li><div class="reviewboxx">
                  
              <div class="title"><h3>${authortitle}</h3></div>
            
              <div class="name"><strong>${authorname}</strong> rates it <strong>${authorrating}/10</strong></div>

              <div class="text"><data>${authortext}</data></div>
            <div class="votes"><h1>${reviewlike} likes&nbsp;&nbsp;${reviewdislikes} dislikes</h1></div>
            </div></li>`
            console.log(putrev);
              document.querySelector(`.reviews-list`).innerHTML += putrev;
          })
      })  
    .then(response => console.log(response))
    .catch(err => console.error(err)); 
  }

/*
          <li>
                  
                    <h3>${authortitle}</h3>
                  
                    <strong>${authorname}</strong> rates it <strong>${authorrating}/10</strong>

                    <data>${authortext}</data>
                  <div class="votes">${reviewlike} likes</div> <div class="votes">${reviewdislikes} dislikes</div>
          </li>
*/
/*function get_details (id){
  fetch('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst='+id+'&currentCountry=US', options)
    .then(response => response.json())
      .then(data => {
          const list = data.d;
          list.map((item) => {
              const gimage = item.image.url;  
              const gruntime = item.title.runningTimeInMinutes;
              const gyear = item.title.year;
              const gtitle = item.title.title;
              const grating = item.ratings.rating;
              const ggenre = item.genres;
              const goutline = item.plotOutline.text;
              const gsummary = item.plotSummary.text;
              const putres = `<div class="container">

              <figure class="movie-detail-banner">
    
                <img src="${gimage}" alt="Free guy movie poster">
    
              </figure>
    
              <div class="movie-detail-content">
    
                <p class="detail-subtitle">Info</p>
    
                <h1 class="h1 detail-title">
                  ${gtitle}
                </h1>
    
                <div class="meta-wrapper">
    
                  <div class="badge-wrapper">
                    <div class="badge badge-fill">PG 13</div>
    
                    <div class="badge badge-outline">HD</div>
                  </div>
    
                  <div class="ganre-wrapper">
                    ${ggenre}
                  </div>
    
                  <div class="date-time">
    
                    <div>
                      <ion-icon name="calendar-outline"></ion-icon>
    
                      <time datetime="2021">${gyear}</time>
                    </div>
    
                    <div>
                      <ion-icon name="time-outline"></ion-icon>
    
                      <time datetime="PT115M">${gruntime} min</time>
                    </div>
    
                  </div>
    
                </div>
    
                <p class="storyline">
                  ${goutline}
                </p>
    
                <div class="details-actions">
    
                  <button class="share">
                    <ion-icon name="share-social"></ion-icon>
    
                    <span>Share</span>
                  </button>
    
                  <div class="title-wrapper">
                    <p class="title">Prime Video</p>
    
                    <p class="text">Streaming Channels</p>
                  </div>
    
                  <button class="btn btn-primary">
                    <ion-icon name="play"></ion-icon>
    
                    <span>Watch Now</span>
                  </button>
    
                </div>
    
              </div>
    
            </div>`
              document.querySelector(`.movie-detail`).innerHTML = putres;
          })
      })  
    .then(response => console.log(response))
    .catch(err => console.error(err)); 
}*/

document.querySelector(".search").addEventListener("keyup",function(event){
    if(event.key == "Enter") {
        movie_search ();
    }
})


/*            <li>
              <div class="movie-card">

                <a href="./movie-details.html">
                  <figure class="card-banner">
                    <img src="${poster}">
                  </figure>
                </a>

                <div class="title-wrapper">
                  <a href="./movie-details.html">
                    <h3 class="card-title">${name}</h3>
                  </a>

                  <time datetime="2022">${year}</time>
                </div>

                <div class="card-meta">
                  <div class="badge badge-outline">HD</div>

                  <div class="rating">
                    <ion-icon name="star"></ion-icon>

                    <data>${rank}</data>
                  </div>
                </div>

              </div>
            </li>*/