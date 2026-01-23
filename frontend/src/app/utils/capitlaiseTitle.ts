function capitaliseTitle(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/) // handles multiple spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
export { capitaliseTitle };