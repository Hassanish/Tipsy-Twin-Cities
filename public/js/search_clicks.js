// Handle the clicks of the "submit" button on the form 
// and the click of the restaurants that show up on submit

$(function () {
    
    // On the click of the submit button of the form... 
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        $("#resultsDiv").empty()
        // Grab info from the search...
        var dealType = $("#deal_type").val();
        var currentDay = moment().format('dddd');
        var startTime = $("#start_time").val();

        // Set the information that we want to send to the API....
        var searchInfo = {
            deal_type: dealType,
            day: currentDay,
            start_time: startTime
        };
        // Send the GET request to DEALS
        $.ajax("/api/deals/search", {
            type: "GET",
            data: searchInfo
        }).then(
            function (results) {
                console.log("Searched for the following: ", searchInfo);
                console.log("results arry of objs: ", results)
                for (var i = 0; i < results.length; i++) {
                    //div to hold info for each result returned
                    var eachResult = $("<div>")
                    eachResult.addClass("card m-4")
                    //element for restuarant title
                    var restaurantName = $("<h5>")
                    restaurantName.addClass("card-header")
                    restaurantName.text(results[i].Restaurant.restaurant_name)
                    eachResult.append(restaurantName)
                    //div for deal info
                    var dealInfo = $("<div>")
                    dealInfo.addClass("card-text text-center p-2")
                    //day
                    var dealDay = $("<p>")
                    dealDay.text("Day : " + results[i].day)
                    dealInfo.append(dealDay)
                    //starts
                    var start = $("<p>")
                    start.text("Starts at: " + results[i].start_time)
                    dealInfo.append(start)
                    //ends
                    var end = $("<p>")
                    end.text("Ends at: " + results[i].end_time)
                    dealInfo.append(end)
                    //type
                    var type = $("<p>")
                    type.text("What I am getting a deal on: " + results[i].deal_type)
                    dealInfo.append(type)
                    //description
                    var description = $("<p>")
                    description.text("What exactly is this deal? " + results[i].deal_description)
                    dealInfo.append(description)
                    //restrictions
                    var restriction = $("<p>")
                    restriction.text("Restrictions: " + results[i].restrictions)
                    dealInfo.append(restriction)
                    //button to more details
                    var detailsLink = $("<a>")
                    detailsLink.attr("href", "/restaurant/"+results[i].Restaurant.id)
                    detailsLink.attr("restaurant-id", results[i].Restaurant.id)
                    detailsLink.addClass("moreDetails btn btn-lrg btn-outline-dark")
                    detailsLink.text("I WANNA GO HERE")
                    dealInfo.append(detailsLink)
              

                    //append results to html
                    eachResult.append(dealInfo)
                    $("#resultsDiv").append(eachResult)


                }

            }
        )

    })


})