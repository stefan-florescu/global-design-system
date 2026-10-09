import { ArrowRight } from "@stefan-florescu/icons";
import { Popover, PopoverTitle } from "@stefan-florescu/ui";

export default function PopoverImage() {
  return (
    <div className="text-body">
      Due to its central geographic location in Southern Europe,{" "}
      <Popover
        trigger="hover"
        className="w-96 rounded-lg p-3"
        content={
          <div className="grid grid-cols-5">
            <div className="col-span-3 pe-3">
              <div className="space-y-2">
                <PopoverTitle className="font-semibold">About Italy</PopoverTitle>
                <p className="mb-2">
                  Italy is located in the middle of the Mediterranean Sea, in Southern Europe it is
                  also part of Western Europe.
                </p>
                <p>A unitary parliamentary republic with Rome as its capital and largest city.</p>
                <a
                  href="#italy"
                  className="text-fg-brand flex items-center font-medium hover:underline"
                >
                  Read more
                  <ArrowRight aria-hidden className="ms-1 size-4 rtl:rotate-180" />
                </a>
              </div>
            </div>
            <img
              src="/images/landscape-3.svg"
              className="col-span-2 h-full rounded object-cover"
              alt=""
            />
          </div>
        }
      >
        <a href="#about-italy" className="text-fg-brand font-medium underline hover:no-underline">
          Italy
        </a>
      </Popover>{" "}
      has historically been home to myriad peoples and cultures. In addition to the various ancient
      peoples dispersed throughout what is now modern-day Italy, the most predominant being the
      Indo-European Italic peoples who gave the peninsula its name, beginning from the classical
      era, Phoenicians and Carthaginians founded colonies mostly in insular Italy
    </div>
  );
}
