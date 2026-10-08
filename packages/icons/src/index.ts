/**
 * @stefan-florescu/icons — lucide.dev wrapper.
 *
 * Components must import icons from here, never from `lucide-react` directly, so
 * that size/stroke defaults, accessibility rules and the allowed icon set are
 * governed in one place. The visual spec (sizes, stroke width, optical
 * alignment) will be defined in a later phase.
 *
 * The allowed set is curated: add icons here (alphabetically) when a component
 * or the docs site needs them.
 */
export type { LucideIcon, LucideProps } from "lucide-react";

export {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  CornerDownLeft,
  FileText,
  GitBranch,
  LoaderCircle,
  Mail,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  X,
} from "lucide-react";
