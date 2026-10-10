import { TabsLink, TabsNav } from "@stefan-florescu/ui";

export default function TabsNavDemo() {
  return (
    <TabsNav aria-label="Account pages" className="w-full">
      <TabsLink href="#" active>
        Profile
      </TabsLink>
      <TabsLink href="#">Dashboard</TabsLink>
      <TabsLink href="#">Settings</TabsLink>
      <TabsLink href="#">Contacts</TabsLink>
      <TabsLink disabled>Disabled</TabsLink>
    </TabsNav>
  );
}
