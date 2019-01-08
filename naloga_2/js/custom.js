//Making document ready
$(document).ready(function() {
    $("#addNew").on('click', function () {
       $("#tableManager").modal('show');
    });

    $("#tableManager").on('hidden.bs.modal', function () {
       $("#showContent").fadeOut();
       $("#editContent").fadeIn();
       $("#editRowID").val(0);
       $("#season").val("");
       $("#price").val("");
       $("#name").val("");
       $("#closeBtn").fadeOut();
       $("#manageBtn").attr('value', 'Add New').attr('onclick', "manageData('addNew')").fadeIn();
    });

    getExistingData(0, 50);
});

//Deleting data
function deleteRow(rowID) {
    if (confirm('Are you sure? This will permanently delete data from database.')) {
        $.ajax({
            url: 'ajax.php',
            method: 'POST',
            dataType: 'text',
            data: {
                key: 'deleteRow',
                rowID: rowID
            }, success: function (response) {
                $("#country_"+rowID).parent().remove();
                alert(response);
            }
        });
    }
}

//Viewing or Editing data
function viewORedit(rowID, type) {
    $.ajax({
        url: 'ajax.php',
        method: 'POST',
        dataType: 'json',
        data: {
            key: 'getRowData',
            rowID: rowID
        }, success: function (response) {
            if (type == "view") {
                $("#showContent").fadeIn();
                $("#editContent").fadeOut();
                $("#seasonView").html(response.season);
                $("#priceView").html(response.price);
                $("#manageBtn").fadeOut();
                $("#closeBtn").fadeIn();
            } else {
                $("#editContent").fadeIn();
                $("#editRowID").val(rowID);
                $("#showContent").fadeOut();
                $("#season").val(response.season);
                $("#price").val(response.price);
                $("#name").val(response.name);
                $("#closeBtn").fadeOut();
                $("#manageBtn").attr('value', 'Save Changes').attr('onclick', "manageData('updateRow')");
            }

            $(".modal-title").html(response.name);
            $("#tableManager").modal('show');
        }
    });
}

//Getting data
function getExistingData(start, limit) {
    $.ajax({
        url: 'ajax.php',
        method: 'POST',
        dataType: 'text',
        data: {
            key: 'getExistingData',
            start: start,
            limit: limit
        }, success: function (response) {
            if (response != "reachedMax") {
                $('tbody').append(response);
                start += limit;
                getExistingData(start, limit);
            } else
                $(".table").DataTable();
        }
    });
}

//Managing data
function manageData(key) {
    var name = $("#name");
    var price = $("#price");
    var season = $("#season");
    var editRowID = $("#editRowID");

    if (isNotEmpty(name) && isNotEmpty(price) && isNotEmpty(season)) {
        $.ajax({
           url: 'ajax.php',
           method: 'POST',
           dataType: 'text',
           data: {
               key: key,
               name: name.val(),
               price: price.val(),
               season: season.val(),
               rowID: editRowID.val()
           }, success: function (response) {
               if (response != "success")
                   alert(response);
               else {
                   $("#country_"+editRowID.val()).html(name.val());
                   name.val('');
                   price.val('');
                   season.val('');
                   $("#tableManager").modal('hide');
                   $("#manageBtn").attr('value', 'Add').attr('onclick', "manageData('addNew')");
               }
           }
        });
    }
}

function isNotEmpty(caller) {
    if (caller.val() == '') {
        caller.css('border', '1px solid red');
        return false;
    } else
        caller.css('border', '');

    return true;
}