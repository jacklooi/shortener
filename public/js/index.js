$(document).ready(function() {
    loaddiv();
});

$('#shorten-url').click(function () {
    var shortenbtn = $('#shorten-url');
    var originalurl = $('#original-url');
    shortenbtn.attr('disabled','disabled');
    if (!originalurl.val())
    { 
        $('#error-text').html('* please enter your URL');
        shortenbtn.removeAttr('disabled','disabled');
        return;
    }
    
    if(originalurl.val().substring(0, 3) == 'www')
    { 
        $('#error-text').html('* please enter http:// or https://');
        shortenbtn.removeAttr('disabled','disabled');
        return;
    }

    if (!checkURL(originalurl.val()))
    { 
        $('#error-text').html('* invalid URL');
        shortenbtn.removeAttr('disabled','disabled');
        return;
    }

    var data = {};
    data.url = originalurl.val();
    data = JSON.stringify(data);

    var promise = $.ajax({
        type:"POST",
        url: "/shorten",
        data: data,
        contentType:"application/json; charset=utf-8",
        dataType:"text"
    });
    $.when(promise).then(function(json){
        $('#error-text').html('');
        $("#original-url").val('');
        shortenbtn.removeAttr('disabled','disabled');
        loaddiv();
    });
});

$('#original-url').keyup(function(e){
    if (e.keyCode === 13) {
        $('#shorten-url').click();
    }
});

var loaddiv = function() {
    var request = new XMLHttpRequest();
    request.open('GET', "/list", true);
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
