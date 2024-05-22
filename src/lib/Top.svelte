<script>
  import { sliderVal } from "../store";
  import RangeSlider from "./RangeSlider.svelte";

  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let text = "Play with me".split('');
  let chars = [];
  let textElement;
  let textContainer;
  let baseWeight = 400;

  $: {
    baseWeight = 100 + 8 * $sliderVal; // Map the value to a range from 100 to 900
    updateFontWeight();
  }

  function updateFontWeight() {
    chars.forEach((char) => {
      gsap.to(char, { fontWeight: baseWeight, ease: "power1.out", duration: 0.1 });
    });
  }

  onMount(() => {
    textContainer.addEventListener("mousemove", (e) => {
    const rect = textElement.getBoundingClientRect();
    const x = e.clientX - rect.left;

    chars.forEach((char, i) => {
      const charX = char.getBoundingClientRect().left - rect.left;
      const distance = Math.abs(x - charX);
      const maxDistance = Math.max(rect.width, rect.height);
      const weight = 900 - (distance / maxDistance) * 800; // Normalize to a range between 100 and 900
      gsap.to(char, { fontWeight: weight, ease: "power1.out", duration: 0.1 });
    });
  });

  textContainer.addEventListener("mouseleave", () => {
    chars.forEach((char) => {
      gsap.to(char, { fontWeight: baseWeight, ease: "power1.out", duration: 0.1 });
    });
  });
  });
</script>

<div class="flex flex-row w-full px-10 gap-10 max-w-full h-full">
  <div class="w-full h-full flex-row items-center justify-between hidden lg:flex">
    <div class="flex flex-col gap-0 items-start">
        <!-- all the headers in order -->
        <h1 class="text-[22px] font-semibold  font-regrade">Header 1</h1>
        <h2 class="text-[18px] font-semibold  font-regrade">Header 2</h2>
        <h3 class="text-[16px] font-semibold  font-regrade">Header 3</h3>
        <h4 class="text-[14px] font-semibold  font-regrade">Header 4</h4>
        <h5 class="text-[12px] font-semibold  font-regrade">Header 5</h5>
        <h6 class="text-[10px] font-semibold  font-regrade">Header 6</h6>
    </div>
    <div class="flex flex-col gap-0 items-end">
        <!-- all weights in order -->
        <span class="text-[18px] font-light font-regrade">Light</span>
        <span class="text-[18px] font-normal font-regrade">Regular</span>
        <span class="text-[18px] font-medium font-regrade">Medium</span>
        <span class="text-[18px] font-semibold font-regrade">SemiBold</span>
        <span class="text-[18px] font-bold font-regrade">Bold</span>
        <span class="text-[18px] font-black font-regrade">Extra Bold</span>

        
    </div>
  </div>

  <div  bind:this={textContainer}
    class="w-full h-full hidden sm:flex flex-col items-center justify-center relative"
    style="transition: font-weight 0.3 ease;"
    id="text-container"
  >
    <div
      bind:this={textElement}
      class="text-[calc(6vw)] lg:text-[calc(4vw)] font-regrade"
    >
      {#each text as char, i}
        <span bind:this={chars[i]}>{char}</span>
      {/each}
    </div>
  </div>

  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="flex flex-row items-center gap-4 w-3/5 h-2">
      <span class=" text-nowrap">Weight: {$sliderVal}</span>
      <RangeSlider />
    </div>
  </div>
</div>
