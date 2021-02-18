/* WiFi_Widget was created by Julián Medina 09/02/21 */

let wifiwidget = {
    colors: {
        noSignal: "#9B9B9B",
        signal: "#404040",
        lock: '#404040',
        down: "#fff",
        eye : '#aaa'
    },

    labels: {
        ConnectTo: "Connect to",
        Password: "Password",
        ShowPassword: "Show password",
        ConnectButton: "Connect",
        ManualSSID: "Manual SSID",
        SSID: "Network name"
    }
}


function renderWiFiWidget(ID, currentSSID, currentPASS, isSecured, SSIDs, RSSIs, SECUs) {

    let WiFi_OBJ = [];
    for (let i = 0; i < SSIDs.length; i++) {
        let obj = { "ssid": SSIDs[i], "rrsi": RSSIs[i], "secured": SECUs[i] };
        WiFi_OBJ.push(obj);
    }

    WiFi_OBJ = WiFi_OBJ.sort(function (prev, next) {
        return next.rrsi - prev.rrsi
    });

    selectedSSID = currentSSID;
    let x = "";
    x += '<div class="wifigrid">';
    x += '<div class="wifilabel">' + wifiwidget.labels.ConnectTo + '</div>';
    x += '<div class="dropdown" id="ssid_list">';
    x += '<div class="doubleButtonSSID">'
    x += '<button id="buttonSSID" onclick="showDropdown()" class="dropbtn">'
    x += innerButton(currentSSID);
    x += '</button>';
    x += '<button onclick="setLoadingIcon();refreshWiFi()" class="dropbtn buttonSSID">'
    x += '<svg id="iconReloadSSID", style="pointer-events: none; float: right; margin-right: 5px; margin-left: 1px; margin-top: 1px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="downarrow" d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z"></path></svg>';
    x += '</button>';
    x += '</div>'
    x += '\t<div id="myDropdown" class="dropdown-content">';
    for (let i = 0; i < SSIDs.length; i++) {
        x += '<a href="#"onclick="preselectSSID( ' + WiFi_OBJ[i].secured + ' , \'' + WiFi_OBJ[i].ssid + '\')">';
        x += '<div class= "divSSID">';
        x += setLockIcon(WiFi_OBJ[i].secured) + '';
        x += '<div style="margin-left: 10px ; margin-right: 10px;", class = "labelSSID"> ' + WiFi_OBJ[i].ssid + '</div>';
        x += getSignalBars(WiFi_OBJ[i].rrsi) + '';
        x += '</div>';
        x += '</a>';
    }
    x += '<a href="#">';
    x += '<div class= "divSSID" onclick="preselectSSID(true)">';
    x += '<div style="margin-left: 10px ; margin-right: 10px;", class = "labelSSID"> ' + wifiwidget.labels.ManualSSID + '</div>';
    x += '</div>';
    x += '</a>';
    x += '</div>';
    x += '</div>';
    x += '</div>';
    x += '<div id="manual_ssid" class="wifigrid">';
    x += '<div class="wifilabel">' + wifiwidget.labels.SSID + '</div>';
    x += '<input type="text" class = "wifiinput" id="inputWiFiSSID">';
    x += '</div>';
    x += '<div id="password_div" class="wifigrid">';
    x += '<div class="wifilabel">' + wifiwidget.labels.Password + '</div>';
    x += '<div class = "doubleButtonSSID" >';
    x += '<input type="password" class="wifiinput" id="inputWiFiPassword">';
    x += '<button id="buttonShowHide" onclick="showHidePassword()" class="buttonShowPass">';
   // x += '<svg style="pointer-events: none; float: right; margin-right: -1px; margin-left: 1px; margin-top: 1px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="downarrow" d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z"></path></svg>';
    x += '</button>';
    
    x += '</div>';
    x += '</div>';
    /*  x += '<div id="show_password_div" class="wifigrid">';
      x += '<div></div>';
      x += '<div>';
      x += '<input type="checkbox" id="showPasswordCheckbox" onclick="showHidePassword()">';
      x += '<label for="showPasswordCheckbox">  ' + wifiwidget.labels.ShowPassword + '</label> ';
      x += '</div>';
      x += '</div>';*/
    x += '<div class="wifibutton">';
    x += '<div></div>';
    x += '<button type="button" class="dropbtn" onclick="excecuteConnect()">' + wifiwidget.labels.ConnectButton + '</button>';
    x += '</div>';
    x += '</div>';

    document.getElementById(ID).innerHTML = x;
    document.getElementById(ID).classList.add("div_wifi");
    getEyeIcon();
    document.getElementById("manual_ssid").style.display = "none";
    document.getElementById("inputWiFiPassword").value = currentPASS;
    document.getElementById("password_div").style.display = isSecured ? "grid" : "none";
    document.getElementById("iconReloadSSID").classList.remove("buttonSSID_loading")
    // document.getElementById("show_password_div").style.display = isSecured ? "grid" : "none";

}

function setLoadingIcon(){
    document.getElementById("iconReloadSSID").classList.add("buttonSSID_loading")
}

function innerButton(currentSSID) {
    let x = "";
    x += (currentSSID || 'SSID');
    x += '<svg style="pointer-events: none; float: right; margin-right: 6px; margin-left: 6px; margin-top: 6px" height = "6px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 183.85 91.92"><defs><style>.downarrow{fill:' + wifiwidget.colors.down + ';}</style></defs><polygon class="downarrow" points="183.85 0 91.92 91.92 0 0 183.85 0"/></svg>';
    return x;
}

function getSignalBars(RSSI_magnitude) {
    bars = 0;
    if (RSSI_magnitude >= -50) {
        bars = 4;
    } else if (RSSI_magnitude < -50 && RSSI_magnitude >= -60) {
        bars = 3;
    } else if (RSSI_magnitude < -60 && RSSI_magnitude >= -70) {
        bars = 2;
    } else if (RSSI_magnitude < -70) {
        bars = 1;
    }
    var size = 20; //Size of the icon
    var bar1 = bars < 1 ? "st0_bars" : "st1_bars";
    var bar2 = bars < 2 ? "st0_bars" : "st1_bars";
    var bar3 = bars < 3 ? "st0_bars" : "st1_bars";
    var bar4 = bars < 4 ? "st0_bars" : "st1_bars";
    var SignalIcon = '<svg style = "margin-top: auto; margin-bottom: auto", width="' + size + 'px" height="' + size + 'px" x="0px" y="0px" viewBox="0 0 19.5 20" style="enable-background:new 0 0 19.5 20;" xml:space="preserve"> <style type="text/css">.'
    SignalIcon += 'st0_bars {fill: '
    SignalIcon += wifiwidget.colors.noSignal;
    SignalIcon += ';}.st1_bars {fill: '
    SignalIcon += wifiwidget.colors.signal;
    SignalIcon += ';} </style> <title>' + RSSI_magnitude + 'db</title> <rect x="0.1" y="15" class="'
    SignalIcon += bar1
    SignalIcon += '" width="4.3" height="5" /> <rect x="5.1" y="10" class="'
    SignalIcon += bar2
    SignalIcon += '" width="4.3" height="10" /> <rect x="10.1" y="5" class="'
    SignalIcon += bar3
    SignalIcon += '" width="4.3" height="15" /> <rect x="15.1" class="'
    SignalIcon += bar4
    SignalIcon += '" width="4.3" height="20" /> </svg>'
    return SignalIcon
}

function setLockIcon(state) {
    size = 12;
    var lockIcon = '<svg style = "margin-top: auto; margin-bottom: auto", width="' + size + 'px" height="' + size + 'px"';
    if (state) {
        lockIcon += ' viewBox="0 0 38.38 49.71"><defs><style>.cls-1{fill:' + wifiwidget.colors.lock + ';}</style></defs><title>locked</title><path class="cls-1" d="M39.21,16V14.36a8.1,8.1,0,0,0-.05-1,14.2,14.2,0,0,0-28.33,0,8.1,8.1,0,0,0-.05,1V16h-5V49.85H44.19V16ZM15.6,13.37h.05a9.4,9.4,0,0,1,18.69,0h0V16H15.6Z" transform="translate(-5.81 -0.15)"/></svg>';
    } else {
        lockIcon += ' x="0px" y="0px" viewBox="0 0 38.4 49.7" style="enable-background:new 0 0 38.4 49.7;" xml:space="preserve"><title></title></svg>'
    }
    return lockIcon;
}

var showPassword = false;
function showHidePassword() {
    var x = document.getElementById("inputWiFiPassword");
    showPassword = !showPassword;
    if (showPassword) {
        x.type = "text";
    } else {
        x.type = "password";
    }
    getEyeIcon();
}

function getEyeIcon() {
    var x = document.getElementById("buttonShowHide");
    if (showPassword) {
        x.innerHTML = '<svg height = "20px", xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.85 488.85"><defs><style>.eyecls-1{fill:'+wifiwidget.colors.eye+';}</style></defs><title>eye</title><path class="eyecls-1" d="M244.43,98.72c-93.41,0-178.11,51.1-240.61,134.1a19.35,19.35,0,0,0,0,23.1C66.32,339,151,390.12,244.43,390.12S422.53,339,485,256a19.35,19.35,0,0,0,0-23.1C422.52,149.82,337.83,98.72,244.43,98.72Zm6.7,248.3a102.89,102.89,0,0,1-109.31-109.3c3.2-51.2,44.7-92.7,95.91-95.9A102.89,102.89,0,0,1,347,251.12C343.73,302.22,302.23,343.72,251.13,347ZM248,299.62a55.36,55.36,0,1,1,51.7-51.7A55.28,55.28,0,0,1,248,299.62Z"/></svg>';
    } else {
        x.innerHTML = '<svg height = "20px", xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.85 488.85"><defs><style>.eyecls-2{fill:'+wifiwidget.colors.eye+';}</style></defs><title>eye</title><path class="eyecls-2" d="M190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm0,0,43.79-44.39A55.72,55.72,0,0,0,190,234.46ZM244.43,98.73c-93.41,0-178.11,51.1-240.61,134.1a19.35,19.35,0,0,0,0,23.1c24.72,32.86,52.9,60.72,83.73,82.38l59.64-60.46a103.18,103.18,0,0,1-5.37-40.12c3.2-51.2,44.7-92.7,95.91-95.9a103,103,0,0,1,38.78,4.92l37.75-38.27A255.06,255.06,0,0,0,244.43,98.73ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm0,0,43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm295-1.53c-24.83-33-53.16-61-84.15-82.68l-59.41,60.23A102.76,102.76,0,0,1,347,251.13c-3.3,51.1-44.8,92.6-95.91,95.9a103.12,103.12,0,0,1-39.32-5.09L174,380.22a255.29,255.29,0,0,0,70.4,9.91c93.4,0,178.1-51.1,240.6-134.1A19.35,19.35,0,0,0,485,232.93Zm-295,1.53,43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm0,0,43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41ZM190,234.46l43.79-44.39A55.72,55.72,0,0,0,190,234.46Zm64.29,64.41a55.69,55.69,0,0,0,44.79-45.41Z"/><path class="eyecls-2" d="M433,90.61l-340.31,345A26.5,26.5,0,1,1,55,398.39l340.31-345A26.5,26.5,0,1,1,433,90.61Z"/></svg>';
    }
}

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function preselectSSID(isSecured, ssid_name) {
    document.getElementById("inputWiFiPassword").value = "";
    document.getElementById("password_div").style.display = isSecured ? "grid" : "none";
    //    document.getElementById("show_password_div").style.display = isSecured ? "grid" : "none";
    document.getElementById("manual_ssid").style.display = ssid_name ? "none" : "grid";
    document.getElementById("buttonSSID").innerHTML = ssid_name ? innerButton(ssid_name) : innerButton(wifiwidget.labels.ManualSSID);
    selectedSSID = ssid_name;
    manualSSID = ssid_name ? false : true;
}

// Close the dropdown if the user clicks outside of it
window.addEventListener("click", function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});


let onWiFiConnect = (ssid, pass) => { }
function excecuteConnect() {
    let ssid = manualSSID ? document.getElementById("inputWiFiSSID").value : selectedSSID;
    let pass = document.getElementById("inputWiFiPassword").value;
    onWiFiConnect(ssid, pass);
}

var selectedSSID = "";
var manualSSID = false;

let refreshWiFi = () => { }