import React, { useRef, useEffect } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener("resize", resize);
      resize();

      const circles = [
        { r: 40, x: 50, y: 50, dx: 3, dy: -3 },
        { r: 40, x: 100, y: 50, dx: 2, dy: 2 },
        { r: 40, x: 50, y: 100, dx: -4, dy: 4 },
        { r: 40, x: 100, y: 100, dx: -5, dy: -5 },
        { r: 40, x: 125, y: 120, dx: -1, dy: -1 },
        { r: 40, x: 150, y: 50, dx: 3.2, dy: -3 },
        { r: 40, x: 120, y: 60, dx: 2.8, dy: 2 },
        { r: 40, x: 80, y: 100, dx: -4.3, dy: 4 },
        { r: 40, x: 140, y: 180, dx: -4.5, dy: -5 },
        { r: 40, x: 195, y: 170, dx: -1.5, dy: -1.5 },
      ];

      const animate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach((circle) => {
          draw(circle.x, circle.y, circle.r);

          if (circle.x + circle.r >= canvas.width || circle.x - circle.r < 0) {
            circle.dx = -circle.dx;
            circle.x = Math.max(circle.r, Math.min(circle.x, canvas.width - circle.r));
          }

          if (circle.y + circle.r >= canvas.height || circle.y - circle.r < 0) {
            circle.dy = -circle.dy;
            circle.y = Math.max(circle.r, Math.min(circle.y, canvas.height - circle.r));
          }

          circle.x += circle.dx;
          circle.y += circle.dy;
        });
        requestAnimationFrame(animate);
      };

      const draw = (x, y, r) => {
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.stroke();
      };

      animate();

      return () => {
        window.removeEventListener("resize", resize);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    ></canvas>
  );
};

export default CanvasComponent;
