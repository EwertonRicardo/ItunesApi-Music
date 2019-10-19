console.clear();


    var $input = $('.search');
    var $results = $('.results');

function fetch(term){
  $.ajax({
      url: 'https://itunes.apple.com/search',
      crossDomain: true,
      dataType: 'jsonp',
      data: {
        term: term,
        entity: 'song',
        limit: 24,
        explicit: 'No'
      },
      method: 'GET',
      success: function(data){
        console.log(data);

        $results.empty();

           $.each(data.results,function(i,result){
          if ( i > 23 ) { return false; }
         
          var hires = result.artworkUrl100.replace('100x100','480x480');
            
          $results[0].insertAdjacentHTML('beforeend',
          '<div class="result "><img src="'+hires+'" onerror="src='+result.artworkUrl100+'" class="img-fluid"/>'+ 
           '<div class="result__text col-sm-12"> <span class="artist-name col-sm-12">'+result.artistName+'</span>' +
            '<span class="track-name ">'+result.trackName+'</span>'+
            '<div id="preview"><a href='+result.previewUrl+' target="_blank">  <button type="button" id="btn" class="btn btn-info btn-sm ">Preview</button>'+
            '</a></div>'+
            '</div></div>');

        });
      },
      error: function(e){
        console.log(e);
      }
    }); 
    

}

$input.on('blur keydown',function(){
  if ( !event.keyCode || event.keyCode == 13 ) {
    fetch($input.val());
  }
});

fetch($input.val());


