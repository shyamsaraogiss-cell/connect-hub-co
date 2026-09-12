export function nextOpenPanelId(
  currentOpenId: string | null,
  clickedId: string,
): string | null {
  return currentOpenId === clickedId ? null : clickedId;
}
