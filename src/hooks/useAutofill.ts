"use client"

import { useState, useEffect, useCallback } from 'react'

interface AutofillData {
  [key: string]: string[]
}

const STORAGE_KEY = 'ecwa_autofill_data'

export function useAutofill(fieldName: string, maxSuggestions: number = 5) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState('')

  // Load suggestions from localStorage
  const loadSuggestions = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: AutofillData = JSON.parse(stored)
        const fieldSuggestions = data[fieldName] || []
        setSuggestions(fieldSuggestions.slice(0, maxSuggestions))
      }
    } catch (error) {
      console.error('Error loading autofill suggestions:', error)
    }
  }, [fieldName, maxSuggestions])

  // Save suggestion to localStorage
  const saveSuggestion = useCallback((value: string) => {
    if (!value.trim()) return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const data: AutofillData = stored ? JSON.parse(stored) : {}
      
      if (!data[fieldName]) {
        data[fieldName] = []
      }

      // Remove if already exists and add to beginning
      data[fieldName] = data[fieldName].filter(item => item !== value)
      data[fieldName].unshift(value)
      
      // Keep only maxSuggestions
      data[fieldName] = data[fieldName].slice(0, maxSuggestions)
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      loadSuggestions()
    } catch (error) {
      console.error('Error saving autofill suggestion:', error)
    }
  }, [fieldName, maxSuggestions, loadSuggestions])

  // Filter suggestions based on input
  const filterSuggestions = useCallback((input: string) => {
    if (!input.trim()) {
      setSuggestions([])
      return
    }

    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    )
    setSuggestions(filtered)
  }, [suggestions])

  // Handle input change
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)
    filterSuggestions(value)
    setShowSuggestions(true)
  }, [filterSuggestions])

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
    saveSuggestion(suggestion)
  }, [saveSuggestion])

  // Handle input blur (hide suggestions after a delay)
  const handleInputBlur = useCallback(() => {
    setTimeout(() => setShowSuggestions(false), 200)
  }, [])

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    loadSuggestions()
    setShowSuggestions(true)
  }, [loadSuggestions])

  // Handle form submission
  const handleFormSubmit = useCallback((value: string) => {
    if (value.trim()) {
      saveSuggestion(value)
    }
    setShowSuggestions(false)
  }, [saveSuggestion])

  // Clear suggestions
  const clearSuggestions = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: AutofillData = JSON.parse(stored)
        delete data[fieldName]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error clearing suggestions:', error)
    }
  }, [fieldName])

  useEffect(() => {
    loadSuggestions()
  }, [loadSuggestions])

  return {
    suggestions,
    showSuggestions,
    setShowSuggestions,
    inputValue,
    setInputValue,
    handleInputChange,
    handleSuggestionSelect,
    handleInputBlur,
    handleInputFocus,
    handleFormSubmit,
    clearSuggestions
  }
}
