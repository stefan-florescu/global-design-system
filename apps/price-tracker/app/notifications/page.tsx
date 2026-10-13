import type { Metadata } from "next";

import { NotificationsList } from "@/components/notifications-list";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Alerts" };

export default function NotificationsPage() {
  return (
    <PageShell>
      <NotificationsList />
    </PageShell>
  );
}
