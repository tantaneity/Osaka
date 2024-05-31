export const convertToBase64 = (bytes: ArrayBuffer, format: string = "jpeg") => {
  const uintArray = new Uint8Array(bytes);
  let binaryString = '';
  for (let i = 0; i < uintArray.length; i++) {
      binaryString += String.fromCharCode(uintArray[i]);
  }
  const base64String = btoa(binaryString);
  return `data:image/${format};base64,${base64String}`;
};
