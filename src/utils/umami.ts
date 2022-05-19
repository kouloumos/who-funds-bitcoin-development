export const trackEvent = (event_value: string, event_type: string) => {
  if (process.env.NODE_ENV === "production") {
    try {
      //@ts-ignore
      window.umami.trackEvent(event_value, event_type);
    } catch {}
  }
};
