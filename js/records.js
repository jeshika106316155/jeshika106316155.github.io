/*var param=1;
		function addParameter(){
			var table = document.getElementById("parameter");
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			cell1.innerHTML = param;
			cell2.innerHTML = '<input type="text">';
			cell3.innerHTML = '=';
			cell4.innerHTML = '<input type="text">';
			cell5.innerHTML = '<button onclick="delParam(this)">delete</button>'
			param++;
        }		
		
		function delParam(row){
			var index= row.parentNode.parentNode.rowIndex;
			var table = document.getElementById('parameter');
			var count = table.rows.length;
			document.getElementById("parameter").deleteRow(index);
			param--;
			for (var c=index;c<count;c++){
				document.getElementById("parameter").rows[c].cells[0].innerHTML=c;
			}
		}*/
		
		function showForm(temp){
			/*var txt='';
			var temp='';
			var table = document.getElementById('parameter');
			var count = table.rows.length;
			
			for (var i=1;i<count;i++){
				temp += table.rows[i].cells[1].children[0].value + '=' + table.rows[i].cells[3].children[0].value;
				if(i!=count-1){
					temp+='&';
				}
			}*/
			
			txt = "http://203.64.84.213:20100/baseR4/Observation?" + temp;
			document.getElementById('API').value = txt;
			
			var xhttp = new XMLHttpRequest();
                xhttp.open("GET", txt, true);
				//xhttp.setRequestHeader("Content-type", 'text/xml');
                xhttp.onreadystatechange = function (){
					//alert(this.readyState);
                    if (this.readyState == 4){ 
						showOuput(this.responseText);
                    }
                };
                xhttp.send();
		}
		
		//var dataCount=1;
		function showOuput(str){
			var jsonOBJ = JSON.parse(str);
			var dataCount=1;
			if (jsonOBJ.total == 0){
				alert('data does not exist');
			}
			else{
				var table= document.getElementById("Oobs");
					for (var i=0;i<((jsonOBJ.total>10)?10:jsonOBJ.total);i++){	
						if ( jsonOBJ.entry[i].resource.category[0].coding[0].code == 'imaging' ){
							if ( jsonOBJ.entry[i].resource.code.coding[0].code == 'brain' ){
								if(dataCount==1){
									table.innerHTML= '<tr><th>No.</th><th>ID. Register</th><th>Date</th><th>SVG</th><th>ViewPort.sx</th><th>ViewPort.sy</th><th>ViewPort.sw</th><th>ViewPort.sh</th><th>Window Center</th><th>Window Width</th></tr>';
								}	
								var row = table.insertRow(-1);
								row.id=jsonOBJ.entry[i].resource.id;
								row.setAttribute('onclick', 'getRecord(' + row.id + ')');
								var elLink = document.createElement('a');
								var elLink1 = document.createElement('a');
								row.insertCell(0).innerHTML = dataCount;
								row.insertCell(1).innerHTML = jsonOBJ.entry[i].resource.id;
								row.insertCell(2).innerHTML = jsonOBJ.entry[i].resource.meta.lastUpdated;
								//row.insertCell(3).innerHTML = jsonOBJ.entry[i].resource.identifier[0].value;
								row.insertCell(3).innerHTML = window.atob(jsonOBJ.entry[i].resource.component[0].valueString);	//Show SVGannotation x1, y1, x2, y2
								/*row.insertCell(4).innerHTML = jsonOBJ.entry[i].resource.component[1].valueString;
								row.insertCell(5).innerHTML = jsonOBJ.entry[i].resource.component[2].valueString;
								row.insertCell(6).innerHTML = jsonOBJ.entry[i].resource.component[3].valueString;
								row.insertCell(7).innerHTML = jsonOBJ.entry[i].resource.component[4].valueString;
								row.insertCell(8).innerHTML = jsonOBJ.entry[i].resource.component[5].valueString;
								row.insertCell(9).innerHTML = jsonOBJ.entry[i].resource.component[6].valueString;
								*/
								var x = row.insertCell(4);
								var y = jsonOBJ.entry[i].resource.component[7].valueString;
								x.innerHTML = '<img src="'+y+'" width="400" height="400" alt="preview"></img>';
								
								//var str = '<img src="jsonOBJ.entry[i].resource.component[7]" alt="preview"></img>';
								//row.appendChild(abc);
								dataCount++;
							}
						}
						else{alert("It's not in the type of Imaging");}
					}
			}
        }		