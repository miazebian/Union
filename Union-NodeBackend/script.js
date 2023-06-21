// Creating instance of Metered Javascript SDK
const meeting = new Metered.Meeting();
// Creating a Global variable to store the Meeting ID
let meetingId = "";

$("#joinExistingMeeting").on("click", async function (e) {
    if (e) e.preventDefault();

    meetingId = $("#meetingId").val();
    if (!meetingId) {
        return alert("Please enter meeting id");
    }

    // Sending request to validate meeting id
    try {
        const response = await axios.get(
            "/validate-meeting?meetingId=" + meetingId
        );
        if (response.data.success) {
            // Meeting id is valid, taking the user to the waiting area.
            $("#joinView").addClass("hidden");
            $("#waitingArea").removeClass("hidden");
            $("#displayMeetingId").text(meetingId);
            $("#meetingIdContainer").removeClass("hidden");
            initializeWaitingArea();
        } else {
            alert("meeting id is invalid");
        }
    } catch (ex) {
        alert("meeting Id is invalid");
    }
});

$("#createANewMeeting").on("click", async function (e) {
    if (e) e.preventDefault();

    // Sending request to create a new meeting room
    try {
        const response = await axios.post("/create-meeting-room");
        if (response.data.success) {
            $("#joinView").addClass("hidden");
            $("#waitingArea").removeClass("hidden");
            $("#displayMeetingId").text(response.data.roomName);
            $("#meetingIdContainer").removeClass("hidden");
            meetingId = response.data.roomName;
            initializeWaitingArea();
        }
    } catch (ex) {
        alert("Error occurred when creating a new meeting");
    }
});
var videoUnavailable = true;
var audioUnavailable = true;
async function initializeWaitingArea() {
    let audioOutputDevices = [];
    try {
        audioOutputDevices = await meeting.listAudioOutputDevices();
    } catch (ex) {
        console.log("option not available - it is unsupported in firefox", ex);
    }

    let audioInputDevices = [];
    try {
        audioInputDevices = await meeting.listAudioInputDevices();
    } catch (ex) {
        console.log("camera not available or have disabled camera access", ex);
        audioUnavailable = true;
        // Disabling the camera button
        $("#waitingAreaMicrophoneButton").attr("disabled", true);
    }

    let videoInputDevices = [];
    try {
        videoInputDevices = await meeting.listVideoInputDevices();
    } catch (ex) {
        console.log("camera not available or have disabled camera access", ex);
        videoUnavailable = true;
        // Disabling the camera button
        $("#waitingAreaCameraButton").attr("disabled", true);
    }

    let cameraOptions = [];
    for (let device of videoInputDevices) {
        cameraOptions.push(
            `<option value="${device.deviceId}">${device.label}</option>`
        );
    }
    let microphoneOptions = [];
    for (let device of audioInputDevices) {
        microphoneOptions.push(
            `<option value="${device.deviceId}">${device.label}</option>`
        );
    }
    let speakerOptions = [];
    for (let device of audioOutputDevices) {
        speakerOptions.push(
            `<option value="${device.deviceId}">${device.label}</option>`
        );
    }

    $("#cameras").html(cameraOptions.join(""));
    $("#microphones").html(microphoneOptions.join(""));
    $("#speakers").html(speakerOptions.join(""));

    // Selecting different camera
    $("#cameras").on("change", async function (value) {
        const deviceId = $("#cameras").val();
        console.log(deviceId);
        await meeting.chooseVideoInputDevice(deviceId);
    });

    // Setting different microphone
    $("#microphones").on("change", async function (value) {
        const deviceId = $("#microphones").val();
        await meeting.chooseAudioInputDevice(deviceId);
    });

    // Setting different speaker
    $("#speakers").on("change", async function (value) {
        const deviceId = $("#speakers").val();
        await meeting.chooseAudioOutputDevice(deviceId);
    });
}

/**
 * Adding click events to buttons in waiting area
 */
let microphoneOn = false;
$("#waitingAreaMicrophoneButton").on("click", function () {
    if (microphoneOn) {
        $("#waitingAreaMicrophoneButton").removeClass("bg-accent");
        microphoneOn = false;
    } else {
        microphoneOn = true;
        $("#waitingAreaMicrophoneButton").addClass("bg-accent");
    }
});

let cameraOn = false;
let localVideoStream = null;
$("#waitingAreaCameraButton").on("click", async function () {
    if (cameraOn) {
        cameraOn = false;
        $("#waitingAreaCameraButton").removeClass("bg-accent");
        const tracks = localVideoStream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        localVideoStream = null;
        $("#waitingAreaVideoTag")[0].srcObject = null;
    } else {
        try {
            $("#waitingAreaCameraButton").addClass("bg-accent");
            localVideoStream = await meeting.getLocalVideoStream();
            $("#waitingAreaVideoTag")[0].srcObject = localVideoStream;
            cameraOn = true;
        } catch (ex) {
            $("#waitingAreaCameraButton").removeClass("bg-accent");
            console.log("Error occurred when trying to acquire video stream", ex);
            $("#waitingAreaCameraButton").attr("disabled", true);
        }
    }
});

let meetingInfo = {};
$("#joinMeetingButton").on("click", async function () {
    var username = $("#username").val();
    if (!username) {
        return alert("Please enter a username");
    }

    try {
        console.log(meetingId);

        const {
            data
        } = await axios.get("/metered-domain");
        console.log(data.domain);

        meetingInfo = await meeting.join({
            roomURL: `${data.domain}/${meetingId}`,
            name: username,
        });
        console.log("Meeting joined", meetingInfo);
        $("#waitingArea").addClass("hidden");
        $("#meetingView").removeClass("hidden");
        $("#meetingAreaUsername").text(username);
        if (cameraOn) {
            $("#meetingViewCamera").addClass("bg-accent");
            if (localVideoStream) {
                const tracks = localVideoStream.getTracks();
                tracks.forEach(function (track) {
                    track.stop();
                });
                localVideoStream = null;
            }
            await meeting.startVideo();
        }

        if (microphoneOn) {
            $("#meetingViewMicrophone").addClass("bg-accent");
            await meeting.startAudio();
        }
    } catch (ex) {
        console.log("Error occurred when joining the meeting", ex);
    }
    let videoInputDevices = [];
    try {
        videoInputDevices = await meeting.listVideoInputDevices();
    } catch (ex) {
        console.log("camera not available or have disabled camera access", ex);
        videoUnavailable = true;
        // Disabling the camera button
        $("#waitingAreaCameraButton").attr("disabled", true);
    }

    let cameraOptions = [];
    for (let device of videoInputDevices) {
        cameraOptions.push(
            `<option value="${device.deviceId}">${device.label}</option>`
        );
    }
    $("#cameras").html(cameraOptions.join(""));
    $("#cameras").on("change", async function (value) {
        const deviceId = $("#cameras").val();
        console.log(deviceId);
        await meeting.chooseVideoInputDevice(deviceId);
    });
    let audioInputDevices = [];
    try {
        audioInputDevices = await meeting.listAudioInputDevices();
    } catch (ex) {
        console.log("camera not available or have disabled camera access", ex);
        audioUnavailable = true;
        // Disabling the camera button
        $("#waitingAreaMicrophoneButton").attr("disabled", true);
    }

    let microphoneOptions = [];
    for (let device of audioInputDevices) {
        microphoneOptions.push(
            `<option value="${device.deviceId}">${device.label}</option>`
        );
    }
    $("#microphones").html(microphoneOptions.join(""));
    $("#microphones").on("change", async function (value) {
        const deviceId = $("#microphones").val();
        await meeting.chooseAudioInputDevice(deviceId);
    });
    let audioOutputDevices = [];
    try {
        audioOutputDevices = await meeting.listAudioOutputDevices();
    } catch (ex) {
        console.log("option not available - it is unsupported in firefox", ex);
    }
    let speakerOptions = [];
    for (let device of audioOutputDevices) {
        speakerOptions.push(
            `<option value="${device.deviceId}">${device.label}</option>`
        );
    }
    $("#speakers").html(speakerOptions.join(""));
    $("#speakers").on("change", async function (value) {
        const deviceId = $("#speakers").val();
        await meeting.chooseAudioOutputDevice(deviceId);
    });
    let microphoneOn = false;
    $("#waitingAreaMicrophoneButton").on("click", function () {
        if (microphoneOn) {
            $("#waitingAreaMicrophoneButton").removeClass("bg-accent");
            microphoneOn = false;
        } else {
            microphoneOn = true;
            $("#waitingAreaMicrophoneButton").addClass("bg-accent");
        }
    });
    let cameraOn = false;
    let localVideoStream = null;
    $("#waitingAreaCameraButton").on("click", async function () {
        if (cameraOn) {
            cameraOn = false;
            $("#waitingAreaCameraButton").removeClass("bg-accent");
            const tracks = localVideoStream.getTracks();
            tracks.forEach(function (track) {
                track.stop();
            });
            localVideoStream = null;
            $("#waitingAreaVideoTag")[0].srcObject = null;
        } else {
            try {
                $("#waitingAreaCameraButton").addClass("bg-accent");
                localVideoStream = await meeting.getLocalVideoStream();
                $("#waitingAreaVideoTag")[0].srcObject = localVideoStream;
                cameraOn = true;
            } catch (ex) {
                $("#waitingAreaCameraButton").removeClass("bg-accent");
                console.log("Error occurred when trying to acquire video stream", ex);
                $("#waitingAreaCameraButton").attr("disabled", true);
            }
        }
    });
    localVideoStream = await meeting.getLocalVideoStream();
    $("#waitingAreaVideoTag")[0].srcObject = localVideoStream;
    cameraOn = true;
    const tracks = localVideoStream.getTracks();
    tracks.forEach(function (track) {
        track.stop();
    });
    localVideoStream = null;
    $("#waitingAreaVideoTag")[0].srcObject = null;
    let meetingInfo = {};
    $("#joinMeetingButton").on("click", async function () {
        var username = $("#username").val();
        if (!username) {
            return alert("Please enter a username");
        }

        try {
            console.log(meetingId);

            // Fetching our Metered Domain e.g: videoapp.metered.live
            // that we have added in the .env/config.js file in backend

            const {
                data
            } = await axios.get("/metered-domain");
            console.log(data.domain);
            // Calling the Join Method of the Metered SDK
            meetingInfo = await meeting.join({
                roomURL: `${data.domain}/${meetingId}`,
                name: username,
            });
            console.log("Meeting joined", meetingInfo);
            $("#waitingArea").addClass("hidden");
            $("#meetingView").removeClass("hidden");
            $("#meetingAreaUsername").text(username);
            if (cameraOn) {
                $("#meetingViewCamera").addClass("bg-accent");
                if (localVideoStream) {
                    const tracks = localVideoStream.getTracks();
                    tracks.forEach(function (track) {
                        track.stop();
                    });
                    localVideoStream = null;
                }
                await meeting.startVideo();
            }

            if (microphoneOn) {
                $("#meetingViewMicrophone").addClass("bg-accent");
                await meeting.startAudio();
            }
        } catch (ex) {
            console.log("Error occurred when joining the meeting", ex);
        }
    });
    meeting.on("localTrackStarted", function (trackItem) {
        if (trackItem.type === "video") {
            let track = trackItem.track;
            let mediaStream = new MediaStream([track]);
            $("#meetingAreaLocalVideo")[0].srcObject = mediaStream;
            $("#meetingAreaLocalVideo")[0].play();
        }
    });
    meeting.on("localTrackUpdated", function (trackItem) {
        if (trackItem.type === "video") {
            let track = trackItem.track;
            let mediaStream = new MediaStream([track]);
            $("#meetingAreaLocalVideo")[0].srcObject = mediaStream;
        }
    });
    meeting.on("localTrackStopped", function (localTrackItem) {
        if (localTrackItem.type === "video") {
            $("#meetingAreaLocalVideo")[0].srcObject = null;
        }
    });
    eeting.on("participantJoined", function (participantInfo) {
        // This event is emitted for all the users, even for the current user,
        // so we want ignore if it is the current user.
        if (participantInfo._id === meeting.participantSessionId) return;

        // Creating a div with video, audio and a div tag to show username
        // Giving the div tag id of the participant so that it is easy for us to remove the tag
        // when the participant leaves the meeting.
        var participant = `<div id="participant-${participantInfo._id}" class="bg-base-300">
              <video id="participant-${participantInfo._id}-video" muted autoplay playsinline
                  style="padding: 0; margin: 0; width: 150px; height: 100px;"></video>
              <audio id="participant-${participantInfo._id}-audio" autoplay playsinline
                  style="padding: 0; margin: 0;"></audio>
              <div id="participant-${participantInfo._id}-username" class="bg-base-300    " style=" text-align: center;">
                  ${participantInfo.name}
              </div>
          </div>`;
        // Adding the HTML to our remoteParticipantContainer
        $("#remoteParticipantContainer").append(participant);
    });
    meeting.on("participantLeft", function (participantInfo) {
        console.log("participant has left the room", participantInfo);
        $(`#participant-${participantInfo._id}`).remove();
    });
    meeting.on("onlineParticipants", function (onlineParticipants) {
        $("#remoteParticipantContainer").html("");
        for (let participantInfo of onlineParticipants) {
            if (participantInfo._id !== meeting.participantSessionId) {
                var participant = `<div id="participant-${participantInfo._id}" class="bg-base-300">
                      <video id="participant-${participantInfo._id}-video" muted autoplay playsinline
                          style="padding: 0; margin: 0; width: 150px; height: 100px;"></video>
                      <audio id="participant-${participantInfo._id}-audio" autoplay playsinline
                          style="padding: 0; margin: 0;"></audio>
                      <div id="participant-${participantInfo._id}-username" class="bg-base-300    " style=" text-align: center;">
                          ${participantInfo.name}
                      </div>
                  </div>`;
                $("#remoteParticipantContainer").append(participant);
            }
        }
    });
    meeting.on("remoteTrackStarted", function (trackItem) {
        if (trackItem.participantSessionId === meeting.participantSessionId) return;
        var track = trackItem.track;
        var mediaStream = new MediaStream([track]);
        $(
            `#participant-${trackItem.participantSessionId}-${trackItem.type}`
        )[0].srcObject = mediaStream;
        $(
            `#participant-${trackItem.participantSessionId}-${trackItem.type}`
        )[0].play();
    });

    meeting.on("remoteTrackStopped", function (trackItem) {
        if (trackItem.participantSessionId === meeting.participantSessionId) return;
        $(
            `#participant-${trackItem.participantSessionId}-${trackItem.type}`
        )[0].srcObject = null;
    });
    var currentActiveSpeaker = "";
    meeting.on("activeSpeaker", function (activeSpeaker) {
        if (currentActiveSpeaker === activeSpeaker.participantSessionId) return;

        $("#activeSpeakerUsername").text(activeSpeaker.name);
        currentActiveSpeaker = activeSpeaker.participantSessionId;
        if ($(`#participant-${activeSpeaker.participantSessionId}-video`)[0]) {
            let stream = $(
                `#participant-${activeSpeaker.participantSessionId}-video`
            )[0].srcObject;
            $("#activeSpeakerVideo")[0].srcObject = stream.clone();
        }

        if (activeSpeaker.participantSessionId === meeting.participantSessionId) {
            let stream = $(`#meetingAreaLocalVideo`)[0].srcObject;
            if (stream) {
                $("#activeSpeakerVideo")[0].srcObject = stream.clone();
            }
        }
    });
    $("#meetingViewLeave").on("click", async function () {
        await meeting.leaveMeeting();
        $("#meetingView").addClass("hidden");
        $("#leaveView").removeClass("hidden");
    });
});