export const FILE_TYPES = {
  typescript: {
    extensions: [".ts", ".tsx"],
    language: "typescript",
    icon: "⚛️",
  },
  javascript: {
    extensions: [".js", ".jsx"],
    language: "javascript",
    icon: "📜",
  },
  css: {
    extensions: [".css", ".scss", ".sass"],
    language: "css",
    icon: "🎨",
  },
  html: {
    extensions: [".html", ".htm"],
    language: "html",
    icon: "🌐",
  },
  json: {
    extensions: [".json"],
    language: "json",
    icon: "📋",
  },
  markdown: {
    extensions: [".md", ".mdx"],
    language: "markdown",
    icon: "📝",
  },
  image: {
    extensions: [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"],
    language: "text",
    icon: "🖼️",
  },
  config: {
    extensions: [".config.js", ".config.ts", ".json", ".yaml", ".yml", ".toml"],
    language: "json",
    icon: "⚙️",
  },
};

export function getFileType(filename: string): string {
  const ext = filename.includes(".")
    ? "." + filename.split(".").pop()?.toLowerCase()
    : "";

  for (const [type, config] of Object.entries(FILE_TYPES)) {
    if (config.extensions.includes(ext)) {
      return type;
    }
  }

  return "text";
}

export function getLanguage(filename: string): string {
  const ext = filename.includes(".")
    ? "." + filename.split(".").pop()?.toLowerCase()
    : "";

  for (const [type, config] of Object.entries(FILE_TYPES)) {
    if (config.extensions.includes(ext)) {
      return config.language;
    }
  }

  return "text";
}

export function getFileIcon(filename: string): string {
  const type = getFileType(filename);
  return FILE_TYPES[type as keyof typeof FILE_TYPES]?.icon || "📄";
}
