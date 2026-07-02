"use client";

import { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
      // clean up on unmount is handled below
    } else {
      window.addEventListener("resize", syncSize);
    }
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;
    
    // WebGL type definition
    const webgl = gl as WebGLRenderingContext;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    
    // Create a subtle moving grid/data stream effect
    float grid = sin(uv.x * 40.0 + u_time * 0.5) * sin(uv.y * 40.0 + u_time * 0.5);
    grid = smoothstep(0.95, 1.0, grid);
    
    // Add some flowing "data" lines
    float flow = sin(uv.y * 20.0 - u_time * 2.0 + sin(uv.x * 5.0));
    flow = smoothstep(0.98, 1.0, flow) * 0.3;
    
    // Base dark color
    vec3 color = vec3(0.02, 0.04, 0.08); // Deep dark navy/black
    
    // Cyan glow
    vec3 accent = vec3(0.13, 0.83, 0.93); // Electric Cyan
    color += grid * accent * 0.15;
    color += flow * accent * 0.4;
    
    // Add a vignette effect
    float vignette = 1.0 - length(uv - 0.5) * 1.5;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}`;

    function cs(type: number, src: string) {
      const s = webgl.createShader(type);
      if (!s) return null;
      webgl.shaderSource(s, src);
      webgl.compileShader(s);
      return s;
    }

    const prog = webgl.createProgram();
    if (!prog) return;

    const vertShader = cs(webgl.VERTEX_SHADER, vs);
    const fragShader = cs(webgl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    webgl.attachShader(prog, vertShader);
    webgl.attachShader(prog, fragShader);
    webgl.linkProgram(prog);
    webgl.useProgram(prog);

    const buf = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, buf);
    webgl.bufferData(
      webgl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      webgl.STATIC_DRAW
    );

    const pos = webgl.getAttribLocation(prog, "a_position");
    webgl.enableVertexAttribArray(pos);
    webgl.vertexAttribPointer(pos, 2, webgl.FLOAT, false, 0, 0);

    const uTime = webgl.getUniformLocation(prog, "u_time");
    const uRes = webgl.getUniformLocation(prog, "u_resolution");

    let animationId: number;

    function render(t: number) {
      if (typeof ResizeObserver === "undefined") syncSize();
      webgl.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) webgl.uniform1f(uTime, t * 0.001);
      if (uRes) webgl.uniform2f(uRes, canvas!.width, canvas!.height);
      webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", syncSize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full opacity-60">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
