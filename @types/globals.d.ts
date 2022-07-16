type VNode = import('vue').VNode;

type MaybePromise<T> = T | Promise<T>;

interface VirtualFile {
  type: 'file';
  name: string;
  content: string;
}

interface Link {
  type: 'link';
  name: string;
  to: string;
}

interface Folder {
  type: 'folder';
  name: string;
  children: VirtualFileSystem;
}

type VirtualFileSystem = Array<VirtualFile | Link | Folder>;

interface PreviousCommand {
  id: number;
  command: string;
  dir: string;
  result: TerminalResult;
}

interface ComponentResult {
  type: 'component';
  render: () => VNode;
}
interface TextResult {
  type: 'text';
  text: string;
}
interface NoResult {
  type: 'none';
}
interface ErrorResult {
  type: 'error';
  error: string;
}

type TerminalResult = ComponentResult | TextResult | NoResult | ErrorResult;
