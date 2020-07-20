
$(function(){
	$(document).on("click",".car-img",function() {
	  var i_path = $(this).attr('src');
	  console.log(i_path);
	  console.log(this);
	  $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
	  $('#magnify').css({
		  left: ($(document).width() - $('#magnify').outerWidth())/2,
		  // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
			  top: ($(window).height() - $('#magnify').outerHeight())/2
		});
	  $('#overlay, #magnify').fadeIn('fast');
	});
	
	$('body').on('click', '#close-popup, #overlay', function(event) {
	  event.preventDefault();
   
	  $('#overlay, #magnify').fadeOut('fast', function() {
		$('#close-popup, #magnify, #overlay').remove();
	  });
	});
  });

  $('.max-km').on('input', function () {
	$(".max-km-view").text("Макс. пробіг: "+e.value);
});
	

window.onload = function(){  
	$.ajax({
			   url: "https://localhost:44369/User/GetCarsIndex",
			   type: "GET",
			   crossDomain: true,
			   success: function (response) {
				   show(response);
			   }
	});
	function show(cars) {  
   cars.forEach(element => {
	  $('#list-car-index').append(
				  `<div class="col-lg-4 car-item">
				  <img class="car-img " src="data:image/png;base64,${element.picture}" alt="car">
				  <h3 class="car-header">${element.mark} ${element.model}</h3>
				  <ul class=properties">
					  <li class="prop-val">
						  <i class="fa fa-calendar" aria-hidden="true"></i> ${element.year}
					  </li>
							  <li class="prop-val">
								  <i class="fa fa-cogs" aria-hidden="true"></i> ${element.transmission}
							  </li>
					  <li class="prop-val">
						  <i class="fa fa-bolt" aria-hidden="true"></i> ${element.power} кВт
					  </li>
				  </ul>
					  <ul class=properties">
					  <li class="prop-val">
						  <i class='fa fa-tint'></i> ${element.fuel}
					  </li>
					  <li class="prop-val">
						  <i class="fa fa-usd" aria-hidden="true"></i> ${element.price}
					  </li>
					  <li class="prop-val">
						  <i class="fa fa-road" aria-hidden="true""></i> ${element.km} км
					  </li>
				  </ul>
				  <a href="${element.url}" target="_blank" class="details">
					  Деталі
					  <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
				  </a>
			  </div>`);});
	}
   }


