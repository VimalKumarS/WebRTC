/**
 * Created by vimalkumar on 3/6/2016.
 */
navigator.getWebcam=(navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia
)

var peer=new Peer({
    key:"oeh52typ8rnklnmi",
    debug:3,
    config:{'iceServers':[
        {url:'stun:stun.l.google.com:19302'},
        {url:'stun:stun1.l.google.com:19302'},
        {url:'turn:numb.viagenie.ca' ,username:"vimal.kumar@sjsu.edu",credential:"007Shiva"}
    ]}
});

peer.on('open',function(){
    $("#my-id").text(peer.id);
})

peer.on('call',function(call){
    call.answer(window.localStream)
    step3(call)
})

$(function(){
    $('#make-call').click(function(){
        var call= peer.call($('#call-toid').val(),window.localStream)
        step3(call);
    })
    step1();
})

function step1(){
    navigator.getWebcam({
        audio:false,video:true
    },function(stream){
        $("#my-video").prop("src",URL.createObjectURL(stream));
        window.localStream=stream;
        //step2();
    },function(){
        //show error
        concole.log("error")
    })
}

function step3(call){
    if(window.existingCall){
        window.existingCall.close();
    }
    call.on('stream',function(stream){
        $("#their-video").prop("src",URL.createObjectURL(stream));
    })
}