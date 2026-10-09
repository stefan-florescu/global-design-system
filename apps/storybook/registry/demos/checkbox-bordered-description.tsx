import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxBorderedDescription() {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <Checkbox
        variant="bordered"
        name="bordered-checkbox"
        label="16GB unified memory"
        description="Seamlessly handle multitasking, large apps."
      />
      <Checkbox
        variant="bordered"
        name="bordered-checkbox"
        label="1TB SSD storage"
        description="Get ultra-fast storage with 1TB of SSD space"
        defaultChecked
      />
    </div>
  );
}
