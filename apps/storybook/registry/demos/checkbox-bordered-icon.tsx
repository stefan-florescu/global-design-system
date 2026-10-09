import { Database, Server } from "@stefan-florescu/icons";
import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxBorderedIcon() {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <Checkbox
        variant="bordered"
        name="bordered-checkbox"
        icon={<Server />}
        label="16GB unified memory"
        description="Seamlessly handle multitasking, large apps."
        defaultChecked
      />
      <Checkbox
        variant="bordered"
        name="bordered-checkbox"
        icon={<Database />}
        label="1TB SSD storage"
        description="Get ultra-fast storage with 1TB of SSD space"
      />
    </div>
  );
}
