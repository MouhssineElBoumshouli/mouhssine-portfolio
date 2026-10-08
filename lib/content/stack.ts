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
      { title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "javascript" },
      { title: "C", href: "https://en.wikipedia.org/wiki/C_(programming_language)", icon: "c" },
      { title: "C++", href: "https://isocpp.org/", icon: "cplusplus" },
      { title: "Java", href: "https://www.java.com/", icon: "java" },
      { title: "SQL", href: "https://en.wikipedia.org/wiki/SQL", icon: "generic-sql" },
    ],
  },
  {
    id: "02",
    category: "AI & Data",
    skills: [
      { title: "OpenAI APIs", href: "https://platform.openai.com/docs/api-reference", icon: "generic-api" },
      { title: "Gemini API", href: "https://ai.google.dev/gemini-api/docs", icon: "generic-ai" },
      { title: "OpenCV", href: "https://opencv.org/", icon: "opencv" },
      { title: "NumPy", href: "https://numpy.org/", icon: "numpy" },
      { title: "pandas", href: "https://pandas.pydata.org/", icon: "pandas" },
      { title: "scikit-learn", href: "https://scikit-learn.org/", icon: "scikitlearn" },
    ],
  },
  {
    id: "03",
    category: "Web, Mobile & Backend",
    skills: [
      { title: "FastAPI", href: "https://fastapi.tiangolo.com/", icon: "fastapi" },
      { title: "PostgreSQL", href: "https://www.postgresql.org/", icon: "postgresql" },
      { title: "React", href: "https://react.dev/", icon: "react" },
      { title: "Next.js", href: "https://nextjs.org/", icon: "nextdotjs" },
      { title: "React Native", href: "https://reactnative.dev/", icon: "react" },
      { title: "Expo", href: "https://expo.dev/", icon: "expo" },
      { title: "SQLite", href: "https://sqlite.org/", icon: "sqlite" },
    ],
  },
  {
    id: "04",
    category: "Tools & Testing",
    skills: [
      { title: "Docker", href: "https://www.docker.com/", icon: "docker" },
      { title: "Git", href: "https://git-scm.com/", icon: "git" },
      { title: "Linux", href: "https://www.linux.org/", icon: "linux" },
      { title: "pytest", href: "https://pytest.org/", icon: "pytest" },
      { title: "Vitest", href: "https://vitest.dev/", icon: "vitest" },
    ],
  },
]
