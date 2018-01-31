        let geronimo;
        const topics = ["Horse", "Elephant", "Bear", "Mouse"];

        $(document).on("click", ".topic", displayTopicInfo);

        function displayTopicInfo() {

            const topic = $(this).attr("data-name");
            const queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=EEfRb0yIB7Bhbkgalf5ttuYCX2q4JwQr&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                geronimo = response;
                const topicDiv = $("<div>");

                for (var i = 0; i < response.data.length; i++) {

                    const imgURL = response.data[i].images.fixed_height_still.url;
                    const imgURL2 = response.data[i].images.fixed_height.url;

                    const image = $("<img>").attr("src", imgURL);
                    image.addClass("stillImage");
                    image.attr("id", topic + i + "still");
                    image.attr("dataInfo", topic + i);
                    topicDiv.append(image);

                    const image2 = $("<img>").attr("src", imgURL2);
                    image2.addClass("moveImage");
                    image2.attr("id", topic + i + "move");
                    image2.attr("dataInfo", topic + i);
                    topicDiv.append(image2);
                };

                $("#topics-view").prepend(topicDiv);
                $(".moveImage").hide();

            });


        }

        // Function for displaying topic data
        function renderButtons() {

            // Deleting the topics prior to adding new topics
            // (this is necessary otherwise you will have repeat buttons)
            $("#buttons-view").empty();

            // Looping through the array of topics
            for (let i = 0; i < topics.length; i++) {

                // Then dynamicaly generating buttons for each topic in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                const a = $("<button>");
                // Adding a class of topic to our button
                a.addClass("topic");
                // Adding a data-attribute
                a.attr("data-name", topics[i]);
                // Providing the initial button text
                a.text(topics[i]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);
            }
        }

        // This function handles events where a topic button is clicked
        $("#add-topic").on("click", function(event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            const topic = $("#topic-input").val().trim();

            // Adding topic from the textbox to our array
            topics.push(topic);

            // Calling renderButtons which handles the processing of our topic array
            renderButtons();
        });

        // Calling the renderButtons function to display the intial buttons

        renderButtons();

        $(document).on("click", ".stillImage", function(event) {
            geronimo = event;
            stillImageId = '#' + event.target.attributes.dataInfo.value + "still";
            moveImageId = '#' + event.target.attributes.dataInfo.value + "move";
            $(stillImageId).hide();
            $(moveImageId).show();
        });

        $(document).on("click", ".moveImage", function(event) {
            stillImageId = '#' + event.target.attributes.dataInfo.value + "still";
            moveImageId = '#' + event.target.attributes.dataInfo.value + "move";
            $(moveImageId).hide();
            $(stillImageId).show();
        });