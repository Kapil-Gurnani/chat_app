var socket = io();
       socket.on('connect', function ()  {
           console.log('Connected to server');

        //    socket.emit('createMessage', {
        //        from: 'gurnani',
        //        text: 'Hello  '
        //    }); 
       });

       socket.on('disconnect', function ()  {
        console.log('Disconnected from server');
       });

       socket.on('newMessage', function (message) {
            console.log('New message',message);
            var li = jQuery('<li></li>');
            li.text(`${message.from}: ${message.text}`);

            jQuery('#messages').append(li);
       });

    //    socket.emit('createMessage', {
    //        from: 'AK47',
    //        text: 'HI'
    //    }, function(data) {
    //        console.log('Got it',data);
    //    });

       jQuery('#message-form').on('submit', function(e) {
        e.preventDefault();

        socket.emit('createMessage', {
            from: 'USer',
            text: jQuery('[name=message]').val()
        }, function() {

        });


       });

       var locationButton = jQuery('#send-location');
       locationButton.on('click', function () {
        //    console.log(navigator.geolocation);
        //    if(navigator.geolocation){
        //        return alert('GeoLocation not supported');
        //    }

           navigator.geolocation.getCurrentPosition(function() {
                // console.log(position);
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                console.log(position.coords.latitude);
           }, function() {
               alert('Unable to fetch location');
           });
       });