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

       socket.on('newLocationMessage', function(message) {
           var li = jQuery('<li></li>');
           var a = jQuery('<a target="_blank">My current location</a>');
           li.text(`${message.from}: `);
            a.attr('href', message.url);
            li.append(a);
            
            jQuery('#messages').append(li);
       });


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
           if(!navigator.geolocation){
               return alert('GeoLocation not supported');
           }

           navigator.geolocation.getCurrentPosition(function(position) {
                // console.log(position);
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                // console.log(position.coords.latitude);
           }, function() {
               alert('Unable to fetch location');
           });
       });