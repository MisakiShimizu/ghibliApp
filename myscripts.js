$('.opening a').click(function(){
    $('.ghibli_main').show();
    $('body').css("background-image", 'none');
    $('.opening p').css('display', 'none');
    $('.opening_container').css('display', 'none');
    console.log('click');
})
$('.opening').hover(function(){
    $('.opening_container').css('transform', 'scale(9)');
})

const app = {}; 
        
    // To Randomize Movie
        app.randomMovie = function(arrayOfMovies){
            const randomIndex = Math.floor(Math.random()*arrayOfMovies.length)
            
            return arrayOfMovies[randomIndex];
        }      
            
            // CALL ON API
            app.getMovieInfo = function(){
                $.ajax({
                    url: 'https://ghibliapi.herokuapp.com/films',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        q: ""
                    }
                }).then(function(result){
                    // see Array
                // where do movies live --->result [{}, {}, {}]
               
                // remove any movies that may already be displayed
                $('.results').empty();

                //display these movies
                app.displayMovieInfo(result);
                app.randomMovie(result);
                })
            }
            
            //how to display our API info on the page
            app.displayMovieInfo = function(arrayOfData){
             
                    //pathway to description is 
                    //randomMovie.description
                   
                    //pathway to movie image is 
                    //randomMovie.image

                    //construct some HTML with API data
                   const randomMovie = app.randomMovie(arrayOfData);
                   console.log(randomMovie);

                    const movieHTML = `
                        <div class="movie_titles"
                            <h2 class='english_movie_title'>${randomMovie.title}</h2>
                            <h2 class='original_title'>${randomMovie.original_title}</h2>
                        </div>
                        <div class="movie_info">
                            <p class='description'>${randomMovie.description}</p>
                            <img id='movie_img' src="${randomMovie.image}" alt="">  
                        </div>
                        `
                    // add the HTML to the page
                    $('.results').append(movieHTML);
             //   } )
            }

            app.init = function () {
                
                $('button').on('click', function(event){
                    event.preventDefault();
                    app.getMovieInfo(); 
                })
            }

            $(document).ready(function(){
                app.init();
            })

