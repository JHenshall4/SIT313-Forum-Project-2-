// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        // 21 Begun updating javascript in accordance to new database

        // TODO: Read local account information file.

        // Load local storage
        var _userName = window.localStorage['_userName'];
        var _accessLevel = window.localStorage['_accessLevel'];

        // Global variables
        var category = "";
        var _TopicIDreply = "";

        //Change background of profile div to users avatar
        $("#profilePicture_Account").css("background-image", "url(https://deakin-assignment.000webhostapp.com/userImages/" + _userName + ".png)");

        //Dynamically change username on account page
        $("#display_userName").text(_userName);

        //Hide unused Div elements by default 01/08/17
        $("#account").hide();
        $("#search").hide();
        $("#trending").hide();
        $("#topic").hide();
        $("#threads").hide();
        $("#legal").hide();
        $("#newThread").hide();
        $("#newReply").hide();
        $("#account_loggedin").hide();
        // Set selected element as bold, set others as normal
        $("#main_btn").css("font-weight", "bold");
        $("#trending_btn").css("font-weight", "normal");
        $("#account_btn").css("font-weight", "normal");
        $("#search_btn").css("font-weight", "normal");
       

        //Update to code structure in assignment 2 --> Create event listeners for clicks to run functions (rather than encoding functions into the clicks)
        $("#account_btn").click(accountPage);
        $("#main_btn").click(mainPage);
        $("#Outdoors, #Technology, #Household, #Kids, #Hobbies, #FoodandDrink, #FixIt, #Gifts, #Science, #Miscellaneous").click(Forum);
        $("#trending_btn").click(trendingPage);
        $("#search_btn").click(searchPage);
        $("#logo").click(Legal);
        $("#newThread_btn").click(newThread);
        $("#postThread_btn").click(PostThread);
        $("#postReply").click(newReply);
        $("#postReply_btn").click(PostReply); 
        $("#login_Button").click(login);
        $("#profilePicture_Account").click(uploadImage);
        $("#logout").click(logout);
        $("#updateSignature").click(updateSignature);

        //Rich Text
        $("#tool_Bold").click(text_bold);
        $("#tool_Underline").click(text_underline);
        $("#tool_Italics").click(text_italics);
        $("#tool_Bullets").click(text_bullets);
        $("#tool_Heading").click(text_heading);
        $("#tool_Image").click(text_Image);

        $("#tool_BoldR").click(text_bold);
        $("#tool_UnderlineR").click(text_underline);
        $("#tool_ItalicsR").click(text_italics);
        $("#tool_BulletsR").click(text_bullets);
        $("#tool_HeadingR").click(text_heading);
        $("#tool_ImageR").click(text_Image);

        //Emoji
        $("#smile_tool").click(smile);
        $("#cry_tool").click(cry);
        $("#thinking_tool").click(think);
        $("#angry_tool").click(angry);
        $("#screaming_tool").click(screaming);

        $("#smile_toolR").click(smile);
        $("#cry_toolR").click(cry);
        $("#thinking_toolR").click(think);
        $("#angry_toolR").click(angry);
        $("#screaming_toolR").click(screaming);

        // Below are the functions for the lower menu buttons.
        //Run this when ACCOUNT button is clicked.
        function accountPage() {
            // Check if user is logged in or not
            if (_userName === "undefined" || _userName === undefined || _userName === 0 || _userName === null || _userName === "")
            {
                $("#account_loggedin").hide();
                $("#account").show();

            }
            else 
            {
                $("#account_loggedin").show();
                $("#profilePicture_Account").css("background-image", "url(https://deakin-assignment.000webhostapp.com/userImages/" + _userName + ".png)");
                $("#account").hide();
                getSignature();
                getPosts(_userName);
            }

            //Hide other elements
            $("#boardindex").hide();
            $("#legal").hide();
            $("#search").hide();
            $("#trending").hide()
            $("#topic").hide();
            $("#threads").hide();
            $("#newThread").hide();
            $("#newReply").hide();
            $("#account_btn").css("font-weight", "bold");
            $("#trending_btn").css("font-weight", "normal");
            $("#main_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");
        };

        //Signature functions - Limiting characters in content editable taken from: https://stackoverflow.com/questions/2867479/limiting-number-of-characters-in-a-contenteditable-div
        var content_id = 'account_signature';
        var max = 50;
        //binding keyup/down events on the contenteditable div
        $('#' + content_id).keyup(function (e) { check_charcount(content_id, max, e); });
        $('#' + content_id).keydown(function (e) { check_charcount(content_id, max, e); });

        function check_charcount(content_id, max, e) {
            if (e.which !== 8 && $('#' + content_id).text().length > max) {
                e.preventDefault();
            }
        }

        //get users posts
        function getPosts(username)
        {
            var user = username;
            $.ajax({
                type: 'POST',
                url: 'https://deakin-assignment.000webhostapp.com/accountThreads.php',
                data: ({ user: user }),
                success: function (data) {
                    $("#account_recentPosts").html(data);
                },
                error: function (serverError) {
                    alert("Error connecting to the server. Please check your internet connction or try again later");
                }
            });

            return null;
        };


        function updateSignature()
        {
            //Get the contents of the signature and run it through BBcode parser to prevent malicious HTML and enable BBCode in signatures.
            var Signature = $("#account_signature").text();
            Signature = bbCode(Signature);

            //Add the signature to the users database
            $.ajax({
                type: 'POST',
                url: 'https://deakin-assignment.000webhostapp.com/updateSignature.php',
                data: ({ username: _userName, signature: Signature }),
                success: function (data) {
                },
                error: function (serverError) {
                    alert("Error connecting to the server. Please check your internet connction or try again later");
                }
            }); 
        }

        function getSignature()
        {
            $.ajax({
                type: 'POST',
                url: 'https://deakin-assignment.000webhostapp.com/getSignature.php',
                data: ({ username: _userName }),
                success: function (data) {
                    $("#account_signature").text(data);

                },
                error: function (serverError) {
                    alert("Error connecting to the server. Please check your internet connction or try again later");
                }
            });
        }

        //Run this when MAIN button is clicked
        function mainPage() {
            // Show the board index page
            $("#boardIndex").show()
            //Hide other elements
            $("#account").hide();
            $("#account_loggedin").hide();
            $("#legal").hide();
            $("#search").hide();
            $("#trending").hide()
            $("#topic").hide();
            $("#threads").hide();
            $("#newThread").hide();
            $("#newReply").hide();
            $("#main_btn").css("font-weight", "bold");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");
        };

        // Below are the functions for board index navigation

        // Functions for topics -- Here are the functions to import the CSV file, filter the correct items and display them where needed
        // Solution developed 03/08/17 -- Updates content based on clicking the category.
        function Forum() {

            // Hide necessary elements and show topic page
            $("#boardIndex").hide();
            $("#legal").hide();
            $("#account").hide();
            $("#account_loggedin").hide();
            $("#search").hide();
            $("#trending").hide();
            $("#topic").show();
            $("#threads").hide();
            $("#newThread").hide();
            $("#newReply").hide();
            $("#main_btn").css("font-weight", "bold");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");

            // Identify which category fired the event
            category = event.target.id;
            var counter = 0;

            // Hide the create thread button if the user is not logged in or if their access level is insufficient (banned maybe?)
            if (_userName === "" || _accessLevel === 0 || _accessLevel === null || _accessLevel === "" || _accessLevel === undefined) {
                $("#newThread_btn").hide();
            }
            else
            {
                $("#newThread_btn").show();
            }
                
            // Modify header
            $("#topicHeader").text(category);

            // Below code is useless due to assignment 2 now accessing a database rather than reading from a csv file.
            // Instead, we will call a PHP file and have the PHP file do all the work for us.

            // Call AJAX script to access PHP file -- We will need to parse the category to return results only from the selected category.
            $.ajax({
                type: 'POST',
                url: 'https://deakin-assignment.000webhostapp.com/getThreads.php',
                data: ({ displayCategory: category }),
                success: function (data) {
                $("#TopicList").html(data);
                topicSelection();
                },
                error: function (serverError) {
                    alert("Error connecting to the server. Please check your internet connction or try again later");
                }
            });           

        };

        //Run this when the TRENDING button is clicked
        function trendingPage() {
            // Show the trending page
            $("#trending").show()
            //Hide other elements
            $("#boardindex").hide();
            $("#account").hide();
            $("#account_loggedin").hide();
            $("#legal").hide();
            $("#search").hide();
            $("#topic").hide();
            $("#threads").hide();
            $("#newThread").hide();
            $("#newReply").hide();
            $("#trending_btn").css("font-weight", "bold");
            $("#main_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");

            $.ajax({
                type: 'POST',
                url: 'https://deakin-assignment.000webhostapp.com/new.php',
                data: ({ displayCategory: category }),
                success: function (data) {
                    $("#trendingResults").html(data);
                    $("#trendingTable").show();
                },
                error: function (serverError) {
                    alert("Error connecting to the server. Please check your internet connction or try again later");
                }
            });           

        };

        // Search function

        // First we must create a table with all posts (hide those which overflow)

        //Run this when SEARCH button is clicked
       function searchPage() {
            // Show the search page
            $("#search").show()
            //Hide other elements
            $("#boardindex").hide();
            $("#account").hide();
            $("#account_loggedin").hide();
            $("#trending").hide();
            $("#legal").hide();
            $("#topic").hide();
            $("#threads").hide();
            $("#newThread").hide();
            $("#newReply").hide();
            $("#search_btn").css("font-weight", "bold");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#main_btn").css("font-weight", "normal");

            $.ajax({
                type: 'POST',
                url: 'https://deakin-assignment.000webhostapp.com/search.php',
                data: ({ }),
                success: function (data) {
                    $("#SearchResults").html(data);
                    topicSelection();
                },
                error: function (serverError) {
                    alert("Error connecting to the server. Please check your internet connction or try again later");
                }
            });  
        };

        // Hide /show search results based on searchbox input.
        $("#searchbar").keyup( function searchFunction()
        {
            var input;
            var filter;
            input = $("#searchbar");
            filter = input.val().toUpperCase();
            // Put all divs in an array
            var divs = $('.testList');


            // if searchbox value matches content show, otherwise hide.
            for (var i = 0; i < divs.length; i++)
            {
                // convert content to uppercase temporarily
                var temp = divs[i];
                temp = temp.textContent.toUpperCase();
                // Check search contents against content of all divs
                if (temp.match(filter))
                {
                    divs[i].style.display = "";
                } else
                {
                    divs[i].style.display = "none";
                }
            }


        });


        // View threads functions 
        // Create event listener for click on topic -- We will use this to fill the topic variable
        //Solution modified from my SIT321 table database javascript.

        var topic = "";
        function topicSelection(){
            var cells = document.getElementsByClassName("forumDivContainer");
            try {

                for (var i = 0; i <= cells.length; i++) {
                    cells[i].addEventListener("click", clickHandler);
                }
            }
            catch (err)
            {
                //Nothing to do here, it works but throws an error.
            }

            function clickHandler() {
                var urlText = (this.id);
                topic = urlText;

                if (topic !== null || topic !== "") {
                    $("#boardindex").hide();
                    $("#account").hide();
                    $("#trending").hide();
                    $("#topic").hide();
                    $("#search").hide();
                    $("#legal").hide();
                    $("#newThread").hide();
                    $("#newReply").hide();
                    $("#threads").show();
                    

                    // Import the thread database
                    $.ajax({
                        type: 'POST',
                        url: 'https://deakin-assignment.000webhostapp.com/viewThread.php',
                        data: ({ _topicID: topic }),
                        success: function (data) {
                            var ForumThread = $.parseJSON(data);
                            //Append the appropriate code which we used in assignment one, instead now using our db data

                            $("#topic_title").html('<b> ' + ForumThread[0] + '</b>');
                            $("#topic_title").append('<br/><p style="font-size: 10px"> By - ' + ForumThread[1] + '</p>');
                            $("#ThreadOP").html(ForumThread[2]/* + '<div class="theLine3"></div>'*/);
                        },
                        error: function (serverError) {
                            alert("Error connecting to the server. Please check your internet connction or try again later");
                        }
                    });

                    // Import corresponding comments (based off TopicID)

                    $.ajax({
                        type: 'POST',
                        url: 'https://deakin-assignment.000webhostapp.com/viewComments.php',
                        data: ({ _topicID: topic }),
                        success: function (data) {

                            $("#comments").html(data);
                            //Set the name of the reply button to the topic ID so we can refer to it later.
                            $("#postReply").attr('name', topic);

                            //Append edit button if user is author.
                            $("#" + _userName).append("<div id='edit' class='edit'>&#x270F</div>");

                            //Create click after the div is created
                            $("#edit").click(editPost);

                            //put edit post stuff here

                        }
                    })

                    
                }
            }
        
        };

        //quick fix to allow user to login with enter key.
        $("#pword").keydown(function (e)
        {
            if (e.keyCode === 13)
            {
                login();
            }
        });


        function editPost()
        {
            var postID = $(event.target).parent().parent().attr('id');
            $("#" + postID + "edit").attr('contenteditable', 'true');
            $("#" + postID + "edit").css("border", "1px solid");
            $("#" + postID + "edit").css("border-color", "yellow");


            //On enter key press, disable content editable.
            $("#" + postID + "edit").keydown(function (e)
            {
                if (e.keyCode === 13)
                {
                    $("#" + postID + "edit").attr('contenteditable', 'false');
                    $("#" + postID + "edit").css("border", "none");

                    var editedContent = $("#" + postID + "edit").text();
                    editedContent = bbCode(editedContent);
                    // Run ajax to edit the post
                    $.ajax({
                        type: 'POST',
                        url: 'https://deakin-assignment.000webhostapp.com/editPost.php',
                        data: ({ edit: editedContent, postID: postID }),
                        success: function (data) {
                            //TODO: Take the user to the new post!
                        },
                        error: function (serverError) {
                            alert("Error connecting to the server. Please check your internet connction or try again later");
                        }
                    });
                }
            });

        }

        //Legal page
        function Legal() {

            // Hide necessary elements and show legal page
            $("#boardIndex").hide();
            $("#account").hide();
            $("#account_loggedin").hide();
            $("#search").hide();
            $("#trending").hide();
            $("#legal").show();
            $("#threads").hide();
            $("#newThread").hide();
            $("#newReply").hide();
            $("#main_btn").css("font-weight", "normal");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");


        };

        //Creating a new thread
        function newThread() {

            // Hide necessary elements and show thread creation page
            $("#boardIndex").hide();
            $("#account").hide();
            $("#account_loggedin").hide();
            $("#search").hide();
            $("#trending").hide();
            $("#legal").hide();
            $("#threads").hide();
            $("#newThread").show();
            $("#newReply").hide();
            $("#main_btn").css("font-weight", "normal");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");

            //Category = Category user clicked new thread from.
            $("#newThreadCategory").text("Topic: " + category);

        };

        //When the user clicks the post button
        // Currently this makes it so the user can only create one thread per session.
        // There is definitely a way to unbind this button so it's usable after a certain period of time but the code is very messy so we have left it out for now.

        function PostThread() {

            //Store the user input into variables -- First we need to parse these values to ensure fields are not empty.
            var newForumTitle = $("#newThreadTitle").val(); // This needs to be value not text as we want the VALUE the user inputs.
            var newForumPost = $("#richTextPost").text();

            if (newForumTitle === "" || newForumTitle === null || newForumPost === "" || newForumPost === "") {
                alert("Please enter a thread title and/or post contents");
            }


            else {

                newForumPost = bbCode(newForumPost);
                //Access the PHP file which will add the post contents to the database.
                $.ajax({
                    type: 'POST',
                    url: 'https://deakin-assignment.000webhostapp.com/createThread.php',
                    data: ({ title: newForumTitle, post: newForumPost, threadCategory: category, _user: _userName }),
                    success: function (data) {
                        $("#newThreadTitle").val("");
                        $("#richTextPost").text("");

                        //TODO: Take the user to the new post!
                    },
                    error: function (serverError) {
                        alert("Error connecting to the server. Please check your internet connction or try again later");
                    }
                });
            }

        };


        //****************************************************************************************************************************************************************************************//
        //  Copying the code used to create a thread for replies. ALL my code should be condenced a lot further if I have time. Probably less than 500 lines total.                                //
        //****************************************************************************************************************************************************************************************//

        //Creating a reply
       function newReply() {

            // Hide necessary elements and show thread creation page
            $("#boardIndex").hide();
            $("#account").hide();
            $("#account_loggedin").hide();
            $("#search").hide();
            $("#trending").hide();
            $("#legal").hide();
            $("#threads").hide();
            $("#newThread").hide();
            $("#newReply").show();
            $("#main_btn").css("font-weight", "normal");
            $("#trending_btn").css("font-weight", "normal");
            $("#account_btn").css("font-weight", "normal");
            $("#search_btn").css("font-weight", "normal");

            // Get the Topic ID we're replying to
             _TopicIDreply = $("#postReply").attr('name');

            //ajax query server to get postname of the topic ID
            $.ajax({
                type: 'POST',
                url: 'https://deakin-assignment.000webhostapp.com/getTopic.php',
                data: ({ topicID: _TopicIDreply }),
                success: function (data) {
                    $("#topic_title_reply").html(data);
                },
                error: function (serverError) {
                    alert("Error connecting to the server. Please check your internet connction or try again later");
                }
            });

        };

        //When the user clicks the post button
        // Currently this makes it so the user can only post one reply per session.
        // There is definitely a way to unbind this button so it's usable after a certain period of time but the code is very messy so we have left it out for now.

        function PostReply() {

            //Store the user input into variables -- First we need to parse these values to ensure fields are not empty.
            var newForumReply = $("#richTextPostReply").text();

            if (newForumReply === "" || newForumReply === null) {
                alert("You cannot submit an empty reply.");
            }

            else {

                //Parse the users post through our BBCode to HTML script
                newForumReply = bbCode(newForumReply);
                //Access the PHP file which will add the post contents to the database.
                $.ajax({
                    type: 'POST',
                    url: 'https://deakin-assignment.000webhostapp.com/createReply.php',
                    data: ({ topicID: _TopicIDreply, author: _userName, reply: newForumReply }),
                    success: function (data) {

                        $("#richTextPostReply").text("");
                        //TODO: Take the user to the new post!
                    },
                    error: function (serverError) {
                        alert("Error connecting to the server. Please check your internet connction or try again later");
                    }
                });
            }

        };


        //Run this when the user attempts to login to their account
       function login() {
            // We spent a VERY long time trying to come up with work-arounds for access origin issues, although it turns out Deakin public HTML does not allow
            // cross domain scripts, therefore we are using a public/free webhosting to host our PHP script which will communicate with the deakin oracle service.

            // Grab the login variables FIRST -- Incase the user is able to change the field values before the request processes which could cause issues.
            // We need to take this procedure because we have to use a work-around for form submission.
            var test_username = $("#uname").val();
            var test_password = $("#pword").val();

            $.ajax({
                type: 'POST', 
                // Login information for the database: 
                // Website = deakin - assignment
                // Password = lol987
                // Database info here: https://puu.sh/xF6FL/f9d61afbf8.png
                url: 'https://deakin-assignment.000webhostapp.com/Accounts.php',
                data: ({uName: test_username, pWord: test_password}),
                success: function (data) {
                    // If there is an invalid login - Clear the user/password fields
                    if (data === "Sorry, invalid username or password" || data === "Invalid Password" || data === "Invalid Username") //Invalid username shouldn't ever exist but its there as a precaution
                    {
                        $("#uname").val("");
                        $("#pword").val("");
                        alert(data);
                    } else

                    //If we are able to successfully login, we need to log into the account.
                        if (data === "1" || data === "2")
                    {
                            // We now need to locally store the user account information and access level. This will be done in a single .txt file with a custom delimiter (,,,**,)
                            // We also need to load the account information into the appropriate variables.
                            _userName = test_username;
                            _accessLevel = data;

                            //add to local storage
                            window.localStorage['_userName'] = _userName;
                            window.localStorage['_accessLevel'] = _accessLevel

                            //Take the user to their account page
                            $("#display_userName").text(_userName);
                            $("#account_loggedin").show();
                            $("#account").hide();

                            //Reload account page
                            $("#uname").val("");
                            $("#pword").val("");
                            accountPage();
                            
                    }


                },
                // Due to using free file hosting, there's a lot of downtime with the service. This error notifies the user that there is a problem connecting to the server.
                error: function (serverError) {
                    alert("Error connecting to the server. Please check your internet connction or try again later");
                    // Clear password field as a security precaution
                    $("#pword").val("");

                }, timeout: 30000
            });
        };


        //We created a javascript parser in order to parse BBcode (Which the user will use to format their forum posts) into HTML. We modified code found
        // To disable the user of adding additional HTML tags, naming elements and stying them.
        //Original code modified from: https://stackoverflow.com/questions/9210680/convert-bbcode-to-html-using-javascript-jquery

        function bbCode(bbCodeString) {

            var $str = bbCodeString;

            // The array of regex patterns to look for
            var $format_search = [
                /<(.*?)/ig,
                />(.*?)/ig,
                /"(.*?)/ig,
                /'(.*?)/ig,
                /\[img\](.*?)\[\/img\]/ig,
                /\[ul\](.*?)\[\/ul\]/ig,
                /\[li\](.*?)\[\/li\]/ig,
                /\[h\](.*?)\[\/h\]/ig,
                /\[b\](.*?)\[\/b\]/ig,
                /\[i\](.*?)\[\/i\]/ig,
                /\[u\](.*?)\[\/u\]/ig

            ];

            // The matching array of strings to replace matches with
           var $format_replace = [
                '&lt;',
                '&gt;',
                '&quot;',
               '&apos;',
               '<div class="imgpostContainer" style="background-image: url($1)"></div>',
               '<ul>$1</ul>',
               '<li>$1</li>',
                '<h3>$1</h3>',
                '<b>$1</b>',
                '<i>$1</i>',
                '<u>$1</u>'
            ];

            // Perform the actual conversion
            for (var i = 0; i < $format_search.length; i++) {
                $str = $str.replace($format_search[i], $format_replace[i]);
            }
            return $str;

        };

        //Allow user to upload their own image as account profile picture.
        function uploadImage() {

            cameraGetPicture();

            function cameraGetPicture() {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    targetWidth: 10,
                    targetHeight: 10
                });

                function onSuccess(imageURL) {
                    //Upload the file

                    $.ajax({
                        type: 'POST',
                        url: 'https://deakin-assignment.000webhostapp.com/uploadAvatar.php',
                        data: ({ img: imageURL, user: _userName }),
                        success: function (data) {
                            ("#account").hide;
                            accountPage();
                            $("#profilePicture_Account").css("background-image", "url(https://deakin-assignment.000webhostapp.com/userImages/" + _userName + ".png)");
                        },
                        error: function (serverError) {
                            alert("Error connecting to the server. Please check your internet connction or try again later");
                        }
                    });

                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }

            }


        };

        //Creating functions for each of the rich text tools

        function text_bold() {
            if ($("#richTextPost").is(":visible"))
            {
                $("#richTextPost").text($("#richTextPost").text() + "[b] [/b]");
            }
            else if ($("#richTextPostReply").is(":visible"))
            {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "[b] [/b]");
            }
            
        };

        function text_underline() {
            if ($("#richTextPost").is(":visible"))
            {
                $("#richTextPost").text($("#richTextPost").text() + "[u] [/u]");
            }

            else if ($("#richTextPostReply").is(":visible"))
            {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "[u] [/u]");
            }
            
        };

        function text_italics() {
            if ($("#richTextPost").is(":visible"))
            {
                $("#richTextPost").text($("#richTextPost").text() + "[i] [/i]");
            }
            else if ($("#richTextPostReply").is(":visible"))
            {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "[i] [/i]");
            }
            
        };

        function text_bullets() {
            if ($("#richTextPost").is(":visible"))
            {
                $("#richTextPost").text($("#richTextPost").text() + "[ul][li] [/li][/ul]");
            }
            else if ($("#richTextPostReply").is(":visible"))
            {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "[ul][li] [/li][/ul]");
            }
        };

        function text_heading() {
            if ($("#richTextPost").is(":visible"))
            {
                $("#richTextPost").text($("#richTextPost").text() + "[h] [/h]");
            }
            else if ($("#richTextPostReply").is(":visible"))
            {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "[h] [/h]");
            }
            
        };

        function text_Image() {
            if ($("#richTextPost").is(":visible")) {
                $("#richTextPost").text($("#richTextPost").text() + "[img] [/img]");
            }
            else if ($("#richTextPostReply").is(":visible")) {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "[img] [/img]");
            }

        };

        //Creating functions for my emoji tools

        function smile() {
            if ($("#richTextPost").is(":visible")) {
                $("#richTextPost").text($("#richTextPost").text() + "&#x1F60A");
            }
            else if ($("#richTextPostReply").is(":visible")) {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "&#x1F60A");
            }

        };

        function cry() {
            if ($("#richTextPost").is(":visible")) {
                $("#richTextPost").text($("#richTextPost").text() + "&#x1F622");
            }

            else if ($("#richTextPostReply").is(":visible")) {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "&#x1F622");
            }

        };

        function think() {
            if ($("#richTextPost").is(":visible")) {
                $("#richTextPost").text($("#richTextPost").text() + "&#x1F914");
            }
            else if ($("#richTextPostReply").is(":visible")) {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "&#x1F914");
            }

        };

        function angry() {
            if ($("#richTextPost").is(":visible")) {
                $("#richTextPost").text($("#richTextPost").text() + "&#x1F621");
            }
            else if ($("#richTextPostReply").is(":visible")) {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "&#x1F621");
            }
        };

        function screaming() {
            if ($("#richTextPost").is(":visible")) {
                $("#richTextPost").text($("#richTextPost").text() + "&#x1F631");
            }
            else if ($("#richTextPostReply").is(":visible")) {
                $("#richTextPostReply").text($("#richTextPostReply").text() + "&#x1F631");
            }

        };

        function logout()
        {
            window.localStorage.clear(_userName);
            window.localStorage.clear(_accessLevel);
            _userName = window.localStorage['_userName'];
            _accessLevel = window.localStorage['_acessLevel'];
            accountPage();
        };


        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();