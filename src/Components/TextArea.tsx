interface TextAreaProps{
  className?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  cols?: number
}

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  placeholder,
  value,
  onChange,
  rows = 3,
  cols,
}: TextAreaProps) => {
  return (
    <textarea
      className={`bg-transparent border-none text-white placeholder-gray-500 p-3 resize-none outline-none font-sukhumvit ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      cols={cols}
    />
  )
}
