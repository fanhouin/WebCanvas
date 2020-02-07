var canvas = document.querySelector('#draw');
var range = document.querySelector('#range');
var color = document.querySelector('#color');
var textbox = document.querySelector('#textbox');
var rangenum = document.querySelector('#rangenum');
var selecttype = document.querySelectorAll('#selecttype');
var ctx = canvas.getContext('2d');

var upload = document.querySelector('#upload');

var fontfam = document.querySelector("#fontfam");
var fontfamidx = fontfam.selectedIndex;
var thefontfam = document.querySelectorAll("#op1")[fontfamidx].value;

var fontsize = document.querySelector("#fontsize");
var fontsizeidx = fontsize.selectedIndex;
var thefontsize = document.querySelectorAll("#op2")[fontsizeidx].value;


var imagearr = new Array();
var newimage = new Image();
var step = -1;
var nowstep = -1;

var x;
var y;
var drawing = false;

var lastselect = 0;
var colorwork = true;
var tying = false;

var upup=0;


rangenum.textContent = range.value+'px';
ctx.lineWidth = range.value;
ctx.strokeStyle = color.value;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

function imagepush() {
    step++;
    if (step < imagearr.length) imagearr.length = step;
    imagearr.push(canvas.toDataURL());
}

upload.addEventListener('change',(theimg)=>{
    var readimg = new FileReader();
    readimg.onload = function(event){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    readimg.readAsDataURL(theimg.target.files[0])
    upup=1;
});

fontfam.addEventListener('change',()=>{
    fontfamidx = document.querySelector("#fontfam").selectedIndex;
    thefontfam = document.querySelectorAll("#op1")[fontfamidx].value;
});

fontsize.addEventListener('change',()=>{
    fontsizeidx = document.querySelector("#fontsize").selectedIndex;
    thefontsize = document.querySelectorAll("#op2")[fontsizeidx].value;
});

color.addEventListener('change', () => {
    ctx.strokeStyle = color.value;
});

range.addEventListener('mousemove', () => {
    ctx.lineWidth = range.value;
    rangenum.textContent = range.value+'px';
});

range.addEventListener('change', () => {
    ctx.lineWidth = range.value;
    rangenum.textContent = range.value+'px';
});


canvas.addEventListener('mousedown', event => {
    if (upup){
        imagepush();
        upup=0;
    }
    x = event.offsetX;
    y = event.offsetY;
    ctx.beginPath();
    ctx.moveTo(x, y);

    drawing = true;
    if (!colorwork) ctx.strokeStyle = 'white';
    else ctx.strokeStyle = color.value;
    
    if(selecttype[lastselect].getAttribute('type')=='text'){
        textbox.style.fontFamily = thefontfam;
        textbox.style.color = color.value;
        textbox.style.fontSize = thefontsize+'px';
        textbox.style.left = event.clientX+'px';
        textbox.style.top = event.clientY+'px';
        textbox.style.display = 'inline-block';
        tying = true;
    }
    if (step >= 0) newimage.src = imagearr[step];
});

textbox.addEventListener('keydown', event=>{
    if(tying && textbox.value && event.keyCode=='13'){

        textbox.style.display = 'none';
        textbox.style.left = '0px';
        textbox.style.top = '0px';
        ctx.font = thefontsize+'px' +' '+thefontfam;
        ctx.fillStyle = color.value;
        ctx.fillText(textbox.value, x, y+Number(thefontsize));
        tying = false;
        textbox.value='';
        imagepush();
    }
});

canvas.addEventListener('mousemove', event => {
    if (drawing) {
        switch (selecttype[lastselect].getAttribute('type')) {
            case 'pen':
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();
                break;
            case 'rubber':
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();
                break;
            case 'line':
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (step >= 0) ctx.drawImage(newimage, 0, 0);

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.stroke();
                ctx.closePath();

                break;
            case 'square':
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (step >= 0) ctx.drawImage(newimage, 0, 0);

                ctx.beginPath();
                ctx.rect(x, y, event.offsetX - x, event.offsetY - y);
                ctx.closePath();

                ctx.stroke();
                break;
            case 'triangle':
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (step >= 0) ctx.drawImage(newimage, 0, 0);

                ctx.beginPath();

                ctx.moveTo((x + event.offsetX) / 2, y);
                ctx.lineTo(x, event.offsetY);
                ctx.lineTo(event.offsetX, event.offsetY);
                ctx.closePath();

                ctx.stroke();
                break;
            case 'circle':
                var r1;
                var r2;
                var r;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (step >= 0) ctx.drawImage(newimage, 0, 0);

                ctx.beginPath();
                if(event.offsetX-x>=0) r1=event.offsetX-x;
                else r1 = x-event.offsetX;
                if(event.offsetY-y>=0) r2=event.offsetY-y;
                else r2 = y-event.offsetY;
                if(r1>=r2) r=r1;
                else r=r2;
                ctx.arc(x,y,r,0,2*Math.PI);
                ctx.closePath();

                ctx.stroke();
                break;
        }
    }
});

canvas.addEventListener('mouseout', () => {
    if (drawing && !tying) {
        imagepush();
    }
    drawing = false;

});

canvas.addEventListener('mouseup', () => {
    if(selecttype[lastselect].getAttribute('type')=='pen' && drawing){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    ctx.closePath();
    drawing = false;
    imagepush();


});

selecttype.forEach((thetype, index) => {
    thetype.addEventListener('click', () => {
        if (!((thetype.getAttribute('type') == 'clear') || (thetype.getAttribute('type') == 'undo')||(thetype.getAttribute('type') == 'redo')||(thetype.getAttribute('type') == 'upload')||(thetype.getAttribute('type') == 'download'))) {
            selecttype[lastselect].classList.remove('typeborder');
            thetype.classList.add('typeborder');
            lastselect = index;
        } else {
            if(!((thetype.getAttribute('type') == 'redo')||(thetype.getAttribute('type') == 'clear')||(thetype.getAttribute('type') == 'download')||(thetype.getAttribute('type') == 'upload'))) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        textbox.style.display = 'none';
        textbox.value = '';
        colorwork = true;
        switch (thetype.getAttribute('type')) {
            case 'rubber':
                canvas.style.cursor = 'url("image/rubber.png") 5 15,auto';
                colorwork = false;
                break;
            case 'pen':
                canvas.style.cursor = 'url("image/pen.png") 5 15,auto';
                ctx.strokeStyle = color.value;
                break;
            case 'text':
                canvas.style.cursor = 'url("image/text.png") 5 15,auto'
                break;
            case 'circle':
                canvas.style.cursor = 'url("image/circle.png") 15 10,auto'
                break;
            case 'square':
                canvas.style.cursor = 'url("image/square.png"),auto'
                break;
            case 'line':
                canvas.style.cursor = 'url("image/line.png"),auto'
                break;
            case 'triangle':
                canvas.style.cursor = 'url("image/triangle.png") 5 15,auto'
                break;
            
            case 'clear':
                if (confirm('Are you sure you want to clear?')) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    step = -1;
                } 
                break;
            case 'undo':
                if (step > 0) {
                    step--;
                    newimage.src = imagearr[step];
                    newimage.onload = function () {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(newimage, 0, 0);
                    }
                } else {
                    step = -1;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }

                break;
            case 'redo':
                if (step < imagearr.length-1) {
                    step++;
                    newimage.src = imagearr[step];
                    newimage.onload = function () {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(newimage, 0, 0);
                    }  
                }
                break;
        }
    });
});