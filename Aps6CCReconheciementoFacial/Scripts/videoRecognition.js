var RECONHECIMENTOVIDEO = (function () {
    "use strict";
    var selectors = {};
    var objs = {};

    var rostos = [];

    var coordenadasImagem1 = [];

    function setSelectors() {
        //selector.test = '#test';
    }
    function cacheObjs() {
        //objs.test = $(selector.test);
    }
    function init() {
        setSelectors();
        cacheObjs();
        bindAll();
    }
    function bindAll() {
    }

    function reconhecerVideo() {
        window.onload = function () {
            var video = document.getElementById('video');
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var tracker = new tracking.ObjectTracker('face');
            tracker.setInitialScale(4);
            tracker.setStepSize(2);
            tracker.setEdgesDensity(0.1);
            tracking.track('#video', tracker, { camera: true });

            tracker.on('track', function (event) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                event.data.forEach(function (rect) {
                    context.strokeStyle = '#ff0000';
                    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                    context.font = '11px Helvetica';
                    context.fillStyle = "#fff";
                    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

                    console.log(rect.x, rect.y, rect.width, rect.height);
                });
            });

            var gui = new dat.GUI();
            gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
            gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
            gui.add(tracker, 'stepSize', 1, 5).step(0.1);
        };
    }

    return {
        Init: init,
        ReconhecerVideo: reconhecerVideo,
    };
}());
RECONHECIMENTOVIDEO.Init();
RECONHECIMENTOVIDEO.ReconhecerVideo();