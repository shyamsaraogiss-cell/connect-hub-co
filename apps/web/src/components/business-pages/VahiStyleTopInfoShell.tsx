import Image from 'next/image';
import type { ReactNode } from 'react';

import vahiStyles from './vahi-records/VahiApprovedContent.module.css';

export function VahiStyleTopInfoShell({ imageSrc, secondaryImageSrc, imageAlign, imageFit = "contain", imageUnmasked = false, children }: { readonly imageSrc?: string; readonly secondaryImageSrc?: string; readonly imageAlign?: "left" | "center"; readonly imageFit?: "contain" | "cover" | "fill"; readonly imageUnmasked?: boolean; readonly children?: ReactNode }) {
  return (
    <section
      className={`${vahiStyles.intro} h-[237px] ${imageSrc ? `relative w-full overflow-hidden !m-0 !p-0 ${imageUnmasked ? '' : 'bg-[#01090F]'}` : ''}`}
      aria-hidden="true"
    >
      {imageSrc && secondaryImageSrc ? (
        <div className="flex h-full w-full gap-0">
          {[imageSrc, secondaryImageSrc].map((src) => (
            <div className="relative h-full w-1/2 overflow-hidden" key={src}>
              <Image alt="" className="object-cover object-center" fill loading="eager" sizes="50vw" src={src} />
            </div>
          ))}
        </div>
      ) : imageSrc ? (
        <Image
          alt=""
          loading="eager"
        className={`block h-full w-full ${imageUnmasked ? "opacity-100 brightness-100 filter-none" : ""} ${imageFit === "cover" ? "object-cover" : imageFit === "fill" ? "object-fill" : "object-contain"} ${imageAlign === "left" ? "object-left" : "object-center"}`}
          height={834}
          src={imageSrc}
          width={1886}
        />
      ) : null}
      {children}
    </section>
  );
}

