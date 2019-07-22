/* [ ---- Beoro Admin - calendar ---- ] */

    $(document).ready(function() {
        //* events from google 
        beoro_calendar.google();
        //* json data source
        beoro_calendar.jsonEvents();
    });

    //* fullcalendar
    beoro_calendar = {
        google: function() {
            if($('#calendar_google').length) {
                $('#calendar_google').fullCalendar({
                    header: {
                        left: 'month,agendaWeek,agendaDay',
                        center: 'title',
                        right: 'prev,next'
                    },
                    buttonText: {
                        prev: '<i class="icon-chevron-left icon-white cal_prev" />',
                        next: '<i class="icon-chevron-right icon-white cal_next" />'
                    },
                    aspectRatio: 1.8,
                    firstDay: 1, // 0 - Sunday, 1 - Monday
                    events: {
                        url:'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
                        title: 'US Holidays'
                    },
                    eventClick: function(event) {
                        // opens events in a popup window
                        window.open(event.url, 'gcalevent', 'width=400,height=200');
                        return false;
                    }
                    
                })
            }
        },
        jsonEvents: function() {
            if($('#calendar_json').length) {
                $('#calendar_json').fullCalendar({
                    header: {
                        left: 'month,agendaWeek,agendaDay',
                        center: 'title',
                        right: 'prev,next'
                    },
                    buttonText: {
                        prev: '<i class="icon-chevron-left icon-white cal_prev" />',
                        next: '<i class="icon-chevron-right icon-white cal_next" />'
                    },
                    editable: true,
                    firstDay: 1, // 0 - Sunday, 1 - Monday
                    events: "php_helpers/json-events.php",
                    eventDrop: function(event, delta) {
                        alert(event.title + ' was moved ' + delta + ' days\n' +
                            '(should probably update your database)');
                    }
                });
            }
        }
    };