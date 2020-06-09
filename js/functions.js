	var xhttp = new XMLHttpRequest();
        var dicomData;

        xhttp.open('GET', "img/MR1.dcm", true);
        xhttp.responseType = "arraybuffer"; //取得或設定實際回應類型
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4)
                dicomData = new DataView(xhttp.response);
        }
        xhttp.send();
		
        var imgMetaData = { rows: 512, columns: 512, storedBytes: 2, samplesPerPixel: 1, pixelDataOffset: 1026 }; //data dicom, samplesPerPixel 1 =b&w
		var imgRow=imgMetaData.rows, imgCol=imgMetaData.columns;
        var viewPort = { vw: imgCol / imgRow * 500, vh: 500, sx: 0, sy: 0, sw: imgCol, sh: imgRow }; //v = view(canvas), s= source images
        var ratiox, ratioy, pixelx, pixely;
        var WindowCenter, WindowWidth, Max, Min;
        var Value = 0;
        var painting = false, startX, startY;
        var bgCanvas = document.getElementById("bgCanvas"), bgctx = bgCanvas.getContext("2d");
        bgctx.fillStyle = "black";
        bgctx.fillRect(0, 0, viewPort.vw, viewPort.vh);
        var canvas = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
        var drawCanvas = document.getElementById("drawCanvas"), drawCtx = drawCanvas.getContext("2d");
        ctx.strokeStyle = "black";
        drawCtx.strokeStyle = "black";
        ctx.lineWidth = 3;
        drawCtx.lineWidth = 3;
		WindowCenter = document.getElementById("wcenter").value;
			WindowWidth = document.getElementById("wwidth").value;
		
		function setViewport() {
            ratiox = viewPort.sw / viewPort.vw;
            ratioy = viewPort.sh / viewPort.vh;
            canvas.width = viewPort.vw;
            canvas.height = viewPort.vh;
            drawCanvas.width = viewPort.vw;
            drawCanvas.height = viewPort.vh;
        }

        function setPixel() {
            var imageData;
            var x, y;
            var dicomPixelIndex;
            var pixelValue;
            var grayValue;
			WindowCenter = document.getElementById("wcenter").value;
			WindowWidth = document.getElementById("wwidth").value;
			
            setViewport();
            Max = WindowCenter + WindowWidth / 2;
            Min = WindowCenter - WindowWidth / 2;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            for (y = 0; y < canvas.height; y++) {
                for (x = 0; x < canvas.width; x++) {
                    pixelx = viewPort.sx + x * ratiox;
                    pixelx = parseInt(pixelx);
                    pixely = viewPort.sy + y * ratioy;
                    pixely = parseInt(pixely);
                    // Get DICOM image pixel index
                    if (pixelx >= 0 && pixelx < imgMetaData.columns && pixely >= 0 && pixely < imgMetaData.rows) {
                        dicomPixelIndex = (pixely * imgMetaData.columns + pixelx) * imgMetaData.samplesPerPixel * imgMetaData.storedBytes + imgMetaData.pixelDataOffset;
						pixelValue = dicomData.getUint16(dicomPixelIndex, true); // true for littel endian
						if (pixelValue >= Max) grayValue = 255; // 灰階值 白
                        else if (Min > pixelValue) grayValue = 0; // 灰階值 黑    if ((pvalue[i][j] == 1) GrayValue = 0; for mammography
                        else grayValue = Math.round((pixelValue - Min) / WindowWidth * 256); //對數字做指定位數的四捨五入計算;電腦顯示值
                        // Get the canvas pixel +  index
                        var canvasPixelIndex = (y * canvas.width + x) * 4;
                        //dicomData.getInt8  references to JS dataView and arrayBuffer  http://www.javascripture.com/ArrayBuffer
                        imageData.data[canvasPixelIndex] = grayValue;     // Red
                        imageData.data[canvasPixelIndex + 1] = grayValue; // Green
                        imageData.data[canvasPixelIndex + 2] = grayValue;  // Blue
                        imageData.data[canvasPixelIndex + 3] = 255;   // Alpha
                    }
                    else {
                        imageData.data[canvasPixelIndex] = 0;     // Red
                        imageData.data[canvasPixelIndex + 1] = 0; // Green
                        imageData.data[canvasPixelIndex + 2] = 0;  // Blue
                        imageData.data[canvasPixelIndex + 3] = 255;   // Alpha
                    }
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        function draw() {
            drawCanvas.onmousedown = function (e) {
                painting = true;
                startX = e.pageX - this.offsetLeft; //e=mouse cursor, this=canvas original x, y
				document.getElementById("P2").innerHTML = e.pageX  + ','+e.clientX+","+e.screenX+"    "+this.offsetLeft;
                startY = e.pageY - this.offsetTop;
				document.getElementById("P1").innerHTML = e.pageY  + ','+e.clientY+","+e.screenY+"    "+this.offsetTop;
            }

            drawCanvas.onmousemove = function (e) {
                drawCtx.clearRect(0, 0, 600, 600);
                var x2 = e.pageX - this.offsetLeft, y2 = e.pageY - this.offsetTop;
                if (painting) {
                    drawCtx.beginPath();
                    drawCtx.moveTo(startX, startY);
                    drawCtx.lineTo(x2, y2);
                    drawCtx.stroke();

                    drawCtx.fillStyle = "blue";
                    drawCtx.font = 1;
                    powX = Math.pow((x2 - startX), 2);
                    powY = Math.pow((y2 - startY), 2);

                    length = Math.sqrt((powX + powY), 2);
                    length = (length).toFixed(2);

                    if (length >= 10) {
                        drawCtx.fillText(length + 'cm', (x2 + startX) / 2, (y2 + startY) / 2);
                    }
                    else {
                        drawCtx.fillText(length + 'mm', (x2 + startX) / 2, (y2 + startY) / 2);
                    }
                }
            }

            drawCanvas.onmouseup = function (e) {
                painting = false;
                var x2 = e.pageX-this.offsetLeft, y2 = e.pageY - this.offsetTop;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.fillStyle = "RED";
                ctx.font = 3;

                powX = Math.pow((x2 - startX), 2);
                powY = Math.pow((y2 - startY), 2);

                length = Math.sqrt((powX + powY), 2);
                length = (length).toFixed(2);

                if (length >= 10) {
                    ctx.fillText(length + 'cm', (x2 + startX) / 2, (y2 + startY) / 2);
                }
                else {
                    ctx.fillText(length + 'mm', (x2 + startX) / 2, (y2 + startY) / 2);
                }
            }

            <!-- drawCanvas.onmouseclick = function (e) { -->
                <!-- if (painting) { -->
                <!-- } -->
                <!-- else { -->
                    <!-- painting = true; -->
                    <!-- startX = e.pageX - this.offsetLeft; -->
                    <!-- startY = e.pageY - this.offsetTop; -->
                <!-- } -->
            <!-- } -->
        }

        function zoomin() {
            viewPort.sx += 5;
            viewPort.sy += 5;
            viewPort.sw -= 10;
            viewPort.sh -= 10;
            setPixel();
        }

        function zoomout() {
            viewPort.sx -= 5;
            viewPort.sy -= 5;
            viewPort.sw += 10;
            viewPort.sh += 10;
            setPixel();
        }

        function windowLevel() {
            var nextCenter = WindowCenter;
            var nextWidth = WindowWidth;
            var state = 1; //1=塗鴉 2=直線 3=圓形 4=橢圓形 5=正方形 6=長方形 7=橡皮擦 8=註解
            var adjusting = false;

            drawCanvas.onmousedown = function (e) {
                adjusting = true;
                startX = e.clientX;
                startY = e.clientY;
                document.getElementById("P1").innerHTML = "Mouse down X coords: " + startX + ", Y coords: " + startY;
            }


            drawCanvas.onmousemove = function (e) {
                if (adjusting == true) {
                    var x = e.clientX;
                    var y = e.clientY;
                    document.getElementById("P2").innerHTML = "Mouse position now x:" + x + ", y: " + y;
                    nextCenter = parseInt(WindowCenter) + x - startX;
                    nextWidth = parseInt(WindowWidth) + y - startY;
                    document.getElementById("P3").innerHTML = "Window center: " + nextCenter + ", Window width: " + nextWidth;
                }
            }

            drawCanvas.onmouseup = function (e) {
                if (adjusting == true) {
                    adjusting = false;
                    document.getElementById("wcenter").value = nextCenter;
                    document.getElementById("wwidth").value=nextWidth;
                    setPixel();
                }
            }
        }
		window.onload=function (){
			var imageData;
            var x, y;
            var dicomPixelIndex;
            var pixelValue;
            var grayValue;
			WindowCenter = document.getElementById("wcenter").value;
			WindowWidth = document.getElementById("wwidth").value;
			
            setViewport();
            Max = WindowCenter + WindowWidth / 2;
            Min = WindowCenter - WindowWidth / 2;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            for (y = 0; y < canvas.height; y++) {
                for (x = 0; x < canvas.width; x++) {
                    pixelx = viewPort.sx + x * ratiox;
                    pixelx = parseInt(pixelx);
                    pixely = viewPort.sy + y * ratioy;
                    pixely = parseInt(pixely);
                    // Get DICOM image pixel index
                    if (pixelx >= 0 && pixelx < imgMetaData.columns && pixely >= 0 && pixely < imgMetaData.rows) {
                        dicomPixelIndex = (pixely * imgMetaData.columns + pixelx) * imgMetaData.samplesPerPixel * imgMetaData.storedBytes + imgMetaData.pixelDataOffset;
						pixelValue = dicomData.getUint16(dicomPixelIndex, true); // true for littel endian
						if (pixelValue >= Max) grayValue = 255; // 灰階值 白
                        else if (Min > pixelValue) grayValue = 0; // 灰階值 黑    if ((pvalue[i][j] == 1) GrayValue = 0; for mammography
                        else grayValue = Math.round((pixelValue - Min) / WindowWidth * 256); //對數字做指定位數的四捨五入計算;電腦顯示值
                        // Get the canvas pixel +  index
                        var canvasPixelIndex = (y * canvas.width + x) * 4;
                        //dicomData.getInt8  references to JS dataView and arrayBuffer  http://www.javascripture.com/ArrayBuffer
                        imageData.data[canvasPixelIndex] = grayValue;     // Red
                        imageData.data[canvasPixelIndex + 1] = grayValue; // Green
                        imageData.data[canvasPixelIndex + 2] = grayValue;  // Blue
                        imageData.data[canvasPixelIndex + 3] = 255;   // Alpha
                    }
                    else {
                        imageData.data[canvasPixelIndex] = 0;     // Red
                        imageData.data[canvasPixelIndex + 1] = 0; // Green
                        imageData.data[canvasPixelIndex + 2] = 0;  // Blue
                        imageData.data[canvasPixelIndex + 3] = 255;   // Alpha
                    }
                }
            }
            ctx.putImageData(imageData, 0, 0);
        
		}
		