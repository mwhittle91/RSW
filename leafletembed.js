var map;

var geojsonLayer;

var info;

var legend;

var div

var list = new Array()
var sorted = new Array()
var option
var select
var opt
var el
var selected
var array


function initmap() {
	// Set the map centre and zoom level
	map = L.map('map',{zoomControl:false}).setView([ 55.5584597, -2.6561311 ], 6);
	var mapboxAccessToken = 'pk.eyJ1IjoiYndmYzg5MjIiLCJhIjoiY2lleTF6bmF1MDA5NXQ0bTRmNjFubGppMyJ9.Ak6lBqD0VTgj8jEZJ2Qohg';

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
		id: 'mapbox.light',
		
	}).addTo(map);

	function style(feature) {
    return {
        
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
	
	
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
	
    }
	
	info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());

}






function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

 info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {

    this._div.innerHTML = 
	
		  (props ?
        '<b><h1>' + props.ZONE_LABEL + '</h1></b>'
        : '-') +
	
	'<h4>CO2 emmisson</h4>' +  (props ?
        '<h3><b>' + props.data_CO2 + ' tonnes</h3></b>'
        : '-') +
		
	'<h4>Drive to work</h4>' + ( props ?
        '<h3><b>' + props.data_Drive + ' %</h3></b>'
        : '-' ) +	
	
	'<h4>Cycle to work</h4>' + ( props ?
        '<h3><b>' + props.data_Cycle + ' %</h3></b>'
        : '-' ) +
	
	'<h4>Inactive</h4>' + ( props ?
        '<h3><b>' + props.data_Inact + ' %</h3></b>'
        : '-' ) +
		
		
			'<h4>Premature deaths due to air quality</h4>' + ( props ?
        '<h3><b>' + props.data_death + ' deaths</h3></b>'
        : '-' ) + '</b>' 
		
		
};

info.addTo(map);

function getColor(d) {
    return d =
					   '#252525' ;
}

legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	

     div = L.DomUtil.create('div', 'info legend'),
        grades = [],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

 geojsonLayer = new L.GeoJSON.AJAX("map.geojson", {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var xmlhttp = new XMLHttpRequest();
var url = "map.geojson";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();



function myFunction(arr) {

	array = arr

for(var i = 0; i < arr.features.length; i++) {
	
	option = arr.features[i].properties.ZONE_LABEL
	list.push(option)
	}
	
	sorted = list.sort().filter(function(el,i,a){return i==a.indexOf(el);})
	select = document.getElementById("ID"); 
	
for(var i = 0; i < sorted.length; i++) {

	opt = sorted[i]
	el = document.createElement("option")
	el.textContent = opt 
	el.value = opt
	select.appendChild(el)
}
}


}


function search(){


	//alert("search function not yet supported")
	selected = select.options[select.selectedIndex].value;
	

		
	
	
	
	for(var i = 0; i < array.features.length; i++) {
	
	
	var name = array.features[i].properties.ZONE_LABEL
	
	if (name === selected) {
	
	var bounds = array.features[i].geometry.bbox

	var bounds0 = bounds[0]
	var bounds1 = bounds[1]
	var bounds2 = bounds[2]
	var bounds3 = bounds[3]
	
	var bounding = [[bounds1,bounds0],[bounds3,bounds2]]	
	
	map.fitBounds(bounding)
	


	}
	
	}
	
	}



	
	
	
	


		
	







































function drawEmissions() {

map.removeLayer(geojsonLayer)
map.removeControl(info)
map.removeControl(legend)




function getColor(d) {
    return d > 8200  ? '#b30000' :
           d > 3750  ? '#e34a33' :
           d > 2250  ? '#fc8d59' :
           d > 1250  ? '#fdbb84' :
           d > 750   ? '#fdd49e' :
           d > 0     ? '#fef0d9' : 
					   '#252525' ;
}

	function style(feature) {
    return {
        fillColor: getColor(feature.properties.data_CO2),
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
   

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
	
    }
	
	info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

 info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = 
	
		  (props ?
        '<b><h1>' + props.ZONE_LABEL + '</h1></b>'
        : '-') +
	
	'<h4>CO2 emmisson</h4>' +  (props ?
        '<h3><b>' + props.data_CO2 + ' tonnes</h3></b>'
        : '-') +
		
	'<h4>Drive to work</h4>' + ( props ?
        '<h3><b>' + props.data_Drive + ' %</h3></b>'
        : '-' ) +	
	
	'<h4>Cycle to work</h4>' + ( props ?
        '<h3><b>' + props.data_Cycle + ' %</h3></b>'
        : '-' ) +
	
	'<h4>Inactive</h4>' + ( props ?
        '<h3><b>' + props.data_Inact + ' %</h3></b>'
        : '-' ) +
		
		
			'<h4>Premature deaths due to air quality</h4>' + ( props ?
        '<h3><b>' + props.data_death + ' deaths</h3></b>'
        : '-' ) + '</b>' 
		
		
};

info.addTo(map);


legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

	

     div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 750, 1250, 2250, 3750, 8200],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
             grades[i] +  ' t ' + (grades[i + 1] ? '&ndash;' + grades[i + 1]  + ' t' + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

 geojsonLayer = new L.GeoJSON.AJAX("map.geojson", {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

}

function drawDriving() {

map.removeLayer(geojsonLayer)
map.removeControl(info)
map.removeControl(legend)




function getColor(d) {
    return d > 54  ? '#b30000' :
           d > 45  ? '#e34a33' :
           d > 39  ? '#fc8d59' :
           d > 28  ? '#fdbb84' :
           d > 12  ? '#fdd49e' :
           d > 0   ? '#fef0d9' : 
					 '#252525' ;
}

	function style(feature) {
    return {
        fillColor: getColor(feature.properties.data_Drive),
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
   

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
	
    }
	
	info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

 info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = 
	
		  (props ?
        '<b><h1>' + props.ZONE_LABEL + '</h1></b>'
        : '-') +
	
	'<h4>CO2 emmisson</h4>' +  (props ?
        '<h3><b>' + props.data_CO2 + ' tonnes</h3></b>'
        : '-') +
		
	'<h4>Drive to work</h4>' + ( props ?
        '<h3><b>' + props.data_Drive + ' %</h3></b>'
        : '-' ) +	
	
	'<h4>Cycle to work</h4>' + ( props ?
        '<h3><b>' + props.data_Cycle + ' %</h3></b>'
        : '-' ) +
	
	'<h4>Inactive</h4>' + ( props ?
        '<h3><b>' + props.data_Inact + ' %</h3></b>'
        : '-' ) +
		
		
			'<h4>Premature deaths due to air quality</h4>' + ( props ?
        '<h3><b>' + props.data_death + ' deaths</h3></b>'
        : '-' ) + '</b>' 
		
		
};

info.addTo(map);


legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

     div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 12, 28, 39, 45, 54],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
             grades[i] + '%' + (grades[i + 1] ? '&ndash;' + grades[i + 1]  + '%' + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

 geojsonLayer = new L.GeoJSON.AJAX("map.geojson", {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

}

function drawCycling() {

map.removeLayer(geojsonLayer)
map.removeControl(info)
map.removeControl(legend)




function getColor(d) {
    return d > 10  ? '#b30000' :
           d > 6  ? '#e34a33' :
           d > 3  ? '#fc8d59' :
           d > 2  ? '#fdbb84' :
           d > 1   ? '#fdd49e' :
           d > 0     ? '#fef0d9' : 
					   '#252525' ;
}

	function style(feature) {
    return {
        fillColor: getColor(feature.properties.data_Cycle),
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
   

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
	
    }
	
	info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

 info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = 
	
		  (props ?
        '<b><h1>' + props.ZONE_LABEL + '</h1></b>'
        : '-') +
	
	'<h4>CO2 emmisson</h4>' +  (props ?
        '<h3><b>' + props.data_CO2 + ' tonnes</h3></b>'
        : '-') +
		
	'<h4>Drive to work</h4>' + ( props ?
        '<h3><b>' + props.data_Drive + ' %</h3></b>'
        : '-' ) +	
	
	'<h4>Cycle to work</h4>' + ( props ?
        '<h3><b>' + props.data_Cycle + ' %</h3></b>'
        : '-' ) +
	
	'<h4>Inactive</h4>' + ( props ?
        '<h3><b>' + props.data_Inact + ' %</h3></b>'
        : '-' ) +
		
		
			'<h4>Premature deaths due to air quality</h4>' + ( props ?
        '<h3><b>' + props.data_death + ' deaths</h3></b>'
        : '-' ) + '</b>' 
		
		
};

info.addTo(map);


legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

     div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 6, 10],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
             grades[i] + '%' + (grades[i + 1] ? '&ndash;' + grades[i + 1]  + '%' + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

 geojsonLayer = new L.GeoJSON.AJAX("map.geojson", {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

}

function drawInactive() {

map.removeLayer(geojsonLayer)
map.removeControl(info)
map.removeControl(legend)



function getColor(d) {
    return d > 70  ? '#b30000' :
           d > 61  ? '#e34a33' :
           d > 59  ? '#fc8d59' :
           d > 55  ? '#fdbb84' :
           d > 52   ? '#fdd49e' :
           d > 0     ? '#fef0d9' : 
					   '#252525' ;
}

	function style(feature) {
    return {
        fillColor: getColor(feature.properties.data_Inact),
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
   

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
	
    }
	
	info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

 info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = 
	
		  (props ?
        '<b><h1>' + props.ZONE_LABEL + '</h1></b>'
        : '-') +
	
	'<h4>CO2 emmisson</h4>' +  (props ?
        '<h3><b>' + props.data_CO2 + ' tonnes</h3></b>'
        : '-') +
		
	'<h4>Drive to work</h4>' + ( props ?
        '<h3><b>' + props.data_Drive + ' %</h3></b>'
        : '-' ) +	
	
	'<h4>Cycle to work</h4>' + ( props ?
        '<h3><b>' + props.data_Cycle + ' %</h3></b>'
        : '-' ) +
	
	'<h4>Inactive</h4>' + ( props ?
        '<h3><b>' + props.data_Inact + ' %</h3></b>'
        : '-' ) +
		
		
			'<h4>Premature deaths due to air quality</h4>' + ( props ?
        '<h3><b>' + props.data_death + ' deaths</h3></b>'
        : '-' ) + '</b>' 
		
		
};

info.addTo(map);


legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

     div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 52, 55, 59, 61, 70],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + '%' + (grades[i + 1] ? '&ndash;' + grades[i + 1]  + '%' + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

 geojsonLayer = new L.GeoJSON.AJAX("map.geojson", {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

}

function drawDeath() {

map.removeLayer(geojsonLayer)
map.removeControl(info)
map.removeControl(legend)



function getColor(d) {
    return d > 400 ? '#b30000' :
           d > 100  ? '#e34a33' :
           d > 65  ? '#fc8d59' :
           d > 50  ? '#fdbb84' :
           d > 35  ? '#fdd49e' :
           d > 0   ? '#fef0d9' : 
					   '#252525' ;
}

	function style(feature) {
    return {
        fillColor: getColor(feature.properties.data_death),
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
   

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
	
    }
	
	info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojsonLayer.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

 info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = 
	
		  (props ?
        '<b><h1>' + props.ZONE_LABEL + '</h1></b>'
        : '-') +
	
	'<h4>CO2 emmisson</h4>' +  (props ?
        '<h3><b>' + props.data_CO2 + ' tonnes</h3></b>'
        : '-') +
		
	'<h4>Drive to work</h4>' + ( props ?
        '<h3><b>' + props.data_Drive + ' %</h3></b>'
        : '-' ) +	
	
	'<h4>Cycle to work</h4>' + ( props ?
        '<h3><b>' + props.data_Cycle + ' %</h3></b>'
        : '-' ) +
	
	'<h4>Inactive</h4>' + ( props ?
        '<h3><b>' + props.data_Inact + ' %</h3></b>'
        : '-' ) +
		
		
			'<h4>Premature deaths due to air quality</h4>' + ( props ?
        '<h3><b>' + props.data_death + ' deaths</h3></b>'
        : '-' ) + '</b>' 
		
		
};

info.addTo(map);


legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

     div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 35, 50, 65, 100, 400],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i]  + (grades[i + 1] ? '&ndash;' + grades[i + 1]   + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

 geojsonLayer = new L.GeoJSON.AJAX("map.geojson", {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

}