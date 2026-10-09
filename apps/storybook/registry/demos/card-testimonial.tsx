import { Avatar } from "@stefan-florescu/ui";

const testimonials = [
  {
    title: "Very easy this was to integrate",
    quote: "If you care for your time, I hands down would go with this.",
    name: "Bonnie Green",
    role: "Developer at Open AI",
    avatar: "/avatars/3.svg",
    className: "border-b rounded-t-base md:rounded-t-none md:rounded-ss-base md:border-e",
  },
  {
    title: "Solid foundation for any project",
    quote:
      "Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!",
    name: "Roberta Casas",
    role: "Lead designer at Dropbox",
    avatar: "/avatars/4.svg",
    className: "border-b md:rounded-se-base",
  },
  {
    title: "Mindblowing workflow",
    quote:
      "Aesthetically, the well designed components are beautiful and will undoubtedly level up your app.",
    name: "Jese Leos",
    role: "Software Engineer at Facebook",
    avatar: "/avatars/1.svg",
    className: "border-b md:rounded-es-base md:border-b-0 md:border-e",
  },
  {
    title: "Efficient Collaborating",
    quote: "You have many examples that can be used to create a fast prototype for your team.",
    name: "Joseph McFall",
    role: "CTO at Google",
    avatar: "/avatars/2.svg",
    className: "rounded-b-base md:rounded-se-base",
  },
];

export default function CardTestimonial() {
  return (
    <div className="bg-neutral-primary-soft border-default rounded-base grid w-full border shadow-xs md:grid-cols-2">
      {testimonials.map(({ title, quote, name, role, avatar, className }) => (
        <figure
          key={name}
          className={`border-default flex flex-col items-center justify-center p-8 text-center ${className}`}
        >
          <blockquote className="text-body mx-auto mb-4 max-w-2xl lg:mb-8">
            <h3 className="text-heading text-lg font-semibold">{title}</h3>
            <p className="my-4">&ldquo;{quote}&rdquo;</p>
          </blockquote>
          <figcaption className="flex items-center justify-center">
            <Avatar src={avatar} alt="" className="size-9" />
            <div className="ms-2 space-y-0.5 text-left rtl:text-right">
              <div className="text-heading mb-0.5 text-base leading-tight font-medium">{name}</div>
              <div className="text-body text-sm">{role}</div>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
