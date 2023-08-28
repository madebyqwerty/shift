export const uint8ArrayToJson: <T>(arr: Uint8Array) => T = (arr) => {
  const decoder = new TextDecoder();
  const decoded = decoder.decode(arr);
  try {
    return JSON.parse(decoded);
  } catch {
    return [];
  }
};
