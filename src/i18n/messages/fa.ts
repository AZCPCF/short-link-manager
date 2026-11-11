import type { ErrorKey } from "@/lib/errors";

import type { Messages } from "./en";

const errors: Record<ErrorKey, string> = {
  generic: "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
  validation: "لطفاً فیلدهای مشخص‌شده را اصلاح کنید.",
  invalidCredentials: "ایمیل یا رمز عبور نادرست است.",
  signUpFailed:
    "ساخت حساب ناموفق بود. ممکن است این ایمیل قبلاً استفاده شده باشد.",
  invalidLink: "لینک نامعتبر است.",
  slugGenerationFailed: "ساخت لینک یکتا ممکن نشد. لطفاً دوباره تلاش کنید.",
  slugTaken: "این شناسه (slug) قبلاً گرفته شده است.",
  nameRequired: "نام را وارد کنید.",
  emailInvalid: "یک ایمیل معتبر وارد کنید.",
  passwordTooShort: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
  passwordRequired: "رمز عبور را وارد کنید.",
  urlInvalid: "یک آدرس معتبر با http یا https وارد کنید.",
  slugTooLong: "شناسه (slug) حداکثر می‌تواند ۶۴ کاراکتر باشد.",
  slugInvalid: "فقط از حروف انگلیسی، عدد و خط تیره استفاده کنید.",
  titleTooLong: "عنوان حداکثر می‌تواند ۱۲۰ کاراکتر باشد.",
};

const fa: Messages = {
  Metadata: {
    description: "لینک کوتاه بسازید و کلیک‌های آن را دنبال کنید.",
  },
  Common: {
    close: "بستن",
    tryAgain: "تلاش دوباره",
    goHome: "بازگشت به خانه",
  },
  LocaleSwitcher: {
    label: "تغییر زبان",
  },
  ThemeToggle: {
    label: "تغییر تم",
  },
  Errors: errors,
  ErrorState: {
    title: "مشکلی پیش آمد",
    description: "بارگذاری این صفحه ممکن نشد. لطفاً دوباره تلاش کنید.",
  },
  NotFound: {
    title: "لینک پیدا نشد",
    description: "این لینک وجود ندارد یا حذف شده است.",
  },
  Auth: {
    email: "ایمیل",
    password: "رمز عبور",
    login: {
      title: "ورود",
      description: "خوش برگشتید. برای ادامه اطلاعات خود را وارد کنید.",
      submit: "ورود",
      submitting: "در حال ورود...",
      noAccount: "حساب ندارید؟",
      signUpLink: "ثبت‌نام",
    },
    signup: {
      title: "ساخت حساب",
      description: "ثبت‌نام کنید و لینک‌های کوتاه خود را بسازید.",
      name: "نام",
      passwordHint: "حداقل ۸ کاراکتر.",
      submit: "ساخت حساب",
      submitting: "در حال ساخت حساب...",
      haveAccount: "قبلاً ثبت‌نام کرده‌اید؟",
      loginLink: "ورود",
    },
    logout: {
      submit: "خروج",
      submitting: "در حال خروج...",
    },
  },
  Dashboard: {
    signedInAs: "وارد شده با نام <b>{name}</b>",
    title: "لینک‌های شما",
    description:
      "لینک‌های کوتاه خود را بسازید، به اشتراک بگذارید و کلیک‌ها را دنبال کنید.",
  },
  Links: {
    new: "لینک جدید",
    create: {
      title: "لینک کوتاه جدید",
      description:
        "برای دریافت شناسه تصادفی ۶ کاراکتری، فیلد شناسه را خالی بگذارید.",
      destinationUrl: "آدرس مقصد",
      destinationPlaceholder: "https://example.com/a/very/long/url",
      slug: "شناسه دلخواه (اختیاری)",
      slugPlaceholder: "my-link",
      slugHint: "فقط حروف انگلیسی، عدد و خط تیره.",
      titleLabel: "عنوان (اختیاری)",
      titlePlaceholder: "لینک من",
      submit: "ساخت لینک",
      submitting: "در حال ساخت...",
      success: "لینک ساخته شد.",
    },
    empty: {
      title: "هنوز لینکی ندارید",
      description: "اولین لینک کوتاه خود را بسازید و کلیک‌هایش را دنبال کنید.",
    },
    table: {
      link: "لینک",
      destination: "مقصد",
      clicks: "کلیک",
      created: "تاریخ ساخت",
      actions: "عملیات",
    },
    copy: {
      label: "کپی لینک کوتاه /r/{slug}",
      success: "لینک کوتاه کپی شد.",
      error: "کپی لینک ممکن نشد.",
    },
    delete: {
      label: "حذف /r/{slug}",
      title: "این لینک حذف شود؟",
      description:
        "<path>/r/{slug}</path> دیگر کار نخواهد کرد و تاریخچه کلیک‌های آن برای همیشه حذف می‌شود. این کار قابل بازگشت نیست.",
      cancel: "انصراف",
      confirm: "حذف",
      confirming: "در حال حذف...",
      success: "لینک حذف شد.",
    },
    detail: {
      back: "بازگشت به داشبورد",
      destination: "مقصد",
      totalClicks: "کل کلیک‌ها",
      created: "تاریخ ساخت",
      chartTitle: "کلیک‌ها در هر روز",
      chartDescription: "۷ روز گذشته (UTC)",
      chartLabel: "کلیک‌ها در هر روز، ۷ روز گذشته",
      tooltipClicks: "کلیک",
    },
  },
};

export default fa;
