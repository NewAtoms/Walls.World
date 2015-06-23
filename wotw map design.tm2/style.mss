// Languages: name (local), name_en, name_fr, name_es, name_de
@name: '[name_en]';

// Fonts //
@sans: 'Arial Unicode MS Regular';
@sans_bold: 'Arial Unicode MS Bold';

/*
This style is designed to be easily recolored by adjusting the color
variables below. For predicatable feature relationships,
maintain or invert existing value (light to dark) scale.
*/

// Color palette //
@road:  #fff;
@land:  #eee;

@fill1: rgba(255,255,255,0.5);
@fill2: rgba(150,150,150,0.5);
@fill3: rgba(75,75,75,0.5);
@fill4: rgba(0,0,0,0.5);

@text: #777;

//Map { background-color: @land; }

Map {
  buffer-size:256;
  background-color: rgb(255, 255, 255);
}

#mapbox_satellite_full,
#mapbox_satellite_watermask  {
  raster-opacity: 0;
  [zoom>=12] {raster-opacity: 1;}
  [zoom<=11] {raster-opacity: 0.75;}
  [zoom<=9] {raster-opacity: 0.625;}
  [zoom<=9] {raster-opacity: 0.50;}
  [zoom<=8] {raster-opacity: 0.40;}
  [zoom<=7] {raster-opacity: 0.25;}
  [zoom<=5] {raster-opacity: 0.20;}
  [zoom<=4] {raster-opacity: 0.15;}
  [zoom<=3] {raster-opacity: 0.10;}
  [zoom<=2] {raster-opacity: 0.5;}
  [zoom<=1] {raster-opacity: 0;}
}

