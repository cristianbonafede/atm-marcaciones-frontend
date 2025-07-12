export const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const downloadBase64 = (filename, content) => {
  const base64 = `data:application/octet-stream;base64,${content}`;
  const link = document.createElement("a");
  link.href = base64;
  link.download = filename;
  link.click();
};

export const openBase64Pdf = (content) => {
  var byteCharacters = atob(content);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var file = new Blob([byteArray], { type: "application/pdf;base64" });
  var fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};
