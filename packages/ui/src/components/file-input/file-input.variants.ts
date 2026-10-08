/*
 * File field: the shared field styles with the browser's "Choose file" button restyled as a
 * `muted` segment. The dropzone is a dashed `input` border on `muted`, with the native file
 * input stretched over it so clicking, keyboard and drag-and-drop all work without script.
 */
export const fileInputClassName = [
  "cursor-pointer p-0 pe-3 text-muted-foreground",
  "file:me-3 file:h-full file:cursor-pointer file:border-0 file:border-e file:border-solid file:border-input",
  "file:bg-muted file:px-4 file:text-sm file:font-medium file:text-foreground hover:file:bg-accent",
].join(" ");

export const fileDropzoneClassName = [
  "relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg",
  "border-2 border-dashed border-input bg-muted px-6 py-10 text-center",
  "transition-colors hover:bg-accent motion-reduce:transition-none",
  "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring",
  "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
].join(" ");
