import { ArrowUpRight } from "@stefan-florescu/icons";
import { buttonVariants } from "@stefan-florescu/ui";

export default function ButtonAsLink() {
  return (
    <a
      href="https://github.com/stefan-florescu/global-design-system"
      className={buttonVariants({ variant: "outline" })}
    >
      View on GitHub
      <ArrowUpRight aria-hidden />
    </a>
  );
}
