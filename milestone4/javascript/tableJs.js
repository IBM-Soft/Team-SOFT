
	var jsonData = allJsonData.data;
	function loadData() {
		var cData = jsonData;
		var count = cData.length;
		var tbody = document.getElementById('dataBody');
		console.log(tbody);
		for (i=0; i<count; i++) {
			var player = cData[i];
			var rowData = '<tr class="dataRow" data-favorite="'+player.isFavorite+'"> <td>'+player.firstname+' '+player.surname+'</td> <td>'+player.team+'</td> <td>'+player.headcoach+'</td> <td>'+player.asisstantcoach+'</td> <td>'+player.position+'</td> <td>'+(player.isActive == true ? 'Ja':'Nein')+'</td> <td>'+player.number+'</td> <td>'+player.year+'</td> </tr>';
			var nowData = tbody.innerHTML;
			tbody.innerHTML = rowData + nowData;
		}
		document.getElementById('alle_spieler').setAttribute('class','tabBtn activeTab');
		console.log('Data Loaded...');
	}
	loadData();

	function showAll() {
		var btnFav = document.getElementById('favoriten');
		var btnAll = document.getElementById('alle_spieler');
		var imgList = document.getElementById('dataBody').children;
		var listCount = imgList.length;
		for (i=0; i<listCount; i++) {
			var img = imgList[i];
			img.setAttribute('class','dataRow');
		}
		btnFav.setAttribute('class','tabBtn');
		btnAll.setAttribute('class','tabBtn activeTab');
	}

	function showFavorite() {
		var btnAll = document.getElementById('alle_spieler');
		var btnFav = document.getElementById('favoriten');
		var imgList = document.getElementById('dataBody').children;
		var listCount = imgList.length;
		for (i=0; i<listCount; i++) {
			var img = imgList[i];
			var isFav = img.getAttribute('data-favorite');
			if (isFav != 'true')
				img.setAttribute('class','dataRow hide');
			else
				img.setAttribute('class','dataRow');
		}
		btnAll.setAttribute('class','tabBtn');
		btnFav.setAttribute('class','tabBtn activeTab');
	}