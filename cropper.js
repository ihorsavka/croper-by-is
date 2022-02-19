var saveObj = {};
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var miniC=document.getElementById("miniCanvas");
var miniCtx=miniC.getContext("2d");
var img=document.getElementById("img");
var imgWidth = 200;
var imgHeight = 300;
var size = {
    width: imgWidth,
    height: imgHeight
};
var rotation = 0;
var deg2Rad = Math.PI / 180;
var count1 = 0;
var count2 = 0;
var valueD = 0;
var counter = 0;
var scaleVal = 0;

function update(newVal) {
    ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight);
    sharpen(ctx, img.naturalWidth, img.naturalHeight, parseInt(newVal) * 0.01);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function sharpen(ctx, w, h, mix) {
    var weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = ctx.createImageData(w, h),
        dstBuff = dstData.data,
        srcBuff = ctx.getImageData(0, 0, w, h).data,
        y = h;
    while (y--) {

        x = w;

        while (x--) {

            var sy = y,
                sx = x,
                dstOff = (y * w + x) * 4,
                r = 0,
                g = 0,
                b = 0,
                a = 0;

            for (var cy = 0; cy < katet; cy++) {
                for (var cx = 0; cx < katet; cx++) {
                    var scy = sy + cy - half;
                    var scx = sx + cx - half;

                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        var srcOff = (scy * w + scx) * 4;
                        var wt = weights[cy * katet + cx];

                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix)
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }

    ctx.putImageData(dstData, 0, 0);
}


function fade() {
    $('#canvas').fadeOut();
    $('#initImg').fadeOut();
    $('.hide-init').fadeOut();
    $('.show-init').fadeIn();
    $('#miniCanvas').fadeOut();
    $('.rt-scroll').fadeOut();
    $('.crop').fadeOut();
    $('.cropingBlock').fadeOut();
    $('.edit').fadeOut();
    $('.rotate').fadeOut();
    $('.resize').fadeOut();
    $('.function-buttons').fadeOut();
    $('.sharp').fadeOut();
    $('.br-scroll').fadeOut();
    $('.ct-scroll').fadeOut();
}

function backe() {
    fade();
    $('.menu').fadeIn();
    $('#previw').fadeIn();
}

function showInit() {
    $('#initImg').fadeIn();
    $('.hide-init').fadeIn();
    $('.show-init').fadeOut();
}

function hideInit() {
    $('#initImg').fadeOut();
    $('.hide-init').fadeOut();
    $('.show-init').fadeIn();
}

function openRT() {
    $('#miniCanvas').fadeIn();
    $('.rt-scroll').fadeIn();
    $('#previw').fadeOut();
    $('.rotate').fadeOut();
    save();
}

////opening cropper
function openCropper() {
    fade();
    $('.crop').fadeIn();
    $('.cropingBlock').fadeIn();
    $('.function-buttons').fadeIn();
    cropInit();
    $('.menu').fadeOut();

}

function openBr() {
    $('.ct-scroll').fadeOut();
    $('.br-scroll').fadeIn();
    save();
}

function openCont() {
    $('.br-scroll').fadeOut();
    save();
    $('.ct-scroll').fadeIn();
}

///opening rotations
function openRotate() {
    backe();
    fade();
    $('.menu').fadeOut();
    $('.rotate').fadeIn();
    $('.function-buttons').fadeIn();
    c.width = img.naturalWidth;
    c.height =  img.naturalHeight;
    miniC.width = img.width;
    miniC.height =  img.height;
    $('#img').fadeOut();
    $('#previw').fadeIn();
    ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight);
    miniCtx.drawImage(img,0,0,img.width,img.height);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
    save();

}

function openSharpe() {
    fade();
    $('.menu').fadeOut();
    $('.sharp').fadeIn();
    $('.function-buttons').fadeIn();
    c.width = img.naturalWidth;
    c.height =  img.naturalHeight;
    $('#img').fadeOut();
    $('#previw').fadeIn();
    ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
    save();

}

function openResize() {
    fade();

    $('.menu').fadeOut();
    $('.resize').fadeIn();
    $('.function-buttons').fadeIn();

    c.width = img.naturalWidth;
    c.height =  img.naturalHeight;

    $('#widthinput').attr('value',img.naturalWidth);
    $('#heightinput').attr('value',img.naturalHeight);
    $('#img').fadeOut();
    $('#previw').fadeIn();

    ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight);

    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function openEdit() {
    fade();
    $('.menu').fadeOut();
    $('.edit').fadeIn();
    $('.function-buttons').fadeIn();
    c.width = img.naturalWidth;
    c.height =  img.naturalHeight;
    $('#img').fadeOut();
    $('#previw').fadeIn();
    ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));

}

/////Functions for croping zone
function cropInit(croperMinWidth,croperMinHeight,croperAspRat) {
    $(".resizeable").resizable("destroy").resizable({
        containment: ".imageBox",
        minWidth: croperMinWidth,
        minHeight: croperMinHeight,
        aspectRatio: croperAspRat,
    });
}

function picAsp() {
    var croperMinWidth = 310;
    var croperMinHeight = 173;
    var croperAspRat = true;
    $(".resizeable").css({
        "width": croperMinWidth,
        "height": croperMinHeight,
        "min-width": croperMinWidth,
        "min-height": croperMinHeight
    });
    cropInit(croperMinWidth,croperMinHeight,croperAspRat);
}

function oneAsp() {
    var croperMinWidth = 173;
    var croperMinHeight = 173;
    var croperAspRat = true;
    $(".resizeable").css({
        "width": croperMinWidth,
        "height": croperMinHeight,
        "min-width": croperMinWidth,
        "min-height": croperMinHeight
    });
    cropInit(croperMinWidth,croperMinHeight,croperAspRat);
}

function cybAsp() {
    var croperMinWidth = 240
    var croperMinHeight = 160;
    var croperAspRat = true;
    $(".resizeable").css({
        "width": croperMinWidth,
        "height": croperMinHeight,
        "min-width": croperMinWidth,
        "min-height": croperMinHeight
    });
    cropInit(croperMinWidth,croperMinHeight,croperAspRat);
}

function realAspectRatio() {
    if (img.naturalWidth > img.naturalHeight) {
        var croperMinWidth = img.naturalWidth/10;
        var croperMinHeight = img.naturalHeight/10;
        var croperAspRat = true;

        $(".resizeable").css({
            "width": croperMinWidth,
            "height": croperMinHeight,
            "min-width": croperMinWidth,
            "min-height": croperMinHeight
        });
        cropInit(croperMinWidth,croperMinHeight,croperAspRat);
    } else if (img.naturalWidth === img.naturalHeight) {
        var croperMinWidth = 200;
        var croperMinHeight = 200;
        var croperAspRat = true;

        $(".resizeable").css({
            "width": croperMinWidth,
            "height": croperMinHeight,
            "min-width": croperMinWidth,
            "min-height": croperMinHeight
        });

        cropInit(croperMinWidth,croperMinHeight,croperAspRat);
    } else {
        var croperMinWidth = 200*((img.naturalWidth+100)/img.naturalWidth);
        var croperMinHeight = 300;
        var croperAspRat = true;

        $(".resizeable").css({
            "width": croperMinWidth,
            "height": croperMinHeight,
            "min-width": croperMinWidth,
            "min-height": croperMinHeight
        });

        cropInit(croperMinWidth,croperMinHeight,croperAspRat);
    }
}

function camAsp() {
    var croperMinWidth = 284;
    var croperMinHeight = 213;
    var croperAspRat = true;
    $(".resizeable").css({
        "width": croperMinWidth,
        "height": croperMinHeight,
        "min-width": croperMinWidth,
        "min-height": croperMinHeight
    });
    cropInit(croperMinWidth,croperMinHeight,croperAspRat);
}

function freeAsp() {
    var croperMinWidth = 150;
    var croperMinHeight = 150;
    var croperAspRat = false;

    $(".resizeable").css({
        "width": croperMinWidth,
        "height": croperMinHeight,
        "min-width": croperMinWidth,
        "min-height": croperMinHeight
    });

    cropInit(croperMinWidth,croperMinHeight,croperAspRat);
}

function save() {
    memoCount ++;
    saveObj[memoCount] = c.toDataURL('image/jpeg');
    $('#img').attr('src',c.toDataURL('image/jpeg'));
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function roleBack() {
    if (memoCount > 1) {
        memoCount = memoCount -1;
        $('.menu').fadeIn();
        $('#img').attr('src',saveObj[memoCount]);
        $('#previw').attr('src',saveObj[memoCount]);
    }else{
        var id = 0;
        $('.menu').fadeIn();
        $('#img').attr('src',saveObj[id]);
        $('#previw').attr('src',saveObj[id]);
    }


    fade();
}

function roleFront() {
    memoCount = memoCount +1;
    var id = memoCount;

    $('.menu').fadeIn();

    if (id >= memoCount) {
        id = memoCount;
        $('#img').attr('src',saveObj[id]);
        $('#previw').attr('src',saveObj[id]);
    }else{
        $('#img').attr('src',saveObj[id]);
        $('#previw').attr('src',saveObj[id]);
    }


    fade();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            saveObj[0] = e.target.result;
            $('#img').attr('src', saveObj[0]);
            $('#initImg').attr('src', saveObj[0]);

        }

        reader.readAsDataURL(input.files[0]);
    }
}

function canvasdraw  () {
    var diff = img.naturalWidth/img.width;
    c.width = $(".resizeable").width()*diff;
    c.height =  $(".resizeable").height()*diff;;
    var left = $('.draggable').position().left*(img.naturalWidth/img.width);
    var top = $('.draggable').position().top*(img.naturalHeight/img.height);

    ctx.save();
    ctx.clearRect(left,top,$(".resizeable").height()*diff, $(".resizeable").width()*diff);
    ctx.restore();


    ctx.drawImage(img,left,top,c.width, c.height, 0, 0, c.width, c.height);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
    $('#img').fadeOut();
    $('#previw').fadeIn();

    save();
}

function resize(value) {
    var sizeDiff =  parseInt(value)/img.naturalWidth;

    c.width =  parseInt(value);
    c.height =  img.naturalHeight * sizeDiff;

    var h = img.naturalHeight * sizeDiff;

    ctx.save();
    ctx.clearRect(0,0,c.width, c.height);
    ctx.restore();
    ctx.drawImage(img,0,0,img.naturalWidth, img.naturalHeight, 0, 0,   c.width,c.height);

    $('#heightinput').attr('value',h);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function resizeH(value) {
    var sizeDiff = parseInt(value)/img.naturalHeight;
    c.width = img.naturalWidth * sizeDiff;
    var w = img.naturalWidth * sizeDiff;
    c.height =   parseInt(value);


    ctx.save();
    ctx.clearRect(0,0,c.width, c.height);
    ctx.restore();


    ctx.drawImage(img,0,0,img.naturalWidth, img.naturalHeight, 0, 0,   c.width,c.height);

    $('#widthinput').attr('value',w);

    $('#previw').attr('src',c.toDataURL('image/jpeg'));

}

// function rotate() {
//     var imgDiffWidth = 0;
//     var imgDiffHeight = -img.naturalHeight;
//
//     var trDiffWidth = 0;
//     var trDiffHeight =(img.naturalHeight);
//     c.width = img.naturalHeight;
//     c.height = img.naturalWidth;
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//
//
//     ctx.save();
//     ctx.rotate(90*Math.PI/180);
//
//     ctx.drawImage(img, 0,-img.naturalHeight,img.naturalWidth,img.naturalHeight);
//     ctx.restore();
//     $('#previw').attr('src',c.toDataURL('image/jpeg'));
//     save();
// }

function rotate() {
    counter++;
    if (counter < 4) {
        valueD = valueD + 90;
    } else{
        counter = 0;
        valueD = 0;
    }
    rotateA();
    memoCount ++;
    // $('#img').fadeIn();
    // $('#previw').fadeOut();
    saveObj[memoCount] = c.toDataURL('image/jpeg');
    // rotateB();
}


function rotateA() {
    if (valueD == 90) {
        var imgDiffWidth = 0;
        var imgDiffHeight = -img.naturalHeight;
        var trDiffWidth = 0;
        var trDiffHeight =(img.naturalHeight);

        c.width = img.naturalHeight;
        c.height = img.naturalWidth;
    }else if(valueD == 270) {
        var imgDiffWidth = -(img.naturalWidth);
        var imgDiffHeight = 0;
        var trDiffWidth = img.naturalHeight/2;
        var trDiffHeight =(img.naturalWidth)/2;
        c.width = img.naturalHeight;
        c.height = img.naturalWidth;

    }else if(valueD == 180) {
        var imgDiffWidth = -(img.naturalWidth);
        var imgDiffHeight = -(img.naturalHeight);
        var trDiffWidth = 0;
        var trDiffHeight =0;
        c.width =  img.naturalWidth;
        c.height = img.naturalHeight;

    }else{
        var imgDiffWidth = 0;
        var imgDiffHeight = 0;
        var trDiffWidth = 0;
        var trDiffHeight =0;
        c.width =  img.naturalWidth;
        c.height = img.naturalHeight;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);


    ctx.save();
    ctx.translate(0,0);
    ctx.rotate(valueD*Math.PI/180);


    ctx.drawImage(img, imgDiffWidth,imgDiffHeight,img.naturalWidth,img.naturalHeight);
    ctx.restore();
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function rotateB() {
    if (valueD == 90) {
        var imgDiffWidth = -(img.width)/1.7777;
        var imgDiffHeight = -(img.height);

        var trDiffWidth = 0;
        var trDiffHeight =(img.height);
        miniC.width = img.height;
        miniC.height = img.width;
    }else if(valueD == 270) {
        var imgDiffWidth = -(img.width)/2;
        var imgDiffHeight = -(img.height)/2;
        var trDiffWidth = img.height/2;
        var trDiffHeight =(img.width)/2;
        miniC.width = img.height;
        miniC.height = img.width;

    }else{
        var imgDiffWidth = -(img.width)/2;
        var imgDiffHeight = -(img.height)/2;
        var trDiffWidth = (img.width)/2;
        var trDiffHeight =(img.height)/2;
        miniC.width =  img.width;
        miniC.height = img.height;

    }

    miniCtx.clearRect(0,0,canvas.width,canvas.height);
    miniCtx.save();
    miniCtx.translate(trDiffWidth,trDiffHeight);
    miniCtx.rotate(valueD*Math.PI/180);
    miniCtx.drawImage(img, imgDiffWidth,imgDiffHeight,img.width,img.height);
    miniCtx.restore();

    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function flip() {
    ctx.scale(1, -1);
    ctx.translate(0, -img.naturalHeight);
    ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
    memoCount ++;
    saveObj[memoCount] = c.toDataURL('image/jpeg');
}

function saturate() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var dataArray = imageData.data;

    for (var i = 0; i < dataArray.length; i += 4) {
        var red = dataArray[i]; // 0 to 255
        var green = dataArray[i + 1]; // 0 to 255
        var blue = dataArray[i + 2]; // 0 to 255
        var alpha = dataArray[i + 3]; // 0 to 255

        dataArray[i] = 1.5 * red; // you can multiply the color and alpha values with a number between 0 and 1
        dataArray[i + 1] = 1.5 * green;
        dataArray[i + 2] = 1.5 * blue;
        dataArray[i + 3] = 1 * alpha;
    }

    ctx.putImageData(imageData, 0, 0);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
    save();
}

function bluer() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var dataArray = imageData.data;
    ctx.globalAlpha = 0.1;

    for (var y=0;y<50;++y) ctx.drawImage(img,y,y,img.naturalWidth, img.naturalHeight);
    $('#img').attr('src',c.toDataURL('image/jpeg'));


    for (var y=0;y>-50;--y) ctx.drawImage(img,y,y,img.naturalWidth, img.naturalHeight);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
    save();

}

function grayscale() {
    var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i +1] + data[i +2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
    save();

};

function invert() {
    var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
    save();
};

function showValue(newValue) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var imgDiffWidth = img.naturalWidth;
    var imgDiffHeight = img.naturalHeight;

    ctx.save();
    ctx.translate((imgDiffWidth)/2,(imgDiffHeight)/2);
    ctx.rotate(newValue*Math.PI/180);


    ctx.drawImage(img,-(img.naturalWidth)/2, -(img.naturalHeight)/2,img.naturalWidth,img.naturalHeight);
    ctx.restore();
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function miniShowValue(newValue) {miniCtx.clearRect(0,0,miniC.width,miniC.height);
    var imgDiffWidth = miniC.width;
    var imgDiffHeight = miniC.height;

    miniCtx.save();
    miniCtx.translate((miniC.width)/2,(miniC.height)/2);
    miniCtx.rotate(newValue*Math.PI/180);


    miniCtx.drawImage(img,-(miniC.width)/2, -(miniC.height)/2,miniC.width,miniC.height);
    miniCtx.restore();
}

function scale(newValue) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var imgDiffWidth = img.naturalWidth;
    var imgDiffHeight = img.naturalHeight;
    ctx.save();
    ctx.scale(newValue, newValue);
    ctx.translate((imgDiffWidth)/newValue,(imgDiffHeight)/newValue);
    ctx.drawImage(img,(imgDiffWidth)/-newValue,(imgDiffHeight)/-newValue,img.naturalWidth,img.naturalHeight);


    ctx.restore();
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function changeColorValue(sobj, val) {
    $('#previw').attr('src',c.toDataURL('image/jpeg'));

}

function brightness(amount) {
    // ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight);
    var data = ctx.getImageData(0,0,canvas.width,canvas.height);//get pixel data
    var pixels = data.data;
    for (var i = 0; i < pixels.length; i+=4) {//loop through all data
        pixels[i] += amount;
        pixels[i+1] += amount;
        pixels[i+2] += amount;
    }
    data.data = pixels;


    ctx.putImageData(data,0,0);//put the image data back
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function brightnessScroll(amount) {
    var a = parseInt(amount);
    ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight);
    var data = ctx.getImageData(0,0,canvas.width,canvas.height);//get pixel data
    var pixels = data.data;

    for (var i = 0; i < pixels.length; i+=4) {//loop through all data
        pixels[i] += a;
        pixels[i+1] += a;
        pixels[i+2] += a;
    }
    data.data = pixels;


    ctx.putImageData(data,0,0);//put the image data back
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function contrastScroll(amount) {
    ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight);

    var a = parseInt(amount);

    var data = ctx.getImageData(0,0,canvas.width,canvas.height);//get pixel data
    var pixels = data.data;
    for (var i = 0; i < pixels.length; i+=4) {//loop through all data
        var brightness = (pixels[i]+pixels[i+1]+pixels[i+2])/3; //get the brightness

        pixels[i] += brightness > 127 ? a : -a;
        pixels[i+1] += brightness > 127 ? a : -a;
        pixels[i+2] += brightness > 127 ? a : -a;
    }
    data.data = pixels;
    ctx.putImageData(data,0,0);//put the image data back
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

function contrast(amount) {
    var data = ctx.getImageData(0,0,canvas.width,canvas.height);//get pixel data
    var pixels = data.data;
    for(var i = 0; i < pixels.length; i+=4) {//loop through all data

        var brightness = (pixels[i]+pixels[i+1]+pixels[i+2])/3; //get the brightness

        pixels[i] += brightness > 127 ? amount : -amount;
        pixels[i+1] += brightness > 127 ? amount : -amount;
        pixels[i+2] += brightness > 127 ? amount : -amount;
    }
    data.data = pixels;
    ctx.putImageData(data,0,0);//put the image data back
    $('#previw').attr('src',c.toDataURL('image/jpeg'));
}

fade();

$(".resizeable").resizable({
    containment: ".imageBox",
});

$(".draggable").draggable({
    cursor: "crosshair",
    containment: ".imageBox",
});


//////canvas Functions
var memoCount = 0;

var input = document.getElementById('input');


$("#input").change(function() {
    readURL(this);
    $('.menu').fadeIn();
});




