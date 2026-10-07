import { useDrag } from "react-dnd";
import { GripVertical } from "lucide-react";

interface CardProps {
  id: number;
  title: string;
  description: string;
}

const Card = ({ title, description, id }: CardProps) => {
  const [{ opacity, isDragging }, dragRef] = useDrag(
    () => ({
      type: "CARD",
      item: {
        id,
        title,
        description,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.35 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, title, description],
  );

  return (
    <div
      ref={(node) => {
        dragRef(node);
      }}
      style={{ opacity }}
      className={`group select-none rounded-xl border border-zinc-200/90 bg-white p-3.5 shadow-xs transition-all duration-150 cursor-grab active:cursor-grabbing hover:border-zinc-300 hover:shadow-sm ${
        isDragging ? "ring-2 ring-blue-400/40 scale-[0.98]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-zinc-900 group-hover:text-zinc-950 flex-1">
          {title}
        </h3>
        <GripVertical className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-400 transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Card;
