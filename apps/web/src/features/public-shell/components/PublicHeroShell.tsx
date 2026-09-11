import { Suspense, type ReactNode } from "react";import { PublicHeroSidebar } from "./PublicHeroSidebar";import styles from "../PublicHeroShell.module.css";
// =======================================
// SITARAM HERO MASTER v1.1
// PERMANENTLY LOCKED
// DO NOT MODIFY WITHOUT EXPLICIT APPROVAL
// FIXED SHELL
// =======================================
export function PublicHeroShell({children,fullWidth = false,showSidebar = false}:{children:ReactNode;fullWidth?:boolean;showSidebar?:boolean}){return <div className={styles.shell}><div className={`${styles.layout} ${fullWidth ? styles.fullWidthLayout : ''} ${showSidebar ? '' : styles.withoutSidebar}`}>{/* FIXED SITARAM SHELL — DO NOT MODIFY */}{showSidebar ? <Suspense fallback={<div className={styles.sidebar} aria-hidden="true" />}><PublicHeroSidebar/></Suspense> : null}<div className={styles.content}>{children}</div></div></div>}
