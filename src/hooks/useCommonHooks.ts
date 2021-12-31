import { history } from 'umi';

export default function useCommonHooks() {
  const routerPush = (pathname: string, query?: any) =>
    history.push({
      pathname,
      query,
    });

  return {
    routerPush,
  };
}
