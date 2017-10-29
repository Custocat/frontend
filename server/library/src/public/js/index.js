function createOctocat(image, name, submitter) {
    return "<div class='item'><div class='octocat'><img src='https://api.custocat.com/image/" + image + "'></div></div>"
}

function getOctocats() {
    $.ajax({
        url: "https://api.custocat.com/images/all",
        method: "get",
        success: function(res) {
            $('#images').empty()
            res.each(function(octocat) {
                $('#images').append(createOctocat(octocat.id, octocat.name, octocat.submitter))
            })
        },
        error: function(err) {
            console.log(err)
            $('#images').html("An unknown error occured. Try refresshing the page.")
        }
    })
}

getOctocats()