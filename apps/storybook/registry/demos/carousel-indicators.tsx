import { Carousel } from "@stefan-florescu/ui";

export default function CarouselIndicators() {
  return (
    <Carousel aria-label="Landscapes">
      <img
        src="/images/landscape-1.svg"
        alt="Blue mountains under a pale sun"
        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src="/images/landscape-2.svg"
        alt="Red peaks at sunset"
        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src="/images/landscape-3.svg"
        alt="Green hills on a clear day"
        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src="/images/landscape-4.svg"
        alt="Purple ridges at dusk"
        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src="/images/landscape-5.svg"
        alt="Golden dunes at noon"
        className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
      />
    </Carousel>
  );
}
