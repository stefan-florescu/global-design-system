/**
 * @stefan-florescu/icons — lucide.dev wrapper.
 *
 * Components must import icons from here, never from `lucide-react` directly, so
 * that size/stroke defaults, accessibility rules and the allowed icon set are
 * governed in one place. The visual spec (sizes, stroke width, optical
 * alignment) will be defined in a later phase.
 *
 * The allowed set is curated: add icons here (alphabetically) when a component
 * or the docs site needs them. Icons render with a 1.5 stroke (--sds-icon-stroke),
 * applied by @stefan-florescu/ui/styles.css.
 */
export type { LucideIcon, LucideProps } from "lucide-react";

export {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleX,
  Clock,
  Copy,
  CornerDownLeft,
  Download,
  FileText,
  GitBranch,
  House,
  Info,
  Link,
  LoaderCircle,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Minus,
  Moon,
  Paperclip,
  Pause,
  Play,
  Plus,
  Search,
  SendHorizontal,
  Settings,
  SquarePen,
  Star,
  Sun,
  TriangleAlert,
  Upload,
  User,
  Wallet,
  X,
} from "lucide-react";
