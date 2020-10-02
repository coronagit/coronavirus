/* Copyright(C) Colaberry, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Author: Colaberry Inc, March 2016
*/


(function () {
    "use strict";
    angular.module("app.controllers", ['ngRoute', 'pusher-angular', 'ngLetterAvatar']).controller("AppCtrl", ["$scope", "$pusher", "$routeParams", "$sce", "$window", "$location", "$http", "$rootScope", "logger", "common", "commonConfig", "datacontext", "$modal", "sharedProperties",
        function ($scope, $pusher, $routeParams, $sce, $window, $location, $http, $rootScope, logger, common, commonConfig, datacontext, $modal, sharedProperties) {

            var currentUrl = window.location.href;
            if (currentUrl.includes("/chatdirect/")) {
                $scope.fromEmail = true;
            } else {
                $scope.fromEmail = false;
            }

            $scope.id = $("#hidUserId").val();
            $scope.isValidUser = true;
            $scope.isValidUser1 = true;
            $scope.questionViewMode = 'collapse'; // expand


            //var myApp = angular.module('myApp', ['infinite-scroll']);

            //myApp.controller('DemoController', function ($scope, GHRepo) {
            //    $scope.ghRepo = new GHRepo();
            //});

            //// Reddit constructor function to encapsulate HTTP and pagination logic
            //myApp.factory('GHRepo', function ($http) {
            //    var GHRepo = function () {
            //        this.repos = [];
            //        this.busy = false;
            //        this.page = 1
            //    };

            //    GHRepo.prototype.nextPage = function () {
            //        if (this.busy) return;
            //        this.busy = true;

            //        var url = "https://api.github.com/search/repositories?q=angular&page=" + this.page + "&per_page=50"
            //        $http.get(url).success(function (data) {
            //            var items = data.items;
            //            for (var i = 0; i < items.length; i++) {
            //                this.repos.push(items[i]);
            //            }
            //            this.page += 1
            //            this.busy = false;
            //        }.bind(this));
            //    };

            //    return GHRepo;
            //});

            $scope.sdatashow = false;
            //$scope.isChatPilotDev = function () {
            //    if (
            //        $scope.id == 26993 // Adalene1
            //        || $scope.id == 28707 // Merry.Ekpo
            //        || $scope.id == 29376 // Ramesh.Alla
            //        || $scope.id == 29668 // Josiane.DeBiyong2
            //    ) {
            //        $scope.isValidUser = true;
            //    }
            //    else {
            //        $scope.isValidUser = false;
            //    }
            //}

            //$scope.isChatPilotTest = function () {
            //    if (
            //        $scope.id == 26993 // Adalene1
            //        || $scope.id == 28707 // Merry.Ekpo
            //        || $scope.id == 32312 //  Venkat.Venkat
            //        || $scope.id == 32313 // Test.Student2
            //        || $scope.id == 32314 // Test.Student1
            //        || $scope.id == 32315 // Pradeep.Yadala
            //        || $scope.id == 32316  // Prakash.Doe
            //    ) {
            //        $scope.isValidUser = true;
            //    }
            //    else {
            //        $scope.isValidUser = false;
            //    }
            //}

            $scope.isChatPilotProd = function () {
                if (
                    //$scope.id == 30532 // Dergi Morka
                    //|| $scope.id == 30027 // Alexander Opiyo
                    //|| $scope.id == 29300 // Mittrone Mitti
                    //|| $scope.id == 30058 // Jacob Gbogbo
                    //|| $scope.id == 31241 // Obi Udenze
                    $scope.id == 182 // Ali
                    || $scope.id == 26993 // Adalene1
                    || $scope.id == 28707 //Merry
                    //|| $scope.id == 32886 // venkuwji
                    //|| $scope.id == 31881 // Student.Doe
                    //|| $scope.id == 30755 // jrp.student
                    //|| $scope.id == 33210 // kevin
                ) {
                    $scope.isValidUser1 = true;
                }
                else {
                    $scope.isValidUser1 = false;
                }
            }

            //$scope.isChatPilotDev();
            //$scope.isChatPilotTest();
            $scope.isChatPilotProd();


            //Get PusherInfo

            $http.get('/api/chat/pusherinfo').then(function (response) {

                $scope.PusherFRChannel = response.data.PusherFRChannel;
                $scope.PusherFRKey = response.data.PusherFRKey;
                $scope.PusherFRCluster = response.data.PusherFRCluster;

                //$scope.PusherFAChannel = response.data.PusherFAChannel;
                //$scope.PusherFAKey = response.data.PusherFAKey;
                //$scope.PusherFACluster = response.data.PusherFACluster;

                //$scope.PusherVCRChannel = response.data.PusherVCRChannel;
                //$scope.PusherVCRKey = response.data.PusherVCRKey;
                //$scope.PusherVCRCluster = response.data.PusherVCRCluster;

                $scope.TalkJSAppId = response.data.TalkJSAppId;

                //$scope.PusherGVCRChannel = response.data.PusherGVCRChannel;
                //$scope.PusherGVCRKey = response.data.PusherGVCRKey;
                //$scope.PusherGVCRCluster = response.data.PusherGVCRCluster;


                //$scope.PusherPresenceChannel = response.data.PusherPresenceChannel;
                //$scope.PusherPresenceKey = response.data.PusherPresenceKey;
                //$scope.PusherPresenceCluster = response.data.PusherPresenceCluster;



                //$scope.PusherPresenceChannel = response.data.PusherPresenceChannel;
                //$scope.PusherPresenceKey = response.data.PusherPresenceKey;
                //$scope.PusherPresenceCluster = response.data.PusherPresenceCluster;


                //$scope.PusherFRejectChannel = response.data.PusherFriendRejectChannel;
                //$scope.PusherFRejectKey = response.data.PusherFriendRejectKey;
                //$scope.PusherFRejectCluster = response.data.PusherFriendRejectCluster;

                // For UserPresence Starts
                Talk.ready.then(function () {
                    var me = new Talk.User({
                        id: $scope.id,
                        name: "test",
                        role: "Admin",
                        email: "test@trillionsquare.com",
                        photoUrl: "https://media-exp1.licdn.com/dms/image/C510BAQFQ5e5_rA2QAQ/company-logo_200_200/0?e=2159024400&v=beta&t=SdLSlpMdcS3_ecer_loCzimBs47S6dU4KZuHm4vaWl8",
                        welcomeMessage: "Hey there! How are you? :-)"
                    });

                    //fictitious user (9999) for userpresence concept
                    var other = new Talk.User({
                        id: 9999,
                        name: "test1",
                        role: "Admin",
                        email: "test1@trillionsquare.com",
                        photoUrl: "https://media-exp1.licdn.com/dms/image/C510BAQFQ5e5_rA2QAQ/company-logo_200_200/0?e=2159024400&v=beta&t=SdLSlpMdcS3_ecer_loCzimBs47S6dU4KZuHm4vaWl8",
                        welcomeMessage: "Hey, how can I help?"
                    });
                    window.talkSession = new Talk.Session({
                        appId: $scope.TalkJSAppId,
                        me: me
                    });

                    var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))

                    conversation.setParticipant(me);
                    conversation.setParticipant(other);

                    var inbox = talkSession.createInbox({ selected: conversation });
                    inbox.mount(document.getElementById("chatusers12"));
                });
                // For UserPresence Ends

                // FR - Friend Request
                var pusherFR = new Pusher($scope.PusherFRKey, {
                    cluster: $scope.PusherFRCluster,
                    encrypted: true
                });

                var channelFriendRequest = pusherFR.subscribe($scope.PusherFRChannel);
                channelFriendRequest.bind('asp-friendrequest', function (data) {

                    if (data.frienduserid == $scope.id) {
                        $.ajax({
                            url: '/api/notifications/user/' + $scope.id,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'Get',
                            success: function (data) {
                                $scope.main.notificationscount = Object.keys(data.notifications).length;
                                reloadAllData();
                                $scope.main.data = data;
                            }
                        });
                    }
                });

                var channelSingleChatNotifications = pusherFR.subscribe($scope.PusherFRChannel);
                channelSingleChatNotifications.bind('asp-singlechatrequest', function (data) {
                    if (data.frienduserid == $scope.id) {
                        $.ajax({
                            url: '/api/videochatnotifications/user/' + data.frienduserid,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'Get',
                            success: function (data) {
                                $scope.main.singlechatdata = data;
                                reloadAllData();
                                var n = Object.keys(data.videochatnotifications).length;
                                $scope.main.singlechatnotificationscount = n;
                            }
                        });
                    }
                });

                var channelQuestionSubscribe = pusherFR.subscribe($scope.PusherFRChannel);

                channelQuestionSubscribe.bind('asp-questionsubscribe', function (data) {

                    if (data.memberid == $scope.id) {
                        $.ajax({
                            url: '/api/notifications/user/' + $scope.id,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'Get',
                            success: function (data) {
                                $scope.main.notificationscount = Object.keys(data.notifications).length;
                                reloadAllData();
                                $scope.main.data = data;
                            }
                        });
                    }
                });

                var channelGroupMembers = pusherFR.subscribe($scope.PusherFRChannel);

                channelGroupMembers.bind('asp-groupmember', function (data) {

                    if (data.studentid == $scope.id) {
                        $.ajax({
                            url: '/api/notifications/user/' + $scope.id,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'Get',
                            success: function (data) {
                                $scope.main.notificationscount = Object.keys(data.notifications).length;
                                reloadAllData();
                                $scope.main.data = data;
                            }
                        });
                    }
                });

                var pusherpresencestatus = pusherFR.subscribe($scope.PusherFRChannel);
                pusherpresencestatus.bind('asp-login', function (data) {
                    var onlineStatusObj = $("#hidOnlineStatus" + data.userID);
                    // alert(onlineStatusObj)
                    if (onlineStatusObj != null && onlineStatusObj.length > 0) {
                        $("#hidOnlineStatus" + data.userID).css("color", "green");
                    }
                    var mylist = $('#divCBFriends');
                    var listitems = mylist.children("div");
                    listitems.sort(function (a, b) {
                        var mycircleA = $(a).find("i").css("color");
                        var mycircleB = $(b).find("i").css("color");
                        return (mycircleA == 'rgb(0, 128, 0)') ? -1 : 1;
                    })

                    $(mylist).append(listitems);
                });

                pusherpresencestatus.bind('asp-logout', function (data) {
                    var onlineStatusObj = $("#hidOnlineStatus" + data.userID);
                    if (onlineStatusObj != null && onlineStatusObj.length > 0) {
                        $("#hidOnlineStatus" + data.userID).css("color", "grey");
                    }
                });

                var channelGroupChatNotifications = pusherFR.subscribe($scope.PusherFRChannel);
                channelGroupChatNotifications.bind('asp-groupvideochatrequest', function (data) {

                    for (var i = 0; i < data.questionSubscribers.length; i++) {
                        //console.log(data.questionSubscribers[i]);
                        //alert(data.questionSubscribers[i]);
                        if (data.questionSubscribers[i] == $scope.id) {
                            $.ajax({
                                url: '/api/videochatnotifications/user/' + data.questionSubscribers[i],
                                cache: false,
                                contentType: false,
                                processData: false,
                                type: 'Get',
                                success: function (notificationsData) {
                                    $scope.main.singlechatdata = notificationsData; //though single, it is for both single and group
                                    reloadAllData();
                                    var n = Object.keys(notificationsData.videochatnotifications).length;
                                    $scope.main.singlechatnotificationscount = n; //though single, it is for both single and group
                                }
                            });
                        }
                    }
                });


                var channelFriendRequestReject = pusherFR.subscribe($scope.PusherFRChannel);
                console.log("pusher.subscribe to Android")
                console.log(channelFriendRequest);
                channelFriendRequestReject.bind('asp-friendrejected', function (data) {
                    //alert(data);
                    if (data.frienduserid == $scope.id) {
                        $.ajax({
                            url: '/api/notifications/user/' + $scope.id,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'Get',
                            success: function (data) {
                                $scope.main.notificationscount = Object.keys(data.notifications).length;
                                reloadAllData();
                                $scope.main.data = data;
                            }
                        });
                    }
                });

                var pusherAttendencepresencestatus = pusherFR.subscribe($scope.PusherFRChannel);
                pusherAttendencepresencestatus.bind('asp-attendance', function (data) {
                    // alert(data);
                    //console.log("Inside attendance");
                    if ($scope.classSignUpDetails.length > 0) {
                        //console.log(data.classID);
                        for (var i = 0; i < $scope.classSignUpDetails.length; i++) {
                            //console.log($scope.classSignUpDetails[i].classID);

                            if ($scope.classSignUpDetails[i].classID == data.classID) {
                                $http.post('/api/my/attendance/markAsPresent', { ClassSignUpsID: $scope.classSignUpDetails[i].ClassSignUpsID }).then(function (response) {
                                    if (response.data.status == "success") {
                                        $scope.attendance = response.data.attendance;
                                        common.logger.logSuccess("Congratulations you have been marked as present for the session");
                                    } else {
                                        $scope.attendance = response.data.attendance;
                                        common.logger.logError("Failed: " + response.data.message);
                                    }
                                });
                            }
                        }
                    }
                });


                var channelFriendRequestAccept = pusherFR.subscribe($scope.PusherFRChannel);
                channelFriendRequestAccept.bind('asp-friendaccept', function (data) {
                    console.log("channelFriendRequestAccept");
                    if (data.userid == $scope.id) {
                        $.ajax({
                            url: '/api/notifications/user/' + $scope.id,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'Get',
                            success: function (data) {
                                reloadAllData();
                                $scope.main.notificationscount = Object.keys(data.notifications).length;
                                $scope.main.data = data;
                            }
                        });

                    }
                });
            });

            //var pusherAttendencePresence = new Pusher($scope.PusherPresenceKey, {
            //    cluster: $scope.PusherPresenceCluster,
            //    encrypted: true
            //});



            ////Presence - User Logs in
            //var pusherAttendencePresence = new Pusher($scope.PusherPresenceKey, {
            //    cluster: $scope.PusherPresenceCluster,
            //    encrypted: true
            //});



            //alert("welcome to Chat");
            $scope.isAttachmentChoosen = false;
            function append_message2(message, id) {
                return '<p onclick="CrossNotification(' + id + ')" style="float:right;color:red;margin-left:100px;">x</p>' + '<p onclick="ReadNotification(' + id + ');document.getElementById(\'mytempbtn\').click();document.getElementById(\'mytempbtn1\').click();">' + message + '</p>';
            }



            $scope.ClearAllNotifications = function (id) {
                $http.post("/api/notifications/clearall/" + id).then(function (response) {
                    if (response.data.status == "Success") {
                        $scope.main.data = response.data.notifications;
                        reloadAllData();
                        $scope.main.notificationscount = Object.keys(response.data.notifications).length;
                    }
                });
            }

            $scope.ClearAllVideoNotifications = function (id) {
                $http.post("/api/notifications/clearall/" + id).then(function (response) {
                    if (response.data.status == "Success") {
                        //$scope.main.data = response.data.notifications;
                        $scope.main.singlechatdata = response.data.notifications;
                        reloadAllData();
                        $scope.main.singlechatnotificationscount = Object.keys(response.data.notifications).length;
                    }
                });
            }

            $scope.CrossNotification = function (id) {
                $.ajax({
                    url: '/api/notifications/unread/' + id,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'Get',
                    success: function (data) {
                        $scope.main.data = data;
                        reloadAllData();
                        $scope.main.notificationscount = Object.keys(data.notifications).length;
                    }
                });
            }

            $scope.ReadNotification = function (id) {
                $.ajax({
                    url: '/api/notifications/read/' + id,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'Get',
                    success: function (data) {
                        $scope.main.data = data;
                        reloadAllData();
                        reloadAllData();
                        $scope.main.notificationscount = Object.keys(data.notifications).length;
                    }
                });
            }

            $scope.VideoCrossNotification = function (id) {
                $.ajax({
                    url: '/api/notifications/unread/' + id,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'Get',
                    success: function (data) {
                        //$scope.main.data = data;
                        $scope.main.singlechatdata = data;
                        reloadAllData();
                        $scope.main.singlechatnotificationscount = Object.keys(data.notifications).length;
                    }
                });
            }


            // for both single and group
            $scope.Readvidenotifications = function (id, groupQuestionId, createdby) {
                //alert(groupQuestionId)
                if (groupQuestionId > 0) {
                    //alert("group chat")
                    $scope.GroupVideoChat(groupQuestionId);
                } else {
                    //alert("single chat")
                    $scope.SingleChatVideo(id, createdby);
                }

                $.ajax({
                    url: '/api/videonotifications/read/' + id,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'Get',
                    success: function (data) {
                        //$scope.main.data = data;
                        $scope.main.singlechatdata = data;
                        reloadAllData();
                        $scope.main.singlechatnotificationscount = Object.keys(data.videochatnotifications).length;
                    }
                });
            }

            $scope.main = {
                brand: "School Of Data Analytics",
                name: "Anonymous",
                enrollments: [],
                tasks: [],
                notifications: []
            };

            $scope.contact = function () {

                var d = [];
                var modalinstance = $modal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'contactsupport.html',
                    controller: ['$scope', '$modalInstance', 'etag', function ($scope, $modalInstance, etag) {
                        $scope.etag = etag;
                        $scope.file = "";
                        $scope.disc = [];
                        $scope.getDiscussions = function (query) {

                            $http.get('/api/discussions/student/search/' + encodeURIComponent(query)).then(function (response) {

                                $scope.disc = response.data.results;
                            });

                        }


                        $scope.uploadFile = function () {
                            var fd = new FormData();

                            fd.append('file', document.getElementById('uploadedfile').files[0]);

                            $.ajax({
                                url: '/api/contactsupport/upload',
                                data: fd,
                                cache: false,
                                contentType: false,
                                processData: false,
                                type: 'POST',
                                success: function (data) {
                                    console.log(data);
                                    if (data.result == "Success") {
                                        $scope.file = data.fileName;
                                        console.log($scope.file);

                                        common.logger.logSuccess("File has been successfully uploaded. Please wait while any pending content will be opened");
                                    } else {
                                        common.logger.logError("Failed to upload. " + data.message);
                                    }
                                }
                            });
                        }

                        $scope.save = function (d) {
                            var cfm = confirm("Are you sure to submit this request ?");
                            if (cfm) {
                                d.file = $scope.file;
                                common.logger.log("Please wait while your request is being submitted ...");
                                $http.post('/api/discussionapp/contactsupport', { ticket: d }).then(function (response) {
                                    if (response.data.result == "Success") {

                                        $scope.disc = { file: [] };
                                        common.logger.log("Requested has been successfully submitted . Thank you.");
                                    } else {
                                        common.logger.logError("Failed to submit request. " + response.data.message);
                                    }
                                });
                            }

                            $modalInstance.dismiss('cancel');
                        }
                        $scope.close = function () {
                            $modalInstance.dismiss('cancel');
                        }
                    }],
                    resolve: {
                        etag: function () {
                            return d;
                        }

                    }
                })


            }

            $scope.videoNoficationClick = function () {
                $("#myModal2").css('display', 'none');
            }


            //single chat start using talkjs
            $scope.GetUser = function (userid, friendname, friendemail, loggeduser, imageUrl) {
                $scope.userid = userid;
                $scope.username = loggeduser;
                $scope.frienduserid = userid;
                $scope.friendname = friendname;

                $scope.UserPresenceRefresh($scope.friends);
                Talk.ready.then(function () {
                    var me = new Talk.User({
                        id: $scope.id,
                        name: loggeduser,
                        role: "Admin",
                        email: $scope.email,
                        //photoUrl: "https://media-exp1.licdn.com/dms/image/C510BAQFQ5e5_rA2QAQ/company-logo_200_200/0?e=2159024400&v=beta&t=SdLSlpMdcS3_ecer_loCzimBs47S6dU4KZuHm4vaWl8",
                        photoUrl: imageUrl,
                        welcomeMessage: "Hey there! How are you? :-)"
                    });

                    var other = new Talk.User({
                        id: userid,
                        name: friendname,
                        role: "Admin",
                        email: friendemail,
                        //photoUrl: "https://media-exp1.licdn.com/dms/image/C510BAQFQ5e5_rA2QAQ/company-logo_200_200/0?e=2159024400&v=beta&t=SdLSlpMdcS3_ecer_loCzimBs47S6dU4KZuHm4vaWl8",
                        photoUrl: imageUrl,
                        welcomeMessage: "Hey, how can I help?"
                    });
                    window.talkSession = new Talk.Session({
                        appId: $scope.TalkJSAppId,
                        me: me
                    });

                    var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))

                    conversation.setParticipant(me);
                    conversation.setParticipant(other);

                    var isEnabled = true;
                    talkSession.setDesktopNotificationEnabled(isEnabled);

                    var inbox = talkSession.createInbox({ selected: conversation });
                    inbox.mount(document.getElementById("chatusers2"));
                });



                $("#myModal").css('display', 'none');
                $("#managefriends1").css('display', 'none');
                $("#managegroups1").css('display', 'none');
                $("#editgroup").css('display', 'none');
                $("#ChatNew_entry_Groups").css('display', 'none');
                $("#addnewfriend").css('display', 'none');
                $("#managemembers").css('display', 'none');
                $("#New_entry_Members").css('display', 'none');
                $("#chatusers1").css('display', 'block');
                $("#content").css('display', 'none');
                $("#hub").css('display', 'none');
                $("#singlechatclose").click(function () {
                    $("#chatusers1").css('display', 'none');
                });
                //shared.setListName(value);
                function append_message1(indicator) {
                    return '<p style="background-color: black; padding: 10px; color:white !important; width:280px">' + indicator + '</p>';
                }
            } //single chat end


            //Group chat starts using talkjs
            $scope.GetGroupChat = function (questionid, loggeduser) {
                //$scope.username = loggeduser;
                $scope.QuestionID = questionid;


                $http.get('/api/chat/getfrienduserslist/' + questionid).then(function (response) {
                    $scope.friendusers = response.data.frienduserslist;
                    $scope.username = response.data.firstname;
                    //alert($scope.username);
                    //alert($scope.friendusers);
                    if (response.data.result == "Success") {
                        Talk.ready.then(function () {
                            var me = new Talk.User({
                                id: $scope.id,
                                name: loggeduser,
                                role: "Admin",
                                email: $scope.email,
                                photoUrl: "https://media-exp1.licdn.com/dms/image/C510BAQFQ5e5_rA2QAQ/company-logo_200_200/0?e=2159024400&v=beta&t=SdLSlpMdcS3_ecer_loCzimBs47S6dU4KZuHm4vaWl8",
                                welcomeMessage: "Hey there! How are you? :-)"
                            });

                            window.talkSession = new Talk.Session({
                                appId: $scope.TalkJSAppId,
                                me: me
                            });

                            //var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
                            //var uniq = '0a9p8p' + (new Date()).getTime(); // getdatetime
                            //var conversation = talkSession.getOrCreateConversation(uniq)
                            var uniq = '' + $scope.QuestionID;
                            var conversation = talkSession.getOrCreateConversation(uniq)
                            conversation.setParticipant(me);

                            var isEnabled = true;
                            talkSession.setDesktopNotificationEnabled(isEnabled);

                            for (var i = 0; i < $scope.friendusers.length; i++) {
                                var other = new Talk.User({
                                    id: $scope.friendusers[i].userId,
                                    name: $scope.friendusers[i].name,
                                    role: "Admin",
                                    email: $scope.friendusers[i].email,
                                    photoUrl: "https://media-exp1.licdn.com/dms/image/C510BAQFQ5e5_rA2QAQ/company-logo_200_200/0?e=2159024400&v=beta&t=SdLSlpMdcS3_ecer_loCzimBs47S6dU4KZuHm4vaWl8",
                                    welcomeMessage: "Hey, how can I help?"
                                });

                                conversation.setParticipant(other);
                            }

                            var inbox = talkSession.createInbox({ selected: conversation });
                            inbox.mount(document.getElementById("chatusers2"));
                        });



                        $("#myModal").css('display', 'none');
                        $("#managefriends1").css('display', 'none');
                        $("#managegroups1").css('display', 'none');
                        $("#editgroup").css('display', 'none');
                        $("#New_entry_Groups").css('display', 'none');
                        $("#addnewfriend").css('display', 'none');
                        $("#managemembers").css('display', 'none');
                        $("#New_entry_Members").css('display', 'none');
                        $("#myModal2").css('display', 'block');
                        $("#chatusers1").css('display', 'block');
                        $("#content").css('display', 'none');
                        $("#hub").css('display', 'none');
                        $("#singlechatclose").click(function () {
                            $("#chatusers1").css('display', 'none');
                            $http.post('/api/chat/closegroupchat', +$scope.QuestionID).then(function (response) {
                                if (response.data.result == "Success") {
                                    common.logger.logSuccess("Your groupchat is closed.");
                                }
                            });

                        });


                        $scope.prevdate = "";
                    }
                });

            };  //group chat end


            $scope.getpendingrequests = function () {
                $("#bellpopup").css('display', 'block');
                $("#pendingrequestsclose").click(function () {
                    $("#bellpopup").css('display', 'none');
                });
                $scope.hisuserid = $("#hidUserId").val();
                $http.get('/api/chat/pendingrequests/' + $scope.hisuserid).then(function (response) {
                    $scope.pendingrequests = response.data.PendingRequests;
                });
            };

            // Click even for "Chat" button
            $scope.ShowHide = function (i) {
                $("#myModal2").css('display', 'block');
                $("#chatclose").click(function () {
                    clearInterval($scope.myVar);
                    $("#myModal").css('display', 'none');
                    $("#chatusers1").css('display', 'none');
                    $("#managegroups1").css('display', 'none');
                    $("#managefriends1").css('display', 'none');
                    $("#startvideochat").css('display', 'none');
                    $("#myModal2").css('display', 'none');
                    $("#myModaladdQuestion").css('display', 'none');
                    $("#New_entry_Members").css('display', 'none');
                    $("#managemembers").css('display', 'none');
                    $("#ChatNew_entry_Groups").css('display', 'none');
                    $("#editgroup").css('display', 'none');
                });
                $scope.groupid = i;
                $http.get('/api/chat/groupinfousers/' + $scope.groupid).then(function (response) { // very first time $scope.groupid = 0
                    $scope.groups = response.data.groups;
                    $scope.friends = response.data.friends;
                    $scope.userid = '' + response.data.userid;
                    $scope.loggeduser = response.data.UserName;
                    $scope.email = response.data.Email;
                    $scope.missedmessages = response.data.missedmesages;
                    //   UserPresenceRefresh($scope.friends)
                    $scope.UserPresenceRefresh($scope.friends);



                    // do not remove this 
                    //$scope.myVar = setInterval(myTimer, 5000);

                    //function myTimer() {
                    //    $scope.UserPresenceRefresh($scope.friends);
                    //}
                });
            }

            $scope.UserPresenceRefresh = function (friends) {
                for (var i = 0; i < friends.length; i++) {
                    var friendsUserId = friends[i].FriendUserId;
                    $scope.myFriend(friendsUserId);
                }
            }


            $scope.myFriend = function (friendsUserId) {
                $http.get('/api/chat/userpresence/' + friendsUserId).then(function (response) {
                    var isPresence = response.data.isPresence;
                    console.log("isPresence")
                    console.log(isPresence)
                    if (isPresence) {
                        $("#hidOnlineStatus" + friendsUserId).css("color", "green");
                    } else {
                        $("#hidOnlineStatus" + friendsUserId).css("color", "gray");
                    }
                    var mylist = $('#divCBFriends');
                    var listitems = mylist.children("div");

                    listitems.sort(function (a, b) {
                        //alert(a);
                        var mycircleA = $(a).find("i").css("color");
                        //alert(mycircleA);
                        var mycircleB = $(b).find("i").css("color");
                        //alert(mycircleB);
                        return (mycircleA == 'rgb(0, 128, 0)') ? -1 : 1;
                    })

                    $(mylist).append(listitems);
                });

            }

            $scope.ShowHide1 = function (i) {
                $("#myModal2").css('display', 'block');
                $scope.groupid = i;
                $http.get('/api/chat/groupinfousers/' + $scope.groupid).then(function (response) {
                    $scope.groups = response.data.groups;
                    $scope.GetUser($("#hidUserId").val(), "dummy");
                });

            }

            $scope.ShowHide2 = function (i) {
                $("#pendingrequests").css('display', 'none');
                $("#myModal2").css('display', 'block');
                $scope.groupid = i;
                $http.get('/api/chat/groupinfousers/' + $scope.groupid).then(function (response) {
                    $scope.groups = response.data.groups;
                });
            }

            $("#managefriends").click(function () {
                $("#myModal").css('display', 'none');
                $("#chatusers1").css('display', 'none');
                $("#managegroups1").css('display', 'none');
                $("#managefriends1").css('display', 'block');
            });

            $("#myChatButton").click(function () {
                $("#myModal2").css('display', 'block');
            });

            $("#managegroups").click(function () {
                $("#myModal").css('display', 'none');
                $("#chatusers1").css('display', 'none');
                $("#managefriends1").css('display', 'none');
                $("#managegroups1").css('display', 'block');
            });

            $scope.Addquestionpop = function () {
                $("#myModal").css('display', 'none');
                $("#myModaladdQuestion").css('display', 'block');
            }

            $scope.GroupVideoChat = function (questionid, isactive, groupid, index) {
                $("#myModal").css('display', 'none');
                $("#startvideochat").css('display', 'block');
                $("#closevideo").click(function () {
                    $("#startvideochat").css('display', 'none');
                });

                $scope.questionid = questionid;
                $scope.isactive = isactive;
                $scope.groupid = groupid;
                $scope.index = index;

                var divnode = document.createElement("div")
                divnode.setAttribute("id", "publisher")
                document.getElementById("videos").appendChild(divnode)

                $http.get('/api/chat/sessions/' + $scope.questionid).then(function (response) {
                    $scope.tokbox = response.data.tokboxinfo;
                    $scope.SessionId = $scope.tokbox[0].SessionId;
                    //alert($scope.SessionId);
                    $scope.AccessToken = $scope.tokbox[0].AccessToken;
                    $scope.IsActive = $scope.tokbox[0].IsActive;
                    $scope.Id = $scope.tokbox[0].Id;
                    //alert($scope.Id);
                    $scope.initiatedBy = response.data.initiatedBy;
                    $scope.questioninf = response.data.questioninfo;
                    $scope.groupid = $scope.questioninf[0].GroupId;
                    $scope.ishosted = false;
                    $scope.username = response.data.username;
                    $scope.profilelink = response.data.profileimage;
                    $scope.profileimage = $scope.profilelink[0].ProfileImage;
                    //alert($scope.username);
                    //alert($scope.profileimage);
                    //alert($scope.initiatedBy)
                    if ($scope.initiatedBy == 0) {
                        $scope.ishosted = false
                    }
                    else {
                        $scope.ishosted = true
                    }
                    //alert($scope.Id);
                    $("#hidNeededId").val($scope.Id);
                    //var apikey = "46592442";
                    //var apikey = "46612812";
                    var apikey = response.data.ApiKey;
                    //alert("tokbox apiKey" + apikey) 
                    var sessionId = $scope.SessionId;
                    var token = $scope.AccessToken;
                    $scope.publishers_count = 0;
                    $scope.subscribers_count = 0;

                    var session = OT.initSession(apikey, sessionId);
                    session.on("connectionCreated", function (event) {
                        if (event.connection.permissions.publish) {
                            var postdata = { sessionid: $scope.SessionId, userid: $scope.id, GroupID: $scope.groupid, Status: 2 };
                            $http.post('/api/videochat/participants/' + $scope.questionid, postdata).then(function (response) {
                                $scope.publishers_count++;
                                displayConnectionCount();
                            });
                        }
                        else {
                            var postdata1 = { sessionid: $scope.SessionId, userid: $scope.id, GroupID: $scope.groupid, Status: 2 };
                            $http.post('/api/videochat/participants/' + $scope.questionid, postdata1).then(function (response) {
                                $scope.subscribers_count++;
                                displayConnectionCount();
                            });
                        }
                    });


                    session.on("connectionDestroyed", function (event) {
                        if (event.connection.permissions.publish) {
                            $scope.publishers_count--;
                            displayConnectionCount();
                            var postdata = { sessionid: $scope.SessionId, userid: $scope.id, GroupID: $scope.groupid, Status: 0 };
                            // on purpose
                            //$http.post('/api/videochat/participants/' + $scope.questionid, postdata).then(function (response) {
                            //    //alert("connectiondestroyed came");
                            //});
                        }
                        else {
                            $scope.subscribers_count--;
                            displayConnectionCount();
                            // on purpose
                            var postdata2 = { sessionid: $scope.SessionId, userid: $scope.id, GroupID: $scope.groupid, Status: 0 };
                            $http.post('/api/videochat/participants/' + $scope.questionid, postdata2).then(function (response) {

                            });
                        }
                    });

                    session.on("sessionConnected ", function (event) {
                        $scope.chime1 = new Audio("/app/images/doorbell-1.MP3");
                        $scope.chime1.play();
                        var postdata = { sessionid: $scope.SessionId, userid: $scope.id, GroupID: $scope.groupid, Status: 1 };
                        $http.post('/api/videochat/participants/' + $scope.questionid, postdata).then(function (response) {
                            if (response.data.result = "Success") {
                                $scope.livegroupvideocount = response.data.livegroupvideocount;
                                $scope.liveparticipantcount = $scope.livegroupvideocount[0].livecount;
                                $scope.SendVideoEmailToSubscribers($scope.questionid, $scope.liveparticipantcount);
                            }
                        });
                    });

                    session.on("sessionDisconnected", function (event) {
                        var postdata1 = { sessionid: $scope.SessionId, userid: $scope.id, GroupID: $scope.groupid, Status: 0 };
                        $http.post('/api/videochat/participants/' + $scope.questionid, postdata1).then(function (response) {
                        });
                    });


                    console.log("session object is" + session);
                    $scope.opentoksession = session;
                    session.connect(token, function (err) {
                        if (err) {
                            //alert(err);
                        } else {

                            //var publisher = OT.initPublisher('publisher', { width: 150, height: 150 });
                            var userInfo = $scope.username + "~" + $scope.profileimage;
                            //var pubOptions = { width: 150, height: 150, publishAudio: true, publishVideo: false, name: $scope.username, style: { nameDisplayMode: "on" } };
                            var pubOptions = { width: 150, height: 150, publishAudio: true, publishVideo: false, name: userInfo, style: { nameDisplayMode: "off" } };
                            var publisher = OT.initPublisher('publisher', pubOptions);
                            $scope.publisher = publisher;
                            $scope.isPublishVideo = false;

                            //session.publish(publisher);

                            var obj = session.publish(publisher);
                            obj.setStyle('backgroundImageURI', $scope.profileimage);

                        }
                    });

                    //////////////
                    //if (subscriber.stream.hasVideo) {
                    //    var imgData = subscriber.getImgData();
                    //    subscriber.setStyle('backgroundImageURI', imgData);
                    //} else {
                    //    subscriber.setStyle('backgroundImageURI',
                    //        'https://tokbox.com/img/styleguide/tb-colors-cream.png'
                    //    );
                    //}
                    ////////////

                    function displayConnectionCount() {
                        $scope.livepublishercount = $scope.publishers_count;
                        $scope.livesubscriberscount = $scope.subscribers_count;
                    }

                    session.on("streamDestroyed", function (event) {


                        console.log("event.stream.videoType")
                        console.log(event.stream.videoType)
                        console.log("event");
                        console.log(event);
                        if (event.stream.videoType == 'screen') {
                            // User clicked stop sharing
                            // alert("welcome to stop shareing 123");

                            //Enable Screen Share button
                            $("#btnShareScreen").css('display', 'block');
                            var options = {
                                width: 150, height: 150, insertMode: 'append'
                            }
                            session.subscribe(event.stream, 'subscriber', options);

                            var subscribersCount = document.getElementById("subscriber").childNodes.length;
                            var numberOfColumns = 5;
                            $scope.VideoChatScreenSizes(subscribersCount, numberOfColumns);

                            var topval = 0;
                            //			alert("$scope.subscriberWidth:  " + $scope.subscriberWidth + "; height:  " + $scope.subscriberHeight + ";  subscribersCount:  " + subscribersCount);

                            for (var i = 0; i < subscribersCount; i++) {
                                document.getElementById("subscriber").childNodes[i].style.width = $scope.subscriberWidth + "%";
                                document.getElementById("subscriber").childNodes[i].style.height = $scope.subscriberHeight + "px";
                                document.getElementById("subscriber").childNodes[i].style.float = "left";
                                document.getElementById("subscriber").childNodes[i].style.position = "relative";
                                document.getElementById("subscriber").childNodes[i].style.top = "0px";
                            }


                            document.getElementById("publisher").style.width = "90px";
                            document.getElementById("publisher").style.height = "90px";
                            document.getElementById("publisher").style.position = "absolute";
                            document.getElementById("publisher").style.top = "70px";
                            document.getElementById("publisher").style.overflow = "none";
                        } else if (event.stream.videoType == 'camera' || event.stream.videoType == null) {
                            //alert("welcome to stop shareing 123 event.stream.videoType");
                            //session.disconnect();
                            //session = null;
                            //$("#startvideochat").css('display', 'none');
                        }
                        else {
                            // alert("welcome to stop shareing 456");
                            console.log("streamDestroyed-nothing implemented");
                        }
                    });


                    session.on("connectionDestroyed", function (event) {
                        //alert($scope.SessionId)
                        // Happens when Host EndMeeting
                        var postdata = { sessionId: $scope.SessionId }

                        $http.post('/api/student/getvideosession/', postdata).then(function (response) {
                            if (response.data.result == "Success") {
                                var isActive = response.data.isActiveSession;
                                //alert(isActive)
                                //var isActive = videoSession[0].IsActive;
                                if (isActive == "False") {
                                    session.disconnect();
                                    session = null;
                                    //alert("Meeting is ended by Host")
                                    $("#startvideochat").css('display', 'none');
                                }
                            }
                            common.logger.logSuccess("You disconnected session.");
                        });
                    });

                    session.on("sessionDisconnected", function (event) {
                        //alert("sessionDisconnected - GroupChat")
                    });

                    session.on("streamCreated", function (event) {


                        if (event.stream.videoType === 'screen') {
                            $("#btnShareScreen").css('display', 'none');
                            session.subscribe(event.stream, 'subscriber', {
                                insertMode: 'append',
                                width: '150',
                                height: '150'
                            });
                            //subscriberObj.setStyle('backgroundImageURI', $scope.profileimage);
                            //var subscriberObj = session.subscribe(event.stream, 'subscriber', name: $scope.username, style: { nameDisplayMode: "on" } {
                            //    insertMode: 'append',
                            //    width: '150',
                            //    height: '150'
                            //});

                            //if (subscriberObj.stream.hasVideo) {
                            //    alert("subscriberObj.stream.hasVide");
                            //    var imgData = subscriberObj.getImgData();
                            //    subscriberObj.setStyle('backgroundImageURI', imgData);
                            //} else {
                            //    subscriberObj.setStyle('backgroundImageURI', $scope.profileimage);
                            //}

                            var subscribersCount = document.getElementById("subscriber").childNodes.length;
                            //alert(subscribersCount);

                            var topval = 50;
                            for (var i = 0; i < subscribersCount; i++) {
                                topval = topval + 62;
                                var classname = document.getElementById("subscriber").childNodes[i].getAttribute("class");
                                //alert(document.getElementById("subscriber").childNodes[i].getAttribute("class"))

                                if (classname.includes("OT_fit-mode-contain")) { //Shard screen Area
                                    document.getElementById("subscriber").childNodes[i].style.width = "90%";
                                    document.getElementById("subscriber").childNodes[i].style.height = "90%";
                                    document.getElementById("subscriber").childNodes[i].style.position = "absolute";
                                    document.getElementById("subscriber").childNodes[i].style.top = "35px";
                                    document.getElementById("subscriber").childNodes[i].style.left = "8%";
                                }
                                else {
                                    document.getElementById("subscriber").childNodes[i].style.width = "60px";
                                    document.getElementById("subscriber").childNodes[i].style.height = "60px";
                                    document.getElementById("subscriber").childNodes[i].style.position = "absolute";
                                    document.getElementById("subscriber").childNodes[i].style.top = topval + "px";
                                }
                            }

                            document.getElementById("publisher").style.width = "60px";
                            document.getElementById("publisher").style.height = "60px";
                            document.getElementById("publisher").style.position = "absolute";
                            document.getElementById("publisher").style.top = "30px";
                            document.getElementById("subscriber").style.left = "5px";
                            document.getElementById("publisher").style.overflow = "none";

                        } else {
                            var string = event.stream.name;
                            var splitVals = string.split("~");


                            var options = { width: 150, height: 150, insertMode: 'append', name: splitVals[0], style: { nameDisplayMode: "on" } }
                            //session.subscribe(event.stream, 'subscriber', options);


                            var profile = splitVals[1];

                            if ($scope.username == splitVals[0]) {
                                profile = splitVals[1];
                            }

                            //if (event.stream.myname.toLowerCase() == 'adalene1') {
                            //    profile = "https://app.colaberry.com/uploads/userprofiles/26993/pp_19378970_th.jpg";
                            //}

                            //if (event.stream.myname.toLowerCase() == 'ramesh.alla') {
                            //    profile = "https://app.colaberry.com/uploads/userprofiles/28633/pp_27597149_ooo.jpg";
                            //}
                            //alert(profile);


                            var subscriberObj1 = session.subscribe(event.stream, 'subscriber', options);
                            subscriberObj1.setStyle('backgroundImageURI', profile);


                            //if (subscriberObj1.stream.hasVideo) {
                            //    alert("subscriberObj.stream.hasVide");
                            //    var imgData = subscriberObj1.getImgData();
                            //    subscriberObj1.setStyle('backgroundImageURI', imgData);
                            //} else {
                            //    subscriberObj1.setStyle('backgroundImageURI', $scope.profileimage);
                            //}

                            var subscribersCount = document.getElementById("subscriber").childNodes.length;
                            var numberOfColumns = 5;
                            $scope.VideoChatScreenSizes(subscribersCount, numberOfColumns);

                            var topval = 0;
                            //alert($scope.subscriberWidth + $scope.subscriberHeight)
                            for (var i = 0; i < subscribersCount; i++) {
                                document.getElementById("subscriber").childNodes[i].style.width = $scope.subscriberWidth - 1 + "%";
                                document.getElementById("subscriber").childNodes[i].style.height = $scope.subscriberHeight + "px";
                                document.getElementById("subscriber").childNodes[i].style.float = "left";
                            }

                            document.getElementById("publisher").style.width = "90px";
                            document.getElementById("publisher").style.height = "90px";
                            document.getElementById("publisher").style.position = "absolute";
                            document.getElementById("publisher").style.top = "70px";
                        }


                        // if some one connects then archive
                        console.log("createarchive about to call");
                        //alert("createarchive about to call");
                        $http.post('/api/student/creategrouparchive/' + $scope.questionid).then(function (response) {
                            console.log("response.data.result");
                            console.log(response.data.result);
                            if (response.data.result == "Success") {
                                $scope.TokBoxInfo = response.data.tokboxinfo;
                                var apikey = $scope.TokBoxInfo[0].APIKey;
                                var sessionId = $scope.TokBoxInfo[0].SessionId;
                                var token = $scope.TokBoxInfo[0].AccessToken;
                                var session = OT.initSession(apikey, sessionId);
                                session.connect(token, function (err) {
                                    if (err) {
                                        //   alert("there is an error while connecting to the session!");
                                    } else {
                                        //session.publish();
                                    }
                                });
                            } else {
                                console.log("Failed to save : " + response.data.result);
                                //common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });

                    });

                    $scope.VideoChatScreenSizes = function (subscribersCount, numberOfColumns) {

                        var Bval = subscribersCount;
                        var Nval = numberOfColumns;
                        var Aval = Math.sqrt(Bval);
                        var Eval = Math.trunc(Aval)
                        var Fval = Eval * (Eval + 1); //10*11=110
                        var Gval = (Eval + 1) * (Eval + 1);
                        //alert(Eval + 1 <= Nval)
                        var i = 0;
                        var j = 0;
                        //alert("subscribersCount" + subscribersCount);
                        if (Bval == 1) {
                            $scope.subscriberWidth = 100;
                            $scope.subscriberHeight = 500;
                            console.log("width value is: " + (500) + "; Height value is: " + (500));
                        }
                        else if (Bval == 4) {
                            $scope.subscriberWidth = 50;
                            $scope.subscriberHeight = 250;
                            console.log("width value is: " + (500) + "; Height value is: " + (500));
                        }

                        else if (Eval + 1 <= Nval) {
                            if (Bval <= Fval) {
                                i = Eval;
                                j = Eval + 1;
                                $scope.subscriberWidth = 100 / j;
                                $scope.subscriberHeight = 500 / i;
                                console.log("width value is: " + (500 / j) + "; Height value is: " + (500 / i));
                            }
                            else {
                                i = Eval + 1;
                                j = Eval + 1;
                                $scope.subscriberWidth = 100 / j;
                                $scope.subscriberHeight = 500 / i;
                                console.log("width value is: " + (100 / j) + "; Height value is: " + (100 / i));
                            }
                        }
                        else {
                            $scope.subscriberWidth = 100 / Nval;
                            $scope.subscriberHeight = 500 / Nval;
                            console.log("width value is: " + (100 / Nval) + "; Height value is: " + (100 / Nval));
                        }
                    }

                    // in SingleChatVideo
                    $scope.StartShare = function () {
                        // alert("welecome to start share");

                        //Disable Screen Share button
                        $("#btnShareScreen").css('display', 'none');

                        OT.checkScreenSharingCapability(function (response) {
                            if (!response.supported || response.extensionRegistered === false) {
                                // This browser does not support screen sharing.
                            } else if (response.extensionInstalled === false) {
                                // Prompt to install the extension.
                            } else {
                                // Screen sharing is available. Publish the screen.

                                /*
                                var publishOptions = {};
                                publishOptions.maxResolution = { width: 1920, height: 1080 };
                                publishOptions.videoSource = 'screen';
                                */


                                var publisher = OT.initPublisher('screen-preview',
                                    { videoSource: 'screen', width: 600, height: 350 },
                                    function (error) {
                                        if (error) {
                                            // Look at error.message to see what went wrong.
                                        } else {
                                            session.publish(publisher, function (error) {
                                                if (error) {
                                                    // Look error.message to see what went wrong.
                                                }
                                            });
                                        }
                                    }
                                ); // end of OT.initPublisher()

                                publisher.on("mediaStopped", function (event) {
                                    // alert("mediaStopped4")
                                    $("#btnShareScreen").css('display', 'block');
                                });
                            }
                        });
                    }
                });
                //if ($scope.isactive != true) {
                //    $scope.SendVideoEmailToSubscribers($scope.questionid);
                //}

                $scope.CameraToggle = function () {
                    //alert("in toggle")
                    //var options = { subscribeToAudio: true, subscribeToVideo: false };
                    //console.log("camera:" + options)
                    //var stream = $scope.opentoksession.publish();
                    // Replace stream and replacementElementId with your own values:
                    //subscriber = $scope.opentoksession.subscribe(stream, replacementElementId, options);
                    //alert(subscriber)
                    //$scope.subscriber.subscribeToAudio(false); // audio off
                    //alert($scope.isPublishVideo)
                    if ($scope.isPublishVideo == true) {
                        $scope.publisher.publishVideo(false);
                        $scope.isPublishVideo = false;
                    } else {
                        $scope.publisher.publishVideo(true);
                        $scope.isPublishVideo = true;
                    }
                }

                $scope.MuteAll = function () {
                    $scope.subscriber.subscribeToAudio(false); // audio off
                    $scope.MuteAll = true;
                }

                $scope.UnMute = function () {
                    $scope.subscriber.subscribeToAudio(true); // audio on
                }

                $scope.SendVideoEmailToSubscribers = function (questionId, livevideocount) {
                    var url = '/api/video/subscribers/' + questionId + '/' + livevideocount + '/notify';
                    $http.post(url).then(function (response) {
                        if (response.data.result == "Success") {
                            //$scope.GroupPage(GroupId);
                            common.logger.logSuccess("Successfully email sent to the video subscribers.");
                            //$http.post('sendemails......')
                        }
                        else if (response.data.result == "Successfull") {
                            common.logger.logSuccess("Your email notification is turn off.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

            } // Group Video Chat  // Group Video Chat ends


            $scope.TokBoxClose = function () {
                $('#startvideochat').modal('hide');
            }

            $scope.Videoclose = function (id, sessionid, questionid) {
                //alert(id);
                $scope.sessionid = sessionid;
                $scope.questionid = questionid;
                var postdata = { sessioid: $scope.sessionid, userid: $scope.id, question: $scope.questionid };
                var cfm = confirm("Are you sure to End Meeting ? ");
                if (cfm) {
                    $http.post('/api/student/videosession/' + id, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            common.logger.logSuccess("You disconnected session.");
                        }
                    });

                    $scope.opentoksession.disconnect();
                    $scope.opentoksession = null;
                    $("#startvideochat").css('display', 'none');
                }
            }

            //$scope.LeaveMeeting = function (id, sessionid, questionid) {
            //    $scope.sessionid = sessionid;
            //    $scope.questionid = questionid;
            //    var postdata = { sessioid: $scope.sessionid, userid: $scope.id, question: $scope.questionid };
            //    var cfm = confirm("Are you sure to Leave Meeting ? ");
            //    if (cfm) {
            //        $http.post('/api/student/videosession/' + id, postdata).then(function (response) {
            //            if (response.data.result == "Success") {
            //                common.logger.logSuccess("You disconnected session.");
            //            }
            //        });

            //        $scope.opentoksession.off();
            //        $scope.opentoksession.disconnect();


            //        $scope.opentoksession = null;
            //        $("#startvideochat").css('display', 'none');
            //    }
            //}
            $scope.LeaveMeeting = function (id) {
                //alert("leaving meeting")
                //$scope.opentoksession.off();
                $scope.opentoksession.disconnect();

                //$scope.opentoksession.unpublish($scope.publisher, function (error) { alert(error) });
                //$scope.publisher.destroy();

                $scope.opentoksession = null;
                $("#startvideochat").css('display', 'none');
            }

            $scope.EndMeeting = function (id, sessionid, questionid, groupid, index) {
                $scope.sessionid = sessionid;
                $scope.questionid = questionid;
                $scope.groupid = groupid;
                $scope.index = index;
                var postdata = { sessioid: $scope.sessionid, userid: $scope.id, question: $scope.questionid };
                var cfm = confirm("Are you sure to End Meeting ? ");
                if (cfm) {
                    $http.post('/api/student/videosession/' + id, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.GroupPage($scope.groupid);
                            $scope.QuestionExpand($scope.index, $scope.questionid);
                            common.logger.logSuccess("You disconnected session.");
                        }
                    });

                    $scope.opentoksession.disconnect();
                    $scope.opentoksession = null;
                    $("#startvideochat").css('display', 'none');
                }
            }

            $scope.playArchive = function (archiveid) {
                $scope.archiveid = archiveid;
                var postdata = { archiveid: $scope.archiveid };
                $http.post('/api/chat/playvideo/', postdata).then(function (response) {
                    if (response.data.status == "Success") {
                        $scope.url = response.data.url;
                        //alert($scope.url);
                        window.open(response.data.url, '_blank');
                        //window.location.href = "my/playvideo/" + e.cbvideoid;
                        //common.logger.logSuccess("You disconnected session.");
                    }
                });
            }

            $scope.SingleChatVideo = function (userid, frienduserid) {
                //alert("came singlechat");
                console.log("$scope.opentoksession")
                console.log($scope.opentoksession)
                $("#myModal").css('display', 'none');
                $("#startvideochat").css('display', 'block');
                $("#myModal2").css('display', 'block');


                var divnode = document.createElement("div")
                divnode.setAttribute("id", "publisher")
                document.getElementById("videos").appendChild(divnode)

                $http.get('/api/chat/singlechatsessions/' + frienduserid).then(function (response) {
                    $scope.tokbox = response.data.tokboxinfo;
                    $scope.SessionId = $scope.tokbox[0].SessionId;
                    $scope.AccessToken = $scope.tokbox[0].AccessToken;
                    $scope.IsActive = $scope.tokbox[0].IsActive;
                    $scope.Id = $scope.tokbox[0].Id;
                    $scope.initiatedBy = response.data.initiatedBy;
                    $scope.ishosted = false;
                    if ($scope.initiatedBy == 0) {
                        $scope.ishosted = false
                    }
                    else {
                        $scope.ishosted = true
                    }
                    //alert($scope.Id);
                    $("#hidNeededId").val($scope.Id);
                    var apikey = response.data.ApiKey;
                    var sessionId = $scope.SessionId;
                    var token = $scope.AccessToken;
                    var session = OT.initSession(apikey, sessionId);
                    console.log("session object is" + session);
                    $scope.opentoksession = session;
                    session.connect(token, function (err) {
                        if (err) {
                            // alert("thereis an error!123");
                        } else {
                            var publisher = OT.initPublisher('publisher',
                                { width: 150, height: 150 });
                            session.publish(publisher);
                        }
                    });


                    session.on("streamDestroyed", function (event) {
                        if (event.stream.videoType == 'screen') {
                            // User clicked stop sharing

                            //Enable Screen Share button
                            $("#btnShareScreen").css('display', 'block');
                            document.getElementById("subscriber").childNodes[0].style.width = "100%";
                            document.getElementById("subscriber").childNodes[0].style.height = "92%";
                            document.getElementById("subscriber").childNodes[0].style.position = "absolute";
                            document.getElementById("subscriber").childNodes[0].style.top = "85px";
                            document.getElementById("subscriber").childNodes[0].style.left = "0px";

                            document.getElementById("publisher").style.width = "60px";
                            document.getElementById("publisher").style.height = "52px";
                            document.getElementById("publisher").style.position = "absolute";
                            document.getElementById("publisher").style.top = "30px";
                            // document.getElementById("subscriber").style.left = "5px";
                            document.getElementById("publisher").style.overflow = "none";
                        } else if (event.stream.videoType == 'camera' || event.stream.videoType == null) {
                            //if ($scope.ishosted == true) {
                            //    alert("welcome to stop shareing 123");
                            //    session.disconnect();
                            //    session = null;
                            //    $("#startvideochat").css('display', 'none');
                            //}
                            //else {
                            //    $("#startvideochat").css('display', 'block');
                            //}
                        }
                        else {
                            console.log("streamDestroyed-nothing implemented");
                        }
                    });


                    session.on("connectionDestroyed", function (event) {
                        //alert("connectionDestroyed - SingleChat")
                        // Happens when Host EndMeeting
                        var postdata = { sessionId: $scope.SessionId }

                        $http.post('/api/student/getvideosession/', postdata).then(function (response) {
                            if (response.data.result == "Success") {
                                var isActive = response.data.isActiveSession;
                                //alert(isActive)
                                //var isActive = videoSession[0].IsActive;
                                if (isActive == "False") {
                                    session.disconnect();
                                    session = null;
                                    //alert("Meeting is ended by Host")
                                    $("#startvideochat").css('display', 'none');
                                }
                            }
                            common.logger.logSuccess("You disconnected session.");
                        });
                    });

                    session.on("sessionDisconnected", function (event) {
                        //console.log("sessionDisconnected event")
                        //console.log(event)
                        //alert("sessionDisconnected - SingleChat")
                        //alert("event.reason 3");
                        //alert(event.reason);
                    });


                    session.on("streamCreated", function (event) {
                        //alert("streamCreated - SingleChat")

                        if (event.stream.videoType === 'screen') {
                            $("#btnShareScreen").css('display', 'none');
                            session.subscribe(event.stream, 'subscriber', {
                                insertMode: 'append',
                                width: '150',
                                height: '150'
                            });
                            var xyz = document.getElementsByClassName("OT_root OT_subscriber OT_fit-mode-contain");

                            xyz[0].style.width = "100%";
                            xyz[0].style.height = "100%";
                            xyz[0].style.position = "absolute";
                            console.log(xyz[0].style)
                            document.getElementById("subscriber").childNodes[0].style.width = "60px";
                            document.getElementById("subscriber").childNodes[0].style.height = "52px";
                            document.getElementById("subscriber").childNodes[0].style.position = "absolute";
                            document.getElementById("subscriber").childNodes[0].style.top = "50px";
                            document.getElementById("subscriber").childNodes[0].style.left = "100px";

                            document.getElementById("publisher").style.width = "60px";
                            document.getElementById("publisher").style.height = "52px";
                            document.getElementById("publisher").style.position = "absolute";
                            document.getElementById("publisher").style.top = "30px";
                            document.getElementById("subscriber").style.left = "5px";
                            document.getElementById("publisher").style.overflow = "none";

                        } else {
                            var options = { width: 150, height: 150, insertMode: 'append' }
                            session.subscribe(event.stream, 'subscriber', options);
                            document.getElementById("subscriber").childNodes[0].style.width = "100%";
                            document.getElementById("subscriber").childNodes[0].style.height = "92%";
                            document.getElementById("subscriber").childNodes[0].style.position = "absolute";
                            document.getElementById("subscriber").childNodes[0].style.top = "85px";
                        }


                        // if some one connects then archive
                        //console.log("createarchive about to call");
                        //alert("createarchive about to call");
                        $http.post('/api/student/createarchive/' + frienduserid).then(function (response) {
                            //console.log("response.data.result");
                            //console.log(response.data.result);
                            if (response.data.result == "Success") {
                                $scope.TokBoxInfo = response.data.tokboxinfo;
                                var apikey = $scope.TokBoxInfo[0].APIKey;
                                var sessionId = $scope.TokBoxInfo[0].SessionId;
                                var token = $scope.TokBoxInfo[0].AccessToken;
                                var session = OT.initSession(apikey, sessionId);
                                session.connect(token, function (err) {
                                    if (err) {
                                        //   alert("there is an error while connecting to the session!");
                                    } else {
                                        //session.publish();
                                    }
                                });
                            } else {
                                console.log("Failed to save : " + response.data.result);
                                //common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });

                    });

                    // in SingleChatVideo
                    $scope.StartShare = function () {
                        // alert("welecome to start share");

                        //Disable Screen Share button
                        $("#btnShareScreen").css('display', 'none');

                        OT.checkScreenSharingCapability(function (response) {
                            if (!response.supported || response.extensionRegistered === false) {
                                // This browser does not support screen sharing.
                            } else if (response.extensionInstalled === false) {
                                // Prompt to install the extension.
                            } else {
                                // Screen sharing is available. Publish the screen.

                                /*
                                var publishOptions = {};
                                publishOptions.maxResolution = { width: 1920, height: 1080 };
                                publishOptions.videoSource = 'screen';
                                */


                                var publisher = OT.initPublisher('screen-preview',
                                    { videoSource: 'screen', width: 600, height: 350 },
                                    function (error) {
                                        if (error) {
                                            // Look at error.message to see what went wrong.
                                        } else {
                                            session.publish(publisher, function (error) {
                                                if (error) {
                                                    // Look error.message to see what went wrong.
                                                }
                                            });
                                        }
                                    }
                                ); // end of OT.initPublisher()

                                publisher.on("mediaStopped", function (event) {
                                    // alert("mediaStopped4")
                                    $("#btnShareScreen").css('display', 'block');
                                });
                            }
                        });
                    }
                });
            } // $scope.SingleChatVideo Subscriber ends

            $scope.NotificationsHistory = function () {
                $scope.ShowHide(0);
                //alert($scope.id)
                $http.get('/api/user/notificationshistory/' + $scope.id).then(function (response) {
                    $scope.notificationhistory = response.data.notificationhistory;
                    //alert($scope.notificationhistory)
                });
                $("#NotificationsHistory1").css('display', 'block');
                $("#NotificationsHistoryclose").click(function () {
                    $("#NotificationsHistory1").css('display', 'none');
                });
            }

            $scope.ChatIssues = function () {
                //alert("managenotifications")
                $("#chatissues").css('display', 'block');
                $("#ChatNew_entry_Groups").css('display', 'none');
                $("#editgroup").css('display', 'none');
                $("#chatusers1").css('display', 'none');
                $("#managefriends1").css('display', 'none');
                $("#managemembers").css('display', 'none');
                $("#addnewfriend").css('display', 'none');
                $("#New_entry_Members").css('display', 'none');
                $("#myModaladdQuestion").css('display', 'none');
                $("#managegroups1").css('display', 'none');

                $http.get('/api/chat/userchatissues/').then(function (response) {
                    $scope.chatissues = response.data.chatissues;
                    //alert($scope.chatissues);
                });

                $("#chatissueclose").click(function () {
                    $("#chatissues").css('display', 'none');
                });

            }




            $scope.managenotifications = function () {
                //alert("managenotifications")
                $("#managenotifications1").css('display', 'block');
                $("#ChatNew_entry_Groups").css('display', 'none');
                $("#editgroup").css('display', 'none');
                $("#chatusers1").css('display', 'none');
                $("#managefriends1").css('display', 'none');
                $("#managemembers").css('display', 'none');
                $("#addnewfriend").css('display', 'none');
                $("#New_entry_Members").css('display', 'none');
                $("#myModaladdQuestion").css('display', 'none');
                $("#managegroups1").css('display', 'none');

                $http.get('/api/chat/usernotificationtypes/').then(function (response) {
                    $scope.userNotificationtypes = response.data.userNotificationTypes;
                    //alert($scope.userNotificationtypes)
                    //$scope.subscription = true;
                });

                $("#managenotificationsclose").click(function () {
                    $("#managenotifications1").css('display', 'none');
                });

            }

            $scope.ToggleCheck = function (subscription, notificationTypeId, userNotificationTypeId) {
                //alert(subscription)
                //alert(notificationTypeId)
                //alert(userNotificationTypeId)
                if (userNotificationTypeId == null) { userNotificationTypeId = -1 }
                if (subscription == true) {
                    $scope.sdatashow = true;
                    var postdata = { notificationstatus: $scope.sdatashow };
                    $http.post('/api/chat/notificationssettings/' + notificationTypeId + '/' + userNotificationTypeId, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.managenotifications();
                        }
                    });
                }
                else {
                    $scope.sdatashow = false;
                    var postdata = { notificationstatus: $scope.sdatashow };
                    $http.post('/api/chat/notificationssettings/' + notificationTypeId + '/' + userNotificationTypeId, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.managenotifications();
                        }
                    });
                }
                //refresh

                //$http.get('/api/chat/usernotificationtypes/').then(function (response) {
                //    $scope.userNotificationtypes = response.data.userNotificationTypes;
                //    //alert($scope.userNotificationtypes)
                //    //$scope.subscription = true;
                //});
            }

            $scope.Contribute = function (t, c, l, index) {
                $scope.totallike = c.totallikes;
                $scope.dislikes = c.dislikes;
                $scope.likesadded = c.likeadded;
                if ($scope.totallike >= 1 && $scope.likesadded == $scope.id) {
                    common.logger.logSuccess("You already liked for this comment.");
                }
                else {
                    $scope.GroupQuestionId = t.GroupQuestionId;
                    $scope.GroupQuestionCommentId = c.GroupQuestionCommentId;
                    $scope.contribution = l;
                    $http.get('/api/discussions/questioncontribution/' + $scope.GroupQuestionId + "/" + $scope.GroupQuestionCommentId + "/" + $scope.contribution).then(function (response) {
                        $scope.QuestionExpand($scope.index, $scope.GroupQuestionId);
                    });
                }
            }

            $scope.DislikesContribute = function (t, c, l, index) {
                $scope.totallike = c.totallikes;
                $scope.dislikes = c.dislikes;
                $scope.likesadded = c.likeadded;
                if ($scope.dislikes >= 1 && $scope.likesadded == $scope.id) {
                    common.logger.logSuccess("You already Dislliked for this comment.");
                }
                else {
                    $scope.GroupQuestionId = t.GroupQuestionId;
                    $scope.GroupQuestionCommentId = c.GroupQuestionCommentId;
                    $scope.contribution = l;
                    $http.get('/api/discussions/questioncontribution/' + $scope.GroupQuestionId + "/" + $scope.GroupQuestionCommentId + "/" + $scope.contribution).then(function (response) {
                        $scope.QuestionExpand($scope.index, $scope.GroupQuestionId);
                    });
                }
            }

            //$scope.filteredquestions = function (questions) {
            //    alert(questions);
            //}

            $scope.GroupPage = function (groupid) {
                //alert(groupid);
                ////sharedProperties.setProperty(groupid);
                $scope.screenshot = false;
                $scope.GroupId = groupid;
                $("#chatusers1").css('display', 'none');
                $("#managegroups1").css('display', 'none');
                $("#managefriends1").css('display', 'none');
                $("#myModal2").css('display', 'none');
                $("#myModaladdQuestion").css('display', 'none');
                $("#ChatNew_entry_Groups").css('display', 'none');
                $("#addnewfriend").css('display', 'none');
                $("#New_entry_Members").css('display', 'none');
                $("#managemembers").css('display', 'none');
                $("#editgroup").css('display', 'none');
                $("#myModal2").css('display', 'block');
                $("#myModal").css('display', 'block');

                $("#CBChatSummary").css('display', 'none');
                $("#EditQuestion").css('display', 'none');


                $("#groupclose").click(function () {
                    $("#myModal").css('display', 'none');
                });
                $("#AddQuestionPopClose").click(function () {
                    $("#myModaladdQuestion").css('display', 'none');
                    $("#myModal").css('display', 'block');
                });
                $("#AddQuestionPopClose1").click(function () {
                    $('#ChatScreenShot').val('');

                    $("#myModaladdQuestion").css('display', 'none');
                    $("#myModal").css('display', 'block');
                });
                $scope.ProjectStepSpin = true;
                $scope.paging = false;
             
                $scope.value = 0;
                $scope.limit = 10;
                $http.get("/api/discussions/student/questions/" + $scope.value + "/" + $scope.limit + "/" + $scope.GroupId).then(function (response) {
                    if (response.data.status == "Success") {
                        $scope.ProjectStepSpin = false;
                        $scope.paging = true;
                    }
                    $scope.discussions = response.data.discussions;
                    $scope.subscribers = response.data.subscribers;
                    $scope.groupinfo = response.data.groupinfo;
                    $scope.GroupName = $scope.groupinfo;
                    $scope.username = response.data.username;
                    $scope.profileimage = response.data.profileimage;
                    $scope.profile = $scope.profileimage[0].ProfileImage;
                    $scope.ShowHide($scope.groupid);
                });

                $scope.nextScrollTopForFetch = 520;
                $scope.nextScrollRequestNum = 1;
                $scope.moreProjectsToPull = true;

                $scope.maxScrollTop = 1500;
                $scope.firstTime = true;
                $scope.prevScrollTop = $('#divMyContent1').scrollTop();

                //angular.element(document.querySelector('.myDiv')).bind('scroll', function () {
                angular.element($('#divMyContent1')).bind('scroll', function () {
                    //$('#showDebug').text($('#divMyContent').scrollTop());
                    console.log("scrollTop=" + $('#divMyContent1').scrollTop() + "; prevScrollTop=" + $scope.prevScrollTop);

                    if ($scope.firstTime == false && $('#divMyContent1').scrollTop() >= $scope.prevScrollTop-10) {
                        alert("fetch");
                    }

                    $scope.firstTime = false;

                    if ($('#divMyContent1').scrollTop() > $scope.prevScrollTop) {
                        $scope.prevScrollTop = $('#divMyContent1').scrollTop();
                    }
                    

                    

                    //if ($('#divMyContent1').scrollTop() > $scope.maxScrollTop ) {
                    //    $scope.maxScrollTop = $('#divMyContent1').scrollTop()
                    //}

                    ////console.log("window-scrollTop=" + $('#divMyContent1').scrollTop() + "; document.height=" + $(document).height() + "; window.innerheight" + indow.innerHeight)
                    //console.log("scrollTop=" + $('#divMyContent1').scrollTop() + "; nextScrollTopForFetch=" + $scope.nextScrollTopForFetch);
                    ////if ($('#divMyContent1').scrollTop() > $scope.nextScrollTopForFetch) {
                    //if ($('#divMyContent1').scrollTop() == $scope.maxScrollTop) {
                    //    // uncomment me.
                    //    alert("show me");
                    //    $scope.GroupDiscussions();
                        
                    //}
                })



                ////$scope.currentPage = 0;
                ////$scope.pageSize = 10;
                ////$scope.discussions = [];
                ////for (var i = 0; i < $scope.discussions; i++) {
                ////    $scope.discussions.push("i" + i);
                ////}


                $scope.CommentPopup = function (d) {
                    $scope.GroupQuestionComment = d.GroupQuestionComment;
                    $scope.questiontext = d.GroupQuestionText;
                    $("#CommentPopup").css('display', 'block');
                }
                $scope.MessageRead = function (groupid, questionid) {
                    $scope.groupid = groupid;
                    $scope.questionid = questionid;
                    $http.get('/api/chat/missedmessages/' + $scope.groupid + "/" + $scope.questionid).then(function (response) {
                        $scope.discussions = response.data.discussions;
                        $scope.subscribers = response.data.subscribers;
                        $scope.groupinfo = response.data.groupinfo;
                        //$scope.groupname = $scope.groupinfo[0].GroupName;
                        $scope.GroupName = $scope.groupinfo;
                        $scope.username = response.data.username;
                        $scope.profileimage = response.data.profileimage;
                        $scope.profile = $scope.profileimage[0].ProfileImage;
                        $scope.messages = response.data.missedmessages;
                        $scope.ShowHide($scope.groupid);

                    });

                }
            }

            $scope.GroupDiscussions = function () {
                $scope.nextScrollTopForFetch += 520;
                var scrollval = $scope.nextScrollRequestNum;
                $scope.scrollval = scrollval;
                $scope.nextScrollRequestNum = $scope.nextScrollRequestNum + 1;

                return;

                $http.get('/api/discussions/student/questions/' + $scope.scrollval + "/" + 9 + "/" + $scope.GroupId).then(function (response) {
                    var resultsArray = Object.values(response.data.discussions);
                    $scope.discussions = Object.values($scope.discussions).concat(resultsArray);
                    if (resultsArray.length > 0) {
                        // alert(resultsArray.length)
                        $scope.isValid = true;
                        $scope.moreProjectsToPull = true;
                    }
                    else {
                        //alert(resultsArray.length)
                        $scope.isValid = false;
                        $scope.moreProjectsToPull = false;
                    }

                    //$scope.clients.concat(response.data.results);
                    //$scope.lastmodified = response.lastmodified;
                });
            }


            $scope.Fileupload = function () {
                var fd = new FormData();
                if (document.getElementById('ChatScreenShot').files[0] != null) {
                    fd.append('file', document.getElementById('ChatScreenShot').files[0]);
                    $.ajax({
                        url: '/api/chat/upload',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            if (data.result == "success") {
                                $scope.file = data.fileName;
                                $scope.ChatScreenShotUploadFiles = [];
                                $scope.ChatScreenShotUploadFiles.push(data.filename)
                                $scope.$apply(function () {
                                    $scope.documentlink = 'https://app.colaberry.com' + data.fileURL;
                                    $scope.newEvent.DocumentLink = 'https://app.colaberry.com' + data.fileURL;
                                });
                                common.logger.logSuccess("File has been successfully uploaded.");
                            } else {
                                common.logger.logError("Failed to upload. " + data.message);
                            }
                        }
                    });
                }
            }
            $scope.FileuploadQuestion = function (index) {
                var fd = new FormData();
                if (document.getElementById('QuestionChatScreenShot' + index).files[0] != null) {
                    fd.append('file', document.getElementById('QuestionChatScreenShot' + index).files[0]);
                    $.ajax({
                        url: '/api/chat/upload',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            if (data.result == "success") {
                                $scope.file = data.fileName;
                                $scope.ChatScreenShotUploadFiles = [];
                                $scope.ChatScreenShotUploadFiles.push(data.filename)
                                $scope.$apply(function () {
                                    $scope.documentlink = 'https://app.colaberry.com' + data.fileURL;
                                    $scope.newEvent.DocumentLink = 'https://app.colaberry.com' + data.fileURL;
                                });
                                common.logger.logSuccess("File has been successfully uploaded.");
                            } else {
                                common.logger.logError("Failed to upload. " + data.message);
                            }
                        }
                    });
                }
            }

            $scope.GroupemailFileupload = function () {
                var fd = new FormData();
                if (document.getElementById('GroupScreenShot').files[0] != null) {
                    fd.append('file', document.getElementById('GroupScreenShot').files[0]);
                    $.ajax({
                        url: '/api/chat/upload',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            if (data.result == "success") {
                                $scope.file = data.fileName;
                                $scope.ChatScreenShotUploadFiles = [];
                                $scope.ChatScreenShotUploadFiles.push(data.filename)
                                $scope.$apply(function () {
                                    $scope.documentlink = 'https://app.colaberry.com' + data.fileURL;
                                    $scope.newEvent.DocumentLink = 'https://app.colaberry.com' + data.fileURL;
                                });
                                common.logger.logSuccess("File has been successfully uploaded.");
                            } else {
                                common.logger.logError("Failed to upload. " + data.message);
                            }
                        }
                    });
                }
            }

            $scope.CommentPopClose = function () {
                $("#CommentPopup").css('display', 'none');
            }

            $scope.SaveFriends = function (sid) {
                $scope.sid = sid;
                $http.get("/api/student/getfriends/" + $scope.sid).then(function (response) {
                    $scope.friendid = response.data.UserId;
                    $scope.friendlist = response.data.frienduserid;
                    if ($scope.friendid == $scope.sid) {
                        common.logger.logError("You both are already friends.");
                        var $select = $('#select-friendsrepo').selectize();
                        var control = $select[0].selectize;
                        control.clear();
                    }
                    else if ($scope.friendlist == $scope.sid) {
                        common.logger.logError("You both are already friends.");
                        var $select = $('#select-friendsrepo').selectize();
                        var control = $select[0].selectize;
                        control.clear();
                    }

                    else if ($scope.sid == $scope.id) {
                        common.logger.logError("Unable to add friend.");
                        var $select = $('#select-friendsrepo').selectize();
                        var control = $select[0].selectize;
                        control.clear();
                    }
                    else {
                        $scope.studentid = "";
                        var postdata = { memberid: sid };
                        $http.post("/api/student/sendfriendrequest/", postdata).then(function (response) {
                            if (response.data.result == "Success") {
                                $scope.ManageFriends();
                                $scope.ShowHide(0);
                                common.logger.logSuccess("Successfully sent friend request.");
                                var $select = $('#select-friendsrepo').selectize();
                                var control = $select[0].selectize;
                                control.clear();
                            } else {
                                common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });
                    }
                });

            }

            $scope.getFilteredQuestions = function (questions) {
                //console.log(questions);
                var arrQuestions = Object.keys(questions.GroupQuestionText);
                //console.log(arrQuestions);
                var count = arrQuestions.length;
                console.log(count);
                var filteredQuestions = [];
                // alert(filteredQuestions);


                for (i = 0; i < 2; i++) {
                    filteredQuestions.push(arrQuestions[0]);
                    //return true;
                }

                console.log("filteredQuestions:");
                console.log(filteredQuestions);
                return filteredQuestions;
            }



            //$scope.filterquestions = function (questions) {

            //    var count = Object.keys(questions).length;
            //    console.log(count);
            //    $scope.questions = questions
            //    alert($scope.questions);

            //    for (i = 0; i < 2; i++) {
            //        $scope.discussions = $scope.questions.GroupQuestionText;

            //        return true;
            //    }

            //    // logic for loop ... just get two questions and return

            //}



            $scope.ManageGroupPage = function () {
                //alert("managegroup came");
                $("#ChatNew_entry_Groups").css('display', 'none');
                $("#editgroup").css('display', 'none');
                $("#chatusers1").css('display', 'none');
                $("#managefriends1").css('display', 'none');
                $("#managemembers").css('display', 'none');
                $("#addnewfriend").css('display', 'none');
                //$("#managegroups").css('display', 'none');
                $("#New_entry_Members").css('display', 'none');
                $("#myModaladdQuestion").css('display', 'none');
                $("#managegroups1").css('display', 'block');
                $("#managegroupclose").click(function () {
                    $("#managegroups1").css('display', 'none');
                });
                $("#GroupEditClose").click(function () {
                    $("#editgroup").css('display', 'none');
                    $("#managegroups1").css('display', 'block');
                });
                $("#GroupEditClose1").click(function () {
                    $("#editgroup").css('display', 'none');
                    $("#managegroups1").css('display', 'block');
                });
                $("#addgroupclose").click(function () {
                    $("#ChatNew_entry_Groups").css('display', 'none');
                    $("#managegroups1").css('display', 'block');
                });
                $("#addgroupclose1").click(function () {
                    $("#ChatNew_entry_Groups").css('display', 'none');
                    $("#managegroups1").css('display', 'block');
                });
                $scope.GroupId = 0;
                $http.get("/api/chat/getgroups/" + $scope.GroupId).then(function (response) {
                    $scope.managegroups = response.data.managegroups;
                    $scope.memberscount = response.data.GroupMembersCount;
                });
                $scope.GetModeratorgroups = function () {
                    $("#managegroups1").css('display', 'none');
                    $("#New_entry_Groupemails").css('display', 'block');
                    $scope.newEntry = {};
                    $scope.Groupemailtitle = "";
                    $scope.Groupemailmessage = "";


                    $http.get('/api/chat/moderatorgroups').then(function (response) {
                        $scope.moderatorgroups = response.data.moderatorgroups;
                    });
                }
                $scope.SelectGroups = function () {
                    $scope.btnSavegroupemails = true;
                    $scope.selected = [];
                    for (var i in $scope.moderatorgroups) {

                        var item = $scope.moderatorgroups[i];
                        if (item.checked) {
                            $scope.selected.push({ Groupid: item.GroupId, Groupname: item.GroupName });
                        }
                    }
                }
                $scope.SaveGroupemails = function () {
                    $scope.ChatScreenShotUploadFiles = [];
                    $scope.GroupemailFileupload();
                    var groupemails = $('#groupemails').summernote('code');
                    $("#New_entry_Groupemails").css('display', 'none');
                    $("#managegroups1").css('display', 'block');
                    var items = null;
                    if ($scope.selected != '') {
                        var items = $scope.selected;
                    }
                    else {
                        var items = null;
                    }
                    var postdata = { selectedItems: items, groupinfo: $scope.newEntry, UploadFile: $scope.ChatScreenShotUploadFiles, groupemails: groupemails }

                    //$http.post('/api/chat/sendgroupemails', { selectedItems: items, groupinfo: $scope.newEntry }).then(function (response) {
                    $http.post('/api/chat/sendgroupemails', postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            common.logger.logSuccess("Successfully send emails.");
                            $scope.ManageGroupPage();
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                    $('#GroupScreenShot').val('');
                    $('#groupemails').summernote('code', '');
                }
                $("#addgoupemailsclose").click(function () {
                    $("#New_entry_Groupemails").css('display', 'none');
                });

            }




            $("#managegroupclose").click(function () {
                $("#managegroups1").css('display', 'none');
            });

            $("#managefriendclose").click(function () {
                $("#managegroups1").css('display', 'none');
                $("#managefriends1").css('display', 'none');
            });


            $scope.ManageFriends = function () {

                // working
                //var zzzzz = $("#divCBFriends").children();

                //console.log("zzzzz=");
                ////console.log(zzzzz);
                ////console.log(zzzzz[0])
                ////console.log(zzzzz.childNodes[0].length)
                //var temp1 = zzzzz[0];
                //var temp2 = zzzzz[1];

                ////temp1 = 
                //for (var i = 0; i < zzzzz.length; i++) {
                //    console.log(zzzzz[i])
                //}

                //$("#divCBFriends").empty();
                //$("#divCBFriends").append(temp2);
                //$("#divCBFriends").append(temp1);

                //var mylist = $('#divCBFriends');
                //var listitems = mylist.children("div");
                //listitems.sort(function (a, b) {
                //    //var compA = $(a).text().toUpperCase();
                //    //var compB = $(b).text().toUpperCase();
                //    //return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                //    //alert(a)
                //    console.log(a)
                //    console.log(b)
                //    var mycircleA = $(a).find("i").css("color");
                //    console.log("mycircleA:");
                //    console.log(mycircleA);

                //    //if (mycircleA == 'rgb(0, 128, 0)') {
                //    //    alert("green color");
                //    //}
                //    //else {
                //    //    alert("else color");
                //    //}


                //    var mycircleB = $(b).find("i").css("color");
                //    console.log("mycircleB:");
                //    console.log(mycircleB);

                //    return (mycircleA == 'rgb(0, 128, 0)') ? -1 : 1;
                //})

                //$(mylist).append(listitems);

                $("#chatusers1").css('display', 'none');
                $("#editgroup").css('display', 'none');
                $("#ChatNew_entry_Groups").css('display', 'none');
                $("#addnewfriend").css('display', 'none');
                $("#managegroups1").css('display', 'none');
                $("#managemembers").css('display', 'none');
                $("#New_entry_Members").css('display', 'none');
                $("#myModaladdQuestion").css('display', 'none');
                $("#managefriends1").css('display', 'block');
                $("#myModal2").css('display', 'block');
                $("#managefriendclose").click(function () {
                    $("#managefriends1").css('display', 'none');
                });
                $("#addfriends").click(function () {
                    $("#addnewfriend").css('display', 'block');
                });
                $("#FriendClose").click(function () {
                    $("#addnewfriend").css('display', 'none');
                    $("#managefriends").css('display', 'block');
                });
                $("#FriendClose1").click(function () {
                    $("#addnewfriend").css('display', 'none');
                    $("#managefriends").css('display', 'block');
                });

                $http.get('/api/chat/getfriends').then(function (response) {
                    $scope.managefriends = response.data.managefriends;
                    $scope.userid = response.data.userid;
                });
            }

            $scope.ManageFriends1 = function () {
                $http.get('/api/chat/getfriends').then(function (response) {
                    $scope.managefriends = response.data.managefriends;
                    $scope.userid = response.data.userid;
                    $("#managefriends1").css('display', 'block');
                    $scope.ShowHide2(0);
                    $("#managefriendclose").click(function () {
                        $("#managefriends1").css('display', 'none');
                    });
                    $("#addfriends").click(function () {
                        $("#addnewfriend").css('display', 'block');
                    });
                    $("#FriendClose").click(function () {
                        $("#addnewfriend").css('display', 'none');
                        $("#managefriends").css('display', 'block');
                    });
                    $("#FriendClose1").click(function () {
                        $("#addnewfriend").css('display', 'none');
                        $("#managefriends").css('display', 'block');
                    });
                });
            }

            $scope.RemoveFriend = function (friendid, userid, firstname) {
                var cfm = confirm("Are you sure you want to unfriend with " + firstname);
                if (cfm) {
                    $scope.friendid = friendid;
                    $scope.userid = userid;
                    $http.post('/api/chat/removefriend/' + $scope.friendid + "/" + $scope.userid).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.ManageFriends();
                            $scope.ShowHide(0);
                            common.logger.logSuccess("Successfully removed friend.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }
            }
            $scope.AcceptFriend = function (friendid, UserId) {
                $scope.UserId = UserId;
                $scope.friendid = friendid;
                $scope.userid = '' + friendid
                $http.post('/api/chat/acceptfriend/' + $scope.friendid + "/" + $scope.UserId).then(function (response) {
                    if (response.data.result == "Success") {
                        $scope.ManageFriends();
                        $scope.ShowHide(0);
                        //$scope.loadPage(true);
                        common.logger.logSuccess("Successfully accepted friend request.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });

            }
            $scope.RejectFriend = function (friendid, userid) {
                $scope.friendid = friendid;
                $scope.userid = userid;
                $http.post('/api/chat/rejectfriend/' + $scope.friendid + "/" + $scope.userid).then(function (response) {
                    if (response.data.result == "Success") {
                        $scope.ManageFriends();
                        $scope.ShowHide(0)
                        common.logger.logSuccess("Rejected your friend request.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });

            }


            $scope.ManageGroup = function () {
                $("#managegroups1").css('display', 'none');
                $("#ChatNew_entry_Groups").css('display', 'block');
                $("#groupclose").click(function () {
                    $("#ChatNew_entry_Groups").css('display', 'none');
                    $("#managegroups1").css('display', 'block');

                });

                $scope.CCS_GroupID == null;
                $scope.newEntry = {};
            }




            $scope.DeleteGroup = function (groupid) {
                $scope.GroupId = groupid;
                var cfm = confirm("Are you sure do you want to delete the group?");
                if (cfm) {
                    $http.post('/api/chat/deletegroup/' + $scope.GroupId).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.ManageGroupPage();
                            $scope.ShowHide(groupid);
                            //$scope.loadPage(true);
                            common.logger.logSuccess("Successfully deleted group.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }
            }

            $scope.SaveGroups = function (CCS_GroupID) {

                //alert("one save group")
                if (CCS_GroupID == 0) {
                    $scope.CCS_GroupID = 0;
                    var postdata = { formdata: $scope.newEntry }
                    $http.post('/api/chat/savegroups/' + $scope.CCS_GroupID, postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            $scope.ManageGroupPage();
                            $scope.ShowHide(0);
                            //$scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.errorMessage);
                        }
                    });
                }
                else {
                    var postdata = { formdata: $scope.newEntry }
                    $http.post('/api/chat/savegroups/' + $scope.CCS_GroupID, postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            $scope.ManageGroupPage();
                            $scope.ShowHide(CCS_GroupID);
                            //$scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.errorMessage);
                        }
                    });
                }
            }

            $scope.FriendClose = function () {
                $('#addnewfriend').modal('hide');
            }

            $scope.EditGroup = function (i) {
                $("#managegroups1").css('display', 'none');
                $("#editgroup").css('display', 'block');
                $scope.newEntry = {};
                $scope.newEntry.GroupName = i.GroupName;
                $scope.newEntry.MemberName = i.Username;
                $scope.newEntry.IsPublic = i.IsPublic;
                $scope.CCS_GroupID = i.GroupId;
            }

            $scope.GroupEditClose = function () {
                $('#editgroup').modal('none');
            }

            $scope.ManageMembers = function (groupid) {
                $("#New_entry_Members").css('display', 'none');
                $("#managegroups1").css('display', 'none');
                $("#managemembers").css('display', 'block');
                $("#managemembers1").click(function () {
                    $("#managemembers").css('display', 'none');
                    $("#managegroups").css('display', 'block');

                });
                $("#clear").click(function () {
                    $("#myCheck").prop("checked", false);

                });

                $scope.groupid = groupid;
                $http.get("/api/chat/getgroupmembers/" + $scope.groupid).then(function (response) {
                    $scope.managemembers = response.data.managemembers;
                    $scope.GroupName = response.data.groupname;
                    $scope.amIModerator = response.data.amIModerator;
                });
            }

            $scope.AddMember = function (groupid) {
                $("#New_entry_Members").css('display', 'block');
                $("#managemembers").css('display', 'none');
                $("#MemberClose1").click(function () {
                    $("#New_entry_Members").css('display', 'none');
                    $("#managemembers").css('display', 'block');
                });
                $("#MembersClose").click(function () {
                    $("#New_entry_Members").css('display', 'none');
                    $("#managemembers").css('display', 'block');
                });
            }

            ////$scope.MakeModerator = function (i) {
            ////    $scope.memberid = i.Id;
            ////    $scope.moderator = i.Moderator;
            ////    if ($scope.moderator == 0) {
            ////        $http.post('/api/chat/addmoderator/' + $scope.memberid).then(function (response) {
            ////            if (response.data.status == "Success") {
            ////                $scope.loadPage(true);
            ////                common.logger.logSuccess("Successfully added moderator.");
            ////            } else {
            ////                common.logger.logError("Failed to save : " + response.data.message);
            ////            }
            ////        });
            ////    }
            ////    else {
            ////        $http.post('/api/chat/addmoderator/' + $scope.memberid).then(function (response) {
            ////            if (response.data.status == "Success") {
            ////                $scope.loadPage(true);
            ////                common.logger.logSuccess("Successfully removed moderator.");
            ////            } else {
            ////                common.logger.logError("Failed to save : " + response.data.message);
            ////            }
            ////        });
            ////    }

            ////}

            //Toggle the Moderator
            $scope.MakeModerator = function (i) {
                $http.post('/api/chat/togglemoderator/group/' + i.GroupId + "/user/" + i.UserId).then(function (response) {
                    if (response.data.status == "Success") {
                        //$scope.loadPage(true);
                        common.logger.logSuccess("Successfully modified the moderator.");
                        $scope.ManageMembers(i.GroupId);
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            $scope.mode = {
                ischecked: true
            }

            $scope.SaveMembers = function (sid, moderator) {
                $scope.studentid = sid;
                var postdata = { sid: sid, moderator: moderator }
                var groupid = $scope.groupid;
                //$http.post('/api/chat/savegroupmembers/' + $scope.groupid + "/" + $scope.studentid).then(function (response) {

                $http.get('/api/student/group/' + $scope.groupid + "/" + $scope.studentid).then(function (response) {
                    $scope.groupuserid = response.data.groupuserid;
                    if ($scope.groupuserid == $scope.studentid) {
                        common.logger.logWarning("You both are already group memebers.");
                        var $select = $('#select-repoformembers').selectize();
                        var control = $select[0].selectize;
                        control.clear();
                    }

                    else {
                        $http.post('/api/chat/savegroupmembers/' + $scope.groupid, postdata).then(function (response) {
                            if (response.data.status == "Success") {
                                //$scope.loadPage(true);
                                $scope.ManageMembers(groupid);
                                common.logger.logSuccess("Successfully saved.");
                                // clear the selectize box
                                var $select = $('#select-repoformembers').selectize();
                                var control = $select[0].selectize;
                                control.clear();

                            } else {
                                common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });
                    }
                });
            }

            $scope.LeaveGroup = function (groupid, userid) {
                $scope.groupid = groupid;
                $scope.userid = userid;
                $http.post('/api/chat/leavegroupmembers/' + $scope.groupid + "/" + $scope.userid).then(function (response) {
                    if (response.data.result == "Success") {
                        common.logger.logSuccess("Successfully removed from the group.");
                        $scope.ManageMembers(groupid);
                        $scope.ManageGroupPage();
                        $scope.ShowHide(0);
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });

            }


            $scope.show = function (f, i) {
                $scope.questionid = i;
                $scope.start = false;
                $scope.screenshot = f;
            }

            $scope.hide = function (f, groupid) {
                $scope.screenshot = -1;
                $scope.start = false;
            }

            $scope.GetProcessesSummary = function (f, i) {
                $scope.showplusindex = f;
                $scope.start = false;
            }

            $scope.HideProcessesSummary = function (f) {
                $scope.showplusindex = -1;
                $scope.start = false;
            }

            $scope.QuestionExpand = function (f, i) {

                //if ($scope.questionViewMode == 'collapse') {
                //    alert("if came");
                //    $scope.questionViewMode = 'expand'
                //    alert($scope.questionViewMode);
                //}
                //else {
                //    alert("else came");
                //    return;
                //}


                $scope.index = f;
                $scope.GroupIdQuestionid = i;
                $http.get("/api/student/questions/" + $scope.GroupIdQuestionid).then(function (response) {
                    $scope.loggeduser = response.data.userName;
                    $scope.questioninfo = response.data.questioninfo;
                    $scope.profileimage = response.data.profileimage;
                    $scope.profile = $scope.profileimage[0].ProfileImage;
                    $scope.Questioncomments = response.data.questioncommentinfo;
                    $scope.groupchatpartcipantscount = response.data.participantcount;
                    $scope.livevideocount = response.data.livevideocount;
                    $scope.livecount = $scope.livevideocount[0].livecount;
                    $scope.contributerscount = response.data.ContributorsCount;
                    $scope.commentid = $scope.contributerscount[0].commentid;
                    $scope.contributes = $scope.contributerscount[0].totallikes;
                    $scope.userid = '' + response.data.userid;
                    $scope.userid = '' + response.data.userid;
                    $scope.roomid = '' + response.data.roomid;
                    $scope.commentBox.textRequired = true;

                    //$scope.questionViewMode == 'collapse'
                });
                $scope.showplusindex_details = f;
                $scope.start = false;
                $scope.isdisabled1 = true;
            }

            $scope.QuestionMinmize = function (f, groupid) {


                $scope.showplusindex_details = -1;
                $scope.start = false;
            }


            $scope.AddQuestions = function (GroupId) {
                $scope.ChatScreenShotUploadFiles = [];
                $scope.Fileupload();
                $scope.GroupId = GroupId;
                var stepname = $('#StepName').val()
                if (stepname != "") {
                    var detailedInstructions = $('#detailedInstructions1').summernote('code');
                    var postdata = { instructions: detailedInstructions, stepname, UploadFile: $scope.ChatScreenShotUploadFiles }
                    $http.post('/api/group/addquestion/' + $scope.GroupId, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.GroupPage(GroupId);
                            common.logger.logSuccess("Successfully saved.");
                            // sendemails
                            var questionId = response.data.questionid;
                            $scope.SendEmailsToGroupForAddQuestion($scope.GroupId, questionId, postdata);
                            $scope.ShowHide(0);

                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });

                }
                else {
                    common.logger.logError("Please Add Title");
                }

                $('#detailedInstructions1').summernote('code', '');
                $('#StepName').val("");
                $('#ChatScreenShot').val('');
            }

            $scope.SendEmailsToGroupForAddQuestion = function (groupId, questionId, postdata) {
                var url = '/api/group/' + groupId + '/question/' + questionId + '/notify';
                $http.post(url, postdata).then(function (response) {
                    if (response.data.result == "Success") {
                        //$scope.GroupPage(GroupId);
                        common.logger.logSuccess("Successfully email sent to the group members.");
                        //$http.post('sendemails......')
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }


            $scope.MailTo = function () {
                $("#mailto").css('display', 'block');
                $("#mailtoclose").click(function () {
                    $("#mailto").css('display', 'none');
                });
            }

            $scope.SendEmail = function () {
                var stepname = $('#StepName1').val()
                var detailedInstructions = $('#detailedInstructions2').summernote('code');
                var postdata = { instructions: detailedInstructions, stepname }
                $http.post('/api/group/sendemail/', postdata).then(function (response) {
                    if (response.data.result == "Success") {
                        //$scope.ShowHide(0);
                        common.logger.logSuccess("Successfully sent email.");
                        $("#mailto").css('display', 'none');
                        //$scope.loadPage(true);
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
                $('#detailedInstructions2').summernote('code', '');
                $('#StepName1').val("");
            }


            $scope.AddQuestionPopClose = function () {
                $('#ChatScreenShot').val('');
                $('#myModaladdQuestion').modal('hide');
            }


            $scope.AddComments = function (groupid, questionid, index) {
                $scope.Groupid = groupid;
                $scope.Questionid = questionid;
                // $scope.index = index;
                var detailedInstructions = $('#questioncomment' + index).summernote('code');
                if (detailedInstructions != '<p><br></p>') {
                    var postdata = { comment: detailedInstructions, groupid: $scope.Groupid, questionid: $scope.Questionid, index: $scope.index }
                    $http.post('/api/group/addquestioncomment/', postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            common.logger.logSuccess("Successfully Added comment.");
                            $scope.GroupPage($scope.Groupid);
                            $scope.QuestionExpand($scope.index, $scope.Questionid);
                            $scope.SendEmailstoQuestionSubscribers($scope.Questionid, postdata);
                            //$scope.loadPage(true);
                            $("#Chatpopup").css('display', 'block');
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }
                else {
                    common.logger.logError("Please provide comment");
                }
                $('#questioncomment').summernote('code', '');
            }

            $scope.SendEmailstoQuestionSubscribers = function (questionId, postdata) {
                var url = '/api/questionsubscribers/' + questionId + '/notify';
                $http.post(url, postdata).then(function (response) {
                    if (response.data.result == "Success") {
                        //$scope.GroupPage(GroupId);
                        common.logger.logSuccess("Successfully email sent to the question subscribers.");
                        //$http.post('sendemails......')
                    }
                    else if (response.data.result == "Successfull") {
                        common.logger.logSuccess("Your email notification is turn off.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            $scope.StartZoom = function (groupquestionid) {
                $scope.QuestionId = groupquestionid;
                $http.post('/api/student/createzoommeeting/' + $scope.QuestionId).then(function (response) {
                    if (response.data.result == "Success") {
                        if (response.data.messagecode == "Zoom-NOTAVAILABLE") {
                            //  alert("There are no available zoom meetings. Please wait and retry later")
                            return;
                        }
                        $scope.zoominfo = response.data.zoomInfo;
                        $scope.startzoom = $scope.zoominfo[0].StartUrl;
                        $window.open($scope.startzoom, '_blank');
                        common.logger.logSuccess("Started Zoom Meeting.");
                        //$scope.loadPage(true);
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            $scope.JoinZoom = function (joinurl) {
                $scope.url = joinurl;
                $window.open($scope.url, '_blank');
                common.logger.logSuccess("Join Zoom Meeting.");
            }


            $scope.MarkCommentAsAnswer = function (t, c) {
                var cfm = confirm("Are you sure to confirm this as an answer to the discussion?");
                if (cfm) {
                    common.logger.log("Please wait while the comment is being marked as answer ...");
                    $scope.GroupQuestionId = t.GroupQuestionId;
                    $scope.GroupQuestionCommentId = c.GroupQuestionCommentId;
                    var postdata = { questionid: $scope.GroupQuestionId, commentid: $scope.GroupQuestionCommentId }
                    $http.post('/api/student/discussion/markasanswer/', postdata).then(function (response) {
                        t.ThreadComments = response.data.comments;
                        t.ReplyCount = t.ThreadComments.length;
                        $scope.comments = response.data.comments;
                        $scope.status = $scope.comments[0].Status;
                        t.Status = 2;
                        t.isCollapsed = true;
                        common.logger.log("Comment has been successfully marked as answer and this thread will now be closed for further discussions. Email notifications have been sent. Thank you.");
                    });
                }
            }

            $scope.EditQuestionComment = function (c) {
                //alert("EditQuestionComment")
                $scope.newEntry = {}
                $scope.questionid = c.GroupQuestionId;
                $scope.commentid = c.GroupQuestionCommentId;
                $scope.btnSaveSummary = true;
                $scope.newEntry.commenttext = c.CommentText;
                $scope.newEntry.username = c.UserName;
                $scope.commenttext1 = c.CommentText;
            }

            $scope.EditQuestion = function (i) {
                //alert("EditQuestionComment")
                $scope.newEntry = {}
                $scope.questionid = i.GroupQuestionId;
                $scope.btnSaveSummary = true;
                $scope.newEntry.GroupQuestionComment = i.GroupQuestionComment;
                $scope.newEntry.questionedit = i.GroupQuestionText;
                //alert($scope.newEntry.questionedit);
                $scope.newEntry.questionedit = i.GroupQuestionText;
                //alert($scope.newEntry.questionedit);

            }

            $scope.SaveComment = function (j, index, groupid) {
                $scope.Groupid = groupid;
                $scope.questioncommentid = j.GroupQuestionCommentId;
                $scope.questionid = j.GroupQuestionId;
                var detailedInstructions = $('#questioncommentedit' + index).summernote('code');
                var postdata = { comment: detailedInstructions, groupid: $scope.Groupid, questionid: $scope.questionid, questioncommentid: $scope.questioncommentid }
                $http.post('/api/group/questioncommentedit/', postdata).then(function (response) {
                    if (response.data.result == "Success") {
                        common.logger.logSuccess("Successfully updated comment.");
                        $scope.QuestionExpand(j.GroupQuestionId);
                        //$scope.loadPage(true);
                        $scope.GroupPage(groupid)
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
                $('#questioncommentedit').summernote('code', '');
            }

            $scope.SaveQuestion = function (i, index) {
                $scope.ChatScreenShotUploadFiles = [];
                $scope.FileuploadQuestion(index);
                $scope.GroupId = i.GroupId;
                $scope.stepname = $('#questionedit').val()
                $scope.questionid = i.GroupQuestionId;
                $scope.questionvisuval = i.QuestionVisuval;
                var detailedInstructions = $('#editquestion' + index).summernote('code');
                var postdata = { questioncomment: detailedInstructions, questiontext: $scope.stepname, questionid: $scope.questionid, UploadFile: $scope.ChatScreenShotUploadFiles, QuestionVisuval: $scope.questionvisuval }
                $http.post('/api/group/questionedit/', postdata).then(function (response) {
                    if (response.data.result == "Success") {
                        common.logger.logSuccess("Successfully updated Question.");
                        $scope.GroupPage($scope.GroupId)
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
                $('#editquestion').summernote('code', '');
            }

            $scope.EditPopClose = function () {
                //$('#Summary').modal('hide');
                $('#CBChatSummary').modal('hide');
            }

            $scope.EditQuestionPopClose = function () {
                //$('#Summary').modal('hide');
                $('#EditQuestion').modal('hide');
            }
            $scope.ViewUser = function (k) {
                var modalinstance = $modal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'editformmodal.html',
                    controller: ['$scope', '$pusher', '$modalInstance', 'etag', function ($scope, $pusher, $modalInstance, etag) {
                        var postdata = { membername: k.Username, memberid: k.UserId };
                        $scope.groupusername = k.Username;
                        $http.post("/api/student/biofields/", postdata).then(function (response) {
                            $scope.data = response.data.data;
                            if ($scope.data.length == 0) {
                                $scope.nodata = true;
                            } else {
                                $scope.nodata = false;
                            }
                            $scope.fields = response.data.fields;
                            $scope.multiple = response.data.multiple;
                            $scope.fields.forEach(function (value, index) {

                                $scope.data.forEach(function (val, ind) {
                                    if (val.CCS_BioCatID == value.CCS_BioCatID) {

                                        if (val.CCS_BioValue) {
                                            $scope.fields[index].CCS_BioFieldData = val.CCS_BioValue;
                                        }
                                    }
                                })

                            });
                            console.log($scope.data);


                            $scope.isBusy = false;
                        });



                        $scope.filterdata = function (catid, fieldid) {

                            return catid === fieldid;

                        }
                        $scope.SendFriendRequest = function () {
                            var postdata = { membername: k.Username, groupid: k.GroupId, memberid: k.UserId };
                            $http.post("/api/student/sendfriendrequest/", postdata).then(function (response) {
                                if (response.data.result == "Success") {
                                    common.logger.logSuccess("Successfully sent friend request.");
                                    $scope.loadPage(true);
                                } else {
                                    common.logger.logError("Failed to save : " + response.data.message);
                                }
                            });
                        }

                        $scope.close = function () {
                            $modalInstance.dismiss('cancel');
                        }

                    }],
                    resolve: {
                        etag: function () {
                            //return d;
                        }
                    }
                })
            }

            $scope.SaveQuestions = function (GroupName) {
                var modalinstance = $modal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'addquestions.html',
                    controller: ['$scope', '$pusher', '$modalInstance', 'etag', function ($scope, $pusher, $modalInstance, etag) {
                        $scope.GroupId = groupid;
                        $scope.GroupName = GroupName;
                        $scope.etag = etag;
                        $scope.file = "";
                        $scope.disc = [];

                        $scope.save = function (d) {
                            var detailedInstructions = $('#detailedInstructions').summernote('code');
                            var postdata = { d, instructions: detailedInstructions };
                            $http.post('/api/group/addquestion/' + $scope.GroupId, postdata).then(function (response) {
                                if (response.data.result == "Success") {
                                    common.logger.logSuccess("Successfully saved.");
                                } else {
                                    common.logger.logError("Failed to save : " + response.data.message);
                                }
                            });
                            $('#detailedInstructions').summernote('code', '');
                        }

                        $scope.close = function () {
                            $modalInstance.dismiss('cancel');
                        }
                    }],
                    resolve: {
                        etag: function () {
                            //return d;
                        }

                    }
                })


            }

            $scope.SaveQuestionsforgroup = function () {
                $scope.newEntry = {};
            }



            $scope.ChatClose = function () {
                $('#openchat').modal('hide');
            }

            //------------------- CHAT AREA ENDS --------------------

            $scope.isBusy = true;

            $scope.isSyncing = false;

            $scope.spinnerOptions = {
                radius: 40,
                lines: 7,
                length: 0,
                width: 30,
                speed: 1.7,
                corners: 1.0,
                trail: 100,
                color: '#F58A00'
            };

            $scope.tinymceoptions = {
                inline: false,
                plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak codesample',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons template paste textcolor colorpicker textpattern imagetools'],
                toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | fullscreen | codesample',
                toolbar2: 'print preview media | forecolor backcolor emoticons',
                skin: 'lightgray',
                theme: 'modern',
                min_height: 300,
                paste_data_images: true,
                selector: 'textarea',
                images_upload_url: '/api/documents/threads/uploadimages',
                relative_urls: false,
                remove_script_host: false,
                convert_urls: true
            };

            $scope.busyMessage = 'Please wait ...';

            function toggleSpinner(on) { $scope.isBusy = on; }

            toggleSpinner(true);

            $rootScope.$on('$routeChangeStart',
                function (event, next, current) {
                    toggleSpinner(true);

                    //if ($('.nav-min #nav').length == 0)
                    //    $('.toggle-min').click();

                }
            );

            $rootScope.$on('PageRefreshing',
                function (event, next, current) { $scope.isSyncing = true; }
            );

            $rootScope.$on('PageRefreshCompleted',
                function (event, next, current) {
                    $scope.isSyncing = false;
                }
            );

            $rootScope.$on(commonConfig.config.reloadDataEvent,
                function (event, next, current) {
                    //reloadAllData();
                }
            );

            $rootScope.$on(commonConfig.config.controllerActivateSuccessEvent,
                function (event, next, current) {
                    toggleSpinner(false);
                    //if ($('.nav-min #nav').length == 0)
                    //    $('.toggle-min').click();
                }
            );

            function reloadAllData() {
                $scope.isSyncing = true;

                $http.get('/api/user/info').then(function (response) {
                    if (response.data.user.username == "") {
                        window.location.href = "/account/login?ReturnUrl=/" + escape(window.location.href.replace(/^(?:\/\/|[^\/]+)*\//, ""));
                        return;
                    } else {
                        var promises = datacontext.reloadAllData();
                        common.$q.all(promises).then(function (result) {
                            $scope.isSyncing = false;
                            common.$broadcast('ReloadComplete');
                            //common.$timeout(periodicRefresh, 600 * 1000);
                        }, function (reason) {
                            $scope.isSyncing = false;
                            common.$broadcast('ReloadFailed');
                            //common.$timeout(periodicRefresh, 600 * 1000);
                        });
                    }
                });
            }

            //datacontext.resetData();
            datacontext.initDataStore('mains').then(function () {
                try {
                    var userid = $("#hidUserId").val();
                    $.ajax({
                        url: '/api/notifications/user/' + userid,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'Get',
                        success: function (data) {
                            $scope.main.data = data;
                            var n = Object.keys(data.notifications).length;
                            for (var myj = 0; myj <= n; myj = myj + 1) {
                                $scope.main.notificationscount = Object.keys(data.notifications).length;
                            }
                        }
                    });
                    $.ajax({
                        url: '/api/videochatnotifications/user/' + userid,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'Get',
                        success: function (data) {
                            $scope.main.singlechatdata = data;
                            var n = Object.keys(data.videochatnotifications).length;
                            for (var myj = 0; myj <= n; myj = myj + 1) {
                                $scope.main.singlechatnotificationscount = Object.keys(data.videochatnotifications).length;
                            }
                            $("#singlechatnotificationscount").css('display', 'block');
                        }
                    });
                    var promise = $http.get('/api/user/info').then(function (response) {
                        $scope.main.candidateHired = false;
                        $scope.main.name = response.data.user.username;
                        $scope.main.firstname = response.data.user.FirstName;
                        $scope.main.ProfileImage = response.data.user.profileImage;
                        $scope.main.tasks = response.data.tasks;
                        $scope.main.notifications = response.data.notifications;
                        $scope.main.version = response.data.user.version;
                        $scope.Classsignups = response.data.adf_Classsignups;
                        $scope.isJRPStudent = response.data.isJRPStudent;
                        $scope.classSignUpDetails = response.data.classSignUpDetails;
                        if ($scope.Classsignups != "") {
                            $scope.main.candidateHired = true;
                            $scope.alumniStudent = true;
                        }
                        else {
                            $scope.alumniStudent = false;
                        }

                        $scope.adf_studentReferrals = response.data.adf_studentReferrals;
                        if ($scope.adf_studentReferrals != "") {
                            $scope.studentReferrals = false;
                            $scope.studentReferralsList = true;
                        }
                        else {
                            $scope.studentReferrals = true;
                            $scope.studentReferralsList = false;
                        }

                        $scope.main.userroles = response.data.userroles.map(function (e) { return e.RoleName; });
                        if ($scope.main.name == "") {
                            window.location.href = "/account/login?ReturnUrl=/" + escape(window.location.href.replace(/^(?:\/\/|[^\/]+)*\//, ""));
                            return;
                        }

                        var randomvoices = ["Good to see you back", "Welcome back", "How are you doing", "Great to see you"];

                        if (response.data && response.data.user && response.data.user.FirstName) {
                            var hour = moment().local().hour();
                            if (hour <= 11) {
                                var msg = new SpeechSynthesisUtterance('Good Morning ' + response.data.user.FirstName);
                                window.speechSynthesis.speak(msg);
                            } else if (hour <= 16) {
                                var msg = new SpeechSynthesisUtterance('Good Afternoon ' + response.data.user.FirstName);
                                window.speechSynthesis.speak(msg);
                            } else {
                                var msg = new SpeechSynthesisUtterance('Good Evening ' + response.data.user.FirstName);
                                window.speechSynthesis.speak(msg);
                            }
                        }
                    });
                }
                catch (e) {
                    window.location.href = "/account/login?ReturnUrl=/" + escape(window.location.href.replace(/^(?:\/\/|[^\/]+)*\//, ""));
                    return;
                }

                var first = true;

                //function periodicRefresh() {
                //    $scope.isSyncing = false;

                //    if (!first) {
                //        reloadAllData();
                //    } else {
                //        first = false;
                //        //common.$timeout(periodicRefresh, 1800 * 1000);
                //    }
                //}



                // Initiate sync
                reloadAllData();

                $scope.chime = new Audio("/app/images/chime.mp3");
                // SignalR Notifications
                var ticker = $.connection.classNotificationsHub;
                ticker.client.notifyUser = function (message) {

                    if (Notification.permission === "granted") {
                        var notification = new Notification(message.title, {
                            icon: (message.icon ? message.icon : 'https://app.colaberry.com/app/images/cbgraduate.png'),
                            body: message.description,
                        });
                        if (message.url) {
                            notification.onclick = function () {
                                window.open(message.url);
                            };
                        }
                    } else {
                        common.logger.log(message.description);
                    }
                    $scope.chime.play();
                }
                $.connection.hub.start().done();
            });

            return $scope.isSpecificPage = function () {

                var path = $location.path()

                if (_.contains(["/404", "/pages/500", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2", "/pages/lock-screen"], path)) {
                    //common.activateController([], 'MainHeaderController').then(function () {
                    //    return true;
                    //});
                    toggleSpinner(false);
                    return true;
                }
                return false;
            };
        }
    ]).service('sharedProperties', function () {
        var property = 'groupid';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        };
    }).filter('getFilteredQuestions', function () {
        return function (questions, searchBy) {

            if (searchBy == undefined) {
                return questions;
            }


            console.log("searchBy:");
            console.log(searchBy);
            var filteredQuestions = [];

            angular.forEach(questions, function (list) {
                if (list.GroupQuestionText.includes(searchBy)) {
                    filteredQuestions.push(list);
                }
            });

            // get all questionid which are matching with searchBy in QuestoinComments
            // GroupId, searchBy

            angular.forEach(questions, function (list) {
                if (list.GroupQuestionComment.includes(searchBy)) {
                    console.log("list.GroupQuestionComment=" + list.GroupQuestionComment);
                    var exists = false;
                    angular.forEach(filteredQuestions, function (commentlist) {
                        console.log("commentlist.GroupQuestionId=" + commentlist.GroupQuestionId + ";list.GroupQuestionId=" + list.GroupQuestionId);
                        if (commentlist.GroupQuestionId == list.GroupQuestionId) {
                            exists = true;
                        }
                    });

                    if (!exists) {
                        filteredQuestions.push(list);
                    }
                }
            });

            return filteredQuestions;
        }
    }).filter('fromNow', function () {
        return function (date) {
            return moment(date).fromNow();
        }
    }).controller("MainStudentDashboardCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.predicate = "";
            $scope.studentID = $routeParams.studentid;
            $scope.videoId = 0;
            $scope.isPlaying = false;
            $scope.textstream = "Hello world";

            function loadPage(studentID, reload) {
                return datacontext.loadData('/api/my/main/dashboard', reload).then(function (response) {
                    $scope.divInputValues = false;
                    $scope.candidateHired = true;
                    $scope.user = response.data.user;
                    $scope.insights = response.data.insights;
                    $scope.enrollments = response.data.enrollments;
                    $scope.main.enrollments = response.data.enrollments;
                    $scope.ipbcenrollments = response.data.ipbcenrollments;
                    $scope.contractDocumentsAsArray = response.data.contractDocuments;
                    if ($scope.contractDocumentsAsArray.length > 0) {
                        $scope.contractDocuments = response.data.contractDocuments[0];
                    } else {
                        $scope.contractDocuments = [];
                    }
                    $scope.pendingpayments = response.data.pendingpayments;
                    $scope.feePaidPctForSQlBI = response.data.feePaidPctForSQlBI;
                    $scope.upcomingclasses = response.data.upcomingclasses;
                    $scope.logonevents = response.data.logonevents;
                    $scope.jobapplications = response.data.jobapplications;
                    $scope.lastmodified = response.lastmodified;
                    $scope.hours = response.data.hours;
                    $scope.days = response.data.days;
                    $scope.weekdays = response.data.weekdays;
                    $scope.activities = response.data.activities;
                    $scope.promotionvideos = response.data.promotionvideos;
                    $scope.pendingInterviews = response.data.pendingInterviews;
                    $scope.firstName = response.data.firstName;
                    $scope.email = response.data.email;
                    if ($scope.pendingInterviews && $scope.pendingInterviews.length > 0) {
                        $scope.pendingInterviewsCSU = $scope.pendingInterviews[0].CSU
                    }
                    if (!$scope.enrollments || $scope.enrollments.length == 0) {
                        //Check available classes
                    }
                });

            }


            $scope.playVideo = function (e) {
                window.location.href = "my/playvideo/" + e.cbvideoid;
            }

            $scope.downloadInstaller = function () {

                $.ajax({
                    url: '/api/my/main/dashboards/download',
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        if (data.result == "Success") {
                            window.location = "https://app.colaberry.com/uploads/SQLServer2016_Installer/colaberry.exe"
                            common.logger.logSuccess(data.message);
                        } else {
                            common.logger.logError("Failed to download. " + data.message);
                        }
                    }
                });

            }

            common.activateController([loadPage($scope.studentID, true)], 'MainStudentDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("MainStudentChatCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {

            function loadPage() {
                $scope.groupid = $routeParams.groupid;
                $scope.questionid = $routeParams.questionid;
                $scope.memberid = $routeParams.memberid;

                //$http.get('/api/group/groupinfo/' + $scope.groupid + '/' + $scope.questionid).then(function (response) {
                //    $scope.groupsinfo = response.data.groupsinfo;
                //});

                $http.post('/api/group/questionsubscribers/' + $scope.groupid + '/' + $scope.questionid + '/' + $scope.memberid).then(function (response) {
                    if (response.data.result == "Success") {
                        common.logger.logSuccess("Successfully Subscribed the question.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
                $scope.ShowHide(0);
                $scope.GroupPage($scope.groupid);

            }
            common.activateController([loadPage($scope.studentID, true)], 'MainStudentChatCtrl').then(function () {
            });
        }
    ]).service('sharedProperties', function () {
        var property = 'First';
        //alert(property);

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        };
    }).controller("StudentFriendCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext", "$modal",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext, $modal) {

            var FriendUserId = $routeParams.frienduserid;
            var UserID = $routeParams.userid;
            $scope.id = $routeParams.id;
            $scope.frienduserid = '' + FriendUserId;
            $scope.userid = '' + UserID;
            $scope.loadPage = function () {
                $http.post("/api/student/friendinfo/" + $scope.frienduserid + '/' + $scope.id + '/' + $scope.userid).then(function (response) {
                    $scope.FRname = response.data.FRname;
                    $scope.FRacceptername = response.data.FRAcceptername;
                    if ($scope.id == 1) {
                        common.logger.logSuccess("Accepted friend request Successfully.");
                    } else {
                        common.logger.logError("Your friend request is rejected.");
                    }
                });

            }
            common.activateController([$scope.loadPage()], 'StudentFriendCtrl').then(function () {
            });
        }
    ]).controller("VideoChatCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext", "$modal",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext, $modal) {


            //$scope.fromEmail = true;
            $scope.loadPage = function () {
                $scope.questionid = $routeParams.questionid;
                $scope.ShowHide(0);
                $scope.isactive = true;
                $scope.GroupVideoChat($scope.questionid, $scope.isactive);
                //$scope.isBusy = false;
            }


            common.activateController([$scope.loadPage()], 'VideoChatCtrl').then(function () {
            });
        }

    ]).controller("GroupChatCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext", "$modal",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext, $modal) {



            $scope.loadPage = function () {
                $scope.groupid = $routeParams.groupid;
                $scope.questionid = $routeParams.questionid;
                $scope.ShowHide(0);
                $scope.GroupPage($scope.groupid);
                $scope.QuestionExpand($scope.questionid);
                $scope.GetGroupChat($scope.questionid, $scope.id);
            }


            common.activateController([$scope.loadPage()], 'GroupChatCtrl').then(function () {
            });
        }
    ]).controller("chatlinkctrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext", "$modal",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext, $modal) {


            alert("chatlinkctrl came");
            $scope.loadPage = function () {
                $http.get('/api/chat/singlechat').then(function (response) { // very first time $scope.groupid = 0

                    $scope.friends = response.data.friends;
                    $scope.friendname = $scope.friends.FirstName;
                    $scope.imageUrl = $scope.friends.ProfileImage;
                    $scope.userid = '' + $scope.friends.FriendUserId;
                    $scope.loggeduser = response.data.UserName;
                    $scope.friendemail = response.data.Email;
                    $scope.GetChatlinuser($scope.userid, $scope.friendname, $scope.friendemail, $scope.loggeduser, $scope.imageUrl);
                });
                $scope.ShowHide(0);

                //single chat start using talkjs
                $scope.GetChatlinuser = function (userid, friendname, friendemail, loggeduser, imageUrl) {
                    $scope.userid = userid;
                    $scope.username = loggeduser;
                    $scope.frienduserid = userid;
                    $scope.friendname = friendname;


                    Talk.ready.then(function () {
                        var me = new Talk.User({
                            id: $scope.id,
                            name: loggeduser,
                            role: "Admin",
                            email: $scope.email,
                            //photoUrl: "https://media-exp1.licdn.com/dms/image/C510BAQFQ5e5_rA2QAQ/company-logo_200_200/0?e=2159024400&v=beta&t=SdLSlpMdcS3_ecer_loCzimBs47S6dU4KZuHm4vaWl8",
                            photoUrl: imageUrl,
                            welcomeMessage: "Hey there! How are you? :-)"
                        });

                        var other = new Talk.User({
                            id: userid,
                            name: friendname,
                            role: "Admin",
                            email: friendemail,
                            //photoUrl: "https://media-exp1.licdn.com/dms/image/C510BAQFQ5e5_rA2QAQ/company-logo_200_200/0?e=2159024400&v=beta&t=SdLSlpMdcS3_ecer_loCzimBs47S6dU4KZuHm4vaWl8",
                            photoUrl: imageUrl,
                            welcomeMessage: "Hey, how can I help?"
                        });
                        window.talkSession = new Talk.Session({
                            appId: $scope.TalkJSAppId,
                            me: me
                        });

                        var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))

                        conversation.setParticipant(me);
                        conversation.setParticipant(other);

                        var isEnabled = true;
                        talkSession.setDesktopNotificationEnabled(isEnabled);

                        var inbox = talkSession.createInbox({ selected: conversation });
                        inbox.mount(document.getElementById("chatusers2"));
                    });



                    $("#chatusers1").css('display', 'block');
                    $("#content").css('display', 'none');
                    $("#hub").css('display', 'none');
                    $("#singlechatclose").click(function () {
                        $("#chatusers1").css('display', 'none');
                    });
                    //shared.setListName(value);
                    function append_message1(indicator) {
                        return '<p style="background-color: black; padding: 10px; color:white !important; width:280px">' + indicator + '</p>';
                    }
                } //single chat end

                //$scope.GroupPage($scope.groupid);
                //$scope.QuestionExpand($scope.questionid);
                //$scope.GetGroupChat($scope.questionid, $scope.id);
            }


            common.activateController([$scope.loadPage()], 'chatlinkctrl').then(function () {
            });
        }
    ]).controller("QuestionCommentCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext", "$modal",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext, $modal) {
            alert("QuestionCommentCtrl came");
            //$scope.fromEmail = true;
            $scope.loadPage = function () {
                $scope.groupid = $routeParams.groupid;
                $scope.questionid = $routeParams.questionid;
                $scope.index = $routeParams.index;

                //$scope.ShowHide(0);
                //$scope.GroupPage($scope.groupid);
                $scope.ShowHide(0);
                $scope.GroupPage($scope.groupid);
                $scope.QuestionExpand($scope.index, $scope.questionid);
            }


            common.activateController([$scope.loadPage()], 'QuestionCommentCtrl').then(function () {
            });
        }


    ]).controller("EnrollmentsDashboardCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.predicate = "";
            $scope.studentID = $routeParams.studentid;
            $scope.videoId = 0;
            $scope.isPlaying = false;
            $scope.textstream = "Hello world";

            $scope.Enroll = function (classid) {
                var cfm = confirm("Are you sure to enroll in this class?");
                if (cfm) {
                    $http.post('/api/my/enrollments/request', { classid: classid }).then(function (response) {
                        if (response.data.status === "Successful") {
                            common.logger.logSuccess("Congratulations. You are now enrolled. Start learning right away.");
                            $scope.classsignupsid = response.data.classSignupsID;
                            $location.path('/my/class/' + $scope.classsignupsid);
                        }
                        else {
                            common.logger.logError("Sorry. " + response.data.message);
                        }
                    });
                }
            }

            function loadPage(reload) {
                return datacontext.loadData('/api/my/enrollments', reload).then(function (response) {
                    $scope.user = response.data.user;
                    $scope.enrollments = response.data.enrollments;
                    $scope.main.enrollments = response.data.enrollments;
                    $scope.ipbcenrollments = response.data.ipbcenrollments;
                    $scope.upcomingclasses = response.data.upcomingclasses;
                    $scope.lastmodified = response.lastmodified;
                    $scope.contractDocumentsAsArray = response.data.contractDocuments;
                    $scope.contractDocuments = response.data.contractDocuments[0];

                    if (!$scope.enrollments || $scope.enrollments.length == 0) {
                        // Check available classes
                    }

                    datacontext.loadData('/api/activity/list/0', reload).then(function (response) {
                        $scope.activities = response.data.activities;
                    });
                });
            }

            common.activateController([loadPage(true)], 'EnrollmentsDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).directive('validFile', function () {
        return {
            require: 'ngModel',
            link: function (scope, el, attrs, ngModel) {
                //change event is fired when file is selected
                el.bind('change', function () {
                    scope.$apply(function () {
                        ngModel.$setViewValue(el.val());
                        ngModel.$render();
                    });
                });
            }
        }
    }).controller("StudentEnrollmentFormCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.classID = $routeParams.classID;
            $scope.newEntry = {};
            //console.log("Here");

            $scope.SubmitRequest = function () {
                $http.post("/api/my/enrollments/" + $scope.classID + "/newrequest", { newEntry: $scope.newEntry }).then(function (response) {
                    if (response.data.status == "success") {
                        $scope.uploadFile();
                    } else {
                        common.logger.logError("Failed " + response.data.message)
                    }
                });
            }


            $scope.uploadFile = function () {
                var fd = new FormData();
                console.log("Done");
                fd.append('file', document.getElementById('uploadedfile').files[0]);
                console.log("Done");

                $.ajax({
                    url: '/api/documents/degree/upload',
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        if (data.result == "Success") {
                            //$scope.reload();
                            common.logger.logSuccess("File has been successfully uploaded. Please wait while any pending content will be opened");
                            //$location.path('/my/profile');
                            window.location = 'https://app.colaberry.com/app/main/my/enrollmentformPolicies/' + $scope.classID;
                        } else {
                            common.logger.logError("Failed to upload. " + data.message);
                        }
                    }
                });
            }

            function loadPage(reload) {
                console.log("Here");
                return datacontext.loadData('/api/my/enrollments/getclassdetails/' + $scope.classID, reload).then(function (response) {
                    $scope.user = response.data.user;
                    $scope.reqClassDetails = response.data.classDetails;
                    $scope.degrees = response.data.educationLevel;
                    var htmlstr = '<iframe width="80%" height="500px" src="https://app.colaberry.com/uploads/EnrollmentPolicies/CancelationAndRefundPolicy_for_EnrollmentAgreement.pdf" frameborder="0"></iframe><a href="https://localhost:44300/uploads/CancelationAndRefundPolicy_for_EnrollmentAgreement.pdf" target="_blank">' +
                        '<span class="fa fa-external-link-square" ></span >' +
                        'https://app.colaberry.com/uploads/EnrollmentPolicies/CancelationAndRefundPolicy_for_EnrollmentAgreement.pdf' + '</a>';
                    $('#player').html(htmlstr);
                });
            }

            common.activateController([loadPage(true)], 'StudentEnrollmentFormCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("EnrollmentReceiptFormCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.classID = $routeParams.classID;
            $scope.newEntry = {};
            //console.log("Here");

            $scope.SubmitRequest = function () {
                $http.post("/api/my/enrollmentformreceipts/" + $scope.classID + "/newrequest", { newEntry: $scope.newEntry }).then(function (response) {
                    if (response.data.status == "success") {
                        common.logger.logSuccess("Enrollment request has been submitted");
                        $location.path('/my/profile');
                    } else {
                        common.logger.logError("Failed to upload. " + data.message);
                    }
                });
            }

            function loadPage(reload) {
                //console.log("Here");
                return datacontext.loadData('/api/my/enrollments/getclassdetails/' + $scope.classID, reload).then(function (response) {
                    $scope.user = response.data.user;
                    $scope.reqClassDetails = response.data.classDetails;
                    $scope.degrees = response.data.educationLevel;
                });
            }

            common.activateController([loadPage(true)], 'EnrollmentReceiptFormCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("ProfileDashboardCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.predicate = "";
            $scope.studentID = $routeParams.studentid;
            $scope.videoId = 0;
            $scope.isPlaying = false;
            $scope.textstream = "Hello world";

            $scope.ChoosePicture = function () {
                $("input[id='uploadedfile']").val('');
                $("input[id='uploadedfile']").click();
            }

            $scope.onFileSelected = function () {
                var fd = new FormData();
                fd.append('file', document.getElementById('uploadedfile').files[0]);

                $.ajax({
                    url: '/api/my/profile/picture/upload',
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        if (data.result == "Success") {
                            $scope.$apply(function () {
                                $scope.user = data.user;
                            });
                            common.logger.logSuccess("Your new picture has been successfully uploaded.");
                        } else {
                            common.logger.logError("Failed to upload. " + data.message);
                        }
                    }
                });
            }

            $scope.isDisabled = false;

            $scope.requestDocument = function () {
                //console.log($scope.user.USERID);
                $scope.isDisabled = true;
                $.ajax({
                    url: '/api/cudasign/colaberry/traineeagreement/' + $scope.user.USERID,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'GET',
                    success: function (response) {
                        if (response.status == "Success") {
                            common.logger.logSuccess("Your document has been sent to your email." + response.message);
                            $scope.isDisabled = false;
                            window.location.reload();
                        } else {
                            common.logger.logError("Failed to request document. " + response.message);
                            $scope.isDisabled = false;
                        }
                    }

                });
            }


            $scope.resendDocument = function () {
                $scope.isDisabled = true;
                $.ajax({
                    url: '/api/cudasign/colaberry/traineeagreement/resend/' + $scope.user.USERID,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'GET',
                    success: function (response) {
                        if (response.status == "Success") {
                            //loadPage(true);
                            common.logger.logSuccess("Your document has been sent to your email. Please check your email to sign the document");
                            $scope.isDisabled = false;
                            window.location.reload();
                        } else {
                            common.logger.logError("Failed to request document. " + response.message);
                            $scope.isDisabled = false;
                        }
                    }
                });
            }

            function loadPage(reload) {
                return datacontext.loadData('/api/my/enrollments', reload).then(function (response) {
                    $scope.user = response.data.user;
                    $scope.enrollments = response.data.enrollments;
                    $scope.main.enrollments = response.data.enrollments;
                    $scope.ipbcenrollments = response.data.ipbcenrollments;
                    $scope.upcomingclasses = response.data.upcomingclasses;
                    $scope.lastmodified = response.lastmodified;
                    $scope.contractDocuments = response.data.contractDocuments;
                    $scope.enrollmentRequests = response.data.enrollmentRequests;
                    $scope.isSurveyTaken = response.data.isSurveyTaken;
                    $scope.isGradSurveyTaken = response.data.isGradSurveyTaken;
                    $scope.isLeadershipSurveyTaken = response.data.isLeadershipSurveyTaken;
                    $scope.isFriendsFamilySurvey = response.data.isFriendsFamilySurvey;
                    $scope.Classsignups = response.data.adf_Classsignups;
                    console.log($scope.contractDocuments.length);
                    $scope.daysDiffrence = 0;

                    if ($scope.Classsignups != "") {
                        $scope.alumniStudent = true;
                    }
                    else {
                        $scope.alumniStudent = false;
                    }

                    if ($scope.contractDocuments.length > 0) {
                        var today = new Date();
                        var docCreatedDate = new Date($scope.contractDocuments[0].Created);
                        //console.log("docCreatedDate" + docCreatedDate);
                        var timeDiff = Math.abs(today.getTime() - docCreatedDate.getTime());
                        //console.log("timeDiff:" + timeDiff);
                        var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        $scope.daysDiffrence = daysDiff;
                        //console.log(daysDiff);
                        //console.log(today);
                    }

                    if ($scope.contractDocuments.length > 0 && $scope.ipbcenrollments.length > 0 && $scope.contractDocuments[0].Status == 1) {
                        //console.log('Im here');
                        var htmlstr = '<iframe width="80%" height="500px" src="' + $scope.contractDocuments[0].DownloadURL + '" frameborder="0"></iframe><a href="' + $scope.contractDocuments[0].DownloadURL + '" target="_blank">' +
                            '<span class="fa fa-external-link-square" ></span >' +
                            $scope.contractDocuments[0].DownloadURL + '</a>';
                        $('#player').html(htmlstr);
                    }

                    if (!$scope.enrollments || $scope.enrollments.length == 0) {
                        // Check available classes
                    }
                });
            }


            $scope.copyToClipboard = function (text) {
                var aux = document.createElement("input");
                aux.setAttribute("value", text);
                document.body.appendChild(aux);
                aux.select();
                document.execCommand("copy");
                document.body.removeChild(aux);

            }

            common.activateController([loadPage(true)], 'EnrollmentsDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("StudentVideoCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {

            $scope.studentID = $routeParams.studentid;

            function loadPage(reload) {
                return datacontext.loadData('/api/my/studentvideos', reload).then(function (response) {
                    $scope.studentvideos = response.data.studentvideos;
                });
            }

            $scope.playVideo = function (e) {
                window.location.href = "my/playvideo/" + e.cbvideoid;
            }

            common.activateController([loadPage(true)], 'StudentVideoCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("StudentJobReadinessCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {

            $scope.loadPage = function (reload) {
                return datacontext.loadData('/api/my/main/jobreadiness/dashboard', reload).then(function (response) {
                    $scope.jrstudent = response.data.jrstudent;
                    $scope.jrprofile = response.data.jrprofile;
                });
            }

            $scope.SaveChanges = function () {
                $http.post('/api/my/main/jobreadiness/profile/save', $scope.jrprofile).then(function (response) {
                    if (response.data.status == "Successful") {
                        $scope.loadPage(true);
                        common.logger.logSuccess("Successfully saved.");
                        $scope.editprofile = false;
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            common.activateController([$scope.loadPage(true)], 'StudentJobReadinessCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded StudentJobReadinessCtrl");
            });
        }
    ]).controller("ClassVideoChatCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.classSignupsID = $routeParams.classSignupsID;
            $scope.ipbc = ($routeParams.ipbc ? $routeParams.ipbc : 0);

            $scope.reload = function () {
                $scope.getTrainingStudentClassDashboardContents($scope.classSignupsID, true);
            }

            $scope.openRoom = function (r) {
                var chatroomname = "cbcls" + $scope.enrollment.ClassID + 'room' + r.toString();
                chatroomname = chatroomname + chatroomname.hashCode().toString();
                var htmlstr = '<iframe src="https://appear.in/' + chatroomname + '"  width="100%" height="400" frameborder="0" allowfullscreen></iframe>';
                $('#chatroomiframe').html(htmlstr);
            }

            String.prototype.hashCode = function () {
                var hash = 0, i, chr, len;
                if (this.length === 0) return hash;
                for (i = 0, len = this.length; i < len; i++) {
                    chr = this.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }
                return hash;
            };

            $scope.getTrainingStudentClassDashboardContents = function (enrollmentID, reload) {
                return datacontext.loadData('/api/my/class/' + enrollmentID + '/dashboard?ipbc=' + $scope.ipbc, reload).then(function (response) {
                    $scope.userdetails = response.data.userdetails;
                    $scope.courseevents = response.data.courseevents;
                    $scope.enrollment = response.data.enrollment;

                    $scope.logonevents = response.data.logonevents;
                });
            }

            $rootScope.$on('ReloadComplete',
                function (event, next, current) {
                    //getIPBCStudentDashboardContents($scope.studentID, false);
                }
            );

            common.activateController([$scope.getTrainingStudentClassDashboardContents($scope.classSignupsID)], 'ClassVideoChatCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("ClassScheduleCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.classSignupsID = $routeParams.classSignupsID;
            $scope.ipbc = ($routeParams.ipbc ? $routeParams.ipbc : 0);

            $scope.reload = function () {
                $scope.getTrainingStudentClassDashboardContents($scope.classSignupsID, true);
            }

            $scope.getTrainingStudentClassDashboardContents = function (enrollmentID, reload) {
                return datacontext.loadData('/api/my/class/' + enrollmentID + '/schedule?ipbc=' + $scope.ipbc, reload).then(function (response) {
                    $scope.sessions = response.data.sessions;
                    $scope.userdetails = response.data.userdetails;
                    $scope.enrollment = response.data.enrollment;
                    $scope.logonevents = response.data.logonevents;
                });
            }

            $rootScope.$on('ReloadComplete',
                function (event, next, current) {
                    //getIPBCStudentDashboardContents($scope.studentID, false);
                }
            );

            common.activateController([$scope.getTrainingStudentClassDashboardContents($scope.classSignupsID)], 'ClassScheduleCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("ClassDiscussionsCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.classSignupsID = $routeParams.classSignupsID;
            $scope.ipbc = ($routeParams.ipbc ? $routeParams.ipbc : 0);

            $scope.reload = function () {
                $scope.getTrainingStudentClassDashboardContents($scope.classSignupsID, true);
            }

            $scope.getTrainingStudentClassDashboardContents = function (enrollmentID, reload) {
                return datacontext.loadData('/api/my/class/' + enrollmentID + '/dashboard?ipbc=' + $scope.ipbc, reload).then(function (response) {
                    $scope.userdetails = response.data.userdetails;
                    $scope.courseevents = response.data.courseevents;
                    $scope.enrollment = response.data.enrollment;

                    $scope.logonevents = response.data.logonevents;
                });
            }

            $rootScope.$on('ReloadComplete',
                function (event, next, current) {
                    //getIPBCStudentDashboardContents($scope.studentID, false);
                }
            );

            common.activateController([$scope.getTrainingStudentClassDashboardContents($scope.classSignupsID)], 'ClassDiscussionsCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("StudentPaymentsCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {

            $scope.couponcode = "";
            $scope.paymenttype = 'Paypal';
            $scope.paymenttypes = ['Affirm Loan', 'Cash', 'Check', 'Grant', 'Paypal', 'Scholarship', 'Sponsorship', 'Others'];

            $scope.SaveChanges = function () {
                $http.post('/api/my/payments/add', { signupsid: $scope.pendingpayments[0].CLASSSIGNUPSID, paymenttype: $scope.paymenttype, paymentamount: $scope.paymentamount, notes: $scope.notes }).then(function (response) {
                    if (response.data.status == "Successful") {
                        $scope.loadPage(true);
                        common.logger.logSuccess("Successfully saved. Please wait while refreshing..");
                    }
                });
            }

            $scope.ApplyCouponCode = function (cid, code) {
                $http.post('/api/my/payments/redeem', { signupsid: cid, couponcode: code }).then(function (response) {
                    if (response.data.status == "Successful") {
                        $scope.loadPage(true);
                        common.logger.logSuccess("Successfully redeemed. Please wait while refreshing..");
                    } else {
                        common.logger.logError("Sorry, failed to redeem the code. " + response.data.message);
                    }
                });
            }

            $scope.loadPage = function (reload) {
                return datacontext.loadData('/api/my/payments', reload).then(function (response) {
                    $scope.user = response.data.user;
                    $scope.pendingpayments = response.data.pendingpayments;
                    $scope.payments = response.data.payments;
                    $scope.lastmodified = response.lastmodified;
                });
            }

            common.activateController([$scope.loadPage(true)], 'MainStudentPaymentsCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });

        }
    ]).controller("ReferralCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {

            $scope.mailsubject = "Here is a great opportunity to unleash your career in 2016";
            $scope.referralmessage = "Merry Christmas and happy holidays.\n\n" +
                "I found a great opportunity to jump start my career in the fast growing field of data analytics with the help of team at Colaberry.com. \n\n" +
                "Please give me a call to talk about it or check them out at Colaberry.com. As I am referring you, you will also receive a $50 off on the program fee. " +
                "Also if you signup by 12/31/2015, you pay 2015 program fees even if you enroll in any class in 2016, that will be an additional $300 in savings. " +
                "It's a great a way to jump start in the new year 2016. Check it out.\n\n";

            $scope.sendReferralMessage = function () {
                var postdata = { message: $scope.referralmessage, subject: $scope.mailsubject, addresses: $scope.emailaddress };
                $http.post('/api/referral/send', postdata).then(function (response) {
                    if (response.data.result == "success") {
                        common.logger.logSuccess("Thank you. Sent message successfully.");
                        $scope.emailaddress = "";
                    } else {
                        common.logger.logError("Sorry, failed to send message." + response.data.message);
                    }
                });
            }

            $scope.RedeemReferralCode = function () {
                var postdata = { couponcode: $scope.couponcode };
                if ($scope.couponcode && $scope.couponcode.length > 10) {
                    $http.post('/api/referral/redeem', postdata).then(function (response) {
                        if (response.data.result == "success") {
                            common.logger.logSuccess("Referral code has been successfully redeemed. Please take off $50 from your payment when you enroll.");
                            $scope.couponcode = "";
                        } else {
                            common.logger.logError(response.data.message);
                        }
                    });
                }
            }

            common.activateController([], 'ReferralCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });

        }
    ]).controller("Main.Videos.VideoRecordCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$sanitize", "$route", "$routeParams",
        function ($scope, $rootScope, $http, $location, logger, common, datacontext, $sanitize, $route, $routeParams) {
            $scope.predicate = "";

            $scope.daterange = 7;
            $scope.categoryID = 201;
            $scope.libraryID = 23;
            $scope.user = 0;
            $scope.isPlaying = false;

            $scope.RefreshPage = function () {
                common.$broadcast("PageRefreshing");
                $scope.loadPage();
                common.$broadcast("PageRefreshCompleted");
            }
            $scope.vscope = "all";

            $scope.loadPageMetaData = function () {
            }

            $scope.loadPage = function () {
                $scope.isLoading = true;
                $scope.videos = [];
                var apiurl = "/api/" + ($scope.vscope == 'all' ? 'vlogvideos' : 'vlogvideos') + "/?daterange=" + $scope.daterange + "&library=" + $scope.libraryID + "&category=" + $scope.categoryID + "&user=" + $scope.user;
                //var apiurl = "/api/videos?daterange=" + $scope.daterange + "&library=0&category=0&user=" + $scope.user;
                return $http.get(apiurl).then(function (response) {
                    $scope.videos = response.data.videos;
                    $scope.isLoading = false;
                }, function (respoinse) {
                    $scope.isLoading = false;
                });
            }

            $scope.loadPageMetaData = function (forceload) {
                // Load Library, Category information for the video
                return datacontext.loadData('/api/videos/library/' + $scope.libraryID + '/category/' + $scope.categoryID + '/metadata', forceload).then(function (response) {
                    $scope.library = response.data.videolibrary;
                    $scope.category = response.data.videocategory;
                });
            }
            function activate() {

                common.activateController([$scope.loadPage(), $scope.loadPageMetaData(true)], 'Main.Videos.VideoRecordCtrl').then(function () {

                    var fObj = new FlashObject('/Content/video/UVGRecord.swf', 'UVGRecord', '480', '412', "9.0.115", '');
                    fObj.flashvars = 'baseUrl=/videos/&amp;seriesId=' + $scope.categoryID + '&amp;libraryId=' + $scope.libraryID + '&amp;maxRecordDuration=900';
                    fObj.addParam('allowScriptAccess', 'always');
                    fObj.write('UVGRecord');
                    var UVGRecord;
                    UVGRecord = document.getElementById('UVGRecord');
                });
            }

            $scope.playersizes = [{ width: 380, height: 240 }, { width: 480, height: 240 }, { width: 560, height: 380 }, { width: 640, height: 360 },
            { width: 853, height: 480 }, { width: 1130, height: 640 }, { width: 1280, height: 720 }];

            $scope.getPlayerHeight = function (width) {
                for (var i = 0; i < 7; i++) {
                    if (width <= $scope.playersizes[i].width)
                        return $scope.playersizes[i].height;
                }
                return 720;
            }

            $scope.recordVideo = function () {
                $scope.isPlaying = false;
                $('#video-player').html("");
            }

            $scope.AddComments = function () {
                $scope.commentstatus = "Please wait..";
                var postdata = { comment: $scope.description };
                $http.post('/api/video/' + $scope.videoId + '/comments/add', postdata).then(function (response) {
                    $scope.commentstatus = "";
                    $scope.description = "";
                    $scope.selVideo.HomeWorkID = 0;
                    datacontext.getVideoComments($scope.videoId, true).then(function (response) {
                        $scope.selVideoComments = response.data.results;
                    });
                });
            }

            $scope.playVideo = function (v, fmt) {
                $scope.isPlaying = true;
                $scope.selVideo = v;
                $scope.videoId = v.ItemId;
                //$scope.$apply();

                if (!fmt)
                    fmt = 'mp4';

                $scope.selfmt = fmt;

                //$('#video-player-modal').modal('show');

                datacontext.loadData('/api/video/' + v.ItemId + '/comments', true).then(function (response) {
                    $scope.rating = 0;
                    $scope.selVideoComments = response.data.results;

                    var playerwidth = $('#video-dashboard-header').width() / 2 * 0.90;
                    var playerheight = $scope.getPlayerHeight(playerwidth);

                    //$('#video-player-clip-title').html(v.Title);
                    var htmlstr = '<div style="text-align:center;background:#000; margin-bottom:10px; width:100%;">';

                    var thumbnail = '';

                    if (!v.ReferenceId) {
                        thumbnail = 'http://learn.colaberry.com/' + v.Thumbnail;
                    } else {
                        thumbnail = 'https://app.colaberry.com/' + v.Thumbnail;
                    }

                    if (fmt == 'mp4') {
                        //console.log('MP4 Format');
                        htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls controlsList="nodownload" preload="auto" autoplay="true" poster="' + thumbnail + '"  width="' + playerwidth + '" height="' + playerheight + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';
                    } else {
                        //console.log('FLV Format');
                        htmlstr = htmlstr + '<div id="UVGContainer"><embed type="application/x-shockwave-flash" src="http://learn.colaberry.com/DesktopModules/UltraVideoGallery/uvg.swf" width="' + playerwidth + '" height="' + playerheight + '" style="undefined" id="UVG" name="UVG" quality="high" autoplay="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="portalId=0&amp;baseUrl=http://learn.colaberry.com/DesktopModules/UltraVideoGallery/&amp;vId=' + v.ItemId + '"></div>';
                    }


                    //if (!v.ReferenceId) {
                    //    htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls preload="auto" autoplay="true" poster="http://learn.colaberry.com/' + v.Thumbnail + '"  width="' + playerwidth + '" height="' + playerheight + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';
                    //} else {
                    //    htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls preload="auto" autoplay="true" poster="https://app.colaberry.com/' + v.Thumbnail + '"  width="' + playerwidth + '" height="' + playerheight + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';
                    //}
                    //htmlstr = htmlstr + '<div id="UVGContainer"><embed type="application/x-shockwave-flash" src="http://learn.colaberry.com/DesktopModules/UltraVideoGallery/uvg.swf" width="' + playerwidth + '" height="' + playerheight + '" style="undefined" id="UVG" name="UVG" quality="high" autoplay="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="portalId=0&amp;baseUrl=http://learn.colaberry.com/DesktopModules/UltraVideoGallery/&amp;vId=' + v.ItemId + '"></div>';
                    htmlstr = htmlstr + '</div>';

                    //console.log(htmlstr);

                    $('#video-player').html(htmlstr);

                    $('#content').animate({
                        scrollTop: 0
                    }, 500);
                });
            }

            activate();
        }
    ]).controller("Training.Videos.VideoRecordCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$sanitize", "$route", "$routeParams",
        function ($scope, $rootScope, $http, $location, logger, common, datacontext, $sanitize, $route, $routeParams) {
            $scope.predicate = "";

            $scope.videolibrary = {};
            $scope.videocategory = {};


            $scope.ClassSignupsID = $routeParams.classsignupsid;
            $scope.categoryID = $routeParams.category;
            $scope.libraryID = $routeParams.library;
            $scope.ready = false;

            $scope.readinessQuestions = [
                { question: "Have you reviewed feedback received for any earlier videos?", ready: false },
                { question: "Have you reviewed 2-3 videos on this topic to prepare?", ready: false },
                { question: "Have you prepared definition, example and more for this topic?", ready: false },
                { question: "Have you prepared as per Guidelines/Expectations for this video?", ready: false },
                { question: "Are you in a professional attire and presentable to customers?", ready: false }
            ];

            $scope.VideoID = 1000;

            $scope.RefreshPage = function () {
                common.$broadcast("PageRefreshing");
                getInterviewsList(true).then(function () {
                    common.$broadcast("PageRefreshCompleted");
                });
            }

            $scope.readinessUpdate = function () {
                var max = $scope.readinessQuestions.length;
                for (var i = 0; i < max; i++) {
                    if (!$scope.readinessQuestions[i].ready) {
                        return;
                    }
                }

                // Load video player
                $scope.ready = true;
                var fObj = new FlashObject('/Content/video/UVGRecord.swf', 'UVGRecord', '480', '412', "9.0.115", '');
                fObj.flashvars = 'baseUrl=/videos/&amp;seriesId=' + $scope.categoryID + '.' + $scope.ClassSignupsID + '&amp;maxRecordDuration=900';
                fObj.addParam('allowScriptAccess', 'always');
                fObj.write('UVGRecord');
                var UVGRecord;
                UVGRecord = document.getElementById('UVGRecord');
            }

            $scope.loadPageMetaData = function (forceload) {
                // Load Library, Category information for the video
                return datacontext.loadData('/api/videos/library/' + $scope.libraryID + '/category/' + $scope.categoryID + '/metadata', forceload).then(function (response) {
                    $scope.videolibrary = response.data.videolibrary;
                    $scope.videocategory = response.data.videocategory;
                });
            }

            $scope.VideoIDUpdated = function () {
                alert("New Video ID:" + $scope.VideoID);
            }

            $scope.loadPage = function () {

            }

            function activate() {

                common.activateController([$scope.loadPage(), $scope.loadPageMetaData(true)], 'Training.Videos.VideoRecordCtrl').then(function () {

                });
            }
            activate();
        }
    ]).controller("TrainingStudentClassDashboardCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.predicate = "";
            $scope.agreetoipbc = true;
            $scope.processing = false;
            $scope.classSignupsID = $routeParams.classSignupsID;
            $scope.ipbc = ($routeParams.ipbc ? $routeParams.ipbc : 0);
            $scope.showGraphs = false;

            $scope.tabSelected = function (tab) {
                if (tab == 'engagement') {
                    $scope.showGraphs = true;
                } else {
                    $scope.showGraphs = false;
                }
            }

            $scope.reload = function () {
                $scope.getTrainingStudentClassDashboardContents($scope.classSignupsID, true);
            }

            $scope.pctcompletechart = {
                percent: 0,
                options: {
                    animate: {
                        duration: 1e3,
                        enabled: !0
                    },
                    barColor: "#2EC1CC",
                    lineCap: "square",
                    size: 180,
                    lineWidth: 20,
                    scaleLength: 0
                }
            }

            $scope.effratingchart = {
                percent: 0,
                options: {
                    animate: {
                        duration: 1e3,
                        enabled: !0
                    },
                    barColor: "#23AE89",
                    lineCap: "square",
                    size: 180,
                    lineWidth: 20,
                    scaleLength: 0
                }
            }

            $scope.Enroll = function (classid) {
                var cfm = confirm("Are you sure to enroll in this class?");
                if (cfm) {
                    $http.post('/api/my/enrollments/request', { classid: classid }).then(function (response) {
                        if (response.data.status === "Successful") {
                            common.logger.logSuccess("Congratulations. You are now enrolled. Start learning right away.");
                            $scope.classsignupsid = response.data.classSignupsID;
                            $location.path('/my/class/' + $scope.classsignupsid);
                        }
                        else {
                            common.logger.logError("Sorry. " + response.data.message);
                        }
                    });
                }
            }

            $scope.signupIPBC = function () {
                if ($scope.agreetoipbc) {
                    $scope.processing = true;
                    common.logger.log("Please wait while signing up ....");

                    common.$broadcast("PageRefreshing");

                    $http.post('/api/my/class/' + $scope.classSignupsID + '/ipbc/signup').then(function (response) {
                        $scope.processing = false;
                        common.$broadcast("PageRefreshCompleted");
                        if (response.data.status == "Success") {
                            common.logger.logSuccess("Congratulations. Successfully signed up.");
                        } else {
                            common.logger.logError("Failed to signup. " + response.data.message);
                        }
                    });
                } else {
                    alert("You must agree to IPBC Terms and Conditions.");
                }
            }

            $scope.MarkAsPresent = function () {
                $http.post('/api/my/attendance/markAsPresent', { ClassSignUpsID: $scope.classSignupsID }).then(function (response) {
                    if (response.data.status == "success") {
                        $scope.attendance = response.data.attendance;
                        common.logger.logSuccess("Congratulations you have been marked as present for the session");
                    } else {
                        $scope.attendance = response.data.attendance;
                        common.logger.logError("Failed: " + response.data.message);
                    }
                });
            }

            $scope.getTrainingStudentClassDashboardContents = function (enrollmentID, reload) {
                return datacontext.loadData('/api/my/class/' + enrollmentID + '/dashboard?ipbc=' + $scope.ipbc, reload).then(function (response) {
                    $scope.userdetails = response.data.userdetails;
                    $scope.courseevents = response.data.courseevents;
                    $scope.enrollment = response.data.enrollment;
                    $scope.attendance = response.data.attendance;
                    $scope.logonevents = response.data.logonevents;


                    $scope.hours = response.data.hours;
                    $scope.days = response.data.days;
                    $scope.weekdays = response.data.weekdays;
                    $scope.activities = response.data.activities;
                    $scope.studentactivities = response.data.studentactivities;
                    $scope.insights = response.data.insights;


                    var pctcomplete = 0;
                    var effcomplete = 0;

                    var efficiency = 0;

                    for (var i = 0; i < response.data.courseevents.length; i++) {
                        if (!isNaN(response.data.courseevents[i].EfficiencyRating) && !isNaN(parseFloat(response.data.courseevents[i].EfficiencyRating))) {
                            efficiency = efficiency + parseFloat(response.data.courseevents[i].EfficiencyRating);
                            effcomplete++;
                        }
                        if (response.data.courseevents[i].DateEntered) {
                            pctcomplete++;
                        }
                    }
                    $scope.pctcompletechart.percent = Math.round(100 * pctcomplete / response.data.courseevents.length);

                    if (effcomplete > 0)
                        $scope.effratingchart.percent = Math.round(efficiency / effcomplete);
                });
            }

            $scope.redirect = function (e) {
                return $http.get('/api/targetvideos/' + e.SectionID).then(function (response) {
                    $scope.targetvideos = response.data.targetvideos;
                    if ($scope.targetvideos.length <= 0) {
                        window.location.href = "#/my/class/" + $scope.classSignupsID + "/section/" + e.SectionID + "?ipbc=" + $scope.ipbc;
                    }
                    else {
                        window.location.href = "#/section/" + e.SectionID + "/classsignups/" + $scope.classSignupsID + "?ipbc=" + $scope.ipbc;
                    }
                })
            }

            $rootScope.$on('ReloadComplete',
                function (event, next, current) {
                    //getIPBCStudentDashboardContents($scope.studentID, false);
                }
            );

            common.activateController([$scope.getTrainingStudentClassDashboardContents($scope.classSignupsID, true)], 'TrainingStudentClassDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
        //]).controller("TargetSectionVideoCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$sanitize", "$route", "$routeParams",
        //    function ($scope, $rootScope, $http, $location, logger, common, datacontext, $sanitize, $route, $routeParams) {

        //        $scope.sectionID = $routeParams.sectionid;
        //        $scope.classSignupsID = $routeParams.classsignupsid;
        //        $scope.ipbc = ($routeParams.ipbc ? $routeParams.ipbc : 0);

        //        function loadTargetVideos(forceload) {                
        //            return datacontext.loadData('/api/targetvideos/' + $scope.sectionID, forceload).then(function (response) {
        //                $scope.targetvideos = response.data.targetvideos;
        //            });
        //        }

        //        $scope.GoToSections = function () {
        //            window.location.href = "#/my/class/" + $scope.classSignupsID + "/section/" + $scope.sectionID + "?ipbc=" + $scope.ipbc;
        //        }

        //        $scope.GoToClassdashboard = function () {
        //            window.location.href = "#/my/class/" + $scope.classSignupsID;
        //        }

        //        common.activateController([loadTargetVideos()], 'TargetSectionVideoCtrl').then(function () {
        //        });
        //    }
    ]).controller("TrainingStudentClassSectionDashboardCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.predicate = "";
            $scope.classSignupsID = $routeParams.classSignupsID;
            $scope.sectionID = $routeParams.sectionID;
            $scope.ipbc = ($routeParams.ipbc ? $routeParams.ipbc : 0);
            $scope.labcount = 0;
            $scope.answeredQuestions = 0;
            $scope.disc = { file: [], ThreadID: 0 };
            $scope.eventinfo = {};
            $scope.enrollment = {};
            $scope.readyfortest = 1;
            $scope.issurvey = false;
            $scope.targetvideo = false;

            $scope.reload = function () {
                $scope.getTrainingStudentClassDashboardContents($scope.classSignupsID, $scope.sectionID, true);
            }

            $scope.updateQuestions = function () {
                $scope.answeredQuestions = 0;
                if ($scope.questions && $scope.questions.length > 0) {
                    for (var i in $scope.questions) {
                        if ($scope.questions[i].Survey_Closed_A_Value) {
                            $scope.answeredQuestions++;
                        }
                    }
                }
            }

            $scope.pctcompletechart = {
                percent: 68,
                options: {
                    animate: {
                        duration: 1e3,
                        enabled: !0
                    },
                    barColor: "#2EC1CC",
                    lineCap: "square",
                    size: 180,
                    lineWidth: 20,
                    scaleLength: 0
                }
            }

            $scope.effratingchart = {
                percent: 68,
                options: {
                    animate: {
                        duration: 1e3,
                        enabled: !0
                    },
                    barColor: "#23AE89",
                    lineCap: "square",
                    size: 180,
                    lineWidth: 20,
                    scaleLength: 0
                }
            }

            $scope.getTrainingStudentClassDashboardContents = function (enrollmentID, sectionID, reload) {
                return datacontext.loadData('/api/my/class/' + enrollmentID + '/section/' + sectionID + '?ipbc=' + $scope.ipbc, reload).then(function (response) {
                    $scope.answeredQuestions = 0;

                    $scope.userdetails = response.data.userdetails;
                    $scope.section = response.data.section;
                    $scope.enrollment = response.data.enrollment;
                    $scope.sectionevents = response.data.sectionevents;
                    $scope.completedStudentCount = response.data.completedStudentCount;
                    $scope.targetvideos = response.data.targetvideos;
                    $scope.issurvey = response.data.issurveycompleted;
                    var pctcomplete = 0;
                    $scope.readyfortest = 0;
                    // Add Assignment as separate event for tracking

                    $scope.sectionevents.push({
                        ClassEventCompleted: ($scope.section.DateEntered ? 1 : 0),
                        EventTypeName: 'Homework',
                        DocumentDesc: 'Assignment/Homework for entire section',
                        DocumentName: 'Assignment/Homework for entire section',
                        DocumentLink: $scope.section.HomeworkLink
                    });

                    $scope.labcount = 0;
                    for (var i in $scope.sectionevents) {
                        if ($scope.sectionevents[i].EventTypeName == 'Lab') {
                            $scope.labcount++;
                        }
                        if ($scope.sectionevents[i].ClassEventCompleted) {
                            pctcomplete++;
                        }
                        else if ($scope.enrollment.ClassType != 'On-Demand') {
                            // Events not completed
                            if ($scope.sectionevents[i].EventTypeName != "Test" && $scope.sectionevents[i].EventTypeName != "Survey" && $scope.sectionevents[i].EventTypeName != "Homework") {
                                $scope.readyfortest = 1;
                            }
                        }
                    }

                    $scope.pctcompletechart.percent = Math.round(100 * pctcomplete / response.data.sectionevents.length);
                    $scope.effratingchart.percent = Math.round($scope.section.EfficiencyRating);

                    for (var i in $scope.sectionevents) {
                        if (!$scope.sectionevents[i].ClassEventCompleted) {
                            $scope.displayEvent($scope.sectionevents[i]);
                            return;
                        }
                    }
                    $scope.displayEvent($scope.sectionevents[$scope.sectionevents.length - 1]);
                });
            }

            $scope.retakeTest = function () {
                $http.post('/api/my/class/event/' + $scope.eventinfo.ClassEventID + '/test/' + $scope.questions[0].Survey_ID + '/retake').then(function (response) {
                    if (response.data.result == "Success") {
                        common.logger.logSuccess("Please wait while a new test is loaded...");
                        $scope.reload();
                    } else {
                        common.logger.logError("Failed to create test to retake. " + response.data.message);
                    }
                });
            }

            $scope.submitTest = function () {
                $http.post('/api/my/class/event/' + $scope.eventinfo.ClassEventID + '/test/' + $scope.questions[0].Survey_ID + '/submit', { questions: $scope.questions }).then(function (response) {
                    if (response.data.result == "Success") {
                        $scope.reload();
                        //$scope.displayEvent($scope.eventinfo.ClassEventID);
                    } else {
                        common.logger.logError("Failed to upload. " + response.data.message);
                    }
                });
            }

            //$scope.submitTest = function () {
            //    $http.post('/api/my/class/event/' + $scope.eventinfo.ClassEventID + '/test/' + $scope.questions[0].Survey_ID + '/submit' + '?ipbc=' + $scope.ipbc, { questions: $scope.questions }).then(function (response) {
            //        if (response.data.result == "Success") {
            //            $scope.reload();
            //        } else {
            //            common.logger.logError("Failed to upload. " + response.data.message);
            //        }
            //    });
            //}

            $scope.submitSurvey = function () {
                $http.post('/api/my/class/event/' + $scope.eventinfo.ClassEventID + '/survey/' + $scope.questions[0].Survey_ID + '/submit' + '?ipbc=' + $scope.ipbc, { questions: $scope.questions }).then(function (response) {
                    if (response.data.result == "Success") {
                        $scope.reload();
                    } else {
                        common.logger.logError("Failed to upload. " + response.data.message);
                    }
                });
            }

            $scope.GetTargetVideos = function () {
                return $http.get('/api/targetvideos/' + $scope.sectionID).then(function (response) {
                    $scope.targetvideos = response.data.targetvideos;
                })
            }

            $scope.reuploadFile = function () {
                var cfm = confirm("Are you sure to upload this new file and overwrite existing homework?");

                if (cfm) {
                    if (document.getElementById('reuploadedfile').files[0].size <= 30000000) {
                        var fd = new FormData();

                        fd.append('file', document.getElementById('reuploadedfile').files[0]);

                        $.ajax({
                            url: '/api/documents/homeworks/' + $scope.section.SectionID + '/' + $scope.classSignupsID + '/reupload',
                            data: fd,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'POST',
                            success: function (data) {
                                if (data.result == "Successful") {
                                    $scope.reload();
                                    common.logger.logSuccess("File has been successfully uploaded. Please wait while any pending content will be opened");
                                } else {
                                    common.logger.logError("Failed to upload. " + data.message);
                                }
                            }
                        });
                    }

                }
            }

            $scope.uploadFile = function () {

                if (document.getElementById('uploadedfile').files[0].size <= 30000000) {
                    var fd = new FormData();

                    fd.append('file', document.getElementById('uploadedfile').files[0]);

                    $.ajax({
                        url: '/api/documents/homeworks/' + $scope.section.SectionID + '/' + $scope.classSignupsID + '/upload',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST',
                        success: function (data) {
                            if (data.result == "Successful") {
                                $scope.reload();
                                common.logger.logSuccess("File has been successfully uploaded. Please wait while any pending content will be opened");
                            } else {
                                common.logger.logError("Failed to upload. " + data.message);
                            }
                        }
                    });

                }
                else {
                    common.logger.logError("Sorry! The file you have tried to upload is more than 30 MB. Please try uploading it again by saving it as a smaller file size or format. ")
                }
            }


            $scope.displayEvent = function (e) {
                $scope.targetvideo = false;
                $scope.answeredQuestions = 0;

                $('#content').animate({
                    scrollTop: $("#activity-body").position().top + 50
                }, 500);

                if (e.EventTypeName != 'Homework') {
                    return datacontext.loadData('/api/my/class/' + $scope.classSignupsID + '/section/' + $scope.sectionID + '/event/' + e.ClassEventID, true).then(function (response) {

                        $scope.answeredQuestions = 0;

                        $scope.eventinfo = response.data.eventdetails;

                        $scope.chooseEvent($scope.eventinfo);
                        $scope.threads = response.data.threads;

                        if ($scope.eventinfo && ($scope.eventinfo.EventTypeName == 'Survey' || $scope.eventinfo.EventTypeName == 'Test')) {
                            $scope.questions = response.data.questions;
                            $scope.acount = parseInt(response.data.acount);
                            $scope.qchoices = response.data.qchoices;
                        }

                        if ($scope.eventinfo.EventTypeName == 'Test') {
                            var qno = $scope.questions.length;
                            var ano = 0;
                            for (var q in $scope.questions) {
                                if ($scope.questions[q].IsCorrect) {
                                    ano++;
                                }
                            }
                            $scope.TestScore = 100 * ano / qno;
                        }
                    });
                } else {
                    $scope.eventinfo = e;
                    $scope.chooseEvent($scope.eventinfo);
                }
            }

            $scope.MarkAsCompleted = function (e) {
                if (!$scope.eventinfo.Effort) {
                    alert("Please specify time spent for this item.");
                    return;
                }

                if (parseInt($scope.eventinfo.Effort) < 5 || parseInt($scope.eventinfo.Effort) > 600) {
                    alert("Please enter effort between 5 and 600 minutes.");
                    return;
                }

                if (!$scope.eventinfo.Rating) {
                    alert("Please specify Rating for the item.");
                    return;
                }

                if ($scope.eventinfo.EventTypeName == 'Video Assignment' && !$scope.eventinfo.video) {
                    alert("Please record the video before marking it as completed.");
                    return;
                }

                $http.post('/api/my/class/event/' + e.ClassEventID + '/markascompleted' + '?ipbc=' + $scope.ipbc, { effort: $scope.eventinfo.Effort, rating: $scope.eventinfo.Rating }).then(function (response) {
                    $scope.reload();
                });
            }

            $scope.playersizes = [{ width: 380, height: 240 }, { width: 480, height: 240 }, { width: 560, height: 380 }, { width: 640, height: 360 },
            { width: 853, height: 480 }, { width: 1130, height: 640 }, { width: 1280, height: 720 }];

            $scope.getPlayerHeight = function (width) {
                for (var i = 0; i < 7; i++) {
                    if (width <= $scope.playersizes[i].width)
                        return $scope.playersizes[i].height;
                }
                return 720;
            }

            $scope.chooseEvent = function (e) {
                if (e) {
                    $('#player').html("");

                    var playerwidth = $('#activity-body').width() - 100;
                    var playerheight = $scope.getPlayerHeight(playerwidth);

                    if (e.EventTypeName.toLowerCase() == "video" && (e.DocumentDesc.toLowerCase() == "youtube" || e.DocumentLink.toLowerCase().indexOf("youtube") > -1 || e.DocumentLink.toLowerCase().indexOf("youtu.be") > -1)) {
                        var embedurl = "";
                        if (e.DocumentLink.toLowerCase().indexOf("youtu.be/") > -1)
                            embedurl = e.DocumentLink.split("tu.be/")[1];
                        else
                            embedurl = e.DocumentLink.match(/v=([^&]+)/)[1];

                        var htmlstr = '<iframe width="' + playerwidth + '" height="' + playerheight + '" src="//www.youtube.com/embed/' + embedurl + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
                        $('#player').html(htmlstr);

                    } else if (e.EventTypeName.toLowerCase() == "video" && (e.DocumentDesc.toLowerCase() == "vimeo" || e.DocumentLink.toLowerCase().indexOf("vimeo") > -1)) {
                        var embedurl = e.DocumentLink.split(".com/")[1];
                        var htmlstr = '<iframe src="//player.vimeo.com/video/' + embedurl + '" width="' + playerwidth + '" height="' + playerheight + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                        $('#player').html(htmlstr);
                    } else if (e.EventTypeName.toLowerCase() == "video") {
                        var embedurl = e.DocumentLink;
                        var htmlstr = '<video class="video-js vjs-default-skin" controls controlsList="nodownload" preload="auto" autoplay="true" width="' + playerwidth + '" height="' + playerheight + '"><source src="' + embedurl + '" type="video/mp4"/></video>';
                        //var htmlstr = '<iframe src="//player.vimeo.com/video/' + embedurl + '" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                        $('#player').html(htmlstr);
                    } else if (e.DocumentLink && (e.EventTypeName.toLowerCase() == "class room" || e.EventTypeName.toLowerCase() == "lab" || e.EventTypeName.toLowerCase() == "book reading" || e.EventTypeName.toLowerCase() == "homework")) {
                        var ext = e.DocumentLink.substr((e.DocumentLink.lastIndexOf('.') + 1)).toLowerCase();
                        if (ext != "zip") {
                            var htmlstr = '<iframe width="100%" height="' + ($('#nav-wrapper').height() - 200) + '" src="https://docs.google.com/viewer?embedded=true&url=' + encodeURIComponent(e.DocumentLink) + '" frameborder="0"></iframe>';
                            $('#player').html(htmlstr);
                        }
                    } else if (e.EventTypeName.toLowerCase() == "video assignment") {
                        return datacontext.loadData('/api/va/video/' + e.ClassEventID, true).then(function (response) {
                            if (response.data.videos && response.data.videos.length > 0) {
                                var video = response.data.videos[0];
                                e.video = video;
                                var htmlstr = '<div style="margin-bottom:10px; width:100%;">';
                                if (video.VideoPath.indexOf(".mp4") >= 0) {
                                    htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls controlsList="nodownload" preload="auto" autoplay="true" width="' + playerwidth + '" height="' + playerheight + '"><source src="' + video.VideoPath + '" type="video/mp4"/></video>';
                                } else {
                                    htmlstr = htmlstr + '<div id="UVGContainer"><embed type="application/x-shockwave-flash" src="http://learn.colaberry.com/DesktopModules/UltraVideoGallery/uvg.swf" width="480" height="312" style="undefined" id="UVG" name="UVG" quality="high" autoplay="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="portalId=0&amp;baseUrl=http://learn.colaberry.com/DesktopModules/UltraVideoGallery/&amp;vId=' + video.ItemId + '"></div>';
                                }

                                htmlstr = htmlstr + '</div>';
                                $('#player').html(htmlstr);
                            }
                        });
                    }
                }
            }

            $scope.playvideo = function (e) {

                $scope.targetvideo = true;
                $scope.targetinfo = e;

                //For visits
                $http.post('/api/my/class/CB_Video/' + e.cbvideoid + '/Section/' + $scope.sectionID + '/ClassSignups/' + $scope.classSignupsID + '/visits');

                $('#content').animate({
                    scrollTop: $("#activity-body").position().top + 50
                }, 500);

                $scope.eventinfo.DocumentName = e.Title;
                $scope.eventinfo.DocumentDesc = e.Description;

                if (e.VideoSrc == 2) {
                    if (e.thumbnail_small.toLowerCase().indexOf("youtu.be/") > -1) {
                        embedurl = e.thumbnail_small.split("tu.be/")[1];
                        var htmlstr = '<iframe width=560 height="315" src="//www.youtube.com/embed/' + embedurl + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
                        $('#videoplayer').html(htmlstr);
                    }
                    else {
                        embedurl = e.thumbnail_small.match(/v=([^&]+)/)[1];
                        var htmlstr = '<iframe width=560 height="315" src="//www.youtube.com/embed/' + embedurl + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
                        $('#videoplayer').html(htmlstr);
                    }
                }
                else {
                    var embedurl = e.VideoID;
                    var htmlstr = '<iframe src="//player.vimeo.com/video/' + embedurl + '" width=500 height="281" frameborder="1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                    $('#videoplayer').html(htmlstr);
                }
            }

            $scope.loadVideoRecorder = function () {
                // Load video player
                $scope.recordReady = true;
                $scope.categoryID = 203;

                $scope.ready = true;

                //var fObj = new FlashObject('/Content/video/UVGRecord.swf', 'UVGRecord', '480', '412', "9.0.115", '');
                //fObj.flashvars = 'baseUrl=/videos/va/&amp;seriesId=' + $scope.eventinfo.ClassEventID + '.' + $scope.classSignupsID + '&amp;maxRecordDuration=900';
                //fObj.addParam('allowScriptAccess', 'always');
                //fObj.write('UVGRecord');
                //var UVGRecord;
                //UVGRecord = document.getElementById('UVGRecord');
            }

            $scope.VideoRecorded = function () {
                common.logger.logSuccess("Great. Video has been successfully recorded. You may now mark this activity as completed.");
                $scope.eventinfo.video = "Successful";
                // $scope.eventinfo.video = $scope.recordedVideoID;
                // Load Video for playback  $scope.recordedVideoID
                //var htmlstr = '<div style="margin-bottom:10px; width:100%;">';
                //htmlstr = htmlstr + '<div id="UVGContainer"><embed type="application/x-shockwave-flash" src="http://learn.colaberry.com/DesktopModules/UltraVideoGallery/uvg.swf" width="480" height="312" style="undefined" id="UVG" name="UVG" quality="high" autoplay="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="portalId=0&amp;baseUrl=http://learn.colaberry.com/DesktopModules/UltraVideoGallery/&amp;vId=' + $scope.recordedVideoID + '"></div>';
                //htmlstr = htmlstr + '</div>';
                //$('#player').html(htmlstr);
                $scope.chooseEvent($scope.eventinfo);
            }

            $scope.MarkTargetVideoAsCompleted = function (e) {
                if (!$scope.targetinfo.Effort) {
                    alert("Please specify time spent for this item.");
                    return;
                }

                if (!$scope.targetinfo.Rating) {
                    alert("Please specify Rating for the item.");
                    return;
                }


                $http.post('/api/my/class/CB_Video/' + e.cbvideoid + '/Section/' + $scope.sectionID + '/ClassSignups/' + $scope.classSignupsID + '/markascompleted' + '?ipbc=' + $scope.ipbc, { effort: $scope.targetinfo.Effort, rating: $scope.targetinfo.Rating }).then(function (response) {
                    $scope.reload();
                });
            }

            $rootScope.$on('ReloadComplete',
                function (event, next, current) {
                    //getIPBCStudentDashboardContents($scope.studentID, false);
                }
            );


            //if ($('.nav-min #nav').length == 0)
            //    $('.toggle-min').click();

            common.activateController([$scope.getTrainingStudentClassDashboardContents($scope.classSignupsID, $scope.sectionID, true)], 'TrainingStudentClassSectionDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("DiscussionsDashboardCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {

            $scope.status = 1;
            $scope.ipbc = ($routeParams.ipbc ? $routeParams.ipbc : 0);
            $scope.labcount = 0;
            $scope.answeredQuestions = 0;
            $scope.disc = { file: [], ThreadID: 0 };

            $scope.classID = 0;
            $scope.eventID = 0;

            if ($scope.$parent.$parent.enrollment && $scope.$parent.$parent.enrollment.ClassID) {
                $scope.classID = $scope.$parent.$parent.enrollment.ClassID;
            } else if ($routeParams.classID) {
                $scope.classID = $routeParams.classID;
            }

            if ($scope.eventinfo && $scope.eventinfo.EventID) {
                $scope.eventID = $scope.eventinfo.EventID;
            } else if ($routeParams.eventID) {
                $scope.eventID = $routeParams.eventID;
            }


            if ($scope.eventID) {
                $scope.status = 0;
            }

            $scope.AddDiscussion = function (d) {
                var cfm = confirm("Are you sure to create a new discussion?");
                if (cfm) {
                    var threadID = (d.ThreadID ? d.ThreadID : 0);
                    common.logger.log("Please wait while a new discussion is being started ...");
                    $http.post('/api/discussions/class/' + $scope.classID + '/event/' + $scope.eventID + '/add', { discussion: d }).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.LoadPage();
                            $scope.disc = { file: [], ThreadID: 0 };
                            common.logger.logSuccess("You rock! A new discussion has been successfully initiated. Thank you.");
                        } else {
                            common.logger.logError("Failed to create a new discussion thread. " + response.data.message);
                        }
                    });
                }
            }

            $scope.LoadPage = function (s) {
                $scope.status = s;
                $scope.threads = [];
                return datacontext.loadData('/api/discussions/class/' + $scope.classID + '/event/' + $scope.eventID + '?status=' + s, true).then(function (response) {
                    $scope.threads = response.data.threads;
                });
            }

            $scope.uploadDiscussionFile = function (d) {
                var fd = new FormData();
                var threadID = (d.ThreadID ? d.ThreadID : 0);

                fd.append('file', document.getElementById('uploadedfile_' + threadID).files[0]);

                $.ajax({
                    url: '/api/documents/threads/' + threadID + '/upload',
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        if (data.result == "Success") {
                            $scope.$apply(function () {
                                d.files = data.uploads;
                            });
                            common.logger.logSuccess("File has been successfully uploaded. Please wait while refreshing the file list");
                        } else {
                            common.logger.logError("Failed to upload. " + data.message);
                        }
                    }
                });
            }

            $scope.toggleThreadPanel = function (t) {
                t.isCollapsed = !t.isCollapsed;
                if (!t.ThreadComments) {
                    return datacontext.loadData('/api/discussion/' + t.ID + '/comments', true).then(function (response) {
                        t.ThreadComments = response.data.comments;
                        t.ThreadUploads = response.data.uploads;
                    });
                }
            }

            $scope.AddThreadComments = function (t) {
                if (t.description && t.description.length > 10) {
                    var cfm = confirm("Are you sure to add these comments?");
                    if (cfm) {
                        var comments = t.description;
                        t.description = "";
                        common.logger.log("Please wait while a new comment is being added ...");
                        $http.post('/api/discussion/' + t.ID + '/comments/add', { description: comments }).then(function (response) {
                            common.logger.log("Comment has been successfully added and email notifications have been sent. Thank you.");
                            t.description = "";
                            t.ThreadComments = response.data.comments;
                            t.ReplyCount = t.ThreadComments.length;
                        });
                    }
                }
            }

            $scope.MarkCommentAsAnswer = function (t, c) {
                var cfm = confirm("Are you sure to confirm this as an answer to the discussion?");
                if (cfm) {
                    c.Status = 1;
                    common.logger.log("Please wait while the comment is being marked as answer ...");
                    $http.post('/api/discussion/' + t.ID + '/comment/' + c.ID + '/markanswer', {}).then(function (response) {
                        t.ThreadComments = response.data.comments;
                        t.ReplyCount = t.ThreadComments.length;
                        t.Status = 2;
                        t.isCollapsed = true;
                        common.logger.log("Comment has been successfully marked as answer and this thread will now be closed for further discussions. Email notifications have been sent. Thank you.");
                    });
                }
            }


            common.activateController([$scope.LoadPage($scope.status)], 'DiscussionsDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("TrainingStudentClassDashboardCtrl__", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.predicate = "";
            $scope.classSignupsID = $routeParams.classSignupsID;

            $scope.reload = function () {
                getTrainingStudentClassDashboardContents($scope.classSignupsID, true);
            }

            $scope.pctcompletechart = {
                percent: 68,
                options: {
                    animate: {
                        duration: 1e3,
                        enabled: !0
                    },
                    barColor: "#2EC1CC",
                    lineCap: "square",
                    size: 180,
                    lineWidth: 20,
                    scaleLength: 0
                }
            }

            $scope.effratingchart = {
                percent: 68,
                options: {
                    animate: {
                        duration: 1e3,
                        enabled: !0
                    },
                    barColor: "#23AE89",
                    lineCap: "square",
                    size: 180,
                    lineWidth: 20,
                    scaleLength: 0
                }
            }


            function getTrainingStudentClassDashboardContents(enrollmentID, reload) {
                return datacontext.loadData('/api/my/class/' + enrollmentID + '/dashboard', reload).then(function (response) {
                    $scope.userdetails = response.data.userdetails;
                    $scope.courseevents = response.data.courseevents;
                    $scope.enrollment = response.data.enrollment;
                    var pctcomplete = 0;
                    var effcomplete = 0;

                    var efficiency = 0;

                    for (var i = 0; i < response.data.courseevents.length; i++) {
                        if (response.data.courseevents[i].EfficiencyRating && !isNaN(parseFloat(response.data.courseevents[i].EfficiencyRating))) {
                            efficiency = efficiency + parseFloat(response.data.courseevents[i].EfficiencyRating);
                            effcomplete++;
                        }
                        if (response.data.courseevents[i].DateEntered) {
                            pctcomplete++;
                        }
                    }
                    $scope.pctcompletechart.percent = Math.round(100 * pctcomplete / response.data.courseevents.length);
                    $scope.effratingchart.percent = Math.round(efficiency / effcomplete);
                });
            }

            $rootScope.$on('ReloadComplete',
                function (event, next, current) {
                    //getIPBCStudentDashboardContents($scope.studentID, false);
                }
            );

            common.activateController([getTrainingStudentClassDashboardContents($scope.classSignupsID)], 'TrainingStudentClassDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });

        }
    ]).controller("CourseSchedulerCtrl", ["$scope", "$http", "$location", "$route", "$routeParams", "common",
        function ($scope, $http, $location, $route, $routeParams, common) {

            $scope.weekdays = [
                { display: "Sun", weekday: 0, checked: false },
                { display: "Mon", weekday: 1, checked: false },
                { display: "Tue", weekday: 2, checked: true },
                { display: "Wed", weekday: 3, checked: false },
                { display: "Thu", weekday: 4, checked: false },
                { display: "Fri", weekday: 5, checked: false },
                { display: "Sat", weekday: 6, checked: true }
            ];

            $scope.locations = [
                "Richardson - Room 101",
                "Richardson - Room 201",
                "Richardson - Room 301",
                "Irving - Room 101",
                "Online - Studio 101"];

            $scope.startDate = moment().format('L');
            $scope.selLocation = "Richardson - Room 101";
            $scope.numSessions = 10;

            $scope.schedule = [];

            $scope.updateSchedule = function () {
                var selweekdays = [];
                var schedule = [];

                for (var i in $scope.weekdays) {
                    if ($scope.weekdays[i].checked) {
                        selweekdays.push($scope.weekdays[i].weekday);
                    }
                }

                if (selweekdays.length == 0 || $scope.numSessions == 0) {
                    $scope.schedule = [];
                    return;
                }

                var ctr = 0;
                var nextclass = moment($scope.startDate);

                if (nextclass.day() > selweekdays[0]) {
                    if (nextclass.day() > selweekdays[selweekdays.length - 1]) {
                        //selweekdays.reverse();
                    } else {
                        selweekdays.reverse();
                    }
                }

                for (var ctr = 0; ctr < $scope.numSessions; ctr++) {
                    nextclass = $scope.getNextWeekDay(selweekdays[ctr % selweekdays.length], nextclass);
                    schedule.push({ sessionNumber: ctr + 1, sessionDate: nextclass.format("dddd, MMM DD YYYY") });
                    nextclass = nextclass.add('days', 1);
                }
                $scope.schedule = schedule;
            }

            $scope.getNextWeekDay = function (wday, currentday) {
                var cweekday = currentday.day();
                if (cweekday == wday) {
                    return currentday;
                } else if (wday > cweekday) {
                    return currentday.add('days', wday - cweekday);
                } else {
                    return currentday.add('days', 7 - cweekday + wday);
                }
            }

            var promise = $http.get('/api/ipbc/list').then(function (response) {
                $scope.students = response.data.results;
            });

            $scope.updateSchedule();

            common.activateController([], 'Scheduler').then(function () {
                common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("CourseDetailsCtrl", ["$scope", "$http", "$location", "$route", "$routeParams", "$rootScope", "common",
        function ($scope, $http, $location, $route, $routeParams, $rootScope, common) {
            console.log($routeParams);
            var promise = $http.get('/api/course/' + $routeParams.CourseID).then(function (response) {
                $scope.items = response.data.results;
            });

            common.activateController([promise], 'CourseDetailsCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("NavCtrl", ["$scope", "taskStorage", "filterFilter",
        function ($scope, taskStorage, filterFilter) {
            var tasks;
            return tasks = $scope.tasks = taskStorage.get(), $scope.taskRemainingCount = filterFilter(tasks, {
                completed: !1
            }).length, $scope.$on("taskRemaining:changed", function (event, count) {
                return $scope.taskRemainingCount = count
            })
        }
    ]).controller("VideoDashboardCtrl", ["$scope", "$http", "$location", "$route", "$routeParams", "$rootScope", "common", "datacontext",
        function ($scope, $http, $location, $route, $routeParams, $rootScope, common, datacontext) {

            $scope.predicate = "-CreatedDate";
            $scope.classSignupsID = $routeParams.classSignupsID;
            $scope.classID = 0;

            $scope.selfmt = 'mp4';

            $scope.rating = 0;
            $scope.HomeWorkOnly = false;

            $scope.videos = [];
            $scope.querystr = "";

            $scope.reload = function () {
                $scope.loadVideos();
            }

            $scope.libraries = [];
            $scope.categories = [];
            $scope.dateranges = [
                { days: 1, description: "Last 24 hours" },
                { days: 2, description: "Last 2 days" },
                { days: 7, description: "Last week" },
                { days: 30, description: "Last month" },
                { days: 90, description: "Last quarter" },
                { days: 365, description: "Last year" },
            ];

            $scope.daterange = 90;

            $scope.getEnrollmentDetails = function (enrollmentID, reload) {
                return datacontext.loadData('/api/my/class/' + enrollmentID + '/dashboard?ipbc=0', reload).then(function (response) {
                    $scope.userdetails = response.data.userdetails;
                    $scope.courseevents = response.data.courseevents;
                    $scope.enrollment = response.data.enrollment;
                    $scope.classID = $scope.enrollment.ClassID;
                    getVideoMetaData();
                });
            }

            function getVideos(reload) {
                return datacontext.loadData('/api/class/' + $scope.classID + '/videos?daterange=' + $scope.daterange, reload).then(function (response) {
                    $scope.videos = response.data.videos;
                    if (reload) {
                        //$scope.playVideo($scope.videos[0]);
                    }
                });
            }

            $rootScope.$on('ReloadComplete',
                function (event, next, current) {
                    //getVideos(false);
                }
            );

            $scope.loadVideos = function () {
                $scope.isLoading = true;

                if ($scope.rating > 0) {
                    $scope.HomeWorkOnly = false;
                }

                $scope.videos = [];
                var apiurl = '/api/class/' + $scope.classID + '/videos?daterange=' + $scope.daterange + "&library=" + $scope.library + "&category=" + $scope.category + "&user=" + $scope.user + "&hw=" + $scope.HomeWorkOnly + "&rating=" + $scope.rating;
                return $http.get(apiurl).then(function (response) {
                    $scope.videos = response.data.videos;
                    $scope.videoevents = response.data.videoevents;
                    $scope.isLoading = false;
                }, function (response) {
                    $scope.isLoading = false;
                });
            }

            $scope.ShowVideosByUser = function () {
                $scope.user = $scope.selVideo.CreatedByUser;
                $scope.HomeWorkOnly = false;
                $scope.library = 0;
                $scope.category = 0;
                $scope.daterange = 0;
                $scope.loadVideos();
            }

            $scope.ShowVideosByQuestion = function () {
                $scope.category = $scope.selVideo.CategoryId;
                $scope.HomeWorkOnly = false;
                $scope.library = 0;
                $scope.user = 0;
                $scope.daterange = 0;
                $scope.loadVideos();
            }

            function getVideoMetaData() {
                return datacontext.loadData('/api/class/' + $scope.classID + '/videos/libraries').then(function (response) {
                    //$scope.libraries = response.data.libraries;
                    //$scope.categories = response.data.categories;
                    $scope.users = response.data.users;
                    $scope.classinfo = response.data.classinfo;

                    if ($routeParams.user) {
                        $scope.user = $routeParams.user;
                        if ($routeParams.category) {
                            $scope.category = $routeParams.category;
                        }
                        $scope.HomeWorkOnly = false;
                        $scope.daterange = 0;
                    }

                    $scope.loadVideos();
                });
            }

            $scope.AddComments = function () {
                $scope.commentstatus = "Please wait..";
                var postdata = { homeworkid: $scope.selVideo.HomeWorkID, rating: $scope.rating, comment: $scope.description };
                $http.post('/api/video/' + $scope.videoId + '/comments/add', postdata).then(function (response) {
                    $scope.commentstatus = "";
                    $scope.description = "";
                    $scope.selVideo.HomeWorkID = 0;
                    datacontext.loadData('/api/video/' + $scope.videoId + '/comments', true).then(function (response) {
                        $scope.selVideoComments = response.data.results;
                    });
                });
            }

            $scope.playersizes = [{ width: 380, height: 240 }, { width: 480, height: 240 }, { width: 560, height: 380 }, { width: 640, height: 360 },
            { width: 853, height: 480 }, { width: 1130, height: 640 }, { width: 1280, height: 720 }];

            $scope.getPlayerHeight = function (width) {
                for (var i = 0; i < 7; i++) {
                    if (width <= $scope.playersizes[i].width)
                        return $scope.playersizes[i].height;
                }
                return 720;
            }


            $scope.playVideo = function (v, fmt) {
                $scope.isPlaying = true;
                $scope.selVideo = v;
                $scope.videoId = v.ItemId;
                //$scope.$apply();


                if (!fmt)
                    fmt = 'mp4';

                $scope.selfmt = fmt;

                //$('#video-player-modal').modal('show');

                datacontext.loadData('/api/video/' + v.ItemId + '/comments', true).then(function (response) {
                    $scope.rating = 0;
                    $scope.selVideoComments = response.data.results;

                    var playerwidth = $('#video-dashboard-header').width() / 2 * 0.90;
                    var playerheight = $scope.getPlayerHeight(playerwidth);

                    //$('#video-player-clip-title').html(v.Title);
                    var htmlstr = '<div style="text-align:center;background:#000; margin-bottom:10px; width:100%;">';

                    var thumbnail = '';

                    if (!v.ReferenceId) {
                        thumbnail = 'http://learn.colaberry.com/' + v.Thumbnail;
                    } else {
                        thumbnail = 'https://app.colaberry.com/' + v.Thumbnail;
                    }

                    if (fmt == 'mp4') {
                        //console.log('MP4 Format');
                        htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls controlsList="nodownload" preload="auto" autoplay="true" poster="' + thumbnail + '"  width="' + playerwidth + '" height="' + playerheight + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';
                    } else {
                        //console.log('FLV Format');
                        htmlstr = htmlstr + '<div id="UVGContainer"><embed type="application/x-shockwave-flash" src="http://learn.colaberry.com/DesktopModules/UltraVideoGallery/uvg.swf" width="' + playerwidth + '" height="' + playerheight + '" style="undefined" id="UVG" name="UVG" quality="high" autoplay="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="portalId=0&amp;baseUrl=http://learn.colaberry.com/DesktopModules/UltraVideoGallery/&amp;vId=' + v.ItemId + '"></div>';
                    }


                    //if (!v.ReferenceId) {
                    //    htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls preload="auto" autoplay="true" poster="http://learn.colaberry.com/' + v.Thumbnail + '"  width="' + playerwidth + '" height="' + playerheight + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';
                    //} else {
                    //    htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls preload="auto" autoplay="true" poster="https://app.colaberry.com/' + v.Thumbnail + '"  width="' + playerwidth + '" height="' + playerheight + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';
                    //}
                    //htmlstr = htmlstr + '<div id="UVGContainer"><embed type="application/x-shockwave-flash" src="http://learn.colaberry.com/DesktopModules/UltraVideoGallery/uvg.swf" width="' + playerwidth + '" height="' + playerheight + '" style="undefined" id="UVG" name="UVG" quality="high" autoplay="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="portalId=0&amp;baseUrl=http://learn.colaberry.com/DesktopModules/UltraVideoGallery/&amp;vId=' + v.ItemId + '"></div>';
                    htmlstr = htmlstr + '</div>';

                    //console.log(htmlstr);

                    $('#video-player').html(htmlstr);

                    $('#content').animate({
                        scrollTop: $("#video-player-section").position().top
                    }, 500);
                });
            }

            common.activateController([$scope.getEnrollmentDetails($scope.classSignupsID)], 'VideoDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("VideoDashboardOldCtrl", ["$scope", "$http", "$location", "$route", "$routeParams", "$rootScope", "common", "datacontext",
        function ($scope, $http, $location, $route, $routeParams, $rootScope, common, datacontext) {

            $scope.predicate = "-CreatedDate";

            $scope.rating = 0;
            $scope.HomeWorkOnly = false;

            $scope.videos = [];
            $scope.querystr = "";

            $scope.reload = function () {
                getVideos(true);
            }

            $scope.libraries = [];
            $scope.categories = [];
            $scope.dateranges = [
                { days: 1, description: "Last 24 hours" },
                { days: 2, description: "Last 2 days" },
                { days: 7, description: "Last week" },
                { days: 30, description: "Last month" },
                { days: 365, description: "Last year" },
            ];

            $scope.daterange = 7;

            function getVideos(reload) {
                return datacontext.loadData('/api/videos?daterange=7', reload).then(function (response) {
                    $scope.videos = response.data.videos;
                    console.log(response.data.videos.length);
                });
            }

            $rootScope.$on('ReloadComplete',
                function (event, next, current) { getVideos(false); }
            );

            $scope.loadVideos = function () {
                $scope.isLoading = true;
                $scope.videos = [];
                var apiurl = "/api/videos?daterange=" + $scope.daterange + "&library=" + $scope.library + "&category=" + $scope.category + "&user=" + $scope.user;
                return $http.get(apiurl).then(function (response) {
                    $scope.videos = response.data.videos;
                    $scope.isLoading = false;
                }, function (respoinse) {
                    $scope.isLoading = false;
                });
            }

            function getVideoMetaData() {
                return datacontext.loadData('/api/videos/libraries').then(function (response) {
                    $scope.libraries = response.data.libraries;
                    $scope.categories = response.data.categories;
                    $scope.users = response.data.users;
                });
            }

            $scope.AddComments = function () {
                $scope.commentstatus = "Please wait..";
                var postdata = { homeworkid: $scope.selVideo.HomeWorkID, rating: $scope.rating, comment: $scope.description };
                $http.post('/api/video/' + $scope.videoId + '/comments/add', postdata).then(function (response) {
                    $scope.commentstatus = "";
                    $scope.description = "";
                    $scope.selVideo.HomeWorkID = 0;
                    datacontext.loadData('/api/video/' + $scope.videoId + '/comments', true).then(function (response) {
                        $scope.selVideoComments = response.data.results;
                    });
                });
            }

            $scope.playersizes = [{ width: 380, height: 240 }, { width: 480, height: 240 }, { width: 560, height: 380 }, { width: 640, height: 360 },
            { width: 853, height: 480 }, { width: 1130, height: 640 }, { width: 1280, height: 720 }];

            $scope.getPlayerHeight = function (width) {
                for (var i = 0; i < 7; i++) {
                    if (width <= $scope.playersizes[i].width)
                        return $scope.playersizes[i].height;
                }
                return 720;
            }

            $scope.playVideo = function (v) {
                $scope.isPlaying = true;
                $scope.selVideo = v;
                $scope.videoId = v.ItemId;
                //$scope.$apply();

                //$('#video-player-clip-title').html(v.Title);
                var htmlstr = '<div style="text-align:center;background:#000; margin-bottom:10px; width:100%;">';
                //htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls preload="auto" autoplay="true" poster="http://learn.colaberry.com/' + v.Thumbnail + '"  width="' + ($('#filters-window').width() * 0.90) + '" height="' + $scope.getPlayerHeight($('#filters-window').width() * .90) + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';
                htmlstr = htmlstr + '<div id="UVGContainer"><embed type="application/x-shockwave-flash" src="http://learn.colaberry.com/DesktopModules/UltraVideoGallery/uvg.swf" width="' + ($('#filters-window').width() * 0.90) + '" height="' + $scope.getPlayerHeight($('#filters-window').width() * .90) + '" style="undefined" id="UVG" name="UVG" quality="high" autoplay="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="portalId=0&amp;baseUrl=http://learn.colaberry.com/DesktopModules/UltraVideoGallery/&amp;vId=' + v.ItemId + '"></div>';
                htmlstr = htmlstr + '</div>';

                //console.log(htmlstr);

                $('#video-player').html(htmlstr);

                $('#content').animate({
                    scrollTop: $("#video-dashboard-header").position().top + $scope.getPlayerHeight($('#filters-window').width()) + 50
                }, 500);

                //$('#video-player-modal').modal('show');

                datacontext.loadData('/api/video/' + v.ItemId + '/comments', true).then(function (response) {
                    $scope.rating = 0;
                    $scope.selVideoComments = response.data.results;
                });
            }

            common.activateController([getVideos(), getVideoMetaData()], 'VideoDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("StudentSettingsCtrl", ["$scope", "$http", "$location", "$route", "$routeParams", "$rootScope", "common", "datacontext",
        function ($scope, $http, $location, $route, $routeParams, $rootScope, common, datacontext) {

            $scope.resetData = function () {
                datacontext.resetData();
            }

            $scope.datastore = datacontext.datastore;

            $scope.reloadAll = function () {
                common.reloadData();
            }

            common.activateController([], 'InstructorSettingsCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("StudentSearchCtrl", ["$scope", "$http", "$location", "$route", "$routeParams", "$rootScope", "common", "datacontext",
        function ($scope, $http, $location, $route, $routeParams, $rootScope, common, datacontext) {

            $scope.resetData = function () {
                datacontext.resetData();
            }

            $scope.reloadAll = function () {
                common.reloadData();
            }

            $scope.openStudentDashboard = function (sid) {
                $location.path('/students/ipbc/' + sid);
            }

            common.activateController([], 'InstructorSettingsCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("HelpController", ["$scope", "$http", "$location", "$route", "$routeParams", "$rootScope", "common", "datacontext",
        function ($scope, $http, $location, $route, $routeParams, $rootScope, common, datacontext) {

            common.activateController([], 'HelpController').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("PlayVideoCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$sanitize", "$route", "$routeParams",
        function ($scope, $rootScope, $http, $location, logger, common, datacontext, $sanitize, $route, $routeParams) {
            $scope.CBVideoID = $routeParams.CBVideoID;

            function loadVideo(forceload) {
                $http.post('/api/studentvideoaccess/' + $scope.CBVideoID + '/history');

                return datacontext.loadData('/api/studentvideodetail/' + $scope.CBVideoID, forceload).then(function (response) {
                    $scope.vinfo = response.data.vinfo;
                    var embedurl = "";
                    if ($scope.vinfo.VideoSrc == 2) {
                        if ($scope.vinfo.thumbnail_small.toLowerCase().indexOf("youtu.be/") > -1) {
                            embedurl = $scope.vinfo.thumbnail_small.split("tu.be/")[1];
                            var htmlstr = '<iframe width="100%" height="500" src="//www.youtube.com/embed/' + embedurl + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
                            $('#player').html(htmlstr);
                        }
                        else {
                            embedurl = $scope.vinfo.thumbnail_small.match(/v=([^&]+)/)[1];
                            var htmlstr = '<iframe width="100%" height="500" src="//www.youtube.com/embed/' + embedurl + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
                            $('#player').html(htmlstr);
                        }
                    }
                    else {
                        var embedurl = $scope.vinfo.VideoID;
                        var htmlstr = '<iframe src="//player.vimeo.com/video/' + embedurl + '" width="100%" height="500" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                        $('#player').html(htmlstr);
                    }

                });
            }

            common.activateController([loadVideo()], 'PlayVideoCtrl').then(function () {
            });
        }

    ]).controller("MainApplicantJobDashboardCtrl", ["$scope", "$http", "$location", "$route", "$routeParams", "$rootScope", "common", "datacontext",
        function ($scope, $http, $location, $route, $routeParams, $rootScope, common, datacontext) {
            $scope.jobID = $routeParams.jobID;

            $scope.loadPage = function () {
                return datacontext.loadData('/api/my/job/' + $scope.jobID).then(function (response) {
                    $scope.jobdetails = response.data.jobdetails;
                    if (response.data.appldetails && response.data.appldetails.length > 0)
                        $scope.appldetails = response.data.appldetails[0];

                    $scope.appldocs = response.data.appldocs;
                    $scope.assessments = response.data.assessments;
                });
            }

            $scope.SaveChanges = function () {
                var cfm = confirm("Are you sure to apply for the job?");
                if (cfm) {
                    $http.post('/api/job/' + $scope.jobID + '/apply', $scope.newEntry).then(function (response) {
                        common.logger.logSuccess("Congratulations. Successfully applied.");
                        if (response.data.appldetails && response.data.appldetails.length > 0)
                            $scope.appldetails = response.data.appldetails[0];
                    });
                }
            }

            $scope.deleteResume = function (r) {
                var cfm = confirm("Are you sure to delete the resume?");
                if (cfm) {
                    $http.post('/api/job/' + $scope.jobID + '/document/' + r.ID + '/delete').then(function (response) {
                        common.logger.logSuccess("Successfully deleted.");
                        $scope.appldocs = response.data.appldocs;
                    });
                }
            }

            $scope.UploadResume = function () {
                var fd = new FormData();

                fd.append('file', document.getElementById('uploadedfile').files[0]);
                fd.append('DocumentTitle', $scope.newEntry.DocumentTitle);
                fd.append('Notes', $scope.newEntry.Notes);

                $.ajax({
                    url: '/api/job/' + $scope.jobID + '/documents/upload',
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        common.logger.logSuccess("File has been successfully uploaded.");
                        $scope.$apply(function () {
                            $scope.appldocs = data.appldocs;
                        });
                    }
                });
            }

            $scope.displayProfile = function (profileURL) {
                var htmlstr = '<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>    <script type="IN/MemberProfile" data-id="' + profileURL + '" data-format="inline"></script>';
                $('#liprofile').html(htmlstr);
            }

            common.activateController([$scope.loadPage()], 'MainApplicantJobDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("MainApplicantJobAssessmentDashboardCtrl", ["$scope", "$http", "$location", "$route", "$routeParams", "$rootScope", "common", "datacontext", "$timeout",
        function ($scope, $http, $location, $route, $routeParams, $rootScope, common, datacontext, $timeout) {
            $scope.testID = $routeParams.testID;
            $scope.tickInterval = 1000;
            $scope.starttime = moment();

            $scope.choiceA = false;
            $scope.choiceB = false;
            $scope.choiceC = false;
            $scope.choiceD = false;


            $scope.qno = 1;
            $scope.gotoqno = 1;
            $scope.loadPage = function () {
                return datacontext.loadData('/api/my/assessment/' + $scope.testID + '/details').then(function (response) {
                    $scope.assessmentdetails = response.data.assessmentdetails;
                    $scope.jobdetails = response.data.jobdetails;
                    $scope.question = response.data.question;
                    $scope.setAnswers();
                    // Start the timer
                    $timeout(tick, $scope.tickInterval);
                });
            }


            $scope.finishTest = function () {
                var cfm = confirm("Are you sure to finish the test?");
                if (cfm) {
                    return $http.post('/api/my/assessment/' + $scope.testID + '/finish').then(function (response) {
                        $location.path('/my/dashboard');
                    });
                }
            }

            $scope.timeclock = "";

            var tick = function () {
                $scope.timeclock = $scope.starttime;
                $timeout(tick, $scope.tickInterval); // reset the timer
            }


            $scope.setAnswers = function () {

                if ($scope.question.Answer) {
                    $scope.question.Answer = eval("(" + $scope.question.Answer + ")");
                    $scope.choiceA = $scope.question.Answer.A;
                    $scope.choiceB = $scope.question.Answer.B;
                    $scope.choiceC = $scope.question.Answer.C;
                    $scope.choiceD = $scope.question.Answer.D;

                } else {
                    $scope.choiceA = false;
                    $scope.choiceB = false;
                    $scope.choiceC = false;
                    $scope.choiceD = false;
                }
            }

            $scope.Goto = function (n) {
                if (n > 0 && n <= $scope.assessmentdetails.QCount) {
                    $scope.qno = parseInt(n);
                    $scope.gotoqno = $scope.qno;
                    return datacontext.loadData('/api/my/assessment/' + $scope.testID + '/q/' + $scope.qno, true).then(function (response) {
                        $scope.question = response.data.question;
                        $scope.setAnswers();
                    });
                } else {
                    $scope.gotoqno = $scope.qno;
                }
            }

            $scope.SaveAnswer = function () {
                var answer = {};
                if ($scope.choiceA || $scope.choiceB || $scope.choiceC || $scope.choiceD) {
                    answer = { A: $scope.choiceA, B: $scope.choiceB, C: $scope.choiceC, D: $scope.choiceD };
                    $http.post('/api/my/assessment/' + $scope.testID + '/q/' + $scope.question.QuestionID + '/answer', { answer: answer }).then(function (response) {

                        if ($scope.qno == $scope.assessmentdetails.QCount) {
                            // Done
                            common.logger.logSuccess("Great, you have reached the end of the test. Continue to review or Finish Test.")
                            $scope.Goto(1);
                        }
                        else {
                            $scope.Goto($scope.qno + 1);
                        }
                    });
                }
            }

            common.activateController([$scope.loadPage()], 'MainApplicantJobAssessmentDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("JobHelpController", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.ClassSignupsID = 0;
            var ProjectRequirementUploadFiles = [];
            var YourEffortUploadFiles = [];
            $scope.loadPage = function (reload) {
                return datacontext.loadData('/api/my/main/Jobhelp', reload).then(function (response) {
                    $scope.workHelps = response.data.workHelp;
                    $scope.workHelpSeverityLevels = response.data.workHelpSeverityLevels;
                    $scope.ClassSignupsID = response.data.ClassSignupsID;
                });
            }

            $scope.openNewEntryFrom = function () {
                $scope.newEntry = {};
                $scope.newEntry.FormTitle = "Add New Job Help";
                $scope.newEntry.SaveButtonText = "Add";
            }

            $scope.UploadProjectRequirementFile = function () {
                var fd = new FormData();
                fd.append('file', document.getElementById('projectRequirementUploadedfile').files[0]);
                $.ajax({
                    url: '/api/JobHelpDocuments/upload/' + $scope.ClassSignupsID,
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        ProjectRequirementUploadFiles.push(data.filename)
                        $scope.$apply(function () {
                            $scope.documentlink = 'http://app.colaberry.com' + data.fileURL;
                            $scope.newEvent.DocumentLink = 'http://app.colaberry.com' + data.fileURL;
                        });
                        common.logger.logSuccess("File has been successfully uploaded.");
                    }
                });
            }

            $scope.UploadYourEffortFile = function () {
                var fd = new FormData();
                fd.append('file', document.getElementById('yourEffortUploadedfile').files[0]);
                $.ajax({
                    url: '/api/JobHelpDocuments/upload/' + $scope.ClassSignupsID,
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        YourEffortUploadFiles.push(data.filename)
                        $scope.$apply(function () {
                            $scope.documentlink = 'http://app.colaberry.com' + data.fileURL;
                            $scope.newEvent.DocumentLink = 'http://app.colaberry.com' + data.fileURL;
                        });
                        common.logger.logSuccess("File has been successfully uploaded.");
                    }
                });
            }

            $scope.SaveJobHelp = function () {
                var postdata = { formdata: $scope.newEntry, ProjectRequirementUploadFiles: ProjectRequirementUploadFiles, YourEffortUploadFiles: YourEffortUploadFiles }
                $http.post('/api/my/main/jobhelp/save/' + $scope.ClassSignupsID, postdata).then(function (response) {
                    if (response.data.status == "Successful") {
                        $scope.loadPage(true);
                        $scope.CleanForm();
                        common.logger.logSuccess("Successfully saved.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            $scope.CleanForm = function () {
                $scope.newEntry = {};
                $scope.newEntry.YourEffortuploadfile = {};
                $scope.newEntry.ProjectRequirementUploadfile = {};
                var ProjectRequirementUploadFiles = [];
                var YourEffortUploadFiles = [];
            }

            $scope.openCommentForm = function (f) {
                $scope.newEntry = {};
                $scope.WorkHelpID = f.WorkHelpId;
                $http.get('/api/my/main/jobhelp/getComments/' + $scope.WorkHelpID).then(function (response) {
                    $scope.comments = response.data.comments;
                });
            }

            $scope.openClosingCommentForm = function (f) {
                $scope.newEntry = {};
                $scope.WorkHelpID = f.WorkHelpId;
            }

            $scope.SaveJobHelpComment = function () {
                var postdata = { formdata: $scope.newEntry }
                $http.post('/api/my/main/jobhelp/saveComment/' + $scope.WorkHelpID, postdata).then(function (response) {
                    if (response.data.status == "Successful") {
                        $scope.loadPage(true);
                        common.logger.logSuccess("Successfully saved.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            $scope.SaveJobHelpClosingComment = function () {
                var postdata = { formdata: $scope.newEntry }
                $http.post('/api/my/main/jobhelp/saveClosingComment/' + $scope.WorkHelpID, postdata).then(function (response) {
                    if (response.data.status == "Successful") {
                        $scope.loadPage(true);
                        common.logger.logSuccess("Successfully saved.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            common.activateController([$scope.loadPage()], 'JobHelpController').then(function () {
            });
        }


    ]).controller("StudentsReferrals", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext", "$window",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext, $window) {
            $scope.btnSignUp = 'Sign up?'
            $scope.spanPlus = true;
            $scope.disabledbtnSignUpReferral = false;
            $scope.loadPage = function (reload) {
                return datacontext.loadData('/api/referralsignup', reload).then(function (response) {
                    $scope.divSignUp = response.data.divSignUp;
                    $scope.divMaintenance = response.data.divMaintenance;
                    $scope.referralUsers = response.data.referralUsers;

                    if ($scope.referralUsers != '') {
                        $scope.divNoRecords = false;
                        $scope.divMaintenanceTable = true;

                    } else {
                        $scope.divNoRecords = true;
                        $scope.divMaintenanceTable = false;
                    }
                });
            }

            $scope.GetDetailsForStudents = function (f) {
                $scope.showplusindex = f;
                $scope.start = false;
            }

            $scope.HideDetailsForStudents = function (f) {
                $scope.showplusindex = -1;
                $scope.start = false;
            }

            $scope.SaveSignUpForm = function () {
                $scope.btnSignUp = 'Please wait...'
                $scope.disabledbtnSignUpReferral = true;
                $scope.spanPlus = false;
                $http.post('/api/referralprogram/signUp').then(function (response) {
                    if (response.data.status == "Successful") {
                        common.logger.logSuccess("Sign up Successfully completed.");
                        $window.location.href = '#/StudentsReferralsList'
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            $scope.SaveAction = function () {
                $http.post('/api/referralprogram/saveAction').then(function (response) {
                    if (response.data.status == "Successful") {
                        common.logger.logSuccess("Referral Program deactivated Successfully.");
                        $scope.divSignUp = false;
                        $scope.divMaintenance = true;
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            common.activateController([$scope.loadPage()], 'StudentsReferrals').then(function () {
            });
        }

    ]).controller("StudentsReferralsList", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext", "$window",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext, $window) {
            $scope.loadPage = function (reload) {
                return datacontext.loadData('/api/referralsignup', reload).then(function (response) {
                    $scope.referralMemberFirstName = response.data.referralMemberFirstName;
                    $scope.referralMemberEmail = response.data.referralMemberEmail;
                    $scope.referralUsers = response.data.referralUsers;

                    if ($scope.referralUsers != '') {
                        $scope.divNoRecords = false;
                        $scope.divMaintenanceTable = true;

                    } else {
                        $scope.divNoRecords = true;
                        $scope.divMaintenanceTable = false;
                    }
                    ReferralsToFriend();
                });

            }

            $scope.GetDetailsForStudents = function (f) {
                $scope.showplusindex = f;
                $scope.start = false;
            }

            $scope.HideDetailsForStudents = function (f) {
                $scope.showplusindex = -1;
                $scope.start = false;
            }

            common.activateController([$scope.loadPage()], 'StudentsReferralsList').then(function () {
            });
        }

    ]).controller("DiscussionsStudentCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {
            $scope.status = 0;
            $scope.ipbc = ($routeParams.ipbc ? $routeParams.ipbc : 0);
            $scope.labcount = 0;
            $scope.answeredQuestions = 0;
            $scope.disc = { file: [], ThreadID: 0 };

            $scope.classID = 0;
            $scope.eventID = 0;
            $scope.category = 1;

            $scope.maxSize = 5;
            $scope.TotalItems = 0;
            $scope.currentpage = 1;


            $scope.pageChanged = function (page) {
                $scope.currentpage = page;
                $scope.LoadPage($scope.category);
            }

            $scope.openThread = function (id) {
                $location.path('/thread/' + id);
            }

            // $("#category").selectize({});
            if ($scope.$parent.$parent.enrollment && $scope.$parent.$parent.enrollment.ClassID) {
                $scope.classID = $scope.$parent.$parent.enrollment.ClassID;
            } else if ($routeParams.classID) {
                $scope.classID = $routeParams.classID;
            }

            if ($scope.eventinfo && $scope.eventinfo.EventID) {
                $scope.eventID = $scope.eventinfo.EventID;
            } else if ($routeParams.eventID) {
                $scope.eventID = $routeParams.eventID;
            }


            if ($scope.eventID) {
                $scope.status = 0;
            }

            $scope.AddDiscussion = function (d) {
                var cfm = confirm("Are you sure to create a new discussion?");
                if (cfm) {
                    var threadID = (d.ThreadID ? d.ThreadID : 0);
                    common.logger.log("Please wait while a new discussion is being started ...");
                    $http.post('/api/discussions/class/' + $scope.classID + '/event/' + $scope.eventID + '/add', { discussion: d }).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.LoadPage($scope.category);
                            $scope.disc = { file: [], ThreadID: 0 };
                            common.logger.logSuccess("You rock! A new discussion has been successfully initiated. Thank you.");
                        } else {
                            common.logger.logError("Failed to create a new discussion thread. " + response.data.message);
                        }
                    });
                }
            }

            $scope.LoadPage = function (s) {
                var offset = ($scope.currentpage - 1) * 20;
                $scope.category = s;
                $scope.threads = [];
                //When category is Help or Discussion remove the class dependencies.
                if ($scope.category == 1 || $scope.category == 4)
                    var classID = 0;
                else
                    var classID = $scope.classID;
                return datacontext.loadData('/api/discussions/student/class/' + classID + '/event/' + $scope.eventID + '?status=' + $scope.status + "&category=" + $scope.category + "&offset=" + offset, true).then(function (response) {
                    $scope.threads = response.data.threads;
                    $scope.TotalItems = response.data.threadcounts[0].threadcounts;
                });
            }

            $scope.uploadDiscussionFile = function (d) {
                var fd = new FormData();
                var threadID = (d.ThreadID ? d.ThreadID : 0);

                fd.append('file', document.getElementById('uploadedfile_' + threadID).files[0]);

                $.ajax({
                    url: '/api/documents/threads/' + threadID + '/upload',
                    data: fd,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        if (data.result == "Success") {
                            $scope.$apply(function () {
                                d.files = data.uploads;
                            });
                            common.logger.logSuccess("File has been successfully uploaded. Please wait while refreshing the file list");
                        } else {
                            common.logger.logError("Failed to upload. " + data.message);
                        }
                    }
                });
            }

            $scope.toggleThreadPanel = function (t) {
                t.isCollapsed = !t.isCollapsed;
                if (!t.ThreadComments) {
                    return datacontext.loadData('/api/discussion/' + t.ID + '/comments', true).then(function (response) {
                        t.ThreadComments = response.data.comments;
                        t.ThreadUploads = response.data.uploads;
                    });
                }
            }

            $scope.AddThreadComments = function (t) {
                if (t.description && t.description.length > 10) {
                    var cfm = confirm("Are you sure to add these comments?");
                    if (cfm) {
                        var comments = t.description;
                        t.description = "";
                        common.logger.log("Please wait while a new comment is being added ...");
                        $http.post('/api/discussion/' + t.ID + '/comments/add', { description: comments }).then(function (response) {
                            common.logger.log("Comment has been successfully added and email notifications have been sent. Thank you.");
                            t.description = "";
                            t.ThreadComments = response.data.comments;
                            t.ReplyCount = t.ThreadComments.length;
                        });
                    }
                }
            }

            $scope.MarkCommentAsAnswer = function (t, c) {
                var cfm = confirm("Are you sure to confirm this as an answer to the discussion?");
                if (cfm) {
                    c.Status = 1;
                    common.logger.log("Please wait while the comment is being marked as answer ...");
                    $http.post('/api/discussion/' + t.ID + '/comment/' + c.ID + '/markanswer', {}).then(function (response) {
                        t.ThreadComments = response.data.comments;
                        t.ReplyCount = t.ThreadComments.length;
                        t.Status = 2;
                        t.isCollapsed = true;
                        common.logger.log("Comment has been successfully marked as answer and this thread will now be closed for further discussions. Email notifications have been sent. Thank you.");
                    });
                }
            }


            common.activateController([$scope.LoadPage($scope.category)], 'DiscussionsStudentCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("DiscussionsSearchCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext", "$modal",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext, $modal) {


            $scope.LoadPage = function () {

            }
            $scope.openThread = function (id) {
                $location.path('/thread/' + id);
            }

            $scope.LoadPageMetadata = function () {

            }
            common.activateController([$scope.LoadPageMetadata(), $scope.LoadPage($scope.status)], 'DiscussionsSearchCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
            });
        }
    ]).controller("DiscussionsAppThreadCtrl", ["$scope", "$http", "$rootScope", "$location", "$route", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $routeParams, common, datacontext) {

            $scope.threadid = $routeParams.threadID;

            $scope.LoadPage = function () {

                return datacontext.loadData('/api/discussions/student/thread/' + $scope.threadid, true).then(function (response) {

                    $scope.thread = response.data.thread;
                    $scope.comments = response.data.comments;
                    $scope.uploads = response.data.uploads;
                    $scope.tags = response.data.tags;

                });
            }

            $scope.AddThreadComments = function (t) {
                if (t.description && t.description.length > 10) {
                    var cfm = confirm("Are you sure to add these comments?");
                    if (cfm) {
                        var comments = t.description;
                        t.description = "";
                        common.logger.log("Please wait while a new comment is being added ...");
                        $http.post('/api/discussions/' + t.ID + '/comments/add', { description: comments }).then(function (response) {
                            common.logger.log("Comment has been successfully added and email notifications have been sent. Thank you.");
                            t.description = "";
                            $scope.comments = response.data.comments;
                            t.ReplyCount = $scope.comments.length;
                        });
                    }
                }
            }

            $scope.LoadPageMetadata = function () {

            }

            common.activateController([$scope.LoadPageMetadata(), $scope.LoadPage($scope.status)], 'DiscussionsAppDashboardCtrl').then(function () {
                //common.logger.logSuccess("Successfully loaded");
                // $("#tags").selectize({});
            });

        }
    ]).controller("StudentsProjectsRequestsCtrl", ["$scope", "$rootScope", "$routeParams", "$http", "$location", "logger", "common", "datacontext",
        function ($scope, $rootScope, $routeParams, $http, $location, logger, common, datacontext) {

            if ($routeParams.projectID != null) {
                $http.get("/api/getprojectdetails/" + $routeParams.projectID).then(function (response) {
                    $scope.projectTitle = response.data.projectTitle;
                    $scope.querystr = $scope.projectTitle;
                });
            }

            var ProjectScreenShotUploadFiles = [];
            var ProjectZipFile = [];
            $scope.loadPage = function () {
                $http.get("/api/projectrequests").then(function (response) {
                    $scope.projectsRequested = response.data.projectsRequested;
                    $scope.projectsDenied = response.data.projectsDenied;
                    $scope.projectsApproval = response.data.projectsApproval;
                    $scope.projectrequests = response.data.projectrequests;
                    $scope.projectsFinalApprovalPending = response.data.projectsFinalApprovalPending;
                    $scope.projectsFinalComplete = response.data.projectsFinalComplete;
                    $scope.internusers = response.data.internusers;
                    $scope.top5RatedProjects = response.data.top5RatedProjects;
                    $scope.last5RatedProjects = response.data.last5RatedProjects;
                    $scope.data = response.data.data;
                    if ($scope.data.length == 0)
                        $location.path("biodetails");

                    if ($routeParams.projectID != null) {
                        $scope.Search();
                    }
                    else {
                        $scope.expanded = false;
                        $scope.expanded1 = false;
                        $scope.expanded2 = false;
                        $scope.expanded3 = false;
                        $scope.expanded4 = false;
                    }

                    if ($scope.projectsApproval > 0) {
                        $scope.ShowApprovalColumns = true;
                    }

                    if ($scope.projectsRequested > 0) {
                        $scope.ShowRequestedColumns = true;
                    }

                    if ($scope.projectsDenied > 0) {
                        $scope.ShowDeniedColumns = true;
                    }

                    if ($scope.projectsFinalApprovalPending > 0) {
                        $scope.ShowProjectsFinalApprovalPendingColumns = true;
                    }

                    if ($scope.projectsFinalComplete > 0) {
                        $scope.ShowProjectsFinalCompleteColumns = true;
                    }
                });
            }
            $scope.DeleteProject = function (i) {
                $scope.projectID = i;
                var cfm = confirm("Are you sure you want to delete?");
                if (cfm) {
                    $http.post('/api/projectrequests/deleteprojects/' + $scope.projectID).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully deleted.");
                        } else {
                            common.logger.logError("Failed to delete : " + response.data.message);
                        }
                    });
                }
            }

            $scope.CritiqueProject = function (i) {
                $scope.projectID = i.CCS_PR_ID;
            }

            $scope.SendEmailForCritique = function (userID) {
                $http.post('/api/projectrequests/sendcritiquerequest/' + userID + '/' + $scope.projectID).then(function (response) {
                    if (response.data.result == "Success") {
                        common.logger.logSuccess("Email sent");
                    } else {
                        common.logger.logError("Failed to send : " + response.data.message);
                    }
                });
            }

            $scope.openNewEntryFrom = function () {
                $scope.ProjectID = 0;
                $scope.newEntry = {};
                $scope.divUploadedVisual = false;
                $scope.divShowZipFile = false;
                $scope.newEntry.FormTitle = "Add Project";

                ProjectScreenShotUploadFiles = [];
                ProjectZipFile = [];

                //for clear attachment name 
                var attachementElements = document.getElementsByClassName("file-input-name");
                attachementElements[0].innerHTML = ""; // Screenshot


                //var input = document.getElementById('projectScreenShot');
                var input = $("#projectScreenShot");
                input.replaceWith(input.val('').clone(true));

                var input = $("#projectZipFile");
                input.replaceWith(input.val('').clone(true));
            }

            $scope.GetApprovalProjects = function (f) {
                $scope.showplusindex_Approval = f;
                $scope.showplusindex_Denied = -1;
                $scope.showplusindex_finalApprovalPending = -1;
                $scope.showplusindex_Requested = -1;
                $scope.start = false;
                $scope.expanded1 = false;
            }

            $scope.HideApprovalProjects = function (f) {
                $scope.showplusindex_Approval = -1;
                $scope.start = false;
                $scope.expanded1 = false;
            }

            $scope.GetRequestedProjects = function (f) {
                $scope.showplusindex_Requested = f;
                $scope.showplusindex_Denied = -1;
                $scope.showplusindex_finalApprovalPending = -1;
                $scope.showplusindex_Approval = -1;
                $scope.start = false;
                $scope.expanded2 = false;
            }

            $scope.HideRequestedProjects = function (f) {
                $scope.showplusindex_Requested = -1;
                $scope.start = false;
                $scope.expanded2 = false;
            }

            $scope.GetDeniedProjects = function (f) {
                $scope.showplusindex_Denied = f;
                $scope.showplusindex_finalApprovalPending = -1;
                $scope.showplusindex_Requested = -1;
                $scope.showplusindex_Approval = -1;
                $scope.start = false;
                $scope.expanded3 = false;
            }

            $scope.HideDeniedProjects = function (f) {
                $scope.showplusindex_Denied = -1;
                $scope.start = false;
                $scope.expanded3 = false;
            }

            $scope.GetFinalApprovalProjects = function (f) {
                $scope.showplusindex_finalApprovalPending = f;
                $scope.showplusindex_Denied = -1;
                $scope.showplusindex_Requested = -1;
                $scope.showplusindex_Approval = -1;
                $scope.start = false;
                $scope.expanded = false;
            }

            $scope.HideFinalApprovalProjects = function (f) {
                $scope.showplusindex_finalApprovalPending = -1;
                $scope.start = false;
                $scope.expanded = false;
            }

            $scope.GetCompletedProjects = function (f) {
                $scope.showplusindex_Completed = f;
                $scope.showplusindex_finalApprovalPending = -1;
                $scope.showplusindex_Denied = -1;
                $scope.showplusindex_Requested = -1;
                $scope.showplusindex_Approval = -1;
                $scope.start = false;
                $scope.expanded4 = false;
            }

            $scope.HideCompletedProjects = function (f) {
                $scope.showplusindex_Completed = -1;
                $scope.start = false;
                $scope.expanded4 = false;
            }

            $scope.Search = function () {
                $scope.expanded = true;
                $scope.expanded1 = true;
                $scope.expanded2 = true;
                $scope.expanded3 = true;
                $scope.expanded4 = true;
            }

            $scope.GetProjectDetails = function (i) {
                $scope.divUploadedVisual = true;
                $scope.divShowZipFile = true;
                $scope.divApprovedUploadedVisual = false;
                $scope.newEntry = {}
                $scope.newEntry.FormTitle = "Edit Project";
                $scope.btnSaveSummary = false;
                $scope.ProjectID = i.CCS_PR_ID;
                $scope.newEntry.ProjectTitle = i.CCS_PR_Title;
                $scope.newEntry.ProjectSummary = i.CCS_PR_Summary;
                $scope.newEntry.Technology = i.CCS_PR_Technology;
                $scope.UploadedVisual = i.CCS_PR_Visual;
                $scope.ProjectZipFile = i.CCS_PR_ZipFile;
                $scope.projectSummary = i.CCS_PR_Summary;

                var attachementElements = document.getElementsByClassName("file-input-name");
                if (attachementElements[0] != null) {
                    attachementElements[0].innerHTML = ""; // Screenshot
                }

                var input = $("#projectScreenShot");
                input.replaceWith(input.val('').clone(true));

                var input = $("#projectZipFile");
                input.replaceWith(input.val('').clone(true));

                var visualScreenShotUrl = i.CCS_PR_Visual;
                if (visualScreenShotUrl != '') {
                    var visualScreenShot = visualScreenShotUrl.substring(visualScreenShotUrl.lastIndexOf('/') + 1);
                    ProjectScreenShotUploadFiles.push(visualScreenShot);
                }
                else {
                    var attachementElements = document.getElementsByClassName("file-input-name");
                    if (attachementElements[0] != null) {
                        attachementElements[0].innerHTML = ""; // Screenshot
                    }
                    ProjectScreenShotUploadFiles = [];
                }

                var zipfile = i.CCS_PR_ZipFile;
                if (zipfile != '') {
                    var zipfile = zipfile.substring(zipfile.lastIndexOf('/') + 1);
                    $scope.Zipfile = zipfile;
                    ProjectZipFile.push(zipfile);
                }
                else {
                    var attachementElements = document.getElementsByClassName("file-input-name");
                    if (attachementElements[0] != null) {
                        attachementElements[0].innerHTML = ""; // zip file
                    }
                    ProjectZipFile = [];
                }

            }

            $scope.GetFinalProjectRequestDetails = function (i) {
                $scope.newEntry = {};
                $scope.ProjectID = i.CCS_PR_ID;
                $scope.ProjectTitle = i.CCS_PR_Title;
                $scope.Technologies = i.CCS_PR_Technology;
                $scope.UploadedVisual = i.CCS_PR_Visual;
                $scope.ProjectSummary = i.CCS_PR_Summary;
                $scope.LoadProjectTags();
                $scope.LoadProjectInstructions();
            }

            $scope.LoadProjectTags = function () {
                return $http.get("/api/projects/selectedtags/" + $scope.ProjectID).then(function (response) {
                    $scope.finaltags = response.data.finaltags;
                });
            }

            $scope.LoadProjectInstructions = function () {
                return $http.get("/api/projects/projectinstructions/" + $scope.ProjectID).then(function (response) {
                    $scope.listQuestions = response.data.listQuestions;
                });
            }

            $scope.FinalProjectSubmit = function (i) {
                $scope.newEntry = {};
                $scope.ProjectID = i.CCS_PR_ID;
                $scope.ProjectTitle = i.CCS_PR_Title;
            }

            $scope.EditSummary = function (i) {
                $scope.newEntry = {};
                $scope.Zipfile = '';
                $scope.ProjectID = i.CCS_PR_ID;
                $scope.UploadedVisual = i.CCS_PR_Visual;
                $scope.ProjectZipFile = i.CCS_PR_ZipFile;
                $scope.newEntry.ProjectSummary = i.CCS_PR_Summary;
                $scope.newEntry.ProjectTitle = i.CCS_PR_Title;
                $scope.btnSaveSummary = true;
                $scope.divApprovedUploadedVisual = true;

                ProjectScreenShotUploadFiles = [];
                ProjectZipFile = [];

                //for clear attachment name 
                var attachementElements = document.getElementsByClassName("file-input-name");
                if (attachementElements[0] != null) {
                    attachementElements[0].innerHTML = ""; // Screenshot
                }

                var input = $("#projectScreenShotForApproval");
                input.replaceWith(input.val('').clone(true));

                var input = $("#projectZipFileForApproval");
                input.replaceWith(input.val('').clone(true));

                var visualScreenShotUrl = i.CCS_PR_Visual;
                if (visualScreenShotUrl != '') {
                    var visualScreenShot = visualScreenShotUrl.substring(visualScreenShotUrl.lastIndexOf('/') + 1);
                    ProjectScreenShotUploadFiles.push(visualScreenShot);
                }
                else {
                    var attachementElements = document.getElementsByClassName("file-input-name");
                    if (attachementElements[0] != null) {
                        attachementElements[0].innerHTML = ""; // Screenshot
                    }
                    ProjectScreenShotUploadFiles = [];
                }

                var zipfile = i.CCS_PR_ZipFile;
                if (zipfile != '') {
                    var zipfile = zipfile.substring(zipfile.lastIndexOf('/') + 1);
                    $scope.Zipfile = zipfile;
                    ProjectZipFile.push(zipfile);
                }
                else {
                    var attachementElements = document.getElementsByClassName("file-input-name");
                    if (attachementElements[0] != null) {
                        attachementElements[0].innerHTML = ""; // zip file
                    }
                    ProjectZipFile = [];
                }
            }

            $scope.SaveSummaryAndScreenShot = function () {
                $scope.UploadScreenShotForApproval();
                $scope.UploadProjectZipFileForApproval();
                var postdata = { Summary: $scope.newEntry.ProjectSummary, ProjectTitle: $scope.newEntry.ProjectTitle, UploadFile: ProjectScreenShotUploadFiles, UploadProjectZipfile: ProjectZipFile }
                $http.post('/api/projectrequest/summary/save/' + $scope.ProjectID, postdata).then(function (response) {
                    if (response.data.result == "Success") {
                        $scope.loadPage(true);
                        common.logger.logSuccess("Successfully saved.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            $scope.SaveChanges = function () {
                $scope.UploadScreenShot();
                $scope.UploadProjectZipFile();

                if ($scope.ProjectID == null) {
                    $scope.ProjectID = 0;
                    var postdata = { formdata: $scope.newEntry, UploadFile: ProjectScreenShotUploadFiles, UploadProjectZipfile: ProjectZipFile }
                    $http.post('/api/projectrequest/save/' + $scope.ProjectID, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });

                } else {
                    var postdata = { formdata: $scope.newEntry, UploadFile: ProjectScreenShotUploadFiles, UploadProjectZipfile: ProjectZipFile }
                    $http.post('/api/projectrequest/save/' + $scope.ProjectID, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }
            }

            $scope.FinalSubmitRequest = function () {
                var postdata = { Comment: $scope.newEntry.FinalSubmitRequestComment }
                $http.post('/api/projectrequest/finalsubmitrequest/' + $scope.ProjectID, postdata).then(function (response) {
                    if (response.data.result == "Success") {
                        $scope.loadPage(true);
                        common.logger.logSuccess("Successfully saved.");
                    } else {
                        common.logger.logError("Failed to save : " + response.data.message);
                    }
                });
            }

            $scope.UploadScreenShot = function () {
                var fd = new FormData();
                if (document.getElementById('projectScreenShot').files[0] != null) {
                    fd.append('file', document.getElementById('projectScreenShot').files[0]);
                    $.ajax({
                        url: '/api/projectrequest/upload',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            ProjectScreenShotUploadFiles = [];
                            ProjectScreenShotUploadFiles.push(data.filename)
                            $scope.$apply(function () {
                                $scope.documentlink = 'https://app.colaberry.com' + data.fileURL;
                                $scope.newEvent.DocumentLink = 'https://app.colaberry.com' + data.fileURL;
                            });
                            common.logger.logSuccess("File has been successfully uploaded.");
                        }
                    });
                }
            }

            $scope.UploadProjectZipFile = function () {
                var fd = new FormData();
                if (document.getElementById('projectZipFile').files[0] != null) {
                    fd.append('file', document.getElementById('projectZipFile').files[0]);
                    $.ajax({
                        url: '/api/projectrequest/uploadzipfile',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            ProjectZipFile = [];
                            ProjectZipFile.push(data.filename)
                            $scope.$apply(function () {
                                $scope.documentlink = 'https://app.colaberry.com' + data.fileURL;
                                $scope.newEvent.DocumentLink = 'https://app.colaberry.com' + data.fileURL;
                            });
                            common.logger.logSuccess("File has been successfully uploaded.");
                        }
                    });
                }
            }

            $scope.UploadScreenShotForApproval = function () {
                var fd = new FormData();
                if (document.getElementById('projectScreenShotForApproval').files[0] != null) {
                    fd.append('file', document.getElementById('projectScreenShotForApproval').files[0]);
                    $.ajax({
                        url: '/api/projectrequest/upload',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            ProjectScreenShotUploadFiles = [];
                            ProjectScreenShotUploadFiles.push(data.filename)
                            $scope.$apply(function () {
                                $scope.documentlink = 'https://app.colaberry.com' + data.fileURL;
                                $scope.newEvent.DocumentLink = 'https://app.colaberry.com' + data.fileURL;
                            });
                            common.logger.logSuccess("File has been successfully uploaded.");
                        }
                    });
                }
            }

            $scope.UploadProjectZipFileForApproval = function () {
                var fd = new FormData();
                if (document.getElementById('projectZipFileForApproval').files[0] != null) {
                    fd.append('file', document.getElementById('projectZipFileForApproval').files[0]);
                    $.ajax({
                        url: '/api/projectrequest/uploadzipfile',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            ProjectZipFile = [];
                            ProjectZipFile.push(data.filename)
                            $scope.$apply(function () {
                                $scope.documentlink = 'https://app.colaberry.com' + data.fileURL;
                                $scope.newEvent.DocumentLink = 'https://app.colaberry.com' + data.fileURL;
                            });
                            common.logger.logSuccess("File has been successfully uploaded.");
                        }
                    });
                }
            }

            common.activateController([$scope.loadPage()], 'ProjectsRequestsCtrl').then(function () {
            });

        }
    ]).controller("StudentsProjectsTags", ["$scope", "$rootScope", "$routeParams", "$http", "$location", "logger", "common", "datacontext", "$timeout",
        function ($scope, $rootScope, $routeParams, $http, $location, logger, common, datacontext, $timeout) {

            $scope.projectID = $routeParams.projectID;

            $scope.loadPage = function () {
                $scope.btnSaveTags = false;
                $http.get('/api/projects/tagcategories/' + $scope.projectID).then(function (response) {
                    $scope.tagCategories = response.data.tagCategories;
                    $scope.projectSummary = response.data.projectSummary;
                    common.logger.logWarning("Data updating");
                    $scope.LoadAllTags();
                    $scope.LoadAllSelectedTags();
                    $("#listA").hide();
                    $("#listB").hide();
                    $("#listC").hide();
                });
            }

            $scope.LoadAllTags = function () {
                return $http.get('/api/projects/tags').then(function (response) {
                    $scope.tags = response.data.tags;
                });
            }

            $scope.LoadAllSelectedTags = function () {
                return $http.get('/api/projects/selectedtags/' + $scope.projectID).then(function (response) {
                    $scope.selectedTags = response.data.selectedTags;
                });
            }

            $scope.uncheckAll = function (categoryId) {
                $scope.btnSaveTags = true;
                angular.forEach($scope.tags, function (value) {
                    if (value.TagCatID == categoryId) {
                        for (var i = 0; i < $scope.selectedTags.length; i++) {
                            var obj = $scope.selectedTags[i];
                            if (obj.TagID == value.TagID) {
                                $scope.selectedTags.splice(i, 1);
                                break;
                            }
                        }
                    }
                })
            }

            //$scope.myClickA = function () {
            //    //$(".wrapper .list").slideToggle("fast");
            //    //$("#listA").slideToggle("fast");
            //    //$("#listB").slideToggle("fast");
            //    $("#listA").slideToggle("fast");
            //    $("#listB").hide();
            //    $("#listC").hide();
            //}
            $scope.myClickA = function (a) {
                $("#" + a).slideToggle("fast");
            }
            ////$scope.myClickB = function () {
            //    //$(".wrapper .list").slideToggle("fast");
            //    //$("#listA").slideToggle("fast");
            //    //$("#listB").slideToggle("fast");
            //    $("#listB").slideToggle("fast");
            //    $("#listA").hide();
            //    $("#listC").hide();
            //}
            //$scope.myClickC = function () {
            //    //$(".wrapper .list").slideToggle("fast");
            //    //$("#listA").slideToggle("fast");
            //    //$("#listB").slideToggle("fast");
            //    $("#listC").slideToggle("fast");
            //    $("#listA").hide();
            //    $("#listB").hide();
            //}

            //$scope.SelectTags = function (a) {
            //    $scope.btnSaveTags = true;
            //    if (a.checked) {
            //        $scope.selectedTags.push({ TagName: a.TagName, ProjectID: a.ProjectID, TagID: a.TagID })
            //    }
            //    else {
            //        for (var i = 0; i < $scope.selectedTags.length; i++) {
            //            var obj = $scope.selectedTags[i];

            //            if (obj.TagID == a.TagID) {
            //                $scope.selectedTags.splice(i, 1);
            //                break;
            //            }
            //        }

            //        //$scope.selectedTags.splice({ TagName: a.TagName, ProjectID: a.ProjectID, TagID: a.TagID })
            //        //$scope.selectedTags.pop({ TagName: a.TagName, ProjectID: a.ProjectID, TagID: a.TagID })
            //    }

            //}
            $scope.SelectTags = function (a) {
                $scope.btnSaveTags = true;
                if (a.checked) {
                    $scope.selectedTags.push({ TagName: a.TagName, ProjectID: a.ProjectID, TagID: a.TagID })
                }
                else {
                    for (var i = 0; i < $scope.selectedTags.length; i++) {
                        var obj = $scope.selectedTags[i];

                        if (obj.TagID == a.TagID) {
                            $scope.selectedTags.splice(i, 1);
                            break;
                        }
                    }

                    //$scope.selectedTags.splice({ TagName: a.TagName, ProjectID: a.ProjectID, TagID: a.TagID })
                    //$scope.selectedTags.pop({ TagName: a.TagName, ProjectID: a.ProjectID, TagID: a.TagID })
                }

            }

            $scope.SaveTags = function () {
                var items = null;
                if ($scope.selectedTags != '') {
                    var items = $scope.selectedTags;
                    $http.post('/api/projecttags/save/' + $scope.projectID, { selectedItems: items }).then(function (response) {
                        if (response.data.status == "Success") {
                            common.logger.logSuccess("Successfully saved.");

                            $timeout(function () {
                                $location.path('/projectrequests/' + $scope.projectID);
                            }, 2000);
                        } else {
                            common.logger.logError("Failed to save");
                        }
                    });
                }
                else {
                    common.logger.logError("Please select atleast one tag");
                }
            }

            $scope.isChecked = function (a) {
                var returnValue = false;
                $scope.tagName = a.TagName;
                angular.forEach($scope.selectedTags, function (item) {
                    if ($scope.tagName == item.TagName) {
                        returnValue = true;
                        return;
                    }
                });
                return returnValue;
            }

            common.activateController([$scope.loadPage()], 'StudentsProjectsTags').then(function () {
            });
        }

    ]).controller("BadgesController", ["$scope", "$http", "$rootScope", "$location", "$route", "$timeout", "$routeParams", "common", "datacontext", "$anchorScroll",
        function ($scope, $http, $rootScope, $location, $route, $timeout, $routeParams, common, datacontext, $anchorScroll) {
            $scope.loadPage = function () {
                $http.get('/api/main/credlybadge/viewbadge').then(function (response) {
                    $scope.badgeCount = response.data.badgeCount;
                    if (response.data.result == "success") {
                        var badgesData = response.data.badgesData;
                        var json = JSON.parse(badgesData)
                        $scope.badgesJsonData = json.data;
                    }
                    else {
                        common.logger.logError("Failed: " + response.data.message);
                    }
                });
            }
            $scope.scrollTo = function (htmlTagId) {
                $location.hash(htmlTagId);
                $anchorScroll();
            };
            common.activateController([$scope.loadPage()], 'BadgesController').then(function () {
            });
        }



    ]).controller("ActionsController", ["$scope", "$http", "$rootScope", "$location", "$route", "$timeout", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $timeout, $routeParams, common, datacontext) {

            $scope.loadPage = function () {
                $http.get('/api/main/getactionsList').then(function (response) {
                    $scope.actionsList = response.data.actionsList;
                });
            }

            common.activateController([$scope.loadPage()], 'ActionsController').then(function () {
            });
        }

    ]).controller("EndorcemnetHistoryController", ["$scope", "$http", "$rootScope", "$location", "$route", "$timeout", "$routeParams", "common", "datacontext",
        function ($scope, $http, $rootScope, $location, $route, $timeout, $routeParams, common, datacontext) {
            $scope.loadPage = function () {
                //  alert('Welcome to EndorcemnetHistoryController');
                $http.get('/api/my/main/linkedinendorsementshistory/').then(function (response) {
                    $scope.endorsementshistory = response.data.endorsementshistory;
                });
            }
            common.activateController([$scope.loadPage()], 'EndorcemnetHistoryController').then(function () {
            });
        }

    ])



        .controller("LinkedInController", ["$scope", "$http", "$rootScope", "$location", "$route", "$timeout", "$routeParams", "common", "datacontext",
            function ($scope, $http, $rootScope, $location, $route, $timeout, $routeParams, common, datacontext) {

                $scope.loadPage = function () {
                    $http.get('/api/my/main/linkedinendorsementshistory/').then(function (response) {
                        $scope.endorsementshistory = response.data.endorsementshistory;
                    });

                    $scope.noramluserid = $routeParams.userid;
                    $scope.disputeduserid = $routeParams.endorseduserid;
                    $scope.isdisputed = $routeParams.isdisputed;

                    $http.post('/api/ipbc/dispute/' + $scope.noramluserid + '/' + $scope.disputeduserid + '/' + $scope.isdisputed).then(function (response) {
                        if (response.data.result == "Success") {
                            common.logger.logSuccess("Successfully Disputed.");
                        } else {
                            common.logger.logError("Failed to dispute : " + response.data.message);
                        }
                    });

                    $http.get('/api/my/main/getlinkedinlink').then(function (response) {
                        $scope.prflink = response.data.prflink;
                        $scope.profilelist = response.data.profilelist;
                        $scope.UserName = response.data.UserName;
                        $scope.Recognized = response.data.Recognized;
                        $scope.NotRecognized = response.data.NotRecognized;
                        $scope.critiqueprofilelist = response.data.cprofilelist;
                    });

                    $http.get('/api/jrp/validstudent').then(function (response) {
                        $scope.isJRPStudent = response.data.isJRPStudent;
                        $("#divLinkedInArea").css('display', 'block');
                        //if (response.data.isJRPStudent == true) {
                        //    $("#divLinkedInArea").css('display', 'block');

                        //}
                        //else {
                        //    $("#divJRPNoAccessMsg").css('display', 'block');

                        //    $("#divLinkedInArea").css('display', 'block');
                        //    $("#divLinkedInArea").css('opacity', '0.5');
                        //    $("#divLinkedInArea").css('cursor', 'not-allowed');
                        //}

                    });

                }

                $scope.openhowtodoc = function () {
                    //alert("came");
                    window.open('https://app.colaberry.com/uploads/LinkedIndoc/LinkedIn.docx', '_blank');
                }

                $scope.openLinkedInBeefUP = function () {
                    //alert("came");
                    window.open('https://app.colaberry.com/uploads/LinkedIndoc/LinkedInBeefUp.docx', '_blank');
                }

                $scope.Save = function () {
                    var str1 = $("#savetext").val();
                    var Indata1 = {
                        'link': str1
                    };
                    $http.post('/api/my/main/linkedin/', Indata1).then(function (response) {
                        $scope.prflink = $scope.linkedinpagelink;
                        if (response.data.result == "Successful") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.Edit = function () {
                    $scope.editlink = true;
                    //$('#editedtext').val("test");
                }

                $scope.Cancel = function () {
                    $scope.editlink = false;
                }

                $scope.EditSave = function () {
                    var str = $("#editedtext").val();
                    var Indata = {
                        'link': str
                    };
                    $http.post('/api/my/main/linkedinEdit/', Indata).then(function (response) {
                        $scope.prflink = $scope.linkedinpagelinkNew;
                        if (response.data.result == "Successful") {
                            $scope.editlink = false;
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.SaveAccess = function (id, LinkedInProfile) {
                    //alert("welcome to Hanwik" + id);
                    $http.post('/api/my/main/updateFriendStatus/' + id).then(function (response) {
                        if (response.data.result == "Successful") {
                            $http.get('/api/my/main/getlinkedinlink').then(function (response) {
                                $scope.prflink = response.data.prflink;
                                $scope.profilelist = response.data.profilelist;
                                $scope.UserName = response.data.UserName;
                                $scope.Recognized = response.data.Recognized;
                                $scope.NotRecognized = response.data.NotRecognized;
                                $scope.critiqueprofilelist = response.data.cprofilelist;
                                window.open(LinkedInProfile, '_blank');
                            });
                            common.logger.logSuccess("Successfully Friend requested.");
                        } else {
                            common.logger.logError("Failed to Friend request.");
                        }
                    });
                }

                $scope.ViewAccess = function (LinkedInProfile) {
                    window.open(LinkedInProfile, '_blank');
                }

                //$scope.SavePicture = function (uid) {
                //    $scope.UploadScreenShot();
                //    var postdata = { formdata: FileImage }
                //    $http.post('/api/ipbc/endorse/saveendorse/' + uid, postdata).then(function (response) {
                //        if (response.data.result === "Success") {
                //            $scope.loadPage(true);
                //            $scope.newEntry = {}
                //            common.logger.logSuccess("Successfully saved");
                //        } else {
                //            common.logger.logError("Failed to save. Try again later !");
                //        }
                //    });
                //}

                $scope.SavePicture = function (uid) {
                    debugger;
                    $scope.UploadScreenShot();
                    var postdata = { formdata: FileImage }
                    if (postdata.formdata == '') {
                        //common.logger.logError("Please select image");
                        document.getElementById("errormsg").style.display = "block";
                        document.getElementById("errormsg").style.background = "#f2dede";
                        document.getElementById("errormsg").style.color = "#a94442";
                        document.getElementById("errormsg").style.border = "#ebccd1";
                        document.getElementById("errormsg").style.padding = "10px";
                    }
                    else {
                        document.getElementById("errormsg").style.display = "none";
                        $http.post('/api/ipbc/endorse/saveendorse/' + uid, postdata).then(function (response) {
                            if (response.data.result === "Success") {
                                $scope.loadPage(true);
                                $scope.newEntry = {}
                                common.logger.logSuccess("Successfully saved");
                            } else {
                                common.logger.logError("Failed to save. Try again later !");
                            }
                        });
                    }
                }

                var FileImage = [];
                $scope.UploadScreenShot = function (uid) {
                    var fd = new FormData();
                    if (document.getElementById('Image').files[0] != null) {
                        fd.append('file', document.getElementById('Image').files[0]);
                        $.ajax({
                            url: '/api/ipbc/endorse/upload',
                            data: fd,
                            cache: false,
                            contentType: false,
                            processData: false,
                            async: false,
                            type: 'POST',
                            success: function (data) {
                                FileImage = [];
                                FileImage.push(data.filename)
                                $scope.$apply(function () {
                                    $scope.documentlink = 'http://app.colaberry.com' + data.fileURL;
                                    $scope.newEvent.DocumentLink = 'http://app.colaberry.com' + data.fileURL;
                                });
                                common.logger.logSuccess("File has been successfully uploaded.");
                            }
                        });
                    }
                }

                $scope.Removefromlist = function (uid) {
                    $http.post('/api/ipbc/removefromlist/' + uid).then(function (response) {
                        if (response.data.result === "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully removed from list");
                        } else {
                            common.logger.logError("Failed to save. Try again later !");
                        }
                    });
                }

                common.activateController([$scope.loadPage()], 'LinkedInController').then(function () {
                });
            }

        ]).controller("CritiqueController", ["$scope", "$http", "$rootScope", "$location", "$route", "$timeout", "$routeParams", "common", "datacontext",
            function ($scope, $http, $rootScope, $location, $route, $timeout, $routeParams, common, datacontext) {

                $scope.loadPage = function () {
                    $http.get('/api/my/main/getlinkedincritiquedetails').then(function (response) {
                        $scope.critiqueprofilelist = response.data.profilelist;
                    });
                }

                common.activateController([$scope.loadPage()], 'CritiqueController').then(function () {
                });
            }

        ]).controller("StudentsProjectsInstructions", ["$scope", "$rootScope", "$sce", "$routeParams", "$http", "$location", "logger", "common", "datacontext",
            function ($scope, $rootScope, $sce, $routeParams, $http, $location, logger, common, datacontext) {
                var ProjectInstructorUploadDataFile = [];
                $scope.trust = $sce.trustAsHtml;
                $scope.projectID = $routeParams.projectID;
                $scope.divSubmitDisputes = true;
                $scope.divShowDisputes = true;

                $scope.loadPage = function () {
                    $scope.requestor = 'Student'
                    $http.get("/api/projects/projectinstructions/" + $scope.requestor + '/' + $scope.projectID).then(function (response) {
                        $scope.listQuestions = response.data.listQuestions;
                        $scope.approvalLevel = response.data.approvalLevel;
                        $scope.projectDisputes = response.data.projectDisputes;
                        $scope.studentProjectDisputes = response.data.studentProjectDisputes;
                        $scope.divSubmitDisputes = response.data.isStudentsHaveandAddressedDisputes;
                        $scope.calc_TaskProgressProjectDisputes = response.data.calc_TaskProgressProjectDisputes;

                    });

                    $http.get('/api/projectinstructions/getgroups/' + $scope.projectID).then(function (response) {
                        $scope.questiongroups = response.data.questiongroups;
                    });
                }

                $scope.SaveQuestions = function () {
                    common.logger.logWarning("Please wait..its may take few seconds");
                    $scope.UploadDataFile();

                    var detailedInstructions = $('#detailedInstructions').summernote('code');
                    var insightnote = $('#insightnote').summernote('code');
                    if ($scope.PQ_Order == null) {
                        $scope.PQ_Order = 0;
                        var postdata = { insightdata: insightnote, instructions: detailedInstructions, formdata: $scope.newEntry, UploadFile3: ProjectInstructorUploadDataFile }
                        $http.post('/api/projectinstructions/savequestion/' + $scope.projectID + '/' + $scope.PQ_Order, postdata).then(function (response) {
                            if (response.data.status == "Success") {
                                common.logger.logSuccess("Successfully saved.");
                                common.logger.logWarning("Page refreshing...");
                                $scope.loadPage(true);

                            } else {
                                common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });
                    }
                    else {
                        var postdata = { insightdata: insightnote, instructions: detailedInstructions, formdata: $scope.newEntry, UploadFile3: ProjectInstructorUploadDataFile }
                        $http.post('/api/projectinstructions/savequestion/' + $scope.projectID + '/' + $scope.PQ_Order, postdata).then(function (response) {
                            if (response.data.status == "Success") {
                                $scope.loadPage(true);
                                common.logger.logSuccess("Successfully saved.");
                            } else {
                                common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });
                    }
                }

                $scope.MoveQuestion = function (question) {
                    $scope.projectID = $routeParams.projectID;
                    $scope.PQ_Order = question.PQ_Order;
                    $http.post('/api/projectinstructions/movequestion/' + $scope.projectID + '/' + $scope.PQ_Order).then(function (response) {
                        if (response.data.status == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });

                }

                $scope.copyToClipboard = function (text) {
                    var aux = document.createElement("input");
                    aux.setAttribute("value", text);
                    document.body.appendChild(aux);
                    aux.select();
                    document.execCommand("copy");
                    document.body.removeChild(aux);
                }


                $scope.DeleteQuestion = function (i) {
                    $scope.PQ_Order = i.PQ_Order;
                    var cfm = confirm("Are you sure you want to delete?");
                    if (cfm) {
                        $http.post('/api/projectinstructions/deletequestion/' + $scope.projectID + '/' + $scope.PQ_Order).then(function (response) {
                            if (response.data.status == "Success") {
                                $scope.loadPage(true);
                                common.logger.logSuccess("Successfully deleted.");
                            } else {
                                common.logger.logError("Failed to delete : " + response.data.message);
                            }
                        });
                    }
                }
                $scope.Deletedatafile = function () {
                    $scope.projectID = $routeParams.projectID;
                    $scope.PQ_TypeID = 7
                    var cfm = confirm("Are you sure you want to delete?");
                    if (cfm) {
                        $http.post('/api/projectinstructions/deletefile/' + $scope.projectID + '/' + $scope.PQ_TypeID + '/' + $scope.PQ_Order).then(function (response) {
                            if (response.data.status == "Success") {
                                $scope.loadPage(true);
                                common.logger.logSuccess("Successfully deleted.");
                            } else {
                                common.logger.logError("Failed to delete : " + response.data.message);
                            }
                        });
                    }
                }
                $scope.Deletecodefile = function () {
                    $scope.projectID = $routeParams.projectID;
                    $scope.PQ_TypeID = 6
                    var cfm = confirm("Are you sure you want to delete?");
                    if (cfm) {
                        $http.post('/api/projectinstructions/deletefile/' + $scope.projectID + '/' + $scope.PQ_TypeID + '/' + $scope.PQ_Order).then(function (response) {
                            if (response.data.status == "Success") {
                                $scope.loadPage(true);
                                common.logger.logSuccess("Successfully deleted.");
                            } else {
                                common.logger.logError("Failed to delete : " + response.data.message);
                            }
                        });
                    }
                }



                $scope.AddQuestions = function () {
                    $scope.PQ_Order = null;
                    $scope.newEntry = {}
                    $scope.divUploadedCodeText = false;
                    $scope.divUploadedScreenShot = false;
                    $scope.divUploadedDataFile = false;
                    $scope.deltecodefile = false;
                    $scope.deltedatafile = false;
                    $('#detailedInstructions').summernote('code', '');
                    $('#insightnote').summernote('code', '');

                    //ProjectInstructorUploadScreenShot = []
                    //ProjectInstructorUploadCodeText = []
                    ProjectInstructorUploadDataFile = []


                    var attachementElements = document.getElementsByClassName("file-input-name");
                    if (attachementElements[0] != null) {
                        attachementElements[0].innerHTML = ""; // Datafile
                    }

                    var input = $("#DataFile");
                    input.replaceWith(input.val('').clone(true));

                    //var attachementElements = document.getElementsByClassName("file-input-name");
                    //if (attachementElements[2] != null) {
                    //    attachementElements[2].innerHTML = ""; // Code
                    //}

                    //var input = $("#CodeText");
                    //input.replaceWith(input.val('').clone(true));
                }

                $scope.EditQuestion = function (i) {
                    $scope.divUploadedCodeText = true;
                    $scope.divUploadedScreenShot = true;
                    $scope.divUploadedDataFile = true;
                    $scope.deltecodefile = true;
                    $scope.deltedatafile = true;
                    $scope.PQ_Order = i.PQ_Order;
                    $scope.newEntry = {}
                    $scope.newEntry.StepName = i.StepName;
                    $scope.newEntry.StepOrder = i.StepOrder;
                    $('#detailedInstructions').summernote('code', i.DetailedInstructions);
                    $('#insightnote').summernote('code', i.Insight);
                    //$scope.newEntry.DetailedInstructions = i.DetailedInstructions;
                    //$scope.newEntry.Insight = i.Insight;
                    $scope.UploadedDataFile = i.DataFile;
                    //$scope.UploadedCodeText = i.CodeText;


                    //ProjectInstructorUploadCodeText = []
                    ProjectInstructorUploadDataFile = []

                    var attachementElements = document.getElementsByClassName("file-input-name");
                    if (attachementElements[0] != null) {
                        attachementElements[0].innerHTML = ""; // Datafile
                    }

                    var input = $("#DataFile");
                    input.replaceWith(input.val('').clone(true));

                    //for getting attachments filenames 
                    var dataFileUrl = i.DataFile;
                    if (dataFileUrl != '') {
                        var dataFileFilename = dataFileUrl.substring(dataFileUrl.lastIndexOf('/') + 1);
                        ProjectInstructorUploadDataFile.push(dataFileFilename);
                    }
                    else {
                        ProjectInstructorUploadDataFile = []

                        var attachementElements = document.getElementsByClassName("file-input-name");
                        if (attachementElements[0] != null) {
                            attachementElements[0].innerHTML = ""; // Datafile
                        }
                    }
                }


                $scope.ManageGroup = function () {
                    $scope.CCS_GroupID == null;
                    $scope.newEntry = {};
                }

                $scope.SaveGroups = function () {
                    if ($scope.CCS_GroupID == null) {
                        $scope.CCS_GroupID = 0;
                        var postdata = { formdata: $scope.newEntry }
                        $http.post('/api/projectinstructions/savegroups/' + $scope.projectID + '/' + $scope.CCS_GroupID, postdata).then(function (response) {
                            if (response.data.status == "Success") {
                                $scope.loadPage(true);
                                common.logger.logSuccess("Successfully saved.");
                            } else {
                                common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });
                    }
                    else {
                        var postdata = { formdata: $scope.newEntry }
                        $http.post('/api/projectinstructions/savegroups/' + $scope.projectID + '/' + $scope.CCS_GroupID, postdata).then(function (response) {
                            if (response.data.status == "Success") {
                                $scope.loadPage(true);
                                common.logger.logSuccess("Successfully saved.");
                            } else {
                                common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });
                    }
                }

                $scope.EditGroup = function (i) {
                    $scope.newEntry = {};
                    $scope.newEntry.GroupName = i.CCS_GroupName;
                    $scope.CCS_GroupID = i.CCS_GroupID;
                }

                $scope.MoveGroup = function (group) {
                    $scope.projectID = $routeParams.projectID;
                    $scope.PQ_Order = group.CCS_GroupOrder;
                    $http.post('/api/projectinstructions/movegroup/' + $scope.projectID + '/' + $scope.PQ_Order).then(function (response) {
                        if (response.data.status == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.ChangeGroup = function (selectedGroupID, pqOrderID, oldGroupID) {
                    $scope.PQ_GroupID = selectedGroupID;
                    $scope.PQ_Order = pqOrderID;
                    $scope.groupID = selectedGroupID;
                    $scope.projectID = $routeParams.projectID;
                    var postdata = { projectgroupid: $scope.groupID, oldgroupid: oldGroupID }
                    $http.post('/api/projectinstructions/changegroup/' + $scope.projectID + '/' + $scope.PQ_Order, postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.UploadDataFile = function () {
                    var fd = new FormData();
                    if (document.getElementById('DataFile').files[0] != null) {
                        fd.append('file', document.getElementById('DataFile').files[0]);
                        $.ajax({
                            url: '/api/projectinstruction/uploaddatafile',
                            data: fd,
                            cache: false,
                            contentType: false,
                            async: false,
                            processData: false,
                            type: 'POST',
                            success: function (data) {
                                if (data.result == "success") {
                                    ProjectInstructorUploadDataFile = []
                                    ProjectInstructorUploadDataFile.push(data.filename);
                                    $scope.$apply(function () {
                                        $scope.documentlink = 'http://app.colaberry.com' + data.fileURL;
                                        $scope.newEvent.DocumentLink = 'http://app.colaberry.com' + data.fileURL;
                                    });
                                    common.logger.logSuccess("File has been successfully uploaded.");
                                } else {
                                    common.logger.logError("Failed to upload. " + data.message);
                                }
                            }
                        });
                    }
                }

                $scope.GetProjectDeputesDetails = function (f, d) {
                    $scope.showplusindex_projectdeputes = f;
                    $scope.start = false;
                }

                $scope.HideProjectDeputesDetails = function (f) {
                    $scope.showplusindex_projectdeputes = -1;
                    $scope.start = false;
                }

                $scope.GetStudentProjectDeputesDetails = function (f) {
                    $scope.showplusindex_studentprojectdeputes = f;
                    $scope.start = false;
                }

                $scope.HideStudentProjectDeputesDetails = function (f) {
                    $scope.showplusindex_studentprojectdeputes = -1;
                    $scope.start = false;
                }

                $scope.GetDrilldownColor = function (index, d) {
                    if (d.CCS_PD_IsStudentAddressed == false) {
                        return { 'background-color': 'red', 'color': 'white' };
                    }
                    else if (d.CCS_PD_IsStudentAddressed == true && d.CCS_PD_isAcceptedbyAdmin == false) {
                        return { 'background-color': 'yellow', 'color': 'black' };
                    }
                    else if (d.CCS_PD_IsStudentAddressed == true && d.CCS_PD_isAcceptedbyAdmin == null) {
                        return { 'background-color': 'orange', 'color': 'white' };
                    }
                    else if (d.CCS_PD_isAcceptedbyAdmin == true) {
                        return { 'background-color': 'green', 'color': 'white' };
                    }
                }

                $scope.GetStudentDisputeDrilldownColor = function (index, sd) {
                    if (sd.CCS_PD_IsStudentAddressed == false) {
                        return { 'background-color': 'red', 'color': 'white' };
                    }
                    else if (sd.CCS_PD_IsStudentAddressed == true) {
                        return { 'background-color': 'green', 'color': 'white' };
                    }
                }

                $scope.OpenDispute = function (d) {
                    $scope.newEntry = {};
                    $scope.projectDisputeID = d.CCS_PD_ID;
                    $('#changedscreenshot').summernote('code', '');
                    $('#changedscreenshotstudentdisputes').summernote('code', '');
                }

                $scope.EditLogFix = function (d) {
                    $scope.newEntry = {};
                    $scope.projectDisputeID = d.CCS_PD_ID;

                    $scope.newEntry.Explaination = d.CCS_PD_StudentComment;
                    $('#changedscreenshotstudentdisputes').summernote('code', d.CCS_PD_ScreenshotbyStudent);
                }

                $scope.SaveStudentsDisputesLogFix = function () {
                    var screenShot = $('#changedscreenshotstudentdisputes').summernote('code');
                    var postdata = { formdata: $scope.newEntry, screenShot: screenShot }
                    $http.post('/api/projects/submitstudentdisputeslogfix/' + $scope.projectDisputeID, postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            common.logger.logSuccess("Successfully saved.");
                            $scope.loadPage(true);
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }


                $scope.SubmitDispute = function () {
                    var screenShot = $('#changedscreenshot').summernote('code');
                    var postdata = { formdata: $scope.newEntry, screenShot: screenShot }
                    $http.post('/api/projects/submitdisputebystudent/' + $scope.projectDisputeID, postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            common.logger.logSuccess("Successfully saved.");
                            $scope.loadPage(true);
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.FinalSubmitRequest = function () {
                    var approvalLevel = $scope.approvalLevel;
                    $http.post('/api/projectrequest/finalsubmitrequestapprovals/' + $scope.projectID + '/' + approvalLevel).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully submitted.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });

                }

                common.activateController([$scope.loadPage()], 'StudentsProjectsInstructions').then(function () {
                });
            }
        ]).controller("StudentsResumeCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$sanitize", "$route", "$routeParams",
            function ($scope, $rootScope, $http, $location, logger, common, datacontext, $sanitize, $route, $routeParams) {

                $scope.ISNotHaveConsultantRecord = false;
                $scope.IsNotHaveExternalNumber = false;
                $scope.IsStudentNotHaveExternalPhoneNumber = true;


                $scope.loadPage = function () {
                    $http.get('/api/students/loadresume').then(function (response) {

                        $scope.cinfo = response.data.cinfo;
                        $scope.studentExternalPhoneNumber = response.data.studentExternalPhoneNumber;

                        if ($scope.cinfo == null) {
                            $scope.ISNotHaveConsultantRecord = true;
                            $scope.UserInfo = response.data.user;
                            $scope.StatusValues = response.data.mktgterms;

                            $scope.LoadConsultantForm();
                        }
                        else {
                            if ($scope.cinfo.MktgPhone == null) {
                                $scope.UserInfo = response.data.user;
                                $scope.IsNotHaveExternalNumber = true;

                                $scope.LoadExternalNumberForm();

                            }

                            $scope.profilePercentage = response.data.profilePercentage;

                            if ($scope.profilePercentage.Value == 100) {
                                $scope.IsHaveBioInfo = true;
                            }
                            else {
                                $scope.IsHaveBioInfo = false;
                            }


                            $scope.resumes = response.data.studentresumes;
                            $scope.userdetails = response.data.userdetails;
                            $scope.logonevents = response.data.logonevents;
                            $scope.ConsultantID = $scope.cinfo.UserID;
                            $scope.isJRPStudent = response.data.isJRPStudent;

                            $scope.effratingchart.percent = Math.round($scope.cinfo.EffRating * 100);

                            $scope.showPieChart = true;
                        }
                    });
                }

                $scope.LoadConsultantForm = function () {
                    $scope.newEntry = {};

                    $scope.newEntry.FormTitle = "Add New Consultant ";
                    $scope.newEntry.FirstName = $scope.UserInfo.FirstName;
                    $scope.newEntry.LastName = $scope.UserInfo.LastName;
                    $scope.newEntry.Status = 1;
                    $scope.newEntry.MktgEmail = $scope.UserInfo.Email;
                    $scope.newEntry.PrimaryEmail = $scope.UserInfo.Email;
                    $scope.newEntry.PrimaryPhone = $scope.UserInfo.PhoneNumber;
                    $scope.newEntry.Skills = "SQL / SSIS / SSRS / PowerBI";
                    $scope.newEntry.Notes = "NA";
                    $scope.newEntry.Relocation = "Dallas, TX  / Houston, TX / Washington DC";

                    if ($scope.studentExternalNumber != '') {
                        $scope.newEntry.MktgPhone = $scope.studentExternalPhoneNumber;
                        $scope.IsStudentNotHaveExternalPhoneNumber = false;
                    }


                    //$scope.newEntry.CurrentAddress = "United States";
                    //$scope.newEntry.Availability = "ASAP";
                    //$scope.newEntry.VisaStatus = "NA";
                    //$scope.newEntry.Relocation = "Local only";
                    //$scope.newEntry.Skype = "NA";
                    //$scope.newEntry.Skills = "Not available";
                    //$scope.newEntry.BillingRate = "NA";
                    //$scope.newEntry.Notes = "External consultant added by " + $scope.UserInfo.FirstName + ".";
                    //$scope.newEntry.CanRelocate = "NO";
                    //$scope.newEntry.R2RSigned = 0;
                    //$scope.newEntry.ExternalCandidate = 1;
                }


                $scope.LoadProfileForm = function () {
                    $scope.newEntry_Profile = {};

                    $scope.newEntry_Profile.UserName = $scope.cinfo.FirstName + ' ' + $scope.cinfo.LastName;
                    $scope.newEntry_Profile.Email = $scope.cinfo.MktgEmail;
                    $scope.newEntry_Profile.PhoneNumber = $scope.studentExternalPhoneNumber;
                    $scope.newEntry_Profile.Skills = $scope.cinfo.Skills;
                    $scope.newEntry_Profile.Expires = moment().add('days', 14).format('MM/DD/YYYY');
                }

                $scope.LoadExternalNumberForm = function () {

                    $scope.newEntry_ExternalNumber = {};

                    $scope.newEntry_ExternalNumber.StudentName = $scope.UserInfo.FirstName + ' ' + $scope.UserInfo.LastName;
                    $scope.newEntry_ExternalNumber.PrimaryPhoneNumber = $scope.UserInfo.PhoneNumber;

                    var cleannumber = $scope.newEntry_ExternalNumber.PrimaryPhoneNumber;

                    if (cleannumber) {
                        cleannumber = cleannumber.replace(/[-. ()]/g, '');
                    }

                    var areacode = cleannumber.substring(0, 3);

                    if (cleannumber.length == 10)
                        cleannumber = '+1' + cleannumber;

                    if (cleannumber.length == 11)
                        cleannumber = '+' + cleannumber;

                    $scope.newEntry_ExternalNumber.PrimaryPhoneNumber = cleannumber;

                    $scope.newEntry_ExternalNumber.AreaCode = areacode;
                }

                $scope.SearchForNumbers = function () {
                    return $http.post('/api/admin/phones/getnumbers', { AreaCode: $scope.newEntry_ExternalNumber.AreaCode }).then(function (response) {
                        common.logger.logSuccess("Loaded available numbers");
                        $scope.phonenumberlist = response.data.numbers.AvailablePhoneNumbers;

                        if ($scope.phonenumberlist.length > 0) {
                            $scope.newEntry_ExternalNumber.PhoneNumber = $scope.phonenumberlist[0].PhoneNumber;
                        }
                    });
                }


                $scope.PurchaseNumber = function () {
                    $http.post('/api/student/externalphone/purchase', $scope.newEntry_ExternalNumber).then(function (response) {
                        if (response.data.status == "Success") {
                            common.logger.logSuccess("Successfully purchased and configured.");

                            if ($scope.cinfo == null) {
                                $scope.newEntry.MktgPhone = $scope.newEntry_ExternalNumber.PhoneNumber; \
                            }
                            else {
                                $scope.loadPage();
                            }

                        } else {
                            console.log(response.data.cause);
                            common.logger.logError("Failed to purchase/configure. " + response.data.cause);
                        }
                    });
                }


                $scope.SaveChanges = function () {

                    $http.post('/api/student/consultant/add', $scope.newEntry).then(function (response) {
                        if (response.data.Status == 'Success') {
                            common.logger.logSuccess("Successfully added. Please wait while refreshing the list..");
                            $scope.loadPage();
                        } else {
                            common.logger.logError("Failed to add. " + response.data.Error);
                        }
                    });
                }


                $scope.connectConsultant = function (c) {
                    $http.post('/api/customers/consultant/' + $scope.ConsultantID + '/connect').then(function (response) {
                        if (response.data.status == 'success') {
                            common.logger.logSuccess("Thank you for your interest. We will connect with the consultant shortly.");
                        } else {
                            common.logger.logError("Sorry, Failed to connect. Please contact the Colaberry representative to connect with the consultant.");
                        }
                    });
                }

                $scope.effratingchart = {
                    percent: 0,
                    options: {
                        animate: {
                            duration: 1e3,
                            enabled: !0
                        },
                        barColor: "#23AE89",
                        lineCap: "square",
                        size: 180,
                        lineWidth: 20,
                        scaleLength: 0
                    }
                }

                $scope.playRecording = function (i) {
                    var htmlstr = '<audio controls autoplay id="audioplayer-' + i.ID + '" style="width:100%;"><source src="' + i.RecordingURL + '" type="audio/mpeg"></audio>';
                    $('#audioplayer-' + i.ID).html(htmlstr);
                }

                $scope.playersizes = [{ width: 380, height: 240 }, { width: 480, height: 240 }, { width: 560, height: 380 }, { width: 640, height: 360 },
                { width: 853, height: 480 }, { width: 1130, height: 640 }, { width: 1280, height: 720 }];

                $scope.getPlayerHeight = function (width) {
                    for (var i = 0; i < 7; i++) {
                        if (width <= $scope.playersizes[i].width)
                            return $scope.playersizes[i].height;
                    }
                    return 720;
                }

                $scope.playVideo = function (v, autoplay) {
                    $scope.isPlaying = true;
                    $scope.selVideo = v;
                    $scope.videoId = v.ItemId;
                    //$scope.$apply();

                    if (!autoplay)
                        autoplay = true;

                    if (v.H264VideoPath) {

                        var playerwidth = $('#video-dashboard-header').width() * 0.90;
                        var playerheight = $scope.getPlayerHeight(playerwidth);

                        var htmlstr =
                            '<div class="embed-responsive embed-responsive-4by3">' +
                            '<iframe class="embed-responsive-item" src="//player.vimeo.com/video/' + v.H264VideoPath + '?autoplay=' + (autoplay ? '1' : '0') +
                            '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen width="' + playerwidth + '" height="' + playerheight + '"></iframe></div>';

                        $('#video-player').html(htmlstr);
                    }
                    else {
                        var playerwidth = $('#video-dashboard-header').width() * 0.90;
                        var playerheight = $scope.getPlayerHeight(playerwidth);


                        var htmlstr = '<div style="text-align:center;background:#000; margin-bottom:10px; width:100%;">';
                        htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls preload="auto" autoplay="' + (autoplay ? 'true' : 'false') +
                            '" poster="http://learn.colaberry.com/' + v.Thumbnail + '"  width="' + playerwidth + '" height="' + playerheight + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';

                        htmlstr = htmlstr + '</div>';

                        $('#video-player').html(htmlstr);

                    }
                }

                $scope.CreateResume = function () {
                    $http.post('/api/student/createresume', $scope.newEntry_Profile).then(function (response) {
                        if (response.data.status == 'Success') {
                            common.logger.logSuccess('Successfully created.');
                            $scope.loadPage();
                        } else {
                            common.logger.logError("Failed to create profile as " + response.data.cause);
                        }
                    });
                }

                $scope.RefreshPage = function () {
                    common.$broadcast("PageRefreshing");
                    $scope.loadPage();
                    common.$broadcast("PageRefreshCompleted");
                }

                common.activateController([$scope.loadPage()], 'StudentsResumeCtrl').then(function () {
                });
            }
        ]).controller("StudentsViewProfileCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$sanitize", "$route", "$routeParams",
            function ($scope, $rootScope, $http, $location, logger, common, datacontext, $sanitize, $route, $routeParams) {
                $scope.predicate = "";

                $scope.ConsultantID = $routeParams.consultantID;
                $scope.ResumeID = $routeParams.resumeID;
                $scope.IsHaveBioInfo = true;
                $scope.HavePersonalityData = true;

                function loadPageInfo(forceload) {
                    return datacontext.loadData('/api/student/' + $scope.ConsultantID + '/resume/' + $scope.ResumeID, forceload).then(function (response) {

                        $scope.profilePercentage = response.data.profilePercentage;

                        if ($scope.profilePercentage.Value == 100) {
                            $scope.IsHaveBioInfo = true;

                            $scope.cinfo = response.data.cinfo;
                            $scope.videos = response.data.videos;
                            $scope.projects = response.data.projects;
                            $scope.profile = response.data.profile;
                            $scope.accesshistory = response.data.logs;
                            $scope.lastmodified = response.lastmodified;
                            $scope.newEntry = response.data.profile;
                            $scope.indigoCount = response.data.indigoCount;
                            $scope.IsShowPersonalityGraph = response.data.IsShowPersonalityGraph;

                            if ($scope.IsShowPersonalityGraph == 1) {
                                $scope.IsShowPersonalityGraph = true;
                            }
                            else {
                                $scope.IsShowPersonalityGraph = false;
                            }

                            if ($scope.indigoCount == 0) {
                                $scope.HavePersonalityData = false;
                            }
                            else {
                                $scope.HavePersonalityData = true;
                            }
                        }
                        else {
                            $scope.IsHaveBioInfo = false;
                        }
                    });
                }


                $scope.CopyProfile = function (p) {
                    var url = p;
                    var aux = document.createElement("input");
                    aux.setAttribute("value", url);
                    document.body.appendChild(aux);
                    aux.select();
                    document.execCommand("copy");
                    document.body.removeChild(aux);
                }

                $scope.RefreshPage = function () {
                    common.$broadcast("PageRefreshing");

                }

                $scope.DeleteProfile = function () {
                    var cfm = confirm("Are you sure to delete the profile and all associated data?");
                    if (cfm) {
                        return $http.post('/api/student/' + $scope.ConsultantID + '/profile/' + $scope.ResumeID + '/delete').then(function (response) {
                            $location.path('/resume');
                        });
                    }
                }

                $scope.DeleteAccessHistory = function () {
                    var cfm = confirm("Are you sure to delete the access history?");
                    if (cfm) {
                        return $http.post('/api/student/' + $scope.ConsultantID + '/profile/' + $scope.ResumeID + '/deleteaccesshistory').then(function (response) {
                            $scope.RefreshPage();
                        });
                    }
                }

                $scope.MarkVideoAsFeatured = function (v) {
                    return $http.post('/api/customers/consultant/' + $scope.ConsultantID + '/profile/' + $scope.ProfileID + '/video/' + v.ItemId + '/featured').then(function (response) {
                        $scope.RefreshPage();
                    });
                }

                $scope.UpdateProfile = function () {
                    $http.post('/api/student/' + $scope.ConsultantID + '/profile/' + $scope.ResumeID + '/update', $scope.newEntry).then(function (response) {
                        if (response.data.status == 'Success') {
                            common.logger.logSuccess('Successfully updated.');
                        } else {
                            common.logger.logError("Failed to update profile as " + response.data.cause);
                        }
                    });
                }

                $scope.ShowPersonalityGraph = function (PersonalityGraph) {
                    $scope.ISShowPersoalityGraph = PersonalityGraph;

                    $http.post('/api/student/' + $scope.ConsultantID + '/showpersonalitygraph/' + $scope.ISShowPersoalityGraph).then(function (response) {
                        if (response.data.status == 'Success') {
                            common.logger.logSuccess('Successfully updated.');
                        } else {
                            common.logger.logError("Failed to update " + response.data.cause);
                        }
                    });


                }

                common.activateController([loadPageInfo(true)], 'StudentsViewProfileCtrl').then(function () {
                });
            }
        ]).controller("StudentsManageVideosCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$sanitize", "$route", "$routeParams",
            function ($scope, $rootScope, $http, $location, logger, common, datacontext, $sanitize, $route, $routeParams) {
                $scope.predicate = "";

                $scope.isPlaying = false;
                $scope.ConsultantID = $routeParams.consultantID;
                $scope.ResumeID = $routeParams.resumeID;

                $scope.RefreshPage = function () {
                    common.$broadcast("PageRefreshing");
                    loadPageInfo(true).then(function () {
                        common.$broadcast("PageRefreshCompleted");
                    });
                }

                $scope.updateSelection = function (q) {
                    console.log(q);
                    if (q.dirty) {
                        q.dirty = false;
                    } else {
                        q.dirty = true;
                    }
                }

                $scope.SaveChanges = function () {

                    var added = [];
                    var deleted = [];

                    for (var i in $scope.videos) {
                        if ($scope.videos[i].dirty && $scope.videos[i].selected) {
                            added.push($scope.videos[i].ItemId);
                        }
                        if ($scope.videos[i].dirty && !$scope.videos[i].selected) {
                            deleted.push($scope.videos[i].ItemId);
                        }
                    }

                    $http.post('/api/student/' + $scope.ConsultantID + '/profile/' + $scope.ResumeID + '/managevideos', { added: added, deleted: deleted }).then(function (response) {
                        if (response.data.status == 'Success') {
                            common.logger.logSuccess("Successfully saved. Please wait while refreshing the list.");
                        } else {
                            common.logger.logError("Failed to save as " + response.data.cause);
                        }
                    });
                }

                function loadPageInfo(forceload) {
                    return datacontext.loadData('/api/student/' + $scope.ConsultantID + '/profile/' + $scope.ResumeID + '/managevideos', forceload).then(function (response) {
                        $scope.cinfo = response.data.cinfo;
                        $scope.videos = response.data.videos;
                        $scope.profile = response.data.profile;
                        $scope.lastmodified = response.lastmodified;
                    });
                }

                function activate() {
                    common.activateController([loadPageInfo(true)], 'StudentsManageVideosCtrl').then(function () {
                        //common.logger.logSuccess("Successfully loaded");
                    });
                }
                activate();

                $scope.playersizes = [{ width: 380, height: 240 }, { width: 480, height: 240 }, { width: 560, height: 380 }, { width: 640, height: 360 },
                { width: 853, height: 480 }, { width: 1130, height: 640 }, { width: 1280, height: 720 }];

                $scope.getPlayerHeight = function (width) {
                    for (var i = 0; i < 7; i++) {
                        if (width <= $scope.playersizes[i].width)
                            return $scope.playersizes[i].height;
                    }
                    return 720;
                }


                $scope.playVideo = function (v) {
                    $scope.isPlaying = true;
                    $scope.selVideo = v;
                    $scope.videoId = v.ItemId;
                    $scope.rating = 0;
                    $scope.$apply();

                    //$('#video-player-clip-title').html(v.Title);
                    var htmlstr = '<div style="text-align:center;background:#000; margin-bottom:10px; width:100%;">';
                    htmlstr = htmlstr + '<video class="video-js vjs-default-skin" controls preload="auto" autoplay="true" poster="http://learn.colaberry.com/' + v.Thumbnail + '"  width="' + ($('#video-player-section').width() * 0.90) + '" height="' + $scope.getPlayerHeight($('#video-player-section').width() * .90) + '"><source src="' + v.VideoPath + '" type="video/mp4"/></video>';
                    //htmlstr = htmlstr + '<div id="UVGContainer"><embed type="application/x-shockwave-flash" src="http://learn.colaberry.com/DesktopModules/UltraVideoGallery/uvg.swf" width="' + ($('#video-player-section').width() * 0.90) + '" height="' + $scope.getPlayerHeight($('#video-player-section').width() * .90) + '" style="undefined" id="UVG" name="UVG" quality="high" autoplay="true" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="portalId=0&amp;baseUrl=http://learn.colaberry.com/DesktopModules/UltraVideoGallery/&amp;vId=' + v.ItemId + '"></div>';
                    htmlstr = htmlstr + '</div>';

                    //console.log(htmlstr);

                    $('#video-player').html(htmlstr);

                    $('#content').animate({
                        scrollTop: $("#video-player").position().top + $scope.getPlayerHeight($('#video-player-section').width()) + 50
                    }, 500);

                    //$('#video-player-modal').modal('show');

                    datacontext.loadData('/api/video/' + v.ItemId + '/comments', true).then(function (response) {
                        $scope.selVideoComments = response.data.results;
                    });
                }
            }
        ]).controller("ProjectsBioDetailsCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext",
            function ($scope, $rootScope, $http, $location, logger, common, datacontext) {

                $scope.loadPage = function () {
                    $http.get("/api/projects/biofields").then(function (response) {
                        $scope.data = response.data.data;
                        if ($scope.data.length == 0) {
                            $scope.nodata = true;
                        } else {
                            $scope.nodata = false;
                        }
                        $scope.fields = response.data.fields;
                        $scope.multiple = response.data.multiple;
                        $scope.fields.forEach(function (value, index) {

                            $scope.data.forEach(function (val, ind) {
                                if (val.CCS_BioCatID == value.CCS_BioCatID) {

                                    if (val.CCS_BioValue) {
                                        $scope.fields[index].CCS_BioFieldData = val.CCS_BioValue;
                                    }
                                }
                            })

                        });
                        console.log($scope.data);


                        $scope.isBusy = false;
                    });
                }

                $scope.filterdata = function (catid, fieldid) {

                    return catid === fieldid;

                }
                common.activateController([$scope.loadPage()], 'ProjectsBioDetailsCtrl').then(function () {
                    //common.logger.logSuccess("Successfully loaded");

                });

            }
        ]).controller("StudentsManageProjectsCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$sanitize", "$route", "$routeParams",
            function ($scope, $rootScope, $http, $location, logger, common, datacontext, $sanitize, $route, $routeParams) {

                $scope.ConsultantID = $routeParams.consultantID;
                $scope.ResumeID = $routeParams.resumeID;

                $scope.loadPage = function () {
                    $http.get('/api/student/' + $scope.ConsultantID + '/profile/' + $scope.ResumeID + '/manageprojects').then(function (response) {
                        $scope.projects = response.data.projects;
                        $scope.cinfo = response.data.cinfo;
                        $scope.profile = response.data.profile;
                        $scope.educationDetails = response.data.educationDetails;
                    });
                }

                $scope.GetProjectDetails = function (i) {
                    $scope.ProjectSummary = i.ProjectSummary;
                }


                $scope.SaveChanges = function () {
                    var added = [];
                    var deleted = [];

                    for (var i in $scope.projects) {
                        if ($scope.projects[i].IsSelected) {
                            added.push($scope.projects[i].ProjectID);
                        }
                        if (!$scope.projects[i].IsSelected) {
                            deleted.push($scope.projects[i].ProjectID);
                        }
                    }

                    $http.post('/api/student/' + $scope.ConsultantID + '/profile/' + $scope.ResumeID + '/manageprojects', { added: added, deleted: deleted }).then(function (response) {
                        if (response.data.status == 'Success') {
                            common.logger.logSuccess("Successfully saved. Please wait while refreshing the list.");
                        } else {
                            common.logger.logError("Failed to save as " + response.data.cause);
                        }
                    });
                }


                $scope.SaveEducationDetails = function () {
                    var educationDetailsAdded = [];
                    var educationDetailsDeleted = [];

                    for (var i in $scope.educationDetails) {
                        if ($scope.educationDetails[i].IsSelected) {
                            educationDetailsAdded.push($scope.educationDetails[i].CCS_BioValueID);
                        }
                        if (!$scope.educationDetails[i].IsSelected) {
                            educationDetailsDeleted.push($scope.educationDetails[i].CCS_BioValueID);
                        }
                    }

                    $http.post('/api/student/' + $scope.ConsultantID + '/profile/' + $scope.ResumeID + '/manageeducationdetails', { educationDetailsAdded: educationDetailsAdded, educationDetailsDeleted: educationDetailsDeleted }).then(function (response) {
                        if (response.data.status == 'Success') {
                            common.logger.logSuccess("Successfully saved. Please wait while refreshing the list.");
                        } else {
                            common.logger.logError("Failed to save as " + response.data.cause);
                        }
                    });
                }



                common.activateController([$scope.loadPage()], 'StudentsManageProjectsCtrl').then(function () {
                });

            }
        ]).controller("BioDashboardCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext",

            function ($scope, $rootScope, $http, $location, logger, common, datacontext) {
                $scope.IsHaveBioInfo = true;

                $scope.loadPage = function () {
                    $http.get("/api/projects/biodashboard").then(function (response) {

                        $scope.profilePercentage = response.data.profilePercentage;
                        $scope.bioName = response.data.bioName;

                        if ($scope.profilePercentage.Value == 100) {
                            $scope.IsHaveBioInfo = true;
                        }
                        else {
                            $scope.IsHaveBioInfo = false;
                        }

                        $scope.bioJobTitle = response.data.bioJobTitle;
                        $scope.bioIsFullTime = response.data.bioIsFullTime;
                        $scope.bioLocation = response.data.bioLocation;
                        $scope.bioPhone = response.data.bioPhone;
                        $scope.bioProfilePhoto = response.data.bioProfilePhoto;
                        $scope.bioEducationDetails = response.data.bioEducationDetails;
                        $scope.bioInfoForCategories = response.data.categories;
                        $scope.bioInfoForIndustries = response.data.industries;
                        $scope.bioInfoForTools = response.data.tools;
                    });

                }

                $scope.SyncBio = function () {
                    common.logger.logWarning("Please wait, its refreshing..");
                    $http.post('/api/projects/biodetails/sync').then(function (response) {
                        if (response.data.result == "Success") {
                            common.logger.logSuccess("Sucessfully refreshed");
                            $scope.loadPage(true);
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.UpdateEducationDetails = function () {
                    $http.post('/api/projects/bioeducation', $scope.newEntry_Education).then(function (response) {
                        if (response.data.result == "Success") {
                            common.logger.logSuccess("Successfully saved.");
                            $scope.loadPage(true);
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.DeleteEducationDetail = function (educationDetail) {

                    $scope.Bio_ValueID = educationDetail.CCS_BioValueID;

                    $http.post('/api/projects/bioeducation/delete/' + $scope.Bio_ValueID).then(function (response) {
                        if (response.data.result == "Success") {
                            common.logger.logSuccess("Deleted successfully.");
                            $scope.loadPage(true);
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }


                common.activateController([$scope.loadPage()], 'BioDashboardCtrl').then(function () {
                });

            }
        ]).controller("StudentProjectFinalReviewCtrl", ["$scope", "$rootScope", "$sce", "$routeParams", "$http", "$location", "logger", "common", "datacontext", "$anchorScroll",
            function ($scope, $rootScope, $sce, $routeParams, $http, $location, logger, common, datacontext, $anchorScroll) {
                $scope.trust = $sce.trustAsHtml;
                $scope.projectID = $routeParams.projectID;
                $scope.showplusindex = 0;
                $scope.DisputeID = 0;

                $scope.loadPage = function () {
                    $http.get("/api/projectrequests/getprojectdetailsforfinalreview/" + $scope.projectID).then(function (response) {
                        $scope.projectDetails = response.data.projectDetails;
                        $scope.studentName = response.data.studentName;
                        $scope.finalProjectReviewStatus = response.data.finalProjectReviewStatus;
                        $scope.projectQuestionsCount = response.data.projectQuestionsCount;

                        if ($scope.finalProjectReviewStatus == -1) {
                            $scope.btnAddComments = false;
                            $scope.btnApprovedProject = true;
                        }


                        if ($scope.finalProjectReviewStatus == 2) {
                            $scope.btnApprovedProject = false;
                            $scope.btnAddComments = false;
                        }


                        if ($scope.finalProjectReviewStatus == 1) {
                            $scope.btnAddComments = true;
                            $scope.btnApprovedProject = false;
                        }

                        $scope.LoadProjectTags();
                        $scope.LoadProjectInstructions();
                        $scope.LoadProjectDisputes();

                        if ($scope.showplusindex != 0) {
                            $scope.GetSteps($scope.showplusindex, 0) //to keep in same step after add disputes 
                        }
                        else if ($location.hash() == "divSteps") {
                            $scope.GetSteps(2, 1) // To fix the issue of -> "Next button was taking back to first step"
                        }
                        else {
                            $scope.GetSteps(1, 1) // Initial step stays expanded  
                        }
                    });
                }

                $scope.scrollTo = function (htmlTagId) {
                    $location.hash(htmlTagId);
                    $anchorScroll();
                };

                $scope.GetSteps = function (f, i) {
                    if (f == $scope.projectQuestionsCount) {
                        $scope.isNotLastStep = false;
                    }
                    else {
                        $scope.isNotLastStep = true;
                    }
                    $scope.showplusindex = f;
                    $scope.start = false;
                }

                $scope.LoadProjectTags = function () {
                    return $http.get("/api/projects/selectedtags/" + $scope.projectID).then(function (response) {
                        $scope.finaltags = response.data.finaltags;
                    });
                }

                $scope.LoadProjectInstructions = function () {
                    $scope.requestor = 'Student'
                    $http.get("/api/projects/projectinstructions/" + $scope.requestor + '/' + $scope.projectID).then(function (response) {
                        $scope.listQuestions = response.data.listQuestions;

                    });
                }

                $scope.LoadProjectDisputes = function () {
                    return $http.get("/api/projects/loaddisputescreatedbystudents/" + $scope.projectID).then(function (response) {
                        $scope.projectDisputes = response.data.disputes;
                    });
                }

                $scope.GetDrilldownColor = function (index, d) {
                    if (d.CCS_PD_IsStudentAddressed == false) {
                        return { 'background-color': 'red', 'color': 'white' };
                    }
                    else if (d.CCS_PD_IsStudentAddressed == true) {
                        return { 'background-color': 'green', 'color': 'white' };
                    }
                }


                $scope.OpenDisputeForm = function (stepName) {
                    var list = [{ Question: "Project Title" }, { Question: "Project Summary" }, { Question: "Project Picture" }, { Question: "Project Tags" }]

                    $scope.newEntry = {};
                    $http.get("/api/projects/projectquestions/" + $scope.projectID).then(function (response) {
                        $scope.steps = response.data.questions;
                        $scope.steps = $scope.steps.concat(list)
                    });

                    $scope.newEntry.Step = stepName;
                }

                $scope.EditDispute = function (d) {
                    var list = [{ Question: "Project Title" }, { Question: "Project Summary" }, { Question: "Project Picture" }, { Question: "Project Tags" }]

                    $scope.newEntry = {};
                    $http.get("/api/projects/projectquestions/" + $scope.projectID).then(function (response) {
                        $scope.steps = response.data.questions;
                        $scope.steps = $scope.steps.concat(list)
                    });

                    $scope.DisputeID = d.CCS_PD_ID;
                    $scope.newEntry.Step = d.CCS_PD_Step;
                    $scope.newEntry.Problem = d.CCS_PD_Problem;
                    $scope.newEntry.PossibleSolution = d.CCS_PD_PossibleSolution;
                    $('#screenshot').summernote('code', d.CCS_PD_Screenshot);
                }

                $scope.SaveDispute = function () {
                    var disputeID = $scope.DisputeID;
                    var screenShot = $('#screenshot').summernote('code');
                    var projectID = $scope.projectID;
                    var postdata = { projectID: projectID, formdata: $scope.newEntry, screenShot: screenShot }
                    $http.post('/api/projects/savedisputesbystudent/' + disputeID, postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            common.logger.logSuccess("Successfully saved.");
                            $scope.loadPage(true);
                            $scope.GetSteps($scope.showplusindex, 0) //to keep in same step
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.SaveDisputesLogFix = function () {
                    var screenShot = $('#changedscreenshot').summernote('code');
                    var postdata = { formdata: $scope.newEntry, screenShot: screenShot }
                    $http.post('/api/projects/submitstudentdisputeslogfix/' + $scope.projectDisputeID, postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            common.logger.logSuccess("Successfully saved.");
                            $scope.loadPage(true);
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.SubmitDisputes = function () {
                    var projectID = $scope.projectID;
                    var cfm = confirm("Are you sure you ready to submit all Disputes?");
                    if (cfm) {

                        $http.post('/api/projects/submitdisputescreatedbystudents/' + projectID).then(function (response) {
                            if (response.data.status == "Success") {
                                common.logger.logSuccess("Disputes have been submitted");
                            } else {
                                common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });
                    }
                }


                $scope.CompleteProjectbyStudent = function () {
                    var projectID = $scope.projectID;
                    var cfm = confirm("Are you sure to complete project?");
                    if (cfm) {
                        $http.post('/api/projects/critiquedprojectbystudent/' + projectID).then(function (response) {
                            if (response.data.status == "Success") {
                                common.logger.logSuccess("Project critiqued successfully .");
                                $scope.loadPage(true);
                            } else {
                                common.logger.logError("Failed to critique : " + response.data.message);
                            }
                        });
                    }
                }

                //$scope.OpenDispute = function (d) {
                //    $scope.newEntry = {};
                //    $scope.projectDisputeID = d.CCS_PD_ID;
                //    $('#changedscreenshot').summernote('code', '');
                //}

                $scope.GetProjectDeputesDetails = function (f) {
                    $scope.showplusindex_projectdeputes = f;
                }

                $scope.HideProjectDeputesDetails = function (f) {
                    $scope.showplusindex_projectdeputes = -1;
                }

                $scope.DeleteDispute = function (d) {
                    $scope.DisputeID = d.CCS_PD_ID;
                    $scope.deletedisputebystudent = 1;

                    var cfm = confirm("Are you sure you want to delete?");
                    if (cfm) {
                        $http.post('/api/projects/deletedispute/' + $scope.DisputeID + '/' + $scope.deletedisputebystudent).then(function (response) {
                            if (response.data.result == "Success") {
                                common.logger.logSuccess("Deleted successfully .");
                                $scope.loadPage(true);
                            } else {
                                common.logger.logError("Failed to delete : " + response.data.message);
                            }
                        });
                    }
                }

                $scope.AcceptProjectFinal = function () {
                    var finalReviewComment = $('#finalReviewComment').summernote('code');
                    var postdata = { Comment: finalReviewComment }
                    $http.post('/api/projectrequest/acceptfinalsubmitrequest/' + $scope.projectID, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.RejectProjectFinal = function () {
                    var finalReviewComment = $('#finalReviewComment').summernote('code');
                    var postdata = { Comment: finalReviewComment }
                    $http.post('/api/projectrequest/rejectfinalsubmitrequest/' + $scope.projectID, postdata).then(function (response) {
                        if (response.data.result == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                $scope.AddComment = function () {
                    var addCommentApproval = $('#addCommentApproval').summernote('code');

                    if (addCommentApproval != '<p><br></p>') {
                        var postdata = { Comment: addCommentApproval }
                        $http.post('/api/projectrequest/addcommentforapproval/' + $scope.projectID, postdata).then(function (response) {
                            if (response.data.result == "Success") {
                                window.location.href = '#/projectrequests'
                                $scope.loadPage(true);
                                common.logger.logSuccess("Successfully saved.");
                            } else {
                                common.logger.logError("Failed to save : " + response.data.message);
                            }
                        });
                    }
                    else {
                        common.logger.logError("Please provide comment");
                    }
                }

                common.activateController([$scope.loadPage()], 'StudentProjectFinalReviewCtrl').then(function () {
                });
            }

        ]).controller("ProjectsBioCtrl", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext",
            function ($scope, $rootScope, $http, $location, logger, common, datacontext) {


                $scope.loadPage = function () {
                    $http.get("/api/projects/biofields").then(function (response) {
                        $scope.data = response.data.data;
                        $scope.fields = response.data.fields;
                        $scope.multiple = response.data.multiple;
                        $scope.fields.forEach(function (value, index) {
                            if (value.CCS_BioFieldType === "select" && value.CCS_BioOptions) {

                                $scope.fields[index].CCS_BioOptions = value.CCS_BioOptions.split(",");

                            }
                            $scope.data.forEach(function (val, ind) {
                                if (val.CCS_BioCatID == value.CCS_BioCatID) {

                                    if (val.CCS_BioValue) {
                                        $scope.fields[index].CCS_BioFieldData = val.CCS_BioValue;
                                    }
                                }
                            })

                        });



                        $scope.isBusy = false;
                    });
                }

                $scope.filterdata = function (catid, fieldid) {

                    return catid === fieldid;

                }
                $scope.savemultiple = function (id, value) {

                    $http.post("/api/projects/savemultiple", { catid: id, catvalue: value }).then(function (response) {
                        $scope.data = response.data.data;
                    });

                }

                $scope.removeentry = function (valueid) {
                    $http.get("/api/projects/removeentry/" + valueid).then(function (response) {
                        $scope.data = response.data.data;
                    });
                }

                $scope.SaveBio = function (data) {
                    $http.post("/api/projects/savebio", { data: data }).then(function (response) {
                        if (response.data.result === "Success") {
                            common.logger.logSuccess("Successfully saved");
                        } else {
                            common.logger.logError("Failed to save Bio. Try again later !");
                        }
                    });
                    console.log(data);
                }

                common.activateController([$scope.loadPage()], 'ProjectsBioCtrl').then(function () {
                    //common.logger.logSuccess("Successfully loaded");

                });

            }
        ]).controller("AlumniAddNewJobs", ["$scope", "$rootScope", "$http", "$location", "logger", "common", "datacontext", "$window",

            function ($scope, $rootScope, $http, $location, logger, common, datacontext, $window) {

                $scope.loadPage = function () {
                    $http.get("/api/students/getalumnijobs").then(function (response) {
                        $scope.btnSignUp = 'Sign up?'
                        $scope.divSignUp = response.data.divSignUp;
                        $scope.divAlumniJobList = response.data.divAlumniJobList;

                        if ($scope.divSignUp == true) {
                            $scope.divSignUp = true;
                            $scope.divAlumniJobList = false;
                        }
                        else {
                            $scope.divSignUp = false;
                            $scope.divAlumniJobList = true;

                            $scope.start = true;
                            $scope.showplusindex = -1;

                            $scope.showplusindex_sub = -1;
                            $scope.showplusindex_Questions = -1;

                            $scope.GetAllJobsCached();
                            $scope.GetAllJobs();  //async cal
                        }
                    });
                }

                $scope.GetAllJobsCached = function () {
                    common.logger.log("Data Updating");
                    $scope.jobID = 0;
                    $scope.isAdmin = false;
                    $.ajax({
                        url: '/api/training/jobdetailscached/' + $scope.jobID + '/' + $scope.isAdmin,
                        type: 'GET',
                        async: false,
                        //data: 'query=' + query,
                        success: function (data) {
                            //alert('success');
                            $scope.jobDetails = data.jobDetails;
                        },
                        error: function () {
                            alert('error');
                        }
                    });
                }

                $scope.GetAllJobs = function () {
                    $scope.jobID = 0;
                    $scope.isAdmin = false;
                    $.ajax({
                        url: '/api/training/jobdetails/' + $scope.jobID + '/' + $scope.isAdmin,
                        type: 'GET',
                        async: true,
                        success: function (data) {
                            $scope.jobDetails = data.jobDetails;

                            document.getElementById("btnDummy").click();
                            common.logger.log("Data Updated");
                        },
                        error: function () {
                            alert('error');
                        }
                    });
                }

                $scope.SaveSignUpForm = function () {
                    $scope.btnSignUp = 'Please wait...'
                    $scope.disabledbtnSignUpReferral = true;
                    $scope.spanPlus = false;
                    $http.post('/api/referralprogram/signUpAlumniJob').then(function (response) {
                        if (response.data.status == "Successful") {
                            common.logger.logSuccess("Sign up Successfully completed.");
                            $scope.loadPage(true);
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }


                $scope.GetDetailsForSubmissions = function (f, i) {
                    $scope.jobID = i.JobID;

                    $scope.showplusindex = f;
                    $scope.start = false;
                    return $http.get('/api/training/jobdetails/' + $scope.jobID).then(function (response) {
                        $scope.jobDetailsbySub = response.data.jobDetailsbySub;
                    });
                }

                $scope.HideDetailsForSubmissions = function (f) {
                    $scope.showplusindex = -1;
                    $scope.start = false;
                }

                $scope.GetDetailsForInterviews = function (f) {
                    $scope.showplusindex_sub = f;
                    $scope.start = false;
                }

                $scope.HideDetailsForInterviews = function (f) {
                    $scope.showplusindex_sub = -1;
                    $scope.start = false;
                }

                $scope.GetInterviewQuestions = function (f) {
                    $scope.showplusindex_Questions = f;
                    $scope.start = false;
                }

                $scope.HideInterviewQuestions = function (f) {
                    $scope.showplusindex_Questions = -1;
                    $scope.start = false;
                }

                $scope.CloseJob = function (i) {
                    $scope.newEntry = i;
                    $http.post('/api/training/closedjobs', $scope.newEntry).then(function (response) {
                        if (response.data.status == "Successful") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Job closed successfully");
                        } else {
                            common.logger.logError("Failed to update : " + response.data.message);
                        }
                    });
                }

                $scope.GetReferMore = function (i) {
                    $scope.newEntry = i;
                    $scope.btnSubmitAddJobReferrals = false;
                    return $http.get('/api/sales/indeedsearch/addtojobreferrals').then(function (response) {
                        $scope.ActivityScoreChk = response.data.ActivityScoreChk;
                    });
                }

                $scope.getColor = function (i) {
                    var styleColor = 'black';
                    switch (i) {
                        case 'Tableau': styleColor = 'Blue';
                            break;
                        case 'Qlik': styleColor = 'green';
                            break;
                        case 'PowerBI': styleColor = 'Gold ';
                            break;
                    }

                    return styleColor;
                }
                $scope.SelectStudents = function () {
                    $scope.btnSubmitAddJobReferrals = true;
                    $scope.selected = [];
                    for (var i in $scope.ActivityScoreChk) {
                        var item = $scope.ActivityScoreChk[i];
                        if (item.checked) {
                            $scope.selected.push({ Email: item.email, Name: item.Consultant, Consultant: item.UserID });
                        }
                    }
                }


                $scope.selectall = function () {
                    $scope.btnSubmitAddJobReferrals = true;
                    $scope.selected = [];
                    if ($scope.allchecked) {
                        for (var i in $scope.ActivityScoreChk) {
                            $scope.ActivityScoreChk[i].checked = true;
                            var item = $scope.ActivityScoreChk[i];
                            if (item.checked) {
                                $scope.selected.push({ Email: item.email, Name: item.Consultant, Consultant: item.UserID });
                            }
                        }
                    } else {
                        for (var i in $scope.ActivityScoreChk) {
                            $scope.ActivityScoreChk[i].checked = false;
                            $scope.btnSubmitAddJobReferrals = false;
                        }
                    }
                }

                $scope.ReferMoreAndSendEmail = function () {
                    var items = null;
                    if ($scope.selected != '') {
                        var items = $scope.selected;
                    }
                    else {
                        var items = null;
                    }

                    $http.post('/api/training/referalsendemail', { selectedItems: items, JobDetails: $scope.newEntry }).then(function (response) {
                        common.logger.logSuccess("Emails have been sent.");

                    });
                }
                $scope.DownloadExcell = function (i) {
                    $scope.JobID = i.JobID;
                    $scope.SubID = i.SubID;
                    $scope.Consultant = i.Consultant;
                    $scope.InterviewType = i.InterviewType;
                    $http.get('/api/training/DownloadInterviewQuestions/' + $scope.JobID + "/" + $scope.SubID + "/" + $scope.Consultant + "/" + $scope.InterviewType).then(function (response) {
                        if (response.data.status == "Successful") {
                            common.logger.logSuccess("Downloaded successfully,please check in your downloads");
                        } else {
                            common.logger.logError("Failed to download : " + response.data.message);
                        }
                    });
                }

                $scope.OpenEmail = function (i) {
                    $scope.interviewermailSubject = "";
                    $scope.interviewermailContent = "";
                    $scope.reminderEmailSubject = "";
                    $scope.reminderContent = "";
                    $scope.RecruiterEmail = i.RecruiterEmail;
                    $scope.ConsultantEmail = i.ConsultantEmail;
                    $scope.CompanyName = i.Company;
                    $scope.RecruitingCompany = i.RecruitingCompany;
                    $scope.InterviewType = i.InterviewType;
                    $scope.reminderEmailSubject = 'Please Log ' + i.Company + ' / ' + i.RecruitingCompany + ' Interview';
                    $scope.reminderEmailContent = 'This is a friendly reminder to log your questions from your recent ' + i.InterviewType + ' with ' + i.Company + ' / ' + i.RecruitingCompany + ' <br/><br/><br/> @@Colaberry';
                    $scope.getTemplates();
                }

                $scope.SendInterviewerMessage = function () {
                    $scope.senddisabled = true;
                    $http.post('/api/training/sendEmail', { mailSubject: $scope.interviewermailSubject, mailContent: $scope.interviewermailContent, toEmail: $scope.ConsultantEmail, ccEmail: $scope.RecruiterEmail }).then(function (response) {
                        $scope.mailSubject = "";
                        $scope.mailContent = "";
                        $scope.SelectStudent = false;
                        $scope.senddisabled = false;
                        if (response.data.status == "Successful") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Email Sent");
                        } else {
                            common.logger.logError("Failed to send : " + response.data.message);
                        }
                    });
                }

                $scope.SendReminderMessage = function () {
                    $scope.senddisabled = true;
                    $http.post('/api/training/sendEmail', { mailSubject: $scope.reminderEmailSubject, mailContent: $scope.reminderEmailContent, toEmail: $scope.ConsultantEmail }).then(function (response) {
                        $scope.mailSubject = "";
                        $scope.mailContent = "";
                        $scope.SelectStudent = false;
                        $scope.senddisabled = false;
                        if (response.data.status == "Successful") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Email Sent");
                        } else {
                            common.logger.logError("Failed to send : " + response.data.message);
                        }
                    });
                }

                $scope.DiscardInterviewerMessage = function () {
                    $scope.interviewermailSubject = "";
                    $scope.interviewermailContent = "";
                }

                $scope.getTemplates = function () {
                    return $http.get('/api/mail/templates').then(function (response) {
                        $scope.globaltemplates = response.data.globaltemplates;
                        $scope.usertemplates = response.data.usertemplates;
                    });
                }

                $scope.chooseTemplateInterviewer = function (t) {
                    $scope.selTemplate = t;
                    $scope.interviewermailSubject = t.Subject;
                    $scope.interviewermailContent = t.Content;
                }

                $scope.SaveAsNewTemplateInterviewer = function () {
                    $http.post('/api/mail/templates/add', { mailSubject: $scope.interviewermailSubject, mailContent: $scope.interviewermailContent }).then(function (response) {
                        $scope.globaltemplates = response.data.globaltemplates;
                        $scope.usertemplates = response.data.usertemplates;
                        common.logger.logSuccess("Successfully added.");
                    });
                }

                $scope.SaveTemplateInterviewer = function () {
                    $http.post('/api/mail/template/' + $scope.selTemplate.ID + '/save', { Scope: $scope.selTemplate.Scope, mailSubject: $scope.interviewermailSubject, mailContent: $scope.interviewermailContent }).then(function (response) {
                        if (response.data.result == 'Success') {
                            $scope.globaltemplates = response.data.globaltemplates;
                            $scope.usertemplates = response.data.usertemplates;
                            common.logger.logSuccess("Successfully saved.");
                        }
                        else {
                            common.logger.logError(response.data.message);
                        }
                    });
                }

                $scope.DiscardReminder = function () {
                    $scope.reminderEmailSubject = "";
                    $scope.reminderContent = "";
                }

                $scope.chooseTemplateReminder = function (t) {
                    $scope.selTemplate = t;
                    $scope.reminderEmailSubject = t.Subject;
                    $scope.reminderContent = t.Content;
                }

                $scope.SaveAsNewTemplateReminder = function () {
                    $http.post('/api/mail/templates/add', { mailSubject: $scope.reminderEmailSubject, mailContent: $scope.reminderContent }).then(function (response) {
                        $scope.globaltemplates = response.data.globaltemplates;
                        $scope.usertemplates = response.data.usertemplates;
                        common.logger.logSuccess("Successfully added.");
                    });
                }

                $scope.SaveTemplateReminder = function () {
                    $http.post('/api/mail/template/' + $scope.selTemplate.ID + '/save', { Scope: $scope.selTemplate.Scope, mailSubject: $scope.reminderEmailSubject, mailContent: $scope.reminderContent }).then(function (response) {
                        if (response.data.result == 'Success') {
                            $scope.globaltemplates = response.data.globaltemplates;
                            $scope.usertemplates = response.data.usertemplates;
                            common.logger.logSuccess("Successfully saved.");
                        }
                        else {
                            common.logger.logError(response.data.message);
                        }
                    });
                }

                $scope.DeleteTemplate = function () {
                    if ($window.confirm("Are you Confirm to delete?")) {
                        $scope.result = "Yes";
                    } else {
                        $scope.result = "NO";
                    }
                    if ($scope.result == "Yes") {
                        $http.post('/api/mail/template/' + $scope.selTemplate.ID + '/delete').then(function (response) {
                            if (response.data.result == 'Success') {
                                $scope.globaltemplates = response.data.globaltemplates;
                                $scope.usertemplates = response.data.usertemplates;
                                common.logger.logSuccess("Successfully Deleted.");
                                $scope.mailSubject = "";
                                $scope.mailContent = "";
                            }
                            else {
                                common.logger.logError(response.data.message);
                            }
                        });
                    }
                }

                $scope.PromoteTemplate = function () {
                    $http.post('/api/mail/template/' + $scope.selTemplate.ID + '/promote').then(function (response) {
                        if (response.data.result == 'Success') {
                            $scope.globaltemplates = response.data.globaltemplates;
                            $scope.usertemplates = response.data.usertemplates;
                            common.logger.logSuccess("Successfully promoted.");
                        }
                        else {
                            common.logger.logError(response.data.message);
                        }
                    });
                }

                $scope.AddJob = function () {
                    var postdata = { formdata: $scope.newEntry }
                    $http.post('/api/alumnijob/save', postdata).then(function (response) {
                        if (response.data.status == "Success") {
                            $scope.loadPage(true);
                            common.logger.logSuccess("Successfully saved.");
                        } else {
                            common.logger.logError("Failed to save : " + response.data.message);
                        }
                    });
                }

                //To get Recruiter title, name
                $scope.Refresh = function () {
                    $scope.RecruiterTitle = $scope.newEntry.RecruiterTitle;
                    $scope.RecruiterName = $scope.newEntry.RecruiterName;
                }

                $scope.OpenJobForm = function () {
                    $scope.newEntry = '';
                }

                $scope.currentPage = 0;
                $scope.pageSize = 20;
                $scope.jobDetails = [];
                for (var i = 0; i < $scope.jobDetails; i++) {
                    $scope.jobDetails.push("i" + i);
                }


                common.activateController([$scope.loadPage()], 'AlumniAddNewJobs').then(function () {
                });

            }
        ]).filter('myfilter2', function () {
            return function (input, groupCode) {
                if (groupCode == 'undefined' || groupCode == null) {
                    return input;
                }
                var out = [];
                angular.forEach(input, function (list) {
                    switch (groupCode) {
                        case "S":
                            if (list.Submissions > 0) {
                                out.push(list)
                            }
                            break;
                        case "RS":
                            if (list.RecruiterScreenings > 0) {
                                out.push(list)
                            }
                            break;
                        case "CS":
                            if (list.ClientScreenings > 0) {
                                out.push(list)
                            }
                            break;
                        case "F2F":
                            if (list.F2FInterview > 0) {
                                out.push(list)
                            }
                            break;
                        case "VerbalOffers":
                            if (list.VerbalOffers > 0) {
                                out.push(list)
                            }
                            break;
                        default:
                            break;
                    }
                })

                return out;
            }
        }).filter('myfilter', function () {

            return function (list, querystr) {
                if (querystr.length > 0) {
                    $scope.currentPage = 0;
                    $scope.pageSize = list.length;
                }
                //alert(querystr);
                //return input;
                //var xx = list.filter(a=>a.contains(querystr));
                //list.forEach(function (item) {

                //})
                //return xx;
                return list;
            }
        }).filter('startFrom', function () {
            return function (input, start) {
                debugger;
                start = +start;
                return input.slice(start);
            }
        }).filter('round', function () {
            return function (value, mult, dir) {
                dir = dir || 'nearest';
                mult = mult || 1;
                value = !value ? 0 : Number(value);
                if (dir === 'up') {
                    return Math.ceil(value / mult) * mult;
                } else if (dir === 'down') {
                    return Math.floor(value / mult) * mult;
                } else {
                    return Math.round(value / mult) * mult;
                }
            };
        }).filter('groupBy', function () {
            return function (list, group_by) {
                //debugger;
                var filtered = [];
                var prev_item = null;
                var group_changed = false;
                // this is a new field which is added to each item where we append "_CHANGED"
                // to indicate a field change in the list
                var new_field = group_by + '_CHANGED';
                var new_field1 = group_by + '_CHANGED';

                // loop through each item in the list
                angular.forEach(list, function (item) {

                    group_changed = false;

                    // if not the first item
                    if (prev_item !== null) {

                        // check if the group by field changed
                        if (prev_item[group_by] != item[group_by]) {
                            group_changed = true;
                        }

                        // otherwise we have the first item in the list which is new
                    } else {
                        group_changed = true;
                    }

                    // if the group changed, then add a new field to the item
                    // to indicate this
                    if (group_changed) {
                        item[new_field] = true;
                    } else {
                        item[new_field] = false;
                    }

                    filtered.push(item);
                    prev_item = item;

                });

                return filtered;
            };
        }).filter('groupBy1', function () {
            return function (list, group_by1) {
                var filtered = [];
                var prev_item = null;
                var group_changed = false;
                // this is a new field which is added to each item where we append "_CHANGED"
                // to indicate a field change in the list
                var new_field = group_by1 + '_CHANGED';

                // loop through each item in the list
                angular.forEach(list, function (item) {

                    group_changed = false;

                    // if not the first item
                    if (prev_item !== null) {
                        // check if the group by field changed
                        if (prev_item[group_by1] != item[group_by1]) {
                            group_changed = true;
                        }

                        // otherwise we have the first item in the list which is new
                    } else {
                        group_changed = true;
                    }

                    // if the group changed, then add a new field to the item
                    // to indicate this
                    if (group_changed) {
                        item[new_field] = true;
                    } else {
                        item[new_field] = false;
                    }

                    filtered.push(item);
                    prev_item = item;

                });

                return filtered;
            };
        }).filter('groupBy2', function () {
            return function (list, group_by2) {
                var prevItem = "";
                var groupItem = "";
                var filtered = [];
                var prev_item = null;
                var group_changed = false;
                // this is a new field which is added to each item where we append "_CHANGED"
                // to indicate a field change in the list
                var new_field = group_by2 + '_CHANGED';

                // loop through each item in the list
                angular.forEach(list, function (item) {


                    group_changed = false;

                    // if not the first item
                    if (prev_item !== null) {
                        //debugger;
                        // check if the group by field changed
                        prevItem = prev_item["Consultant"] + "-" + prev_item["InterviewType"];
                        groupItem = item["Consultant"] + "-" + item["InterviewType"];
                        //debugger;

                        //if (item["InterviewType"] == null)
                        //{
                        //    group_changed = false;
                        //    return;
                        //}

                        //if (prev_item[group_by2] != item[group_by2]) {
                        if (prevItem != groupItem) {
                            group_changed = true;
                        }

                        // otherwise we have the first item in the list which is new
                    } else {
                        group_changed = true;
                    }

                    // if the group changed, then add a new field to the item
                    // to indicate this
                    if (group_changed) {
                        item[new_field] = true;
                    } else {
                        item[new_field] = false;
                    }

                    filtered.push(item);
                    prev_item = item;

                });

                return filtered;
            };

        }).filter('avgByKey', function () {
            return function (data, key) {

                // $scope.myMessage = "Great!";
                if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                    return 0;
                }

                var sum = 0;
                for (var i = data.length - 1; i >= 0; i--) {
                    sum += parseInt(data[i][key]);
                }
                //$scope.avgInterviewScore = sum / data.length;
                return sum / data.length;
            };
        }).filter('countInterviewType', function () {
            return function (data, key) {

                if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                    return 0;
                }

                var cnt = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["InterviewType"] == key) {
                        //alert("matching")
                        cnt = cnt + 1;
                    }
                }
                return cnt;
            };
        }).directive("dynamicName", function ($compile) {
            return {
                restrict: "A",
                terminal: true,
                priority: 1000,
                link: function (scope, element, attrs) {

                    element.attr('name', scope.$eval(attrs.dynamicName));
                    element.removeAttr("dynamic-name");
                    $compile(element)(scope);
                }
            }
        }).filter('time', function () {
            return function (input, from, to, interval) {
                from = parseInt(from, 10);
                to = parseInt(to, 10);
                interval = parseInt(interval, 10);

                for (var i = from, y = 0; i <= to; ++i, y += interval) {
                    for (var y = 0; y < 60; y += interval) {
                        input.push(((i % 12) || 12) + ":" + (y === 0 ? '00' : y) + " " + (i > 12 ? 'pm' : 'am'));
                    }
                }

                return input;
            };
        })
})();