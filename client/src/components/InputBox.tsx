interface InputBoxProps {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
}

export default function InputBox({
  value,
  onValueChange,
  onSubmit,
}: InputBoxProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="group flex h-10 items-center gap-2 border-2 border-[inset_#57031A] bg-palette-black px-3 font-mono text-palette-bone transition duration-200 focus-within:border-palette-main [border-style:inset]"
    >
      <span aria-hidden="true" className="text-sm text-palette-bone">
        ⌕
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        aria-label="Search movies"
        placeholder="Search movies..."
        className="min-w-0 flex-1 bg-transparent text-sm text-palette-bone placeholder:text-palette-muted focus:outline-none"
      />
    </form>
  );
}
