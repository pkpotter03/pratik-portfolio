import { ReactNode } from 'react'

interface TerminalWindowProps {
  title?: string
  statusText?: string
  children: ReactNode
  className?: string
}

export default function TerminalWindow({
  title = 'terminal',
  statusText,
  children,
  className = '',
}: TerminalWindowProps) {
  return (
    <div
      className={`border border-green-dark font-mono ${className}`}
      style={{ background: '#000d00' }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-green-dark bg-green-dark">
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-green-dim text-[0.7rem] truncate max-w-[120px] sm:max-w-none">{title}</span>
        {statusText && (
          <span className="text-green-dim text-[0.7rem]">{statusText}</span>
        )}
      </div>

      {/* Body */}
      <div className="p-3 md:p-6">{children}</div>
    </div>
  )
}
