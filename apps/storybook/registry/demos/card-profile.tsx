import { UserPlus } from "@stefan-florescu/icons";
import { Avatar, Button, Card, CardTitle } from "@stefan-florescu/ui";

export default function CardProfile() {
  return (
    <Card className="w-full max-w-xs">
      <div className="flex flex-col items-center">
        <Avatar src="/avatars/3.svg" alt="" className="mb-6 size-24" />
        <CardTitle className="mb-0.5 text-xl">Bonnie Green</CardTitle>
        <span className="text-body text-sm">Visual Designer</span>
        <div className="mt-4 flex gap-4 md:mt-6">
          <Button>
            <UserPlus aria-hidden className="-ms-0.5" />
            Follow me
          </Button>
          <Button variant="secondary">Message</Button>
        </div>
      </div>
    </Card>
  );
}
