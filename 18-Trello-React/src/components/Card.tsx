import { useDrag } from "react-dnd";


const Card = ({ title, description, id }) => {
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
    [id, title, description]
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
      <h3 className="text-sm font-medium text-zinc-900 group-hover:text-zinc-950">
        {title}
      </h3>
      <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Card;