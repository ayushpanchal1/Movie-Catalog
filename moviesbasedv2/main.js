const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6b54d9cd51msh2b03c770c9e6860p1393b6jsnbfb7f968c2a0',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

function movie_search (){
var movie_name = document.getElementById("search_value").value;
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
            const movie = `<li><img src = "${poster}"><h3>${name}</h3><h2><body>Year of Release: </body>${year}</h2><h2><body>Cast: </body>${actors}</h2><h2><body>Movie Ranked: </body>${rank}</h2></li>`
            document.querySelector('.movies').innerHTML += movie;
        })
    })
	.then(response => console.log(response))
	.catch(err => console.error(err)); 
}

document.querySelector(".search").addEventListener("keyup",function(event){
    if(event.key == "Enter") {
        movie_search ();
    }
})

