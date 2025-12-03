precision highp float;

// Varying
varying vec3 vPosition;

uniform vec3 playerPosition;
const float MAX_EXPOSURE_DISTANCE = 15.0;

uniform vec3 color;

void main(void) {
  float alpha = 1.0;
   float d = distance(vPosition,playerPosition);
    if(d <= MAX_EXPOSURE_DISTANCE)
        alpha = d / MAX_EXPOSURE_DISTANCE;
    else 
        alpha = 1.0;
   
    gl_FragColor = vec4(0.0,0.0,0.0,alpha);
}