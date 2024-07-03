const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9c786aca8fmshd5224909fe3c2fdp17c25djsn3fa2459b228c',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

function get_details (){
    var movie_id = document.getElementById("ad_search_value").value;
    document.querySelector(`.movie-detail`).innerHTML = null;
    fetch('https://imdb8.p.rapidapi.com/title/get-overview-details?tconst='+movie_id+'&currentCountry=US', options)
      .then(response => response.json())
        .then(data => {
            const dat = data;

                var gimage = dat["title"]["image"]["url"];
                var gruntime = dat["title"]["runningTimeInMinutes"];
                var gyear = dat["title"]["year"];
                var gtitle = dat["title"]["title"];
                var grating = dat["ratings"]["rating"];
                var ggenre = dat["genres"];
                var goutline = dat["plotOutline"]["text"];
                var gsummary = dat["plotSummary"]["text"];
                var putres = `<div class="container">
  
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
                      <div class="badge badge-fill">${grating}/10</div>
      
                      <div class="badge badge-outline">HD</div>

                      <div class="badge badge-fill">${ggenre}</div>
                    </div>
      
                    <div class="ganre-wrapper">
                      GENRE_HERE
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
      .then(response => console.log(response))
      .catch(err => console.error(err)); 
  }