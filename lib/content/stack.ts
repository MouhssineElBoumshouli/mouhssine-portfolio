export type StackCategory = {
  id: string
  category: string
  /** href is kept as source context; chips remain non-navigational like the reference. */
  skills: { title: string; href: string; icon: string }[]
}

export const stack: StackCategory[] = [
  {
    id: "01",
    category: "Languages",
    skills: [
      { title: "Python", href: "https://www.python.org/", icon: "python" },
      { title: "TypeScript", href: "https://www.typescriptlang.org/", icon: "typescript" },
      { title: "C", href: "https://en.wikipedia.org/wiki/C_(programming_language)", icon: "c" },
      { title: "C++", href: "https://isocpp.org/", icon: "cplusplus" },
      { title: "Java", href: "https://www.java.com/", icon: "java" },
      { title: "SQL", href: "https://en.wikipedia.org/wiki/SQL", icon: "generic-sql" },
      { title: "R", href: "https://www.r-project.org/", icon: "r" },
      { title: "MATLAB", href: "https://www.mathworks.com/products/matlab.html", icon: "matlab" },
      { title: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", icon: "html5" },
      { title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", icon: "css" },
    ],
  },
  {
    id: "02",
    category: "AI & Computer Vision",
    skills: [
      { title: "LLM integration", href: "https://platform.openai.com/docs/overview", icon: "generic-ai" },
      { title: "OpenAI APIs", href: "https://platform.openai.com/docs/api-reference", icon: "generic-api" },
      { title: "OpenCV", href: "https://opencv.org/", icon: "opencv" },
      { title: "NumPy", href: "https://numpy.org/", icon: "numpy" },
      { title: "pandas", href: "https://pandas.pydata.org/", icon: "pandas" },
      { title: "scikit-learn", href: "https://scikit-learn.org/", icon: "scikitlearn" },
    ],
  },
  {
    id: "03",
    category: "Backend & Web",
    skills: [
      { title: "FastAPI", href: "https://fastapi.tiangolo.com/", icon: "fastapi" },
      { title: "SQLAlchemy", href: "https://www.sqlalchemy.org/", icon: "sqlalchemy" },
      { title: "Pydantic", href: "https://docs.pydantic.dev/", icon: "pydantic" },
      { title: "PostgreSQL", href: "https://www.postgresql.org/", icon: "postgresql" },
      { title: "Prisma", href: "https://www.prisma.io/", icon: "prisma" },
      { title: "React", href: "https://react.dev/", icon: "react" },
      { title: "Next.js", href: "https://nextjs.org/", icon: "nextdotjs" },
      { title: "REST APIs", href: "https://developer.mozilla.org/en-US/docs/Glossary/REST", icon: "generic-api" },
    ],
  },
  {
    id: "04",
    category: "Tools & Quality",
    skills: [
      { title: "Docker", href: "https://www.docker.com/", icon: "docker" },
      { title: "Nginx", href: "https://nginx.org/", icon: "nginx" },
      { title: "Git", href: "https://git-scm.com/", icon: "git" },
      { title: "GitHub", href: "https://github.com/", icon: "github" },
      { title: "Linux", href: "https://www.linux.org/", icon: "linux" },
      { title: "pytest", href: "https://pytest.org/", icon: "pytest" },
      { title: "Vitest", href: "https://vitest.dev/", icon: "vitest" },
      { title: "Ruff", href: "https://docs.astral.sh/ruff/", icon: "ruff" },
      { title: "mypy", href: "https://mypy.readthedocs.io/", icon: "mypy" },
      { title: "ESLint", href: "https://eslint.org/", icon: "eslint" },
      { title: "Vercel", href: "https://vercel.com/", icon: "vercel" },
    ],
  },
]
