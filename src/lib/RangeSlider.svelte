<script>
  import { sliderVal } from "../store";
  import { onMount } from "svelte";
  import gsap from "gsap";

  let slider;
  let sliderValue = 50;
  let isDragging = false;

  function handleMove(event) {
    if (!slider) return; // Check if slider is defined
    const rect = slider.getBoundingClientRect(); // Get bounding rectangle of slider element
    event.preventDefault(); // Prevent default touch event behavior (e.g., scrolling)

    let clientX, clientY;
    if (event.type === 'touchmove') {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const newValue = ((clientX - rect.left) / rect.width) * 100;
    sliderValue = Math.max(0, Math.min(100, newValue));
    sliderVal.set(Math.round(sliderValue)); // set the value for the outside world
    gsap.to(".slider-fill", { width: `${sliderValue}%`, duration: 0.1 });

    // Move the slider container slightly
    const moveX = ((clientX - rect.left) / rect.width) * 3 - 5;
    const moveY = ((clientY - rect.top) / rect.height) * 0.5 - 2;
    gsap.to(slider, {
      x: moveX,
      y: moveY,
      duration: 0.1,
      scale: 1.02,
    });
  }

  function handleMouseDown(event) {
    isDragging = true;
    handleMove(event);
    gsap.to(slider, { scale: 1.02, duration: 0.1 });
  }

  function handleMouseUp() {
    isDragging = false;
    gsap.to(slider, { x: 0, y: 0, scale: 1, duration: 0.1 });
  }

  onMount(() => {
    slider = document.querySelector('.slider-container'); // Assign the slider element
    window.addEventListener("mousemove", (event) => {
      if (isDragging) {
        handleMove(event);
      }
    });
    window.addEventListener("mouseup", handleMouseUp);

    // Touch events
    slider.addEventListener('touchstart', handleMouseDown);
    slider.addEventListener('touchmove', handleMove); // Pass touchmove event to handleMove directly
    slider.addEventListener('touchend', handleMouseUp);
    slider.addEventListener('touchcancel', handleMouseUp);
  });
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->

<div
  class="slider-container select-none cursor-pointer w-full h-full min-h-1 min-w-10 bg-primary-900/20 rounded-lg relative overflow-hidden"
  bind:this={slider}
  on:mousedown={handleMouseDown}
  role="button"
>
  <div
    class="slider-fill h-full bg-primary-900 rounded-r-sm"
    style="width: {sliderValue}%;"
  ></div>
</div>
