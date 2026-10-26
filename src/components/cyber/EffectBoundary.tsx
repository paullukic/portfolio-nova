import { Component, type ReactNode } from "react";

/**
 * Catches a failed lazy effect (chunk download error, WebGL context failure)
 * and renders `fallback` instead, so an optional effect can never blank the
 * whole page. Wrap it around the effect's <Suspense>.
 */
export class EffectBoundary extends Component<{ fallback?: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
