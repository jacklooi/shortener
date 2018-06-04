$(document).ready(function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:4555', true);
    request.onload = function() {
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
});