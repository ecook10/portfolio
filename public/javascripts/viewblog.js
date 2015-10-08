$(document).ready(function() {

    $('.delete').click(function() {
        //Send DELETE request to server
        $.ajax({
            url: '/deleteentry',
            type: 'DELETE',
            data: {id: this.id}
        });
    });
});


