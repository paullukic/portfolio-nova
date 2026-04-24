type Props = { label?: string; tone?: "cyan" | "mag" | "acid" | "amber" | "fade" };

const TONE = {
  cyan: "text-cyan",
  mag: "text-mag",
  acid: "text-acid",
  amber: "text-amber",
  fade: "text-fade",
};

export function Divider({ label = "◢◤◢◤◢◤◢◤◢◤◢◤◢◤", tone = "fade" }: Props) {
  return (
    <div className="mx-auto max-w-[1480px] px-4 md:px-7">
      <div className={`ascii-divider ${TONE[tone]}`}>
        <span>{label}</span>
      </div>
    </div>
  );
}
