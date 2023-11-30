import type { Virtualizer } from "@tanstack/react-virtual";

type TVirtualScrollPadding = <
  TScrollElement extends Element | Window,
  TItemElement extends Element,
>(props: {
  rowVirtualizer: Virtualizer<TScrollElement, TItemElement>;
  position: "top" | "bottom";
}) => JSX.Element | null;

export const VirtualScrollPadding: TVirtualScrollPadding = ({
  rowVirtualizer,
  position,
}) => {
  const virtualItems = rowVirtualizer.getVirtualItems();

  if (virtualItems.length === 0) {
    return null;
  }

  if (position === "top") {
    const paddingTop = virtualItems[0].start;

    return (
      // use raw dom element to avoid chakra's style override
      <tr>
        <td style={{ height: paddingTop }} />
      </tr>
    );
  }

  const paddingBottom =
    rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end;

  return (
    // use raw dom element to avoid chakra's style override
    <tr>
      <td style={{ height: paddingBottom }} />
    </tr>
  );
};
