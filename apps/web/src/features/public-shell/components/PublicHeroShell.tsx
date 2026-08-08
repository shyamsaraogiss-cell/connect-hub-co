import { Suspense, type ReactNode } from "react";import { PublicHeroSidebar } from "./PublicHeroSidebar";import styles from "../PublicHeroShell.module.css";
// =======================================
// SITARAM HERO MASTER v1.1
// PERMANENTLY LOCKED
// DO NOT MODIFY WITHOUT EXPLICIT APPROVAL
// FIXED SHELL
// =======================================
export function PublicHeroShell({children}:{children:ReactNode}){return <div className={styles.shell}><div className={styles.layout}>{/* FIXED SITARAM SHELL — DO NOT MODIFY */}<Suspense fallback={<div className={styles.sidebar} aria-hidden="true" />}><PublicHeroSidebar/></Suspense><div className={styles.content}>{children}</div></div></div>}
