const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
const { mat4 } = glMatrix;

if (!gl) {
  console.error("WebGL not supported!!");
}

const vertexData = [0, 1, 0, 1, -1, 0, -1, -1, 0]; // triangle data
const colorData = [1, 0, 0, 0, 1, 0, 0, 0, 1];

const vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const cBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

const vShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vShader,
  `
    precision mediump float;
    attribute vec3 position;
    attribute vec3 color;
    varying vec3 vColor;
    uniform mat4 matrix;

    void main() {
      vColor = color;
      gl_Position = matrix * vec4(position, 1);
    }
  `
);
gl.compileShader(vShader);

const fShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fShader,
  `
    precision mediump float;
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4(vColor, 1);
    }
  `
);
gl.compileShader(fShader);

const program = gl.createProgram();
gl.attachShader(program, vShader);
gl.attachShader(program, fShader);

gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, "color");
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

const uniformLocation = {
  matrix: gl.getUniformLocation(program, "matrix"),
};

const matrix = mat4.create();
mat4.translate(matrix, matrix, [0.5, 0.5, 0]);
mat4.scale(matrix, matrix, [0.5, 0.5, 0]);

gl.uniformMatrix4fv(uniformLocation.matrix, false, matrix);

gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
