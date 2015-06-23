@wall-color: rgba(255, 0, 0, 0.75);

#Ceuta, 
#China_North_Korea_Barrier, 
#Baghdad_Wall, 
#Gaza-Egypt_barrier, 
#Malaysia_Thailand_barrier,
#Melilla_Border_Fence,
#Saudi_Arabia_-_Yemen_barrier,
#Western_Saharan_Berm ,
#United_Nations_Buffer_Zone_In_Cyprus,
#Saudi_Arabia-Iraq_Barrier {
  line-color: @wall-color;
  line-join: round;
  line-cap: round;
  [zoom>=13] {
    line-width: 15;
    line-opacity: 0.25;
  }
  [zoom>=10] {
    line-width: 10;
    line-opacity: 0.5;
  }
    line-width: 5;
    line-opacity: 0.75;
}
