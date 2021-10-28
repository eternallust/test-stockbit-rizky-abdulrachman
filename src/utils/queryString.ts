const queryString = (string: string) => {
  if (string) {
    const search = string.substring(1);
    return JSON.parse(
      `{"${decodeURI(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/[=]/g, '":"')}"}`
    );
  }
  return null;
};

export default queryString;
