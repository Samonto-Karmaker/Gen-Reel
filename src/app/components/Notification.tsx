"use client"

import { createContext, ReactNode, useContext, useState } from "react"

// Define the possible types of notifications
type NotificationType = "success" | "error" | "warning" | "info"

// Define the structure of a notification object
type Notification = {
    message: string
    type: NotificationType
    id: number
}

// Define the structure of the notification context
interface NotificationContextType {
    showNotification: (message: string, type: NotificationType) => void
}

// Helper function to get the appropriate CSS class based on the notification type
const getAlertClass = (type: NotificationType): string => {
    switch (type) {
        case "success":
            return "alert-success"
        case "error":
            return "alert-error"
        case "warning":
            return "alert-warning"
        case "info":
            return "alert-info"
        default:
            return "alert-info"
    }
}

// Create the notification context
const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
)

// Provider component to manage and provide notification state and functionality
export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notification, setNotification] = useState<Notification | null>(null)

    // Function to show a notification
    const showNotification = (message: string, type: NotificationType) => {
        const id = Date.now() // Generate a unique ID for the notification
        setNotification({ message, type, id }) // Set the notification state
        setTimeout(() => {
            setNotification(curr => (curr?.id === id ? null : curr)) // Clear the notification after 3 seconds
        }, 3000)
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <div className="toast toast-bottom toast-end z-[100]">
                    <div className={`alert ${getAlertClass(notification.type)}`}>
                        <span>{notification.message}</span>
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    )
}

// Custom hook to use the notification context
export function useNotification() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        )
    }
    return context
}