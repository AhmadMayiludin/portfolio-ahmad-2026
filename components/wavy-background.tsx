// Garis-garis bergelombang tipis di belakang seluruh halaman
const paths = [
  "M-100 180 C 240 80, 520 300, 820 190 S 1360 60, 1620 210",
  "M-100 420 C 200 520, 560 300, 900 430 S 1380 560, 1620 380",
  "M-100 690 C 300 600, 600 820, 960 700 S 1420 600, 1620 760",
];

export default function WavyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden text-ink"
    >
      <svg
        className="absolute inset-0 h-full w-full animate-drift opacity-[0.07] dark:opacity-[0.09]"
        viewBox="0 0 1520 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {paths.map((d) => (
          <path key={d} d={d} stroke="currentColor" strokeWidth="1.2" />
        ))}
      </svg>
    </div>
  );
}
