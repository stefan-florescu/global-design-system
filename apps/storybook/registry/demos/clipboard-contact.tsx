import { Card, Clipboard } from "@stefan-florescu/ui";

const contact = ["Bonnie Green", "name@flowbite.com", "+ 12 345 67890"];

export default function ClipboardContact() {
  return (
    <Card className="w-full max-w-md">
      <h2 className="text-heading mb-4 text-lg font-semibold">Contact details</h2>
      <address className="bg-neutral-secondary-medium border-default-medium rounded-base relative grid grid-cols-2 border p-4">
        <div aria-hidden className="text-body hidden space-y-2 leading-loose sm:block">
          Name <br />
          Email <br />
          Phone Number
        </div>
        <div className="text-heading space-y-2 leading-loose font-medium">
          {contact.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </div>
        <Clipboard
          value={contact.join("\n")}
          variant="ghost"
          iconOnly
          label="Copy contact details"
          className="rounded-base absolute end-2 top-2"
        />
      </address>
    </Card>
  );
}
