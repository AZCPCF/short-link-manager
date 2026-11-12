import type { ErrorKey } from "@/lib/errors";

const errors: Record<ErrorKey, string> = {
  generic: "Something went wrong. Please try again.",
  validation: "Please fix the highlighted fields.",
  invalidCredentials: "Invalid email or password.",
  signUpFailed:
    "Could not create the account. This email may already be in use.",
  invalidLink: "Invalid link.",
  slugGenerationFailed: "Could not generate a unique link. Please try again.",
  slugTaken: "That slug is already taken.",
  nameRequired: "Name is required.",
  emailInvalid: "Enter a valid email address.",
  passwordTooShort: "Password must be at least 8 characters.",
  passwordRequired: "Password is required.",
  urlInvalid: "Enter a valid http(s) URL.",
  slugTooLong: "Slug can be at most 64 characters.",
  slugInvalid: "Use only letters, numbers and dashes.",
  titleTooLong: "Title can be at most 120 characters.",
};

const en = {
  Metadata: {
    description: "Create short links and track their clicks.",
  },
  Common: {
    close: "Close",
    tryAgain: "Try again",
    goHome: "Go home",
    back: "Back",
  },
  LocaleSwitcher: {
    label: "Change language",
  },
  ThemeToggle: {
    label: "Toggle theme",
  },
  Errors: errors,
  ErrorState: {
    title: "Something went wrong",
    description: "We couldn't load this page. Please try again.",
  },
  NotFound: {
    title: "Link not found",
    description: "This link doesn't exist or has been removed.",
  },
  Auth: {
    email: "Email",
    password: "Password",
    login: {
      title: "Log in",
      description: "Welcome back. Enter your details to continue.",
      submit: "Log in",
      submitting: "Logging in...",
      noAccount: "No account?",
      signUpLink: "Sign up",
    },
    signup: {
      title: "Create account",
      description: "Sign up to start creating short links.",
      name: "Name",
      passwordHint: "At least 8 characters.",
      submit: "Create account",
      submitting: "Creating account...",
      haveAccount: "Already have an account?",
      loginLink: "Log in",
    },
    logout: {
      submit: "Log out",
      submitting: "Logging out...",
    },
  },
  Dashboard: {
    signedInAs: "Signed in as <b>{name}</b>",
    title: "Your links",
    description: "Create, share and track your short links.",
  },
  Links: {
    new: "New link",
    create: {
      title: "New short link",
      description: "Leave the slug empty to get a random 6-character one.",
      destinationUrl: "Destination URL",
      destinationPlaceholder: "https://example.com/a/very/long/url",
      slug: "Custom slug (optional)",
      slugPlaceholder: "my-link",
      slugHint: "Letters, numbers and dashes only.",
      titleLabel: "Title (optional)",
      titlePlaceholder: "My link",
      submit: "Create link",
      submitting: "Creating...",
      success: "Link created.",
    },
    empty: {
      title: "No links yet",
      description:
        "Create your first short link and start tracking its clicks.",
    },
    table: {
      link: "Link",
      destination: "Destination",
      clicks: "Clicks",
      created: "Created",
      actions: "Actions",
    },
    copy: {
      label: "Copy short link /r/{slug}",
      success: "Short link copied.",
      error: "Could not copy the link.",
    },
    delete: {
      label: "Delete /r/{slug}",
      title: "Delete this link?",
      description:
        "<path>/r/{slug}</path> will stop working and its click history will be permanently deleted. This can't be undone.",
      cancel: "Cancel",
      confirm: "Delete",
      confirming: "Deleting...",
      success: "Link deleted.",
    },
    detail: {
      back: "Back to dashboard",
      destination: "Destination",
      totalClicks: "Total clicks",
      created: "Created",
      chartTitle: "Clicks per day",
      chartDescription: "Last 7 days (UTC)",
      chartLabel: "Clicks per day for the last 7 days",
      tooltipClicks: "Clicks",
    },
  },
  landing: {
    brand: "Short Link Manager",
    nav: {
      login: "Log in",
      signup: "Sign up",
      dashboard: "Dashboard",
    },
    hero: {
      badge: "Short links, simple stats",
      title: "Turn long URLs into short links you can track",
      subtitle:
        "Short Link Manager lets you create clean, memorable links, share them anywhere, and see how many people open them.",
      continue: "Continue",
      learnMore: "How it works",
    },
    features: {
      title: "Everything you need to manage your links",
      subtitle: "A small, focused toolkit: create, share, track and clean up.",
      create: {
        title: "Create in seconds",
        description:
          "Paste a long URL and get a short link instantly. Add a custom slug and an optional title, or let the app generate a random 6-character slug.",
      },
      track: {
        title: "Count every click",
        description:
          "Every visit to your short link is counted, so you always know how many times it was opened.",
      },
      chart: {
        title: "The last 7 days at a glance",
        description:
          "Open any link to see its destination, total clicks, creation date and a clicks-per-day chart for the past week.",
      },
      manage: {
        title: "One simple dashboard",
        description:
          "See all your links in one place, copy the short URL with one click, and delete links you no longer need.",
      },
      secure: {
        title: "Private to your account",
        description:
          "Sign in with your email and password. Your links and their stats are visible only to you.",
      },
      comfort: {
        title: "Made for any screen",
        description:
          "A responsive layout, light and dark themes, and an English and Persian interface.",
      },
    },
    how: {
      title: "How it works",
      step1: {
        title: "Create an account",
        description:
          "Sign up with your email and a password. It only takes a few seconds.",
      },
      step2: {
        title: "Create a link",
        description:
          "Paste the long URL and, if you like, add a custom slug and a title.",
      },
      step3: {
        title: "Share and track",
        description:
          "Share the short link anywhere. Clicks are counted automatically and shown in your dashboard.",
      },
    },
    footer: {
      tagline: "A small short link app built with Next.js.",
    },
  },
};

export type Messages = typeof en;

export default en;
