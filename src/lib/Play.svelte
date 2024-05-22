<script>
  import { sliderVal } from "../store";
  import RangeSlider from "./RangeSlider.svelte";

  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let text = "Play with me".split("");
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
      gsap.to(char, {
        fontWeight: baseWeight,
        ease: "power1.out",
        duration: 0.1,
      });
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
        gsap.to(char, {
          fontWeight: weight,
          ease: "power1.out",
          duration: 0.1,
        });
      });
    });

    textContainer.addEventListener("mouseleave", () => {
      chars.forEach((char) => {
        gsap.to(char, {
          fontWeight: baseWeight,
          ease: "power1.out",
          duration: 0.1,
        });
      });
    });
  });
</script>

<div
  bind:this={textContainer}
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
