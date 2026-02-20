'use client'

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react'
import TerminalWindow from './TerminalWindow'
import TypingIndicator from './TypingIndicator'
import { COMMANDS, COMMAND_LIST } from '@/lib/commands'
import type { TermLine, TermLineType } from '@/types'

interface OutputLine {
  id: number
  type: 'user' | TermLineType | 'typing' | 'space'
  text?: string
}

const lineClass: Record<string, string> = {
  user: 'text-amber',
  response: 'text-green',
  info: 'text-cyan',
  error: 'text-hacker-red',
  warn: 'text-amber',
  space: 'opacity-0 select-none',
}

let idCounter = 0
const nextId = () => ++idCounter

const INITIAL_LINES: OutputLine[] = [
  { id: nextId(), type: 'info', text: "Welcome to Pratik's interactive portfolio terminal." },
  { id: nextId(), type: 'response', text: "Type 'help' to see available commands. Type 'clear' to reset." },
  { id: nextId(), type: 'space', text: ' ' },
]

interface InteractiveTerminalProps {
  onToggleMatrix?: () => void
}

export default function InteractiveTerminal({ onToggleMatrix }: InteractiveTerminalProps) {
  const [lines, setLines] = useState<OutputLine[]>(INITIAL_LINES)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [])

  useEffect(scrollBottom, [lines, scrollBottom])

  const addLines = useCallback((newLines: OutputLine[]) => {
    newLines.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line])
      }, i * 80)
    })
  }, [])

  const handleCommand = useCallback(
    (cmd: string) => {
      const clean = cmd.trim().toLowerCase()
      if (!clean) return

      setHistory((prev) => [cmd, ...prev])
      setHistIdx(-1)

      // Echo user
      const userLine: OutputLine = { id: nextId(), type: 'user', text: cmd }
      setLines((prev) => [...prev, userLine])

      if (clean === 'clear') {
        setTimeout(() => setLines([]), 100)
        return
      }

      // Show typing indicator
      const typingId = nextId()
      setLines((prev) => [...prev, { id: typingId, type: 'typing' }])

      setTimeout(() => {
        // Remove typing indicator
        setLines((prev) => prev.filter((l) => l.id !== typingId))

        const handler = COMMANDS[clean]
        if (handler) {
          const result = handler()
          if ('type' in result && result.type === 'matrix') {
            onToggleMatrix?.()
            addLines([{ id: nextId(), type: 'info', text: '> Matrix rain toggled.' }])
          } else if (Array.isArray(result)) {
            const outputLines: OutputLine[] = (result as TermLine[]).map((l) => ({
              id: nextId(),
              type: l.cls as TermLineType,
              text: l.txt || ' ',
            }))
            addLines(outputLines)
          }
        } else {
          addLines([
            { id: nextId(), type: 'error', text: `bash: ${cmd}: command not found` },
            { id: nextId(), type: 'response', text: 'Type "help" for available commands.' },
          ])
        }

        // Trailing space
        setTimeout(() => {
          setLines((prev) => [...prev, { id: nextId(), type: 'space', text: ' ' }])
        }, (Array.isArray(COMMANDS[clean]?.()) ? (COMMANDS[clean]() as TermLine[]).length : 2) * 80 + 100)
      }, 600)
    },
    [addLines, onToggleMatrix]
  )

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx((prev) => {
        const next = Math.min(prev + 1, history.length - 1)
        setInput(history[next] ?? '')
        return next
      })
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx((prev) => {
        const next = prev - 1
        if (next < 0) { setInput(''); return -1 }
        setInput(history[next] ?? '')
        return next
      })
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const typed = input.toLowerCase()
      const match = COMMAND_LIST.find((k) => k.startsWith(typed))
      if (match) setInput(match)
    }
  }

  return (
    <TerminalWindow title="visitor@pratik-portfolio:~$" statusText="interactive shell v1.0">
      {/* Output area */}
      <div
        ref={outputRef}
        className="h-[350px] overflow-y-auto font-mono text-sm leading-7 mb-0 scroll-smooth"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#003d0d #000d00' }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) =>
          line.type === 'typing' ? (
            <div key={line.id}>
              <TypingIndicator />
            </div>
          ) : (
            <div
              key={line.id}
              className={`${lineClass[line.type] ?? 'text-green'} ${
                line.type === 'user' ? 'before:content-["visitor@portfolio:~$_"] before:text-green' : ''
              }`}
            >
              {line.type === 'user' && (
                <span className="text-green mr-1">visitor@portfolio:~$</span>
              )}{' '}
              {line.text}
            </div>
          )
        )}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 pt-3 border-t border-green-dark">
        <span className="font-mono text-sm text-green whitespace-nowrap">
          visitor@pratik:~$&nbsp;
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-amber placeholder-green-dim/40 caret-green"
          style={{ cursor: 'none' }}
        />
      </div>

      {/* Hint */}
      <div className="font-mono text-[0.72rem] text-green-dim tracking-wide pt-2">
        try: help | about | skills | projects | contact | experience | jokes | secret
      </div>
    </TerminalWindow>
  )
}
