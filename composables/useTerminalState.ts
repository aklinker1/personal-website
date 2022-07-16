import { Help, LsOutput } from '~~/.nuxt/components';

function getCurrentWorkingFileSystem(dir: string, fileSystem: VirtualFileSystem) {
  const paths = dir
    .split('/')
    .filter(s => !!s)
    .map(s => s.trim());
  let fs = fileSystem;
  while (paths.length > 0) {
    const p = paths.shift();
    const child = fs.find(f => f.name == p);
    if (child == null) {
      throw Error(`${dir} does not exist`);
    } else if (child.type !== 'folder') {
      throw Error(`${child} is a ${child.type}, not a folder`);
    }
    fs = child.children;
  }
  return fs;
}

export function useTerminalState(initialDir = '/', rootFileSystem: VirtualFileSystem) {
  const increment = ref(0);
  const workingDir = ref(initialDir);

  const commands: Record<string, (...args: string[]) => MaybePromise<TerminalResult>> = {
    ['']: () => ({ type: 'none' }),
    help: () => ({
      type: 'component',
      render: () => h(Help),
    }),
    ls: path => {
      let p: string;
      if (path == null) p = workingDir.value;
      else if (path.startsWith('/')) p = path;
      else p = workingDir.value + path;

      const files = getCurrentWorkingFileSystem(p, rootFileSystem);
      console.log('ls', path, p, files);
      return {
        type: 'component',
        render: () => h(LsOutput, { files }),
      };
    },
    cat: () => ({
      type: 'text',
      text: 'test',
    }),
    clear: () => {
      setTimeout(() => (history.value = []));
      return { type: 'none' };
    },
  };

  const history = ref<PreviousCommand[]>([]);
  function addToHistory(command: string, result: TerminalResult) {
    history.value.push({
      id: increment.value++,
      dir: workingDir.value,
      command,
      result,
    });
  }

  function loadSuggestions(text: string): string[] {
    return [];
  }

  async function exec(command: string) {
    const [bin, ...args] = command
      .split(' ')
      .filter(s => !!s)
      .map(s => s.trim());
    if (bin == null) {
      return addToHistory(command, { type: 'none' });
    }
    if (commands[bin] == null) {
      return addToHistory(command, {
        type: 'error',
        error: `Command not found: ${bin}\nType "help" for available commands`,
      });
    }

    try {
      const res = await commands[bin](...args);
      addToHistory(command, res);
    } catch (err) {
      addToHistory(command, {
        type: 'error',
        error: (err as Error).message,
      });
    }
  }

  return {
    loadSuggestions,
    exec,
    workingDir: readonly(workingDir),
    history: readonly(history),
  };
}
