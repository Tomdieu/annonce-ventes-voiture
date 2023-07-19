export default function capitalizeText(text: string) {
  return text.replace(/\b\w/g, (match) => match.toUpperCase());
}