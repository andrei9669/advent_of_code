interface File {
  type: 'file';
  path: string;
  size: number;
  parent?: Directory;
}
interface Directory {
  type: 'dir';
  size: number;
  path: string;
  children: (Directory | File)[];
  parent?: Directory;
}
type Cd = [string, 'cd', string];
type Ls = [string, 'ls'];
type Command = Cd | Ls;

const propagateParent = (dir: Directory) => {
  dir.children.forEach((child) => {
    if (child.type === 'dir') {
      propagateParent(child);
    }
    dir.size += child.size;
  });
};
const recursiveCallDir =
  (func: (dir: Directory) => void) =>
  (child: File | Directory): void => {
    if (child.type === 'dir') {
      func(child);
    }
  };
const getAtMostDirectories = (directory: Directory) => {
  let pathsSizeSum = 0;
  const func = (dir: Directory) => {
    dir.children.forEach(recursiveCallDir(func));
    if (dir.size <= 100000) {
      pathsSizeSum += dir.size;
    }
  };
  func(directory);
  return pathsSizeSum;
};

const getTree = (input: string): Directory[] => {
  const rows = input.split('\n');
  const tree: Directory[] = [{ type: 'dir', children: [], size: 0, path: '/' }];
  let currentDir: Directory = tree[0];
  rows.forEach((row, i) => {
    if (i === 0) {
      // ignore first row
      return;
    }
    if (row.startsWith('$')) {
      const [, command, path] = row.split(' ') as Command;
      if (command === 'cd') {
        if (path === '..' && currentDir.parent) {
          currentDir = currentDir.parent;
        } else {
          const newDir = currentDir.children.find((el) => el.path === path);
          if (!newDir || newDir.type !== 'dir') {
            throw Error(
              `No dir found at ${
                currentDir.path
              }. Found "${path}". Children: [${currentDir.children
                .map((e) => e.path)
                .join(',')}], parent: ${currentDir.parent?.path}`,
            );
          }
          currentDir = newDir;
        }
      }
    } else {
      const [fileType, path] = row.split(' ');
      if (fileType === 'dir') {
        currentDir.children.push({
          type: 'dir',
          children: [],
          size: 0,
          path,
          parent: currentDir,
        });
      } else {
        const size = Number(fileType);
        currentDir.children.push({
          type: 'file',
          size,
          path,
          parent: currentDir,
        });
      }
    }
  });
  return tree;
};

const getDirList = (directory: Directory): Directory[] => {
  const list: Directory[] = [];
  const func = (dir = directory) => {
    dir.children.forEach(recursiveCallDir(func));
    list.push(dir);
  };
  func();
  return list;
};

export const main = (input: string): unknown => {
  const tree = getTree(input);
  propagateParent(tree[0]);
  return getAtMostDirectories(tree[0]);
};
export const main2 = (input: string): unknown => {
  const tree = getTree(input);
  propagateParent(tree[0]);
  const list = getDirList(tree[0]);
  const totalSpace = 70000000;
  const requiredSpace = 30000000;
  const unusedSpace = totalSpace - tree[0].size;
  const requiredUnusedSpace = requiredSpace - unusedSpace;
  let dirToRemove: Directory | undefined;
  list.forEach((dir) => {
    if (
      dir.size >= requiredUnusedSpace &&
      ((dirToRemove !== undefined && dirToRemove.size > dir.size) ||
        dirToRemove === undefined)
    ) {
      dirToRemove = dir;
    }
  });
  if (dirToRemove !== undefined) {
    return dirToRemove.size;
  }
  return new Error('not found');
};
