<script>
  import { sliderVal } from "../store";
  import { onMount } from "svelte";
  import gsap from "gsap";

  let slider;
  let sliderValue = 50;
  let isDragging = false;

  function handleMouseMove(event) {
    if (!isDragging) return;
    const rect = slider.getBoundingClientRect();
    let newValue = ((event.clientX - rect.left) / rect.width) * 100;
    newValue = Math.max(0, Math.min(100, newValue));
    sliderValue = newValue;
    sliderVal.set(Math.round(newValue)); // set the value for the outside world
    gsap.to(".slider-fill", { width: `${sliderValue}%`, duration: 0.1 });

    // Move the slider container slightly
    const moveX = ((event.clientX - rect.left) / rect.width) * 3 - 5;
    const moveY = ((event.clientY - rect.top) / rect.height) * 0.5 - 2;
    gsap.to(slider, {
      x: moveX,
      y: moveY,
      duration: 0.1,
      scale: 1.02,
    });
  }

  function handleMouseDown(event) {
    isDragging = true;
    handleMouseMove(event);
    gsap.to(slider, { scale: 1.02, duration: 0.1 });
  }

  function handleMouseUp() {
    isDragging = false;
    gsap.to(slider, { x: 0, y: 0, scale: 1, duration: 0.1 });
  }

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
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
