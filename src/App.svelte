<script>
  import logo from "/src/assets/svg/Frame 3.svg";
  import Top from "./lib/Top.svelte";
  import Middle from "./lib/Middle.svelte";
  import Bottom from "./lib/Bottom.svelte";
</script>

<main
  class="bg-primary-100 relative w-full max-h-screen h-lvh overflow-hidden flex flex-col selection:bg-primary-900 selection:text-primary-100 transition-all duration-300 ease-in-out"
>
  <div class="h-10 flex flex-row px-10">
    <img src={logo} alt="logo" class="" />
  </div>
  <section class="flex flex-col h-max justify-between pb-10 grow gap-10">
    <Top />
    <div class="flex flex-row w-full px-10 gap-10 max-w-full h-full">
      <div
        class="w-full h-full flex flex-col justify-end items-start font-regrade"
      >
        <h1 class="text-[calc(10vw)] lg:text-[calc(6vw)] leading-none">
          <span class="font-normal">Neue</span><br /><span
            class="font-extrabold">Regrade</span
          >
        </h1>
      </div>
      <div class="w-full h-full hidden lg:block"></div>
      <div class="w-full h-full hidden sm:flex flex-col items-end justify-end ">
        <a href="#website" class="flex flex-row items-center text-3xl gap-2 font-light hover:font-semibold transition-all duration-300 ease-in-out group bg-left-bottom bg-gradient-to-r from-primary-900 to-primary-900 bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px]">
          Visit website
          <svg
            class="mt-1"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 16.269L16 1.5M16 1.5H1.11651M16 1.5V16.5"
              stroke="black"
              class=" stroke-2 group-hover:stroke-[3] transition-all duration-300 ease-in-out"
            />
          </svg>
        </a>
      </div>
    </div>
    <div class="flex flex-row w-full px-10 gap-10 max-w-full h-full">
      <div class="w-full bg-[url('/src/assets/images/NeueRegrade.png')] bg-cover h-full"></div>
      <div class="w-full bg-[url('/src/assets/images/Yapari.png')] opacity-60 bg-cover h-full hidden sm:block hover:opacity-90 transition-all duration-100 ease-in-out"></div>
      <div class="w-full bg-[url('/src/assets/images/Unbounded.png')] opacity-30 bg-cover h-full hidden lg:block hover:opacity-90 transition-all duration-100 ease-in-out"></div>
    </div>
  </section>
</main>
