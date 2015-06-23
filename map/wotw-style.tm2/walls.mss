@wall-color: rgba(255, 0, 0, 1);

#Walls_with_one_line, #Walls_with_multiple_lines, #US_Border_fence {
  line-color: @wall-color;
  line-join: round;
  line-cap: round;
  line-width: 5;
  line-opacity: 1;
  [zoom>=13] {
    line-width: 15;
    line-opacity: 0.8;
  }
  [zoom>=10] {
    line-width: 10;
    line-opacity: 0.7;
  }
    
}
