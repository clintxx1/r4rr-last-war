"use client"
import React from "react"

type ThemeProviderProps = {
    attribute: string
    defaultTheme: string
    enableSystem: boolean
    disableTransitionOnChange: boolean
    children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    attribute,
    defaultTheme,
    enableSystem,
    disableTransitionOnChange,
    children,
}) => {
    // Mock implementation of ThemeProvider
    React.useEffect(() => {
        document.documentElement.setAttribute(attribute, defaultTheme)
    }, [attribute, defaultTheme])

    return <>{children}</>
}