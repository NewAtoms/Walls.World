@wall-color: rgba(255, 0, 0, 0.75);

#Walls_with_one_line, #Walls_with_multiple_lines, #United_States_Mexico_Barrier {
  line-color: @wall-color;
  line-join: round;
  line-cap: round;
  line-width: 5;
  line-opacity: 0.75;
  [zoom>=13] {
    line-width: 15;
    line-opacity: 0.25;
  }
  [zoom>=10] {
    line-width: 10;
    line-opacity: 0.5;
  }
    
}
