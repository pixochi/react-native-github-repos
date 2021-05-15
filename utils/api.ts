export const buildSearchParams = (params: {
  [paramKey: string]: Parameters<typeof encodeURIComponent>[0];
}) => {
  const escape = encodeURIComponent;
  const searchParams = Object.keys(params)
    .map(paramKey => `${escape(paramKey)}=${escape(params[paramKey])}`)
    .join('&');

  return searchParams;
};
