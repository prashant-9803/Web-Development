import React, { type ReactNode } from "react";
import { useDrop } from "react-dnd";
import { variantStyles } from "../utils/colVariantStyles";

export type ColumnVariant = "todo" | "inProgress" | "done" | "default";

export interface DragCardItem {
  id: number;
  title: string;
  description: string;
}

export interface BoardsSectionProps {
  title?: string;
  count?: number;
  variant?: ColumnVariant;
  onDrop?: (item: DragCardItem) => void;
  children?: ReactNode;
}


const BoardsSection: React.FC<BoardsSectionProps> = ({
  title,
  count,
  variant = "default",
  onDrop,
  children,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["CARD"],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const styles = variantStyles[variant] || variantStyles.default;
  const childrenCount = count ?? React.Children.count(children);

  return (
    <div
      ref={(node) => {
        drop(node);
      }}
      className={`flex flex-col h-full rounded-2xl border transition-all duration-200 ${
        styles.columnBorder
      } ${
        isOver
          ? `${styles.dropActiveBg} ${styles.dropActiveBorder} ring-2 ${styles.dropActiveRing} shadow-md`
          : canDrop
            ? "border-dashed border-zinc-400 bg-white/70 shadow-xs"
            : `${styles.columnBg} shadow-xs`
      }`}
    >
      {/* Column Header */}
      {title && (
        <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
          <div className="flex items-center gap-2.5">
            <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
            <h2 className="text-sm font-semibold tracking-tight text-zinc-800">
              {title}
            </h2>
            <span
              className={`inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-semibold rounded-full ${styles.badge}`}
            >
              {childrenCount}
            </span>
          </div>
        </div>
      )}

      {/* Cards Container */}
      <div className="flex-1 flex flex-col gap-2.5 p-3 overflow-y-auto">
        {React.Children.count(children) === 0 ? (
          <div
            className={`flex flex-1 flex-col items-center justify-center min-h-[140px] rounded-xl border border-dashed transition-colors ${
              isOver
                ? `${styles.dropActiveBorder} ${styles.dropActiveSlot} ${styles.dropActiveText}`
                : "border-zinc-300/80 text-zinc-400"
            }`}
          >
            <p className="text-xs font-medium">
              {isOver ? "Release to drop here" : "No tasks yet"}
            </p>
          </div>
        ) : (
          children
        )}

        {/* Visual drop indicator slot when hovering */}
        {isOver && React.Children.count(children) > 0 && (
          <div
            className={`h-12 rounded-xl border-2 border-dashed ${styles.dropActiveSlot} flex items-center justify-center transition-all`}
          >
            <span className={`text-xs font-medium ${styles.dropActiveText}`}>
              Drop here
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardsSection;
