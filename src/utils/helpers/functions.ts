export const randomFixedInteger = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getExtension = (filename) => {
  // const reg = new RegExp('[^.]+$');
  const reg = new RegExp(
    '^.*.(jpg|JPG|png|PNG|gif|GIF|doc|DOC|docs|DOCS|docx|DOCX|pdf|PDF|xlsx|XLSX)$',
  );
  const extension = reg.test(filename);
  return extension;
};
