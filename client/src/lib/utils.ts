export const convertToBase64 = (bytes: ArrayBuffer) => {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(bytes)));
    return `data:image/jpeg;base64,${base64String}`;
  };