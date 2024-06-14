const animationSubtitle = (node, callback) => {
  let startY = -100; 
  let scale = 0.5;
  let frame = 0;
  
  const animate = () => {
    if (frame < 50) {
      startY += 2; 
    } else if (frame >= 50) {
      scale += 0.025;
    }
    
    node.style.transform = `translateY(${startY}px) scale(${scale})`;
    
    frame++;
    if (frame < 70) {
      requestAnimationFrame(animate);
    } else {
      if (callback) callback();
      return;
    }
  };
  requestAnimationFrame(animate);
}

const animationTitle = (node) => {
  let startX = -100;
  let frame = 0;

  const animate = () => {
      if (frame < 100) {
          startX += 2;
      }
  
      node.style.transform = `translateX(${startX}%)`;

      frame++;
      if (frame < 50) {
          requestAnimationFrame(animate);
      }
  };
  requestAnimationFrame(animate);
};

// Cubic-bezier function
const cubicBezier = (p0, p1, p2, p3) => {
  return (t) => {
      const u = 1 - t;
      return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t;
  };
};

const rotateImage = (node, duration, deg = 45, spinDirection = '+', easing = cubicBezier(0,.87,1,.19)) => {
  let frame = 0;
  const totalFrames = Math.round(duration / 16.7); // 60 FPS
  const maxRotation = Number(`${spinDirection}${deg}`);
  let rotatingForward = true;

  const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const easedProgress = easing(progress);
      let rotation;

      if (rotatingForward) {
          rotation = maxRotation * easedProgress;
          if (progress >= 1) {
              rotatingForward = false;
              frame = 0; // Reset frame for reverse rotation
          }
      } else {
          rotation = maxRotation * (1 - easedProgress);
          if (progress >= 1) {
              node.style.transform = `rotate(${rotation}deg)`;
              return;
          }
      }

      node.style.transform = `rotate(${rotation}deg)`;
      requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

document.addEventListener("DOMContentLoaded", () => {
  const subtitle = document.querySelector('.animation__subtitle');
  const title = document.querySelector('.animation__title');
  const image1 = document.querySelector('.animation__img_1');
  const image2 = document.querySelector('.animation__img_2');
  const image3 = document.querySelector('.animation__img_3');
  const image4 = document.querySelector('.animation__img_4');

  animationSubtitle(subtitle, () => {
    animationTitle(title);
    rotateImage(image1, 700, 45, '-');
    rotateImage(image2, 700, 45, '+');
    rotateImage(image3, 700, 45, '+');
    rotateImage(image4, 700, 45, '-');
  });
});
