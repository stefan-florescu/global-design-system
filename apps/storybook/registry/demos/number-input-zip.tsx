import { MapPin } from "@stefan-florescu/icons";
import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function NumberInputZip() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="zip">ZIP code</Label>
        <Input
          id="zip"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          startIcon={<MapPin />}
          placeholder="12345"
          aria-describedby="zip-help"
        />
        <HelperText id="zip-help">Five digits.</HelperText>
      </div>
    </div>
  );
}
