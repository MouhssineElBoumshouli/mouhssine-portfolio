import { HatchRule } from "@/components/layout/rules"
import { InteractiveDots } from "@/components/home/interactive-dots"
import { Hero } from "@/components/home/hero"
import { About } from "@/components/home/about"
import { Connect } from "@/components/home/connect"
import { ExperienceSection } from "@/components/home/experience"
import { ProjectsSection } from "@/components/home/projects-section"
import { Stack } from "@/components/home/stack"
import { GitHubActivity } from "@/components/home/github-activity"
import { Achievements } from "@/components/home/milestones"
import { SkillsVenn } from "@/components/common/skills-venn"
import { CTA } from "@/components/home/cta"
import StructuredData from "@/components/structured-data"
import type { Locale } from "@/lib/i18n/config"

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <StructuredData locale={locale} />
      <main>
        <InteractiveDots className="screen-line-bottom h-24 w-full sm:h-32" />
        <Hero locale={locale} />

        <HatchRule />
        <About locale={locale} />

        <HatchRule />
        <Connect locale={locale} />

        <HatchRule />
        <ExperienceSection locale={locale} />

        <HatchRule />
        <GitHubActivity />

        <HatchRule />
        <ProjectsSection locale={locale} />

        <HatchRule />
        <Stack locale={locale} />

        <HatchRule />
        <Achievements locale={locale} />

        <SkillsVenn locale={locale}>
          <CTA locale={locale} />
        </SkillsVenn>
      </main>
    </>
  )
}

export default HomePage

