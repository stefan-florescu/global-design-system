import { Carousel } from "@stefan-florescu/ui";

export default function CarouselIndicators() {
  return (
    <Carousel aria-label="Landscapes" controls={false} className="max-w-2xl">
      <img
        src="/images/landscape-1.svg"
        alt="Blue mountains under a pale sun"
        className="aspect-video w-full object-cover"
      />
      <img
        src="/images/landscape-2.svg"
        alt="Red peaks at sunset"
        className="aspect-video w-full object-cover"
      />
      <img
        src="/images/landscape-3.svg"
        alt="Green hills on a clear day"
        className="aspect-video w-full object-cover"
      />
      <img
        src="/images/landscape-4.svg"
        alt="Purple ridges at dusk"
        className="aspect-video w-full object-cover"
      />
      <img
        src="/images/landscape-5.svg"
        alt="Golden dunes at noon"
        className="aspect-video w-full object-cover"
      />
    </Carousel>
  );
}
