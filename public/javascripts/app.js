

var socket = io();
socket.emit('dbusConnect', "dbusConnect");


socket.on("conn", data => {
})
socket.on("error1", m => {
    console.log(m)
})
socket.on("stdout", m => {
    console.log(m)
    editor_log.replaceSelection(m)
})
socket.on("stderr", error => {
    console.log(error)
})
socket.on("sensors", data => {
    if (data) {
        $(".connect_btn").hide();
        $(".disconnect_btn").show();
        $(".disconnect_btn").prop('disabled', false);
        updateSensors(data)
    }
})
socket.on("kill_error", m=>{
    console.log(m)
});
socket.on("kill_done", m=>{
    socket.emit("motor", { left: 0, right: 0 });
    $("#kill").prop('disabled', true);
    $("#run").prop('disabled', false);
});

$(document).ready(() => {
    $(".connect_btn").click(e => {
        e.preventDefault();
        $(".connect_loader").show()
        $("#res").attr('class', '');
        socket.emit("con", "con")
    })
    $(".disconnect_btn").click(e => {
        socket.emit("dis", "dis")
        $(".connect_btn").show(500)
        $(".disconnect_btn").hide(500)

    });
    socket.on("channels", data=>{
        $(".connect_btn").hide(500)
        $(".disconnect_btn").show(500)
        updateChannels(data)
    })
})
socket.on("channels", data=>{
    $(".connect_btn").hide(500)
    $(".disconnect_btn").show(500)
    updateChannels(data)
})

function updateChannels(data) {
    $("#channel0").css("width", `${data.channel0 * 100 / 1023}%`).html(data.channel0);
    $("#channel1").css("width", `${data.channel1 * 100 / 1023}%`).html(data.channel1);
    $("#channel2").css("width", `${data.channel2 * 100 / 1023}%`).html(data.channel2);
    $("#channel3").css("width", `${data.channel3 * 100 / 1023}%`).html(data.channel3);
    $("#channel4").css("width", `${data.channel4 * 100 / 1023}%`).html(data.channel4);
    $("#channel5").css("width", `${data.channel5 * 100 / 1023}%`).html(data.channel5);
    $("#channel6").css("width", `${data.channel6 * 100 / 1023}%`).html(data.channel6);
    $("#channel7").css("width", `${data.channel7 * 100 / 1023}%`).html(data.channel7);
}



