import { Avatar, Button, Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

export default function CardProfile() {
  return (
    <Card className="w-full max-w-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <Avatar src="/avatars/3.svg" alt="" size="lg" className="mb-2" />
        <CardTitle className="text-xl">Elena Dumitru</CardTitle>
        <CardDescription className="text-sm">Visual designer</CardDescription>
        <div className="mt-4 flex gap-2">
          <Button size="sm">Add friend</Button>
          <Button size="sm" variant="outline">
            Message
          </Button>
        </div>
      </div>
    </Card>
  );
}
