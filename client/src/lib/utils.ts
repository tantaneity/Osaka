export const convertToBase64 = (bytes: ArrayBuffer, format: string = "jpeg") => {
  const uintArray = new Uint8Array(bytes);
  let binaryString = '';
  for (let i = 0; i < uintArray.length; i++) {
      binaryString += String.fromCharCode(uintArray[i]);
  }
  const base64String = btoa(binaryString);
  return `data:image/${format};base64,${base64String}`;
};
export const fileToDataURL = (file: File, format: string = "jpeg"): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(',')[1];
      if (base64String) {
        resolve(`data:image/${format};base64,${base64String}`);
      } else {
        reject(new Error("Failed to convert file to base64 string"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsDataURL(file);
  });
};
