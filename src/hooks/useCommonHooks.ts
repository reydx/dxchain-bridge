import { useHistory } from 'umi';

export default function useCommonHooks() {
  const history = useHistory();

  const routerPush = (path: string, state?: unknown) =>
    history.push(path, state);

  return {
    routerPush,
  };
}
