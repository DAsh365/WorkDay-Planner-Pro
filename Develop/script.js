$(function () {
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  const businessHours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

  businessHours.forEach(hour => {
    const hourId = hour.toLowerCase().replace('am', '').replace('pm', '');
    const currentTime = dayjs().hour();
    const hourTime = parseInt(hourId);
    let timeBlockClass = '';

    if (hourTime < currentTime) {
      timeBlockClass = 'past';
    } else if (hourTime === currentTime) {
      timeBlockClass = 'present';
    } else {
      timeBlockClass = 'future';
    }

    const timeBlockHTML = `
      <div id="hour-${hourId}" class="row time-block ${timeBlockClass}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;

    $('.container-lg').append(timeBlockHTML);
  });

  businessHours.forEach(hour => {
    const hourId = hour.toLowerCase().replace('am', '').replace('pm', '');
    const savedEvent = localStorage.getItem(hourId);
    if (savedEvent) {
      $(`#hour-${hourId} .description`).val(savedEvent);
    }
  });

  $('.saveBtn').on('click', function () {
    const hourId = $(this).parent().attr('id').split('-')[1];
    const eventDescription = $(this).siblings('.description').val();
    localStorage.setItem(hourId, eventDescription);
  });
});
