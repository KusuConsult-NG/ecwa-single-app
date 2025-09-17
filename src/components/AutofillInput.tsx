"use client"

import { useAutofill } from '@/hooks/useAutofill'
import { useState, useRef, useEffect } from 'react'

interface AutofillInputProps {
  fieldName: string
  type?: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  className?: string
  style?: React.CSSProperties
  maxSuggestions?: number
}

export default function AutofillInput({
  fieldName,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  onBlur,
  onFocus,
  className = '',
  style = {},
  maxSuggestions = 5
}: AutofillInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const {
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    handleSuggestionSelect,
    handleInputBlur,
    handleInputFocus,
    clearSuggestions
  } = useAutofill(fieldName, maxSuggestions)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionSelect(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleInputChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    handleInputChange(newValue)
  }

  const handleFocus = () => {
    setIsFocused(true)
    handleInputFocus()
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    handleInputBlur()
    onBlur?.()
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSuggestionSelect(suggestion)
    inputRef.current?.focus()
  }

  // Update suggestions when value changes
  useEffect(() => {
    if (value) {
      handleInputChange(value)
    }
  }, [value, handleInputChange])

  return (
    <div className="autofill-container" style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleInputChangeWrapper}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={className}
        style={style}
        autoComplete="off"
      />
      
      {showSuggestions && suggestions.length > 0 && isFocused && (
        <div
          ref={suggestionsRef}
          className="autofill-suggestions"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid var(--line)',
            borderTop: 'none',
            borderRadius: '0 0 var(--radius-input) var(--radius-input)',
            boxShadow: 'var(--shadow-pop)',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`autofill-suggestion ${
                index === selectedIndex ? 'selected' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                borderBottom: index < suggestions.length - 1 ? '1px solid var(--line)' : 'none',
                backgroundColor: index === selectedIndex ? 'var(--bg)' : 'transparent',
                color: 'var(--text)',
                fontSize: '14px'
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {suggestion}
            </div>
          ))}
          <div
            style={{
              padding: '0.5rem 1rem',
              borderTop: '1px solid var(--line)',
              fontSize: '12px',
              color: 'var(--muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Previous entries</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                clearSuggestions()
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--danger)',
                cursor: 'pointer',
                fontSize: '12px',
                textDecoration: 'underline'
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
