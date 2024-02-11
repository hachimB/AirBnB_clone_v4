$(function () {
  const checked = {};

  $("input[type='checkbox']").on('change', function () {
    if ($(this).is(':checked'))
      checked[$(this).attr('data-id')] = $(this).attr('data-name');
    else delete checked[$(this).attr('data-id')];

    if (Object.values(checked).length > 3) {
      $('.amenities h4').html(
        Object.values(checked).slice(0, 3).join(', ') + ',...'
      );
    } else $('.amenities h4').html(Object.values(checked).join(', '));
  });
   $('button[type="button"]').click(function() {
     let amenityIds = Object.keys(checked);
   $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify({ 'amenities': amenityIds }),
    contentType: 'application/json',
    success: function (response) {
      $('section.places').html('');
      for (place of places = response) {
        console.log(place);
        $('section.places').append(`
                <article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">
                            ${place.price_by_night}$
                        </div>
                    </div>
                    <div class="information">
                        <div class="max_guest">
                            ${place.max_guest} Guest${
                    place.max_guest != 1 ? "s" : ""
                }
                        </div>
                        <div class="number_rooms">
                            ${place.number_rooms} Bedroom${
                    place.number_rooms != 1 ? "s" : ""
                }
                        </div>
                        <div class="number_bathrooms">
                            ${place.number_bathrooms} Bathroom${
                    place.number_bathrooms != 1 ? "s" : ""
                }
                        </div>
                    </div>
                    <div class="user">
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>
                `);
      }
    }
   });
  });
});
