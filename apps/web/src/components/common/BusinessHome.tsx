import { HeroOneImagePreview } from '@/features/hero/components/HeroOneImagePreview';
import { GenZRitualAIEngine } from '@/features/ai/components/GenZRitualAIEngine';
import { PublicHeroShell } from '@/features/public-shell';

export function BusinessHome() {
  return (
    <PublicHeroShell fullWidth>
      <div
        aria-label="Landing page central workspace scaffold"
        className="relative grid h-[544px] w-full grid-cols-[minmax(0,1fr)_324px] grid-rows-[400px_3px_60px_3px_78px] gap-x-3"
      >
        <section
          aria-label="Hero 1 image preview area"
          className="col-start-1 row-start-1 h-[400px] w-full overflow-hidden border border-[#D4AF37]"
        >
          <HeroOneImagePreview />
        </section>

        <section
          aria-label="AI panel area"
          className="col-start-2 row-start-1 h-[400px] w-[324px] overflow-hidden border-2 border-[#7A5FE0] bg-[#07162f] shadow-[0_0_0_1px_#D4AF37,0_12px_28px_rgba(4,12,35,.28)]"
        >
          <GenZRitualAIEngine category="pitru-moksha-gaya" compact />
        </section>

        <section
          aria-label="Explore strip area"
          className="relative col-span-2 row-start-3 flex h-[60px] min-w-0 w-full items-center justify-center overflow-hidden bg-[#DDBE7A]"
        >
          <div className="flex min-w-0 flex-col items-center justify-center whitespace-nowrap text-center">
            <strong className="font-serif text-[13px] font-semibold leading-[16px] tracking-[0.035em] text-[#603717]">
              Explore The Land of Moksha, Gaya
            </strong>
            <span className="text-[16.5px] font-bold leading-[23px] tracking-[0.003em] text-[#28170E]">
              Moksha journey is a duty of love. Let us handle the logistics, you perform your duty.
            </span>
          </div>
        </section>

        <section
          aria-label="Core Services area"
          className="col-span-2 row-start-5 grid grid-cols-10 gap-0 shadow-[inset_0_0_0_1px_#D4AF37]"
        >
          {Array.from({ length: 10 }, (_, index) => (
            <div
              className={index < 9 ? 'border-r border-[#D4AF37]' : undefined}
              aria-hidden="true"
              key={index}
            />
          ))}
        </section>
      </div>
    </PublicHeroShell>
  );
}
