type IconName =
  | "search"
  | "bell"
  | "user"
  | "settings"
  | "discord"
  | "x"
  | "github"
  | "mail"
  | "filter"
  | "sort"
  | "heart"
  | "share"
  | "read"
  | "download"
  | "book"
  | "clock"
  | "pen"
  | "bolt"
  | "shield"
  | "star"
  | "ribbon"
  | "lock"
  | "comment"
  | "check"
  | "upload"
  | "queue"
  | "history"
  | "status"
  | "sliders"
  | "bookmark"
  | "back"
  | "arrow-left"
  | "arrow-right"
  | "close"
  | "message"
  | "stack";

type AppIconProps = {
  name: IconName;
  className?: string;
};

export function AppIcon({ name, className }: AppIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M6.5 16.5h11l-1.5-2.5v-3a4 4 0 1 0-8 0v3z" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19a7 7 0 0 1 14 0" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.1" />
          <path d="m12 2.8 1 .2.6 2.1a7.7 7.7 0 0 1 1.7.7l1.9-1.1.8.7-.6 2.1c.5.5.9 1.1 1.2 1.7l2.1.4.1 1.1-2 .8a7.5 7.5 0 0 1-.2 1.8l1.6 1.5-.5 1-2.1-.2a7 7 0 0 1-1.4 1.3l.2 2.1-1 .5-1.5-1.6a7.5 7.5 0 0 1-1.8.2l-.8 2-1.1-.1-.4-2.1a7.4 7.4 0 0 1-1.7-1.1l-2 .6-.7-.8 1.1-1.9a7.6 7.6 0 0 1-.7-1.7L2.8 12l.2-1 2.1-.6a7.6 7.6 0 0 1 .7-1.7L4.7 6.8l.7-.8 2.1.6A7 7 0 0 1 9.2 6l.4-2.1z" />
        </svg>
      );
    case "discord":
      return (
        <svg {...common}>
          <path d="M7 17c1.7 1.3 3.3 1.8 5 1.8S15.3 18.3 17 17l1-8c-1.3-1-2.6-1.6-4-1.8l-.8 1.4a8.4 8.4 0 0 0-2.4 0L10 7.2C8.6 7.4 7.3 8 6 9z" />
          <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M5 4h3.8l3.4 5 4.2-5H19l-5.4 6.3L19 20h-3.8l-3.7-5.4L7 20H5l5.5-6.4z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 6v-3.5a3 3 0 0 0-.8-2.2c2.7-.3 5.6-1.3 5.6-5.8A4.5 4.5 0 0 0 18.5 7a4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.6 3.5 5.6 3.8 5.6 3.8A4.2 4.2 0 0 0 5.5 7a4.5 4.5 0 0 0-1.3 3.5c0 4.5 2.9 5.5 5.6 5.8A3 3 0 0 0 9 18.5V22" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3.5" y="6" width="17" height="12" rx="2" />
          <path d="m5.5 8 6.5 5 6.5-5" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path d="M4 6h16" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
      );
    case "sort":
      return (
        <svg {...common}>
          <path d="M8 6h10" />
          <path d="M8 12h7" />
          <path d="M8 18h4" />
          <path d="m5 7 2-2 2 2M7 5v14" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="m12 20-1.4-1.2C5.4 14.2 2 11.1 2 7.3 2 4.4 4.3 2 7.2 2c1.7 0 3.4.8 4.5 2.1C12.9 2.8 14.6 2 16.3 2 19.2 2 21.5 4.4 21.5 7.3c0 3.8-3.4 6.9-8.6 11.5z" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="2.2" />
          <circle cx="6" cy="12" r="2.2" />
          <circle cx="18" cy="19" r="2.2" />
          <path d="m8 11 7.6-4.3M8 13l7.6 4.3" />
        </svg>
      );
    case "read":
    case "book":
    case "history":
      return (
        <svg {...common}>
          <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12.5v16H7a2.5 2.5 0 0 0-2.5 2.5z" />
          <path d="M7 3v18" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 4v10" />
          <path d="m8 10 4 4 4-4" />
          <path d="M5 19h14" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="m4 20 4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9z" />
          <path d="m13.5 6.5 4 4" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 5 13h5l-1 9 8-11h-5z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5.5 5.5v5.8c0 4.3 2.8 7.9 6.5 9.7 3.7-1.8 6.5-5.4 6.5-9.7V5.5z" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z" />
        </svg>
      );
    case "ribbon":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="m10 12-2 9 4-2 4 2-2-9" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="6" y="10" width="12" height="10" rx="2" />
          <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
        </svg>
      );
    case "comment":
    case "message":
      return (
        <svg {...common}>
          <path d="M5 6.5h14v9H9l-4 3z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="m8.5 12 2.3 2.3 4.7-4.8" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 20V8" />
          <path d="m7.5 12.5 4.5-4.5 4.5 4.5" />
          <path d="M5 4h14" opacity=".55" />
        </svg>
      );
    case "queue":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="3" rx="1.5" />
          <rect x="4" y="10.5" width="12" height="3" rx="1.5" />
          <rect x="4" y="16" width="8" height="3" rx="1.5" />
        </svg>
      );
    case "status":
      return (
        <svg {...common}>
          <path d="M5 16 9 12l3 2 6-7" />
          <path d="M5 19h14" opacity=".55" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <path d="M5 6h14M5 12h14M5 18h14" />
          <circle cx="9" cy="6" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="15" cy="12" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="11" cy="18" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...common}>
          <path d="M7 4h10v16l-5-3-5 3z" />
        </svg>
      );
    case "back":
    case "arrow-left":
      return (
        <svg {...common}>
          <path d="M19 12H5" />
          <path d="m11 18-6-6 6-6" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M7 7 17 17M17 7 7 17" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <path d="m12 4 8 4-8 4-8-4z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 16 8 4 8-4" />
        </svg>
      );
    default:
      return null;
  }
}
