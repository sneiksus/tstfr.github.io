$(document).ready(function() { 
	$("#menubtn").click(function() { 
		if($('#menu').is(":hidden"))
		$("#menu").show(1000); 
		else
		$("#menu").hide(1000);
	}); 
	$("#X").click(function(){
		$("#menu").hide(1000);
	})
}); 

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

var cars=null,carsReserve=null,skip=0;
function skipCars(){
    if(cars.length==0)
    {
    $('#load-else').hide();
       return [];
    }
    else
    {
        var res=cars.slice(skip, skip+6);
        skip+=res.length;
        console.log(skip);
        if(skip>=cars.length)
           $('#load-else').hide();
           return res;
    }
}

document.getElementById("load-else").addEventListener("click", e => {

    e.preventDefault();
    show(skipCars());
});
document.getElementById("reset").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("list-car-catalog").innerHTML="";
    skip=0;
    show(skipCars());
    $('#load-else').show();
});
document.getElementById("select").addEventListener("click", e => {

    e.preventDefault();
    var min_pw=$('#min-pw').val();
    var max_price=$('#max-price').val();
    var max_km=$('#max-km').val();
    var trans = $('#trans option:selected').text();
    var fuel = $('#fuel option:selected').text();
    var mark = $('#mark option:selected').text();
    carsReserve = cars;
    if(mark!='Марка')
    carsReserve=carsReserve.filter(x => x.mark == mark);
    if(fuel!='Паливо')
    carsReserve=carsReserve.filter(x => x.fuel == fuel);
    if(trans!='Коробка')
    carsReserve=carsReserve.filter(x => x.trans == trans);

    carsReserve=carsReserve.filter(x => Number(x.km) <= Number(max_km));
    carsReserve=carsReserve.filter(x => Number(x.price) <= Number(max_price));
    carsReserve=carsReserve.filter(x => Number(x.power) >= Number(min_pw));

    document.getElementById("list-car-catalog").innerHTML="";
    show(carsReserve);
    $('#load-else').hide();
});
window.onload = function(){  
	$.ajax({
			   url: "https://localhost:44369/User/GetCarsCatalog",
			   type: "GET",
			   crossDomain: true,
			   success: function (response) {
                   cars=response;
				   show(skipCars(cars));
			   }
	});}
	function show(cars) {  
   cars.forEach(function(element, index) {
       if(index%2!=0)
       return;
       var first =  `<div class="row catalog justify-content-end">
       <div class="col-lg-4 car-item  mb">
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
   </div>`;
   var second;
   if(index < cars.length - 1)
      second =`
      <div class="col-lg-4 car-item  mb">
      <img class="car-img " src="data:image/png;base64,${cars[index + 1].picture}" alt="car">
      <h3 class="car-header">${cars[index + 1].mark} ${cars[index + 1].model}</h3>
      <ul class=properties">
          <li class="prop-val">
              <i class="fa fa-calendar" aria-hidden="true"></i> ${cars[index + 1].year}
          </li>
                  <li class="prop-val">
                      <i class="fa fa-cogs" aria-hidden="true"></i> ${cars[index + 1].transmission}
                  </li>
          <li class="prop-val">
              <i class="fa fa-bolt" aria-hidden="true"></i> ${cars[index + 1].power} кВт
          </li>
      </ul>
          <ul class=properties">
          <li class="prop-val">
              <i class='fa fa-tint'></i> ${cars[index + 1].fuel}
          </li>
          <li class="prop-val">
              <i class="fa fa-usd" aria-hidden="true"></i> ${cars[index + 1].price}
          </li>
          <li class="prop-val">
              <i class="fa fa-road" aria-hidden="true""></i> ${cars[index + 1].km} км
          </li>
      </ul>
      <a href="${cars[index + 1].url}"  target="_blank" class="details">
          Деталі
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
      </a>
   </div>
   </div>`;
   else
   second = "</div>";
    
      $('#list-car-catalog').append(first+second)});
	}