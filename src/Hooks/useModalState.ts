"use client"

import { useState } from "react"

export const useModalState = () => {
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false)
  const [isItemsModalOpen, setItemsModalOpen] = useState(false)

  const toggleLeaveModal = () => setLeaveModalOpen(!isLeaveModalOpen)
  const toggleItemsModal = () => setItemsModalOpen(!isItemsModalOpen)

  return {
    isLeaveModalOpen,
    isItemsModalOpen,
    toggleLeaveModal,
    toggleItemsModal,
    setLeaveModalOpen,
    setItemsModalOpen,
  }
}
