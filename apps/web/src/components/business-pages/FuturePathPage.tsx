import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BusinessPageFrame } from './BusinessPageShell';
import styles from './FuturePathPage.module.css';

export function FuturePathPage({ eyebrow, title, description, breadcrumb, children, heroLogo }: { eyebrow: string; title: string; description: string; breadcrumb: readonly { label: string; href?: string }[]; children?: ReactNode; heroLogo?: { src: string; alt: string } }) {
  return <BusinessPageFrame breadcrumb={breadcrumb} className={styles.page}><section className={styles.hero}><div className={styles.heroCopy}><p>{eyebrow}</p><h1>{title}</h1><p>{description}</p><div><Link href="/contact">Raise an Inquiry</Link><Link href="/pitru-moksha-gaya">Return to PitruMoksha Gaya</Link></div></div>{heroLogo ? <div className={styles.heroLogo}><Image src={heroLogo.src} alt={heroLogo.alt} width={280} height={280} priority sizes="(max-width: 600px) 190px, (max-width: 900px) 220px, 280px" /></div> : null}</section>{children}</BusinessPageFrame>;
}
