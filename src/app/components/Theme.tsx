import { createContext, ReactNode, useState, useEffect, useContext } from "react"

interface ThemeContextType {
	theme: string
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState(() => {
		if (typeof window === "undefined") return "light"
		return localStorage.getItem("theme") || "light"
	})

    useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme)
	}, [theme])

    const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light"
		localStorage.setItem("theme", newTheme)
		setTheme(newTheme)
		document.documentElement.setAttribute("data-theme", newTheme)
	}

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
