@wall-color: rgba(255, 0, 0, 1);

#Walls_with_one_line, #Walls_with_multiple_lines, #US_Border_fence {
  line-color: @wall-color;
  line-join: round;
  line-cap: round;
  line-width: 10;
  line-opacity: 0.5;
  [zoom>=10] {
    line-width: 7.5;
    // opacity: 0.7;
  }
  [zoom>=13] {
    line-width: 5;
    // opacity: 0.3;
  }
  [zoom>=20] {
    line-width: 30;
    line-opacity: 0.10;
  }
  
  
    
}
