"use strict";

function createOctocat(image, name, submitter) {
    return "<div class='col-md-6 col-lg-4 masonry-column'><a class='thumbnail' data-toggle='modal' data-image='" + image + "' data-name='" + name + "' data-submitter='" + submitter + "'><img src='https://api.custocat.com/image/" + image + "'></a><span class='pull-left'>" + name + "</span><span class='pull-right'>By: " + submitter + "</span></div>";
}

function getOctocats() {
    $.ajax({
        url: "https://api.custocat.com/images/all",
        method: "get",
        success: function success(res) {
            $('#images').empty();
            console.log(res);
            $.each(res, function (i, octocat) {
                $('#images').append(createOctocat(octocat.id, octocat.name, octocat.submitter));
            });
        },
        error: function error(err) {
            console.log(err);
            $('#images').html("An unknown error occured. Try refresshing the page.");
        }
    });
}

getOctocats();