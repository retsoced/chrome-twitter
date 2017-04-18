function insertFeed( referenceNode, newNode ) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

var el = document.createElement( 'div' );
el.id = 'feed-block';

var div = document.getElementById( 'desktop-unrec-ad' );
insertFeed( div, el );

function insertNav (){
	var nav = '<nav><div class="back">< prev</div><div class="next">next ></div></nav>';
	$(nav).insertAfter( '#feed-block ul' );
}

function parseFeed (){
	var url = 'https://houdini-api.firebaseio.com/results.json';
	$( '#feed-block' ).append( '<header>Twitter</header><ul></ul>' );
	$.getJSON(url, function ( data ) {
		$.each( data, function( key, value ) {
			var name, timestamp, textStr;
			timestamp = moment( value.date ).format( 'MMM Do YY, h:mm a' );
			textStr = value.text;
			$.each( value, function ( i, item ){
				name = item.name;
			});
			$( '#feed-block ul' ).append( '<li class="tweet"><div class="name">' + name + '</div><div class="timestamp">' + timestamp + '</div><div class="text">' + textStr + '</div></li>' );

		});
	});
	
	insertNav();
}

parseFeed();

var item = 1;

function slideTweets ( direction ){
	var pos = $("#feed-block ul").offset().left;
	if ( direction == 'left' && item > 1 ) {
		$("#feed-block ul").offset({ left : pos + 300});
		item --;
	} else if ( direction == 'right' && item < 15 ) {
		$("#feed-block ul").offset({ left : pos - 300});
		item ++;
	}
	
	if ( item > 1 ){
		$( '#feed-block nav .back' ).show();
	} else {
		$( '#feed-block nav .back' ).hide();
	}
	
	if ( item > 14 ){
		$( '#feed-block nav .next' ).hide();
	} else {
		$( '#feed-block nav .next' ).show();
	}
}

$(document).on("click","#feed-block nav .back",function () {
	slideTweets( 'left' );
});

$(document).on("click","#feed-block nav .next",function () {
	slideTweets( 'right' );
});