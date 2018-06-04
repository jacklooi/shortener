$(document).ready(function() {
    loaddiv();
});

$('#shorten-url').click(function () {
    var originalurl = $('#original-url');
    if (!originalurl.val())
    { 
        $('#error-text').append('* please enter your URL');
        return;
    }
    
    if(originalurl.val().substring(0, 3) == 'www')
    { 
        $('#error-text').append('* please enter http:// or https://');
        return;
    }

    if (!checkURL(originalurl.val()))
    { 
        $('#error-text').append('* invalid URL');
        return;
    }

    var data = {};
    data.url = originalurl.val();
    data = JSON.stringify(data);

    var promise = $.ajax({
        type:"POST",
        url: "http://localhost:4555/shorten",
        data: data,
        contentType:"application/json; charset=utf-8",
        dataType:"text"
    });
    $.when(promise).then(function(json){
        $("#response").html("<p>" + JSON.stringify(json) + "</p><br />Check your console for the object.<br />")
        loaddiv();
        $("#original-url").val("");
    });
});

var loaddiv = function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:4555', true);
    request.onload = function() {
        $('#shorten-list').empty();
        var data = JSON.parse(this.responseText);
        var tbl = $('<table/>').attr('id', 'shortentable').attr('class', 'table is-fullwidth is-hoverable');
        $('#shorten-list').append(tbl);

        var header = '<thead><tr><td>Full URL</td><td>Shorten URL</td><td>Click Count</td><td>Last Used</td></tr></thead>';
        $('#shortentable').append(header);

        $('#shortentable').append('<tbody>');
        for (var i=0; i<data.length; i++)
        {
            var date = data[i]['lastused'];
            var gmtdatetime = '-';
            if (date)
                gmtdatetime = moment.utc(date, "YYYY-MM-DD HH mm ss").local().format('DD MMM YYYY h:mm A');
            var tr = '<tr>';
            var td1 = '<td>' + data[i]['url'] + '</td>';
            var td2 = '<td>' + data[i]['shorturl'] + '</td>';
            var td3 = '<td>' + data[i]['clickcnt'] + '</td>';
            var td4 = '<td>' + gmtdatetime + '</td></tr>';

            $('#shortentable').append(tr + td1 + td2 + td3 + td4);
        }
        $('#shortentable').append('</tbody>');
    }
    request.send();
};

var checkURL = function(url) {
    var myVariable = url;
    if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(myVariable)) {
      return 1;
    } else {
      return 0;
    }  
};
