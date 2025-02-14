import React from "react"

import classNames from "classnames"

import styles from "./ErrorBoundary.module.scss"

interface State {
    hasError: boolean
}

export interface Props {
    className?: string
    onError: (error: Error, errorInfo: any) => void
}

export default class ErrorBoundary extends React.Component<any, State> {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error boundary caught an error:", error, errorInfo)
        this.props.onError?.(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <div className={classNames(styles.error, this.props.className)} />
        }

        return this.props.children || null
    }
}
