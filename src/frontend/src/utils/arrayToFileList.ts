export default function arrayToFileList(files: File[]): FileList {
    const fileList: FileList & { [key: number]: File } = {
      length: files.length,
      item(index: number): File | null {
        return index >= 0 && index < files.length ? files[index] : null;
      },
      [Symbol.iterator]: function* () {
        let index = 0;
        while (index < files.length) {
          yield files[index++];
        }
      },
    };
  
    // Add numeric keys to make the FileList iterable
    files.forEach((file, index) => {
      fileList[index] = file;
    });
  
    return fileList;
  }
  

 